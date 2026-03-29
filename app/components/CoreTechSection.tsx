"use client";

import React from "react";

export default function CoreTechSection() {
  const technologies = [
    {
      name: "JavaScript",
      icon: (
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#F7DF1E] rounded-md text-black font-bold flex items-center justify-center text-xl sm:text-2xl">
          JS
        </div>
      ),
    },
    {
      name: "Bootstrap",
      icon: (
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#7952B3] rounded-2xl text-white font-bold flex items-center justify-center text-3xl sm:text-4xl shadow-sm border border-purple-900/20 shadow-inner">
          B
        </div>
      ),
    },
    {
      name: "TypeScript",
      icon: (
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#3178C6] rounded-md text-white font-bold flex items-center justify-center text-xl sm:text-2xl">
          TS
        </div>
      ),
    },
    {
      name: "TailwindCSS",
      icon: (
        <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
          <svg
            className="w-10 h-10 sm:w-16 sm:h-16 text-[#38BDF8]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
          </svg>
        </div>
      ),
    },
    {
      name: "React",
      icon: (
        <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
          <svg
            className="w-12 h-12 sm:w-16 sm:h-16 text-[#61DAFB]"
            viewBox="-11.5 -10.23174 23 20.46348"
          >
            <circle cx="0" cy="0" r="2.05" fill="currentColor" />
            <g stroke="currentColor" strokeWidth="1" fill="none">
              <ellipse rx="11" ry="4.2" />
              <ellipse rx="11" ry="4.2" transform="rotate(60)" />
              <ellipse rx="11" ry="4.2" transform="rotate(120)" />
            </g>
          </svg>
        </div>
      ),
    },
    {
      name: "Nextjs",
      icon: (
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#1A1A1A] flex items-center justify-center">
          <span className="text-gray-400 font-bold text-2xl sm:text-4xl font-sans tracking-tighter">
            N
          </span>
        </div>
      ),
    },
    {
      name: "Sanity",
      icon: (
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#F03E2F] flex items-center justify-center">
          <span className="text-white font-bold text-2xl sm:text-4xl font-sans">
            S
          </span>
        </div>
      ),
    },
    {
      name: "Shadcn",
      icon: (
        <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            className="w-8 h-8 sm:w-12 sm:h-12 text-white"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          >
            <line x1="17" y1="4" x2="7" y2="20" />
            <line x1="22" y1="4" x2="12" y2="20" />
          </svg>
        </div>
      ),
    },
  ];

  // We duplicate the array to allow for a seamless marquee loop
  const duplicatedTech = [...technologies, ...technologies, ...technologies];

  return (
    <section className="relative w-full py-16 z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-bold text-[#ccebf9] tracking-tight mb-16">
          Core Technologies
        </h2>
      </div>

      <div className="w-full relative overflow-hidden flex bg-transparent">
        {/* Fading Edges Overlay */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#000000] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#000000] to-transparent z-10 pointer-events-none" />

        {/* Animated Marquee Container */}
        <div className="animate-carousel flex items-center justify-start gap-12 sm:gap-24 whitespace-nowrap py-4">
          {duplicatedTech.map((tech, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-4 group min-w-[80px] sm:min-w-[120px]"
            >
              <div className="transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2">
                {tech.icon}
              </div>
              <span className="text-[#a1c4df] font-medium text-sm sm:text-base transition-colors duration-300 group-hover:text-white">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes carousel {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333333%); }
        }
        .animate-carousel {
          display: flex;
          width: max-content;
          animation: carousel 15s linear infinite;
        }
        .animate-carousel:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
