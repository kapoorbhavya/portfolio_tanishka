"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollFadeProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

/**
 * ScrollFade Component
 * Elements fade and slide in as you scroll them into view
 * Creates a beautiful parallax-like effect
 */
export default function ScrollFade({
  children,
  direction = "up",
  className = "",
}: ScrollFadeProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  // Define direction variants
  const directionMap = {
    up: { y: [100, 0], opacity: [0, 1] },
    down: { y: [-100, 0], opacity: [0, 1] },
    left: { x: [100, 0], opacity: [0, 1] },
    right: { x: [-100, 0], opacity: [0, 1] },
  };

  const variant = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      style={{
        y: direction === "up" || direction === "down" 
          ? useTransform(scrollYProgress, [0, 1], [100, 0]) 
          : undefined,
        x: direction === "left" || direction === "right" 
          ? useTransform(scrollYProgress, [0, 1], direction === "left" ? [100, 0] : [-100, 0]) 
          : undefined,
        opacity: useTransform(scrollYProgress, [0, 1], [0, 1]),
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScrollParallax Component
 * Creates parallax effect - moves slower than scroll speed
 */
interface ScrollParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ScrollParallax({
  children,
  speed = 0.5,
  className = "",
}: ScrollParallaxProps) {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (value) => value * speed * -1);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * ScrollReveal Component
 * Elements reveal with scale and fade as they come into view
 */
interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  scale?: number;
}

export function ScrollReveal({
  children,
  className = "",
  scale = 0.8,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "center 0.3"],
  });

  const scaleValue = useTransform(scrollYProgress, [0, 1], [scale, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleValue,
        opacity,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
