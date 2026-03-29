"use client";

import SmoothReveal from "@/app/components/SmoothReveal";
import { StaggerContainer, StaggerItem } from "@/app/components/StaggerAnimation";

/**
 * EXAMPLE COMPONENT: How to use smooth transitions
 * 
 * Copy these patterns into your existing page components:
 * - app/page.tsx (home)
 * - app/about/page.tsx
 * - app/projects/page.tsx
 * - app/achievements/page.tsx
 * etc.
 */

export function ExampleHeroWithStagger() {
  return (
    <section className="py-20">
      <StaggerContainer>
        <StaggerItem>
          <h1 className="text-5xl md:text-6xl font-bold">
            Your Headline Here
          </h1>
        </StaggerItem>
        <StaggerItem>
          <p className="text-xl text-gray-400 mt-6 max-w-2xl">
            Your subtitle or description that appears second
          </p>
        </StaggerItem>
        <StaggerItem>
          <div className="flex gap-4 mt-8">
            <button className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700">
              Primary Action
            </button>
            <button className="px-6 py-3 border border-gray-600 rounded-lg hover:border-gray-400">
              Secondary Action
            </button>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}

export function ExampleCardGrid() {
  const items = [
    { id: 1, title: "Item 1", desc: "Description" },
    { id: 2, title: "Item 2", desc: "Description" },
    { id: 3, title: "Item 3", desc: "Description" },
  ];

  return (
    <section className="py-20">
      <SmoothReveal direction="up">
        <h2 className="text-4xl font-bold mb-12">Section Title</h2>
      </SmoothReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <SmoothReveal key={item.id} delay={index * 0.1} direction="up">
            <div className="p-6 border border-gray-800 rounded-lg hover:border-gray-600 transition-colors">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-400 mt-2">{item.desc}</p>
            </div>
          </SmoothReveal>
        ))}
      </div>
    </section>
  );
}

export function ExampleListItems() {
  const features = [
    "Feature one with smooth reveal",
    "Feature two slides in after first",
    "Feature three completes the sequence",
    "Each item animates individually",
  ];

  return (
    <section className="py-20">
      <StaggerContainer className="max-w-2xl">
        <StaggerItem>
          <h2 className="text-3xl font-bold">Features</h2>
        </StaggerItem>
        {features.map((feature, index) => (
          <StaggerItem key={index}>
            <div className="flex items-center gap-4 mt-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
              <p className="text-gray-300">{feature}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

export function ExampleDirectionalReveal() {
  return (
    <section className="py-20 grid grid-cols-2 gap-12">
      {/* Left side - slides in from left */}
      <SmoothReveal direction="left">
        <div>
          <h2 className="text-3xl font-bold">From Left</h2>
          <p className="text-gray-400 mt-4">Content slides in from the left</p>
        </div>
      </SmoothReveal>

      {/* Right side - slides in from right */}
      <SmoothReveal direction="right">
        <div>
          <h2 className="text-3xl font-bold">From Right</h2>
          <p className="text-gray-400 mt-4">Content slides in from the right</p>
        </div>
      </SmoothReveal>

      {/* Bottom - slides in from bottom */}
      <div className="col-span-2">
        <SmoothReveal direction="up">
          <div className="p-8 border border-gray-800 rounded-lg">
            <h3 className="text-2xl font-bold">From Bottom</h3>
            <p className="text-gray-400 mt-4">Content slides up from bottom</p>
          </div>
        </SmoothReveal>
      </div>
    </section>
  );
}

// Export all examples for reference
export const ANIMATION_EXAMPLES = {
  heroWithStagger: ExampleHeroWithStagger,
  cardGrid: ExampleCardGrid,
  listItems: ExampleListItems,
  directionalReveal: ExampleDirectionalReveal,
};
