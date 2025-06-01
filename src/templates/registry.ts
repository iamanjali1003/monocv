/**
 * Template registry - Central location for all resume templates.
 * Provides functions to retrieve templates by ID and list available templates.
 */

import type { ResumeTemplate } from "./types";
import { classicTemplate } from "./classic";

export const templates: Record<string, ResumeTemplate> = {
  classic: classicTemplate,
};

export function getTemplate(id: string): ResumeTemplate | undefined {
  return templates[id];
}

export function getAvailableTemplates(): ResumeTemplate[] {
  return Object.values(templates).filter((t) => t.available);
}

export function getAllTemplates(): ResumeTemplate[] {
  return Object.values(templates);
}
