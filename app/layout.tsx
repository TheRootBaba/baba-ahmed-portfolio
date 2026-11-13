import type { Metadata, Viewport } from "next";
import { DM_Mono, DM_Sans, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const dmMono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-dm-mono", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-dm-sans", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-space-grotesk", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://baba-ahmed-portfolio.vercel.app"),
  title: { default: "Baba Ahmed El Bekay — Cybersecurity & Cloud Infrastructure", template: "%s — Baba Ahmed" },
  description: "Baba Ahmed El Bekay is a Network Security student and cybersecurity builder focused on network defense, cloud infrastructure, Linux and Python. Explore hands-on security projects, engineering case studies and technical labs. Open to remote internships and entry-level opportunities.",
  keywords: ["Baba Ahmed El Bekay", "cybersecurity portfolio", "network security", "cybersecurity student", "cloud infrastructure", "cloud security", "SOC engineering", "Python security tools", "Linux", "Oracle Cloud Infrastructure", "network automation", "Mauritania"],
  authors: [{ name: "Baba Ahmed El Bekay", url: "https://baba-ahmed-portfolio.vercel.app" }],
  creator: "Baba Ahmed El Bekay",
  publisher: "Baba Ahmed El Bekay",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 } },
  applicationName: "Baba Ahmed Portfolio",
  openGraph: { type: "website", url: "https://baba-ahmed-portfolio.vercel.app", title: "Baba Ahmed El Bekay — Cybersecurity & Cloud Infrastructure", description: "Practical security engineering, network infrastructure and cloud projects.", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Baba Ahmed portfolio" }] },
  twitter: { card: "summary_large_image", title: "Baba Ahmed El Bekay — Cybersecurity & Cloud", description: "Practical security engineering, network infrastructure and cloud projects.", images: ["/opengraph-image"] },
  icons: { icon: "/assets/favicon.svg" }
};
export const viewport: Viewport = { themeColor: "#ffffff", colorScheme: "light" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${dmMono.variable} ${dmSans.variable} ${spaceGrotesk.variable}`}>{children}<Analytics /></body></html>;
}
