import type { Metadata } from "next";
import Portfolio from "@/app/components/portfolio";

const siteUrl = "https://www.babaahmed.me";

export const metadata: Metadata = {
  alternates: { canonical: "/" }
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
        "Network security", "Cybersecurity", "Cloud infrastructure",
        "Oracle Cloud Infrastructure", "Linux", "Python", "Network automation",
        "Security operations", "TCP/IP", "Nmap"
      ],
      knowsLanguage: ["Arabic", "English", "French"]
    },
    {
      "@type": "WebSite",
      "@id": siteUrl + "/#website",
      url: siteUrl,
      name: "Baba Ahmed El Bekay — Portfolio",
      description: "Cybersecurity, network security and cloud infrastructure projects by Baba Ahmed El Bekay.",
      inLanguage: "en",
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
      <Portfolio />
    </>
  );
}
