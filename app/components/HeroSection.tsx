"use client";

import { TypeAnimation } from "react-type-animation";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function HeroSection() {
  const container = useRef<HTMLElement | null>(null);
  const descRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      // Fade up animations for description and note
      gsap.from(descRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: "power2.out",
      });




    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-transparent"
    >

      {/* ── LARGE BACKGROUND TEXT (above portrait z-10 so typewriter is never covered) ── */}
      <div className="absolute inset-x-0 top-10 md:top-14 z-[25] flex flex-col items-center px-4 sm:px-6 pointer-events-none select-none">
        <div className="relative flex w-full max-w-[100vw] flex-col items-center gap-6 md:gap-7">
          {/* INNOVATIVE badge */}
          <div className="px-5 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm">
            <span className="font-mono text-[#D0E8FF] text-base md:text-2xl font-semibold tracking-[0.4em] uppercase">
              INNOVATIVE
            </span>
          </div>

          {/* Cycling DATA / ML / PowerBI + one space + ENGINEER — single inline unit */}
          <div className="flex w-full max-w-[100vw] items-center justify-center overflow-x-auto px-2 leading-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div
              className="inline-flex max-w-full flex-nowrap items-baseline justify-center gap-x-[0.25em]"
              style={{
                fontSize: "clamp(2.2rem, 6.8vw, 7.2rem)",
                letterSpacing: "-0.06em",
                lineHeight: 1,
              }}
            >
              <span className="inline-block min-h-[1.15em] shrink-0 font-black text-[#A5D8F2] [&_*]:text-[#A5D8F2]">
                <TypeAnimation
                  sequence={[
                    "DATA",
                    1500,
                    "",
                    300,
                    "ML",
                    1500,
                    "",
                    300,
                    "PowerBI",
                    1500,
                    "",
                    300,
                  ]}
                  wrapper="span"
                  className="text-[#A5D8F2]"
                  speed={50}
                  deletionSpeed={30}
                  cursor={true}
                  repeat={Infinity}
                />
              </span>
              <span className="shrink-0 font-black text-white whitespace-nowrap">
                ENGINEER
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── PORTRAIT/VIDEO CONTAINER ── */}
      <div className="absolute bottom-0 left-1/2 z-[10] -translate-x-1/2 pointer-events-none"
        style={{ width: "clamp(400px, 58vw, 630px)" }}
      >
        <img
          src="/profilepic.png"
          alt="Tanishka Rana"
          className="w-full object-cover object-top"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 62%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 62%, transparent 100%)",
          }}
        />
      </div>

      {/* ── BOTTOM-RIGHT DESCRIPTION ── */}
      <div
        ref={descRef}
        className="absolute bottom-0 right-0 px-12 pb-24 max-w-md text-right z-[20] rounded-2xl"
        style={{ backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", background: "rgba(5,7,20,0.003)" }}
      >
        <p className="text-[#6bcdff] text-base md:text-lg leading-relaxed font-normal" style={{ fontFamily: "'Poppins', sans-serif" }}>
          I help organizations turn{" "}
          <span className="text-white font-bold">raw data</span> into{" "}
          <span className="text-white font-bold">intelligent</span> systems
          {" "}and{" "}
          <span className="text-white font-bold">actionable</span> insights.
        </p>
      </div>

      {/* ── THOUGHT BUBBLE at fingertip ── */}
      <a
        href="/tanishka_resume.pdf"
        download="tanishka_resume.pdf"
        className="absolute z-[30] pointer-events-auto group cursor-pointer"
        style={{ bottom: "3cm", left: "14%" }}
      >
        {/* Main bubble */}
        <div
          className="relative px-7 py-4 transition-all duration-300 group-hover:scale-115 group-hover:shadow-lg"
          style={{
            background: "rgba(165,216,242,0.12)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1.5px solid rgba(165,216,242,0.6)",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            boxShadow: "0 8px 32px rgba(165,216,242,0.3), inset 0 1px 0 rgba(255,255,255,0.35)",
          }}
        >
          <span
            className="font-black tracking-[0.35em] text-white group-hover:text-[#A5D8F2] transition-colors duration-300 select-none whitespace-nowrap"
            style={{ fontSize: "13px", letterSpacing: "0.1em" }}
          >
            RESUME
          </span>
        </div>
        {/* Tail dots thought bubble style */}
        <div className="absolute -bottom-4 left-3 flex flex-col items-start gap-1">
          <div className="rounded-full" style={{ width: "8px", height: "8px", background: "rgba(165,216,242,0.4)", border: "1.5px solid rgba(165,216,242,0.5)" }} />
          <div className="rounded-full ml-2" style={{ width: "5px", height: "5px", background: "rgba(165,216,242,0.3)", border: "1px solid rgba(165,216,242,0.4)" }} />
          <div className="rounded-full ml-3" style={{ width: "3px", height: "3px", background: "rgba(165,216,242,0.25)" }} />
        </div>
      </a>

      {/* ── BOTTOM-LEFT Download CV ── */}
      <a
        href="/tanishka_cv (3).pdf"
        download
        className="absolute bottom-8 left-24 z-[20] pointer-events-auto"
        style={{ width: "130px" }}
      >
        <img
          src="/downloadcv.png"
          alt="Download Resume"
          className="w-full h-auto drop-shadow-lg transition-transform duration-200 hover:scale-105"
        />
      </a>

    </section>
  );
}
