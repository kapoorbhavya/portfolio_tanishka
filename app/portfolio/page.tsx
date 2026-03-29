"use client";

import BackgroundFX from "@/app/components/background/BackgroundFX";
import MouseTracer from "@/app/components/MouseTracer";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CTASection from "@/app/components/CTASection";

const projects = [
  {
    title: "One Startup a Day",
    description:
      "Each midnight, we mine Google, Reddit, and Quora, rank 10 problems, pick the top 1, and turn it into a concise, buildable startup—free.",
    bullets: [
      "96% Light house performance",
      "SEO optimized",
      "Fast load",
      "Daily research capability",
    ],
    tech: ["Nextjs", "TailwindCSS", "Shadcn", "Supabase", "n8n"],
    image:
      "https://iamasadshah-ibnerafi.vercel.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Ffkm4ym4m%2Fproduction%2F8dc74c817e53c49b410d6564c273431205befa04-1710x877.png&w=1080&q=75",
  },
  {
    title: "Well Wish",
    description:
      "At WellWish, we don't just connect users — we connect hearts. Because sometimes, a little care is all it takes to change a life.",
    bullets: [],
    tech: ["Nextjs", "TypeScript", "TailwindCSS", "FramerMotion", "SupaBase"],
    image:
      "https://iamasadshah-ibnerafi.vercel.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Ffkm4ym4m%2Fproduction%2F8718e3d87f6795c5c989b49c75a4bafd9718cb0a-1876x985.png&w=1080&q=75",
  },
];

