import { projectSocialImage } from "@/app/components/project-social-image";

export const alt = "AegisSOC — SECURITY OPERATIONS PLATFORM | Baba Ahmed El Bekay";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return projectSocialImage("AegisSOC", "SECURITY OPERATIONS PLATFORM", "A local-first SOC platform for telemetry, alert investigation, threat intelligence and governed response.");
}
