"use client";

import { Fragment, useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import SmoothScroll from "@/app/components/smooth-scroll";
import LanguageSwitch from "@/app/components/language-switch";
import { PROJECTS } from "@/app/lib/projects";
import { C, CERT_META, EMAIL, PHONE, LINKEDIN, GITHUB, TOOLS, type Lang } from "@/app/lib/content";
import "@/app/components/home.css";
import { ArrowUpRight, ArrowRight, ArrowLeft, FileDown, Github, Linkedin, Mail, Menu, Phone, Terminal as TermIcon, X } from "lucide-react";

const Terminal = dynamic(() => import("@/app/components/terminal"), { ssr: false });

function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const move = (e: MouseEvent) => {
    const el = ref.current; if (!el || reduceMotion) return;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px,${(e.clientY - r.top - r.height / 2) * 0.25}px)`;
  };
  return <div ref={ref} style={{ display: "inline-block", maxWidth: "100%", transition: "transform .6s cubic-bezier(.22,1,.36,1)" }} onMouseMove={move} onMouseLeave={() => { if (ref.current) ref.current.style.transform = ""; }}>{children}</div>;
}

function spotMove(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

function Reveal({ children, delay = 0, y = 36 }: { children: ReactNode; delay?: number; y?: number }) {
  const reduceMotion = useReducedMotion();
  return <motion.div initial={reduceMotion ? false : { opacity: 0, y }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -60px 0px" }} transition={reduceMotion ? { duration: 0 } : { duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function Word({ w, p, a, b }: { w: string; p: MotionValue<number>; a: number; b: number }) {
  const reduceMotion = useReducedMotion();
  const o = useTransform(p, [a, b], reduceMotion ? [1, 1] : [0.16, 1]);
  return <motion.span className="w" style={{ opacity: o }}>{w}</motion.span>;
}
function ScrollText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.55"] });
  const words = text.split(" ");
  return <p ref={ref} className="big">{words.map((w, i) => <Fragment key={i}><Word w={w} p={scrollYProgress} a={i / words.length} b={(i + 1) / words.length} />{i < words.length - 1 ? " " : ""}</Fragment>)}</p>;
}

function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(hover:none),(pointer:coarse),(prefers-reduced-motion: reduce)").matches) return;
    let x = -100, y = -100, cx = -100, cy = -100, raf = 0;
    const mv = (e: globalThis.MouseEvent) => { x = e.clientX; y = e.clientY; ref.current?.classList.toggle("big", !!(e.target as HTMLElement).closest?.("a,button")); };
    const tick = () => { cx += (x - cx) * 0.16; cy += (y - cy) * 0.16; if (ref.current) ref.current.style.transform = `translate(${cx}px,${cy}px)`; raf = requestAnimationFrame(tick); };
    window.addEventListener("mousemove", mv); raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", mv); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={ref} className="cur" aria-hidden />;
}

function NetCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; const ctx = c?.getContext("2d"); if (!c || !ctx) return;
    let raf = 0, w = 0, h = 0, vis = true;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const m = { x: -999, y: -999 }; const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => { w = c.offsetWidth; h = c.offsetHeight; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    resize();
    const N = w < 760 ? 34 : 80;
    const nodes = Array.from({ length: N }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35, hub: Math.random() < 0.12 }));
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; }); io.observe(c);
    const draw = () => {
      if (!reduceMotion) raf = requestAnimationFrame(draw);
      if (!vis) return;
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        const dx = n.x - m.x, dy = n.y - m.y, d = Math.hypot(dx, dy) || 1;
        if (d < 160) { n.vx += (dx / d) * 0.035; n.vy += (dy / d) * 0.035; }
        n.vx *= 0.995; n.vy *= 0.995; n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
        const a = nodes[i], b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 150) { ctx.strokeStyle = `rgba(10,140,95,${(1 - d / 150) * 0.32})`; ctx.lineWidth = 0.8; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      }
      for (const n of nodes) { ctx.fillStyle = n.hub ? "#0a8c5f" : "rgba(12,19,15,.35)"; ctx.beginPath(); ctx.arc(n.x, n.y, n.hub ? 3 : 1.5, 0, 7); ctx.fill(); }
    };
    draw();
    const mv = (e: globalThis.MouseEvent) => { const r = c.getBoundingClientRect(); m.x = e.clientX - r.left; m.y = e.clientY - r.top; };
    window.addEventListener("mousemove", mv); window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("mousemove", mv); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} aria-hidden />;
}

/* Short, deliberately paced preloader, skipped for reduced-motion preferences. */
function Preloader({ words, label, onExit, onGone }: { words: string[]; label: string; onExit: () => void; onGone: () => void }) {
  const num = useRef<HTMLSpanElement>(null), bar = useRef<HTMLElement>(null);
  const [w, setW] = useState(0); const [out, setOut] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const D = 2400, t0 = performance.now(); let raf = 0, wi = 0; const timers: ReturnType<typeof setTimeout>[] = [];
    const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
    const tick = (now: number) => {
      const x = Math.min((now - t0) / D, 1), p = ease(x);
      if (num.current) num.current.textContent = String(Math.round(p * 100)).padStart(3, "0");
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      const idx = Math.min(words.length - 1, Math.floor(x * words.length));
      if (idx !== wi) { wi = idx; setW(idx); }
      if (x < 1) raf = requestAnimationFrame(tick);
      else { timers.push(setTimeout(() => { setOut(true); onExit(); }, 300)); timers.push(setTimeout(onGone, 1400)); }
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); timers.forEach(clearTimeout); };
  }, [words, onExit, onGone]);
  return <div className={`pre${out ? " out" : ""}`} aria-hidden>
    <div className="pre-top mono"><span>{label}</span></div>
    <div className="pre-mid"><span key={w} className="pre-w" dir="auto">{words[w]}</span></div>
    <div className="pre-bot"><div className="pre-n"><span ref={num}>000</span><sup>%</sup></div></div>
    <i ref={bar} className="pre-bar" />
  </div>;
}

export default function Portfolio({ lang = "en" }: { lang?: Lang }) {
  const c = C[lang]; const rtl = c.dir === "rtl";
  const Arr = rtl ? ArrowLeft : ArrowRight;
  const [mounted, setMounted] = useState(false);
  const [exit, setExit] = useState(false);
  const [gone, setGone] = useState(false);
  const [typed, setTyped] = useState(0);
  const [td, setTd] = useState(false);
  const [menu, setMenu] = useState(false);
  const [cmd, setCmd] = useState(false);
  const [active, setActive] = useState("");
  const [time, setTime] = useState("");
  const { scrollYProgress } = useScroll();
  const prog = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  const n1 = Array.from(c.name[0]), n2 = Array.from(c.name[1]), total = n1.length + 1 + n2.length;

  useEffect(() => {
    setMounted(true);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setExit(true);
      setTyped(total);
      setTd(true);
      setGone(true);
      return;
    }
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [total]);
  const onExit = useRef(() => { setExit(true); document.body.style.overflow = ""; }).current;
  const onGone = useRef(() => setGone(true)).current;

  useEffect(() => {
    if (!exit || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0, t: ReturnType<typeof setTimeout>, t2: ReturnType<typeof setTimeout>;
    const tick = () => {
      i++; setTyped(i);
      if (i < total) t = setTimeout(tick, (i === n1.length ? 380 : 85) + Math.random() * 85);
      else t2 = setTimeout(() => setTd(true), 400);
    };
    t = setTimeout(tick, 750);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, [exit, total, n1.length]);

  useEffect(() => {
    const ids = ["work", "about", "journey", "credentials"];
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    ids.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
    const fmt = new Intl.DateTimeFormat(c.locale, { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Nouakchott" });
    const tick = () => setTime(fmt.format(new Date()));
    tick(); const iv = setInterval(tick, 30000);
    const key = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setCmd(o => !o); } if (e.key === "Escape") { setCmd(false); setMenu(false); } };
    window.addEventListener("keydown", key);
    return () => { io.disconnect(); clearInterval(iv); window.removeEventListener("keydown", key); };
  }, [c.locale]);

  const links: [string, string][] = [["work", c.nav.work], ["about", c.nav.about], ["journey", c.nav.journey], ["credentials", c.nav.credentials]];
  const close = () => setMenu(false);
  const t1 = n1.slice(0, Math.min(typed, n1.length)).join(""), t2 = n2.slice(0, Math.max(0, typed - n1.length - 1)).join("");
  const onFirst = typed <= n1.length;
  const cls = ["lx", rtl ? "rtl" : "", mounted ? "js" : "", exit ? "go" : "", td ? "td" : ""].filter(Boolean).join(" ");

  return <main id="top" dir={c.dir} lang={lang} className={cls}>
    <SmoothScroll />
    {!gone && <Preloader words={c.pre.words} label={c.pre.label} onExit={onExit} onGone={onGone} />}
    <Cursor />
    <motion.div className="prog" style={{ scaleX: prog }} />

    <header className="nav">
      <a className="logo" href="#top" onClick={close}>BA<span>.</span></a>
      {links.map(([id, l]) => <a key={id} className={`l${active === id ? " on" : ""}`} href={`#${id}`}>{l}</a>)}
      <button className="kbd" dir="ltr" onClick={() => setCmd(true)} aria-label={c.nav.cmd}><TermIcon size={13} />⌘K</button>
      <LanguageSwitch />
      <a className="cta" href="#contact">{c.nav.talk} <ArrowUpRight size={14} className="ai" /></a>
      <button className="burger" onClick={() => setMenu(!menu)} aria-label={menu ? c.nav.closeMenu : c.nav.menu} aria-expanded={menu}>{menu ? <X size={20} /> : <Menu size={20} />}</button>
    </header>
    {menu && <nav className="mob" aria-label={c.nav.menu} data-lenis-prevent onClick={close}>{links.map(([id, l]) => <a key={id} href={`#${id}`}>{l}</a>)}<a href="#contact">{c.nav.contact}</a><div className="mob-lang"><span>{rtl ? "اللغة" : "Language"}</span><LanguageSwitch /></div></nav>}
    {cmd && <Terminal lang={lang} onClose={() => setCmd(false)} />}

    <section className="hx">
      <NetCanvas />
      <div className="wrap">
        <span className="pill mono rise"><i />{c.hero.avail}</span>
        <h1 className="nm" aria-label={c.name.join(" ")}>
          <span className="ln" aria-hidden><span className="gh">{c.name[0]}</span><span className="ty">{t1}{onFirst && exit && <i className="caret" />}</span></span>
          <span className="ln" aria-hidden><span className="gh">{c.name[1]}</span><span className="ty">{t2}{!onFirst && <i className="caret" />}</span></span>
        </h1>
        <p className="role rise">{c.hero.role[0]}<em>{c.hero.role[1]}</em></p>
        <div className="hero-row">
          <p className="lead rise d2">{c.hero.lead[0]}<b>{c.hero.lead[1]}</b>{c.hero.lead[2]}</p>
          <div className="acts rise d3">
            <Magnetic><a className="btn p" href="#work">{c.hero.projects} <Arr size={16} /></a></Magnetic>
            <Magnetic><a className="btn s" href="/resume" download="Baba-Ahmed-El-Bekay-Resume.pdf"><FileDown size={15} />{c.hero.resume}</a></Magnetic>
          </div>
        </div>
        <div className="stats rise d4">{[...c.hero.stats, [time || "--:--", c.hero.timeLabel]].map(([a, b]) => <div key={b}><b>{a}</b><span className="mono">{b}</span></div>)}</div>
      </div>
    </section>

    <div className="mq" aria-hidden><div>{TOOLS.map((t, i) => <span key={i}>{t}</span>)}</div><div>{TOOLS.map((t, i) => <span key={i}>{t}</span>)}</div></div>

    <section className="sec" id="work"><div className="wrap">
      <div className="sh"><Reveal><span className="mono">{c.work.idx}</span><h2>{c.work.title[0]}<em>{c.work.title[1]}</em></h2></Reveal><Reveal delay={0.12}><p className="d">{c.work.desc}</p></Reveal></div>
      <div className="stack">{PROJECTS.map((p, i) => <a key={p.slug} href={`/projects/${p.slug}`} className="card spot" style={{ ["--i" as string]: i }} onMouseMove={spotMove}>
        <div className="viz"><div className="chrome"><i /><i /><i /><span>{p.host}</span></div><div className={`shot${p.art ? " art" : ""}`}><Image src={p.cover} alt={p.coverAlt} fill sizes="(max-width:999px) 92vw, 640px" priority={i === 0} unoptimized={p.art} /></div></div>
        <div className="tx"><div><span className={`mono${p.flag ? " flag" : ""}`}>{rtl ? "" : p.n + " / "}{c.proj[p.slug].cat}{p.flag ? ` — ${c.work.flagship}` : ""}</span><h3 dir="ltr">{p.name}<em>.</em></h3><p>{c.proj[p.slug].blurb}</p><div className="tags" dir="ltr">{p.stack.map(s => <span key={s}>{s}</span>)}</div></div><span className="go-l"><i><ArrowUpRight size={20} className="ai" /></i>{c.work.explore}</span></div>
      </a>)}</div>
    </div></section>

    <section className="sec" id="about" style={{ paddingTop: 0 }}><div className="wrap">
      <Reveal><span className="mono">{c.about.idx}</span></Reveal>
      <div style={{ marginTop: 30 }}><ScrollText text={c.about.text} /></div>
      <div className="skills">{c.about.skills.map(([k, t, d], i) => <div key={k}><Reveal delay={i * 0.07}><div className="spot" onMouseMove={spotMove}><span className="mono">{k}</span><div><h3>{t}</h3><p>{d}</p></div></div></Reveal></div>)}</div>
      <div className="langs"><span className="mono">{c.about.langLabel}</span>{c.about.langs.map(([a, b]) => <span key={a}><b>{a}</b>{b}</span>)}</div>
    </div></section>

    <section className="sec" id="journey" style={{ paddingTop: 0 }}><div className="wrap">
      <div className="sh"><Reveal><span className="mono">{c.journey.idx}</span><h2>{c.journey.title[0]}<em>{c.journey.title[1]}</em></h2></Reveal></div>
      <div className="tl">{c.journey.items.map((it, i) => <div key={it.title}><Reveal delay={i * 0.1}><div className={`spot${it.now ? " now" : ""}`} onMouseMove={spotMove}><span className="mono">{it.meta}</span><h3>{it.title}</h3><p>{it.desc}</p></div></Reveal></div>)}</div>
    </div></section>

    <section className="sec" id="credentials" style={{ paddingTop: 0 }}><div className="wrap">
      <div className="sh"><Reveal><span className="mono">{c.creds.idx}</span><h2>{c.creds.title[0]}<em>{c.creds.title[1]}</em></h2></Reveal><Reveal delay={0.12}><p className="d">{c.creds.desc}</p></Reveal></div>
      <div>{c.creds.items.map(([name, issuer, kind], i) => {
        const { url, brands } = CERT_META[i];
        const n = String(i + 1).padStart(2, "0");
        const inner = <><span className="mono">{rtl ? n.replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[+d]) : n}</span><div><h3>{name}</h3><span className="mono iss">{issuer} · {kind}</span></div><span className="mono hide brand-i" dir="ltr">{brands.map(b => <Image key={b} src={`/issuer-logos/${b}.svg`} alt="" width={78} height={20} unoptimized />)}{issuer}</span><span className="mono hide">{kind}</span>{url ? <ArrowUpRight size={20} className="ai" /> : <span />}</>;
        const k = `cr${i === c.creds.items.length - 1 ? " last" : ""}`;
        return <Reveal key={name} y={16}>{url ? <a className={k} href={url} target="_blank" rel="noreferrer">{inner}</a> : <div className={k}>{inner}</div>}</Reveal>;
      })}</div>
    </div></section>

    <section className="ctw" id="contact"><div className="wrap"><div className="ctp">
      <Reveal><span className="mono">{c.contact.idx}</span><h2>{c.contact.title[0]}<br /><em>{c.contact.title[1]}</em></h2><p className="lead">{c.contact.lead}</p></Reveal>
      <Magnetic><a className="btn p" href={`mailto:${EMAIL}`}><bdi dir="ltr">{EMAIL}</bdi> <ArrowUpRight size={18} className="ai" /></a></Magnetic>
      <div className="cm">
        <a href={`mailto:${EMAIL}`}><span><small>{c.contact.emailL}</small>{c.contact.email}</span><Mail size={18} /></a>
        <a href="tel:+22234092106"><span><small>{c.contact.phoneL}</small><bdi dir="ltr">{PHONE}</bdi></span><Phone size={18} /></a>
        <a href={LINKEDIN} target="_blank" rel="noreferrer"><span><small>{c.contact.linkedinL}</small>{c.contact.linkedin}</span><Linkedin size={18} /></a>
      </div>
      <footer className="ft mono"><span>© 2026 {c.name.join(" ")} · {c.contact.city} {time}</span><div><a href={GITHUB} target="_blank" rel="noreferrer"><Github size={13} /> {c.contact.github}</a><a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a><a href="#top">{c.contact.top}</a></div></footer>
    </div></div></section>
  </main>;
}
