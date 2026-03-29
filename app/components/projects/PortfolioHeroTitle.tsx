"use client";

export default function PortfolioHeroTitle() {
  return (
    <div className="flex items-center justify-center">
      <div className="group relative inline-flex items-center justify-center cursor-pointer">
        {/* glassy shimmer overlay — fades in on hover */}
        <div
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(165,216,242,0.10) 40%, transparent 65%)",
            backdropFilter: "blur(3px)",
            WebkitBackdropFilter: "blur(3px)",
          }}
        />
        {/* outer glow ring — appears on hover */}
        <div
          className="pointer-events-none absolute inset-0 z-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ boxShadow: "0 0 40px rgba(165,216,242,0.25), 0 0 80px rgba(165,216,242,0.10)" }}
        />
        <img
          src="/Gemini_Generated_Image_pnuxy5pnuxy5pnux-removebg-preview.png"
          alt="Portfolio"
          className="relative z-20 w-auto object-contain transition-transform duration-300 ease-out group-hover:scale-[1.06] group-hover:-translate-y-1"
          style={{ maxHeight: "clamp(8rem, 22vw, 16rem)" }}
        />
      </div>
    </div>
  );
}
