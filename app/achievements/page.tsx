"use client";

import BackgroundFX from "@/app/components/background/BackgroundFX";
import MouseTracer from "@/app/components/MouseTracer";
import AchievementsPageContent from "@/app/components/achievements/AchievementsPageContent";
import CTASection from "@/app/components/CTASection";

export default function AchievementsPage() {
  return (
    <main className="relative min-h-screen bg-[#000000] text-white selection:bg-[#a1c4df] selection:text-[#0a0a0f]">
      <BackgroundFX />
      <MouseTracer />
      <AchievementsPageContent />
      <CTASection />
    </main>
  );
}
