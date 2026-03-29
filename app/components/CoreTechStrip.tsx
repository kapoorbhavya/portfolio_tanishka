"use client";

export default function CoreTechStrip() {
  const technologies = [
    { name: "Python", icon: "🐍" },
    { name: "SQL", icon: "🗄️" },
    { name: "Power BI", icon: "📊" },
    { name: "Pandas", icon: "🐼" },
    { name: "PostgreSQL", icon: "🔵" },
    { name: "MySQL", icon: "🐬" },
    { name: "MongoDB", icon: "🍃" },
    { name: "Excel", icon: "📈" },
    { name: "NumPy", icon: "🔢" },
    { name: "GitHub", icon: "github" },
    { name: "Jupyter", icon: "📓" },
    { name: "DAX", icon: "⚡" },
    { name: "Scikit-learn", icon: "🤖" },
    { name: "Tableau", icon: "📉" },
    { name: "C++", icon: "⚙️" },
    { name: "Java", icon: "☕" },
    { name: "DSA", icon: "🏗️" },
    { name: "EDA", icon: "🔍" },
    { name: "ML", icon: "🧠" },
    { name: "API", icon: "🔌" },
    { name: "GenAI", icon: "✨" },
  ];

  // Duplicate the array for seamless looping
  const loopedTechs = [...technologies, ...technologies];

  return (
    <section className="relative w-full py-16 z-10 overflow-hidden bg-gradient-to-b from-transparent via-[#030303]/50 to-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-center text-sm md:text-base font-medium text-[#A5D8F2] tracking-[0.2em] uppercase mb-12">
          Core Technologies
        </h3>

        {/* Scrolling Container */}
        <div className="relative overflow-hidden">
          <div
            className="flex gap-8 md:gap-12 animate-scroll"
            style={{
              animation: "scroll 20s linear infinite",
            }}
          >
            {loopedTechs.map((tech, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-3 min-w-fit px-4 py-3 rounded-lg border border-transparent hover:border-[#A5D8F2]/60 hover:bg-[#A5D8F2]/10 hover:tech-skill-hover transition-all duration-300 cursor-pointer"
              >
                {tech.icon === "github" ? (
                  <svg
                    className="w-12 h-12 md:w-14 md:h-14 fill-gray-300 hover:fill-white transition-colors"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                ) : (
                  <span className="text-4xl md:text-5xl">{tech.icon}</span>
                )}
                <span className="text-xs md:text-sm font-medium text-gray-300 whitespace-nowrap">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
