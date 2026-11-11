import type { Metadata } from "next";
import Portfolio from "@/app/components/portfolio";

export const metadata: Metadata = {
  alternates: { canonical: "/" }
};

export default function Home() {
  return <Portfolio />;
}
