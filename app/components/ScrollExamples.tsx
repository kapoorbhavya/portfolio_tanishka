"use client";

import ScrollFade, { ScrollReveal, ScrollParallax } from "@/app/components/ScrollAnimations";

/**
 * SCROLL ANIMATION EXAMPLES
 * Copy these patterns into your page components
 */

export function ExampleScrollFadeHero() {
  return (
    <section className="py-32">
      <ScrollFade direction="up">
        <h1 className="text-5xl md:text-6xl font-bold">
          Crafting Data Excellence
        </h1>
      </ScrollFade>

      <ScrollFade direction="up" className="mt-6">
        <p className="text-xl text-gray-400 max-w-2xl">
          I help organizations turn raw data into intelligent systems and actionable insights
        </p>
      </ScrollFade>

      <ScrollFade direction="up" className="mt-8">
        <div className="flex gap-4">
          <button className="px-8 py-3 bg-blue-600 rounded-lg hover:bg-blue-700">
            See My Work
          </button>
          <button className="px-8 py-3 border border-gray-600 rounded-lg">
            Contact Me
          </button>
        </div>
      </ScrollFade>
    </section>
  );
}

export function ExampleScrollRevealCards() {
  const cards = [
    { title: "Data Engineering", desc: "Building scalable data pipelines and ETL processes" },
    { title: "Analytics", desc: "Transforming data into actionable business intelligence" },
    { title: "Cloud Infrastructure", desc: "Designing efficient data systems in the cloud" },
  ];

  return (
    <section className="py-20">
      <ScrollFade direction="up">
        <h2 className="text-4xl font-bold mb-12">My Expertise</h2>
      </ScrollFade>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, i) => (
          <ScrollReveal key={i} scale={0.8}>
            <div className="p-8 border border-gray-800 rounded-lg hover:border-gray-600 transition-colors">
              <h3 className="text-2xl font-semibold mb-4">{card.title}</h3>
              <p className="text-gray-400">{card.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

export function ExampleParallaxSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <ScrollParallax speed={0.3}>
          <div className="w-full h-full bg-gradient-to-r from-blue-900/20 to-purple-900/20" />
        </ScrollParallax>
      </div>

      <ScrollFade direction="up">
        <h2 className="text-4xl font-bold mb-8">Featured Project</h2>
      </ScrollFade>

      <div className="grid grid-cols-2 gap-12 items-center">
        <ScrollFade direction="left">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Project Name</h3>
            <p className="text-gray-400 mb-6">
              Description of your amazing project with results and impact
            </p>
            <button className="px-6 py-2 border border-gray-600 rounded-lg">
              View Project
            </button>
          </div>
        </ScrollFade>

        <ScrollParallax speed={0.2}>
          <div className="h-64 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-gray-300">Project Image Placeholder</span>
          </div>
        </ScrollParallax>
      </div>
    </section>
  );
}

export function ExampleScrollList() {
  const items = [
    "Designed data architecture for 10M+ records",
    "Optimized query performance by 85%",
    "Built real-time analytics dashboard",
    "Migrated legacy system to cloud",
    "Mentored 5 junior data engineers",
  ];

  return (
    <section className="py-20">
      <ScrollFade direction="up">
        <h2 className="text-4xl font-bold mb-12">Achievements</h2>
      </ScrollFade>

      <div className="max-w-2xl space-y-4">
        {items.map((item, i) => (
          <ScrollFade key={i} direction="left" className={`w-full`}>
            <div className="flex items-start gap-4 p-4 border-l-2 border-blue-500/50 hover:border-blue-500 transition-colors">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <p className="text-gray-300">{item}</p>
            </div>
          </ScrollFade>
        ))}
      </div>
    </section>
  );
}

export function ExampleAlternatingContent() {
  return (
    <section className="py-20 space-y-32">
      {/* Left-aligned section */}
      <div className="grid grid-cols-2 gap-12 items-center">
        <ScrollFade direction="left">
          <h2 className="text-3xl font-bold mb-4">Section One</h2>
          <p className="text-gray-400">Content slides in from the left...</p>
        </ScrollFade>
        <ScrollReveal>
          <div className="h-64 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg" />
        </ScrollReveal>
      </div>

      {/* Right-aligned section */}
      <div className="grid grid-cols-2 gap-12 items-center">
        <ScrollReveal>
          <div className="h-64 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg" />
        </ScrollReveal>
        <ScrollFade direction="right">
          <h2 className="text-3xl font-bold mb-4">Section Two</h2>
          <p className="text-gray-400">Content slides in from the right...</p>
        </ScrollFade>
      </div>
    </section>
  );
}

export const SCROLL_EXAMPLES = {
  fadeHero: ExampleScrollFadeHero,
  revealCards: ExampleScrollRevealCards,
  parallax: ExampleParallaxSection,
  list: ExampleScrollList,
  alternating: ExampleAlternatingContent,
};
