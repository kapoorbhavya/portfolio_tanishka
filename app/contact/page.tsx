"use client";

import { useRef, useState } from "react";
import BackgroundFX from "@/app/components/background/BackgroundFX";
import MouseTracer from "@/app/components/MouseTracer";
import { Mail, Clock, MapPin } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const TAGS = ["Data Strategy", "ETL Pipelines", "ML Integrations", "BI Dashboards"];

// ✅ Replace "YOUR_FORM_ID" with your actual Formspree form ID
// Get your free form ID at: https://formspree.io
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mpqoapkj";

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useGSAP(
    () => {
      gsap.from(headerRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
      gsap.from(leftColRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });
      gsap.from(rightColRef.current, {
        x: 50,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setFormStatus("sent");
        form.reset(); // Clear the form fields after successful submission
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <main
      ref={containerRef}
      className="relative bg-black text-white min-h-screen selection:bg-[#a1c4df] selection:text-[#0a0a0f] flex flex-col overflow-x-hidden"
    >
      {/* Starry background */}
      <BackgroundFX />
      <MouseTracer />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 md:px-8 pt-32 pb-44 flex flex-col items-center">

        {/* ── PAGE HEADER ── */}
        <div
          ref={headerRef}
          className="text-center mb-16 max-w-2xl flex flex-col items-center"
        >
          <p className="text-gray-400 text-[10px] tracking-[0.35em] font-semibold uppercase mb-5">
            Contact
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-tight tracking-tight text-[#ccebf9] mb-5">
            Let&apos;s Start Something Remarkable
          </h1>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            Tell me about your data vision, timeline, and goals. I&apos;ll
            respond with clear next steps and a plan that fits your momentum.
          </p>
        </div>

        {/* ── CONTENT GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

          {/* ── LEFT COLUMN ── */}
          <div ref={leftColRef} className="flex flex-col gap-6">

            {/* COLLABORATION CARD */}
            <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-[2rem] p-8 flex flex-col items-start shadow-2xl">
              <p className="text-gray-500 text-[10px] tracking-[0.25em] font-semibold uppercase mb-4">
                Collaboration
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-tight">
                Let&apos;s build<br />together.
              </h2>

              {/* 3D-style envelope icon */}
              <div className="relative w-full flex justify-center mb-8">
                <div className="w-[180px] h-[160px] relative flex justify-center items-center">
                  {/* glow behind icon */}
                  <div className="absolute inset-0 bg-[#A5D8F2]/15 rounded-full blur-2xl" />
                  <img
                    src="https://iamasadshah-ibnerafi.vercel.app/_next/image?url=%2Fcontact-icon.png&w=640&q=75"
                    alt="3D envelope icon"
                    className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_30px_rgba(165,216,242,0.35)]"
                    onError={(e) => {
                      const wrapper = e.currentTarget.parentElement!;
                      e.currentTarget.remove();
                      const fallback = document.createElement("div");
                      fallback.className =
                        "relative z-10 flex items-center justify-center w-28 h-28 rounded-full bg-[#A5D8F2]/10 border border-[#A5D8F2]/20";
                      fallback.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#A5D8F2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`;
                      wrapper.appendChild(fallback);
                    }}
                  />
                </div>
              </div>

              <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-7">
                I bridge the gap between raw data and intelligent systems —
                crafting scalable, performance-driven analytics with clarity and
                care.
              </p>

              <div className="flex flex-wrap gap-2">
                {TAGS.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[11px] md:text-xs text-gray-300 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* DIRECT LINE CARD */}
            <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-[2rem] p-8 shadow-2xl">
              <p className="text-gray-500 text-[10px] tracking-[0.25em] font-semibold uppercase mb-7">
                Direct Line
              </p>
              <div className="flex flex-col gap-6">

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 shrink-0">
                    <Mail size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-[10px] tracking-widest uppercase mb-1">
                      Email
                    </span>
                    <a
                      href="mailto:ranatanishka2005@gmail.com"
                      className="text-white text-sm md:text-base font-medium hover:text-[#ccebf9] transition-colors"
                    >
                      ranatanishka2005@gmail.com
                    </a>
                  </div>
                </div>

                {/* Response */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 shrink-0">
                    <Clock size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-[10px] tracking-widest uppercase mb-1">
                      Response
                    </span>
                    <span className="text-white text-sm md:text-base font-medium">
                      Within 24 hours
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-[10px] tracking-widest uppercase mb-1">
                      Location
                    </span>
                    <span className="text-white text-sm md:text-base font-medium">
                      Palampur, HP &bull; Remote
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN – FORM ── */}
          <div
            ref={rightColRef}
            className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-[2rem] p-8 md:p-10 shadow-2xl flex flex-col"
          >
            <p className="text-gray-500 text-[10px] tracking-[0.25em] font-semibold uppercase mb-4">
              Project Details
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Send your message
            </h2>
            <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed">
              Share goals, timelines, and any constraints. I&apos;ll respond
              with a clear plan and next steps.
            </p>

            <form className="flex flex-col flex-1 gap-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-gray-400 text-[10px] tracking-widest uppercase font-semibold"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Your full name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all text-sm"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-gray-400 text-[10px] tracking-widest uppercase font-semibold"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="you@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label
                  htmlFor="message"
                  className="text-gray-400 text-[10px] tracking-widest uppercase font-semibold"
                >
                  Project Brief
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Tell me about your idea, timeline, and goals."
                  className="w-full min-h-[220px] md:flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all text-sm resize-y"
                />
              </div>

              {/* Error message */}
              {formStatus === "error" && (
                <p className="text-red-400 text-xs text-center">
                  Something went wrong. Please try again or email me directly.
                </p>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-5 pt-2 mt-auto">
                <p className="text-gray-500 text-xs flex-1 text-center sm:text-left">
                  By submitting, you agree to be contacted about your request.
                </p>
                <button
                  type="submit"
                  disabled={formStatus === "sending" || formStatus === "sent"}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-[#A5D8F2] text-white font-medium cta-button flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formStatus === "sending" ? (
                    <span className="text-sm animate-pulse">Sending…</span>
                  ) : formStatus === "sent" ? (
                    <span className="text-sm text-[#A5D8F2]">✓ Message Sent!</span>
                  ) : (
                    <span className="text-sm">Send Message</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 w-full text-center pb-28 pt-2">
        <p className="text-gray-600 text-xs tracking-wide">
          Built with{" "}
          <span className="text-red-400">❤️</span>{" "}
          by Tanishka Rana
        </p>
      </footer>
    </main>
  );
}