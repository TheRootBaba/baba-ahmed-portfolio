export const runtime = "nodejs";

type ResumeLine = { text: string; size?: number; bold?: boolean; gap?: number };

const pages: ResumeLine[][] = [
  [
    { text: "BABA AHMED EL BEKAY", size: 22, bold: true },
    { text: "Cybersecurity Analyst | Network Security | Cloud Security", size: 10 },
    { text: "babaahmed3409@gmail.com  |  +222 34092106  |  Nouakchott, Mauritania", size: 9, gap: 5 },
    { text: "linkedin.com/in/babaahmedelbekay  |  github.com/TheRootBaba  |  www.babaahmed.me", size: 8 },
    { text: "PROFESSIONAL SUMMARY", size: 11, bold: true, gap: 15 },
    { text: "Network Security student (Microsoft and Oracle certified) with hands-on experience building", size: 9 },
    { text: "security automation tools, managing Linux environments, and monitoring network infrastructure.", size: 9 },
    { text: "Seeking a remote Junior SOC Analyst, Cloud Security, or Network Security internship.", size: 9, gap: 5 },
    { text: "TECHNICAL SKILLS", size: 11, bold: true, gap: 13 },
    { text: "Networking: TCP/IP, IPv4, VLSM, VLANs, OSPF, ACLs, DNS, DHCP, NAT", size: 9 },
    { text: "Security: Nmap, FortiGate, VPN, access controls, threat detection, incident response,", size: 9 },
    { text: "SIEM, log analysis", size: 9 },
    { text: "Cloud & Systems: OCI, IAM, Linux, Bash, Docker, Prometheus, WireGuard", size: 9 },
    { text: "Programming & Tools: Python, SQL, Git, GNS3, Streamlit", size: 9, gap: 5 },
    { text: "PROJECT EXPERIENCE", size: 11, bold: true, gap: 13 },
    { text: "AegisSOC | Python, Docker, SIEM, Prometheus | 2026", size: 10, bold: true },
    { text: "Designed and deployed a self-hosted SOC platform for local lab use. Implemented event", size: 9 },
    { text: "collection, alert investigation, and orchestrated response actions using Docker isolation.", size: 9, gap: 7 },
    { text: "NetSec Agent | Python, Nmap, Streamlit, AI APIs | 2026", size: 10, bold: true },
    { text: "Built automated network reconnaissance integrating Nmap scans with AI-assisted explanations.", size: 9 },
    { text: "Created a Streamlit interface to help junior analysts review vulnerability scan results.", size: 9, gap: 7 },
    { text: "NetOps Sentinel | Python, GNS3, JSON, Linux | 2026", size: 10, bold: true },
    { text: "Developed a network monitoring lab to automate device inventory, endpoint reachability", size: 9 },
    { text: "checks, and structured JSON evidence logging.", size: 9, gap: 7 },
    { text: "NexusCloud | Docker, Prometheus, WireGuard, OCI | 2026", size: 10, bold: true },
    { text: "Engineered a local hybrid-infrastructure lab focused on network segmentation, monitoring", size: 9 },
    { text: "and secure routing.", size: 9 }
  ],
  [
    { text: "BABA AHMED EL BEKAY", size: 17, bold: true },
    { text: "EDUCATION", size: 11, bold: true, gap: 17 },
    { text: "MIFITT Institute | Nouakchott, Mauritania", size: 10, bold: true },
    { text: "BTS in Network Security | 2025-Present", size: 9, gap: 10 },
    { text: "Lycee d'Excellence 2 | Nouakchott, Mauritania", size: 10, bold: true },
    { text: "Baccalaureat in Science | 2023-2024", size: 9, gap: 16 },
    { text: "CERTIFICATIONS", size: 11, bold: true, gap: 12 },
    { text: "Microsoft Cybersecurity Analyst Professional Certificate - Microsoft / Coursera (2026)", size: 9 },
    { text: "Oracle Cloud Infrastructure Architect Associate - Oracle (2026)", size: 9 },
    { text: "Cyber Security: Governance, Risk & Compliance - Macquarie University (2026)", size: 9 },
    { text: "NSE 3: FortiGate Operator - Fortinet (2026)", size: 9 },
    { text: "Agentic AI Foundations Associate - Oracle (2026)", size: 9 },
    { text: "LFS101: Introduction to Linux - The Linux Foundation (2026)", size: 9 },
    { text: "SQL (Intermediate) - HackerRank (2026)", size: 9 },
    { text: "Python Essentials 1 - Cisco Networking Academy", size: 9, gap: 16 },
    { text: "LANGUAGES", size: 11, bold: true, gap: 12 },
    { text: "Arabic (Native)  |  French (Advanced)  |  English (Advanced - C1)", size: 9, gap: 22 },
    { text: "CONTACT", size: 11, bold: true, gap: 12 },
    { text: "Email: babaahmed3409@gmail.com", size: 9 },
    { text: "Phone: +222 34092106", size: 9 },
    { text: "LinkedIn: linkedin.com/in/babaahmedelbekay", size: 9 },
    { text: "GitHub: github.com/TheRootBaba", size: 9 },
    { text: "Portfolio: www.babaahmed.me", size: 9 }
  ]
];

function pdfEscape(value: string) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x20-\x7E]/g, "-")
    .replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function pageStream(lines: ResumeLine[]) {
  let y = 748;
  const commands = ["0.12 0.19 0.15 rg"];
  for (const item of lines) {
    y -= item.gap ?? 0;
    const size = item.size ?? 9;
    const font = item.bold ? "F2" : "F1";
    commands.push(`BT /${font} ${size} Tf 48 ${y} Td (${pdfEscape(item.text)}) Tj ET`);
    y -= item.bold ? size + 9 : size + 6;
  }
  commands.push("0.18 0.48 0.35 RG 48 38 m 564 38 l S");
  commands.push("BT /F1 7 Tf 48 24 Td (Baba Ahmed El Bekay  |  Resume) Tj ET");
  return commands.join("\n");
}

function makePdf() {
  const streams = pages.map(pageStream);
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R 5 0 R] /Count 2 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 6 0 R >> >> /Contents 7 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 6 0 R >> >> /Contents 8 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    `<< /Length ${streams[0].length} >>\nstream\n${streams[0]}\nendstream`,
    `<< /Length ${streams[1].length} >>\nstream\n${streams[1]}\nendstream`
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const offset of offsets.slice(1)) pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return pdf;
}

export async function GET() {
  const pdf = makePdf();
  return new Response(new TextEncoder().encode(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Baba-Ahmed-El-Bekay-Resume.pdf"',
      "Cache-Control": "public, max-age=3600"
    }
  });
}
