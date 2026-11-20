"use client";

import { Fragment, useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import SmoothScroll from "@/app/components/smooth-scroll";
import ScrollExperience from "@/app/components/scroll-experience";
import LanguageSwitch from "@/app/components/language-switch";
import { PROJECTS } from "@/app/lib/projects";
import { C, CERT_META, EMAIL, PHONE, LINKEDIN, GITHUB, TOOLS, type Lang } from "@/app/lib/content";
import "@/app/components/home.css";
import { ArrowUpRight, ArrowRight, ArrowLeft, FileDown, Github, Linkedin, Mail, Menu, Phone, Terminal as TermIcon, X } from "lucide-react";

const Terminal = dynamic(() => import("@/app/components/terminal"), { ssr: false });

function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: MouseEvent) => {
    const el = ref.current; if (!el) return;
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
  return <motion.div initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -60px 0px" }} transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function Word({ w, p, a, b }: { w: string; p: MotionValue<number>; a: number; b: number }) {
  const o = useTransform(p, [a, b], [0.16, 1]);
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
    if (window.matchMedia("(hover:none),(pointer:coarse)").matches) return;
    let x = -100, y = -100, cx = -100, cy = -100, raf = 0;
    const mv = (e: globalThis.MouseEvent) => { x = e.clientX; y = e.clientY; ref.current?.classList.toggle("big", !!(e.target as HTMLElement).closest?.("a,button")); };
    const tick = () => {
      raf = 0;
      if (document.hidden) return;
      cx += (x - cx) * 0.16;
      cy += (y - cy) * 0.16;
      if (ref.current) ref.current.style.transform = `translate(${cx}px,${cy}px)`;
      raf = requestAnimationFrame(tick);
    };
    const visibility = () => {
      if (document.hidden) {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", mv, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", mv);
      document.removeEventListener("visibilitychange", visibility);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={ref} className="cur" aria-hidden />;
}

function NetCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    type Node = { x: number; y: number; vx: number; vy: number; hub: boolean };
    let raf = 0, width = 0, height = 0, visible = false, pageVisible = !document.hidden;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pointer = { x: -999, y: -999 };
    const nodes: Node[] = [];

    const syncNodes = () => {
      const target = width < 760 ? 28 : 58;
      while (nodes.length < target) nodes.push({
        x: Math.random() * width, y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        hub: Math.random() < 0.12
      });
      if (nodes.length > target) nodes.length = target;
      nodes.forEach(n => { n.x = Math.min(n.x, width); n.y = Math.min(n.y, height); });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      syncNodes();
    };

    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const draw = () => {
      raf = 0;
      if (!visible || !pageVisible) return;

      ctx.clearRect(0, 0, width, height);
      for (const node of nodes) {
        const dx = node.x - pointer.x, dy = node.y - pointer.y;
        const distance = Math.hypot(dx, dy) || 1;
        if (distance < 160) {
          node.vx += (dx / distance) * 0.035;
          node.vy += (dy / distance) * 0.035;
        }
        node.vx *= 0.995;
        node.vy *= 0.995;
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < 150) {
            ctx.strokeStyle = `rgba(10,140,95,${(1 - distance / 150) * 0.32})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const node of nodes) {
        ctx.fillStyle = node.hub ? "#0a8c5f" : "rgba(12,19,15,.35)";
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.hub ? 3 : 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (!raf && visible && pageVisible) raf = requestAnimationFrame(draw);
    };
    const onVisibility = () => {
      pageVisible = !document.hidden;
      if (pageVisible) start();
      else stop();
    };
    const onPointer = (event: globalThis.MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    resize();
    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible) start();
      else stop();
    });
    observer.observe(canvas);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("mousemove", onPointer, { passive: true });

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("mousemove", onPointer);
    };
  }, []);
  return <canvas ref={ref} aria-hidden />;
}

/* Percentage preloader with timed language transitions and a controlled exit. */
function Preloader({ words, label, onExit, onGone }: { words: string[]; label: string; onExit: () => void; onGone: () => void }) {
  const num = useRef<HTMLSpanElement>(null), bar = useRef<HTMLElement>(null);
  const [w, setW] = useState(0); const [out, setOut] = useState(false);
  useEffect(() => {
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
  const n1 = Array.from(c.name[0]), n2 = Array.from(c.name[1]), total = n1.length + 1 + n2.length;

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [total]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = c.dir;
    return () => {
      document.documentElement.lang = "en";
      document.documentElement.dir = "ltr";
    };
  }, [lang, c.dir]);
  const onExit = useRef(() => { setExit(true); document.body.style.overflow = ""; }).current;
  const onGone = useRef(() => setGone(true)).current;

  useEffect(() => {
    if (!exit) return;
    let i = 0, t: ReturnType<typeof setTimeout>, t2: ReturnType<typeof setTimeout>;
    const tick = () => {
      i++; setTyped(i);
      if (i < total) t = setTimeout(tick, i === n1.length ? 420 : 95);
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
    <ScrollExperience rtl={rtl} />
    {!gone && <Preloader words={c.pre.words} label={c.pre.label} onExit={onExit} onGone={onGone} />}
    <Cursor />

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
      <div className="cert-grid">{c.creds.items.map(([name, issuer, kind], i) => {
        const { url, brands } = CERT_META[i];
        return <Reveal key={name} delay={(i % 4) * 0.06} y={24}>
          <article className="cert-card">
            <div className="cert-card-top" dir="ltr">
              {brands.length ? brands.map(b => <Image key={b} src={`/issuer-logos/${b}.svg`} alt="" width={78} height={24} unoptimized />) : <span className="cert-mark-fallback">{issuer.split(" ")[0]}</span>}
            </div>
            <span className="mono cert-type">{kind}</span>
            <h3>{name}</h3>
            <p className="cert-issuer">{issuer}</p>
            {url ? <a className="cert-view" href={url} target="_blank" rel="noreferrer">View credential <ArrowUpRight size={14} /></a> : <span className="cert-unlinked">Credential link not provided</span>}
          </article>
        </Reveal>;
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
