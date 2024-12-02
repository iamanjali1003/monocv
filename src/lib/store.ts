/**
 * Zustand store for global resume state management.
 * Uses persist middleware to save resume data to localStorage.
 * Provides actions for updating all resume sections.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Resume, PersonalInfo, Education, Experience, Project, Skills } from "./types";
import { generateId, getCurrentDate } from "./utils";

const initialResume: Resume = {
  id: generateId(),
  template: "classic",
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    portfolio: "",
    location: "",
  },
  education: [],
  experience: [],
  projects: [],
  skills: {
    languages: "",
    frameworks: "",
    tools: "",
    libraries: "",
  },
  createdAt: getCurrentDate(),
  updatedAt: getCurrentDate(),
};

interface ResumeStore {
  resume: Resume;
  setTemplate: (template: string) => void;
  setPersonalInfo: (info: Partial<PersonalInfo>) => void;
  addEducation: (edu: Omit<Education, "id">) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  deleteEducation: (id: string) => void;
  reorderEducation: (education: Education[]) => void;
  addExperience: (exp: Omit<Experience, "id">) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  reorderExperience: (experience: Experience[]) => void;
  addProject: (proj: Omit<Project, "id">) => void;
  updateProject: (id: string, proj: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  reorderProjects: (projects: Project[]) => void;
  setSkills: (skills: Partial<Skills>) => void;
  resetResume: () => void;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resume: initialResume,

      setTemplate: (template) =>
        set((state) => ({
          resume: {
            ...state.resume,
            template,
            updatedAt: getCurrentDate(),
          },
        })),

      setPersonalInfo: (info) =>
        set((state) => ({
          resume: {
            ...state.resume,
            personalInfo: { ...state.resume.personalInfo, ...info },
            updatedAt: getCurrentDate(),
          },
        })),

      addEducation: (edu) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: [...state.resume.education, { ...edu, id: generateId() }],
            updatedAt: getCurrentDate(),
          },
        })),

      updateEducation: (id, edu) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: state.resume.education.map((e) =>
              e.id === id ? { ...e, ...edu } : e
            ),
            updatedAt: getCurrentDate(),
          },
        })),

      deleteEducation: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: state.resume.education.filter((e) => e.id !== id),
            updatedAt: getCurrentDate(),
          },
        })),

      reorderEducation: (education) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education,
            updatedAt: getCurrentDate(),
          },
        })),

      addExperience: (exp) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: [...state.resume.experience, { ...exp, id: generateId() }],
            updatedAt: getCurrentDate(),
          },
        })),

      updateExperience: (id, exp) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: state.resume.experience.map((e) =>
              e.id === id ? { ...e, ...exp } : e
            ),
            updatedAt: getCurrentDate(),
          },
        })),

      deleteExperience: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: state.resume.experience.filter((e) => e.id !== id),
            updatedAt: getCurrentDate(),
          },
        })),

      reorderExperience: (experience) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience,
            updatedAt: getCurrentDate(),
          },
        })),

      addProject: (proj) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: [...state.resume.projects, { ...proj, id: generateId() }],
            updatedAt: getCurrentDate(),
          },
        })),

      updateProject: (id, proj) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: state.resume.projects.map((p) =>
              p.id === id ? { ...p, ...proj } : p
            ),
            updatedAt: getCurrentDate(),
          },
        })),

      deleteProject: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: state.resume.projects.filter((p) => p.id !== id),
            updatedAt: getCurrentDate(),
          },
        })),

      reorderProjects: (projects) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects,
            updatedAt: getCurrentDate(),
          },
        })),

      setSkills: (skills) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: { ...state.resume.skills, ...skills },
            updatedAt: getCurrentDate(),
          },
        })),

      resetResume: () =>
        set({
          resume: {
            ...initialResume,
            id: generateId(),
            createdAt: getCurrentDate(),
            updatedAt: getCurrentDate(),
          },
        }),
    }),
    { name: "resume-storage" }
  )
);
