import { ImageResponse } from "next/og";
import { clinic } from "@/data/clinic";

export const ogSize = { width: 1200, height: 630 };

export function renderOgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 90px", background: "#f3f5f2", color: "#16302b" }}>
        <div style={{ width: 84, height: 84, borderRadius: 42, background: "#1d5a4e", display: "flex" }} />
        <div style={{ fontSize: 80, letterSpacing: -2, marginTop: 40, maxWidth: 960 }}>{clinic.name}</div>
        <div style={{ fontSize: 34, color: "#1d5a4e", marginTop: 18, maxWidth: 960 }}>{clinic.tagline}</div>
        <div style={{ width: 120, height: 4, background: "#1d5a4e", marginTop: 40 }} />
        <div style={{ fontSize: 28, color: "#4c5f5a", marginTop: 34 }}>{`${clinic.address.line1}, ${clinic.address.line2}, ${clinic.address.city}`}</div>
        <div style={{ fontSize: 26, color: "#4c5f5a", marginTop: 12 }}>{`${clinic.hours.displayShort}, ${clinic.hours.displayTime}  ·  ${clinic.phone.display}`}</div>
      </div>
    ),
    ogSize,
  );
}
