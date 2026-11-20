import type { Metadata } from "next";
import Portfolio from "@/app/components/home";

export const metadata: Metadata = {
  title: "بابا أحمد البيكاي — أمن الشبكات والأمن السيبراني",
  description: "المحفظة المهنية لبابا أحمد البيكاي: مشاريع أمن الشبكات والأمن السيبراني والبنية التحتية السحابية والمختبرات التقنية.",
  alternates: { canonical: "/ar", languages: { en: "/", ar: "/ar" } },
};

export default function ArabicPage() { return <Portfolio lang="ar" />; }
