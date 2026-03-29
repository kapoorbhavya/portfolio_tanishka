"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top with Lenis smooth scrolling
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Alternative: If using Lenis directly
    const scrollElement = document.documentElement;
    if (scrollElement) {
      scrollElement.scrollTop = 0;
    }
  }, [pathname]);

  return null;
}
