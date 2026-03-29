"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SmoothRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  className?: string;
  stagger?: boolean;
}

export default function SmoothReveal({
  children,
  delay = 0,
  direction = "up",
  duration = 0.6,
  className = "",
  stagger = false,
}: SmoothRevealProps) {
  const directionVariants = {
    up: { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } },
    down: { initial: { opacity: 0, y: -30 }, animate: { opacity: 1, y: 0 } },
    left: { initial: { opacity: 0, x: 30 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0 } },
  };

  const variant = directionVariants[direction];

  return (
    <motion.div
      initial={variant.initial}
      whileInView={variant.animate}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration,
        delay,
        ease: [0.23, 0.64, 0.13, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
