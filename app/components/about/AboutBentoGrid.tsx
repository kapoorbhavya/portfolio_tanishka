"use client";

import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { ParticleCard } from "@/app/components/MagicBento";
import { useState } from "react";
import Stack from "@/app/components/Stack";

/** Card matching Image 1: dark navy surface, subtle border, no glow */
function BentoCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[1.4rem] border border-white/[0.07] transition-all duration-300 h-full ${className}`}
      style={{
        background: "rgba(13, 17, 38, 0.25)",
        backdropFilter: "blur(4px)",
      }}
    >
      {children}
    </div>
  );
}

function BentoInner({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col p-5 md:p-6 ${className}`}>{children}</div>
  );
}

/** Wraps a card with ParticleCard bento effect */
function MagicCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <ParticleCard
      className={`magic-bento-card magic-bento-card--border-glow h-full ${className}`}
      glowColor="165, 216, 242"
      particleCount={12}
      enableTilt={true}
      clickEffect={true}
      enableMagnetism={false}
      style={{ borderRadius: "1.4rem" }}
    >
      <BentoCard className="border-0 bg-transparent">
        {children}
      </BentoCard>
    </ParticleCard>
  );
}

const sectionLabel =
  "text-[12px] font-black uppercase tracking-[0.25em] !text-[#ffffff] mb-3";

const pill =
  "inline-flex items-center rounded-full border border-white/[0.10] bg-white/[0.05] px-3 py-1.5 text-[12px] md:text-[14px] text-[#a0b4c8]";

const EXPERTISE_BLOCKS: { title: string; tags: string[] }[] = [
  {
    title: "Data Engineering",
    tags: ["Python", "SQL", "PostgreSQL", "ETL Pipelines", "Open-Meteo API"],
  },
  {
    title: "Analytics & BI",
    tags: ["Power BI", "DAX", "Excel", "Data Visualization"],
  },
  {
    title: "Machine Learning",
    tags: ["NumPy", "Pandas", "Scikit-Learn", "Regression", "Classification"],
  },
  {
    title: "Software Engineering",
    tags: ["Java (Core)", "DSA", "System Design", "Scalable Systems"],
  },
  {
    title: "Backend & Systems",
    tags: ["Core Java", "Digital Banking", "Low-latency Systems", "Architecture"],
  },
  {
    title: "Pipelines & Scale",
    tags: ["Real-time ETL", "300+ Cities", "LinkedIn Data", "Predictive ML"],
  },
];

function UpworkMark() {
  return (
    <span className="font-bold text-[12px] leading-none tracking-tight" aria-hidden>
      up
    </span>
  );
}

