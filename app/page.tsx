import type { Metadata } from "next";
import Portfolio from "@/app/components/portfolio";

export const metadata: Metadata = {
  alternates: { canonical: "/" }
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Baba Ahmed El Bekay",
  url: "https://baba-ahmed-portfolio.vercel.app",
  image: "https://baba-ahmed-portfolio.vercel.app/opengraph-image",
  jobTitle: "Network Security Student and Cybersecurity Builder",
  description: "Network Security student building practical cybersecurity tools, network labs and cloud infrastructure projects. Open to remote internships and entry-level opportunities.",
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
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema).replace(/</g, "\\u003c") }}
      />
      <Portfolio />
    </>
  );
}
