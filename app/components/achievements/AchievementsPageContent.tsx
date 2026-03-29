"use client";

import { motion } from "framer-motion";
import { Award, Github, Trophy } from "lucide-react";
import ElectricBorder from "@/app/components/ElectricBorder";
import AutoScrollFade from "@/app/components/AutoScrollFade";

const heroTitleClass =
  "font-black tracking-[-0.06em] text-white leading-[1.05]";

const ACHIEVEMENTS = [
  {
    id: "hackerrank",
    icon: Award,
    title: "HackerRank Intermediate",
    body: "Verified Problem Solving (Intermediate) with 3-Star Badge in C++, Java, and Python.",
    glow: true,
  },
  {
    id: "github",
    icon: Github,
    title: "GitHub Starstruck",
    body: "Data-Analysis repository garnered 20+ stars and 8 forks.",
    glow: true,
  },
  {
    id: "leetcode",
    icon: Trophy,
    title: "LeetCode Milestones",
    body: "Solved 150+ Data Structures & Algorithms (DSA) problems focusing on efficiency and optimization.",
    glow: false,
  },
] as const;

const CERTIFICATES = [
  {
    title: "Data Visualisation: Empowering Business with Effective Insights",
    issuer: "Tata Group × Forage",
    date: "Sep 30, 2025",
    type: "Certificate of Completion",
    image: "/credentials/tata.jpeg",
    accent: "#4a90d9",
  },
  {
    title: "Data Analytics & Industry Tools",
    issuer: "W3Grads × Angaar Batch",
    date: "Jun 2025 – Jul 2025",
    type: "Certificate of Completion",
    image: "/credentials/w3grads.jpeg",
    accent: "#e07b39",
  },
  {
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte Australia × Forage",
    date: "Jun 5, 2025",
    type: "Certificate of Completion",
    image: "/credentials/deloitte.jpeg",
    accent: "#86bc25",
  },
  {
    title: "Generative AI — Nasscom",
    issuer: "Nasscom × SFJ",
    date: "21 Feb 2026",
    type: "Certificate of Completion",
    image: "/credentials/nasscom.jpeg",
    accent: "#f5c518",
  },
  {
    title: "Data Science & Analytics",
    issuer: "HP LIFE Foundation",
    date: "12 Nov 2025",
    type: "Certificate of Completion",
    image: "/credentials/hplife.jpeg",
    accent: "#0096d6",
  },
  {
    title: "Financial Inclusion & Education to All",
    issuer: "Gramin Sewa Ashram",
    date: "Jun 2024 – Jul 2024",
    type: "Certificate of Internship",
    image: "/credentials/gramin.jpeg",
    accent: "#c9a96e",
  },
];

function CertificateCard({
  cert,
  index,
}: {
  cert: (typeof CERTIFICATES)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.1 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -18,
        scale: 1.025,
        transition: { type: "spring", stiffness: 280, damping: 20 },
      }}
      className="group relative flex flex-col rounded-xl overflow-hidden cursor-pointer"
      style={{
        boxShadow: "0 4px 32px rgba(0,0,0,0.55)",
      }}
    >
      {/* Glow on hover */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={{
          background: `linear-gradient(135deg, ${cert.accent}33 0%, transparent 60%)`,
          boxShadow: `0 0 40px 8px ${cert.accent}44`,
        }}
      />

      {/* Certificate image — full face */}
      <div className="relative w-full bg-white" style={{ aspectRatio: "auto" }}>
        <img
          src={cert.image}
          alt={cert.title}
          className="w-full h-auto object-contain"
          style={{ display: "block" }}
        />
        {/* Subtle dark vignette at bottom of image for badge readability */}
        <div
          className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Badge bar */}
      <div
        className="relative z-10 flex items-center justify-between px-3 py-2"
        style={{ background: "#0e0e0e", borderTop: `2px solid ${cert.accent}` }}
      >
        {/* Type pill */}
        <span
          className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
          style={{
            background: `${cert.accent}22`,
            color: cert.accent,
            border: `1px solid ${cert.accent}55`,
          }}
        >
          {cert.type}
        </span>

        {/* Issuer + date */}
        <div className="text-right ml-2 min-w-0">
          <p className="text-[10px] font-semibold text-white/80 truncate">{cert.issuer}</p>
          <p className="text-[9px] text-white/35 mt-0.5">{cert.date}</p>
        </div>
      </div>

      {/* Title strip */}
      <div
        className="px-3 pt-2 pb-3"
        style={{ background: "#0e0e0e" }}
      >
        <p className="text-[12px] font-bold text-white leading-snug line-clamp-2">
          {cert.title}
        </p>
      </div>
    </motion.div>
  );
}

