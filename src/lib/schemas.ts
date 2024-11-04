/**
 * Zod validation schemas for resume form data.
 * Provides runtime validation and type inference for all resume sections.
 * Uses Zod 4 top-level format validators for email and URL validation.
 */

import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  linkedin: z.union([z.url("Invalid URL"), z.literal("")]).optional(),
  github: z.union([z.url("Invalid URL"), z.literal("")]).optional(),
  portfolio: z.union([z.url("Invalid URL"), z.literal("")]).optional(),
  location: z.string().optional(),
});

export const educationSchema = z.object({
  id: z.string(),
  school: z.string().min(1, "School name is required"),
  location: z.string().optional(),
  degree: z.string().min(1, "Degree is required"),
  field: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  gpa: z.string().optional(),
});

export const experienceSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company name is required"),
  location: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean(),
  bullets: z.array(z.string()),
});

export const projectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Project name is required"),
  technologies: z.string().min(1, "Technologies are required"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  bullets: z.array(z.string()),
});

export const skillsSchema = z.object({
  languages: z.string(),
  frameworks: z.string(),
  tools: z.string(),
  libraries: z.string(),
});

export const resumeSchema = z.object({
  id: z.string(),
  template: z.string(),
  personalInfo: personalInfoSchema,
  education: z.array(educationSchema),
  experience: z.array(experienceSchema),
  projects: z.array(projectSchema),
  skills: skillsSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type EducationFormData = z.infer<typeof educationSchema>;
export type ExperienceFormData = z.infer<typeof experienceSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;
export type SkillsFormData = z.infer<typeof skillsSchema>;
export type ResumeFormData = z.infer<typeof resumeSchema>;
