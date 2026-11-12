import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github, ExternalLink } from "lucide-react";
import ProjectScrollUI from "@/app/components/project-scroll-ui";

type ProjectDetailProps = {
  number: string;
  category: string;
  title: string;
  summary: string;
  repository?: string;
  stack: string[];
  problem: string;
  approach: string[];
  outcomes: string[];
  boundaries: string[];
  images?: { src: string; alt: string; caption: string }[];
  video?: string;
  videoLabel?: string;
};

export default function ProjectDetail(p: ProjectDetailProps) {
  return (
    <main className="detail-page">
      <ProjectScrollUI hasEvidence={Boolean(p.images?.length || p.video)} />
      <header className="detail-header">
        <Link href="/" className="detail-back"><ArrowLeft size={16} /> Back to portfolio</Link>
        <span>PROJECT CASE STUDY / {p.number}</span>
      </header>

      <section className="detail-hero" id="overview">
        <div className="detail-kicker"><span className="availability-dot" /> {p.category}</div>
        <div className="detail-title-row">
          <div>
            <p className="section-index">ENGINEERING PROJECT / {p.number}</p>
            <h1>{p.title}<span>.</span></h1>
          </div>
          <span className="detail-edition">CASE STUDY<br />2026</span>
        </div>
        <p className="detail-summary">{p.summary}</p>
        <div className="detail-actions">
          {p.repository && <a className="button button-primary" href={p.repository} target="_blank" rel="noreferrer"><Github size={16} /> Explore repository <ArrowUpRight size={15} /></a>}
          <Link href="/#work" className="text-link">All projects <ArrowLeft size={14} /></Link>
        </div>
        <div className="detail-overview-strip">
          <div><span>PROJECT</span><b>{p.title}</b></div>
          <div><span>TYPE</span><b>{p.category.split(" · ")[0]}</b></div>
          <div><span>TECHNOLOGIES</span><b>{p.stack.length} core tools</b></div>
        </div>
        <div className="detail-stack" aria-label="Technology stack">
          {p.stack.map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>

      <div className="detail-content">
        <section className="detail-block detail-problem">
          <div className="detail-section-heading"><p className="section-index">01 / CONTEXT</p><span>THE WHY</span></div>
          <h2>The challenge</h2>
          <p>{p.problem}</p>
        </section>

        <section className="detail-block" id="approach">
          <div className="detail-section-heading"><p className="section-index">02 / IMPLEMENTATION</p><span>THE HOW</span></div>
          <h2>Engineering approach</h2>
          <p className="detail-lede">The work is broken into practical building blocks, from the initial design through to validation.</p>
          <ol className="approach-list">
            {p.approach.map((item, index) => (
              <li key={item}>
                <span className="approach-number">{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="detail-block" id="outcomes">
          <div className="detail-section-heading"><p className="section-index">03 / RESULTS</p><span>THE VALUE</span></div>
          <h2>What this project demonstrates</h2>
          <div className="outcome-grid">
            {p.outcomes.map((item, index) => (
              <article key={item}><span>0{index + 1}</span><p>{item}</p></article>
            ))}
          </div>
        </section>

        {(p.images?.length || p.video) ? (
          <section className="detail-evidence" id="evidence">
            <div className="detail-section-heading"><p className="section-index">04 / EVIDENCE</p><span>THE BUILD</span></div>
            <h2>Project in practice</h2>
            <p className="detail-lede">Selected captures from the project environment. These are included as supporting evidence, not as claims of production deployment.</p>
            {p.video && (
              <div className="detail-video">
                <video controls playsInline preload="none" aria-label={p.videoLabel || "Project walkthrough"}>
                  <source src={p.video} type="video/mp4" />
                  Your browser does not support embedded video.
                </video>
                <p>{p.videoLabel || "Project walkthrough"}</p>
              </div>
            )}
            {p.images && (
              <div className="detail-gallery">
                {p.images.map((img, index) => (
                  <figure key={img.src} className={index === 0 ? "gallery-feature" : ""}>
                    <a href={img.src} target="_blank" rel="noreferrer" aria-label={`Open full-size image: ${img.alt}`}>
                      <img src={img.src} alt={img.alt} loading="lazy" />
                      <span className="gallery-open"><ExternalLink size={14} /> Open full size</span>
                    </a>
                    <figcaption><span>FIGURE 0{index + 1}</span>{img.caption}</figcaption>
                  </figure>
                ))}
              </div>
            )}
          </section>
        ) : null}

        <section className="detail-block detail-boundaries" id="scope">
          <div className="detail-section-heading"><p className="section-index">05 / ENGINEERING NOTES</p><span>TRANSPARENCY</span></div>
          <h2>Scope, assumptions &amp; limitations</h2>
          <p className="detail-lede">Clear boundaries matter. These notes describe what the current project does—and what it does not claim to do.</p>
          <ul>{p.boundaries.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
      </div>

      <footer className="detail-footer">
        <Link href="/#work"><ArrowLeft size={15} /> Back to all projects</Link>
        <span>BABA AHMED EL BEKAY · {p.number}</span>
      </footer>
    </main>
  );
}
