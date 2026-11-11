"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDownRight, ArrowUpRight, Activity, Github, Linkedin, Mail, Menu, Network,
  ShieldCheck, Terminal, Globe2, Cpu, Fingerprint, Radio, LockKeyhole, MoveUpRight
} from "lucide-react";

const projects = [
  {
    number: "01", name: "NetSec Agent", type: "SECURITY AUTOMATION", size: "project-featured",
    description: "An AI-assisted workflow for authorized network assessment. Nmap discovery and service detection meet a LangGraph agent, MCP tools and Groq-powered explanations — with scope boundaries kept explicit.",
    stack: ["Python 3.12", "LangGraph", "Nmap", "MCP", "Streamlit", "Groq"],
    image: "/assets/netsec-agent.svg", alt: "NetSec Agent identity artwork",
    github: "https://github.com/TheRootBaba/NetSEc-agent",
    action: "Explore repository", note: "Authorized private IPv4 scope · up to 256 addresses",
    visual: "agent"
  },
  {
    number: "02", name: "NetOps Sentinel", type: "NETWORK OPERATIONS LAB", size: "project-secondary",
    description: "A GNS3 lab built around three FRRouting routers, five switches and five endpoint LANs. Python validates inventory, runs read-only reachability probes and records JSON evidence.",
    stack: ["Python", "GNS3 2.2", "FRRouting", "JSON", "Unit tests"],
    image: "/assets/evidence/topology.png", alt: "NetOps Sentinel GNS3 network topology",
    github: "https://github.com/TheRootBaba/netops-sentinel",
    action: "View lab evidence", note: "Static-routing baseline · seven reported passing unit tests",
    visual: "topology"
  }
];

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

const skillWords = ["NETWORK SECURITY", "PYTHON", "MICROSOFT", "ORACLE CLOUD", "GRC", "OSPF", "LINUX", "NMAP", "FORTIGATE", "LANGGRAPH", "TCP/IP", "AUTOMATION"];
const capabilities = [
  { icon: Network, title: "Network engineering", body: "TCP/IP, IPv4, subnetting, VLSM, VLANs, OSPF concepts, ACLs, DNS, DHCP, NAT and GNS3." },
  { icon: ShieldCheck, title: "Security operations", body: "Nmap, FortiGate, VPN fundamentals, access control, authorized scanning and security monitoring." },
  { icon: Globe2, title: "Cloud & systems", body: "Oracle Cloud Infrastructure, IAM fundamentals, Linux, Bash and infrastructure concepts." },
  { icon: Terminal, title: "Development & AI", body: "Python, SQL, Git, Streamlit, JSON, test-driven workflows and AI-assisted tooling." }
];

const rise = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: .65, ease: [0.22, 1, 0.36, 1] } }
};

