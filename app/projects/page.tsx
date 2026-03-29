"use client";

import BackgroundFX from "@/app/components/background/BackgroundFX";
import MouseTracer from "@/app/components/MouseTracer";
import ProjectsPageContent from "@/app/components/projects/ProjectsPageContent";
import CTASection from "@/app/components/CTASection";

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen bg-[#000000] text-white selection:bg-[#a1c4df] selection:text-[#0a0a0f]">
      <BackgroundFX />
      <MouseTracer />
      <ProjectsPageContent />
      <CTASection />
    </main>
  );
}
