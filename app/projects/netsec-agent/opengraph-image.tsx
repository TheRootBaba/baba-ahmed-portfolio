import { projectSocialImage } from "@/app/components/project-social-image";

export const alt = "NetSec Agent — AI-ASSISTED NETWORK SECURITY | Baba Ahmed El Bekay";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return projectSocialImage("NetSec Agent", "AI-ASSISTED NETWORK SECURITY", "A scoped Python network assessment assistant using Nmap, Streamlit and AI-assisted explanations.");
}
