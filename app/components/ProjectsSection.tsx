import Link from "next/link";

export default function ProjectsSection() {
  const GH = "https://github.com/Tanishka-Rana-1";
  const projects = [
    {
      title: "Indian Weather Intelligence",
      description:
        "Built an end-to-end monitoring system processing 17+ parameters across 296+ cities using Python ETL pipelines and PostgreSQL.",
      image: "/projectimages/project1.jpg",
      tags: ["DATA PIPELINE", "ANALYTICS"],
      tech: ["Open-Meteo API", "Python", "PostgreSQL", "DAX", "Power BI"],
      liveUrl: "https://drive.google.com/file/d/1FnmFPQq_Myd16KVVA6GPtlZHkb2aKEXG/view?usp=sharing",
      repoUrl: `${GH}/GlobalWeatherIntelligence`,
    },
    {
      title: "LinkedIn Job Market Analysis",
      description:
        "Normalized and analyzed 124,000+ LinkedIn postings to deliver granular experience–salary correlations and skill frequency analysis.",
      image: "/projectimages/project2.png",
      tags: ["DATA ANALYSIS", "INSIGHTS"],
      tech: ["Excel", "Python", "SQL", "Power BI"],
      liveUrl: "https://drive.google.com/file/d/16VXrdESDPttGQlCU_wkNSOUjKmhPofZF/view?usp=drive_link",
      repoUrl: `${GH}/LinkedinMarketIntelligence`,
    },
  ];

  return (
    <section className="relative w-full py-24 z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
        {/* Header content */}
        <div className="text-center mb-16 relative w-full flex flex-col items-center">
          <p className="text-gray-400 text-xs tracking-[0.3em] font-medium uppercase mb-4">
            Selected Work
          </p>
          <div className="relative inline-flex items-center justify-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              Latest Projects
            </h2>
          </div>
          <p className="mt-6 text-gray-400 text-sm md:text-base max-w-2xl text-center leading-relaxed">
            A curated snapshot of recent builds focused on clean UI, resilient
            architecture, and measurable product impact.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {projects.map((project, idx) => (
            <div key={idx} className="flex flex-col rounded-3xl overflow-hidden bg-[#131521]/45 border border-[#A5D8F2]/40 transition-all duration-300 hover:border-[#A5D8F2] hover:-translate-y-2 hover:project-card-glow">
              {/* Project Image Area */}
              <div className="w-full h-64 md:h-80 relative overflow-hidden flex items-center justify-center bg-gray-800">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#131521] via-transparent to-transparent opacity-80" />
              </div>

              {/* Project Content */}
              <div className="flex flex-col flex-1 p-8 sm:p-10">
                <div className="flex items-center gap-3 mb-6">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-4 py-1.5 rounded-full border border-white/10 text-xs font-medium text-gray-300 tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                  {project.title}
                </h3>

                <p className="text-[#A5D8F2] text-sm md:text-base leading-relaxed mb-8 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-10">
                  {project.tech.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 mt-auto">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/5 transition-all text-center"
                  >
                    Live Preview
                  </a>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/5 transition-all text-center"
                  >
                    View Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects CTA Button */}
        <div className="mt-20 flex justify-center">
          <Link
            href="/projects"
            className="relative group px-10 py-4 rounded-full bg-gradient-to-r from-[#A5D8F2] to-[#7bc5f5] text-[#0a0a0f] font-bold text-base hover:shadow-xl hover:shadow-[#A5D8F2]/40 transition-all duration-500 flex items-center gap-3 inline-flex hover:scale-105"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#A5D8F2] to-[#7bc5f5] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
            
            <span className="relative tracking-wide">View All Projects</span>
            <span className="relative text-lg leading-none group-hover:translate-x-2 transition-transform duration-300">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
