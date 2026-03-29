"use client";

import { useEffect } from "react";

export default function MouseSpotlight() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <>
      {/* ── Radial spotlight that follows the mouse ── */}
      <div
        className="spotlight-overlay"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9,
          background:
            "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(160, 100, 255, 0.07), transparent 75%)",
        }}
      />

      {/* ── Static nebula mesh — top-left purple blob ── */}
      <div
        style={{
          position: "fixed",
          top: "-10%",
          left: "-10%",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(120, 60, 220, 0.22) 0%, rgba(80, 20, 160, 0.12) 50%, transparent 75%)",
          filter: "blur(90px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── Static nebula mesh — bottom-right teal/cyan blob ── */}
      <div
        style={{
          position: "fixed",
          bottom: "-8%",
          right: "-8%",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0, 180, 200, 0.16) 0%, rgba(0, 120, 160, 0.08) 50%, transparent 75%)",
          filter: "blur(100px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── Static nebula mesh — centre-right faint magenta ── */}
      <div
        style={{
          position: "fixed",
          top: "35%",
          right: "5%",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(200, 50, 180, 0.10) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
    </>
  );
}
