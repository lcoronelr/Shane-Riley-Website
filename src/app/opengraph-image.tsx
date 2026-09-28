import { ImageResponse } from "next/og";

import { site } from "@/content/site";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social sharing card, generated at build time from site.ts. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#17191c",
          color: "#f7f6f2",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", width: 48, height: 2, background: "#325df4" }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 124, lineHeight: 1, letterSpacing: -4 }}>{site.name}</div>
          <div style={{ marginTop: 28, fontSize: 36, lineHeight: 1.3, color: "#c9cdd2", maxWidth: 900 }}>
            {site.tagline}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
