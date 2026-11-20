import type { Metadata } from "next";
import ProjectDetail from "@/app/components/project-detail";
import { projectMetadata } from "@/app/lib/seo";

export const metadata:Metadata=projectMetadata({
  slug:"nexuscloud",
  title:"NexusCloud",
  description:"A local-first infrastructure engineering lab combining Docker service isolation, Prometheus and Grafana observability, alert testing and a separate WireGuard routing simulation."
});

export default function Page(){
  return <ProjectDetail
    slug="nexuscloud"
    number="05"
    category="INFRASTRUCTURE & OBSERVABILITY LAB"
    title="NexusCloud"
    summary="A local-first infrastructure engineering lab focused on service isolation, observability, controlled failure testing and secure site-to-site routing. The current implementation is a reproducible local lab, not a deployed hybrid-cloud environment."
    repository="https://github.com/TheRootBaba/nexuscloud-hybrid-infrastructure"
    stack={["Docker Compose","Nginx","Prometheus","Grafana","Blackbox Exporter","Node Exporter","WireGuard","Linux namespaces","PowerShell","Bash"]}
    problem="NexusCloud began as a hybrid-cloud design exercise connecting an on-premises virtual data center to Oracle Cloud Infrastructure. Practical account and local virtualization constraints made an end-to-end cloud deployment unreliable, so the scope was narrowed to a working local environment that can be started, inspected and tested repeatedly."
    architecture={[
      {name:"Isolated application sites",detail:"Two Nginx sites run as separate containers on independent Docker bridge networks."},
      {name:"Metrics and probing",detail:"Prometheus scrapes service and host metrics; Blackbox Exporter probes both sites for HTTP availability."},
      {name:"Dashboards and alert rules",detail:"Grafana is provisioned with a Prometheus data source and dashboard. Prometheus alert rules cover site availability and missing targets."},
      {name:"Host telemetry",detail:"Node Exporter exposes host metrics to the monitoring stack."},
      {name:"Independent VPN routing lab",detail:"Linux network namespaces model two site routers and two clients connected by WireGuard. This exercise is separate from the Docker application networks."}
    ]}
    milestones={[
      {phase:"01 · SCOPE",title:"Narrow the hybrid-cloud concept",detail:"Retained the infrastructure and networking learning goals while documenting that OCI provisioning and the broader enterprise design remain future work.",status:"Documented"},
      {phase:"02 · ISOLATION",title:"Build two independent service networks",detail:"Used Docker Compose to run two Nginx sites on separate bridge networks with local-only published ports and container health checks.",status:"Implemented"},
      {phase:"03 · OBSERVABILITY",title:"Collect metrics and probe availability",detail:"Connected Prometheus, Blackbox Exporter, Node Exporter and Grafana with provisioned dashboards and alert rules.",status:"Implemented"},
      {phase:"04 · FAILURE TESTING",title:"Exercise alert and recovery behavior",detail:"Added a controlled failure-injection workflow that stops a selected site, checks that its alert fires, restores the container and verifies recovery.",status:"Implemented"},
      {phase:"05 · SECURE ROUTING",title:"Simulate a site-to-site WireGuard tunnel",detail:"Created isolated Linux router and client namespaces with a WireGuard tunnel and tests for bidirectional client traffic and prefix restrictions.",status:"Implemented"}
    ]}
    decisions={[
      {choice:"Keep the current build local-first",rationale:"A reproducible local lab makes service boundaries and failure behavior inspectable without claiming an OCI environment that was not deployed."},
      {choice:"Separate the VPN exercise from Docker application traffic",rationale:"The WireGuard namespaces demonstrate routed site-to-site connectivity independently; the Docker application containers do not traverse the tunnel."},
      {choice:"Use controlled failures to verify alert recovery",rationale:"Stopping and restoring a test site checks both alert firing and recovery instead of relying only on a static dashboard screenshot."},
      {choice:"Keep credentials and private keys outside version control",rationale:"The Grafana password is supplied through a local .env file, while generated WireGuard keys and populated peer configurations are stored outside the repository."}
    ]}
    nextExperiment="Add a repeatable end-to-end test that verifies the Grafana dashboard provisioning, alert delivery path and WireGuard tunnel state from a clean environment. Keep OCI deployment as a separate future milestone with its own cost, identity and network-security review."
    approach={[
      "Runs two Nginx application sites on separate Docker bridge networks.",
      "Uses Prometheus and Blackbox Exporter to monitor HTTP availability and Node Exporter for host metrics.",
      "Provides Grafana dashboards and provisioned Prometheus alert rules.",
      "Tests controlled site outages, alert firing, service recovery and alert clearing.",
      "Models two site routers and two clients in Linux network namespaces connected by WireGuard.",
      "Uses PowerShell and Bash scripts plus GitHub Actions for repeatable validation."
    ]}
    validation={[
      {label:"Application isolation",result:"Configured",detail:"Two Nginx sites are attached to separate Docker bridge networks and publish only to localhost."},
      {label:"Monitoring targets",result:"4 expected targets",detail:"The README documents four expected Prometheus scrape targets as the monitoring baseline."},
      {label:"Alert lifecycle",result:"Failure & recovery",detail:"The documented test stops a site, waits for its alert, restores it and checks that the probe and alert recover."},
      {label:"VPN routing",result:"Bidirectional test",detail:"The WireGuard lab validates client-to-client traffic, tunnel handshake and allowed-prefix restrictions."},
      {label:"Automation",result:"GitHub Actions",detail:"The repository documents Compose checks, shell syntax checks, service smoke tests, Prometheus checks and Linux network/port validation."}
    ]}
    outcomes={[
      "A reproducible local infrastructure stack with service separation and centralized observability.",
      "A controlled way to demonstrate monitoring, alert firing and recovery.",
      "A separate WireGuard routing simulation with explicit network namespaces and prefix restrictions.",
      "Operational scripts, documentation and CI checks that make the lab easier to repeat."
    ]}
    boundaries={[
      "The current project is a local lab, not a deployed hybrid-cloud or production infrastructure environment.",
      "Oracle Cloud Infrastructure provisioning and the broader original enterprise architecture remain design goals, not implemented components.",
      "The Docker application containers do not send traffic through the WireGuard tunnel.",
      "Monitoring and alert tests demonstrate the documented lab configuration; they do not establish production-grade availability or security.",
      "The lab requires Windows with WSL2, Ubuntu and Docker Desktop for the documented workflow."
    ]}
    evidenceNotice="These are genuine screenshots and validation artifacts from the documented local lab run on November 13, 2026. They show the recorded test environment, not a live hosted service or current telemetry." 
    images={[
      {src:"/assets/projects/nexuscloud/2026-11-13_08-grafana-dashboard.png",alt:"NexusCloud Grafana overview showing both sites and monitoring targets",caption:"Grafana overview — both test sites reported UP in the recorded lab run"},
      {src:"/assets/projects/nexuscloud/2026-11-13_03-prometheus-targets.png",alt:"NexusCloud Prometheus targets page showing four targets",caption:"Prometheus targets — four expected scrape targets"},
      {src:"/assets/projects/nexuscloud/2026-11-13_07-prometheus-alert-firing.png",alt:"NexusCloud Prometheus alert firing during a controlled Site A outage",caption:"Controlled failure — Site A availability alert firing"},
      {src:"/assets/projects/nexuscloud/2026-11-13_11-wireguard-acceptance.png",alt:"NexusCloud WireGuard acceptance test showing bidirectional client traffic and denied prefix",caption:"WireGuard acceptance — bidirectional client test and denied unapproved prefix"},
      {src:"/assets/projects/nexuscloud/2026-11-13_09-docker-compose-health.png",alt:"NexusCloud Docker Compose health and validation output",caption:"Container health — services and local validation output"}
    ]}
    documentation={[
      {label:"Repository README & setup",href:"https://github.com/TheRootBaba/nexuscloud-hybrid-infrastructure#readme"},
      {label:"System architecture",href:"https://github.com/TheRootBaba/nexuscloud-hybrid-infrastructure/blob/main/docs/architecture.md"},
      {label:"Network design",href:"https://github.com/TheRootBaba/nexuscloud-hybrid-infrastructure/blob/main/docs/network-design.md"},
      {label:"Observability and alerting",href:"https://github.com/TheRootBaba/nexuscloud-hybrid-infrastructure/blob/main/docs/observability.md"},
      {label:"Verification matrix",href:"https://github.com/TheRootBaba/nexuscloud-hybrid-infrastructure/blob/main/docs/verification.md"},
      {label:"Engineering evidence register",href:"https://github.com/TheRootBaba/nexuscloud-hybrid-infrastructure/blob/main/evidence/README.md"}
    ]}
  />;
}
