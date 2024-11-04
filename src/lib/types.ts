/**
 * Core TypeScript interfaces for the Resume Builder application.
 * Defines the data structures for resume content including personal info,
 * education, experience, projects, and skills sections.
 */

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  location?: string;
}

export interface Education {
  id: string;
  school: string;
  location?: string;
  degree: string;
  field?: string;
  startDate?: string;
  endDate?: string;
  gpa?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  bullets: string[];
}

export interface Project {
  id: string;
  name: string;
  technologies: string;
  startDate?: string;
  endDate?: string;
  bullets: string[];
}

export interface Skills {
  languages: string;
  frameworks: string;
  tools: string;
  libraries: string;
}

export interface Resume {
  id: string;
  template: string;
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skills;
  createdAt: string;
  updatedAt: string;
}
