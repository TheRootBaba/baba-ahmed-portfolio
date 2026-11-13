import { ImageResponse } from "next/og";

export function projectSocialImage(title: string, category: string, summary: string) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", background: "#ffffff", color: "#17211b", fontFamily: "Arial, sans-serif", border: "18px solid #f0f5f1" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 52, height: 52, border: "1px solid #dfe8e1", borderRadius: 8, color: "#287a58", fontSize: 23, fontWeight: 700 }}>BA.</div>
            <div style={{ display: "flex", flexDirection: "column", fontSize: 13, letterSpacing: 2, color: "#58665d" }}>ENGINEERING CASE STUDY<span style={{ marginTop: 5, fontSize: 10, letterSpacing: 1, color: "#89958d" }}>BABA AHMED EL BEKAY</span></div>
          </div>
          <span style={{ color: "#287a58", fontSize: 12, letterSpacing: 2 }}>PROJECT / 2026</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 18, color: "#287a58", letterSpacing: 3 }}>{category.toUpperCase()}</div>
          <div style={{ fontSize: 66, lineHeight: 1.02, fontWeight: 700, letterSpacing: -3 }}>{title}<span style={{ color: "#287a58" }}>.</span></div>
          <div style={{ maxWidth: 920, fontSize: 23, lineHeight: 1.45, color: "#58665d" }}>{summary}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #dfe6df", paddingTop: 20, color: "#58665d", fontSize: 15 }}>
          <span>NETWORK SECURITY · CLOUD · AUTOMATION</span><span>baba-ahmed-portfolio.vercel.app</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
