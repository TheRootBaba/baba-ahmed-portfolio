import type { Metadata } from "next";
import ProjectDetail from "@/app/components/project-detail";
import { projectMetadata } from "@/app/lib/seo";

export const metadata: Metadata = projectMetadata({
  slug: "cloudshield",
  title: "CloudShield — AWS & Azure Cloud Security Lab",
  description: "A local-first AWS and Azure cloud security command center with explainable detections, incident investigation, tenant-scoped evidence, read-only collection and approval-governed response workflows."
});

export default function Page() {
  return <ProjectDetail
    slug="cloudshield"
    number="02"
    category="CLOUD SECURITY COMMAND CENTER"
    title="CloudShield"
    summary="An evidence-led, local-first cloud security command center for selected AWS and Azure audit telemetry. CloudShield brings explainable detections, incident investigation, evidence custody and guarded response planning into one workspace-oriented interface."
    repository="https://github.com/TheRootBaba/CloudShield-Lab"
    stack={["React", "TypeScript", "Python", "AWS CloudTrail", "AWS Security Hub", "Azure Activity Logs", "SQLite", "Docker"]}
    problem="Cloud security investigations can become fragmented across provider consoles, event formats and separate evidence stores. CloudShield explores a more inspectable workflow: normalize a bounded set of cloud audit events, explain why a rule matched, group related activity for investigation and preserve integrity-checkable evidence without implying that a local lab is a full production SIEM."
    architecture={[
      { name: "React command center", detail: "A responsive analyst interface for overview, detections, incidents, evidence, alerts, cloud connections and response requests." },
      { name: "Python API and control plane", detail: "Authenticates users, enforces role and workspace authorization, routes tenant context server-side and exposes investigation and operations workflows." },
      { name: "Detection and correlation pipeline", detail: "Normalizes selected AWS CloudTrail, AWS Security Hub and Azure Activity Log event shapes, evaluates explainable rules and groups bounded relationships as hypotheses rather than proof of causality." },
      { name: "Workspace evidence stores", detail: "Separate SQLite evidence databases hold normalized events, findings, incidents and evidence metadata; a shared control database manages users, workspace membership and approvals." },
      { name: "Read-only collection worker", detail: "A separate worker performs bounded scheduled polling and partial inventory refresh using configured workspace cloud identities; collection is not a streaming feed." },
      { name: "Response governance boundary", detail: "Dry-run plans, blast-radius summaries, approval quorum, idempotency and a default-on kill switch are implemented, while production AWS/Azure write adapters remain uninstalled and execution fails closed." }
    ]}
    milestones={[
      { phase: "01 · PRODUCT SCOPE", title: "Define an evidence-led security workflow", detail: "Set explicit boundaries around selected control-plane telemetry, explainable rules, investigation, evidence integrity and guarded response.", status: "Documented" },
      { phase: "02 · DETECTION", title: "Normalize provider events and evaluate rules", detail: "Added selected AWS CloudTrail, AWS Security Hub and Azure Activity Log event shapes with severity, source context and curated MITRE ATT&CK references.", status: "Implemented" },
      { phase: "03 · INVESTIGATION", title: "Connect findings to incident context", detail: "Built incident grouping and evidence-backed temporal/resource relationships while documenting that graph edges are correlations, not proof of causality.", status: "Implemented" },
      { phase: "04 · EVIDENCE & TENANCY", title: "Preserve evidence across workspaces", detail: "Added SHA-256 fingerprints, portable incident bundles, optional detached Ed25519 signatures and workspace-scoped evidence databases.", status: "Implemented" },
      { phase: "05 · CLOUD OPERATIONS", title: "Separate bounded collection from response", detail: "Added scheduled read-only collection, worker health signals and guarded response planning with approvals, idempotency and a default-on emergency kill switch.", status: "Implemented" },
      { phase: "06 · RELEASE ASSURANCE", title: "Keep external production gates explicit", detail: "Documented the remaining need for isolated AWS/Azure acceptance, reviewed provider write adapters, multi-host coordination, operational monitoring and independent security assessment.", status: "Next" }
    ]}
    decisions={[
      { choice: "Keep collection bounded and read-only", rationale: "Scheduled control-plane polling is easier to inspect and constrain than broad collection. It is deliberately not presented as streaming telemetry or full cloud inventory." },
      { choice: "Resolve workspace identity on the server", rationale: "The browser does not select an arbitrary tenant database. The authenticated server-side session determines workspace context and role checks gate tenant operations." },
      { choice: "Treat detections and attack-path links as explainable hypotheses", rationale: "Findings retain source context and rule rationale. Correlations describe observed relationships, not verified causality or complete attack paths." },
      { choice: "Fail closed on cloud remediation", rationale: "Response planning and approval orchestration can be inspected without shipping an unreviewed AWS/Azure write adapter or implying autonomous containment." }
    ]}
    nextExperiment="Complete isolated AWS and Azure tenant-acceptance runs, independently review and test provider-specific response adapters before any cloud write capability, move worker coordination to a durable multi-host service before scaling, and add independently labelled detection-quality measurements."
    approach={[
      "Normalizes selected AWS CloudTrail, AWS Security Hub and Azure Activity Log event shapes.",
      "Evaluates explainable detection rules with severity, source context and curated MITRE ATT&CK references.",
      "Groups related findings into incidents using bounded actor/account and time-window context.",
      "Preserves SHA-256 evidence fingerprints, portable incident bundles and optional detached Ed25519 signatures.",
      "Separates workspace evidence stores and enforces authenticated role-based access.",
      "Uses a separate scheduled read-only collector with bounded polling, retry/backoff and worker health signals.",
      "Provides dry-run response plans, blast-radius reporting, independent approvals, idempotency, audit history and a default-on kill switch."
    ]}
    validation={[
      { label: "Repository test suite", result: "188 tests passed", detail: "Ran python -m unittest discover -s tests -v against the current GitHub main checkout; all 188 tests passed." },
      { label: "Detection corpus", result: "40 synthetic cases", detail: "The repository documents a 40-case regression corpus covering 19 catalogued AWS/Azure rules; fixture results are not production accuracy estimates." },
      { label: "Cloud sources", result: "3 selected formats", detail: "Selected AWS CloudTrail, AWS Security Hub and Azure Activity Log event shapes are normalized; provider coverage is intentionally bounded." },
      { label: "Evidence integrity", result: "SHA-256 + optional Ed25519", detail: "Canonical fingerprints and optional detached signatures support tamper-evidence checks, but do not prove source truth or trusted time." },
      { label: "Collection model", result: "Scheduled & read-only", detail: "A separate worker performs bounded polling and partial inventory refresh; it is not a streaming SIEM collector." },
      { label: "Response safety", result: "Dry-run & approval-gated", detail: "Planning, blast-radius reporting, approval quorum, idempotency and kill-switch controls are present; production cloud-write adapters are not installed." }
    ]}
    outcomes={[
      "A unified interface for selected cloud audit findings, incident workflows, evidence and cloud connection status.",
      "A tenant-aware data model that separates workspace evidence from shared authentication and control state.",
      "A documented evidence workflow with hashes, portable bundles and optional signatures.",
      "A fail-closed response governance model that makes approval and execution boundaries explicit."
    ]}
    evidenceNotice="These genuine screenshots are repository evidence from a local CloudShield run using a synthetic lab dataset. They demonstrate the product interface and documented workflows—not a live customer environment or successful production AWS/Azure integration."
    images={[
      { src: "/assets/projects/cloudshield/command-center.png", alt: "CloudShield command center overview with cloud security findings and workspace activity", caption: "Command center — overview of the local security workspace" },
      { src: "/assets/projects/cloudshield/evidence-vault.png", alt: "CloudShield evidence vault showing preserved incident evidence", caption: "Evidence vault — integrity-oriented evidence handling" },
      { src: "/assets/projects/cloudshield/alerts-response.png", alt: "CloudShield alerts and response interface", caption: "Alerts & response — review and controlled response workflow" },
      { src: "/assets/projects/cloudshield/response-governance.png", alt: "CloudShield guided response request with approval controls", caption: "Guided response — dry-run and approval-governed request" },
      { src: "/assets/projects/cloudshield/cloud-connections.png", alt: "CloudShield tenant-scoped AWS and Azure cloud connections", caption: "Cloud connections — workspace-scoped provider configuration" }
    ]}
    documentation={[
      { label: "Repository README & local setup", href: "https://github.com/TheRootBaba/CloudShield-Lab#readme" },
      { label: "Architecture & trust boundaries", href: "https://github.com/TheRootBaba/CloudShield-Lab/blob/main/docs/ARCHITECTURE.md" },
      { label: "Current capabilities & limitations", href: "https://github.com/TheRootBaba/CloudShield-Lab/blob/main/docs/CURRENT_CAPABILITIES.md" },
      { label: "Cloud operations & permissions", href: "https://github.com/TheRootBaba/CloudShield-Lab/blob/main/docs/CLOUD_OPERATIONS.md" },
      { label: "Security threat model", href: "https://github.com/TheRootBaba/CloudShield-Lab/blob/main/docs/SECURITY_THREAT_MODEL.md" },
      { label: "Evidence inventory & provenance", href: "https://github.com/TheRootBaba/CloudShield-Lab/blob/main/evidence/README.md" }
    ]}
    boundaries={[
      "CloudShield is a local-first security engineering lab, not a certified production CSPM/SIEM or comprehensive threat-detection platform.",
      "AWS collection is bounded CloudTrail management-event history; Azure collection is bounded Activity Logs and selected ARM metadata—not streaming telemetry.",
      "Inventory is partial observed/resource metadata, not authoritative organization-wide cloud inventory.",
      "Worker coordination uses SQLite leases on a supported shared volume and is a single-host design, not multi-region distributed coordination.",
      "Evidence hashes and optional signatures support integrity checks; they do not prove source truth or trusted time.",
      "Response dry-run and approval orchestration are implemented, but no reviewed production AWS/Azure write adapter is installed.",
      "Live provider acceptance, independent penetration and tenant-isolation assessment, off-host restore drills, centralized on-call monitoring and high-availability validation remain release gates."
    ]}
  />;
}
