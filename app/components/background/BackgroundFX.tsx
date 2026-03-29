"use client";

import { useEffect, useState } from "react";

export default function BackgroundFX() {
  const [stars, setStars] = useState<
    {
      id: number;
      top: string;
      left: string;
      size: string;
      twinkleDuration: string;
      driftDuration: string;
      driftDelay: string;
      opacity: number;
    }[]
  >([]);

  useEffect(() => {
    const numStars =
      typeof window !== "undefined" && window.innerWidth < 768 ? 60 : 150;

    const newStars = Array.from({ length: numStars }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 200 - 100}%`,
      size: `${Math.random() * 2.5 + 0.5}px`,
      twinkleDuration: `${Math.random() * 4 + 2}s`,
      driftDuration: `${Math.random() * 30 + 40}s`,
      driftDelay: `-${Math.random() * 60}s`,
      opacity: Math.random() * 0.8 + 0.2,
    }));

    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-transparent">

      {/* Bottom faint glow */}
      <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[80%] md:w-[60%] h-[40%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#121c33] via-[#0a0a0f]/50 to-transparent opacity-50 blur-3xl"></div>

      {/* GLOBAL DRIFTING MOON */}
      <div className="absolute z-[15] animate-moon-drift">
        <div
          className="relative w-14 h-14 sm:w-[5.5rem] sm:h-[5.5rem] rounded-full bg-[#fdfbe0] hidden md:block"
          style={{
            boxShadow:
              "0 0 0 2px rgba(255,254,220,0.90), 0 0 14px 10px rgba(255,253,200,0.65), 0 0 38px 18px rgba(253,251,180,0.30)",
            opacity: 0.96,
          }}
        >
          <div className="absolute top-4 left-5 w-3 h-3 rounded-full bg-black/10"></div>
          <div className="absolute bottom-5 right-6 w-4 h-4 rounded-full bg-black/10"></div>
          <div className="absolute top-8 right-5 w-2 h-2 rounded-full bg-black/10"></div>
          <div className="absolute bottom-6 left-5 w-2 h-2 rounded-full bg-black/10"></div>
        </div>
      </div>

      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white star-drift"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animationName: "twinkle, starDrift",
            animationDuration: `${star.twinkleDuration}, ${star.driftDuration}`,
            animationTimingFunction: "ease-in-out, linear",
            animationIterationCount: "infinite, infinite",
            animationDirection: "alternate, normal",
            animationDelay: `0s, ${star.driftDelay}`,
          }}
        />
      ))}

      <style>{`
        @keyframes twinkle {
          0%   { opacity: 0.1; transform: scale(0.8); }
          100% { opacity: 1;   transform: scale(1.3); }
        }

        @keyframes starDrift {
          from { transform: translateX(0); }
          to   { transform: translateX(100vw); }
        }

        @keyframes moonDrift {
          0%    { transform: translate(4vw,  44vh); }
          16.6% { transform: translate(30vw, 6vh);  }
          33.3% { transform: translate(68vw, 6vh);  }
          50%   { transform: translate(90vw, 44vh); }
          66.6% { transform: translate(68vw, 82vh); }
          83.3% { transform: translate(30vw, 82vh); }
          100%  { transform: translate(4vw,  44vh); }
        }
        .animate-moon-drift {
          animation: moonDrift 90s linear infinite;
        }
      `}</style>
    </div>
  );
}
