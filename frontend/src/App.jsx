import React from "react";
import { useEffect, useState } from "react";
import {
  ArrowDown, ArrowDownToLine, ArrowRight, ArrowUpRight, Activity,
  Banknote, BriefcaseBusiness, CheckCircle2, Code2, ExternalLink,
  Github, GraduationCap, Linkedin, Mail, MapPin, Menu, Moon, Radio,
  Send, Sparkles, Sun, X, Zap, Award, FileText, Layers, Terminal,
} from "lucide-react";
import { profile, projects, skillGroups, education, certificates, achievements } from "./data.js";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/$/, "");

function safeExternalUrl(url) {
  if (!url) return "";
  if (url.includes("YOUR_")) return "";
  return url;
}

function ProjectIcon({ name }) {
  if (name === "bank") return <Banknote size={23} />;
  if (name === "activity") return <Activity size={23} />;
  return <Radio size={23} />;
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading reveal">
      <span className="eyebrow"><Sparkles size={14} /> {eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function SocialLink({ href, label, children }) {
  const url = safeExternalUrl(href);
  if (!url) return <span className="social-disabled" title={`Add your real ${label} URL in src/data.js`}>{children}<span>{label}</span></span>;
  return <a className="social-link" href={url} target="_blank" rel="noreferrer">{children}<span>{label}</span><ArrowUpRight size={13} /></a>;
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("portfolio-theme") || "dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [formState, setFormState] = useState({ loading: false, message: "", error: false });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKey = event => {
      if (event.key === "Escape") setActiveProject(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const updateForm = event => setForm({ ...form, [event.target.name]: event.target.value });

  async function handleContact(event) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setFormState({ loading: true, message: "", error: false });
    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || "Message could not be sent. Please try again.");
      setFormState({ loading: false, message: result.message || "Thanks! Your message was saved.", error: false });
      setForm({ name: "", email: "", subject: "", message: "" });
      formElement.reset();
    } catch (error) {
      setFormState({
        loading: false,
        message: error.message || "Could not connect to the server. Please try again later.",
        error: true,
      });
    }
  }

  const navItems = [
    ["About", "#about"], ["Projects", "#projects"], ["Skills", "#skills"],
    ["Journey", "#journey"], ["Achievements", "#achievements"], ["Contact", "#contact"],
  ];

  return (
    <div className="site-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <header className="topbar">
        <a className="brand" href="#home" aria-label="Go to home">
          <span className="brand-mark"><Code2 size={19} /></span>
          <span>manish<span className="brand-dot">.</span>dev</span>
        </a>
        <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`} aria-label="Main navigation">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} onClick={closeMenu}>{label}</a>
          ))}
          <a className="nav-contact" href="#contact" onClick={closeMenu}>Let&apos;s talk <ArrowUpRight size={14} /></a>
        </nav>
        <div className="topbar-actions">
          <button className="icon-button theme-button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="icon-button menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="availability-pill"><span className="status-dot" /> Open to internships & opportunities</div>
            <p className="hero-kicker">HELLO, I&apos;M MANISH CHAURASIYA</p>
            <h1>Software Developer <span className="gradient-text">building what&apos;s next.</span></h1>
            <div className="typing-line"><span className="typing-caret" /> AI &amp; Full-Stack Projects</div>
            <p className="hero-description">
              I&apos;m a Computer Science student at IES College of Technology, Bhopal, building practical web applications and exploring AI-driven solutions to real-world problems.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">Explore my work <ArrowRight size={17} /></a>
              <a className="button button-secondary" href="/resume.pdf" target="_blank" rel="noreferrer"><FileText size={16} /> View resume</a>
              <a className="button button-quiet" href="/resume.pdf" download="Manish-Kumar-Chaurasiya-Resume.pdf"><ArrowDownToLine size={17} /> Download</a>
            </div>
            <div className="hero-socials">
              <SocialLink href={profile.github} label="GitHub"><Github size={16} /></SocialLink>
              <SocialLink href={profile.linkedin} label="LinkedIn"><Linkedin size={16} /></SocialLink>
              <a className="social-link" href={`mailto:${profile.email}`}><Mail size={16} /><span>Email</span><ArrowUpRight size={13} /></a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="visual-grid" aria-hidden="true" />
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="avatar-card">
              <div className="avatar-glow" />
              <div className="avatar-head"><div className="avatar-hair" /><div className="avatar-face"><span className="eye eye-left" /><span className="eye eye-right" /><span className="smile" /></div></div>
              <div className="avatar-body"><span className="avatar-collar" /></div>
              <div className="avatar-initials">MC</div>
            </div>
            <div className="floating-chip chip-code"><Terminal size={15} /><span>Clean code</span></div>
            <div className="floating-chip chip-ai"><Zap size={15} /><span>AI + Web</span></div>
            <div className="floating-chip chip-location"><MapPin size={14} /><span>Bhopal, IN</span></div>
            <div className="visual-caption"><span className="caption-pulse" /> Always learning. Always building.</div>
          </div>
          <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></a>
        </section>

        <section className="section-wrap section-pad" id="about">
          <SectionHeading eyebrow="A LITTLE ABOUT ME" title={<>Curiosity into <span className="gradient-text">working solutions.</span></>} description="I enjoy learning technologies, solving problems and turning ideas into useful applications." />
          <div className="about-grid">
            <article className="about-card reveal">
              <div className="card-icon"><Code2 size={22} /></div>
              <h3>Builder mindset</h3>
              <p>I build full-stack projects that combine user-friendly interfaces, APIs and data-driven functionality.</p>
            </article>
            <article className="about-card reveal">
              <div className="card-icon icon-cyan"><Sparkles size={22} /></div>
              <h3>Exploring AI</h3>
              <p>I&apos;m interested in applying machine learning and software engineering to practical, real-world challenges.</p>
            </article>
            <article className="about-card reveal">
              <div className="card-icon icon-orange"><BriefcaseBusiness size={22} /></div>
              <h3>Growing every day</h3>
              <p>As a B.Tech CSE student, I keep developing my skills through projects, coding practice and team hackathons.</p>
            </article>
          </div>
          <div className="about-note reveal">
            <div className="note-symbol">“</div>
            <p>My goal is to grow as a software developer, build useful technology, and contribute to teams that solve meaningful problems.</p>
          </div>
        </section>

        <section className="projects-section section-pad" id="projects">
          <div className="section-wrap">
            <SectionHeading eyebrow="SELECTED WORK" title={<>Projects with a <span className="gradient-text">purpose.</span></>} description="A selection of full-stack, AI and offline-first concepts I have worked on." />
            <div className="project-grid">
              {projects.map((project, index) => (
                <article className={`project-card project-${project.accent} reveal`} key={project.name}>
                  <div className="project-topline"><span className="project-number">0{index + 1}</span><span className="project-type">{project.type}</span><span className="project-icon"><ProjectIcon name={project.icon} /></span></div>
                  <h3>{project.name}</h3>
                  <p className="project-summary">{project.summary}</p>
                  <div className="project-tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div>
                  <div className="project-actions">
                    <button className="text-action" onClick={() => setActiveProject(project)}>View details <ArrowRight size={15} /></button>
                    {safeExternalUrl(project.github) ? <a className="project-link" href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.name} GitHub`}><Github size={17} /></a> : <span className="project-link disabled-link" title="Add verified GitHub URL in src/data.js"><Github size={17} /></span>}
                    {safeExternalUrl(project.demo) ? <a className="project-link" href={project.demo} target="_blank" rel="noreferrer" aria-label={`${project.name} live demo`}><ExternalLink size={17} /></a> : <span className="project-link disabled-link" title="Add verified live demo URL in src/data.js"><ExternalLink size={17} /></span>}
                  </div>
                </article>
              ))}
            </div>
            <p className="project-note"><CheckCircle2 size={15} /> Project links are placeholders until you add verified URLs in <code>src/data.js</code>.</p>
          </div>
        </section>

        <section className="section-wrap section-pad" id="skills">
          <SectionHeading eyebrow="MY TOOLKIT" title={<>Skills I use to <span className="gradient-text">build.</span></>} description="Grouped by the areas where I learn, practice and create." />
          <div className="skills-grid">
            {skillGroups.map((group, i) => (
              <article className="skill-card reveal" key={group.title}>
                <div className={`skill-index skill-index-${i}`}>0{i + 1}</div>
                <h3>{group.title}</h3>
                <div className="skill-pills">{group.skills.map(skill => <span key={skill}>{skill}</span>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="journey-section section-pad" id="journey">
          <div className="section-wrap">
            <SectionHeading eyebrow="THE JOURNEY SO FAR" title={<>Learning by <span className="gradient-text">doing.</span></>} description="My academic journey and the next steps I am working toward." />
            <div className="timeline">
              {education.map((item, i) => (
                <article className="timeline-item reveal" key={item.title}>
                  <div className="timeline-marker">{i === 0 ? <GraduationCap size={18} /> : <Layers size={17} />}</div>
                  <div className="timeline-content">
                    <div className="timeline-meta"><span>{item.period}</span><span className="timeline-result">{item.result}</span></div>
                    <h3>{item.title}</h3><p>{item.place}</p>
                  </div>
                </article>
              ))}
              <article className="timeline-item reveal">
                <div className="timeline-marker marker-future"><BriefcaseBusiness size={17} /></div>
                <div className="timeline-content">
                  <div className="timeline-meta"><span>Next chapter</span><span className="timeline-result">In progress</span></div>
                  <h3>Internship & software development opportunities</h3>
                  <p>Looking to apply my skills, learn from experienced developers and contribute to meaningful projects.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section-wrap section-pad" id="achievements">
          <SectionHeading eyebrow="MILESTONES" title={<>Teamwork, ideas & <span className="gradient-text">execution.</span></>} description="Hackathon experiences that helped me learn to work on real problem statements with a team." />
          <div className="achievement-layout">
            <div className="achievement-feature reveal"><div className="achievement-emblem"><Award size={31} /></div><span className="eyebrow">HACKATHONS</span><h3>Ideas built together.</h3><p>Experience participating in national and college-level hackathons, collaborating on solutions and presenting project ideas under time constraints.</p><div className="achievement-stats"><div><strong>2025 + 2026</strong><span>SIH editions</span></div><div><strong>3+</strong><span>College hackathons</span></div></div></div>
            <div className="achievement-list">{achievements.map((item, i) => <div className="achievement-row reveal" key={item}><span className="achievement-check"><CheckCircle2 size={17} /></span><p>{item}</p><span className="achievement-num">0{i + 1}</span></div>)}</div>
          </div>
        </section>

        <section className="cert-section section-pad" id="certificates">
          <div className="section-wrap">
            <SectionHeading eyebrow="CONTINUOUS LEARNING" title={<>Learning backed by <span className="gradient-text">certificates.</span></>} description="Courses and certifications listed in my resume." />
            <div className="certificate-grid">{certificates.map((certificate, i) => <article className="certificate-card reveal" key={certificate}><div className="certificate-icon"><Award size={19} /></div><div><span className="certificate-label">CERTIFICATION 0{i + 1}</span><h3>{certificate}</h3></div><ArrowUpRight className="certificate-arrow" size={17} /></article>)}</div>
          </div>
        </section>

        <section className="section-wrap section-pad coding-section" id="coding">
          <SectionHeading eyebrow="FIND ME ONLINE" title={<>Let&apos;s connect & <span className="gradient-text">collaborate.</span></>} description="Visit my coding and professional profiles. Add the correct profile links in the project configuration before publishing." />
          <div className="profile-grid">
            <div className="profile-card reveal"><Github size={25} /><div><h3>GitHub</h3><p>Projects and code repositories</p></div><SocialLink href={profile.github} label="Open profile"><ArrowUpRight size={16} /></SocialLink></div>
            <div className="profile-card reveal"><Linkedin size={25} /><div><h3>LinkedIn</h3><p>Professional profile and opportunities</p></div><SocialLink href={profile.linkedin} label="Open profile"><ArrowUpRight size={16} /></SocialLink></div>
          </div>
        </section>

        <section className="contact-section section-pad" id="contact">
          <div className="section-wrap contact-grid">
            <div className="contact-copy reveal">
              <span className="eyebrow"><Sparkles size={14} /> HAVE A PROJECT IN MIND?</span>
              <h2>Let&apos;s make something <span className="gradient-text">useful.</span></h2>
              <p>Have an internship opportunity, a project idea or want to collaborate? Send me a message.</p>
              <a className="contact-detail" href={`mailto:${profile.email}`}><span className="contact-detail-icon"><Mail size={18} /></span><span><small>Email me</small><strong>{profile.email}</strong></span><ArrowUpRight size={16} /></a>
              <div className="contact-detail"><span className="contact-detail-icon"><MapPin size={18} /></span><span><small>Based in</small><strong>{profile.location}</strong></span></div>
              <div className="contact-detail"><span className="contact-detail-icon"><BriefcaseBusiness size={18} /></span><span><small>Currently</small><strong>Open to internships & opportunities</strong></span></div>
            </div>
            <form className="contact-form reveal" onSubmit={handleContact}>
              <div className="form-heading"><h3>Send a message</h3><span><span className="status-dot" /> Usually replies by email</span></div>
              <div className="form-row">
                <label>Your name<input name="name" value={form.name} onChange={updateForm} placeholder="Jane Smith" minLength="2" maxLength="80" required /></label>
                <label>Email address<input name="email" type="email" value={form.email} onChange={updateForm} placeholder="jane@example.com" maxLength="254" required /></label>
              </div>
              <label>Subject <span className="optional">(optional)</span><input name="subject" value={form.subject} onChange={updateForm} placeholder="Internship / collaboration / hello" maxLength="120" /></label>
              <label>Your message<textarea name="message" value={form.message} onChange={updateForm} placeholder="Tell me a little about what you have in mind..." minLength="10" maxLength="3000" rows="5" required /></label>
              <button className="button button-primary submit-button" type="submit" disabled={formState.loading}>{formState.loading ? "Sending..." : "Send message"} <Send size={16} /></button>
              {formState.message && <p className={`form-feedback ${formState.error ? "form-error" : "form-success"}`} role="status">{formState.message}</p>}
              <p className="form-privacy">Your message is sent to the portfolio API and stored in its database. Email notification requires SMTP configuration.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer section-wrap">
        <a className="brand" href="#home"><span className="brand-mark"><Code2 size={17} /></span><span>manish<span className="brand-dot">.</span>dev</span></a>
        <p>Designed & built with curiosity by Manish Kumar Chaurasiya.</p>
        <a href="#home" className="back-top">Back to top <ArrowUpRight size={14} /></a>
        <span className="footer-copy">© {new Date().getFullYear()} Manish</span>
      </footer>

      <button className="floating-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"><ArrowUpRight size={18} /></button>

      {activeProject && (
        <div className="modal-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) setActiveProject(null); }}>
          <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button className="modal-close icon-button" onClick={() => setActiveProject(null)} aria-label="Close project details"><X size={19} /></button>
            <span className="eyebrow"><ProjectIcon name={activeProject.icon} /> PROJECT DETAILS</span>
            <h2 id="modal-title">{activeProject.name}</h2><p className="modal-summary">{activeProject.summary}</p>
            <h3>Highlights</h3><ul>{activeProject.details.map(detail => <li key={detail}><CheckCircle2 size={16} />{detail}</li>)}</ul>
            <h3>Tech stack</h3><div className="project-tags">{activeProject.stack.map(tag => <span key={tag}>{tag}</span>)}</div>
            <div className="modal-actions">
              {safeExternalUrl(activeProject.github) ? <a className="button button-secondary" href={activeProject.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a> : <span className="modal-placeholder">Add verified GitHub URL in src/data.js</span>}
              {safeExternalUrl(activeProject.demo) ? <a className="button button-primary" href={activeProject.demo} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={16} /></a> : <span className="modal-placeholder">Add verified demo URL in src/data.js</span>}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
