"use client";

import CTASection from "@/app/components/CTASection";


const CARDS = [
  {
    title: "Data Engineering",
    desc: "SQL, Python, ETL fundamentals, orchestration basics.",
    tags: ["SQL", "Python", "ETL", "Airflow"],
  },
  {
    title: "Machine Learning",
    desc: "Model training, evaluation, and practical ML experimentation.",
    tags: ["Scikit-Learn", "TensorFlow", "PyTorch", "Gemini API"],
  },
  {
    title: "Data Visualization & BI",
    desc: "Dashboards and storytelling that drive action.",
    tags: ["Power BI", "Tableau", "Matplotlib", "Seaborn"],
  },
  {
    title: "Cloud & Tools",
    desc: "Cloud fundamentals and developer tooling for shipping.",
    tags: ["AWS/GCP basics", "Docker", "Git", "Jupyter"],
  },
  {
    title: "AI Exploration",
    desc: "Learning RAG, vector search, and prompting patterns.",
    tags: ["RAG basics", "Vector DBs", "Prompting", "Agents"],
  },
  {
    title: "Soft Skills",
    desc: "Clear communication and strong execution habits.",
    tags: ["Writing", "Collaboration", "Problem Solving", "Ownership"],
  },
];

export default function ExpertisePage() {
  return (
    <main className="min-h-screen bg-[#030303] px-8 md:px-16 pt-28 pb-32">
      <div className="max-w-6xl mx-auto">
        <div className="gsap-fade-in mb-10"
        >
          <p className="text-white/50 text-sm tracking-widest uppercase mb-3">Expertise</p>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            Engineering Expertise
          </h1>
          <p className="text-white/60 mt-3 max-w-2xl">
            A bento-style snapshot of what I'm building toward — optimized for recruiter scanning.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {CARDS.map((c, i) => (
            <div 
              key={c.title}
             
             
             
              className="group relative rounded-3xl border border-white/10 bg-[#000000]/80 backdrop-blur-sm p-7 hover:border-white/30 hover:-translate-y-1 transition-all"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl bg-[radial-gradient(circle_at_30%_20%,rgba(184,216,248,0.12),transparent_55%)]" />
              <div className="relative">
                <h3 className="text-2xl font-bold mb-2">{c.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">{c.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-white/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CTASection />
    </main>
  );
}
