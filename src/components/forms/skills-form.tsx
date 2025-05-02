/**
 * SkillsForm component - Form section for technical skills.
 * Divided into categories: Languages, Frameworks, Tools, and Libraries.
 * Updates are synced to Zustand store in real-time.
 */

"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Wrench } from "lucide-react";
import { skillsSchema, type SkillsFormData } from "@/lib/schemas";
import { useResumeStore } from "@/lib/store";
import { FormInput, SectionCard } from "@/components/custom";

export function SkillsForm() {
  const { resume, setSkills } = useResumeStore();

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<SkillsFormData>({
    resolver: zodResolver(skillsSchema),
    defaultValues: resume.skills,
    mode: "onChange",
  });

  const watchedValues = watch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSkills(watchedValues);
    }, 300);
    return () => clearTimeout(timeout);
  }, [watchedValues, setSkills]);

  return (
    <SectionCard title="Technical Skills" icon={Wrench}>
      <div className="grid gap-3 sm:gap-4">
        <FormInput
          label="Languages"
          placeholder="Java, Python, C/C++, JavaScript, TypeScript, SQL"
          helperText="Separate skills with commas"
          error={errors.languages?.message}
          {...register("languages")}
        />
        <FormInput
          label="Frameworks"
          placeholder="React, Node.js, Express, Next.js, Flask"
          helperText="Separate skills with commas"
          error={errors.frameworks?.message}
          {...register("frameworks")}
        />
        <FormInput
          label="Developer Tools"
          placeholder="Git, Docker, VS Code, AWS, Linux"
          helperText="Separate skills with commas"
          error={errors.tools?.message}
          {...register("tools")}
        />
        <FormInput
          label="Libraries"
          placeholder="pandas, NumPy, React Query, Tailwind CSS"
          helperText="Separate skills with commas"
          error={errors.libraries?.message}
          {...register("libraries")}
        />
      </div>
    </SectionCard>
  );
}
