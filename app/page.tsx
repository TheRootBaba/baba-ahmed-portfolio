import type { Metadata } from "next";
import Portfolio from "@/app/components/home";

const siteUrl = "https://www.babaahmed.me";

export const metadata: Metadata = {
  title: { absolute: "Baba Ahmed El Bekay — Network Security & Cybersecurity" },
  description: "Explore Baba Ahmed El Bekay’s network security portfolio: cloud security, AegisSOC, Python security automation, network engineering labs and evidence-led case studies.",
  alternates: { canonical: "/", languages: { en: "/", ar: "/ar" } },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Baba Ahmed El Bekay | Network Security & Cybersecurity Portfolio",
    description: "Cloud security, cybersecurity engineering and network infrastructure projects—documented with architecture, engineering decisions and evidence.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Baba Ahmed El Bekay cybersecurity and network engineering portfolio" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Baba Ahmed El Bekay | Network Security Portfolio",
    description: "Cloud security, cybersecurity engineering and network infrastructure projects.",
    images: ["/opengraph-image"]
  }
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": siteUrl + "/#person",
      name: "Baba Ahmed El Bekay",
      url: siteUrl,
      image: siteUrl + "/opengraph-image",
      jobTitle: "Network Security Student and Cybersecurity Builder",
      description: "Network Security student building practical cybersecurity tools, network labs and cloud infrastructure projects. Open to remote roles and internships.",
      email: "mailto:babaahmed3409@gmail.com",
      sameAs: [
        "https://github.com/TheRootBaba",
        "https://www.linkedin.com/in/babaahmedelbekay/"
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nouakchott",
        addressCountry: "MR"
      },
      knowsAbout: [
        "Network security", "Cybersecurity", "Cloud security", "AWS", "Azure",
        "Oracle Cloud Infrastructure", "Linux", "Python", "Network automation",
        "Security operations", "TCP/IP", "Nmap"
      ],
      knowsLanguage: ["Arabic", "English", "French"]
    },
    {
      "@type": "ProfilePage",
      "@id": siteUrl + "/#profile",
      url: siteUrl,
      name: "Baba Ahmed El Bekay — Profile",
      inLanguage: ["en", "ar"],
      mainEntity: { "@id": siteUrl + "/#person" }
    },
    {
      "@type": "WebSite",
      "@id": siteUrl + "/#website",
      url: siteUrl,
      name: "Baba Ahmed El Bekay — Portfolio",
      description: "Cybersecurity, network security and cloud infrastructure projects by Baba Ahmed El Bekay.",
      inLanguage: ["en", "ar"],
      publisher: { "@id": siteUrl + "/#person" }
    }
  ]
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <Portfolio lang="en" />
    </>
  );
}
