"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * AnimatedAvatar — bright, vivid avatar with glowing animated ring.
 * Uses CSS filter to boost brightness and contrast on the photo.
 */
export default function Avatar3D() {
  const container = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(ringRef.current, {
      rotate: 360,
      duration: 8,
      repeat: -1,
      ease: "none",
    });

    gsap.to(pulseRef.current, {
      opacity: 1,
      duration: 1.25,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
    });
  }, { scope: container });

  return (
    <div ref={container} className="w-full h-full relative flex items-center justify-center bg-transparent rounded-full overflow-hidden">

      {/* Your photo */}
      <img
        src="/avatar2.png"
        alt="Tanishka Rana"
        className="absolute inset-0 w-full h-full object-cover rounded-full"
        draggable={false}
        style={{
          filter: "brightness(1.25) contrast(1.12) saturate(1.15)",
        }}
      />
    </div>
  );
}
