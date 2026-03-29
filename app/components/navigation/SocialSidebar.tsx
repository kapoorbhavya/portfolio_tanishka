"use client";

import Link from "next/link";
import { Github, Mail, Linkedin, ChevronUp } from "lucide-react";

const boxStyle: React.CSSProperties = {
  width: 56,
  height: 56,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 10,
  backgroundColor: "#a5d8ff",
  boxShadow: "0 4px 15px rgba(165,216,255,0.35)",
  transition: "all 0.3s ease",
  flexShrink: 0,
};

export default function SocialSidebar() {
  return (
    <nav style={{ position: "fixed", left: 28, bottom: "7%", zIndex: 50, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>

      <Link href="https://github.com/Tanishka-Rana-1" target="_blank" rel="noreferrer" aria-label="GitHub" style={boxStyle}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#8cc8ff")}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#a5d8ff")}>
        <Github size={28} fill="#001a33" color="#001a33" strokeWidth={0} />
      </Link>

      <Link href="mailto:ranatanishka2005@gmail.com" aria-label="Email" style={boxStyle}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#8cc8ff")}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#a5d8ff")}>
        <Mail size={28} fill="#001a33" color="#001a33" strokeWidth={0} />
      </Link>

      <Link href="https://www.linkedin.com/in/tanishka-rana2005/" target="_blank" rel="noreferrer" aria-label="LinkedIn" style={boxStyle}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#8cc8ff")}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#a5d8ff")}>
        <Linkedin size={28} fill="#001a33" color="#001a33" strokeWidth={0} />
      </Link>

      <Link href="https://www.upwork.com" target="_blank" rel="noreferrer" aria-label="Upwork" style={boxStyle}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#8cc8ff")}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#a5d8ff")}>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#001a33", userSelect: "none" }}>up</span>
      </Link>

      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div style={{ width: 1, height: 80, backgroundColor: "rgba(165,216,255,0.4)" }} />
        <ChevronUp size={18} fill="#a5d8ff" color="#a5d8ff" strokeWidth={0} />
      </div>
    </nav>
  );
}