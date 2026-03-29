export default function DeliverSection() {
  const cards = [
    {
      title: "Scalable Web\nSystems",
      description:
        "High-performance applications built for growth and long-term maintainability.",
      tags: [
        "TypeScript",
        "Next.js",
        "Supabase",
        "Headless-CMS",
        "TailwindCSS",
        "Framer",
        "PostgreSQL",
        "Vercel",
      ],
      highlight: false,
    },
    {
      title: "Gen AI\nIntegration",
      description:
        "Harnessing the power of AI to create intelligent, responsive, and personalized user experiences.",
      tags: [
        "OpenAI",
        "Gemini",
        "RAG",
        "Vector DBs",
        "Pinecone",
        "n8n",
        "LangChain",
        "Groq",
        "MCP",
      ],
      highlight: true,
    },
    {
      title: "Performance\nOptimization",
      description:
        "Ensuring lightning-fast load times and smooth interactions for an exceptional user experience.",
      tags: [
        "Core Web Vitals",
        "Lighthouse",
        "Caching",
        "Edge CDN",
        "Lazy Loading",
        "SEO",
      ],
      highlight: false,
    },
  ];

  return (
    <section className="relative w-full py-24 z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
        {/* Header content */}
        <div className="text-center mb-16 relative w-full flex justify-center">
          <div className="relative inline-flex items-center justify-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#fafafa] tracking-tight">
              What I Deliver
            </h2>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="flex flex-col rounded-3xl p-8 border border-white/5 bg-[#0a0a0f] hover:border-white/10 transition-all min-h-[500px]"
            >
              <h3 className="text-3xl font-semibold text-[#fafafa] mb-6 whitespace-pre-line leading-tight">
                {card.title}
              </h3>

              <p className="text-gray-500 text-base leading-relaxed mb-10">
                {card.description}
              </p>

              <div className="flex flex-wrap gap-3 mb-12">
                {card.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      card.highlight
                        ? "bg-[#ccebf9] text-[#0a0a0f]"
                        : "bg-transparent border border-white/10 text-gray-300"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex justify-center">
                <button className="px-6 py-3 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/5 transition-all flex items-center gap-2">
                  <span>Explore Details</span>
                  <svg
                    width="16"
                    height="16"
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
          ))}
        </div>
      </div>
    </section>
  );
}
