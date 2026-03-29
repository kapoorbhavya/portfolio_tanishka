"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  index?: number;
  totalItems?: number;
}

export default function ScrollStack({
  children,
  className = "",
  index = 0,
  totalItems = 1,
}: ScrollStackProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const elementTop = rect.top;
        const windowHeight = window.innerHeight;
        const progress = Math.max(0, Math.min(1, 1 - elementTop / windowHeight));
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const yOffset = Math.max(0, (1 - scrollProgress) * 50);
  const scale = 0.95 + scrollProgress * 0.05;
  const opacity = 0.8 + scrollProgress * 0.2;

  return (
    <motion.div
      ref={ref}
      className={`relative w-full ${className}`}
      initial={{ opacity: 0.5, y: 100, scale: 0.95 }}
      animate={{
        opacity: isVisible ? opacity : 0.5,
        y: isVisible ? yOffset : 100,
        scale: isVisible ? scale : 0.95,
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
      style={{
        zIndex: 10 + index,
      }}
    >
      {children}
    </motion.div>
  );
}
