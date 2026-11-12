import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "AegisSOC — Engineering Case Study",
  description: "A technical case study of AegisSOC, a local-first security operations platform built by Baba Ahmed El Bekay."
};

const capabilities = [
  ["Event ingestion", "Authenticated event ingestion, source normalization, native Wazuh alert ingestion, bounded bulk ingestion and replay protection."],
  ["Investigation", "Event search, structured filters, saved queries, evidence-linked alerts, incident cases, analyst notes and audit history."],
  ["Detection engineering", "Deterministic starter detections, ATT&CK metadata, a governed Sigma subset and bounded event-count correlation."],
  ["Threat intelligence", "A local IOC registry with MISP and OpenCTI feed adapters, provenance, expiry and analyst revocation."],
  ["Asset risk", "Asset inventory and normalized imports from Nessus, Tenable and Qualys scanner exports."],
  ["Governed response", "Approval-gated response requests, separate execution, signed webhook delivery, idempotency and receiver reconciliation."]
];

export default function AegisSOCPage() {
  return (
    <main className="case-page">
      <div className="case-shell">
        <nav className="case-nav" aria-label="Case study navigation">
          <Link href="/">BA / BABA AHMED</Link>
          <Link href="/#work"><ArrowLeft size={13} style={{display:"inline",verticalAlign:"middle",marginRight:7}}/> BACK TO WORK</Link>
        </nav>
        <header className="case-hero">
          <p className="case-kicker">FLAGSHIP ENGINEERING PROJECT / SECURITY OPERATIONS</p>
          <h1>Aegis<span>SOC.</span></h1>
          <p className="case-lede">A local-first security operations platform for collecting security telemetry, investigating alerts and coordinating controlled response. Designed around evidence, workspace boundaries and explicit operational controls.</p>
          <div className="case-meta"><span>PYTHON / FASTAPI</span><span>POSTGRESQL</span><span>DOCKER COMPOSE</span><span>ACTIVE ENGINEERING PROJECT</span></div>
        </header>

        <section className="case-section">
          <p className="case-kicker">01 / THE PROBLEM</p>
          <h2>Security data needs a workflow, not just a dashboard.</h2>
          <p>A useful SOC workflow has to bring events into a consistent format, let an analyst follow evidence into an alert or incident, enrich investigations with threat intelligence and keep response actions controlled. AegisSOC brings those parts into one local-first platform with PostgreSQL as its system of record and separate background workers for scheduled and integration tasks.</p>
        </section>

        <section className="case-section">
          <p className="case-kicker">02 / WHAT IS IMPLEMENTED</p>
          <h2>From telemetry to governed action.</h2>
          <div className="case-grid">
            {capabilities.map(([title,body],i)=>(
              <article className="case-tile" key={title}>
                <span>CAPABILITY / {String(i+1).padStart(2,"0")}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="case-section">
          <p className="case-kicker">03 / ARCHITECTURE</p>
          <h2>Separate responsibilities. Keep boundaries explicit.</h2>
          <p>The FastAPI service handles authenticated requests and the dashboard. PostgreSQL stores the platform state. Dedicated scheduler, retention, integration and response workers run independently so background polling and response delivery do not execute inside analyst-facing request handlers.</p>
          <div className="case-grid">
            <article className="case-tile"><span>APPLICATION</span><h3>FastAPI + dashboard</h3><p>Authenticated API, normalized event workflows and analyst-facing investigation tools.</p></article>
            <article className="case-tile"><span>DATA LAYER</span><h3>PostgreSQL + RLS</h3><p>Workspace-aware persistence, ORM scoping and PostgreSQL row-level security using a restricted runtime role.</p></article>
            <article className="case-tile"><span>BACKGROUND</span><h3>Dedicated workers</h3><p>Independent scheduling, retention, provider integration and response execution processes.</p></article>
            <article className="case-tile"><span>INTEGRATIONS</span><h3>Security ecosystem</h3><p>Wazuh, MISP, OpenCTI, JSON feeds and scanner export normalization.</p></article>
          </div>
        </section>

        <section className="case-section">
          <p className="case-kicker">04 / SECURITY & HONEST LIMITS</p>
          <h2>Controls matter as much as features.</h2>
          <p>The platform includes workspace membership checks, PostgreSQL RLS, a non-owner runtime database role, bounded provider requests, secret references, audit history and approval separated from response execution.</p>
          <div className="case-boundary"><strong>Current project status:</strong> AegisSOC is an actively developed engineering project and lab deployment, not a certified production SIEM. Scanner integrations normalize exports rather than launch scans. Sigma support is a documented subset. Response requests go to a configured receiver; AegisSOC does not directly isolate endpoints or execute arbitrary commands. Provider compatibility and deployment security still require environment-specific validation.</div>
        </section>

        <section className="case-section">
          <p className="case-kicker">05 / HOW TO REVIEW IT</p>
          <h2>Follow the evidence.</h2>
          <p>The repository includes architecture documentation, integration contracts, security notes, a synthetic-event walkthrough, demo-capture guidance and development checks. The intended reviewer walkthrough follows a synthetic authentication event from ingestion to detection, alert evidence, incident case and audit history. Response delivery should only be demonstrated against a local test receiver.</p>
        </section>

        <div className="case-cta">
          <a href="https://github.com/TheRootBaba/AegisSOC" target="_blank" rel="noreferrer">Explore AegisSOC on GitHub <ArrowUpRight size={14} style={{display:"inline",verticalAlign:"middle",marginLeft:8}}/></a>
          <a href="https://github.com/TheRootBaba/AegisSOC/blob/main/docs/PLATFORM_ARCHITECTURE.md" target="_blank" rel="noreferrer">Read architecture docs <ArrowUpRight size={14} style={{display:"inline",verticalAlign:"middle",marginLeft:8}}/></a>
        </div>
      </div>
    </main>
  );
}
