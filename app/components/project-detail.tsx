import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, FileText } from "lucide-react";
import { ProjectNav, Gallery, TermButton } from "@/app/components/project-client";
import { PROJECTS, bySlug } from "@/app/lib/projects";
import "@/app/components/detail.css";

type ProjectDetailProps = {
  slug: string; number: string; category: string; title: string; summary: string; repository?: string;
  stack: string[]; problem: string; approach: string[]; outcomes: string[]; boundaries: string[];
  milestones?: { phase: string; title: string; detail: string; status: string }[];
  decisions?: { choice: string; rationale: string }[];
  nextExperiment?: string;
  architecture?: { name: string; detail: string }[];
  validation?: { label: string; result: string; detail: string }[];
  images?: { src: string; alt: string; caption: string }[];
  video?: string; videoLabel?: string; evidenceNotice?: string;
  documentation?: { label: string; href: string }[];
};

export default function ProjectDetail(p: ProjectDetailProps) {
  const idx = Math.max(0, bySlug(p.slug));
  const meta = PROJECTS[idx], next = PROJECTS[(idx + 1) % PROJECTS.length], prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const hasEvidence = Boolean(p.images?.length || p.video);
  const secs = [
    { id: "context", label: "The challenge", on: true },
    { id: "architecture", label: "System design", on: Boolean(p.architecture?.length) },
    { id: "engineering-log", label: "Build log", on: Boolean(p.milestones?.length) },
    { id: "decisions", label: "Decisions", on: Boolean(p.decisions?.length) },
    { id: "next-experiment", label: "Next test", on: Boolean(p.nextExperiment) },
    { id: "approach", label: "Implementation", on: true },
    { id: "validation", label: "Validation", on: Boolean(p.validation?.length) },
    { id: "outcomes", label: "Results", on: true },
    { id: "evidence", label: "Evidence", on: hasEvidence },
    { id: "scope", label: "Scope & limits", on: true },
  ].filter(s => s.on);
  const num = (id: string) => String(secs.findIndex(s => s.id === id) + 1).padStart(2, "0");
  const Head = ({ id, title, lede }: { id: string; title: string; lede?: string }) => <header className="pd-head"><span className="mono">{num(id)} / {secs.find(s => s.id === id)?.label}</span><h2>{title}</h2>{lede && <p className="lede">{lede}</p>}</header>;

  return <main className="pd">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "CreativeWork", name: p.title, description: p.summary, url: "https://www.babaahmed.me/projects/" + p.slug, author: { "@type": "Person", name: "Baba Ahmed El Bekay", url: "https://www.babaahmed.me" }, keywords: p.stack, ...(p.repository ? { sameAs: p.repository } : {}) }).replace(/</g, "\\u003c") }} />
    <header className="pd-bar">
      <Link href="/" className="pd-back"><ArrowLeft size={15} /> Portfolio</Link>
      <Link href="/" className="pd-brand" aria-label="Home">BA<span>.</span></Link>
      <div className="pd-pager"><TermButton /><span className="mono">{p.number} / {String(PROJECTS.length).padStart(2, "0")}</span><Link href={`/projects/${prev.slug}`} aria-label={`Previous: ${prev.name}`}><ArrowLeft size={15} /></Link><Link href={`/projects/${next.slug}`} aria-label={`Next: ${next.name}`}><ArrowRight size={15} /></Link></div>
    </header>

    <section className="pd-hero" id="overview"><div className="pd-wrap">
      <span className="pd-pill mono"><i />{p.category}</span>
      <h1>{p.title}<em>.</em></h1>
      <p className="pd-sum">{p.summary}</p>
      <div className="pd-acts">
        {p.repository && <a className="pd-btn p" href={p.repository} target="_blank" rel="noreferrer"><Github size={16} /> Explore repository <ArrowUpRight size={15} /></a>}
        <Link href="/#work" className="pd-btn">All projects</Link>
      </div>
      <div className="pd-cover"><div className="pd-chrome"><i /><i /><i /><span>{meta.host}</span></div><div className={`pd-shot${meta.art ? " art" : ""}`}><Image src={meta.cover} alt={meta.coverAlt} fill priority sizes="(max-width:1100px) 94vw, 1200px" unoptimized={meta.art} /></div></div>
      <div className="pd-meta"><div><span className="mono">Project</span><b>{p.title}</b></div><div><span className="mono">Type</span><b>{p.category.split(" · ").slice(-1)[0]}</b></div><div><span className="mono">Core tools</span><b>{p.stack.length} technologies</b></div><div><span className="mono">Edition</span><b>Case study 2026</b></div></div>
      <div className="pd-stack" aria-label="Technology stack">{p.stack.map(s => <span key={s}>{s}</span>)}</div>
      {p.documentation?.length ? <div className="pd-docs">{p.documentation.map(d => <a key={d.href} href={d.href} target="_blank" rel="noreferrer"><FileText size={14} />{d.label}<ArrowUpRight size={13} /></a>)}</div> : null}
    </div></section>

    <div className="pd-wrap pd-layout">
      <ProjectNav toc={secs.map(({ id, label }) => ({ id, label }))} />
      <div className="pd-main">
        <section className="pd-sec" id="context"><Head id="context" title="The challenge" /><p className="pd-p">{p.problem}</p></section>

        {p.architecture?.length ? <section className="pd-sec" id="architecture"><Head id="architecture" title="How the pieces fit together" lede="A high-level view of the documented workflow and component boundaries." />
          <div className="pd-arch">{p.architecture.map((n, i) => <article key={n.name}><span className="mono">{String(i + 1).padStart(2, "0")}</span><h3>{n.name}</h3><p>{n.detail}</p></article>)}</div></section> : null}

        {p.milestones?.length ? <section className="pd-sec" id="engineering-log"><Head id="engineering-log" title="How the work took shape" lede="A transparent sequence of engineering milestones. Status labels describe documented work, not a live completion percentage." />
          <ol className="pd-log">{p.milestones.map((m, i) => <li key={m.phase}><span className="dot">{String(i + 1).padStart(2, "0")}</span><div><div className="row"><span className="mono">{m.phase}</span><span className={`st st-${m.status.toLowerCase().replace(/[^a-z]+/g, "-")}`}>{m.status}</span></div><h3>{m.title}</h3><p>{m.detail}</p></div></li>)}</ol></section> : null}

        {p.decisions?.length ? <section className="pd-sec" id="decisions"><Head id="decisions" title="Decisions behind the design" lede="The engineering choices that shape the system, and the reason each boundary exists." />
          <div className="pd-dec">{p.decisions.map((d, i) => <article key={d.choice}><span className="mono">{String(i + 1).padStart(2, "0")}</span><div><h3>{d.choice}</h3><p>{d.rationale}</p></div></article>)}</div></section> : null}

        {p.nextExperiment ? <section className="pd-sec" id="next-experiment"><Head id="next-experiment" title="What I would test next" /><p className="pd-p callout">{p.nextExperiment}</p></section> : null}

        <section className="pd-sec" id="approach"><Head id="approach" title="Engineering approach" lede="The work is broken into practical building blocks, from initial design through to validation." />
          <ol className="pd-steps">{p.approach.map((a, i) => <li key={a}><span>{String(i + 1).padStart(2, "0")}</span><p>{a}</p></li>)}</ol></section>

        {p.validation?.length ? <section className="pd-sec" id="validation"><Head id="validation" title="Validation & evidence" lede="Specific checks documented for this project. Results are scoped to the recorded lab or test run." />
          <div className="pd-val">{p.validation.map(v => <article key={v.label}><span className="mono">{v.label}</span><b>{v.result}</b><p>{v.detail}</p></article>)}</div></section> : null}

        <section className="pd-sec" id="outcomes"><Head id="outcomes" title="What this project demonstrates" />
          <div className="pd-out">{p.outcomes.map((o, i) => <article key={o}><span className="mono">0{i + 1}</span><p>{o}</p></article>)}</div></section>

        {hasEvidence ? <section className="pd-sec" id="evidence"><Head id="evidence" title="Project in practice" lede="Original project captures. Select any image to view it full size." />
          {p.evidenceNotice ? <p className="pd-note">{p.evidenceNotice}</p> : null}
          {p.video ? <div className="pd-video"><video controls playsInline preload="none" aria-label={p.videoLabel || "Project walkthrough"}><source src={p.video} type="video/mp4" /></video><p>{p.videoLabel || "Project walkthrough"}</p></div> : null}
          {p.images?.length ? <Gallery images={p.images} /> : null}</section> : null}

        <section className="pd-sec" id="scope"><Head id="scope" title="Scope, assumptions & limitations" lede="Clear boundaries matter. These notes describe what the current project does, and what it does not claim to do." />
          <ul className="pd-bound">{p.boundaries.map(b => <li key={b}>{b}</li>)}</ul></section>
      </div>
    </div>

    <footer className="pd-wrap pd-foot">
      <Link href={`/projects/${next.slug}`} className="pd-next"><span className="mono">Next project — {next.n} / {String(PROJECTS.length).padStart(2, "0")}</span><b>{next.name}<em>.</em></b><i><ArrowUpRight size={26} /></i></Link>
      <div className="pd-fl"><Link href="/#work"><ArrowLeft size={14} /> Back to all projects</Link><span className="mono">© 2026 Baba Ahmed El Bekay</span></div>
    </footer>
  </main>;
}
