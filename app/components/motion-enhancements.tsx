"use client";

import { useEffect, useState } from "react";

const fullName = "Baba Ahmed El Bekay";

export function TypedName() {
  const [typed, setTyped] = useState(fullName);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let index = 0;
    setTyped("");
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      index += 1;
      setTyped(fullName.slice(0, index));
      if (index < fullName.length) timer = setTimeout(tick, index < 5 ? 105 : 62);
    };
    timer = setTimeout(tick, 360);
    return () => clearTimeout(timer);
  }, []);

  return <span className="typed-name" aria-label={fullName}>
    <span aria-hidden="true">{typed}</span>
    <span className="typed-cursor" aria-hidden="true" />
  </span>;
}

export default function MotionEnhancements() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = document.querySelectorAll<HTMLElement>(
      ".hero-copy, .hero-aside, .hero-foot, .section-heading, .project-card, .about-story, .skills-grid article, .education-card, .cert-card, .language-row, .contact-grid, .contact-methods a, .work-footnote"
    );
    if (reduce || !("IntersectionObserver" in window)) {
      targets.forEach(target => target.classList.add("motion-visible"));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("motion-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    targets.forEach(target => {
      target.classList.add("motion-reveal");
      observer.observe(target);
    });
    return () => observer.disconnect();
  }, []);
  return null;
}
