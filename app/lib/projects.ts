export type ProjectMeta = {
  slug: string; n: string; name: string; cat: string; blurb: string; stack: string[];
  cover: string; coverAlt: string; art?: boolean; host: string; flag?: boolean;
};

export const PROJECTS: ProjectMeta[] = [
  { slug: "aegissoc", n: "01", name: "AegisSOC", cat: "Security Operations Platform", blurb: "A local-first SOC platform for collecting security telemetry, investigating alerts, enriching indicators and governing response actions.", stack: ["Python", "FastAPI", "PostgreSQL", "Docker", "Wazuh"], cover: "/assets/projects/aegissoc/overview.png", coverAlt: "AegisSOC dashboard overview", host: "aegissoc.local / overview", flag: true },
  { slug: "netsec-agent", n: "02", name: "NetSec Agent", cat: "Network Security Tool", blurb: "A Python tool for authorized network assessments. It uses Nmap for discovery and generates explanations of scan results.", stack: ["Python", "Nmap", "Streamlit", "LangGraph", "MCP"], cover: "/assets/netsec-agent.svg", coverAlt: "NetSec Agent Nmap scan illustration", art: true, host: "netsec-agent / session" },
  { slug: "netops-sentinel", n: "03", name: "NetOps Sentinel", cat: "Network Operations Lab", blurb: "A repeatable GNS3 lab that validates device inventories, checks endpoint reachability and records structured JSON evidence.", stack: ["Python", "GNS3", "FRRouting", "JSON", "unittest"], cover: "/assets/projects/netops-sentinel/topology.png", coverAlt: "GNS3 topology with three routers and five LANs", host: "gns3 / topology" },
  { slug: "secure-enterprise-network", n: "04", name: "Secure Enterprise Network", cat: "Enterprise Network Design", blurb: "An enterprise network design exercise covering VLAN segmentation, VLSM addressing, routing, redundancy and access control.", stack: ["VLANs", "VLSM", "OSPF", "ACLs", "HSRP", "NAT"], cover: "/assets/enterprise-network.svg", coverAlt: "Enterprise network design diagram", art: true, host: "enterprise-network / design" },
  { slug: "nexuscloud", n: "05", name: "NexusCloud", cat: "Infrastructure & Observability Lab", blurb: "A local-first infrastructure lab combining isolated Docker services, Prometheus/Grafana monitoring, alert testing and a WireGuard site-to-site routing simulation.", stack: ["Docker Compose", "Prometheus", "Grafana", "WireGuard", "Linux"], cover: "/assets/projects/nexuscloud/2026-11-13_08-grafana-dashboard.png", coverAlt: "NexusCloud Grafana dashboard", host: "grafana / nexuscloud" },
];

export const bySlug = (slug: string) => PROJECTS.findIndex(p => p.slug === slug);