export default function AboutBentoGrid() {
  const [activeBlock, setActiveBlock] = useState<number | null>(null);
  const [showGridView, setShowGridView] = useState(false);

  const SKILL_LEVELS: Record<string, { skill: string; percent: number }[]> = {
    "Data Engineering": [
      { skill: "Python", percent: 98 },
      { skill: "SQL", percent: 92 },
      { skill: "PostgreSQL", percent: 85},
      { skill: "ETL Pipelines", percent: 97 },
      { skill: "Open-Meteo API", percent: 100 },
    ],
    "Analytics & BI": [
      { skill: "Power BI", percent: 95 },
      { skill: "DAX", percent: 98 },
      { skill: "Excel", percent: 95 },
      { skill: "Data Visualization", percent: 92 },
    ],
    "Machine Learning": [
      { skill: "NumPy", percent: 100 },
      { skill: "Pandas", percent: 100 },
      { skill: "Scikit-Learn", percent: 90 },
      { skill: "Regression", percent: 88 },
      { skill: "Classification", percent: 89 },
    ],
    "Software Engineering": [
      { skill: "Java (Core)", percent: 92 },
      { skill: "DSA", percent: 85 },
      { skill: "System Design", percent: 75 },
      { skill: "Scalable Systems", percent: 68 },
    ],
    "Backend & Systems": [
      { skill: "Core Java", percent: 82 },
      { skill: "Digital Banking", percent: 88 },
      { skill: "Low-latency Systems", percent: 82 },
      { skill: "Architecture", percent: 70 },
    ],
    "Pipelines & Scale": [
      { skill: "Real-time ETL", percent: 85 },
      { skill: "300+ Cities", percent: 98 },
      { skill: "LinkedIn Data", percent: 98 },
      { skill: "Predictive ML", percent: 90 },
    ],
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-3 md:gap-4 w-full max-w-[1150px] mx-auto px-3 sm:px-5 md:px-6 pt-10 md:pt-14 pb-40">

        {/* Row 1: Profile + Self Summary */}
        <div className="col-span-12 md:col-span-5 flex flex-col">
          <MagicCard className="flex-1">
            <BentoInner className="overflow-hidden h-full justify-between">
              <div className="relative w-full aspect-square max-h-[200px] sm:max-h-[220px] overflow-hidden rounded-xl">
                <img
                  src="/profilepic.png"
                  alt="Tanishka Rana"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              </div>
              <p className={`${sectionLabel} mt-5 mb-0`}>About Me</p>
              <h1 className="mt-1 text-2xl md:text-3xl font-bold tracking-tight leading-tight" style={{ color: "#FFFFB8" }}>
                Tanishka Rana
              </h1>
              <p className="mt-2 text-[14px] text-[#cbd5e1] leading-relaxed">
                Data Engineer &amp; ML Engineer
              </p>
            </BentoInner>
          </MagicCard>
        </div>

        {/* Self Summary */}
        <div className="col-span-12 md:col-span-7 flex flex-col">
          <MagicCard className="flex-1">
            <BentoInner className="justify-between h-full">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="h-[6px] w-[6px] rounded-full bg-[#cbd5e1]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#cbd5e1]">
                    Self Summary
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-[1.6rem] font-bold text-white leading-snug tracking-tight">
                  Building intelligent data systems that are fast, scalable, and
                  built for real-world impact.
                </h2>
                <p className="mt-4 text-[14px] leading-relaxed text-[#cbd5e1]">
                  I specialize in transforming raw data into intelligence. From
                  building low-latency Digital Banking Systems using{" "}
                  <span className="font-semibold text-white">Core Java</span> and{" "}
                  <span className="font-semibold text-white">DSA</span> to
                  orchestrating real-time{" "}
                  <span className="font-semibold text-white">ETL</span> pipelines
                  for 300+ cities, I focus on high-performance architecture.
                </p>
              </div>
              <p className="mt-5 pt-4 border-t border-white/[0.07] text-[14px] md:text-[14px] text-[#cbd5e1] leading-relaxed">
                <span className="text-white/40 mr-1">→</span> Preprocessed 124,000+
                LinkedIn postings and shipped predictive ML models for production use.
              </p>
            </BentoInner>
          </MagicCard>
        </div>

        {/* Row 2: Experience + Education */}
        <div className="col-span-12 md:col-span-6 flex flex-col">
          <MagicCard className="flex-1">
            <BentoInner className="h-full">
              <p className={sectionLabel}>Experience (Training)</p>
              <div className="space-y-5">
                <div>
                  <p className="text-[14px] text-white mb-1">2025 — Present</p>
                  <p className="text-[15px] font-bold text-white">
                    Data Science &amp; Analysis
                  </p>
                  <p className="text-[14px] text-white mt-0.5" style={{ color: "white" }}>
                    Angaar Batch
                  </p>
                  <p className="mt-2 text-[14px] md:text-[15px] leading-relaxed text-[#cbd5e1]">
                    Preprocessed 124,000+ LinkedIn postings and implemented predictive ML
                    models.
                  </p>
                </div>
                <div>
                  <p className="text-[14px] text-white mb-1">Jun 2024 — Jul 2024</p>
                  <p className="text-[15px] font-bold text-white">
                    Internship — Financial Inclusion &amp; Education to All
                  </p>
                  <p className="text-[14px] text-white mt-0.5" style={{ color: "white" }}>
                    Gramin Sewa Ashram
                  </p>
                  <p className="mt-2 text-[14px] md:text-[15px] leading-relaxed text-[#cbd5e1]">
                    Completed 1 month and 32+ hours internship program focused on financial inclusion and education initiatives.
                  </p>
                </div>
              </div>
            </BentoInner>
          </MagicCard>
        </div>

        <div className="col-span-12 md:col-span-6 flex flex-col">
          <MagicCard className="flex-1">
            <BentoInner className="h-full">
              <p className={sectionLabel}>Education</p>
              <div className="space-y-5">
                <div>
                  <p className="text-[14px] text-white mb-1">2023 — Present</p>
                  <p className="text-[15px] font-bold text-white">
                    B.Tech — Computer Science and Engineering
                  </p>
                  <p className="text-[14px] text-white mt-0.5" style={{ color: "white" }}>
                    Lovely Professional University
                  </p>
                  <p className="mt-2 text-[14px] md:text-[15px] text-[#cbd5e1]">
                    CGPA: 8.32
                  </p>
                </div>
                <div>
                  <p className="text-[14px] text-white mb-1">Apr 2022 – Mar 2023</p>
                  <p className="text-[15px] font-bold text-white">
                    Higher Secondary Certificate (12th Grade)
                  </p>
                  <p className="text-[14px] text-white mt-0.5" style={{ color: "white" }}>
                    Mount Carmel School Palampur, Himachal Pradesh
                  </p>
                  <p className="mt-2 text-[14px] md:text-[15px] text-[#cbd5e1]">
                    Percentage: 77%
                  </p>
                </div>
                <div>
                  <p className="text-[14px] text-white mb-1">Apr 2020 – Mar 2021</p>
                  <p className="text-[15px] font-bold text-white">
                    Secondary School Certificate (10th Grade)
                  </p>
                  <p className="text-[14px] text-white mt-0.5" style={{ color: "white" }}>
                    Mount Carmel School Palampur, Himachal Pradesh
                  </p>
                  <p className="mt-2 text-[14px] md:text-[15px] text-[#cbd5e1]">
                    Percentage: 91%
                  </p>
                </div>
              </div>
            </BentoInner>
          </MagicCard>
        </div>

        {/* Row 3: Engineering Expertise — outer MagicCard, inner blocks plain (no ParticleCard) */}
        <div className="col-span-12">
          <MagicCard>
            <BentoInner className="gap-4">
              <div>
                <p className="text-[12px] font-black uppercase tracking-[0.25em] !text-[#ffffff] mb-1">
                  Stack
                </p>
                <h3 className="text-[14px] font-bold tracking-tight" style={{ color: '#60a5fa' }}>
                  Engineering Expertise
                </h3>
              </div>
              {/* Plain inner blocks — no bento effect inside */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {EXPERTISE_BLOCKS.map((block, index) => (
                  <div
                    key={index}
                    className="flex flex-col rounded-[1rem] p-4 border-2 border-[#470000]/60 transition-all duration-300 hover:border-[#470000] hover:shadow-[0_0_30px_rgba(71,0,0,0.8),0_10px_40px_rgba(71,0,0,0.6)] hover:-translate-y-3 hover:scale-105 relative group cursor-pointer"
                    style={{ 
                      background: "rgba(10, 13, 30, 0.25)",
                      boxShadow: "0 0 15px rgba(71, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                    }}
                    onClick={() => setActiveBlock(activeBlock === index ? null : index)}
                  >
                    {/* Glassy shine overlay */}
                    <div className="absolute top-0 left-0 right-0 h-px rounded-t-[1rem] bg-gradient-to-r from-transparent via-[#470000]/40 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <h4 className="text-[14px] font-semibold text-white mb-3 relative z-10">
                      {block.title}
                    </h4>
                    <div className="flex flex-wrap gap-1.5 relative z-10">
                      {block.tags.map((tag) => (
                        <span key={tag} className={pill}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </BentoInner>
          </MagicCard>
        </div>

        {/* Row 4: Profiles + Beyond */}
        <div className="col-span-12 md:col-span-6 flex flex-col">
          <MagicCard className="flex-1">
            <BentoInner className="h-full">
              <p className={sectionLabel}>Profiles</p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="https://github.com/Tanishka-Rana-1"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#cbd5e1] transition-all hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                  aria-label="GitHub"
                >
                  <Github size={18} strokeWidth={2} />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/tanishka-rana2005/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#cbd5e1] transition-all hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} strokeWidth={2} />
                </Link>
                <a
                  href="https://www.upwork.com/nx/search/talent/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#cbd5e1] transition-all hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                  aria-label="Upwork"
                >
                  <UpworkMark />
                </a>
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-[#cbd5e1]">
                Connect on GitHub, LinkedIn, or Upwork — always open to data and
                engineering collaborations.
              </p>
            </BentoInner>
          </MagicCard>
        </div>

        <div className="col-span-12 md:col-span-6 flex flex-col">
          <MagicCard className="flex-1">
            <BentoInner className="justify-center h-full">
              <p className={sectionLabel}>Beyond the Code</p>
              <p className="text-[14px] leading-relaxed text-[#cbd5e1]">
                Beyond tech, I&apos;m genuinely passionate about Indian defence, geopolitics, and current affairs. Staying informed and aware about the nation — is something I actively pursue.
              </p>
            </BentoInner>
          </MagicCard>
        </div>

        {/* Gallery Section */}
        <div className="col-span-12 mt-4">
          <div className="mb-4">
            <p className="text-[12px] font-black uppercase tracking-[0.25em] !text-[#ffffff] mb-1">Memories</p>
            <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">My Journey in Pictures</h3>
          </div>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <div style={{ height: '500px', maxWidth: '400px', width: '100%' }}>
              <Stack
                randomRotation={false}
                sensitivity={200}
                sendToBackOnClick={true}
                autoplay={false}
                cards={[
                  { image: '/gallery/gallery1.jpeg', label: 'School Batch' },
                  { image: '/gallery/gallery2.jpeg', label: 'On Stage' },
                  { image: '/gallery/gallery3.jpeg', label: 'Symposium' },
                  { image: '/gallery/gallery4.jpeg', label: 'College Fellows' },
                  { image: '/gallery/gallery5.jpeg', label: 'College Fellows' },
                  { image: '/gallery/gallery6.jpeg', label: 'Campus' },
                  { image: '/gallery/gallery7.jpeg', label: 'Campus' },
                  { image: '/gallery/gallery8.jpeg', label: '12th' },
                  { image: '/gallery/gallery9.jpeg', label: 'School' },
                  { image: '/gallery/gallery10.jpeg', label: 'School' },
                  { image: '/gallery/gallery11.jpeg', label: 'Hackathon' },
                  { image: '/gallery/gallery12.jpeg', label: 'Placement Class' },
                  { image: '/gallery/gallery13.jpeg', label: 'Placement Class' },
                ]}
              />
            </div>
          </div>
        </div>



      </div>

      {activeBlock !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setActiveBlock(null)}
        >
          <div
            className="relative w-full max-w-md mx-4 rounded-2xl border border-white/10 p-6"
            style={{ background: "rgba(13, 17, 38, 0.95)" }}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white/40 hover:text-white text-xl"
              onClick={() => setActiveBlock(null)}
            >
              ✕
            </button>
            <h3 className="text-lg font-bold text-white mb-5">
              {EXPERTISE_BLOCKS[activeBlock].title}
            </h3>
            <div className="space-y-4">
              {SKILL_LEVELS[EXPERTISE_BLOCKS[activeBlock].title]?.map((item, index) => {
                const colors = [
                  { from: "#FF1493", via: "#FF69B4", to: "#FF1493", glow: "rgba(255, 20, 147, 0.6)" },
                  { from: "#00FF00", via: "#00FF88", to: "#00FF00", glow: "rgba(0, 255, 0, 0.6)" },
                  { from: "#FFD700", via: "#FFFF00", to: "#FFD700", glow: "rgba(255, 215, 0, 0.6)" },
                  { from: "#00BFFF", via: "#87CEEB", to: "#00BFFF", glow: "rgba(0, 191, 255, 0.6)" },
                  { from: "#FF6347", via: "#FF7F50", to: "#FF6347", glow: "rgba(255, 99, 71, 0.6)" },
                ];
                const color = colors[index % colors.length];
                return (
                  <div key={item.skill}>
                    <div className="flex justify-between mb-1">
                      <span className="text-[13px] text-white">{item.skill}</span>
                      <span className="text-[13px] text-[#A5D8F2]">{item.percent}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/10">
                      <div
                        className="h-1.5 rounded-full bg-gradient-to-r skill-progress-bar shadow-lg"
                        style={{
                          backgroundImage: `linear-gradient(to right, ${color.from}, ${color.via}, ${color.to})`,
                          boxShadow: `0 0 12px ${color.glow}`,
                          "--progress-width": `${item.percent}%`,
                        } as React.CSSProperties}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
