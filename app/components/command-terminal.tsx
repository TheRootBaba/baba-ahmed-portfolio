"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowUpRight, Terminal, X } from "lucide-react";

type TerminalLink = { label: string; href: string };
type CommandEntry = { command: string; output: string; links?: TerminalLink[] };

const projectLinks: TerminalLink[] = [
  { label: "AegisSOC", href: "/projects/aegissoc" },
  { label: "NetSec Agent", href: "/projects/netsec-agent" },
  { label: "NetOps Sentinel", href: "/projects/netops-sentinel" },
  { label: "Secure Enterprise Network", href: "/projects/secure-enterprise-network" }
];
const shortcuts = ["help", "whoami", "projects", "skills", "contact"];

function resolveCommand(raw: string): Omit<CommandEntry, "command"> {
  const value = raw.trim().toLowerCase();
  const parts = value.split(/\s+/);
  const verb = parts[0];
  const target = parts.slice(1).join(" ");

  if (value === "help") return {
    output: "Available commands — choose a link or enter a command below:",
    links: [
      { label: "whoami — profile summary", href: "#about" },
      { label: "projects — open case studies", href: "#work" },
      { label: "skills — technical toolkit", href: "#about" },
      { label: "contact — get in touch", href: "#contact" },
      { label: "github — source repositories", href: "https://github.com/TheRootBaba" },
      { label: "linkedin — professional profile", href: "https://www.linkedin.com/in/babaahmedelbekay/" }
    ]
  };
  if (value === "whoami") return { output: "Baba Ahmed El Bekay\nNetwork Security student and hands-on builder focused on cybersecurity, cloud infrastructure, Linux and Python. Based in Nouakchott, Mauritania; open to remote roles and internships." };
  if (value === "projects" || value === "ls projects") return { output: "Four documented case studies. Open one to inspect its architecture, implementation notes and available evidence:", links: projectLinks };
  if (value === "skills") return { output: "NETWORKING  TCP/IP · IPv4 · VLSM · VLANs · OSPF · ACLs\nSECURITY    Nmap · FortiGate · VPN · access controls\nSYSTEMS     OCI · IAM · Linux · Bash\nBUILD       Python · SQL · Git · GNS3 · Streamlit" };
  if (value === "contact") return { output: "For opportunities, collaboration or technical conversations:", links: [
    { label: "Email Baba", href: "mailto:babaahmed3409@gmail.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/babaahmedelbekay/" }
  ] };
  if (value === "github") return { output: "Source code, labs and ongoing engineering work:", links: [{ label: "github.com/TheRootBaba", href: "https://github.com/TheRootBaba" }] };
  if (value === "linkedin") return { output: "Professional profile and contact:", links: [{ label: "Baba Ahmed on LinkedIn", href: "https://www.linkedin.com/in/babaahmedelbekay/" }] };
  if (verb === "open" && target) {
    if (target === "work" || target === "projects") return { output: "Open the selected projects section:", links: [{ label: "Selected projects", href: "#work" }] };
    if (target === "about" || target === "skills") return { output: "Open the profile and skills section:", links: [{ label: "About and skills", href: "#about" }] };
    if (target === "contact") return { output: "Open the contact section:", links: [{ label: "Contact", href: "#contact" }] };
    const project = projectLinks.find((item) => item.label.toLowerCase() === target || item.label.toLowerCase().replaceAll(" ", "-") === target);
    if (project) return { output: "Open the " + project.label + " case study:", links: [project] };
  }
  return { output: 'Command not found: "' + raw + '". Type help to see the available commands.' };
}

export default function CommandTerminal({ onClose }: { onClose: () => void }) {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<CommandEntry[]>([]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = command.trim();
    if (!value) return;
    if (value.toLowerCase() === "clear") {
      setHistory([]);
      setCommand("");
      return;
    }
    setHistory((current) => [...current, { command: value, ...resolveCommand(value) }]);
    setCommand("");
  }

  return (
    <div className="command-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="command-terminal" role="dialog" aria-modal="true" aria-labelledby="terminal-title">
        <header className="terminal-header">
          <div className="terminal-brand"><span className="terminal-mark"><Terminal size={15}/></span><span><strong id="terminal-title">BABA / COMMAND LINE</strong><small>PERSONAL INTERFACE · READ-ONLY</small></span></div>
          <button type="button" className="terminal-close" onClick={onClose} aria-label="Close command line"><X size={17}/></button>
        </header>
        <div className="terminal-screen" aria-live="polite">
          <p className="terminal-welcome">Welcome. Explore the portfolio through a few simple commands.<br/>Type <code>help</code> to see what is available.</p>
          {history.map((entry, index) => (
            <div className="terminal-entry" key={index}>
              <p className="terminal-command"><span>baba@portfolio:~$</span> {entry.command}</p>
              <p className="terminal-output">{entry.output}</p>
              {entry.links?.length ? <div className="terminal-links">{entry.links.map((link) => <a key={link.href} href={link.href} onClick={onClose}>{link.label}<ArrowUpRight size={12}/></a>)}</div> : null}
            </div>
          ))}
        </div>
        <form className="terminal-form" onSubmit={submit}>
          <label htmlFor="portfolio-command"><span>baba@portfolio:~$</span></label>
          <input id="portfolio-command" autoFocus value={command} onChange={(event) => setCommand(event.target.value)} placeholder="Type a command…" autoComplete="off" spellCheck={false}/>
          <button type="submit" aria-label="Run command"><ArrowUpRight size={16}/></button>
        </form>
        <footer className="terminal-footer"><span>TRY A COMMAND</span><div>{shortcuts.map((item) => <button type="button" key={item} onClick={() => setCommand(item)}>{item}</button>)}</div><span>ESC TO CLOSE · clear TO RESET</span></footer>
      </section>
    </div>
  );
}
