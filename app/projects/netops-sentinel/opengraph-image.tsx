import { projectSocialImage } from "@/app/components/project-social-image";

export const alt = "NetOps Sentinel — NETWORK OPERATIONS LAB | Baba Ahmed El Bekay";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return projectSocialImage("NetOps Sentinel", "NETWORK OPERATIONS LAB", "A GNS3 lab for inventory validation, endpoint reachability checks and structured JSON evidence.");
}
