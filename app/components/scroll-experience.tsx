"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollExperience() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const root = document.documentElement;
        const max = root.scrollHeight - window.innerHeight;
        const y = window.scrollY;
        const next = max > 0 ? Math.min(100, Math.max(0, (y / max) * 100)) : 0;
        setProgress(next);
        setShowTop(y > 560);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const backToTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <>
      <div
        className="scroll-progress"
        role="progressbar"
        aria-label="Page reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
      >
        <span style={{ transform: `scaleX(${progress / 100})` }} />
      </div>
      <button
        className={showTop ? "scroll-top is-visible" : "scroll-top"}
        type="button"
        aria-label={`Back to top — ${Math.round(progress)}% read`}
        onClick={backToTop}
      >
        <span>{Math.round(progress)}%</span>
        <ArrowUp size={16} aria-hidden="true" />
      </button>
    </>
  );
}
