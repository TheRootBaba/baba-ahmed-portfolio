import { projectSocialImage } from "@/app/components/project-social-image";

export const alt = "NexusCloud — INFRASTRUCTURE & OBSERVABILITY LAB | Baba Ahmed El Bekay";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return projectSocialImage("NexusCloud", "INFRASTRUCTURE & OBSERVABILITY LAB", "A local-first lab combining Docker services, Prometheus and Grafana monitoring, alert testing and a WireGuard routing simulation.");
}
