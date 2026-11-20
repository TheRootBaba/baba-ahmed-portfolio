import type { Metadata } from "next";
import Portfolio from "@/app/components/home";

const siteUrl = "https://www.babaahmed.me";

export const metadata: Metadata = {
  title: { absolute: "بابا أحمد البيكاي | أمن الشبكات والأمن السيبراني" },
  description: "المحفظة المهنية لبابا أحمد البيكاي: مشاريع أمن الشبكات والأمن السيبراني وأمن الحوسبة السحابية والبنية التحتية والأدوات البرمجية، مع دراسات حالة وأدلة تقنية.",
  alternates: {
    canonical: "/ar",
    languages: { en: "/", ar: "/ar" }
  },
  openGraph: {
    type: "website",
    url: siteUrl + "/ar",
    siteName: "Baba Ahmed El Bekay",
    title: { absolute: "بابا أحمد البيكاي | أمن الشبكات والأمن السيبراني" },
    description: "مشاريع عملية في الأمن السيبراني وأمن الشبكات والحوسبة السحابية، موثقة بالتصميم والأدلة التقنية.",
    locale: "ar_AR",
    images: [{
      url: "/opengraph-image",
      width: 1200,
      height: 630,
      alt: "بابا أحمد البيكاي — محفظة أمن الشبكات والأمن السيبراني"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: { absolute: "بابا أحمد البيكاي | أمن الشبكات والأمن السيبراني" },
    description: "مشاريع عملية في الأمن السيبراني وأمن الشبكات والحوسبة السحابية.",
    images: ["/opengraph-image"]
  }
};

export default function ArabicPage() {
  return <Portfolio lang="ar" />;
}
