
import dns from "node:dns";

dns.setServers(["8.8.8.8"]);

import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";

const app = express();
const PORT = process.env.PORT || 5000;

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    const allowed = (process.env.FRONTEND_URL || "http://localhost:5173")
      .split(",")
      .map(value => value.trim())
      .filter(Boolean);
    // Allow server-to-server requests and configured frontend origins only.
    if (!origin || allowed.includes(origin)) return callback(null, true);
    return callback(new Error("Origin is not allowed by CORS"));
  },
}));
app.use(express.json({ limit: "20kb" }));

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many messages from this network. Please try again later." },
});

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
  subject: { type: String, trim: true, maxlength: 120, default: "" },
  message: { type: String, required: true, trim: true, minlength: 10, maxlength: 3000 },
  emailNotification: { type: String, enum: ["sent", "not-configured", "failed"], default: "not-configured" },
}, { timestamps: true });

const ContactMessage = mongoose.model("ContactMessage", contactSchema);

function emailConfigured() {
  return Boolean(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.CONTACT_TO_EMAIL &&
    process.env.CONTACT_FROM_EMAIL
  );
}

async function sendNotification(message) {
  if (!emailConfigured()) return "not-configured";

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE).toLowerCase() === "true",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: message.email,
      subject: `Portfolio contact: ${message.subject || "New message"}`,
      text: [
        `Name: ${message.name}`,
        `Email: ${message.email}`,
        `Subject: ${message.subject || "(not provided)"}`,
        "",
        message.message,
      ].join("\n"),
    });
    return "sent";
  } catch (error) {
    console.error("Email notification failed:", error.message);
    return "failed";
  } finally {
    transporter.close();
  }
}

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    database: mongoose.connection.readyState === 1 ? "connected" : "not-connected",
  });
});

app.post("/api/contact", contactLimiter, async (req, res, next) => {
  try {
    const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
    const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const subject = typeof req.body.subject === "string" ? req.body.subject.trim() : "";
    const message = typeof req.body.message === "string" ? req.body.message.trim() : "";

    if (name.length < 2 || name.length > 80) {
      return res.status(400).json({ message: "Name must be between 2 and 80 characters." });
    }
    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email address." });
    }
    if (subject.length > 120) {
      return res.status(400).json({ message: "Subject must be 120 characters or fewer." });
    }
    if (message.length < 10 || message.length > 3000) {
      return res.status(400).json({ message: "Message must be between 10 and 3000 characters." });
    }
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: "The message service is temporarily unavailable. Please email me directly." });
    }

    const savedMessage = await ContactMessage.create({ name, email, subject, message });
    const notification = await sendNotification(savedMessage);
    savedMessage.emailNotification = notification;
    await savedMessage.save();

    const responseMessage = notification === "sent"
      ? "Thanks! Your message was saved and an email notification was sent."
      : notification === "failed"
        ? "Your message was saved, but the email notification could not be sent. I can still review the saved message."
        : "Thanks! Your message was saved. Email notifications are not configured yet.";

    return res.status(201).json({ message: responseMessage });
  } catch (error) {
    return next(error);
  }
});

app.use((error, _req, res, _next) => {
  console.error("API error:", error.message);
  if (error.message === "Origin is not allowed by CORS") {
    return res.status(403).json({ message: "This website origin is not allowed." });
  }
  return res.status(500).json({ message: "Something went wrong on the server. Please try again later." });
});

async function start() {
  if (!process.env.MONGODB_URI) {
    console.error("Missing MONGODB_URI. Copy .env.example to .env and configure it.");
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB.");
    app.listen(PORT, () => console.log(`Portfolio API running on http://localhost:${PORT}`));
  } catch (error) {
    console.error("Could not connect to MongoDB:", error.message);
    process.exit(1);
  }
}

start();
