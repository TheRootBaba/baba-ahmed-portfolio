"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Activity, Github, Linkedin,
  Mail, Menu, Network, ShieldCheck, Terminal, X, Globe2, Cpu,
  Play, Fingerprint, ChevronDown
} from "lucide-react";

const projects = [
  {
    number: "01",
    name: "NetSec Agent",
    type: "Security automation",
    description:
      "An AI-assisted interface for authorized network assessments. Combines Nmap discovery and service detection with a LangGraph agent workflow, MCP tools and Groq-powered explanations.",
    stack: ["Python 3.12", "Streamlit", "Nmap", "LangGraph", "MCP", "Groq"],
    image: "/assets/netsec-agent.svg",
    github: "https://github.com/TheRootBaba/NetSEc-agent",
    demo: "https://github.com/user-attachments/assets/870edb32-20fc-4f8a-aaf3-4c7679b5109c",
    featured: true,
    note: "Authorized private IPv4 scope · up to 256 addresses"
  },
  {
    number: "02",
    name: "NetOps Sentinel",
    type: "Network operations lab",
    description:
      "A GNS3 network operations lab with three FRRouting routers, five switches and five endpoint LANs. Python validates inventory, runs read-only reachability probes and records JSON evidence.",
    stack: ["Python", "GNS3 2.2", "FRRouting", "JSON", "Unit tests"],
    image: "/assets/netops-sentinel.svg",
    github: "https://github.com/TheRootBaba/netops-sentinel",
    demo: "https://github.com/TheRootBaba/netops-sentinel/blob/main/EVIDENCE.md",
    featured: false,
    note: "Static-routing baseline · seven reported passing unit tests"
  }
];

const credentials = [
  ["Microsoft Cybersecurity Analyst", "Microsoft · Coursera", "Verify", "https://coursera.org/share/8c749e56597ec054950dd2eea3b81a11"],
  ["OCI Architect Associate", "Oracle Cloud Infrastructure", "Verify", "https://tinyurl.com/ys52za9x"],
  ["Agentic AI Foundations Associate", "Oracle", "Verify", "https://tinyurl.com/kaunkfhr"],
  ["NSE 3 FortiGate Operator", "Fortinet", "Verify", "https://www.credly.com/badges/0cabc6c2-af82-4bed-bbb7-6bf75c502465"],
  ["SQL Intermediate", "HackerRank", "Verify", "https://www.hackerrank.com/certificates/fda18b2ff3f9"],
  ["Python Essentials 1", "Cisco Networking Academy", "Credential", ""],
  ["LFS101 — Introduction to Linux", "Linux Foundation", "Credential", ""],
  ["Cyber Security: Governance, Risk & Compliance", "Macquarie University · Coursera", "Credential", ""]
];

