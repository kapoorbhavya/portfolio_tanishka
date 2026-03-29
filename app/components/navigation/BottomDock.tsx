"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Home, User, Briefcase, Trophy } from "lucide-react";

const NAV_ITEMS = [
  { Icon: Home,      href: "/",            label: "Home"         },
  { Icon: User,      href: "/about",       label: "About Me"     },
  { Icon: Briefcase, href: "/projects",    label: "Projects"     },
  { Icon: Trophy,    href: "/achievements",label: "Achievements" },
];

export default function BottomDock() {
  const pathname = usePathname();
  const dockRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(dockRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.8,
    });
  }, { scope: dockRef });

  return (
    <nav
      ref={dockRef}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-5 px-7 py-1.5 rounded-full bg-[#0f1115]/50 backdrop-blur-md border border-[#a5d8ff]/60 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
    >
      {NAV_ITEMS.map(({ Icon, href, label }) => {
        const isActive = pathname === href;
        return (
          <div key={href} className="relative group">
            <Link
              href={href}
              aria-label={label}
              className="relative flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300"
            >
              {/* Circle ring around active icon */}
              {isActive && (
                <span
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: "2px solid rgba(165,216,255,0.85)",
                    boxShadow: "0 0 12px rgba(165,216,255,0.35)",
                  }}
                />
              )}

              {/* Icon */}
              <Icon
                size={32}
                strokeWidth={0}
                style={{
                  color: "#a5d8ff",
                  fill: "#a5d8ff",
                  opacity: isActive ? 1 : 0.65,
                  filter: isActive
                    ? "drop-shadow(0 0 8px rgba(165,216,255,0.65))"
                    : "none",
                  transition: "all 0.3s ease",
                }}
              />
            </Link>

            {/* Tooltip */}
            <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-3 whitespace-nowrap text-xs font-semibold text-white bg-black/85 px-3 py-1.5 rounded-full opacity-0 transition-all duration-300 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
              {label}
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
                style={{
                  borderLeft: "5px solid transparent",
                  borderRight: "5px solid transparent",
                  borderTop: "5px solid rgba(0,0,0,0.85)",
                }}
              />
            </div>
          </div>
        );
      })}
    </nav>
  );
}
