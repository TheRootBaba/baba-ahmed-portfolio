"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, Terminal as TermIcon, X } from "lucide-react";
import SmoothScroll from "@/app/components/smooth-scroll";

const Terminal = dynamic(() => import("@/app/components/terminal"), { ssr: false });

export function ProjectNav({ toc }: { toc: { id: string; label: string }[] }) {
  const { scrollYProgress } = useScroll();
  const prog = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  const [active, setActive] = useState(toc[0]?.id ?? "");
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-30% 0px -60% 0px" });
    toc.forEach(t => { const el = document.getElementById(t.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [toc]);
  return <>
    <motion.div className="pd-prog" style={{ scaleX: prog }} />
    <nav className="pd-toc" aria-label="On this page"><span className="mono">On this page</span>
      {toc.map((t, i) => <a key={t.id} href={`#${t.id}`} className={active === t.id ? "on" : ""}><i>{String(i + 1).padStart(2, "0")}</i>{t.label}</a>)}
    </nav>
  </>;
}

type Img = { src: string; alt: string; caption: string };
export function Gallery({ images }: { images: Img[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const n = images.length;
  const go = useCallback((d: number) => setOpen(o => (o === null ? o : (o + d + n) % n)), [n]);
  useEffect(() => {
    if (open === null) return;
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    document.body.style.overflow = "hidden"; window.addEventListener("keydown", key); btn.current?.focus();
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", key); };
  }, [open, go]);
  return <>
    <div className="pd-gallery">{images.map((img, i) => <figure key={img.src} className={i === 0 ? "feat" : ""}>
      <button type="button" onClick={() => setOpen(i)} aria-label={`Open full size: ${img.alt}`}>
        <span className="pd-chrome"><i /><i /><i /></span>
        <span className="pd-image-frame">
          <Image src={img.src} alt={img.alt} fill sizes="(max-width: 760px) 92vw, 820px" />
        </span>
        <span className="pd-zoom"><Expand size={14} /> Full size</span>
      </button>
      <figcaption><span className="mono">Figure {String(i + 1).padStart(2, "0")}</span>{img.caption}</figcaption>
    </figure>)}</div>
    {open !== null && <div className="pd-lb" role="dialog" aria-modal="true" aria-label="Image viewer" onClick={() => setOpen(null)}>
      <button ref={btn} className="pd-lb-x" onClick={() => setOpen(null)} aria-label="Close"><X size={20} /></button>
      {n > 1 && <button className="pd-lb-n l" onClick={e => { e.stopPropagation(); go(-1); }} aria-label="Previous"><ChevronLeft size={24} /></button>}
      <figure onClick={e => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={images[open].src} alt={images[open].alt} />
        <figcaption>{images[open].caption} <span>{open + 1} / {n}</span></figcaption>
      </figure>
      {n > 1 && <button className="pd-lb-n r" onClick={e => { e.stopPropagation(); go(1); }} aria-label="Next"><ChevronRight size={24} /></button>}
    </div>}
  </>;
}

export function TermButton() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const key = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen(o => !o); } if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", key); return () => window.removeEventListener("keydown", key);
  }, []);
  return <><SmoothScroll /><button type="button" className="pd-kbd" onClick={() => setOpen(true)} aria-label="Open command line"><TermIcon size={14} />⌘K</button>{open && <Terminal onClose={() => setOpen(false)} />}</>;
}
