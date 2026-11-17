type Props = { slug: string; title: string };

const diagrams: Record<string, { eyebrow: string; caption: string; nodes: { title: string; detail: string }[] }> = {
  aegissoc: { eyebrow: "TELEMETRY → GOVERNED RESPONSE", caption: "An auditable path from source events to approval-controlled delivery.", nodes: [{title:"Sources",detail:"Wazuh · producers"},{title:"Ingestion",detail:"Normalize · replay guard"},{title:"Detection",detail:"Rules · Sigma subset"},{title:"Investigation",detail:"Cases · IOC context"},{title:"Response",detail:"Approval · signed hook"}] },
  "netsec-agent": { eyebrow: "AUTHORIZED ASSESSMENT FLOW", caption: "Nmap remains the evidence source; AI assistance explains findings for review.", nodes: [{title:"Scope",detail:"Private IPv4 range"},{title:"Discovery",detail:"Nmap · TCP services"},{title:"Findings",detail:"Hosts · ports · facts"},{title:"Explanation",detail:"Agent-assisted context"},{title:"Review",detail:"Human interpretation"}] },
  "netops-sentinel": { eyebrow: "INVENTORY → REACHABILITY → EVIDENCE", caption: "A read-only validation loop for a documented GNS3 / FRRouting topology.", nodes: [{title:"Topology",detail:"Routers · switches"},{title:"Inventory",detail:"JSON expected state"},{title:"Validation",detail:"Devices · networks"},{title:"Probes",detail:"ICMP reachability"},{title:"Evidence",detail:"Structured JSON"}] },
  "secure-enterprise-network": { eyebrow: "SEGMENTATION → ROUTING → POLICY", caption: "A design view of segmented enterprise connectivity and its control points.", nodes: [{title:"VLAN zones",detail:"Users · servers · mgmt"},{title:"VLSM plan",detail:"Subnet allocation"},{title:"OSPF core",detail:"Dynamic routing"},{title:"ACL policy",detail:"Traffic boundaries"},{title:"Resilience",detail:"HSRP · services"}] },
  nexuscloud: { eyebrow: "SERVICES → OBSERVABILITY → ALERTS", caption: "A local infrastructure lab with monitoring and a separately modelled WireGuard path.", nodes: [{title:"Containers",detail:"Docker services"},{title:"Metrics",detail:"Prometheus"},{title:"Dashboards",detail:"Grafana"},{title:"Alert tests",detail:"Rules · signals"},{title:"Routing lab",detail:"WireGuard · Linux"}] }
};

export default function ProjectVisual({ slug, title }: Props) {
  const diagram = diagrams[slug] ?? diagrams.aegissoc;
  const positions = [42, 232, 422, 612, 802];
  return (
    <figure className="project-visual">
      <div className="project-visual-head"><span>{diagram.eyebrow}</span><span>ENGINEERING MAP / {slug.toUpperCase()}</span></div>
      <svg viewBox="0 0 960 190" role="img" aria-labelledby={slug + "-visual-title " + slug + "-visual-desc"}>
        <title id={slug + "-visual-title"}>{title} system overview</title>
        <desc id={slug + "-visual-desc"}>{diagram.nodes.map(node => node.title + ": " + node.detail).join("; ")}</desc>
        {positions.slice(0, 4).map((x, index) => <g key={"link-" + index}><path className="visual-link" d={"M " + (x + 146) + " 91 H " + (positions[index + 1] - 10)} /><circle className="visual-pulse" cx={x + 171} cy="91" r="2.5" /></g>)}
        {diagram.nodes.map((node, index) => <g key={node.title} transform={"translate(" + positions[index] + " 48)"}>
          <rect className={index === 2 ? "visual-node visual-node-accent" : "visual-node"} width="146" height="86" rx="7" />
          <text className="visual-index" x="13" y="19">0{index + 1} / NODE</text>
          <circle cx="129" cy="15" r="3" fill={index === 2 ? "#287a58" : "#a8b9ac"} />
          <text className="visual-node-title" x="13" y="47">{node.title}</text>
          <text className="visual-node-sub" x="13" y="66">{node.detail}</text>
        </g>)}
        <path d="M42 155 H948" stroke="#e2ebe4" strokeWidth="1" />
        <text x="42" y="173" className="visual-node-sub">INPUT</text>
        <text x="948" y="173" textAnchor="end" className="visual-node-sub">OUTPUT / REVIEW</text>
      </svg>
      <ol className="project-visual-mobile">{diagram.nodes.map((node, index) => <li key={node.title}><span>0{index + 1}</span><b>{node.title}</b><small>{node.detail}</small></li>)}</ol>
      <figcaption><span>{diagram.caption}</span><strong>DOCUMENTED FLOW · NOT LIVE TELEMETRY</strong></figcaption>
    </figure>
  );
}
