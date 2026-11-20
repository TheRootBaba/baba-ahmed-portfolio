"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { PROJECTS } from "@/app/lib/projects";
import { EMAIL, GITHUB, LINKEDIN, type Lang } from "@/app/lib/content";
import "@/app/components/terminal.css";

type L = { label: string; href: string };
type Out = { lines: string[]; links?: L[] };
type Entry = Out & { cmd: string };

const COMMANDS = ["help", "whoami", "projects", "skills", "status", "education", "certs", "contact", "github", "linkedin", "resume", "clear"];
const projLinks = (): L[] => PROJECTS.map(p => ({ label: `${p.n} ${p.name}`, href: `/projects/${p.slug}` }));

function run(raw: string, lang: Lang): Out | "clear" {
  const v = raw.trim().toLowerCase(); const ar = lang === "ar"; const t = (e: string, a: string) => (ar ? a : e);
  const [verb, ...rest] = v.split(/\s+/); const target = rest.join(" ");
  if (v === "clear") return "clear";
  if (v === "help" || v === "?") return { lines: [t("Available commands:", "الأوامر المتاحة:"), "  whoami      " + t("profile summary", "نبذة عني"), "  projects    " + t("open the case studies", "دراسات الحالة"), "  skills      " + t("technical toolkit", "المهارات والأدوات"), "  status      " + t("project snapshot", "حالة المشاريع"), "  education   " + t("studies", "التعليم"), "  certs       " + t("certifications", "الشهادات"), "  contact     " + t("get in touch", "تواصل"), "  github · linkedin · resume · clear", t("Tip: try  open nexuscloud", "جرّب:  open nexuscloud")] };
  if (v === "whoami") return { lines: ["Baba Ahmed El Bekay", t("Network Security student and hands-on builder focused on cybersecurity, cloud infrastructure, Linux and Python. Based in Nouakchott, Mauritania; open to remote roles and internships.", "طالب أمن شبكات ومطوّر مشاريع عملية في الأمن السيبراني والبنية السحابية وLinux وPython. مقيم في نواكشوط، موريتانيا، ومتاح للعمل عن بُعد والتدريب.")] };
  if (v === "projects" || v === "ls" || v === "ls projects") return { lines: [t("Five documented case studies. Open one:", "خمس دراسات حالة موثّقة. اختر واحدة:")], links: projLinks() };
  if (v === "skills" || v === "stack") return { lines: ["NETWORKING  TCP/IP · IPv4 · VLSM · VLANs · OSPF · ACLs", "SECURITY    Nmap · FortiGate · VPN · access controls", "SYSTEMS     OCI · IAM · Linux · Bash", "BUILD       Python · SQL · Git · GNS3 · Streamlit · Docker"] };
  if (v === "status") return { lines: ["AegisSOC        " + t("active engineering project", "مشروع قيد التطوير"), "NetSec Agent    " + t("scoped assessment tool, walkthrough recorded", "أداة تقييم محددة النطاق"), "NetOps Sentinel " + t("recorded GNS3 baseline", "خط أساس مسجّل في GNS3"), "Enterprise Lab  " + t("academic design exercise", "تمرين تصميم أكاديمي"), "NexusCloud      " + t("local lab with recorded evidence", "مختبر محلي مع أدلة موثّقة")], links: projLinks() };
  if (v === "education" || v === "edu") return { lines: [t("2025 — now   BTS in Network Security · MIFITT Institute", "٢٠٢٥ — الآن   التقني السامي في أمن الشبكات · MIFITT"), t("2023 — 2024  Baccalauréat in Science · Lycée d’Excellence 2", "٢٠٢٣ — ٢٠٢٤   البكالوريا في العلوم · ثانوية التميز 2")] };
  if (v === "certs" || v === "certifications") return { lines: ["Microsoft Cybersecurity Analyst · Coursera", "Oracle OCI Architect Associate", "Oracle Agentic AI Foundations Associate", "Fortinet NSE 3 — FortiGate Operator", "HackerRank SQL (Intermediate)", "Cisco Python Essentials 1 · LFS101 Linux · Macquarie GRC"], links: [{ label: t("All certificates", "كل الشهادات"), href: "/#credentials" }] };
  if (v === "contact") return { lines: [t("For opportunities, collaboration or technical conversations:", "للفرص والتعاون والنقاشات التقنية:")], links: [{ label: EMAIL, href: `mailto:${EMAIL}` }, { label: "LinkedIn", href: LINKEDIN }] };
  if (v === "github") return { lines: [t("Source code, labs and ongoing work:", "الشيفرة المصدرية والمختبرات:")], links: [{ label: "github.com/TheRootBaba", href: GITHUB }] };
  if (v === "linkedin") return { lines: [t("Professional profile:", "الملف المهني:")], links: [{ label: "Baba Ahmed on LinkedIn", href: LINKEDIN }] };
  if (v === "resume" || v === "cv") return { lines: [t("Download the résumé (PDF):", "تحميل السيرة الذاتية (PDF):")], links: [{ label: "Baba-Ahmed-El-Bekay-Resume.pdf", href: "/resume" }] };
  if (v === "date") return { lines: [new Date().toLocaleString("en-GB", { timeZone: "Africa/Nouakchott", dateStyle: "full", timeStyle: "short" }) + " (Nouakchott)"] };
  if (v.startsWith("sudo")) return { lines: [t("Nice try. This interface is read-only.", "محاولة جيدة. هذه الواجهة للقراءة فقط.")] };
  if (verb === "open" && target) {
    const sec: Record<string, string> = { work: "work", projects: "work", about: "about", skills: "about", journey: "journey", education: "journey", credentials: "credentials", certs: "credentials", contact: "contact" };
    if (sec[target]) return { lines: [t("Opening section…", "جارٍ فتح القسم…")], links: [{ label: target, href: `/#${sec[target]}` }] };
    const p = PROJECTS.find(x => x.slug === target || x.name.toLowerCase() === target || x.name.toLowerCase().replaceAll(" ", "-") === target || x.name.toLowerCase().replaceAll(" ", "") === target);
    if (p) return { lines: [t(`Opening ${p.name} case study…`, `جارٍ فتح دراسة حالة ${p.name}…`)], links: [{ label: p.name, href: `/projects/${p.slug}` }] };
  }
  return { lines: [t(`command not found: ${raw}. Type help for the list.`, `الأمر غير موجود: ${raw}. اكتب help لعرض القائمة.`)] };
}

