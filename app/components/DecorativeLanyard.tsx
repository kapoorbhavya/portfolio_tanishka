"use client";

import { motion } from "framer-motion";

export default function DecorativeLanyard() {
  // Falling particles animation
  const fallingVariants = {
    fall: (i: number) => ({
      y: [0, 200],
      opacity: [1, 0.3, 0],
      rotate: [0, 360],
      x: [0, Math.sin(i) * 50],
      transition: {
        duration: 3 + i * 0.5,
        repeat: Infinity,
        ease: "easeIn",
        delay: i * 0.3,
      },
    }),
  };

  return (
    <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-64 h-72 pointer-events-none">
      {/* Falling cards/elements */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          custom={i}
          variants={fallingVariants}
          animate="fall"
          className="absolute"
          style={{
            left: `${20 + i * 15}%`,
            top: 0,
          }}
        >
          <div
            className="w-12 h-12 rounded-lg border-2 border-[#A5D8F2]/60 bg-[#A5D8F2]/20 backdrop-blur-md flex items-center justify-center text-[#A5D8F2] font-bold text-xs"
            style={{
              boxShadow: "0 0 15px rgba(165, 216, 242, 0.6), inset 0 0 10px rgba(165, 216, 242, 0.2)",
            }}
          >
            {i + 1}
          </div>
        </motion.div>
      ))}

      {/* Glowing wave line at top */}
      <svg
        viewBox="0 0 300 80"
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-20 opacity-80"
        style={{ filter: "drop-shadow(0 0 15px rgba(165, 216, 242, 0.8))" }}
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A5D8F2" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#A5D8F2" stopOpacity="1" />
            <stop offset="100%" stopColor="#A5D8F2" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        <motion.path
          d="M 30 40 Q 80 10, 150 40 T 270 40"
          stroke="url(#waveGradient)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{
            d: [
              "M 30 40 Q 80 10, 150 40 T 270 40",
              "M 30 40 Q 80 25, 150 40 T 270 40",
              "M 30 40 Q 80 10, 150 40 T 270 40",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Additional glowing circles */}
        <motion.circle
          cx="150"
          cy="40"
          r="3"
          fill="#A5D8F2"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        />
      </svg>
    </div>
  );
}
