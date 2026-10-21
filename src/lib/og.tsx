import { ImageResponse } from "next/og";
import { clinic } from "@/data/clinic";

export const ogSize = { width: 1200, height: 630 };

export function renderOgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 90px", background: "#ffffff", color: "#1c1c20" }}>
        <div style={{ fontSize: 26, letterSpacing: 6, color: "#c9342a", fontWeight: 700 }}>DENTISTRY GOES DIGITAL</div>
        <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: -2, marginTop: 24, maxWidth: 950 }}>Comprehensive Dental &amp; Implant Centre</div>
        <div style={{ width: 120, height: 5, background: "#c9342a", marginTop: 34 }} />
        <div style={{ fontSize: 30, color: "#55555e", marginTop: 34 }}>Cornwell Road, Langford Garden, Richmond Circle, Bangalore</div>
        <div style={{ fontSize: 26, color: "#55555e", marginTop: 14 }}>{`${clinic.hours.displayShort} · ${clinic.hours.displayTime} · ${clinic.phone.display}`}</div>
      </div>
    ),
    ogSize,
  );
}
