"use client";
import {useEffect} from "react";
import {usePathname} from "next/navigation";
export default function LanguageSwitch(){const path=usePathname();const ar=path==="/ar"||path.startsWith("/ar/");useEffect(()=>{document.documentElement.lang=ar?"ar":"en";document.documentElement.dir=ar?"rtl":"ltr";},[ar]);return <a className="language-switch" href={ar?"/":"/ar"} lang={ar?"en":"ar"} dir="ltr" aria-label={ar?"Switch to English":"التبديل إلى العربية"}>{ar?"EN":"العربية"}</a>}