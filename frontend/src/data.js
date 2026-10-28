// Replace placeholder URLs with your real profiles and project links.
// Empty URLs keep the related buttons disabled rather than inventing destinations.
export const profile = {
  name: "Manish Kumar Chaurasiya",
  email: "mkofficial9589@gmail.com",
  phone: "+91 8423108763",
  github: "https://github.com/YOUR_GITHUB_USERNAME",
  linkedin: "https://www.linkedin.com/in/YOUR_LINKEDIN_PROFILE",
  location: "Bhopal, Madhya Pradesh, India",
};

export const projects = [
  {
    name: "SecureBank",
    type: "Full-stack banking application",
    summary:
      "A full-stack banking application for creating accounts, managing balances, transferring funds and tracking transaction history.",
    details: [
      "Account creation, deposits, withdrawals, transfers and transaction history.",
      "JWT authentication and role-based customer/admin protected routes.",
      "Password reset and change-password flows.",
      "REST APIs with Helmet, CORS, rate limiting and structured error handling.",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS"],
    github: "",
    demo: "",
    accent: "violet",
    icon: "bank",
  },
  {
    name: "AI-Based Accident Prediction System",
    type: "AI + full-stack web application",
    summary:
      "A system designed to analyze historical accident, road, weather and traffic data to identify high-risk locations.",
    details: [
      "Machine-learning predictions for accident risk levels.",
      "Safety insights intended to support proactive accident prevention.",
      "Dashboard concept for accident-prone areas, prediction results and risk-based recommendations.",
    ],
    stack: ["Python", "Machine Learning", "React.js", "Node.js"],
    github: "",
    demo: "",
    accent: "cyan",
    icon: "activity",
  },
  {
    name: "MeshLink",
    type: "Offline emergency & women-safety communication",
    summary:
      "An internet-independent communication concept for exchanging emergency messages when network connectivity is low or unavailable.",
    details: [
      "Bluetooth and Wi-Fi Direct-based nearby device communication and message relay.",
      "Firebase integration for online synchronization and emergency data management.",
      "Hybrid offline-first communication architecture.",
    ],
    stack: ["React.js", "Node.js", "Firebase", "Bluetooth", "Wi-Fi Direct"],
    github: "",
    demo: "",
    accent: "orange",
    icon: "radio",
  },
];

export const skillGroups = [
  { title: "Languages & Databases", skills: ["Java", "JavaScript", "Python", "SQL", "MongoDB"] },
  { title: "Web Development", skills: ["React.js", "Next.js", "Tailwind CSS", "Node.js", "Express.js"] },
  { title: "Tools & Platforms", skills: ["Git", "GitHub", "VS Code", "Postman", "Render", "Docker", "Firebase"] },
  { title: "Strengths", skills: ["Leadership", "Adaptability", "Teamwork", "Problem solving"] },
];

export const education = [
  {
    title: "B.Tech. — Computer Science & Engineering",
    place: "IES College of Technology, Bhopal, Madhya Pradesh",
    period: "2024 – 2028",
    result: "7.4 / 10",
  },
  {
    title: "Senior Secondary — PCM",
    place: "Kamla Rai Inter College, Gopalganj, Bihar",
    period: "2024",
    result: "60%",
  },
  {
    title: "Higher Secondary",
    place: "P D M Inter College, Jagdishpur, Uttar Pradesh",
    period: "2022",
    result: "73%",
  },
];

export const certificates = [
  "DSA in Java",
  "Core Java — Infosys",
  "Programming in Java — NPTEL",
  "Soft Skill and Development — NPTEL",
];

export const achievements = [
  "Participated in Smart India Hackathon (SIH) 2025 and SIH 2026.",
  "Cleared internal hackathon rounds for Smart India Hackathon in multiple editions.",
  "Participated in 3+ college-level hackathons, developing and presenting technology solutions under time constraints.",
];
