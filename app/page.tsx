"use client";

import BackgroundFX from "@/app/components/background/BackgroundFX";

import HeroSection from "@/app/components/HeroSection";
import AboutSection from "@/app/components/AboutSection";
import ProjectsSection from "@/app/components/ProjectsSection";
import CoreTechStrip from "@/app/components/CoreTechStrip";
import FAQSection from "@/app/components/FAQSection";
import CTASection from "@/app/components/CTASection";

export default function HomePage() {
  return (
    <div className="relative text-white min-h-screen selection:bg-[#a1c4df] selection:text-[#0a0a0f] bg-[#030303]">
      <BackgroundFX />

      <div className="relative z-10 w-full">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <CoreTechStrip />
        <FAQSection />
        <CTASection />
      </div>
    </div>
  );
}
