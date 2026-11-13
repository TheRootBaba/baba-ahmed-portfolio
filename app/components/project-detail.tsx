import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Github, ExternalLink, FileText } from "lucide-react";
import ProjectScrollUI from "@/app/components/project-scroll-ui";

type ProjectDetailProps = {
  slug: string; number: string; category: string; title: string; summary: string; repository?: string;
  stack: string[]; problem: string; approach: string[]; outcomes: string[]; boundaries: string[];
  milestones?: { phase: string; title: string; detail: string; status: string }[];
  architecture?: { name: string; detail: string }[];
  validation?: { label: string; result: string; detail: string }[];
  images?: { src: string; alt: string; caption: string }[];
  video?: string; videoLabel?: string; evidenceNotice?: string;
  documentation?: { label: string; href: string }[];
};

export default function ProjectDetail(p: ProjectDetailProps) {
  const hasEvidence = Boolean(p.images?.length || p.video);
  return (
    <main className="detail-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: p.title,
        description: p.summary,
        url: "https://baba-ahmed-portfolio.vercel.app/projects/" + p.slug,
        author: { "@type": "Person", name: "Baba Ahmed El Bekay", url: "https://baba-ahmed-portfolio.vercel.app" },
        keywords: p.stack,
        ...(p.repository ? { sameAs: p.repository } : {})
      }).replace(/</g, "\\u003c") }} />
      <ProjectScrollUI hasEvidence={hasEvidence} hasArchitecture={Boolean(p.architecture?.length)} hasValidation={Boolean(p.validation?.length)} />
      <header className="detail-header">
        <Link href="/" className="detail-back"><ArrowLeft size={16} /> Back to portfolio</Link>
        <span>PROJECT CASE STUDY / {p.number}</span>
      </header>

      <section className="detail-hero" id="overview">
        <div className="detail-kicker"><span className="availability-dot" /> {p.category}</div>
        <div className="detail-title-row"><div><p className="section-index">ENGINEERING PROJECT / {p.number}</p><h1>{p.title}<span>.</span></h1></div><span className="detail-edition">CASE STUDY<br />2026</span></div>
        <p className="detail-summary">{p.summary}</p>
        <div className="detail-actions">
          {p.repository && <a className="button button-primary" href={p.repository} target="_blank" rel="noreferrer"><Github size={16} /> Explore repository <ArrowUpRight size={15} /></a>}
          <Link href="/#work" className="text-link">All projects <ArrowLeft size={14} /></Link>
        </div>
        <div className="detail-overview-strip"><div><span>PROJECT</span><b>{p.title}</b></div><div><span>TYPE</span><b>{p.category.split(" · ")[0]}</b></div><div><span>TECHNOLOGIES</span><b>{p.stack.length} core tools</b></div></div>
        <div className="detail-stack" aria-label="Technology stack">{p.stack.map(item => <span key={item}>{item}</span>)}</div>
        {p.documentation?.length ? <div className="detail-doc-links">{p.documentation.map(doc => <a key={doc.href} href={doc.href} target="_blank" rel="noreferrer"><FileText size={14}/>{doc.label}<ArrowUpRight size={13}/></a>)}</div> : null}
      </section>

      <div className="detail-content">
        <section className="detail-block detail-problem">
          <div className="detail-section-heading"><p className="section-index">01 / CONTEXT</p><span>THE WHY</span></div>
          <h2>The challenge</h2><p>{p.problem}</p>
        </section>

        {p.architecture?.length ? <section className="detail-block" id="architecture">
          <div className="detail-section-heading"><p className="section-index">02 / SYSTEM DESIGN</p><span>THE STRUCTURE</span></div>
          <h2>How the pieces fit together</h2>
          <p className="detail-lede">A high-level view of the documented workflow and component boundaries.</p>
          <div className="architecture-flow">{p.architecture.map((node,index)=><div className="architecture-node" key={node.name}><span className="architecture-index">{String(index+1).padStart(2,"0")}</span><div><h3>{node.name}</h3><p>{node.detail}</p></div>{index < p.architecture!.length-1 ? <span className="architecture-connector" aria-hidden="true">→</span> : null}</div>)}</div>
        </section> : null}

        {p.milestones?.length ? <section className="detail-block engineering-log" id="engineering-log">
          <div className="detail-section-heading"><p className="section-index">03 / ENGINEERING LOG</p><span>THE BUILD SEQUENCE</span></div>
          <h2>How the work took shape</h2>
          <p className="detail-lede">A transparent sequence of engineering milestones. Status labels describe documented work—not a live completion percentage.</p>
          <ol className="milestone-timeline">{p.milestones.map((item,index)=><li key={item.phase}>
            <span className="milestone-index">{String(index+1).padStart(2,"0")}</span>
            <div className="milestone-copy"><div className="milestone-meta"><span>{item.phase}</span><span className={"milestone-status status-" + item.status.toLowerCase().replace(/[^a-z]+/g,"-")}>{item.status}</span></div><h3>{item.title}</h3><p>{item.detail}</p></div>
          </li>)}</ol>
        </section> : null}

        <section className="detail-block" id="approach">
          <div className="detail-section-heading"><p className="section-index">04 / IMPLEMENTATION</p><span>THE HOW</span></div>
          <h2>Engineering approach</h2>
          <p className="detail-lede">The work is broken into practical building blocks, from initial design through to validation.</p>
          <ol className="approach-list">{p.approach.map((item,index)=><li key={item}><span className="approach-number">{String(index+1).padStart(2,"0")}</span><p>{item}</p></li>)}</ol>
        </section>

        {p.validation?.length ? <section className="detail-block" id="validation">
          <div className="detail-section-heading"><p className="section-index">05 / VERIFICATION</p><span>THE CHECKS</span></div>
          <h2>Validation & evidence</h2>
          <p className="detail-lede">Specific checks documented for this project. Results are scoped to the recorded lab or test run.</p>
          <div className="validation-grid">{p.validation.map(item=><article key={item.label}><span>{item.label}</span><b>{item.result}</b><p>{item.detail}</p></article>)}</div>
        </section> : null}

        <section className="detail-block" id="outcomes">
          <div className="detail-section-heading"><p className="section-index">06 / RESULTS</p><span>THE VALUE</span></div>
          <h2>What this project demonstrates</h2>
          <div className="outcome-grid">{p.outcomes.map((item,index)=><article key={item}><span>0{index+1}</span><p>{item}</p></article>)}</div>
        </section>

        {hasEvidence ? <section className="detail-evidence" id="evidence">
          <div className="detail-section-heading"><p className="section-index">07 / EVIDENCE</p><span>THE BUILD</span></div>
          <h2>Project in practice</h2>
          <p className="detail-lede">Original project captures and walkthrough media. Each item is labelled to explain what it demonstrates.</p>{p.evidenceNotice ? <p className="evidence-notice">{p.evidenceNotice}</p> : null}
          {p.video ? <div className="detail-video"><video controls playsInline preload="none" aria-label={p.videoLabel || "Project walkthrough"}><source src={p.video} type="video/mp4"/>Your browser does not support embedded video.</video><p>{p.videoLabel || "Project walkthrough"}</p></div> : null}
          {p.images?.length ? <div className="detail-gallery">{p.images.map((img,index)=><figure key={img.src} className={index===0?"gallery-feature":""}><a href={img.src} target="_blank" rel="noreferrer" aria-label={`Open full-size image: ${img.alt}`}><span className="gallery-image-frame"><Image src={img.src} alt={img.alt} fill sizes="(max-width: 650px) 100vw, 900px" /></span><span className="gallery-open"><ExternalLink size={14}/> Open full size</span></a><figcaption><span>FIGURE {String(index+1).padStart(2,"0")}</span>{img.caption}</figcaption></figure>)}</div> : null}
        </section> : null}

        <section className="detail-block detail-boundaries" id="scope">
          <div className="detail-section-heading"><p className="section-index">08 / ENGINEERING NOTES</p><span>TRANSPARENCY</span></div>
          <h2>Scope, assumptions &amp; limitations</h2>
          <p className="detail-lede">Clear boundaries matter. These notes describe what the current project does—and what it does not claim to do.</p>
          <ul>{p.boundaries.map(item=><li key={item}>{item}</li>)}</ul>
        </section>
      </div>
      <footer className="detail-footer"><Link href="/#work"><ArrowLeft size={15}/> Back to all projects</Link><span>BABA AHMED EL BEKAY · {p.number}</span></footer>
    </main>
  );
}
