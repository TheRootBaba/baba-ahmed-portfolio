import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://baba-ahmed-portfolio.vercel.app"),
  title: {
    default: "Baba Ahmed El Bekay — Network Security & Cloud",
    template: "%s — Baba Ahmed"
  },
  description:
    "Baba Ahmed El Bekay is a network security and cloud infrastructure student building practical security tools, network labs and automation.",
  applicationName: "Baba Ahmed Portfolio",
  openGraph: {
    type: "website",
    url: "https://baba-ahmed-portfolio.vercel.app",
    title: "Baba Ahmed El Bekay — Network Security & Cloud",
    description: "Engineering secure, observable and resilient infrastructure.",
    images: [{ url: "/assets/og-cover.svg", width: 1200, height: 630, alt: "Baba Ahmed portfolio" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Baba Ahmed El Bekay — Network Security & Cloud",
    description: "Engineering secure, observable and resilient infrastructure.",
    images: ["/assets/og-cover.svg"]
  },
  icons: { icon: "/assets/favicon.svg" }
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
