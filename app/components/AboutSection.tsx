"use client";

import { TypeAnimation } from "react-type-animation";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-20 z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-16 w-full">
        {/* Left Column - Text Content */}
        <div className="flex-1 flex flex-col items-start w-full md:pr-10">
          <div className="inline-block relative w-full xl:max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-left text-white">
              <span className="text-white">Hello I&apos;m</span>
              {" "}
              <span className="inline-block min-h-[1.2em] min-w-[14ch] text-[#A5D8F2] [&_*]:text-[#A5D8F2]">
                <TypeAnimation
                  sequence={[
                    "Tanishka Rana",
                    3000,
                    "",
                    1500,
                  ]}
                  wrapper="span"
                  className="text-[#A5D8F2]"
                  speed={50}
                  deletionSpeed={40}
                  cursor={true}
                  repeat={Infinity}
                />
              </span>
            </h1>

            <p className="mt-6 text-gray-300 text-base md:text-lg max-w-xl leading-relaxed text-left">
              A Data Analyst who turns complex real-time data into actionable business intelligence. I specialize in building end-to-end analytics solutions—from engineering Python ETL pipelines to designing advanced Power BI dashboards. Currently focused on real-time environmental monitoring and global market trends.
            </p>
          </div>

          <Link
            href="/about"
            className="mt-10 px-8 py-3.5 rounded-full border border-[#A5D8F2] text-white font-medium hover:bg-[#A5D8F2] hover:text-[#0a0a0f] transition-all duration-300 flex items-center gap-3 group"
          >
            <span className="text-base">More About me</span>
            <span className="text-xl leading-none group-hover:translate-x-1 transition-transform">
              &rarr;
            </span>
          </Link>
        </div>

        {/* Right Column - Image */}
        <div className="flex-1 w-full flex justify-center md:justify-end mt-16 md:mt-0 relative">
          <div className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[340px] md:h-[340px] flex items-center justify-center overflow-visible">
            {/* Light Blue Circle Backdrop */}
            <div className="absolute inset-0 bg-[#A5D8F2] rounded-full shadow-2xl"></div>

            {/* Avatar Image - scaled to pop out of circle */}
            <img
              src="/avatar2.png"
              alt="Tanishka Rana"
              className="relative z-10 w-full h-auto object-contain object-center drop-shadow-2xl"
              style={{ transform: "scale(1.55, 1.62) translateY(-4%)" }}
              draggable={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
