"use client";

import { useState } from "react";
import ScrollExperience from "@/app/components/scroll-experience";
import { ArrowDownRight, ArrowRight, ArrowUpRight, BookOpen, Github, Globe2, GraduationCap, Linkedin, Mail, MapPin, Menu, Network, ShieldCheck, Terminal, X } from "lucide-react";

const projects = [
  { number:"01", name:"AegisSOC", category:"SECURITY OPERATIONS PLATFORM", description:"A local-first SOC platform for collecting security telemetry, investigating alerts, enriching indicators and governing response actions.", stack:["Python","FastAPI","PostgreSQL","Docker","Wazuh"], href:"/projects/aegissoc", featured:true },
  { number:"02", name:"NetSec Agent", category:"AI-ASSISTED NETWORK SECURITY", description:"A scoped network assessment assistant combining Nmap discovery with AI-assisted explanations of hosts, ports and services.", stack:["Python","Nmap","Streamlit","LangGraph","MCP"], href:"/projects/netsec-agent" },
  { number:"03", name:"NetOps Sentinel", category:"NETWORK OPERATIONS LAB", description:"A repeatable GNS3 lab that validates device inventories, checks endpoint reachability and records structured JSON evidence.", stack:["Python","GNS3","FRRouting","JSON","unittest"], href:"/projects/netops-sentinel" },
  { number:"04", name:"Secure Enterprise Network", category:"ENTERPRISE NETWORK DESIGN", description:"An enterprise network design exercise covering VLAN segmentation, VLSM addressing, routing, redundancy and access control.", stack:["VLANs","VLSM","OSPF","ACLs","HSRP","NAT"], href:"/projects/secure-enterprise-network" }
];

const credentials = [
  {name:"Microsoft Cybersecurity Analyst Professional Certificate",issuer:"Microsoft · Coursera",kind:"Professional certificate",brand:"microsoft",url:"https://coursera.org/share/8c749e56597ec054950dd2eea3b81a11"},
  {name:"Oracle Cloud Infrastructure Architect Associate",issuer:"Oracle",kind:"Cloud architecture",brand:"oracle",url:"https://tinyurl.com/ys52za9x"},
  {name:"Agentic AI Foundations Associate",issuer:"Oracle",kind:"AI foundations",brand:"oracle",url:"https://tinyurl.com/kaunkfhr"},
  {name:"NSE 3: FortiGate Operator",issuer:"Fortinet",kind:"Network security",brand:"fortinet",url:"https://www.credly.com/badges/0cabc6c2-af82-4bed-bbb7-6bf75c502465"},
  {name:"SQL (Intermediate)",issuer:"HackerRank",kind:"Technical skill",brand:"hackerrank",url:"https://www.hackerrank.com/certificates/fda18b2ff3f9"},
  {name:"Python Essentials 1",issuer:"Cisco Networking Academy",kind:"Programming",brand:"cisco",url:""},
  {name:"LFS101: Introduction to Linux",issuer:"The Linux Foundation",kind:"Systems",brand:"linuxfoundation",url:""},
  {name:"Cyber Security: Governance, Risk & Compliance",issuer:"Macquarie University · Coursera",kind:"Governance & risk",brand:"macquarie",url:""}
];

function CredentialMark({brand}:{brand:string}) {
  const logos:Record<string,{src:string;alt:string}> = {
    microsoft:{src:"https://cdn.simpleicons.org/microsoft",alt:"Microsoft"},
    oracle:{src:"https://cdn.simpleicons.org/oracle",alt:"Oracle"},
    fortinet:{src:"https://cdn.simpleicons.org/fortinet",alt:"Fortinet"},
    hackerrank:{src:"https://cdn.simpleicons.org/hackerrank",alt:"HackerRank"},
    cisco:{src:"https://cdn.simpleicons.org/cisco",alt:"Cisco"},
    linuxfoundation:{src:"https://www.linuxfoundation.org/hubfs/lf-stacked-color.svg",alt:"The Linux Foundation"},
    macquarie:{src:"https://brand.macquarie.com/en/fundamentals/_jcr_content/root/colour_block_1459931624/grid/image.coreimg.svg/1636423773308/fundamentals-logo-690x690.svg",alt:"Macquarie University"}
  };
  const logo=logos[brand];
  return <span className="credential-mark"><img src={logo.src} alt={logo.alt} loading="lazy"/></span>;
}

