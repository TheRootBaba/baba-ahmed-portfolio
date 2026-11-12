import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://baba-ahmed-portfolio.vercel.app"),
  title: { default: "Baba Ahmed El Bekay — Cybersecurity & Cloud Infrastructure", template: "%s — Baba Ahmed" },
  description: "Baba Ahmed El Bekay is a Network Security student building practical cybersecurity tools, network labs and cloud infrastructure projects. Open to remote internships.",
  applicationName: "Baba Ahmed Portfolio",
  openGraph: { type: "website", url: "https://baba-ahmed-portfolio.vercel.app", title: "Baba Ahmed El Bekay — Cybersecurity & Cloud Infrastructure", description: "Practical security engineering, network infrastructure and cloud projects.", images: [{ url: "/assets/og-cover.svg", width: 1200, height: 630, alt: "Baba Ahmed portfolio" }] },
  twitter: { card: "summary_large_image", title: "Baba Ahmed El Bekay — Cybersecurity & Cloud", description: "Practical security engineering, network infrastructure and cloud projects.", images: ["/assets/og-cover.svg"] },
  icons: { icon: "/assets/favicon.svg" }
};
export const viewport: Viewport = { themeColor: "#ffffff", colorScheme: "light" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<Analytics /></body></html>;
}