export default function AchievementsPageContent() {
  return (
    <div className="relative z-10 w-full min-h-screen bg-[#000000] text-white pb-36 md:pb-44">
      {/* ── Achievements ── */}
      <section className="relative px-4 pt-28 pb-12 md:pt-32 md:pb-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-center font-mono text-xs tracking-[0.45em] text-white/45 md:text-sm">
            RECOGNITION
          </p>
          <h1
            className={`text-center ${heroTitleClass}`}
            style={{ fontSize: "clamp(2.25rem, 8vw, 5.5rem)" }}
          >
            ACHIEVEMENTS
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-center text-base text-white/50 md:text-lg">
            Competitive programming, open source, and the milestones that shaped how I build.
          </p>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {ACHIEVEMENTS.map((item, i) => {
              const Icon = item.icon;
              return (
                <AutoScrollFade key={item.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{
                      y: -14,
                      transition: { type: "spring", stiffness: 320, damping: 22 },
                    }}
                    className="relative"
                  >
                  {item.glow && (
                    <div
                      className="pointer-events-none absolute -inset-1 rounded-[1.35rem] opacity-70 blur-3xl"
                      style={{
                        background:
                          "radial-gradient(ellipse at 50% 40%, rgba(194, 164, 255, 0.45) 0%, transparent 62%)",
                      }}
                      aria-hidden
                    />
                  )}
                  <ElectricBorder
                    color="#FFFF8A"
                    speed={1.7}
                    chaos={0.13}
                    borderRadius={24}
                    style={{ borderRadius: 24 }}
                  >
                    <div
                      className={`relative flex h-full flex-col rounded-3xl border border-white/12 bg-gradient-to-b from-zinc-900/95 to-black/90 p-8 shadow-[0_28px_80px_rgba(0,0,0,0.55)] backdrop-blur-sm ${
                        item.glow ? "ring-1 ring-[#c2a4ff]/25" : ""
                      }`}
                    >
                      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-[#A5D8F2]">
                        <Icon size={24} strokeWidth={2} />
                      </div>
                      <h2
                        className={`${heroTitleClass} mb-4`}
                        style={{ fontSize: "clamp(1.35rem, 3.2vw, 2rem)" }}
                      >
                        {item.title}
                      </h2>
                      <p className="text-[15px] leading-relaxed text-white/65 md:text-base">
                        {item.body}
                      </p>
                    </div>
                  </ElectricBorder>
                </motion.div>
                </AutoScrollFade>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Credentials ── */}
      <section className="relative px-4 pb-8 md:pb-12">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-center font-mono text-xs tracking-[0.35em] text-white/45 md:text-sm">
            CERTIFICATE GRID
          </p>
          <h2
            className={`text-center ${heroTitleClass}`}
            style={{ fontSize: "clamp(2.25rem, 8vw, 5.5rem)" }}
          >
            CREDENTIALS
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm text-white/45 md:text-base">
            Job simulations and accredited programs — document-style previews with verified labels.
          </p>

          {/* Certificate grid — translucent boxes layout: 1 full, 2 half, 1 full, 2 half */}
          <div className="mt-12 flex justify-center">
            <div className="grid gap-4 grid-cols-2 max-w-2xl w-full">
              {CERTIFICATES.map((cert, i) => {
                // Pattern: 0=col-span-2, 1-2=col-span-1, 3=col-span-2, 4-5=col-span-1
                const isFullWidth = i === 0 || i === 3;
                return (
                  <AutoScrollFade key={cert.image} className={`${isFullWidth ? "col-span-2" : "col-span-1"} bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/8 transition-colors`}>
                    <CertificateCard cert={cert} index={i} />
                  </AutoScrollFade>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
