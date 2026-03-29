"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import GlobalNavigation from "@/app/components/GlobalNavigation";
import Navbar from "@/app/components/Navbar";
import PortfolioHeroTitle from "./PortfolioHeroTitle";

/* ─── data ─── */
const GH = "https://github.com/Tanishka-Rana-1";

const PROJECTS = [
  {
    id: "weather",
    title: "Indian Weather Intelligence",
    description: "Built an end-to-end monitoring system processing 17+ parameters across 296+ cities using Python ETL pipelines and PostgreSQL.",
    tech: ["Open-Meteo API", "Python", "PostgreSQL", "DAX", "Power BI"],
    liveUrl: "https://drive.google.com/file/d/1FnmFPQq_Myd16KVVA6GPtlZHkb2aKEXG/view?usp=sharing",
    repoUrl: `${GH}/GlobalWeatherIntelligence`,
    image: "/projectimages/project1.jpg",
  },
  {
    id: "linkedin",
    title: "LinkedIn Job Market Analysis",
    description: "Normalized and analyzed 124,000+ LinkedIn postings to deliver granular experience–salary correlations and skill frequency analysis.",
    tech: ["Excel", "Python", "SQL", "Power BI"],
    liveUrl: "https://drive.google.com/file/d/16VXrdESDPttGQlCU_wkNSOUjKmhPofZF/view?usp=drive_link",
    repoUrl: `${GH}/LinkedinMarketIntelligence`,
    image: "/projectimages/project2.png",
  },
  {
    id: "banking",
    title: "Digital Banking System",
    description: "A high-performance backend banking system optimized for secure transaction handling using Core Java and advanced Data Structures.",
    tech: ["Java", "DSA", "MySQL", "System Design"],
    liveUrl: "https://drive.google.com/file/d/1I051yY-7_EGADo86iuJ4dOBzR4wbTsz5/view?usp=sharing",
    repoUrl: `${GH}/DigitalBankingSystem`,
    image: "/projectimages/project3.jpeg",
  },
  {
    id: "fraud",
    title: "Financial Fraud Detection",
    description: "Analyzed suspicious patterns in financial transaction data using advanced anomaly detection and Power BI dashboards.",
    tech: ["Power BI", "Python", "SQL", "Machine Learning"],
    liveUrl: "#",
    repoUrl: `${GH}/PowerBi_Fraud_Transactions`,
    image: "/projectimages/project4.jpeg",
  },
  {
    id: "election",
    title: "Election Insights 2024",
    description: "Comprehensive analysis of 2024 voting patterns and election trends using advanced data analysis techniques. Processed and visualized nationwide voting activity data to uncover key insights and demographic correlations.",
    tech: ["Python", "Pandas", "NumPy", "Data Visualization"],
    liveUrl: "#",
    repoUrl: `${GH}/Data-Analysis`,
    image: "/projectimages/project5.png",
  },
  {
    id: "titanic",
    title: "Titanic Survival Analysis",
    description: "Machine learning analysis to predict passenger survival on the Titanic. Built classification models and conducted feature importance analysis to understand survival patterns based on passenger demographics.",
    tech: ["Python", "Scikit-learn", "Pandas", "Machine Learning"],
    liveUrl: "#",
    repoUrl: `${GH}/TitanicSurvivalAnalysis`,
    image: "/projectimages/project6.png",
  },
  {
    id: "iris",
    title: "Iris Exploratory Data Analysis",
    description: "In-depth exploratory analysis of the Iris dataset. Performed statistical analysis, visualization, and clustering to understand flower specimen characteristics and classification patterns.",
    tech: ["Python", "NumPy", "Pandas", "Matplotlib", "Machine Learning"],
    liveUrl: "#",
    repoUrl: `${GH}/iris-exploratory-analysis`,
    image: "/projectimages/project7.png",
  },
];

const INITIAL_COUNT = 4;

const BLUE_55 = "rgba(165,216,242,0.70)";
const CARD_BG = "#0c0e1b";
const RIGHT_BG = "rgba(12,14,27,0.55)";
const PILL_BG = "rgba(165,216,242,0.08)";
const BTN_BG = "rgba(165,216,242,0.08)";

const cardStyle: React.CSSProperties = {
  background: CARD_BG,
  border: "none",
  outline: "1.5px solid rgba(165,216,242,0.75)",
  outlineOffset: "10px",
  borderRadius: "1rem",
};

