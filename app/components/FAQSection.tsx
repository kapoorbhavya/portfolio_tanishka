"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What types of projects do you take on?",
    answer:
      "I primarily focus on data engineering, analytics dashboards, machine learning models, and business intelligence solutions. Whether it's building ETL pipelines, analyzing complex datasets, or creating interactive PowerBI dashboards, I'm passionate about turning raw data into actionable insights.",
  },
  {
    question: "Which technologies do you prefer?",
    answer:
      "My tech stack revolves around Python, SQL, and Power BI for analytics and visualization. I work extensively with PostgreSQL, Excel for data transformation, and leverage ML libraries for predictive analysis. I'm also experienced with open APIs and modern data platforms.",
  },
  {
    question: "How quickly can we get started?",
    answer:
      "For most data projects, we can typically begin within 1-2 weeks depending on data availability and project scope. Smaller analytics tasks can often be turned around faster.",
  },
  {
    question: "What does your engagement model look like?",
    answer:
      "I offer both project-based fixed pricing and hourly consulting models, depending on what best suits the scope and timeline of the work.",
  },
  {
    question: "Do you stay involved post-launch?",
    answer:
      "Yes! I offer ongoing maintenance and support for dashboards and data systems to ensure they remain accurate, optimized, and aligned with evolving business needs.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="relative w-full py-24 z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Left - Heading & Text */}
        <div className="flex-1 flex flex-col items-start w-full">
          <div className="px-4 py-1.5 rounded-full border border-white/10 text-xs font-medium text-gray-400 tracking-[0.2em] uppercase mb-8">
            FAQS
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-[#ccebf9] tracking-tight leading-[1.2] mb-6">
            Answers to the questions
            <br className="hidden lg:block" /> clients ask the most.
          </h2>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-md mb-10">
            Transparent communication is part of the work. If you don't find
            what you're looking for here, feel free to reach out and I'll share
            more details about process, pricing, or code samples.
          </p>

          <button className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-gray-600 text-white font-medium hover:bg-white/5 transition-all flex items-center justify-center gap-2 group">
            <span className="text-sm tracking-wide">Ask a question</span>
            <span className="text-lg leading-none group-hover:translate-x-1 transition-transform">
              &rarr;
            </span>
          </button>
        </div>

        {/* Right - Accordion */}
        <div className="flex-1 w-full relative pt-8 lg:pt-0">
          <div className="w-full border border-white/10 rounded-3xl overflow-hidden bg-[#0A0B10]/60 p-6 lg:p-8 shadow-2xl">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`w-full border-b border-white/5 last:border-b-0`}
                >
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full py-6 flex items-center justify-between text-left group"
                  >
                    <span
                      className={`text-base md:text-lg font-medium transition-colors ${isOpen ? "text-white" : "text-[#ccebf9]"}`}
                    >
                      {faq.question}
                    </span>
                    <span className="ml-4 text-gray-500 group-hover:text-white transition-colors">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100 mb-6" : "max-h-0 opacity-0"}`}
                  >
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed pr-8">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
