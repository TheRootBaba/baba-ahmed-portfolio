"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "approach", label: "Approach" },
  { id: "outcomes", label: "Outcomes" },
  { id: "evidence", label: "Evidence" },
  { id: "scope", label: "Scope" },
];

export default function ProjectScrollUI({ hasEvidence }: { hasEvidence: boolean }) {
  const visibleSections = sections.filter((section) => hasEvidence || section.id !== "evidence");
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("overview");

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const root = document.documentElement;
        const max = root.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0);
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    const targets = visibleSections
      .map(({ id }) => document.getElementById(id))
      .filter((node): node is HTMLElement => node instanceof HTMLElement);
    if (!("IntersectionObserver" in window) || targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-22% 0px -62% 0px", threshold: [0, 0.15, 0.35, 0.6] }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [hasEvidence]);

  return (
    <>
      <div className="reading-progress" role="progressbar" aria-label="Reading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
        <span style={{ transform: `scaleX(${progress / 100})` }} />
      </div>
      <nav className="detail-toc" aria-label="Project page sections">
        <span className="detail-toc-label">ON THIS PAGE</span>
        <div>
          {visibleSections.map((section) => (
            <a key={section.id} href={`#${section.id}`} className={active === section.id ? "active" : ""} aria-current={active === section.id ? "location" : undefined}>
              {section.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
