import { projectSocialImage } from "@/app/components/project-social-image";

export const alt = "Secure Enterprise Network — ENTERPRISE NETWORK DESIGN | Baba Ahmed El Bekay";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return projectSocialImage("Secure Enterprise Network", "ENTERPRISE NETWORK DESIGN", "A network design exercise covering VLANs, VLSM, OSPF, ACLs, HSRP and essential network services.");
}
