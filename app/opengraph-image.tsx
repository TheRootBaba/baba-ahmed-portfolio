import { ImageResponse } from "next/og";

export const alt = "Baba Ahmed El Bekay — Network Security, Cybersecurity and Cloud Infrastructure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", background: "#ffffff", color: "#17211b", fontFamily: "Arial, sans-serif", border: "18px solid #f0f5f1" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 58, height: 58, border: "1px solid #dfe8e1", borderRadius: 8, color: "#287a58", fontSize: 25, fontWeight: 700 }}>BA.</div>
            <div style={{ display: "flex", flexDirection: "column", fontSize: 14, letterSpacing: 3, color: "#58665d" }}>PORTFOLIO <span style={{ marginTop: 6, fontSize: 10, letterSpacing: 2, color: "#89958d" }}>ENGINEERING / 2026</span></div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#287a58" }}><span style={{ width: 9, height: 9, borderRadius: 20, background: "#287a58" }} /> OPEN TO OPPORTUNITIES</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", alignItems: "baseline", fontSize: 62, lineHeight: 1.04, fontWeight: 700, letterSpacing: -3 }}>Baba Ahmed <span style={{ color: "#287a58" }}>El Bekay.</span></div>
          <div style={{ fontSize: 25, color: "#58665d" }}>Network Security · Cybersecurity · Cloud Infrastructure</div>
          <div style={{ width: 90, height: 4, background: "#287a58", marginTop: 12 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #dfe6df", paddingTop: 22, color: "#58665d", fontSize: 16 }}>
          <span>Nouakchott, Mauritania</span>
          <span>baba-ahmed-portfolio.vercel.app</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
