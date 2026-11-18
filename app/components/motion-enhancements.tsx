"use client";

import { useEffect, useState } from "react";

const fullName = "Baba Ahmed El Bekay";

export function TypedName() {
  const [typed, setTyped] = useState(fullName);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let index = 0;
    setTyped("");
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      index += 1;
      setTyped(fullName.slice(0, index));
      if (index < fullName.length) timer = setTimeout(tick, 85);
    };
    timer = setTimeout(tick, 250);
    return () => clearTimeout(timer);
  }, []);
  return <span className="typed-name" aria-label={fullName}>
    <span aria-hidden="true">{typed}</span><span className="typed-cursor" aria-hidden="true" />
  </span>;
}

export default function MotionEnhancements() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = Array.from(document.querySelectorAll<HTMLElement>(
      ".hero-copy, .hero-aside, .hero-foot, .section-heading, .project-card, .about-story, .skills-grid article, .education-card, .cert-card, .language-row, .contact-grid, .contact-methods a, .work-footnote"
    ));
    // Fail open: content stays visible unless an observer is successfully initialized.
    if (reduce || !("IntersectionObserver" in window)) {
      targets.forEach(target => target.classList.add("motion-visible"));
      return;
    }
    try {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("motion-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });
      targets.forEach(target => {
        target.classList.add("motion-reveal");
        observer.observe(target);
      });
      document.documentElement.classList.add("motion-enabled");
      return () => {
        document.documentElement.classList.remove("motion-enabled");
        observer.disconnect();
      };
    } catch {
      targets.forEach(target => target.classList.add("motion-visible"));
      document.documentElement.classList.remove("motion-enabled");
    }
  }, []);
  return null;
}
