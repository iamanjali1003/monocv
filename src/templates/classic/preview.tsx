/**
 * Classic template preview component.
 * Renders the resume in a traditional ATS-friendly format.
 * Uses HTML/CSS for the live preview in the builder interface.
 */

"use client";

import type { Resume } from "@/lib/types";

interface PreviewProps {
  data: Resume;
}

export function ClassicPreview({ data }: PreviewProps) {
  const { personalInfo, education, experience, projects, skills } = data;

  const hasPersonalInfo = personalInfo.fullName || personalInfo.email || personalInfo.phone;
  const hasEducation = education.length > 0;
  const hasExperience = experience.length > 0;
  const hasProjects = projects.length > 0;
  const hasSkills = skills.languages || skills.frameworks || skills.tools || skills.libraries;

  const formatLink = (url: string | undefined, displayText: string) => {
    if (!url) return null;
    const cleanUrl = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-blue-600"
      >
        {displayText || cleanUrl}
      </a>
    );
  };

  return (
    <div className="w-full bg-white text-black font-serif text-[10px] sm:text-[11pt] leading-tight p-4 sm:p-6 md:p-8">
      {hasPersonalInfo && (
        <header className="text-center mb-2">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wide">
            {personalInfo.fullName || "Your Name"}
          </h1>
          <div className="flex flex-wrap justify-center gap-x-1 sm:gap-x-2 text-[9px] sm:text-sm mt-1">
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.phone && personalInfo.email && <span>|</span>}
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="underline">
                {personalInfo.email}
              </a>
            )}
            {personalInfo.linkedin && (
              <>
                <span>|</span>
                {formatLink(personalInfo.linkedin, "LinkedIn")}
              </>
            )}
            {personalInfo.github && (
              <>
                <span>|</span>
                {formatLink(personalInfo.github, "GitHub")}
              </>
            )}
            {personalInfo.portfolio && (
              <>
                <span>|</span>
                {formatLink(personalInfo.portfolio, "Portfolio")}
              </>
            )}
          </div>
        </header>
      )}

      {hasEducation && (
        <section className="mt-3 sm:mt-4">
          <h2 className="text-sm sm:text-base font-bold uppercase border-b border-black pb-0.5 mb-2">
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="font-bold text-[10px] sm:text-sm">{edu.school}</span>
                  <span className="text-[9px] sm:text-sm">{edu.location}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between text-[9px] sm:text-sm italic">
                  <span>
                    {edu.degree}
                    {edu.field && ` in ${edu.field}`}
                    {edu.gpa && `, GPA: ${edu.gpa}`}
                  </span>
                  <span>
                    {edu.startDate}
                    {edu.endDate && ` -- ${edu.endDate}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {hasExperience && (
        <section className="mt-3 sm:mt-4">
          <h2 className="text-sm sm:text-base font-bold uppercase border-b border-black pb-0.5 mb-2">
            Experience
          </h2>
          <div className="space-y-2 sm:space-y-3">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="font-bold text-[10px] sm:text-sm">{exp.title}</span>
                  <span className="text-[9px] sm:text-sm">
                    {exp.startDate}
                    {exp.current ? " -- Present" : exp.endDate ? ` -- ${exp.endDate}` : ""}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between text-[9px] sm:text-sm italic">
                  <span>{exp.company}</span>
                  <span>{exp.location}</span>
                </div>
                {exp.bullets.length > 0 && (
                  <ul className="list-disc ml-3 sm:ml-4 mt-1 text-[9px] sm:text-sm space-y-0.5">
                    {exp.bullets
                      .filter((b) => b.trim())
                      .map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {hasProjects && (
        <section className="mt-3 sm:mt-4">
          <h2 className="text-sm sm:text-base font-bold uppercase border-b border-black pb-0.5 mb-2">
            Projects
          </h2>
          <div className="space-y-2 sm:space-y-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span>
                    <span className="font-bold text-[10px] sm:text-sm">{proj.name}</span>
                    {proj.technologies && (
                      <span className="italic text-[9px] sm:text-sm"> | {proj.technologies}</span>
                    )}
                  </span>
                  <span className="text-[9px] sm:text-sm">
                    {proj.startDate}
                    {proj.endDate && ` -- ${proj.endDate}`}
                  </span>
                </div>
                {proj.bullets.length > 0 && (
                  <ul className="list-disc ml-3 sm:ml-4 mt-1 text-[9px] sm:text-sm space-y-0.5">
                    {proj.bullets
                      .filter((b) => b.trim())
                      .map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {hasSkills && (
        <section className="mt-3 sm:mt-4">
          <h2 className="text-sm sm:text-base font-bold uppercase border-b border-black pb-0.5 mb-2">
            Technical Skills
          </h2>
          <div className="text-[9px] sm:text-sm space-y-0.5">
            {skills.languages && (
              <p>
                <span className="font-bold">Languages: </span>
                {skills.languages}
              </p>
            )}
            {skills.frameworks && (
              <p>
                <span className="font-bold">Frameworks: </span>
                {skills.frameworks}
              </p>
            )}
            {skills.tools && (
              <p>
                <span className="font-bold">Developer Tools: </span>
                {skills.tools}
              </p>
            )}
            {skills.libraries && (
              <p>
                <span className="font-bold">Libraries: </span>
                {skills.libraries}
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
