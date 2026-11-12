"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDownRight, ArrowUpRight, ArrowRight, Github, Linkedin, Mail,
  Menu, X, ShieldCheck, Network, Cloud, Code2, LockKeyhole, Play
} from "lucide-react";

const credentials = [
  ["Microsoft Cybersecurity Analyst", "Microsoft · Coursera", "https://coursera.org/share/8c749e56597ec054950dd2eea3b81a11"],
  ["OCI Architect Associate", "Oracle Cloud Infrastructure", "https://tinyurl.com/ys52za9x"],
  ["Agentic AI Foundations Associate", "Oracle", "https://tinyurl.com/kaunkfhr"],
  ["NSE 3 FortiGate Operator", "Fortinet", "https://www.credly.com/badges/0cabc6c2-af82-4bed-bbb7-6bf75c502465"],
  ["SQL Intermediate", "HackerRank", "https://www.hackerrank.com/certificates/fda18b2ff3f9"],
  ["Python Essentials 1", "Cisco Networking Academy", ""],
  ["LFS101 — Introduction to Linux", "Linux Foundation", ""],
  ["Cyber Security: Governance, Risk & Compliance", "Macquarie University · Coursera", ""]
];

const skills = [
  "Network security", "Python", "TCP/IP", "Nmap", "Linux", "FortiGate",
  "Oracle Cloud", "LangGraph", "MCP", "GNS3", "FRRouting", "SQL"
];

