import Link from "next/link";
import { Github, Linkedin, Mail, ChevronUp, Settings, LucideIcon } from "lucide-react";

type SocialItem =
  | { kind: "icon"; Icon: LucideIcon; href: string; label: string }
  | { kind: "upwork"; href: string; label: string };

const SOCIAL_LINKS: SocialItem[] = [
  { kind: "icon", Icon: Github,   href: "https://github.com/Tanishka-Rana-1",              label: "GitHub"   },
  { kind: "icon", Icon: Mail,     href: "mailto:ranatanishka2005@gmail.com",                label: "Email"    },
  { kind: "icon", Icon: Linkedin, href: "https://www.linkedin.com/in/tanishka-rana2005/",  label: "LinkedIn" },
  { kind: "upwork",               href: "https://www.upwork.com/nx/search/talent/",         label: "Upwork"   },
];

const boxStyle: React.CSSProperties = {
  width: 48,
  height: 48,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 10,
  backgroundColor: "#a5d8ff",
  boxShadow: "0 4px 15px rgba(165,216,255,0.3)",
  transition: "background-color 0.2s ease, transform 0.2s ease",
  flexShrink: 0,
  color: "#001a33",
};

function SocialBox({ children, href, label }: { children: React.ReactNode; href: string; label: string }) {
  return (
    <Link
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      aria-label={label}
      style={boxStyle}
      onMouseEnter={e => {
        e.currentTarget.style.backgroundColor = "#8cc8ff";
        e.currentTarget.style.transform = "scale(1.07)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = "#a5d8ff";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {children}
    </Link>
  );
}

export default function GlobalNavigation() {
  return (
    <>
      {/* ── Social sidebar ── */}
      <div className="fixed left-8 md:left-10 bottom-24 md:bottom-32 z-[50] hidden md:flex flex-col items-center">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          {SOCIAL_LINKS.map((item) => {
            if (item.kind === "upwork") {
              return (
                <SocialBox key={item.label} href={item.href} label={item.label}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#001a33", letterSpacing: "-0.02em", userSelect: "none" }}>
                    up
                  </span>
                </SocialBox>
              );
            }
            const { Icon, href, label } = item;
            return (
              <SocialBox key={label} href={href} label={label}>
                <Icon size={22} fill="#001a33" color="#001a33" strokeWidth={0} />
              </SocialBox>
            );
          })}

          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div style={{ width: 1, height: 72, backgroundColor: "rgba(165,216,255,0.35)" }} />
            <ChevronUp size={16} fill="#a5d8ff" color="#a5d8ff" strokeWidth={0} />
          </div>
        </div>
      </div>

      {/* ── Top right CTA ── */}
      <div className="fixed top-8 right-6 md:right-10 z-[60] flex items-center gap-4">
        <Link
          href="/contact"
          className="cta-button cta-pulse inline-flex shrink-0 items-center gap-2 px-6 py-2.5 rounded-full border border-[#A5D8F2] bg-[rgba(15,15,20,0.6)] backdrop-blur-sm text-[#A5D8F2] text-sm tracking-wide font-medium"
        >
          <Settings size={18} className="opacity-90" aria-hidden />
          Start a Project
        </Link>
        <div
          className="hidden sm:block h-px w-16 md:w-28 bg-gradient-to-r from-white/25 to-transparent"
          aria-hidden
        />
      </div>
    </>
  );
}
