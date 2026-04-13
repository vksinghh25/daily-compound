import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "linear-gradient(160deg, #0d3a1e 0%, #1a6b3a 50%, #0d4a2a 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        {/* Logo */}
        <div style={{ fontSize: 80, marginBottom: 28 }}>🗓️</div>

        {/* Title */}
        <div
          style={{
            fontSize: 68,
            fontWeight: 800,
            color: "white",
            marginBottom: 16,
            letterSpacing: "-1px",
          }}
        >
          Daily Compounding
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 30,
            color: "#6ee7b7",
            marginBottom: 44,
            letterSpacing: "0.5px",
          }}
        >
          Learn investing — 30 days at a time
        </div>

        {/* Divider */}
        <div
          style={{
            width: 60,
            height: 3,
            backgroundColor: "rgba(255,255,255,0.2)",
            marginBottom: 44,
          }}
        />

        {/* Description */}
        <div
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.6)",
            maxWidth: 680,
            textAlign: "center",
            lineHeight: 1.7,
          }}
        >
          A free 30-day course built for India. Compounding, mutual funds, stocks, and tax — in 10 minutes a day.
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
