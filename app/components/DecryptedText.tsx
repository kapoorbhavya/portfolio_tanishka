"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface DecryptedTextProps {
  text: string;
  className?: string;
  speed?: number;
}

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

export default function DecryptedText({ 
  text, 
  className = "", 
  speed = 50 
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const characters = text.split("");
    const decryptedIndices = new Set<number>();

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * characters.length);
      decryptedIndices.add(randomIndex);

      if (decryptedIndices.size === characters.length) {
        setDisplayText(text);
        setIsAnimating(false);
        clearInterval(interval);
      } else {
        const newDisplay = characters.map((char, i) => {
          if (decryptedIndices.has(i)) {
            return char;
          }
          return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        }).join("");
        setDisplayText(newDisplay);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <motion.span
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {displayText}
    </motion.span>
  );
}
