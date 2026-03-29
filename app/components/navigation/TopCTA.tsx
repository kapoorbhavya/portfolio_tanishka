"use client";

import Link from "next/link";

export default function TopCTA() {
  return (
    <div className="fixed top-7 right-8 z-50 flex items-center gap-5">
      <Link
        href="/contact"
        className="cta-button px-6 py-2.5 rounded-full border border-[#A5D8F2] text-sm font-medium text-[#A5D8F2] flex items-center gap-2"
      >
        Start a Project <span className="text-lg">⚙︎</span>
      </Link>
      <div className="w-10 h-px bg-white/30 hidden md:block" />
      <span className="text-white/40 text-xs hidden md:inline">{"<"}</span>
    </div>
  );
}
