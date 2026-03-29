"use client";

import { motion } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  duration?: number;
  className?: string;
}

/**
 * FadeIn — wraps children with a smooth spring slide-in animation.
 * Use `delay` to stagger multiple sections on a page.
 */
export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  distance = 36,
  duration = 0.65,
  className,
}: FadeInProps) {
  const directionOffset = {
    up:    { y: distance,  x: 0 },
    down:  { y: -distance, x: 0 },
    left:  { x: distance,  y: 0 },
    right: { x: -distance, y: 0 },
  }[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94], // classic ease-out-quart — smooth & satisfying
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
