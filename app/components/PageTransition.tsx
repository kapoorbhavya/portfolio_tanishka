"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ 
          opacity: 0, 
          scale: 0.98, 
          filter: "blur(6px)",
          y: 10 
        }}
        animate={{
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.23, 0.64, 0.13, 1], // Custom smooth easing
          },
        }}
        exit={{
          opacity: 0,
          scale: 0.97,
          filter: "blur(4px)",
          y: -5,
          transition: {
            duration: 0.35,
            ease: [0.4, 0, 1, 1],
          },
        }}
        style={{ 
          willChange: "opacity, transform, filter",
          backfaceVisibility: "hidden",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