const skills = [
  { icon: Network, number: "01", title: "Network engineering", detail: "TCP/IP, IPv4, subnetting, VLSM, VLANs, OSPF concepts, ACLs, DNS, DHCP, NAT and GNS3." },
  { icon: ShieldCheck, number: "02", title: "Security operations", detail: "Nmap, FortiGate, VPN fundamentals, access control, authorized scanning and security monitoring." },
  { icon: Globe2, number: "03", title: "Cloud & systems", detail: "Oracle Cloud Infrastructure, IAM fundamentals, Linux, Bash and infrastructure concepts." },
  { icon: Terminal, number: "04", title: "Development & AI", detail: "Python, SQL, Git, Streamlit, JSON, test-driven workflows and AI-assisted tooling." }
];

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
} as const;

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="site-header">
        <a className="wordmark" href="#top" onClick={closeMenu} aria-label="Baba Ahmed home">
          <span className="wordmark-mark">BA<span>.</span></span>
          <span className="wordmark-name">BABA AHMED <i>EL BEKAY</i></span>
        </a>
        <nav className={menuOpen ? "nav nav-open" : "nav"} aria-label="Main navigation">
          <a href="#work" onClick={closeMenu}>Selected work</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#credentials" onClick={closeMenu}>Credentials</a>
          <a className="nav-contact" href="mailto:babaahmed3409@gmail.com" onClick={closeMenu}>Let’s talk <ArrowUpRight size={14} /></a>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <section className="hero section-shell" id="top">
        <div className="hero-copy">
          <motion.div className="eyebrow" initial="hidden" animate="visible" variants={fadeUp}>
            <span className="status-dot" /> AVAILABLE FOR REMOTE INTERNSHIPS
          </motion.div>
          <motion.h1 initial="hidden" animate="visible" variants={{...fadeUp, visible:{...fadeUp.visible, transition:{...fadeUp.visible.transition, delay:.08}}}}>
            Engineering<br />the <span>invisible</span><br />infrastructure.
          </motion.h1>
          <motion.p className="hero-intro" initial="hidden" animate="visible" variants={{...fadeUp, visible:{...fadeUp.visible, transition:{...fadeUp.visible.transition, delay:.16}}}}>
            I’m <strong>Baba Ahmed El Bekay</strong> — a network security and cloud infrastructure student who turns curiosity into practical tools, resilient systems and clear technical evidence.
          </motion.p>
          <motion.div className="hero-actions" initial="hidden" animate="visible" variants={{...fadeUp, visible:{...fadeUp.visible, transition:{...fadeUp.visible.transition, delay:.24}}}}>
            <a className="button button-primary" href="#work">Explore my work <ArrowDown size={15} /></a>
            <a className="button button-quiet" href="https://github.com/TheRootBaba" target="_blank" rel="noreferrer">GitHub profile <ArrowUpRight size={15} /></a>
          </motion.div>
          <motion.div className="hero-footnote" initial="hidden" animate="visible" variants={fadeUp}>
            <span>BA / 2026</span><span>NETWORKS · SECURITY · CLOUD</span><span>NOUAKCHOTT, MR</span>
          </motion.div>
        </div>

        <motion.div className="hero-art" initial={{opacity:0, scale:.96}} animate={{opacity:1, scale:1}} transition={{duration:1, ease:"easeOut", delay:.12}}>
          <div className="art-topline"><span>FIELD NOTES / 001</span><span className="art-live"><i /> SYSTEMS THINKING</span></div>
          <div className="network-visual">
            <div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="orbit orbit-c" />
            <div className="network-core"><Network size={36} strokeWidth={1.2} /><span>NETWORK<br/>INTELLIGENCE</span></div>
            <div className="node node-one"><ShieldCheck size={18} /></div>
            <div className="node node-two"><Cpu size={17} /></div>
            <div className="node node-three"><Activity size={18} /></div>
            <div className="node node-four"><Fingerprint size={17} /></div>
            <div className="signal signal-one" /><div className="signal signal-two" /><div className="signal signal-three" />
          </div>
          <div className="art-bottomline"><span>OBSERVE / UNDERSTAND / SECURE</span><span>01 — 04</span></div>
          <div className="art-coordinate">18°04′N<br/>15°58′W</div>
        </motion.div>
        <a className="scroll-cue" href="#work"><span>SCROLL TO EXPLORE</span><ChevronDown size={15}/></a>
      </section>

      <section className="signal-strip" aria-label="Focus areas">
        <div className="signal-inner">
          <span>BUILT WITH INTENT</span><i /><span>NETWORK SECURITY</span><i /><span>CLOUD INFRASTRUCTURE</span><i /><span>PYTHON AUTOMATION</span><i /><span>TECHNICAL EVIDENCE</span>
        </div>
      </section>

      <section className="work-section section-shell" id="work">
        <div className="section-heading">
          <div><div className="section-kicker">01 / SELECTED ENGINEERING</div><h2>Work that<br/><span>does the work.</span></h2></div>
          <p>Less concept theatre. More practical engineering. Two projects built to explore real systems, test assumptions and leave evidence behind.</p>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <motion.article className="project-card" key={project.number} initial="hidden" whileInView="visible" viewport={{once:true, amount:.16}} variants={reduceMotion ? {} : fadeUp}>
              <div className="project-copy">
                <div className="project-meta"><span>CASE / {project.number}</span><span>{project.type}</span></div>
                <h3>{project.name}<span>.</span></h3>
                <p>{project.description}</p>
                <div className="tag-list">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <div className="project-note"><span className="note-mark">↳</span>{project.note}</div>
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noreferrer">Source code <ArrowUpRight size={15}/></a>
                  <a href={project.demo} target="_blank" rel="noreferrer">{project.featured ? "Watch demo" : "Evidence log"} <ArrowUpRight size={15}/></a>
                </div>
              </div>
              <div className="project-visual">
                {project.featured ? (
                  <div className="project-image-frame featured-project">
                    <Image src={project.image} alt="NetSec Agent project identity artwork" fill sizes="(max-width: 900px) 100vw, 50vw" className="project-image contain-image" />
                    <div className="visual-label"><span>SECURITY AUTOMATION / 01</span><span>LIVE DEMO ↗</span></div>
                    <a className="play-overlay" href={project.demo} target="_blank" rel="noreferrer" aria-label="Watch NetSec Agent demo"><Play size={18} fill="currentColor"/></a>
                  </div>
                ) : (
                  <div className="project-image-frame">
                    <button className="image-button" onClick={() => setActiveImage("/assets/evidence/topology.png")} aria-label="View NetOps Sentinel topology screenshot">
                      <Image src="/assets/evidence/topology.png" alt="Original GNS3 topology from the NetOps Sentinel lab" fill sizes="(max-width: 900px) 100vw, 50vw" className="project-image" />
                    </button>
                    <div className="visual-label"><span>GNS3 LAB / TOPOLOGY</span><span>ORIGINAL EVIDENCE ↗</span></div>
                  </div>
                )}
                <div className="project-image-caption"><span>{project.number} / 02</span><span>{project.featured ? "AGENT WORKFLOW" : "NETWORK TOPOLOGY"}</span></div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="evidence-section section-shell">
        <div className="section-heading compact-heading">
          <div><div className="section-kicker">02 / PROOF, NOT PROMISES</div><h2>Evidence is<br/><span>part of the build.</span></h2></div>
          <p>Original lab captures from NetOps Sentinel. The details matter: topology, router configuration and connectivity checks.</p>
        </div>
        <div className="evidence-grid">
          {[
            ["/assets/evidence/connectivity-hq.png","Connectivity validation"],
            ["/assets/evidence/core-router.png","Core router configuration"],
            ["/assets/evidence/stanley-router.png","Router configuration"],
            ["/assets/evidence/pam-endpoint.png","Endpoint verification"]
          ].map(([src, label], index) => (
            <button className={"evidence-tile evidence-tile-"+index} key={src} onClick={() => setActiveImage(src)} aria-label={"Open "+label+" screenshot"}>
              <Image src={src} alt={label+" screenshot from the NetOps Sentinel lab"} fill sizes="(max-width: 700px) 100vw, 50vw" />
              <span>{label}<ArrowUpRight size={14}/></span>
            </button>
          ))}
        </div>
      </section>

      <section className="about-section section-shell" id="about">
        <div className="section-heading">
          <div><div className="section-kicker">03 / THE ENGINEER</div><h2>Curiosity, then<br/><span>configuration.</span></h2></div>
          <p>My starting point is the network. My curiosity goes further — into identity, infrastructure, security and the systems behind the interface.</p>
        </div>
        <div className="about-layout">
          <div className="about-lead">
            <span className="about-index">BA / PROFILE 001</span>
            <h3>Understand the system. Then make it better.</h3>
            <div className="location-stamp"><Globe2 size={15}/> NOUAKCHOTT, MAURITANIA</div>
          </div>
          <div className="about-body">
            <p>I’m Baba Ahmed El Bekay, a BTS Network Security student at MIFITT Institute. I’m drawn to the infrastructure beneath the interface: how devices communicate, where trust boundaries sit, how services are exposed, and what happens when something fails.</p>
            <p>My learning path combines formal networking studies with hands-on labs and independent builds. I’ve worked with routing and switching concepts, Linux systems, cloud identity fundamentals and Python automation. Projects like NetSec Agent and NetOps Sentinel let me turn those foundations into tools and repeatable tests — not just notes.</p>
            <p>I also care about the communication side of engineering: keeping a clear record, stating limitations honestly and making technical work understandable to the next person. I speak Arabic natively, with advanced English and French, and I’m looking for a remote internship where I can contribute while learning from an experienced team.</p>
          </div>
        </div>
        <div className="capability-grid">
          {skills.map(({icon: Icon, number, title, detail}) => (
            <motion.article className="capability-card" key={number} whileHover={reduceMotion ? undefined : {y:-5}} transition={{duration:.2}}>
              <div className="capability-top"><span>{number} / CAPABILITY</span><Icon size={19} strokeWidth={1.5}/></div>
              <h3>{title}</h3><p>{detail}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="credentials-section section-shell" id="credentials">
        <div className="section-heading">
          <div><div className="section-kicker">04 / EDUCATION & CREDENTIALS</div><h2>Learning in<br/><span>continuous motion.</span></h2></div>
          <p>Formal study, professional learning paths and the practical habit of building beyond the syllabus.</p>
        </div>
        <div className="credentials-layout">
          <div className="education-panel">
            <span className="panel-label">EDUCATION</span>
            <div className="education-item"><span className="education-year">2025 — PRESENT</span><h3>BTS — Network Security</h3><p>MIFITT Institute</p></div>
            <div className="education-item"><span className="education-year">2023 — 2024</span><h3>Baccalauréat — Science</h3><p>Lycée d’Excellence 2</p></div>
            <div className="language-block"><span className="panel-label">LANGUAGES</span><p><b>Arabic</b> Native <i/> <b>English</b> C1 Advanced <i/> <b>French</b> Advanced</p></div>
          </div>
          <div className="credential-panel">
            <span className="panel-label">SELECTED CERTIFICATIONS</span>
            {credentials.map(([name, issuer, action, url]) => (
              <div className="credential-row" key={name}>
                <div><h3>{name}</h3><p>{issuer}</p></div>
                {url ? <a href={url} target="_blank" rel="noreferrer">{action} <ArrowUpRight size={13}/></a> : <span className="credential-kind">{action}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section section-shell" id="contact">
        <div className="contact-orbit contact-orbit-a"/><div className="contact-orbit contact-orbit-b"/>
        <div className="section-kicker">05 / START A CONVERSATION</div>
        <div className="contact-content">
          <h2>Good systems<br/>start with <span>good people.</span></h2>
          <div className="contact-aside"><p>Interested in network security, cloud infrastructure, security operations or automation? I’d be glad to connect.</p><a className="button button-light" href="mailto:babaahmed3409@gmail.com">Get in touch <ArrowUpRight size={16}/></a></div>
        </div>
        <div className="contact-bottom"><span>OPEN TO REMOTE INTERNSHIP OPPORTUNITIES</span><span>MAURITANIA · UTC</span></div>
      </section>

      <footer className="site-footer">
        <a className="footer-brand" href="#top">BA<span>.</span></a>
        <span>© 2026 BABA AHMED EL BEKAY</span>
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/babaahmedelbekay/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17}/></a>
          <a href="https://github.com/TheRootBaba" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17}/></a>
          <a href="mailto:babaahmed3409@gmail.com" aria-label="Email"><Mail size={17}/></a>
        </div>
        <a className="back-top" href="#top">BACK TO TOP ↑</a>
      </footer>

      <AnimatePresence>
        {activeImage && (
          <motion.div className="lightbox" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setActiveImage(null)} role="dialog" aria-modal="true" aria-label="Evidence image preview">
            <button className="lightbox-close" onClick={() => setActiveImage(null)} aria-label="Close preview"><X size={22}/></button>
            <motion.div className="lightbox-image" initial={{scale:.96}} animate={{scale:1}} exit={{scale:.96}} onClick={(event) => event.stopPropagation()}>
              <Image src={activeImage} alt="Expanded project evidence" fill sizes="95vw" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
