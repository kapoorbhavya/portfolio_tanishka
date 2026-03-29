"use client";

import { useState } from "react";

const testimonials = [
  {
    id: 1,
    text: "Asad helped me build my web application from the start. He was always listening to my ideas and made changes quickly when I asked. The work was of good quality and I am happy with the result.",
    name: "Ahmed Raza",
    title: "Startup Owner",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026024d", // Placeholder avatar matching roughly the aesthetic
  },
  {
    id: 2,
    text: "I worked with Asad Shah on a client project, and his code was clean and easy to understand. He seamlessly integrated complex features and communicated proactively the entire time.",
    name: "Sarah Jenkins",
    title: "Project Manager",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    id: 3,
    text: "An absolute professional. Asad not only met our tight deadlines but exceeded our expectations in terms of performance optimization and responsive design. Will hire again.",
    name: "David Chen",
    title: "Technical Lead",
    image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section className="relative w-full py-24 z-10 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-12 flex flex-col items-center">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-bold text-[#A5D8F2] mb-20 text-center tracking-tight">
          My Clients
        </h2>

        {/* Stacked Cards Container */}
        <div className="relative w-full max-w-3xl h-[320px] md:h-[280px] flex justify-center">
          {testimonials.map((testimonial, idx) => {
            // Determine relative position (0 = active, 1 = behind, 2 = furthest behind)
            let relativeIndex =
              (idx - activeIndex + testimonials.length) % testimonials.length;

            // For a smooth 3-card stack, if we only have 3 items, index 2 will act as the "furthest back".
            const isVisible = relativeIndex < 3;

            // Calculate transforms based on position in stack
            const translateY =
              relativeIndex === 0 ? 0 : relativeIndex === 1 ? -24 : -48;
            const scale =
              relativeIndex === 0 ? 1 : relativeIndex === 1 ? 0.95 : 0.9;
            const zIndex = 30 - relativeIndex * 10;
            const opacity =
              relativeIndex === 0 ? 1 : relativeIndex === 1 ? 0.5 : 0.2;

            if (!isVisible) return null;

            return (
              <div
                key={testimonial.id}
                className="absolute w-full rounded-2xl p-8 md:p-12 transition-all duration-500 ease-in-out"
                style={{
                  background:
                    "linear-gradient(135deg, #aedef4 0%, #89c5e3 100%)", // Light blue gradient matching screenshot
                  transform: `translateY(${translateY}px) scale(${scale})`,
                  zIndex,
                  opacity,
                  boxShadow:
                    relativeIndex === 0
                      ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                      : "none",
                }}
              >
                {/* Quote Icon */}
                <div className="absolute top-8 left-8 text-[#5a8ea8] text-6xl leading-none font-serif opacity-40">
                  "
                </div>

                <div className="relative z-10 pt-2">
                  <p className="text-gray-900 text-lg md:text-xl font-medium leading-relaxed mb-10 text-left">
                    {testimonial.text}
                  </p>

                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                    />
                    <div className="flex flex-col">
                      <span className="text-gray-900 font-bold text-base">
                        {testimonial.name}
                      </span>
                      <span className="text-gray-700 font-medium text-sm">
                        {testimonial.title}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6 mt-16">
          <button
            onClick={prevTestimonial}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/50 hover:text-white transition-colors border border-white/5"
            aria-label="Previous testimonial"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? "w-6 bg-[#A5D8F2]" : "w-1.5 bg-white/20"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="w-10 h-10 rounded-full bg-[#A5D8F2] hover:bg-[#8cc3df] flex items-center justify-center text-gray-900 transition-colors"
            aria-label="Next testimonial"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
