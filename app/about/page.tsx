"use client";

import BackgroundFX from "@/app/components/background/BackgroundFX";
import AboutBentoGrid from "@/app/components/about/AboutBentoGrid";
import CTASection from "@/app/components/CTASection";
import { motion } from "framer-motion";


export default function AboutPage() {
  return (
    <div className="relative min-h-screen text-white font-sans selection:bg-[#a1c4df] selection:text-[#0a0a0f] bg-[#030303]">
      <BackgroundFX />

      <div className="relative z-20 w-full about-page-content">
        {/* Get to Know Me Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-[920px] mx-auto px-3 sm:px-5 md:px-6 pt-24 md:pt-32 pb-12 relative"
        >
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              whileHover={{ y: -8, boxShadow: "0 25px 50px rgba(165, 216, 242, 0.4)" }}
              className="inline-block mb-6 px-5 py-3 rounded-3xl border backdrop-blur-2xl hover:border-[#A5D8F2]/80 transition-all duration-500 shadow-lg hover:shadow-2xl relative group"
              style={{
                background: "linear-gradient(135deg, rgba(10, 26, 63, 0.5) 0%, rgba(20, 45, 90, 0.3) 100%)",
                boxShadow: "0 8px 32px 0 rgba(165, 216, 242, 0.2), inset 0 1.5px 0 rgba(232, 244, 255, 0.4), inset 0 -1px 0 rgba(165, 216, 242, 0.2), 0 0 40px rgba(165, 216, 242, 0.1)",
                border: "1.5px solid transparent",
                backgroundImage: "linear-gradient(135deg, rgba(10, 26, 63, 0.5) 0%, rgba(20, 45, 90, 0.3) 100%), linear-gradient(135deg, rgba(165, 216, 242, 0.4) 0%, rgba(165, 216, 242, 0.1) 100%)",
                backgroundClip: "padding-box, border-box",
                backgroundOrigin: "padding-box, border-box",
                backdropFilter: "blur(25px) brightness(1.15) contrast(1.1)",
              }}
            >
              {/* Top shine overlay */}
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl bg-gradient-to-r from-transparent via-[#E8F4FF] to-transparent opacity-50 pointer-events-none"></div>
              
              {/* Corner decoration */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#A5D8F2]/60 rounded-tl-2xl"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#A5D8F2]/60 rounded-br-2xl"></div>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#A5D8F2]/0 via-[#A5D8F2]/10 to-[#A5D8F2]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <h1
                className="text-4xl sm:text-5xl md:text-5xl font-black tracking-tight leading-tight text-[#E8F4FF] relative z-10 flex items-center justify-center"
                style={{
                  fontFamily: "'Times New Roman', Times, serif",
                  fontWeight: 900,
                  letterSpacing: "0.08em",
                  textShadow: "0 0 30px rgba(232, 244, 255, 0.6), 0 0 60px rgba(165, 216, 242, 0.4)",
                }}
              >
                <div className="about-heading-static">GET</div>
                <div className="about-heading-slide"><span>&nbsp;TO KNOW ME</span></div>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 text-lg md:text-2xl max-w-2xl leading-relaxed font-light"
              style={{
                fontFamily: "'Playfair Display', 'Georgia', serif",
                color: "#FFFB9A",
              }}
            >
              About Me
            </motion.p>
          </div>
        </motion.div>

        <AboutBentoGrid />
        <CTASection />
      </div>
    </div>
  );
}
