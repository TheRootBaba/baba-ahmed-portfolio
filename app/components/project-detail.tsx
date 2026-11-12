import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";

type ProjectDetailProps = {
  number:string; category:string; title:string; summary:string; repository?:string;
  stack:string[]; problem:string; approach:string[]; outcomes:string[]; boundaries:string[];
  images?:{src:string;alt:string;caption:string}[]; video?:string; videoLabel?:string;
};

export default function ProjectDetail(p:ProjectDetailProps) {
  return <main className="detail-page">
    <header className="detail-header"><Link href="/" className="detail-back"><ArrowLeft size={16}/> Back to portfolio</Link><span>PROJECT CASE STUDY / {p.number}</span></header>
    <section className="detail-hero"><p className="section-index">{p.category}</p><h1>{p.title}<span>.</span></h1><p className="detail-summary">{p.summary}</p><div className="detail-actions">{p.repository&&<a className="button button-primary" href={p.repository} target="_blank" rel="noreferrer"><Github size={16}/> View repository <ArrowUpRight size={15}/></a>}<Link href="/#work" className="text-link">All projects <ArrowLeft size={14}/></Link></div><div className="detail-stack">{p.stack.map(s=><span key={s}>{s}</span>)}</div></section>
    <div className="detail-content">
      <section className="detail-block"><p className="section-index">01 / THE PROBLEM</p><h2>Why I built it</h2><p>{p.problem}</p></section>
      <section className="detail-block"><p className="section-index">02 / ENGINEERING APPROACH</p><h2>How it works</h2><ul>{p.approach.map(x=><li key={x}>{x}</li>)}</ul></section>
      <section className="detail-block"><p className="section-index">03 / OUTCOMES</p><h2>What it demonstrates</h2><ul>{p.outcomes.map(x=><li key={x}>{x}</li>)}</ul></section>
      {(p.images?.length||p.video)&&<section className="detail-evidence"><p className="section-index">04 / PROJECT EVIDENCE</p><h2>Inside the project</h2>{p.video&&<div className="detail-video"><video controls playsInline preload="none"><source src={p.video} type="video/mp4"/></video><p>{p.videoLabel||"Project walkthrough"}</p></div>}{p.images&&<div className="detail-gallery">{p.images.map(img=><figure key={img.src}><img src={img.src} alt={img.alt} loading="lazy"/><figcaption>{img.caption}</figcaption></figure>)}</div>}</section>}
      <section className="detail-block detail-boundaries"><p className="section-index">ENGINEERING NOTES</p><h2>Scope &amp; limitations</h2><ul>{p.boundaries.map(x=><li key={x}>{x}</li>)}</ul></section>
    </div>
    <footer className="detail-footer"><Link href="/#work"><ArrowLeft size={15}/> Back to all projects</Link><span>BABA AHMED EL BEKAY · {p.number}</span></footer>
  </main>;
}
