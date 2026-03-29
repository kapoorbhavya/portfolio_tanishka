"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

/**
 * AutoScrollFade Component
 * ✅ Elements are FULLY VISIBLE when on screen
 * ✅ Smooth fade-in animation as you scroll down
 * ✅ Works perfectly for content below the fold
 */
interface AutoScrollFadeProps {
  children: ReactNode;
  className?: string;
}

export default function AutoScrollFade({ children, className = "" }: AutoScrollFadeProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start 0.2"],
  });

  // When element enters viewport from bottom (scrollYProgress: 0 → 1)
  // Fade in from 0 to 1, slide up from 40px to 0px
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        y,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
