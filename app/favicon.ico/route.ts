import { ImageResponse } from "next/og";
import React from "react";

export const runtime = "edge";

export async function GET() {
  // Serve a simple brand mark for /favicon.ico to avoid stale defaults.
  const res = new ImageResponse(
    React.createElement(
      "div",
      {
        style: {
          width: "32px",
          height: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            width: 28,
            height: 28,
            borderRadius: 999,
            border: "2px solid #0a0a0a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            fontWeight: 700,
            color: "#0a0a0a",
            lineHeight: 1,
          },
        },
        "Q"
      )
    ),
    { width: 32, height: 32 }
  );

  // Many browsers accept PNG at /favicon.ico; set ico-ish content-type for compatibility.
  return new Response(res.body, {
    headers: {
      "content-type": "image/x-icon",
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
}