export default function Portfolio() {
  const [menuOpen,setMenuOpen]=useState(false);
  const close=()=>setMenuOpen(false);
  return <main id="top" className="portfolio">
    <ScrollExperience />\n    <a className="skip-link" href="#work">Skip to selected projects</a>
    <header className="site-header">
      <a className="brand" href="#top" onClick={close}><span className="brand-mark">BA<span>.</span></span><span>BABA AHMED EL BEKAY</span></a>
      <button className="menu-toggle" onClick={()=>setMenuOpen(!menuOpen)} aria-label={menuOpen?"Close menu":"Open menu"} aria-expanded={menuOpen}>{menuOpen?<X/>:<Menu/>}</button>
      <nav className={menuOpen?"main-nav nav-open":"main-nav"} aria-label="Main navigation">
        <a href="#work" onClick={close}>Work</a><a href="#about" onClick={close}>About</a><a href="#journey" onClick={close}>Journey</a><a href="#credentials" onClick={close}>Credentials</a><a className="nav-cta" href="#contact" onClick={close}>Let’s talk <ArrowUpRight size={15}/></a>
      </nav>
    </header>

    <section className="hero shell">
      <div className="hero-topline"><p className="eyebrow"><span className="availability-dot"/> OPEN TO REMOTE ROLES & INTERNSHIPS</p><span className="hero-location"><MapPin size={13}/> NOUAKCHOTT, MAURITANIA</span></div>
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-overline">NETWORK SECURITY / CLOUD / AUTOMATION</p>
          <h1>Network security<br/><em>and infrastructure.</em></h1>
          <p className="hero-intro">I’m <strong>Baba Ahmed El Bekay</strong>, a Network Security student at MIFITT Institute. I work on networking labs, security tools and cloud infrastructure projects.</p>
          <div className="hero-actions"><a className="button button-primary" href="#work">Explore selected work <ArrowRight size={16}/></a><a className="text-link" href="mailto:babaahmed3409@gmail.com">Start a conversation <ArrowUpRight size={15}/></a></div>
          <div className="hero-credentials"><span><ShieldCheck size={14}/> Microsoft Cybersecurity</span><span><Globe2 size={14}/> Oracle Cloud Infrastructure</span><span><Network size={14}/> Network Security</span></div>
        </div>
        <aside className="hero-aside">
          <div className="hero-orbit" aria-hidden="true"><div className="orbit-ring ring-one"/><div className="orbit-ring ring-two"/><div className="orbit-core"><span>BA</span><i/></div><span className="orbit-node node-a"><ShieldCheck size={17}/></span><span className="orbit-node node-b"><Network size={17}/></span><span className="orbit-node node-c"><Terminal size={17}/></span></div>
          <div className="hero-aside-bottom"><span className="card-kicker">CURRENT DIRECTION / 001</span><h2>Security-minded.<br/><em>Systems-focused.</em></h2><p>Learning through implementation, documentation and repeatable validation.</p><a href="#about">A little about me <ArrowDownRight size={15}/></a></div>
        </aside>
      </div>
      <div className="hero-foot"><span>OBSERVE CLEARLY · BUILD CAREFULLY · VERIFY EVERYTHING</span><span>PORTFOLIO / 2026</span></div>
    </section>

    <section className="work-section section-space" id="work"><div className="shell">
      <div className="section-heading"><div><p className="section-index">01 / SELECTED WORK</p><h2>Projects and <em>labs.</em></h2></div><p className="section-description">A selection of security, networking and automation projects. Open a case study for the architecture, implementation notes, validation and available evidence.</p></div>
      <div className="projects-grid">{projects.map(project=><article className={project.featured?"project-card featured":"project-card"} key={project.number}>
        <div className="project-meta"><span>{project.number} / {project.category}</span>{project.featured&&<span className="featured-label">FLAGSHIP</span>}</div>
        <h3>{project.name}<span>.</span></h3><p>{project.description}</p>
        <div className="project-card-bottom"><div className="tag-list">{project.stack.map(tag=><span key={tag}>{tag}</span>)}</div><a href={project.href}>Explore case study <ArrowUpRight size={16}/></a></div>
      </article>)}</div>
      <div className="work-footnote"><span>01—04</span><p>Each project is presented with clear scope and honest engineering boundaries. No fabricated metrics or demo imagery.</p><a href="https://github.com/TheRootBaba" target="_blank" rel="noreferrer">More on GitHub <ArrowUpRight size={14}/></a></div>
    </div></section>

    <section className="about-section section-space" id="about"><div className="shell">
      <div className="section-heading"><div><p className="section-index">02 / PROFILE</p><h2>About <em>me.</em></h2></div><p className="section-description">My interests sit at the intersection of network infrastructure, cybersecurity and cloud systems — with a practical bias toward building and testing.</p></div>
      <div className="about-story"><div className="about-lead"><span className="story-label">THE SHORT VERSION</span><p>I’m a BTS Network Security student at MIFITT Institute. Alongside my studies, I build hands-on labs and small engineering tools to understand how networks behave, how security controls work and how operational workflows can be made more reliable.</p></div><div className="about-detail"><span className="story-label">WHAT I VALUE</span><p>Clear technical documentation, controlled scope, repeatable checks and honest reporting. I’m open to remote internships and entry-level roles where I can support real engineering work, learn from experienced teams and grow across cybersecurity, cloud security or IT infrastructure.</p><div className="about-facts"><span><MapPin size={14}/> Mauritania · Remote-ready</span><span><BookOpen size={14}/> Student · 2025—Present</span></div></div></div>
      <div className="skills-heading"><span className="story-label">CAPABILITIES / WORKING TOOLKIT</span><span>TOOLS & CONCEPTS I’VE WORKED WITH</span></div>
      <div className="skills-grid"><article><span>01 / NETWORKING</span><h3>Network engineering</h3><p>TCP/IP, IPv4, VLSM, VLANs, OSPF, ACLs, DNS, DHCP and NAT.</p></article><article><span>02 / SECURITY</span><h3>Security operations</h3><p>Nmap, FortiGate, VPN, access controls and authorized network assessments.</p></article><article><span>03 / INFRASTRUCTURE</span><h3>Cloud &amp; systems</h3><p>Oracle Cloud Infrastructure, IAM, Linux, Bash and infrastructure fundamentals.</p></article><article><span>04 / DEVELOPMENT</span><h3>Automation &amp; code</h3><p>Python, SQL, Git, GNS3, Streamlit, JSON and API fundamentals.</p></article></div>
      <div className="language-row"><div><Globe2 size={17}/><span className="story-label">LANGUAGES</span></div><span><b>Arabic</b> Native</span><span><b>English</b> C1 · Advanced</span><span><b>French</b> Advanced</span></div>
    </div></section>

    <section className="journey-section section-space" id="journey"><div className="shell">
      <div className="section-heading"><div><p className="section-index">03 / EDUCATION</p><h2>Education</h2></div><p className="section-description">A focused academic path in science and network security, supported by independent technical practice.</p></div>
      <div className="education-timeline">
        <article className="education-card current"><div className="education-icon"><GraduationCap size={20}/></div><div className="education-period">2025 — PRESENT <span>CURRENT STUDIES</span></div><h3>BTS in Network Security</h3><p className="education-school">MIFITT Institute</p><p className="education-description">Higher technical studies focused on networking, infrastructure and security fundamentals, complemented by practical labs and independent projects.</p><div className="education-tags"><span>Networking</span><span>Network defense</span><span>Infrastructure</span></div></article>
        <div className="timeline-connector"><span/></div>
        <article className="education-card"><div className="education-icon"><BookOpen size={20}/></div><div className="education-period">2023 — 2024 <span>COMPLETED</span></div><h3>Baccalauréat in Science</h3><p className="education-school">Lycée d’Excellence 2</p><p className="education-description">Scientific secondary education providing a foundation in analytical thinking, mathematics and structured problem-solving.</p></article>
      </div>
    </div></section>

    <section className="credentials-section section-space" id="credentials"><div className="shell">
      <div className="section-heading"><div><p className="section-index">04 / CERTIFICATIONS</p><h2>Certificates</h2></div><p className="section-description">Professional certificates and focused technical learning across cybersecurity, cloud infrastructure, programming and systems.</p></div>
      
      <div className="cert-grid">{credentials.map((cert,index)=><article className="cert-card" key={cert.name}><div className="cert-card-top"><CredentialMark brand={cert.brand}/></div><div className="cert-type">{cert.kind}</div><h3>{cert.name}</h3><p className="cert-issuer">{cert.issuer}</p>{cert.url&&<div className="cert-card-bottom"><a href={cert.url} target="_blank" rel="noreferrer">View credential <ArrowUpRight size={14}/></a></div>}</article>)}</div>
    </div></section>

    <section className="contact-section" id="contact"><div className="shell"><p className="section-index">05 / CONTACT</p><div className="contact-grid"><div><span className="contact-overline">OPEN TO ROLES & INTERNSHIPS</span><h2>Have a role<br/><em>in mind?</em></h2></div><div><p>I’m open to remote internships and entry-level roles in cybersecurity, cloud security or IT infrastructure. Contact me by email or LinkedIn.</p><a className="button button-dark" href="mailto:babaahmed3409@gmail.com">Email me <ArrowUpRight size={16}/></a></div></div><div className="contact-methods"><a href="mailto:babaahmed3409@gmail.com"><Mail size={16}/><span><small>EMAIL</small>babaahmed3409@gmail.com</span><ArrowUpRight size={14}/></a><a href="tel:+22234092106"><Terminal size={16}/><span><small>PHONE</small>+222 34 09 21 06</span><ArrowUpRight size={14}/></a><a href="https://www.linkedin.com/in/babaahmedelbekay/" target="_blank" rel="noreferrer"><Linkedin size={16}/><span><small>LINKEDIN</small>Connect professionally</span><ArrowUpRight size={14}/></a></div><div className="contact-foot"><span>NOUAKCHOTT, MAURITANIA</span><span>REMOTE ROLES & INTERNSHIPS · CYBERSECURITY · CLOUD</span></div></div></section>
    <footer className="site-footer shell"><a className="brand-mark" href="#top">BA<span>.</span></a><span>© 2026 BABA AHMED EL BEKAY</span><div><a href="https://github.com/TheRootBaba" target="_blank" rel="noreferrer"><Github size={15}/> GitHub</a><a href="https://www.linkedin.com/in/babaahmedelbekay/" target="_blank" rel="noreferrer"><Linkedin size={15}/> LinkedIn</a><a href="mailto:babaahmed3409@gmail.com"><Mail size={15}/> Email</a></div></footer>
  </main>;
}
