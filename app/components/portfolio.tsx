"use client";

import { useState } from "react";
import ScrollExperience from "@/app/components/scroll-experience";
import { ArrowRight, ArrowUpRight, Github, Linkedin, Mail, Menu, X } from "lucide-react";

const projects = [
  { number:"01", name:"AegisSOC", category:"SECURITY OPERATIONS PLATFORM", description:"A local-first SOC platform for collecting security telemetry, investigating alerts, enriching indicators and governing response actions.", stack:["Python","FastAPI","PostgreSQL","Docker","Wazuh"], href:"/projects/aegissoc", featured:true },
  { number:"02", name:"NetSec Agent", category:"AI-ASSISTED NETWORK SECURITY", description:"A scoped network assessment assistant that combines Nmap scans with clear, AI-assisted explanations of discovered hosts, ports and services.", stack:["Python","Nmap","Streamlit","LangGraph","MCP"], href:"/projects/netsec-agent" },
  { number:"03", name:"NetOps Sentinel", category:"NETWORK MONITORING LAB", description:"A repeatable GNS3 lab that validates device inventories and endpoint reachability, then records results as structured JSON evidence.", stack:["Python","GNS3","FRRouting","JSON","unittest"], href:"/projects/netops-sentinel" },
  { number:"04", name:"Secure Enterprise Network", category:"ENTERPRISE NETWORK DESIGN", description:"A designed and tested enterprise network using segmentation, dynamic routing, redundancy and controlled access between network zones.", stack:["VLANs","VLSM","OSPF","ACLs","HSRP","NAT"], href:"/projects/secure-enterprise-network" }
];

const credentials = [
  ["Microsoft Cybersecurity Analyst Professional Certificate","Microsoft · Coursera","https://coursera.org/share/8c749e56597ec054950dd2eea3b81a11"],
  ["Oracle Cloud Infrastructure Architect Associate","Oracle","https://tinyurl.com/ys52za9x"],
  ["Agentic AI Foundations Associate","Oracle","https://tinyurl.com/kaunkfhr"],
  ["NSE 3: FortiGate Operator","Fortinet","https://www.credly.com/badges/0cabc6c2-af82-4bed-bbb7-6bf75c502465"],
  ["SQL (Intermediate)","HackerRank","https://www.hackerrank.com/certificates/fda18b2ff3f9"],
  ["Python Essentials 1","Cisco Networking Academy",""],
  ["LFS101: Introduction to Linux","The Linux Foundation",""],
  ["Cyber Security: Governance, Risk & Compliance","Macquarie University · Coursera",""]
];

