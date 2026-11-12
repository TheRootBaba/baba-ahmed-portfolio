"use client";

import { useEffect, useMemo, useState } from "react";

const sections = [
  { id: "overview", label: "Overview" }, { id: "architecture", label: "System design" },
  { id: "approach", label: "Approach" }, { id: "validation", label: "Validation" },
  { id: "outcomes", label: "Outcomes" }, { id: "evidence", label: "Evidence" }, { id: "scope", label: "Scope" },
];

export default function ProjectScrollUI({ hasEvidence, hasArchitecture, hasValidation }: { hasEvidence: boolean; hasArchitecture: boolean; hasValidation: boolean }) {
  const visibleSections = useMemo(() => sections.filter(section =>
    (hasEvidence || section.id !== "evidence") &&
    (hasArchitecture || section.id !== "architecture") &&
    (hasValidation || section.id !== "validation")
  ), [hasEvidence, hasArchitecture, hasValidation]);
  const [progress,setProgress]=useState(0);
  const [active,setActive]=useState("overview");

  useEffect(()=>{
    let frame=0;
    const update=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{
      const root=document.documentElement;const max=root.scrollHeight-window.innerHeight;
      setProgress(max>0?Math.min(100,Math.max(0,(window.scrollY/max)*100)):0);
    });};
    update();window.addEventListener("scroll",update,{passive:true});window.addEventListener("resize",update);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener("scroll",update);window.removeEventListener("resize",update);};
  },[]);

  useEffect(()=>{
    const targets=visibleSections.map(({id})=>document.getElementById(id)).filter((node):node is HTMLElement=>node instanceof HTMLElement);
    if(!("IntersectionObserver" in window)||targets.length===0)return;
    const observer=new IntersectionObserver(entries=>{
      const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(visible?.target.id)setActive(visible.target.id);
    },{rootMargin:"-22% 0px -62% 0px",threshold:[0,.15,.35,.6]});
    targets.forEach(target=>observer.observe(target));return()=>observer.disconnect();
  },[visibleSections]);

  return <><div className="reading-progress" role="progressbar" aria-label="Reading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}><span style={{transform:`scaleX(${progress/100})`}}/></div>
    <nav className="detail-toc" aria-label="Project page sections"><span className="detail-toc-label">ON THIS PAGE</span><div>{visibleSections.map(section=><a key={section.id} href={`#${section.id}`} className={active===section.id?"active":""} aria-current={active===section.id?"location":undefined}>{section.label}</a>)}</div></nav></>;
}