function MagneticLink({ href, children, primary = false }: { href: string; children: React.ReactNode; primary?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  function move(event: React.MouseEvent<HTMLAnchorElement>) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.transform = `translate3d(${(event.clientX - rect.left - rect.width / 2) * .12}px, ${(event.clientY - rect.top - rect.height / 2) * .18}px, 0)`;
  }
  function reset() { if (ref.current) ref.current.style.transform = "translate3d(0,0,0)"; }
  return <a ref={ref} className={primary ? "magnetic magnetic-primary" : "magnetic magnetic-quiet"} href={href} onMouseMove={move} onMouseLeave={reset}>{children}</a>;
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cursorActive, setCursorActive] = useState(false);
  const [pointer, setPointer] = useState({ x: -100, y: -100 });
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onMove = (event: MouseEvent) => setPointer({ x: event.clientX, y: event.clientY });
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("mousemove", onMove); };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const hoverProps = { onMouseEnter: () => setCursorActive(true), onMouseLeave: () => setCursorActive(false) };

  return (
    <main id="top" className="portfolio">
      <motion.div className="reading-progress" style={{ scaleX: progress }} />
      <div className="grain" aria-hidden="true" />
      <div className="ambient-grid" aria-hidden="true" />
      <motion.div className={cursorActive ? "custom-cursor cursor-active" : "custom-cursor"} animate={{ x: pointer.x - 5, y: pointer.y - 5, scale: cursorActive ? 2.6 : 1 }} transition={{ type: "spring", stiffness: 500, damping: 35 }} />

      <header className={scrolled ? "site-header is-scrolled" : "site-header"}>
        <a className="wordmark" href="#top" onClick={closeMenu} aria-label="Baba Ahmed home" {...hoverProps}>
          <span className="wordmark-mark">BA<span>.</span></span><span className="wordmark-name">BABA AHMED <i>EL BEKAY</i></span>
        </a>
        <nav className={menuOpen ? "nav nav-open" : "nav"} aria-label="Main navigation">
          <a href="#work" onClick={closeMenu} {...hoverProps}>Selected work <span>01</span></a>
          <a href="#about" onClick={closeMenu} {...hoverProps}>About <span>02</span></a>
          <a href="#credentials" onClick={closeMenu} {...hoverProps}>Credentials <span>03</span></a>
          <a className="nav-contact" href="#contact" onClick={closeMenu} {...hoverProps}>Let’s talk <ArrowUpRight size={14}/></a>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>{menuOpen ? <X/> : <Menu/>}</button>
      </header>

      <section className="hero section-shell">
        <div className="hero-topline"><span>INDEPENDENT NETWORK SECURITY PORTFOLIO</span><span>MAURITANIA · 2026</span></div>
        <div className="hero-layout">
          <div className="hero-copy">
            <motion.div className="eyebrow" initial="hidden" animate="visible" variants={rise}><span className="status-dot"/> OPEN TO REMOTE INTERNSHIPS</motion.div>
            <motion.h1 initial="hidden" animate="visible" variants={{...rise, visible:{...rise.visible, transition:{...rise.visible.transition, delay:.08}}}}>
              BABA AHMED<span className="hero-period">.</span><br/><span className="hero-outline">NETWORK</span><br/>SECURITY<span className="hero-period">.</span>
            </motion.h1>
            <motion.div className="hero-lower" initial="hidden" animate="visible" variants={{...rise, visible:{...rise.visible, transition:{...rise.visible.transition, delay:.18}}}}>
              <p>I build practical tools and resilient lab environments at the intersection of <strong>networking, security and cloud infrastructure.</strong></p>
              <div className="hero-actions">
                <MagneticLink href="#work" primary>View selected work <ArrowDownRight size={16}/></MagneticLink>
                <MagneticLink href="#contact">Contact me <ArrowUpRight size={16}/></MagneticLink>
              </div>
            </motion.div>
            <motion.div className="hero-index" initial="hidden" animate="visible" variants={rise}><span>BA / 001</span><span>OBSERVE — BUILD — VERIFY</span><span>18°04′N 15°58′W</span></motion.div>
          </div>
          <motion.div className="hero-art" initial={{opacity:0, scale:.97}} animate={{opacity:1, scale:1}} transition={{duration:1.1, ease:"easeOut", delay:.12}}>
            <div className="art-head"><span>FIG. 01 / NETWORK FIELD</span><span><i/> SYSTEMS ONLINE</span></div>
            <div className="wire-grid"/>
            <motion.div className="radar-ring radar-one" animate={reduced ? undefined : { rotate: 360 }} transition={{duration:70, repeat:Infinity, ease:"linear"}}/>
            <motion.div className="radar-ring radar-two" animate={reduced ? undefined : { rotate: -360 }} transition={{duration:95, repeat:Infinity, ease:"linear"}}/>
            <div className="radar-cross cross-x"/><div className="radar-cross cross-y"/>
            <div className="radar-core"><Network size={30}/><span>SECURE<br/>BY DESIGN</span></div>
            <div className="radar-node rn-a"><ShieldCheck/></div><div className="radar-node rn-b"><Cpu/></div><div className="radar-node rn-c"><Activity/></div><div className="radar-node rn-d"><Fingerprint/></div>
            <motion.div className="radar-sweep" animate={reduced ? undefined : { rotate: 360 }} transition={{duration:12, repeat:Infinity, ease:"linear"}}/>
            <div className="art-coordinate">N 18°04′ / W 15°58′<br/>FIELD STUDY Nº 001</div>
            <div className="art-foot"><span>INFRASTRUCTURE / TRUST / SIGNAL</span><span>01—04</span></div>
          </motion.div>
        </div>
        <div className="hero-bottomline"><span>ENGINEERING THE SYSTEMS YOU DON’T SEE.</span><a href="#work" {...hoverProps}>SCROLL TO EXPLORE <ArrowDownRight size={14}/></a></div>
      </section>

      <section className="ticker" aria-label="Technical interests"><div className="ticker-track">{[0,1].map((n)=><div className="ticker-group" key={n} aria-hidden={n===1}>{skillWords.map((word)=><span key={word}>{word}<i>✳</i></span>)}</div>)}</div></section>

      <section className="work-section section-shell" id="work">
        <motion.div className="section-heading" initial="hidden" whileInView="visible" viewport={{once:true, amount:.3}} variants={rise}>
          <div><div className="section-kicker">01 / SELECTED ENGINEERING</div><h2>Selected<br/><em>work.</em></h2></div>
          <p>Real systems, deliberate constraints, documented outcomes. A small selection of projects where the process matters as much as the result.</p>
        </motion.div>
        <div className="bento-grid">
          {projects.map((project) => <motion.article key={project.number} className={`project-card ${project.size}`} initial="hidden" whileInView="visible" viewport={{once:true, amount:.12}} variants={rise} whileHover={reduced ? undefined : { y: -5 }} transition={{duration:.3}}>
            <div className="project-visual">
              {project.visual === "agent" ? <><Image src={project.image} alt={project.alt} fill sizes="(max-width: 800px) 100vw, 65vw" className="project-art-image"/><div className="agent-overlay"><div className="scan-frame"><span/><span/><span/><span/></div><div className="scan-readout"><b>DISCOVERY ENGINE</b><span>HOST / SERVICE / SIGNAL</span><span className="readout-line"/><span>SCAN MODE <strong>CONTROLLED</strong></span></div></div></> :
                <><Image src={project.image} alt={project.alt} fill sizes="(max-width: 800px) 100vw, 45vw" className="project-art-image topology-image"/><div className="topology-stamp"><Network size={15}/> LAB TOPOLOGY / GNS3</div></>}
              <span className="visual-index">FIG. {project.number}</span>
              <a className="project-arrow" href={project.github} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} repository`} {...hoverProps}><ArrowUpRight size={21}/></a>
            </div>
            <div className="project-details">
              <div className="project-meta"><span>CASE / {project.number}</span><span>{project.type}</span></div>
              <div className="project-title-row"><h3>{project.name}<i>.</i></h3><a href={project.github} target="_blank" rel="noreferrer" {...hoverProps}>{project.action} <MoveUpRight size={14}/></a></div>
              <p>{project.description}</p>
              <div className="tag-list">{project.stack.map(tag=><span key={tag}>{tag}</span>)}</div>
              <div className="project-note"><span>↳</span>{project.note}</div>
            </div>
          </motion.article>)}
          <motion.aside className="bento-aside" initial="hidden" whileInView="visible" viewport={{once:true}} variants={rise}>
            <span className="aside-number">03 / PRINCIPLE</span><LockKeyhole size={25} strokeWidth={1.2}/>
            <p>Security is not a feature added at the end. It is a way of thinking from the first packet.</p>
            <span className="aside-bottom">SCOPE FIRST. EVIDENCE ALWAYS.</span>
          </motion.aside>
        </div>
      </section>

      <section className="about-section section-shell" id="about">
        <motion.div className="section-heading" initial="hidden" whileInView="visible" viewport={{once:true}} variants={rise}>
          <div><div className="section-kicker">02 / THE ENGINEER</div><h2>Curiosity into<br/><em>capability.</em></h2></div>
          <p>My starting point is the network. My curiosity goes further — into identity, infrastructure, security and the systems behind the interface.</p>
        </motion.div>
        <div className="about-layout">
          <div className="about-lead"><span className="about-index">BA / PROFILE 001</span><h3>Understand the system. Then make it better.</h3><div className="location-stamp"><Globe2 size={15}/> NOUAKCHOTT, MAURITANIA</div></div>
          <div className="about-body">
            <p>I’m Baba Ahmed El Bekay, a BTS Network Security student at MIFITT Institute. I’m drawn to the infrastructure beneath the interface: how devices communicate, where trust boundaries sit, how services are exposed, and what happens when something fails.</p>
            <p>My learning path combines formal networking studies with hands-on labs and independent builds. I’ve worked with routing and switching concepts, Linux systems, cloud identity fundamentals and Python automation. NetSec Agent and NetOps Sentinel turn those foundations into tools and repeatable tests — not just notes.</p>
            <p>I care about the communication side of engineering too: keeping a clear record, stating limitations honestly and making technical work understandable to the next person. I speak Arabic natively, with advanced English and French, and I’m looking for a remote internship where I can contribute while learning from an experienced team.</p>
          </div>
        </div>
        <div className="capability-grid">{capabilities.map(({icon:Icon,title,body},i)=><motion.article className="capability-card" key={title} initial="hidden" whileInView="visible" viewport={{once:true}} variants={{...rise,visible:{...rise.visible,transition:{...rise.visible.transition,delay:i*.08}}}} whileHover={reduced?undefined:{y:-4}}><div className="capability-top"><span>0{i+1} / CAPABILITY</span><Icon size={19}/></div><h3>{title}</h3><p>{body}</p></motion.article>)}</div>
      </section>

      <section className="credentials-section section-shell" id="credentials">
        <motion.div className="section-heading" initial="hidden" whileInView="visible" viewport={{once:true}} variants={rise}><div><div className="section-kicker">03 / EDUCATION & CREDENTIALS</div><h2>Always in<br/><em>progress.</em></h2></div><p>Formal study, professional learning paths and the practical habit of building beyond the syllabus.</p></motion.div>
        <div className="timeline-layout">
          <div className="timeline"><span className="panel-label">EDUCATION / TIMELINE</span>
            <div className="timeline-item"><span>2025 — PRESENT</span><div><h3>BTS — Network Security</h3><p>MIFITT Institute</p></div></div>
            <div className="timeline-item"><span>2023 — 2024</span><div><h3>Baccalauréat — Science</h3><p>Lycée d’Excellence 2</p></div></div>
            <div className="language-block"><span className="panel-label">LANGUAGES</span><p><b>Arabic</b> Native <i/> <b>English</b> C1 Advanced <i/> <b>French</b> Advanced</p></div>
          </div>
          <div className="credential-panel"><span className="panel-label">SELECTED CERTIFICATIONS</span>{credentials.map(([name,issuer,url],i)=><div className="credential-row" key={name}><span className="credential-number">0{i+1}</span><div><h3>{name}</h3><p>{issuer}</p></div>{url?<a href={url} target="_blank" rel="noreferrer" {...hoverProps}>Verify <ArrowUpRight size={13}/></a>:<span className="credential-kind">COMPLETED</span>}</div>)}</div>
        </div>
      </section>

      <section className="contact-section section-shell" id="contact">
        <div className="contact-kicker"><span>04 / START A CONVERSATION</span><Radio size={16}/></div>
        <div className="contact-content"><h2>LET’S<br/><span>CONNECT.</span></h2><div className="contact-aside"><p>Have a network security challenge, an internship opportunity or an idea worth testing? I’d like to hear about it.</p><MagneticLink href="mailto:babaahmed3409@gmail.com" primary>Start a conversation <ArrowUpRight size={16}/></MagneticLink></div></div>
        <div className="contact-bottom"><span>OPEN TO REMOTE INTERNSHIP OPPORTUNITIES</span><span>MAURITANIA · UTC</span></div>
      </section>

      <footer className="site-footer"><a className="footer-brand" href="#top" {...hoverProps}>BA<span>.</span></a><span>© 2026 BABA AHMED EL BEKAY</span><div className="footer-links"><a href="https://github.com/TheRootBaba" target="_blank" rel="noreferrer" {...hoverProps}>GITHUB <ArrowUpRight size={13}/></a><a href="https://www.linkedin.com/in/babaahmedelbekay/" target="_blank" rel="noreferrer" {...hoverProps}>LINKEDIN <ArrowUpRight size={13}/></a><a href="mailto:babaahmed3409@gmail.com" {...hoverProps}>EMAIL <ArrowUpRight size={13}/></a></div><a className="back-top" href="#top" {...hoverProps}>BACK TO TOP ↑</a></footer>


    </main>
  );
}
