"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Briefcase, PenTool } from "lucide-react";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/about", icon: User, label: "About" },
  { href: "/projects", icon: Briefcase, label: "Projects" },
  { href: "/achievements", icon: PenTool, label: "Achievements" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] px-8 py-4 rounded-full border border-white/10 bg-[#000000]/95 shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-xl flex items-center gap-8 md:gap-12">
      {navItems.map(({ href, icon: Icon, label }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-label={label}
            className={`transition-all hover:scale-110 ${
              isActive
                ? "text-white scale-110"
                : "text-white/60 hover:text-white"
            }`}
          >
            <Icon size={26} />
          </Link>
        );
      })}
    </div>
  );
}
