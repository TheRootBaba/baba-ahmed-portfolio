"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "@/app/components/smooth.css";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.9
    });
    let raf = 0;

    const shouldRun = () => !document.hidden && document.body.style.overflow !== "hidden";
    const loop = (time: number) => {
      raf = 0;
      if (!shouldRun()) return;
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    const schedule = () => {
      if (!raf && shouldRun()) raf = requestAnimationFrame(loop);
    };
    const sync = () => {
      if (!shouldRun()) {
        lenis.stop();
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
      } else {
        lenis.start();
        schedule();
      }
    };

    const observer = new MutationObserver(sync);
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    document.addEventListener("visibilitychange", sync);
    sync();

    const click = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || anchor.target === "_blank") return;
      let url: URL;
      try {
        url = new URL(anchor.href, location.href);
      } catch {
        return;
      }
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -72, duration: 1.6 });
      history.replaceState(null, "", url.hash);
    };

    document.addEventListener("click", click);
    return () => {
      document.removeEventListener("click", click);
      document.removeEventListener("visibilitychange", sync);
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
