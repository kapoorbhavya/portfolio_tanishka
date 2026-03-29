"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <>
      {/* Subtle scroll progress bar at top */}
      <motion.div
        className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent z-[9999] pointer-events-none"
        style={{
          boxShadow: "0 0 10px rgba(59, 130, 246, 0.3)",
        }}
      />
    </>
  );
}