/* ── converts any share URL → embeddable URL, returns null if not supported ── */
function toEmbedUrl(url: string): string | null {
  if (!url || url === "#") return null;

  // Google Drive: /file/d/FILE_ID/view  →  /file/d/FILE_ID/preview
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/?]+)/);
  if (driveMatch) {
    return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
  }

  // YouTube full: watch?v=ID
  const ytMatch = url.match(/youtube\.com\/watch\?v=([^&]+)/);
  if (ytMatch) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`;
  }

  // YouTube short: youtu.be/ID
  const ytShort = url.match(/youtu\.be\/([^?]+)/);
  if (ytShort) {
    return `https://www.youtube.com/embed/${ytShort[1]}?autoplay=1`;
  }

  return null;
}

export default function ProjectsPageContent() {
  const [visible, setVisible] = useState(INITIAL_COUNT);
  const [modalProject, setModalProject] = useState<string | null>(null);
  const shown = PROJECTS.slice(0, visible);
  const hasMore = visible < PROJECTS.length;

  const activeProject = PROJECTS.find((p) => p.id === modalProject);
  const embedUrl = activeProject ? toEmbedUrl(activeProject.liveUrl) : null;

  return (
    <div className="relative z-10 w-full min-h-screen text-white">
      <GlobalNavigation />
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative px-4 pt-28 pb-12 md:pt-32 md:pb-16 flex flex-col items-center text-center">
        <PortfolioHeroTitle />
        <p className="mt-8 max-w-2xl text-sm md:text-base leading-relaxed text-white/55">
          Modern data products delivered with production-ready architecture, SEO
          optimized for search engines, Integrated AI features, Ready to deploy,
          strong UX, and measurable performance outcomes.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">

          {/* 07 Projects — violet glass */}
          <div
            className="group relative rounded-2xl px-10 py-5 overflow-hidden cursor-default transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.03]"
            style={{
              background: "rgba(15,17,30,0.55)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: "1px solid rgba(165,180,252,0.18)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.border = "1px solid rgba(165,180,252,0.65)";
              el.style.boxShadow = "0 0 32px rgba(165,180,252,0.30), 0 0 70px rgba(165,180,252,0.10), 0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.10)";
              el.style.background = "rgba(20,18,45,0.70)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.border = "1px solid rgba(165,180,252,0.18)";
              el.style.boxShadow = "0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)";
              el.style.background = "rgba(15,17,30,0.55)";
            }}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-indigo-300/40 to-transparent" />
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(135deg, rgba(165,180,252,0.09) 0%, transparent 60%)" }}
            />
            <p className="relative text-3xl md:text-4xl font-bold tabular-nums transition-colors duration-300 group-hover:text-[#c7d2fe]" style={{ color: "#a5b4fc" }}>07</p>
            <p className="relative mt-1 text-[10px] uppercase tracking-[0.25em] text-white/45">Projects</p>
          </div>

          {/* 15 Technologies — amber/gold glass */}
          <div
            className="group relative rounded-2xl px-10 py-5 overflow-hidden cursor-default transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.03]"
            style={{
              background: "rgba(15,17,30,0.55)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: "1px solid rgba(251,191,36,0.18)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.border = "1px solid rgba(251,191,36,0.65)";
              el.style.boxShadow = "0 0 32px rgba(251,191,36,0.28), 0 0 70px rgba(251,191,36,0.08), 0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.10)";
              el.style.background = "rgba(25,20,10,0.70)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.border = "1px solid rgba(251,191,36,0.18)";
              el.style.boxShadow = "0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)";
              el.style.background = "rgba(15,17,30,0.55)";
            }}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.09) 0%, transparent 60%)" }}
            />
            <p className="relative text-3xl md:text-4xl font-bold tabular-nums transition-colors duration-300 group-hover:text-[#fde68a]" style={{ color: "#fbbf24" }}>15</p>
            <p className="relative mt-1 text-[10px] uppercase tracking-[0.25em] text-white/45">Technologies</p>
          </div>

        </div>
      </section>

      {/* ── Project grid ── */}
      <section className="relative px-4 pb-32">
        <div className="mx-auto max-w-5xl space-y-16">
          {shown.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className={`grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-14 items-stretch${i === 1 ? " mt-10" : ""}`}
            >
              {/* LEFT — screenshot */}
              <div
                className="group/img relative overflow-hidden flex items-stretch transition-all duration-300 ease-out hover:-translate-y-4 hover:scale-[1.06] cursor-pointer"
                style={cardStyle}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.outline = "2px solid rgba(165,216,242,1)";
                  el.style.boxShadow = "0 0 24px rgba(165,216,242,0.45), 0 0 60px rgba(165,216,242,0.15), 0 12px 40px rgba(0,0,0,0.7)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.outline = "1.5px solid rgba(165,216,242,0.75)";
                  el.style.boxShadow = "none";
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 z-10 rounded-[1rem] opacity-0 group-hover/img:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, rgba(165,216,242,0.10) 0%, transparent 55%)" }}
                />
                <div className="w-full h-full p-2 flex items-center justify-center">
                  <img
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover rounded-xl transition-transform duration-500 ease-out group-hover/img:scale-[1.06]"
                  />
                </div>
              </div>

              {/* RIGHT — text details */}
              <div
                className="group/txt relative flex flex-col p-7 md:p-8 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] cursor-pointer"
                style={{ ...cardStyle, background: RIGHT_BG, backdropFilter: "blur(16px)" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.outline = "2px solid rgba(165,216,242,1)";
                  el.style.boxShadow = "0 0 24px rgba(165,216,242,0.45), 0 0 60px rgba(165,216,242,0.15), 0 12px 40px rgba(0,0,0,0.7)";
                  el.style.background = "rgba(20,26,50,0.75)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.outline = "1.5px solid rgba(165,216,242,0.75)";
                  el.style.boxShadow = "none";
                  el.style.background = RIGHT_BG;
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 z-0 rounded-[1rem] opacity-0 group-hover/txt:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, rgba(165,216,242,0.09) 0%, transparent 55%)" }}
                />

                <h2
                  className="relative z-10 text-2xl md:text-3xl font-bold mb-3 leading-tight transition-colors duration-300 group-hover/txt:text-white"
                  style={{ color: "#D4D0C8" }}
                >
                  {project.title}
                </h2>

                <p
                  className="relative z-10 text-sm md:text-[0.9rem] leading-relaxed mb-6 transition-colors duration-300 group-hover/txt:text-[#c8edfb]"
                  style={{ color: "#A5D8F2" }}
                >
                  {project.description}
                </p>

                <p className="relative z-10 text-sm font-bold text-white mb-3">Tech used</p>
                <div className="relative z-10 flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full px-3.5 py-1 text-[12px] text-white/85 transition-all duration-200 hover:text-white hover:scale-105"
                      style={{ background: PILL_BG, border: `2px solid ${BLUE_55}` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 mt-auto">
                  {/* View live — opens video modal, disabled if no valid URL */}
                  <button
                    onClick={() => {
                      if (toEmbedUrl(project.liveUrl)) {
                        setModalProject(project.id);
                      }
                    }}
                    disabled={!toEmbedUrl(project.liveUrl)}
                    className="inline-flex items-center justify-center rounded-full px-7 py-2.5 text-sm font-semibold text-white transition hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{ background: BTN_BG, border: `2px solid ${BLUE_55}` }}
                  >
                    View live
                  </button>
                  {/* View repo — opens GitHub in new tab */}
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full px-7 py-2.5 text-sm font-semibold text-white transition hover:opacity-80"
                    style={{ background: BTN_BG, border: `2px solid ${BLUE_55}` }}
                  >
                    View repo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisible((v) => v + 4)}
              className="inline-flex items-center justify-center rounded-full px-10 py-3 text-sm font-semibold text-white transition hover:opacity-80"
              style={{ background: BTN_BG, border: `1px solid ${BLUE_55}` }}
            >
              Load more
            </button>
          </div>
        )}
      </section>

      {/* ── Video Modal ── */}
      {modalProject && embedUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setModalProject(null)}
        >
          <div
            className="relative w-full rounded-2xl overflow-hidden"
            style={{
              maxWidth: "70vw",
              outline: "1.5px solid rgba(165,216,242,0.75)",
              outlineOffset: "6px",
              background: "#0c0e1b",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
              <p className="text-sm font-semibold text-white/80 truncate">
                {activeProject?.title}
              </p>
              <button
                onClick={() => setModalProject(null)}
                className="ml-4 flex-shrink-0 text-white/50 hover:text-white transition text-xl leading-none"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* 16:9 iframe */}
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <iframe
                src={embedUrl}
                title={activeProject?.title}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen"
                allowFullScreen
                style={{ border: "none" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}