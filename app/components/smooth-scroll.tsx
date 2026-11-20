"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "@/app/components/smooth.css";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), wheelMultiplier: 0.9 });
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    const sync = () => { if (document.body.style.overflow === "hidden") lenis.stop(); else lenis.start(); };
    const mo = new MutationObserver(sync);
    mo.observe(document.body, { attributes: true, attributeFilter: ["style"] }); sync();
    const click = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === "_blank") return;
      let u: URL; try { u = new URL(a.href, location.href); } catch { return; }
      if (u.origin !== location.origin || u.pathname !== location.pathname || !u.hash) return;
      const el = document.getElementById(decodeURIComponent(u.hash.slice(1)));
      if (!el) return;
      e.preventDefault(); lenis.scrollTo(el, { offset: -72, duration: 1.6 }); history.replaceState(null, "", u.hash);
    };
    document.addEventListener("click", click);
    return () => { document.removeEventListener("click", click); mo.disconnect(); cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);
  return null;
}
