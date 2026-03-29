"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

// Define multiple elegant transition styles
export const transitionVariants = {
  // 1. Fade with Scale (Default - Elegant & Modern)
  fadeScale: {
    initial: { opacity: 0, scale: 0.98, filter: "blur(8px)" },
    enter: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      filter: "blur(6px)",
      transition: { duration: 0.4, ease: [0.4, 0, 1, 1] },
    },
  },

  // 2. Slide from Right (Premium feel)
  slideRight: {
    initial: { opacity: 0, x: 50, filter: "blur(4px)" },
    enter: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      x: -50,
      filter: "blur(4px)",
      transition: { duration: 0.35, ease: [0.64, 0, 0.78, 0] },
    },
  },

  // 3. Slide from Left (Alternative direction)
  slideLeft: {
    initial: { opacity: 0, x: -50, filter: "blur(4px)" },
    enter: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      x: 50,
      filter: "blur(4px)",
      transition: { duration: 0.35, ease: [0.64, 0, 0.78, 0] },
    },
  },

  // 4. Expand from Center (Sophisticated)
  expandCenter: {
    initial: { opacity: 0, scale: 0.85, y: 20, filter: "blur(10px)" },
    enter: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 10,
      filter: "blur(8px)",
      transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
    },
  },
};

const LoadingBar = ({ isTransitioning }: { isTransitioning: boolean }) => {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#a1c4df] to-transparent z-[9999]"
      initial={{ opacity: 0, scaleX: 0 }}
      animate={
        isTransitioning
          ? {
              opacity: [0, 1, 1, 0],
              scaleX: [0, 1, 0.8, 0],
              transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            }
          : { opacity: 0, scaleX: 0 }
      }
      style={{
        transformOrigin: "left",
        boxShadow: "0 0 20px rgba(161, 196, 223, 0.5)",
      }}
    />
  );
};

interface PageTransitionVariantsProps {
  children: React.ReactNode;
  variant?: keyof typeof transitionVariants;
}

export default function PageTransitionVariants({
  children,
  variant = "fadeScale",
}: PageTransitionVariantsProps) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayPathname, setDisplayPathname] = useState(pathname);

  useEffect(() => {
    if (pathname !== displayPathname) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setDisplayPathname(pathname);
        setIsTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pathname, displayPathname]);

  const selectedVariant = transitionVariants[variant];

  return (
    <>
      <LoadingBar isTransitioning={isTransitioning} />
      <AnimatePresence mode="wait">
        <motion.div
          key={displayPathname}
          initial={selectedVariant.initial}
          animate={selectedVariant.enter}
          exit={selectedVariant.exit}
          style={{
            willChange: "opacity, transform, filter",
            backfaceVisibility: "hidden",
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
