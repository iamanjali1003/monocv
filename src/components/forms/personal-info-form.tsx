/**
 * PersonalInfoForm component - Form section for personal information.
 * Handles name, email, phone, and optional links (LinkedIn, GitHub, portfolio).
 * Updates are synced to Zustand store in real-time.
 */

"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { personalInfoSchema, type PersonalInfoFormData } from "@/lib/schemas";
import { useResumeStore } from "@/lib/store";
import { FormInput, SectionCard } from "@/components/custom";

export function PersonalInfoForm() {
  const { resume, setPersonalInfo } = useResumeStore();

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: resume.personalInfo,
    mode: "onChange",
  });

  const watchedValues = watch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPersonalInfo(watchedValues);
    }, 300);
    return () => clearTimeout(timeout);
  }, [watchedValues, setPersonalInfo]);

  return (
    <SectionCard title="Personal Information" icon={User}>
      <div className="grid gap-3 sm:gap-4">
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
          <FormInput
            label="Full Name"
            placeholder="John Doe"
            error={errors.fullName?.message}
            {...register("fullName")}
          />
          <FormInput
            label="Email"
            type="email"
            placeholder="john@example.com"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
          <FormInput
            label="Phone"
            type="tel"
            placeholder="123-456-7890"
            error={errors.phone?.message}
            {...register("phone")}
          />
          <FormInput
            label="Location"
            placeholder="City, State"
            error={errors.location?.message}
            {...register("location")}
          />
        </div>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <FormInput
            label="LinkedIn"
            type="url"
            placeholder="https://linkedin.com/in/..."
            error={errors.linkedin?.message}
            {...register("linkedin")}
          />
          <FormInput
            label="GitHub"
            type="url"
            placeholder="https://github.com/..."
            error={errors.github?.message}
            {...register("github")}
          />
          <FormInput
            label="Portfolio"
            type="url"
            placeholder="https://yoursite.com"
            error={errors.portfolio?.message}
            {...register("portfolio")}
          />
        </div>
      </div>
    </SectionCard>
  );
}
