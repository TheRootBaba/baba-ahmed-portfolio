import { projectSocialImage } from "@/app/components/project-social-image";

export const alt = "CloudShield — CLOUD SECURITY COMMAND CENTER | Baba Ahmed El Bekay";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return projectSocialImage("CloudShield", "CLOUD SECURITY COMMAND CENTER", "An evidence-led local-first AWS and Azure security lab with explainable detections, investigation and governed response.");
}
