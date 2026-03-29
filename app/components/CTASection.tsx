"use client";

import React from "react";
import Link from "next/link";

export default function CTASection() {
  const metrics = [
    { label: "95+ Lighthouse Score", rotate: "-6deg", top: "10%", left: "15%" },
    {
      label: "<2s Time to Interactive",
      rotate: "4deg",
      top: "50%",
      left: "20%",
    },
    { label: "98% Performance Score", rotate: "8deg", top: "25%", left: "32%" },
    {
      label: "75% Smaller Bundle Size",
      rotate: "-4deg",
      top: "65%",
      left: "38%",
    },
    { label: "1.8s Load Time", rotate: "3deg", top: "15%", left: "50%" },
    { label: "SEO Score 100", rotate: "-8deg", top: "70%", left: "55%" },
    { label: "<120ms API Response", rotate: "-3deg", top: "10%", left: "65%" },
    { label: "99.9% Uptime", rotate: "6deg", top: "60%", left: "70%" },
    {
      label: "Optimized Core Web Vitals",
      rotate: "12deg",
      top: "20%",
      left: "80%",
    },
    { label: "Mobile-Friendly", rotate: "-5deg", top: "55%", left: "85%" },
  ];

  const marqueeItems = [
    "SECURITY BEST PRACTICES",
    "CMS INTEGRATION",
    "MVP DEVELOPMENT",
    "PERFORMANCE OPTIMIZATION",
    "SCALABLE ARCHITECTURE",
    "AI INTEGRATION",
    "E-COMMERCE SOLUTIONS",
  ];

  const animatedMarquee = [
    ...marqueeItems,
    ...marqueeItems,
    ...marqueeItems,
    ...marqueeItems,
  ];

  return (
    <section className="relative w-full pt-32 pb-0 overflow-hidden flex flex-col items-center">
      {/* Container */}
      <div className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center z-10 relative">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#ccebf9] tracking-tight leading-tight mb-6">
          Let's Create Something Amazing
          <br />
          Together
        </h2>

        <p className="text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed mb-12">
          Turn your idea into a polished product with thoughtful UX, resilient
          engineering, and a launch-ready strategy.
        </p>

        <Link
          href="/contact"
          className="px-8 py-3.5 rounded-full border border-gray-500 text-white font-medium hover:bg-[#A5D8F2] hover:text-[#0a0a0f] hover:border-[#A5D8F2] transition-all flex items-center justify-center gap-3"
        >
          <span>Contact Me</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </Link>
      </div>

      {/* Floating Metrics Cloud */}
      <div className="relative w-full h-[200px] md:h-[250px] max-w-6xl mx-auto mt-12 mb-10 hidden sm:block pointer-events-none">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="absolute px-5 py-2 rounded-full border border-white/10 bg-[#0F121C]/80 backdrop-blur-sm text-gray-300 text-sm whitespace-nowrap"
            style={{
              top: metric.top,
              left: metric.left,
              transform: `rotate(${metric.rotate}) translateX(-50%)`,
            }}
          >
            {metric.label}
          </div>
        ))}
      </div>

      {/* Mobile-only metrics (simplified grid instead of exact positioning to prevent overflow) */}
      <div className="flex flex-wrap justify-center gap-3 px-4 mt-16 mb-12 sm:hidden">
        {metrics.slice(0, 5).map((metric, idx) => (
          <div
            key={idx}
            className="px-4 py-2 rounded-full border border-white/10 bg-[#0F121C]/80 text-gray-300 text-xs"
          >
            {metric.label}
          </div>
        ))}
      </div>

      {/* Bottom Marquee Banner */}
      <div className="w-full bg-[#B2DFF3] py-4 relative overflow-hidden flex transform -rotate-1 mt-auto">
        <div className="animate-cta-marquee flex items-center whitespace-nowrap">
          {animatedMarquee.map((item, idx) => (
            <React.Fragment key={idx}>
              <span className="text-gray-900 font-bold tracking-wider text-base md:text-lg mx-6">
                {item}
              </span>
              <span className="text-gray-900 text-xl font-bold">*</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes cta-carousel {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-cta-marquee {
          display: flex;
          width: max-content;
          animation: cta-carousel 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