export default function Terminal({ onClose, lang = "en" }: { onClose: () => void; lang?: Lang }) {
  const [val, setVal] = useState(""); const [hist, setHist] = useState<Entry[]>([]); const [hi, setHi] = useState(-1);
  const inp = useRef<HTMLInputElement>(null); const body = useRef<HTMLDivElement>(null);
  const ar = lang === "ar";
  useEffect(() => { const prev = document.body.style.overflow; document.body.style.overflow = "hidden"; inp.current?.focus(); return () => { document.body.style.overflow = prev; }; }, []);
  useEffect(() => { body.current?.scrollTo({ top: body.current.scrollHeight, behavior: "smooth" }); }, [hist]);

  const exec = (raw: string) => {
    const v = raw.trim(); if (!v) return;
    const r = run(v, lang);
    if (r === "clear") setHist([]); else setHist(h => [...h, { cmd: v, ...r }]);
    setHi(-1); setVal("");
  };
  const submit = (e: FormEvent) => { e.preventDefault(); exec(val); };
  const key = (e: KeyboardEvent<HTMLInputElement>) => {
    const cmds = hist.map(h => h.cmd);
    if (e.key === "ArrowUp") { e.preventDefault(); const n = Math.min(hi + 1, cmds.length - 1); if (n >= 0) { setHi(n); setVal(cmds[cmds.length - 1 - n]); } }
    if (e.key === "ArrowDown") { e.preventDefault(); const n = hi - 1; if (n < 0) { setHi(-1); setVal(""); } else { setHi(n); setVal(cmds[cmds.length - 1 - n]); } }
    if (e.key === "Tab") { e.preventDefault(); const m = COMMANDS.filter(c => c.startsWith(val.toLowerCase())); if (val && m.length === 1) setVal(m[0]); }
  };
  const go = (href: string) => { if (href.startsWith("/") || href.startsWith("#")) onClose(); };

  return <div className="tm-back" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }} role="presentation">
    <section className="tm" role="dialog" aria-modal="true" aria-label="Command line" dir="ltr">
      <header className="tm-bar"><span className="tm-dots"><i onClick={onClose} /><i /><i /></span><b>baba@portfolio — zsh</b><button type="button" onClick={onClose} aria-label="Close"><X size={16} /></button></header>
      <div className="tm-body" ref={body} data-lenis-prevent onClick={() => inp.current?.focus()}>
        <p className="tm-l tm-dim">{ar ? "مرحبًا بك في واجهة سطر الأوامر. اكتب help للبدء." : "Welcome to my command line. Type help to get started."}</p>
        {hist.map((h, i) => <div key={i} className="tm-blk"><p className="tm-l"><span className="tm-ps">❯</span> {h.cmd}</p>
          {h.lines.map((l, j) => <p key={j} className="tm-l tm-o" dir={ar && /[\u0600-\u06FF]/.test(l) ? "rtl" : "ltr"} style={{ ["--i" as string]: j }}>{l}</p>)}
          {h.links && <div className="tm-links">{h.links.map(l => <a key={l.href + l.label} href={l.href} onClick={() => go(l.href)} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" download={l.href === "/resume" ? "Baba-Ahmed-El-Bekay-Resume.pdf" : undefined}>{l.label}<ArrowUpRight size={13} /></a>)}</div>}
        </div>)}
      </div>
      <div className="tm-chips" data-lenis-prevent>{["help", "whoami", "projects", "skills", "status", "contact"].map(c => <button key={c} type="button" onClick={() => exec(c)}>{c}</button>)}</div>
      <form className="tm-in" onSubmit={submit}><span className="tm-ps">❯</span><input ref={inp} value={val} onChange={e => setVal(e.target.value)} onKeyDown={key} spellCheck={false} autoComplete="off" autoCapitalize="off" aria-label="Command" placeholder="help" /><kbd>esc</kbd></form>
    </section>
  </div>;
}