const rise = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } }
};

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const reveal = reduced ? false : "hidden";

  return (
    <main id="top" className="portfolio">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <motion.div className="reading-progress" style={{ scaleX: progress }} />
      <header className={scrolled ? "site-header is-scrolled" : "site-header"}>
        <a className="brand" href="#top" onClick={closeMenu} aria-label="Baba Ahmed home">
          <span className="brand-mark">BA<span>.</span></span>
          <span className="brand-name">BABA AHMED EL BEKAY</span>
        </a>
        <nav className={menuOpen ? "main-nav nav-open" : "main-nav"} aria-label="Main navigation">
          <a href="#work" onClick={closeMenu}>Work <span>01</span></a>
          <a href="#about" onClick={closeMenu}>About <span>02</span></a>
          <a href="#credentials" onClick={closeMenu}>Credentials <span>03</span></a>
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Let’s talk <ArrowUpRight size={14} /></a>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <div id="main-content" tabIndex={-1}>
      <section className="hero shell">
        <div className="hero-meta">
          <span><i className="availability-dot" /> AVAILABLE FOR REMOTE INTERNSHIPS</span>
          <span>BA / PORTFOLIO — 2026</span>
        </div>
        <div className="hero-main">
          <motion.div className="hero-copy" initial={reveal} animate="visible" variants={rise}>
            <p className="eyebrow">NETWORK SECURITY · AUTOMATION · CLOUD</p>
            <h1>Building trust<br />into <em>every</em><br /><span>connection.</span></h1>
            <p className="hero-intro">I’m Baba Ahmed El Bekay, a BTS Network Security student based in Nouakchott, Mauritania. I build practical security tools, investigate network behavior and work with cloud and Linux infrastructure. I’m seeking a remote internship in cybersecurity, cloud security or IT infrastructure.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">Explore my work <ArrowDownRight size={16} /></a>
              <a className="text-link" href="https://www.linkedin.com/in/babaahmedelbekay/" target="_blank" rel="noreferrer">Connect on LinkedIn <ArrowUpRight size={15} /></a>
            </div>
          </motion.div>
          <motion.aside className="hero-aside" initial={reveal} animate="visible" variants={{...rise, visible:{...rise.visible, transition:{...rise.visible.transition, delay:.12}}}}>
            <div className="aside-top"><span>AT A GLANCE</span><span>MAURITANIA</span></div>
            <div className="aside-statement">Curious by nature.<br /><strong>Methodical by design.</strong></div>
            <div className="aside-rule" />
            <dl className="profile-facts">
              <div><dt>FOCUS</dt><dd>Network & security engineering</dd></div>
              <div><dt>STUDY</dt><dd>BTS · Network Security</dd></div>
              <div><dt>BASED</dt><dd>Nouakchott, Mauritania</dd></div>
            </dl>
            <a className="aside-link" href="https://github.com/TheRootBaba" target="_blank" rel="noreferrer">View GitHub profile <ArrowUpRight size={14}/></a>
          </motion.aside>
        </div>
        <div className="hero-bottom"><span>OBSERVE CLEARLY. BUILD CAREFULLY. VERIFY EVERYTHING.</span><a href="#work">SCROLL TO EXPLORE <ArrowDownRight size={13}/></a></div>
      </section>

      <section className="intro-strip">
        <div className="shell intro-strip-inner">
          <span className="strip-label">WHAT I WORK ON</span>
          <p>Networks that make sense. Security with boundaries. Tools that show their work.</p>
        </div>
      </section>

      <section className="work-section shell section-space" id="work">
        <motion.div className="section-heading" initial={reveal} whileInView="visible" viewport={{once:true,amount:.2}} variants={rise}>
          <div><p className="section-index">01 / SELECTED WORK</p><h2>Built to be<br /><em>useful.</em></h2></div>
          <p className="section-description">A focused selection of practical engineering work. Each project starts with a real problem, defines its limits and makes the result inspectable.</p>
        </motion.div>

        <div className="projects-layout">
          <motion.article className="project-card aegis-card" initial={reveal} whileInView="visible" viewport={{once:true,amount:.12}} variants={rise}>
            <div className="project-topline"><span>FLAGSHIP PROJECT / 00</span><span>SECURITY OPERATIONS PLATFORM</span></div>
            <div className="project-heading-row">
              <div><h3>AegisSOC<span>.</span></h3><p className="project-lede">A local-first security operations platform for collecting telemetry, investigating alerts and coordinating controlled response. Built around evidence, workspace boundaries and auditable workflows.</p></div>
              <a className="round-link" href="https://github.com/TheRootBaba/AegisSOC" target="_blank" rel="noreferrer" aria-label="Open AegisSOC on GitHub"><ArrowUpRight size={20}/></a>
            </div>
            <div className="aegis-overview">
              <div><b>01</b><strong>INGEST</strong><span>Normalize events from Wazuh and other sources with replay protection.</span></div>
              <div><b>02</b><strong>INVESTIGATE</strong><span>Search events, inspect alert evidence and connect incidents to cases.</span></div>
              <div><b>03</b><strong>DETECT</strong><span>Run deterministic detections and a documented, bounded Sigma subset.</span></div>
              <div><b>04</b><strong>RESPOND</strong><span>Route approved actions to configured receivers with audit and idempotency controls.</span></div>
            </div>
            <div className="aegis-proof">
              <div><span className="mini-label">ENGINEERING HIGHLIGHTS</span><p>FastAPI · PostgreSQL · Python · Docker Compose · Alembic · PostgreSQL RLS · Wazuh · MISP · OpenCTI</p></div>
              <div><span className="mini-label">IMPORTANT BOUNDARY</span><p>Active engineering and lab deployment — not a certified production SIEM. Response is receiver-based; scanner imports normalize exports rather than launch scans.</p></div>
            </div>
            <div className="project-footer"><div className="tag-list">{["FastAPI","PostgreSQL","Python","Docker","Wazuh","Sigma"].map(tag=><span key={tag}>{tag}</span>)}</div><a href="/projects/aegissoc">Read the engineering case study <ArrowRight size={14}/></a></div>
          </motion.article>
          <motion.article className="project-card enterprise-card" initial={reveal} whileInView="visible" viewport={{once:true,amount:.12}} variants={rise}>
            <div className="project-topline"><span>PROJECT / 03</span><span>ENTERPRISE NETWORK DESIGN</span></div>
            <h3>Secure Enterprise Network<span>.</span></h3>
            <p className="project-lede">Designed and tested a segmented enterprise network using VLANs, VLSM, OSPF, ACLs, HSRP, DHCP, DNS and NAT. The work focuses on routing, segmentation, redundancy and controlled connectivity.</p>
            <div className="enterprise-stack"><span>SEGMENTATION / VLAN + VLSM</span><span>ROUTING / OSPF + HSRP</span><span>POLICY / ACL</span><span>SERVICES / DHCP + DNS + NAT</span></div>
            <div className="project-footer"><div className="tag-list">{["IPv4","VLAN","OSPF","ACL","HSRP","GNS3"].map(tag=><span key={tag}>{tag}</span>)}</div><a href="https://github.com/TheRootBaba" target="_blank" rel="noreferrer">Explore related lab work <ArrowRight size={14}/></a></div>
          </motion.article>
          <motion.article className="project-card netsec-card" initial={reveal} whileInView="visible" viewport={{once:true,amount:.12}} variants={rise}>
            <div className="project-topline"><span>FEATURED PROJECT / 01</span><span>AI-ASSISTED SECURITY TOOLING</span></div>
            <div className="project-heading-row">
              <div><h3>NetSec Agent<span>.</span></h3><p className="project-lede">A Python-based assistant for authorized network checks. It discovers hosts, checks ports and services, then helps interpret the results.</p></div>
              <a className="round-link" href="https://github.com/TheRootBaba/NetSEc-agent" target="_blank" rel="noreferrer" aria-label="Open NetSec Agent on GitHub"><ArrowUpRight size={20}/></a>
            </div>
            <div className="netsec-demo">
              <div className="demo-bar"><span><i/> LIVE PROJECT WALKTHROUGH</span><span>NETSEC AGENT / DEMO</span></div>
              <video controls playsInline preload="metadata" poster="/assets/netsec-agent.svg">
                <source src="https://github.com/user-attachments/assets/870edb32-20fc-4f8a-aaf3-4c7679b5109c" type="video/mp4" />
                Your browser does not support embedded video. <a href="https://github.com/user-attachments/assets/870edb32-20fc-4f8a-aaf3-4c7679b5109c">Watch the NetSec Agent demo</a>.
              </video>
              <a className="demo-fallback" href="https://github.com/user-attachments/assets/870edb32-20fc-4f8a-aaf3-4c7679b5109c" target="_blank" rel="noreferrer"><Play size={13}/> Open the full demo <ArrowUpRight size={13}/></a>
            </div>
            <div className="project-bottom">
              <p>Built with Python, Streamlit, Nmap, LangGraph, MCP and Groq. It supports host discovery, TCP port and service detection, basic risk scoring and AI-assisted explanations.</p>
              <div className="project-facts"><span><b>01</b> PRIVATE IPv4 ONLY</span><span><b>02</b> UP TO 256 ADDRESSES</span><span><b>03</b> AUTHORIZED TARGETS ONLY</span></div>
            </div>
            <div className="project-footer"><div className="tag-list">{["Python", "LangGraph", "Nmap", "MCP", "Streamlit", "Groq"].map(tag=><span key={tag}>{tag}</span>)}</div><a href="https://github.com/TheRootBaba/NetSEc-agent" target="_blank" rel="noreferrer">Explore repository <ArrowRight size={14}/></a></div>
          </motion.article>

          <motion.article className="project-card netops-card" initial={reveal} whileInView="visible" viewport={{once:true,amount:.12}} variants={rise}>
            <div className="project-topline"><span>PROJECT / 02</span><span>NETWORK OPERATIONS LAB</span></div>
            <h3>NetOps Sentinel<span>.</span></h3>
            <p className="project-lede">A small simulated network used to practise inventory checks and connectivity validation. Results are saved as structured JSON for review.</p>
            <div className="topology-frame">
              <Image src="/assets/evidence/topology.png" alt="NetOps Sentinel GNS3 network topology" fill sizes="(max-width: 760px) 100vw, 42vw" />
              <span>THE LAB / GNS3 TOPOLOGY</span>
            </div>
            <div className="netops-summary"><span>3 ROUTERS</span><span>5 SWITCHES</span><span>5 ENDPOINT LANs</span></div>
            <div className="project-footer"><div className="tag-list">{["Python", "GNS3", "FRRouting", "JSON", "pytest"].map(tag=><span key={tag}>{tag}</span>)}</div><a href="https://github.com/TheRootBaba/netops-sentinel" target="_blank" rel="noreferrer">View lab evidence <ArrowRight size={14}/></a></div>
          </motion.article>
        </div>
      </section>

      <section className="about-section section-space" id="about">
        <div className="shell">
          <motion.div className="section-heading" initial={reveal} whileInView="visible" viewport={{once:true,amount:.2}} variants={rise}>
            <div><p className="section-index">02 / ABOUT</p><h2>Learn deeply.<br /><em>Build honestly.</em></h2></div>
            <p className="section-description">I care about the engineering behind the interface: how systems communicate, where trust boundaries sit and how to prove that something works.</p>
          </motion.div>
          <div className="about-grid">
            <div className="about-quote"><span>WORKING PRINCIPLE</span><p>“Understand the system before you try to secure it.”</p><div className="quote-mark">BA / 001</div></div>
            <div className="about-copy">
              <p>I study Network Security at MIFITT Institute. Alongside my coursework, I build hands-on labs and small tools using Linux, Python, cloud identity and network security technologies.</p>
              <p>My approach is practical: define the scope, test carefully, keep evidence and explain limitations. I’m looking for a remote internship where I can contribute to real work and learn from experienced engineers.</p>
              <div className="language-line"><span>LANGUAGES</span><b>Arabic</b> Native <i/> <b>English</b> C1 <i/> <b>French</b> Advanced</div>
            </div>
          </div>
          <div className="capabilities">
            <article><Network/><span>01 / NETWORKS</span><h3>Network engineering</h3><p>TCP/IP, IPv4, subnetting, VLANs, routing concepts, ACLs, DNS, DHCP and GNS3.</p></article>
            <article><ShieldCheck/><span>02 / SECURITY</span><h3>Security operations</h3><p>Nmap, FortiGate, VPN fundamentals, access control and authorized assessment workflows.</p></article>
            <article><Cloud/><span>03 / INFRASTRUCTURE</span><h3>Cloud & systems</h3><p>Oracle Cloud Infrastructure, IAM fundamentals, Linux, Bash and infrastructure concepts.</p></article>
            <article><Code2/><span>04 / DEVELOPMENT</span><h3>Automation & code</h3><p>Python, SQL, Git, Streamlit, JSON, testing and AI-assisted development.</p></article>
          </div>
          <div className="skill-line"><span>TOOLS & TOPICS</span><div>{skills.map(skill=><span key={skill}>{skill}</span>)}</div></div>
        </div>
      </section>

      <section className="credentials-section shell section-space" id="credentials">
        <motion.div className="section-heading" initial={reveal} whileInView="visible" viewport={{once:true,amount:.2}} variants={rise}>
          <div><p className="section-index">03 / EDUCATION & CREDENTIALS</p><h2>Always in<br /><em>progress.</em></h2></div>
          <p className="section-description">A foundation in network security, strengthened through focused professional learning and continuous practice.</p>
        </motion.div>
        <div className="credentials-grid">
          <div className="education-panel">
            <span className="panel-label">EDUCATION</span>
            <div className="education-item"><span>2025 — PRESENT</span><div><h3>BTS — Network Security</h3><p>MIFITT Institute</p></div></div>
            <div className="education-item"><span>2023 — 2024</span><div><h3>Baccalauréat — Science</h3><p>Lycée d’Excellence 2</p></div></div>
            <div className="education-note"><LockKeyhole size={16}/><p>Practical work grounded in authorized testing, clear scope and evidence-led reporting.</p></div>
          </div>
          <div className="cert-panel">
            <span className="panel-label">SELECTED CERTIFICATIONS</span>
            {credentials.map(([name,issuer,url],i)=><div className="cert-row" key={name}><span className="cert-number">{String(i+1).padStart(2,"0")}</span><div><h3>{name}</h3><p>{issuer} · 2026</p></div>{url?<a href={url} target="_blank" rel="noreferrer">Verify <ArrowUpRight size={13}/></a>:<span className="completed-label">COMPLETED</span>}</div>)}
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="shell">
          <div className="contact-top"><span>04 / START A CONVERSATION</span><span>OPEN TO OPPORTUNITIES</span></div>
          <div className="contact-main"><h2>Have a good<br /><em>challenge?</em></h2><div className="contact-copy"><p>Let’s talk about network security, an internship opportunity or a project worth building carefully.</p><a className="button button-primary" href="mailto:babaahmed3409@gmail.com">Email me <ArrowUpRight size={16}/></a></div></div>
          <div className="contact-bottom"><span>NOUAKCHOTT, MAURITANIA</span><div className="contact-links"><a href="mailto:babaahmed3409@gmail.com">EMAIL <ArrowUpRight size={13}/></a><a href="tel:+22234092106">+222 34 09 21 06 <ArrowUpRight size={13}/></a><a href="https://www.linkedin.com/in/babaahmedelbekay/" target="_blank" rel="noreferrer">LINKEDIN <ArrowUpRight size={13}/></a></div></div>
        </div>
      </section>

      </div>
      <footer className="site-footer shell">
        <a className="footer-brand" href="#top">BA<span>.</span></a>
        <span>© {new Date().getFullYear()} BABA AHMED EL BEKAY</span>
        <div><a href="https://github.com/TheRootBaba" target="_blank" rel="noreferrer"><Github size={14}/> GITHUB</a><a href="https://www.linkedin.com/in/babaahmedelbekay/" target="_blank" rel="noreferrer"><Linkedin size={14}/> LINKEDIN</a><a href="mailto:babaahmed3409@gmail.com"><Mail size={14}/> EMAIL</a></div>
        <a className="back-top" href="#top">BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}
