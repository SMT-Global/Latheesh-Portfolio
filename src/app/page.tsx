import { portfolioData, Project, Experience, Skill, Education } from "@/data/portfolio";
import ResumeSection from "@/components/ResumeSection";
import HeaderNav from "@/components/HeaderNav";
import { getOverrides, getResumeUrl } from "@/lib/store";

export default async function Home() {
  const overrides = await getOverrides();
  const resumeUrl = await getResumeUrl();

  const personal = { ...portfolioData.personal, ...overrides.personal };
  const experience = (overrides.experience as unknown as Experience[]) || portfolioData.experience;
  const projects = (overrides.projects as unknown as Project[]) || portfolioData.projects;
  const skills = (overrides.skills as unknown as Skill[]) || portfolioData.skills;
  const education = (overrides.education as unknown as Education[]) || portfolioData.education;

  const enhancedProjects = projects.map((p) => {
    let image = p.image || "/concrete.jpg";
    // Fallback logic for existing hardcoded images to not break them immediately
    if (!p.image) {
      if (p.id === "proj-1") image = "/wunsch-twin.jpg";
      else if (p.id === "proj-2") image = "/ps-281.jpg";
      else if (p.id === "proj-3") image = "/bronx-garage.jpg";
      else if (p.id === "proj-4") image = "/project_controls.jpg";
      else if (p.id === "proj-5") image = "/biophilic.jpg";
      else if (p.id === "proj-6") image = "/heritage_doc.jpg";
    }
    return { ...p, image };
  });

  return (
    <main className="min-h-screen">
      
      {/* HEADER */}
      <HeaderNav />

      {/* HERO SECTION */}
      <section id="home" className="min-h-screen flex items-center pt-[140px] px-[7%] pb-[80px]">
        <div className="max-w-[900px]">
          <p className="eyebrow">{personal.eyebrow || "Digital Twins • Architecture • BIM"}</p>
          <h1 className="text-[clamp(4rem,12vw,10rem)] leading-[0.9] tracking-[-0.08em] mb-[28px] font-display font-medium text-[#151515]">
            Latheesh Reddy
          </h1>
          <p className="text-[clamp(1.2rem,3vw,2rem)] text-[#222222] mb-[24px] font-display">
            {personal.subtitle || "Construction Management • Digital Twins • Infrastructure"}
          </p>
          <p className="max-w-[680px] text-[#6f6f6f] text-[1.1rem] mb-[24px]">
            {personal.tagline}
          </p>

          <div className="flex gap-[12px] flex-wrap mb-[36px]">
            <span className="border border-[#dedbd3] bg-white/45 px-[14px] py-[9px] rounded-full text-[#6f6f6f] text-[0.9rem]">
              {personal.location}
            </span>
            <span className="border border-[#dedbd3] bg-white/45 px-[14px] py-[9px] rounded-full text-[#6f6f6f] text-[0.9rem]">
              NYU Tandon School of Engineering
            </span>
          </div>

          <div className="flex gap-[14px] flex-wrap">
            <a href="#projects" className="btn primary">View Projects</a>
            <a href="#resume" className="btn secondary">View Résumé</a>
            <a href="#contact" className="btn secondary">Contact</a>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="pt-[110px] pb-[110px] px-[7%]">
        <div className="max-w-[760px] mb-[56px] section-heading">
          <p className="eyebrow">Selected Works</p>
          <h2 className="font-display font-medium text-[#151515]">Digital Twins & BIM</h2>
          <p className="text-[#6f6f6f] text-[1.05rem]">
            Selected works exploring building information modeling, digital twin infrastructure, 
            construction scheduling, and structural documentation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[28px]">
          {enhancedProjects.map((project, idx) => (
            <article 
              key={project.id}
              className={`bg-white border border-[#dedbd3] rounded-[24px] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(0,0,0,0.08)] group ${idx === 0 ? "md:col-span-3 md:grid md:grid-cols-[1.35fr_0.9fr]" : ""}`}
            >
              <div className={`flex items-center justify-center text-[#6f6f6f] text-[0.9rem] overflow-hidden ${idx === 0 ? "h-full min-h-[300px] md:min-h-[430px]" : "h-[260px]"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className={`p-[28px] ${idx === 0 ? "md:p-[38px] flex flex-col justify-center" : ""}`}>
                <p className="text-[#9b7a4f] text-[0.8rem] uppercase tracking-[0.12em] mb-[12px] font-bold">
                  {project.category}
                </p>
                <h3 className={`font-display mb-[14px] tracking-[-0.03em] text-[#151515] font-medium ${idx === 0 ? "text-[clamp(2rem,4vw,3.4rem)] leading-none" : "text-[1.5rem]"}`}>
                  {project.title}
                </h3>
                <p className="text-[#6f6f6f] mb-[12px] leading-relaxed">
                  {project.description}
                </p>
                <p className="text-[#151515] text-[0.9rem] mt-4">
                  <strong>Tools:</strong> {project.tools.join(", ")}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ABOUT & EXPERIENCE SECTION */}
      <section id="about" className="py-[110px] px-[7%]">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-[60px] items-start border-t border-b border-[#dedbd3] py-[110px]">
          <div>
            <p className="eyebrow">Experience</p>
            <h2 className="font-display text-[clamp(2.2rem,5vw,4.5rem)] leading-none tracking-[-0.06em] mb-[22px] text-[#151515] font-medium">
              Field execution and digital integration.
            </h2>
          </div>
          <div className="flex flex-col gap-12">
            {experience.map((exp) => (
              <div key={exp.id} className="relative">
                <div className="text-[#9b7a4f] text-[0.8rem] uppercase tracking-[0.12em] mb-2 font-bold">{exp.period}</div>
                <h3 className="text-[1.5rem] font-display font-medium text-[#151515] mb-1">{exp.role}</h3>
                <div className="text-[#6f6f6f] mb-4">{exp.company}</div>
                {(exp as any).image && (
                  <div className="mb-6 w-full h-[200px] md:h-[300px] overflow-hidden rounded-[16px] border border-[#dedbd3]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={(exp as any).image} alt={exp.company} className="w-full h-full object-cover" />
                  </div>
                )}
                <ul className="flex flex-col gap-2">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="text-[#6f6f6f] flex items-start gap-3 text-[0.95rem] leading-relaxed">
                      <span className="text-[#dedbd3] mt-1">-</span>
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION SECTION (DARK MODE) */}
      <section id="education" className="bg-[#151515] text-white py-[110px] px-[7%]">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-[60px] items-start border-t border-b border-white/20 py-[110px]">
          <div>
            <p className="eyebrow" style={{ color: "rgba(255,255,255,0.5)" }}>Education</p>
            <h2 className="font-display text-[clamp(2.2rem,5vw,4.5rem)] leading-none tracking-[-0.06em] mb-[22px] font-medium">
              Academic Foundation.
            </h2>
          </div>
          <div className="flex flex-col gap-12">
            {education.map((edu) => (
              <div key={edu.id} className="relative">
                <div className="text-[#9b7a4f] text-[0.8rem] uppercase tracking-[0.12em] mb-2 font-bold">{edu.period}</div>
                <h3 className="text-[1.5rem] font-display font-medium mb-1">{edu.degree}</h3>
                <div className="text-white/70 mb-4">{edu.institution}</div>
                <ul className="flex flex-col gap-2">
                  <li className="text-white/70 flex items-start gap-3 text-[0.95rem] leading-relaxed">
                    <span className="text-white/30 mt-1">-</span>
                    Location: {edu.location}
                  </li>
                  <li className="text-white/70 flex items-start gap-3 text-[0.95rem] leading-relaxed">
                    <span className="text-white/30 mt-1">-</span>
                    GPA: {edu.gpa}
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-[80px] px-[7%]">
        <div className="max-w-[760px] mb-[40px] section-heading">
          <p className="eyebrow">Capabilities</p>
          <h2 className="font-display font-medium text-[#151515]">Skills & Tools</h2>
        </div>

        <div className="flex flex-col gap-[32px]">
          <div>
            <h3 className="font-display text-[1.5rem] font-medium text-[#151515] mb-[16px] border-b border-[#dedbd3] pb-2">Technical Skills</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[10px]">
              {skills.filter(s => s.category === 'technical').map(skill => (
                <div key={skill.id} className="p-[12px] bg-white border border-[#dedbd3] rounded-[12px] text-[#6f6f6f] text-[0.9rem]">
                  {skill.name}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-[1.5rem] font-medium text-[#151515] mb-[16px] border-b border-[#dedbd3] pb-2">Core Competencies</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[10px]">
              {skills.filter(s => s.category === 'competency').map(skill => (
                <div key={skill.id} className="p-[12px] bg-white border border-[#dedbd3] rounded-[12px] text-[#6f6f6f] text-[0.9rem]">
                  {skill.name}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-[1.5rem] font-medium text-[#151515] mb-[16px] border-b border-[#dedbd3] pb-2">Certifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[10px]">
              {skills.filter(s => s.category === 'certification').map(skill => (
                <div key={skill.id} className="p-[12px] bg-[#222222] text-white rounded-[12px] text-[0.9rem] font-medium flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#9b7a4f]"></div>
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ResumeSection resumeUrl={resumeUrl} />


      {/* CONTACT SECTION */}
      <section id="contact" className="py-[110px] px-[7%] max-w-[850px]">
        <p className="eyebrow">Contact</p>
        <h2 className="font-display text-[clamp(2.2rem,5vw,4.5rem)] leading-none tracking-[-0.06em] mb-[22px] text-[#151515] font-medium">Let&apos;s connect.</h2>
        <p className="text-[#6f6f6f] text-[1.05rem]">
          For work, collaboration, internship, or portfolio enquiries, feel free to get in touch.
        </p>

        <div className="flex gap-[20px] flex-wrap mt-[28px]">
          <a href={`mailto:${personal.email}`} className="text-[#9b7a4f] font-bold border-b border-transparent hover:border-[#9b7a4f] transition-colors">{personal.email}</a>
          {personal.phone && (
            <a href={`tel:${personal.phone}`} className="text-[#9b7a4f] font-bold border-b border-transparent hover:border-[#9b7a4f] transition-colors">{personal.phone}</a>
          )}
          <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#9b7a4f] font-bold border-b border-transparent hover:border-[#9b7a4f] transition-colors">LinkedIn</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-[32px] px-[7%] border-t border-[#dedbd3] text-[#6f6f6f] text-[0.9rem] flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <p>© {new Date().getFullYear()} {personal.name} - Construction Management & BIM Portfolio</p>
        <p>
          Designed & Developed by{" "}
          <a 
            href="https://noobacker.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[#151515] font-semibold hover:text-[#9b7a4f] transition-colors underline decoration-2 underline-offset-4"
          >
            Noobacker
          </a>
        </p>
      </footer>

    </main>
  );
}
