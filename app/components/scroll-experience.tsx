"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollExperience({ rtl = false }: { rtl?: boolean }) {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const percent = new Intl.NumberFormat(rtl ? "ar-u-nu-arab" : "en-GB").format(progress);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const root = document.documentElement;
        const max = root.scrollHeight - window.innerHeight;
        const y = window.scrollY;
        const next = max > 0 ? Math.min(100, Math.max(0, Math.round((y / max) * 100))) : 0;
        setProgress(current => current === next ? current : next);
        setShowTop(current => current === (y > 560) ? current : y > 560);
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
        aria-label={rtl ? "تقدم القراءة في الصفحة" : "Page reading progress"}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <span style={{ transform: `scaleX(${progress / 100})` }} />
      </div>
      <button
        className={showTop ? "scroll-top is-visible" : "scroll-top"}
        type="button"
        aria-label={rtl ? `العودة إلى الأعلى — تمت قراءة ${percent}٪` : `Back to top — ${percent}% read`}
        onClick={backToTop}
      >
        <span>{percent}{rtl ? "٪" : "%"}</span>
        <ArrowUp size={16} aria-hidden="true" />
      </button>
    </>
  );
}