export default function Portfolio() {
  const [menuOpen,setMenuOpen]=useState(false);
  const close=()=>setMenuOpen(false);
  return <main id="top" className="portfolio">
    <ScrollExperience />
    <header className="site-header">
      <a className="brand" href="#top" onClick={close}><span className="brand-mark">BA<span>.</span></span><span>BABA AHMED EL BEKAY</span></a>
      <button className="menu-toggle" onClick={()=>setMenuOpen(!menuOpen)} aria-label={menuOpen?"Close menu":"Open menu"} aria-expanded={menuOpen}>{menuOpen?<X/>:<Menu/>}</button>
      <nav className={menuOpen?"main-nav nav-open":"main-nav"} aria-label="Main navigation">
        <a href="#work" onClick={close}>Projects</a><a href="#about" onClick={close}>About</a><a href="#credentials" onClick={close}>Credentials</a><a className="nav-cta" href="#contact" onClick={close}>Contact <ArrowUpRight size={15}/></a>
      </nav>
    </header>

    <section className="hero shell">
      <p className="eyebrow"><span className="availability-dot"/> OPEN TO REMOTE INTERNSHIPS · NOUAKCHOTT, MAURITANIA</p>
      <div className="hero-grid">
        <div><h1>Cybersecurity<br/>with <em>clarity.</em></h1>
          <p className="hero-intro">I’m Baba Ahmed El Bekay, a BTS Network Security student interested in network defense, cloud infrastructure and practical security engineering. I build tools and labs that make technical work easier to inspect and understand.</p>
          <div className="hero-actions"><a className="button button-primary" href="#work">Explore projects <ArrowRight size={16}/></a><a className="text-link" href="mailto:babaahmed3409@gmail.com">Get in touch <ArrowUpRight size={15}/></a></div>
        </div>
        <aside className="profile-card"><span className="card-kicker">PROFILE / 001</span><h2>Curious by nature.<br/><em>Methodical by design.</em></h2><dl><div><dt>FOCUS</dt><dd>Network & security engineering</dd></div><div><dt>EDUCATION</dt><dd>BTS · Network Security</dd></div><div><dt>LOCATION</dt><dd>Nouakchott, Mauritania</dd></div><div><dt>LOOKING FOR</dt><dd>Remote cybersecurity / cloud internship</dd></div></dl><a href="https://github.com/TheRootBaba" target="_blank" rel="noreferrer">GitHub profile <ArrowUpRight size={14}/></a></aside>
      </div>
      <div className="hero-foot"><span>OBSERVE CLEARLY · BUILD CAREFULLY · VERIFY EVERYTHING</span><span>PORTFOLIO / 2026</span></div>
    </section>

    <section className="work-section section-space" id="work"><div className="shell">
      <div className="section-heading"><div><p className="section-index">01 / SELECTED WORK</p><h2>Projects &amp; <em>engineering.</em></h2></div><p className="section-description">Explore the work below. Each project has its own page with the problem, approach, technical details and supporting evidence. The landing page stays focused on the essentials.</p></div>
      <div className="projects-grid">{projects.map(project=><article className={project.featured?"project-card featured":"project-card"} key={project.number}>
        <div className="project-meta"><span>{project.number} / {project.category}</span>{project.featured&&<span className="featured-label">FLAGSHIP PROJECT</span>}</div>
        <h3>{project.name}<span>.</span></h3><p>{project.description}</p>
        <div className="project-card-bottom"><div className="tag-list">{project.stack.map(tag=><span key={tag}>{tag}</span>)}</div><a href={project.href}>View project <ArrowUpRight size={16}/></a></div>
      </article>)}</div>
    </div></section>

    <section className="about-section section-space" id="about"><div className="shell">
      <div className="section-heading"><div><p className="section-index">02 / ABOUT</p><h2>Learn deeply.<br/><em>Build honestly.</em></h2></div><p className="section-description">I care about how systems communicate, where trust boundaries sit and how to demonstrate that something works.</p></div>
      <div className="about-grid"><p>I’m studying Network Security at MIFITT Institute. My learning combines formal networking studies with hands-on labs and independent builds across Linux, cloud identity, Python automation and security tooling.</p><p>I value clear scope, repeatable checks and honest reporting. I’m looking for a remote internship where I can contribute, learn from experienced engineers and keep building. Arabic is my native language; I use English at C1 level and speak advanced French.</p></div>
      <div className="skills-grid"><article><span>01 / NETWORKING</span><h3>Network engineering</h3><p>TCP/IP, IPv4, VLSM, VLANs, OSPF, ACLs, DNS, DHCP and NAT.</p></article><article><span>02 / SECURITY</span><h3>Security operations</h3><p>Nmap, FortiGate, VPN, access controls and authorized assessments.</p></article><article><span>03 / INFRASTRUCTURE</span><h3>Cloud &amp; systems</h3><p>OCI, IAM, Linux, Bash and infrastructure fundamentals.</p></article><article><span>04 / DEVELOPMENT</span><h3>Automation &amp; code</h3><p>Python, SQL, Git, GNS3, Streamlit and JSON.</p></article></div>
    </div></section>

    <section className="credentials-section section-space" id="credentials"><div className="shell">
      <div className="section-heading"><div><p className="section-index">03 / EDUCATION &amp; CREDENTIALS</p><h2>Always in <em>progress.</em></h2></div><p className="section-description">Formal study and professional learning that support my work across security, cloud and infrastructure.</p></div>
      <div className="credentials-grid"><div><h3 className="subheading">Education</h3><div className="education-row"><span>2025 — PRESENT</span><div><b>BTS in Network Security</b><p>MIFITT Institute</p></div></div><div className="education-row"><span>2023 — 2024</span><div><b>Baccalauréat in Science</b><p>Lycée d’Excellence 2</p></div></div></div><div><h3 className="subheading">Selected certifications</h3>{credentials.map(([name,issuer,url])=><div className="cert-row" key={name}><div><b>{name}</b><p>{issuer}</p></div>{url?<a href={url} target="_blank" rel="noreferrer">Verify <ArrowUpRight size={13}/></a>:<span>COMPLETED</span>}</div>)}</div></div>
    </div></section>

    <section className="contact-section" id="contact"><div className="shell"><p className="section-index">04 / CONTACT</p><div className="contact-grid"><h2>Let’s build<br/><em>something useful.</em></h2><div><p>Interested in an internship, a collaboration or a technical conversation? I’d be glad to hear from you.</p><a className="button button-dark" href="mailto:babaahmed3409@gmail.com">Email Baba <ArrowUpRight size={16}/></a></div></div><div className="contact-foot"><span>NOUAKCHOTT, MAURITANIA</span><a href="mailto:babaahmed3409@gmail.com">BABAAHMED3409@GMAIL.COM</a></div></div></section>
    <footer className="site-footer shell"><a className="brand-mark" href="#top">BA<span>.</span></a><span>© 2026 BABA AHMED EL BEKAY</span><div><a href="https://github.com/TheRootBaba" target="_blank" rel="noreferrer"><Github size={15}/> GitHub</a><a href="https://www.linkedin.com/in/babaahmedelbekay/" target="_blank" rel="noreferrer"><Linkedin size={15}/> LinkedIn</a><a href="mailto:babaahmed3409@gmail.com"><Mail size={15}/> Email</a></div></footer>
  </main>;
}
