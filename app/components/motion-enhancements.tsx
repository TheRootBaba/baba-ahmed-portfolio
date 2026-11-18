"use client";

import { useEffect, useState } from "react";

const fullName = "Baba Ahmed El Bekay";

export function TypedName() {
  const [typed, setTyped] = useState(fullName);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let index = 0;
    let timer: ReturnType<typeof setTimeout>;
    setTyped("");
    const tick = () => {
      index += 1;
      setTyped(fullName.slice(0, index));
      if (index < fullName.length) timer = setTimeout(tick, 105);
    };
    timer = setTimeout(tick, 450);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span className="typed-name" aria-label={fullName}>
      <span aria-hidden="true">{typed}</span>
      <span className="typed-cursor" aria-hidden="true" />
    </span>
  );
}

export default function MotionEnhancements() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>(
      ".hero-copy, .hero-aside, .hero-foot, .section-heading, .project-card, .about-story, .skills-grid article, .education-card, .cert-card, .language-row, .contact-grid, .contact-methods a, .work-footnote"
    ));
    const revealAll = () => {
      document.documentElement.classList.remove("motion-enabled");
      targets.forEach(target => target.classList.add("motion-visible"));
    };

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      revealAll();
      return;
    }

    // Enable the hidden/reveal state before observing, so below-the-fold
    // content never flashes in and then disappears.
    document.documentElement.classList.add("motion-enabled");
    targets.forEach(target => target.classList.add("motion-reveal"));

    let observer: IntersectionObserver;
    try {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("motion-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" });

      targets.forEach(target => observer.observe(target));
    } catch {
      revealAll();
      return;
    }

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion-enabled");
    };
  }, []);

  return null;
}
