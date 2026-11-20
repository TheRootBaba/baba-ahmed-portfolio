import type { Metadata, Viewport } from "next";
import {
  Amiri,
  IBM_Plex_Sans_Arabic,
  Instrument_Serif,
  Inter_Tight,
  JetBrains_Mono
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/app/components/language-switch.css";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif"
});
const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-inter-tight"
});
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-jetbrains-mono"
});
const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
  preload: false,
  variable: "--font-amiri"
});
const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  preload: false,
  variable: "--font-ibm-plex-arabic"
});

const siteUrl = "https://www.babaahmed.me";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Baba Ahmed El Bekay — Network Security & Cybersecurity",
    template: "%s | Baba Ahmed El Bekay"
  },
  description: "Baba Ahmed El Bekay is a Mauritanian network security student building practical cybersecurity, cloud security and infrastructure projects with documented technical evidence.",
  keywords: [
    "Baba Ahmed El Bekay",
    "network security",
    "cybersecurity portfolio",
    "cloud security",
    "AWS security",
    "Azure security",
    "SOC engineering",
    "Python security tools",
    "network engineering",
    "Mauritania"
  ],
  authors: [{ name: "Baba Ahmed El Bekay", url: siteUrl }],
  creator: "Baba Ahmed El Bekay",
  publisher: "Baba Ahmed El Bekay",
  applicationName: "Baba Ahmed Portfolio",
  alternates: {
    canonical: "/",
    languages: { en: "/", ar: "/ar" }
  },
  robots: {
    index: process.env.VERCEL_ENV === "production",
    follow: true,
    googleBot: {
      index: process.env.VERCEL_ENV === "production",
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1
    }
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Baba Ahmed El Bekay",
    title: "Baba Ahmed El Bekay — Network Security & Cybersecurity",
    description: "Practical cybersecurity, cloud security and network engineering projects, documented with architecture, decisions and evidence.",
    locale: "en_US",
    alternateLocale: ["ar_AR"],
    images: [{
      url: "/opengraph-image",
      width: 1200,
      height: 630,
      alt: "Baba Ahmed El Bekay — network security and cybersecurity portfolio"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Baba Ahmed El Bekay — Network Security & Cybersecurity",
    description: "Practical cybersecurity, cloud security and network engineering projects.",
    images: ["/opengraph-image"]
  },
  icons: { icon: "/assets/favicon.svg" }
};

export const viewport: Viewport = {
  themeColor: "#f6f6f2",
  colorScheme: "light"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const fontVariables = [
    instrumentSerif.variable,
    interTight.variable,
    jetBrainsMono.variable,
    amiri.variable,
    ibmPlexSansArabic.variable
  ].join(" ");

  return (
    <html lang="en" dir="ltr" className={fontVariables}>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