export default function PortfolioPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(headerRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(
        projectsRef.current?.children
          ? Array.from(projectsRef.current.children)
          : [],
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          delay: 0.4,
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <main
      ref={containerRef}
      className="relative bg-[#030303] text-white min-h-screen selection:bg-[#a1c4df] selection:text-[#0a0a0f] flex flex-col items-center overflow-x-hidden"
    >
      <BackgroundFX />
      <MouseTracer />

      {/* Back — below global CTA */}
      <div className="absolute top-20 left-6 md:left-10 z-40">
        <Link
          href="/"
          className="px-5 py-2 rounded-full border border-white/20 text-sm font-medium hover:bg-white/5 transition-all text-gray-300"
        >
          Back to Home
        </Link>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-32 pb-32 flex flex-col items-center">
        {/* Header Section */}
        <div
          ref={headerRef}
          className="flex flex-col items-center w-full mb-24"
        >
          {/* Custom Styled "PORTFOLIO" Typography matches screenshot */}
          <div className="flex flex-col items-center leading-none text-[#A5D8F2] font-black tracking-widest select-none mb-12">
            {/* Top Row: P O R T */}
            <div className="flex items-center gap-4 md:gap-8 text-[15vw] sm:text-[12vw] md:text-[8rem]">
              <span>P</span>
              <span>O</span>
              <span>R</span>
              <span>T</span>
            </div>

            {/* Bottom Row: F [pill] L I O */}
            <div className="flex items-center gap-4 md:gap-8 text-[15vw] sm:text-[12vw] md:text-[8rem] -mt-[0.1em]">
              <span>F</span>

              {/* Elliptical "O" Outline */}
              <div className="relative w-[35vw] sm:w-[28vw] md:w-[24rem] h-[0.55em] rounded-full border-[6px] md:border-[12px] border-[#A5D8F2] flex items-center justify-center translate-y-[-5%] shadow-inner">
                {/* Tag "Asadshah" Graphic */}
                <div className="absolute -bottom-10 right-2 md:-bottom-12 md:right-8 rotate-12 flex items-center z-10">
                  {/* Thread String */}
                  <div className="w-[1px] h-6 bg-white/40 absolute -top-4 left-4 -rotate-[20deg]" />
                  {/* Tag Body */}
                  <div
                    className="bg-[#A5D8F2] text-[#0a0a0f] font-mono font-bold text-[10px] md:text-xs px-4 py-1.5 shadow-xl flex items-center gap-2 border-[1.5px] border-[#0a0a0f]"
                    style={{
                      clipPath:
                        "polygon(15% 0, 100% 0, 100% 100%, 15% 100%, 0 50%)",
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0a0a0f] shrink-0" />
                    <span>Asadshah</span>
                  </div>
                </div>
              </div>

              <span>L</span>
              <span>I</span>
              <span>O</span>
            </div>
          </div>

          <p className="text-gray-300 text-center max-w-3xl text-sm md:text-[15px] leading-relaxed mb-16">
            Modern web products delivered with production-ready architecture,
            SEO optimed for search engines, Integrated AI features, Ready to
            deploy, strong UX, and measurable performance outcomes.
          </p>

          {/* Metric Cards — glassy shiny */}
          <div className="flex flex-wrap items-center justify-center gap-6 w-full">

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
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.border = "1px solid rgba(165,180,252,0.65)";
                el.style.boxShadow = "0 0 32px rgba(165,180,252,0.30), 0 0 70px rgba(165,180,252,0.10), 0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.10)";
                el.style.background = "rgba(20,18,45,0.70)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.border = "1px solid rgba(165,180,252,0.18)";
                el.style.boxShadow = "0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)";
                el.style.background = "rgba(15,17,30,0.55)";
              }}
            >
              {/* shimmer top highlight */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-indigo-300/40 to-transparent" />
              {/* violet glow shimmer on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(135deg, rgba(165,180,252,0.09) 0%, transparent 60%)" }} />
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
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.border = "1px solid rgba(251,191,36,0.65)";
                el.style.boxShadow = "0 0 32px rgba(251,191,36,0.28), 0 0 70px rgba(251,191,36,0.08), 0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.10)";
                el.style.background = "rgba(25,20,10,0.70)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.border = "1px solid rgba(251,191,36,0.18)";
                el.style.boxShadow = "0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)";
                el.style.background = "rgba(15,17,30,0.55)";
              }}
            >
              {/* shimmer top highlight */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />
              {/* amber glow shimmer on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.09) 0%, transparent 60%)" }} />
              <p className="relative text-3xl md:text-4xl font-bold tabular-nums transition-colors duration-300 group-hover:text-[#fde68a]" style={{ color: "#fbbf24" }}>15</p>
              <p className="relative mt-1 text-[10px] uppercase tracking-[0.25em] text-white/45">Technologies</p>
            </div>

          </div>
        </div>

        {/* Projects List Grid */}
        <div ref={projectsRef} className="flex flex-col gap-12 w-full">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full"
            >
              {/* Image Column */}
              <div className="bg-[#0f111a] border border-white/5 rounded-3xl p-3 sm:p-5 flex items-center justify-center overflow-hidden h-[300px] sm:h-[400px] lg:h-auto">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover rounded-2xl border border-white/10"
                />
              </div>

              {/* Details Column */}
              <div className="bg-[#0f111a] border border-white/5 rounded-3xl p-8 sm:p-10 flex flex-col justify-center min-h-[400px]">
                <h3 className="text-[#ccebf9] text-3xl font-semibold mb-4 tracking-tight">
                  {project.title}
                </h3>

                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">
                  {project.description}
                </p>

                {project.bullets.length > 0 && (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 mb-8">
                    {project.bullets.map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className="flex items-center gap-2.5 text-gray-300 text-xs sm:text-sm"
                      >
                        <span className="w-[5px] h-[5px] rounded-full bg-gray-500 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mb-10">
                  <p className="text-white text-sm font-semibold mb-3">
                    Tech used
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((techItem, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-gray-300"
                      >
                        {techItem}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-auto">
                  <button className="px-6 py-2.5 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-all flex-1 sm:flex-none">
                    View live
                  </button>
                  <button className="px-6 py-2.5 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-all flex-1 sm:flex-none">
                    View repo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CTASection />
    </main>
  );
}
