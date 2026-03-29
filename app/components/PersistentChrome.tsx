"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import BackgroundFX from "./background/BackgroundFX";
import SocialSidebar from "./navigation/SocialSidebar";
import BottomDock from "./navigation/BottomDock";
import TopCTA from "./navigation/TopCTA";

export default function PersistentChrome({ children }: { children: React.ReactNode }) {
  const cursorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.45, ease: "back.out" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.45, ease: "back.out" });

    const move = (e: MouseEvent) => {
      xTo(e.clientX - 225);
      yTo(e.clientY - 225);
    };

    // Initial position off-screen
    gsap.set(cursorRef.current, { x: -999, y: -999 });

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  });

  return (
    <div className="relative min-h-screen">
      <BackgroundFX />

      {/* Global cursor glow */}
      <div
        ref={cursorRef}
        className="glow-cursor fixed top-0 left-0 w-[450px] h-[450px] rounded-full z-40 pointer-events-none"
      />

      <SocialSidebar />
      <BottomDock />
      <TopCTA />

      {/* Page content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

