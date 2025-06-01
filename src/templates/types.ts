/**
 * Template system type definitions.
 * Defines the structure for resume templates including metadata and components.
 */

import type { Resume } from "@/lib/types";

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  available: boolean;
  PreviewComponent: React.ComponentType<{ data: Resume }>;
  PDFComponent: React.ComponentType<{ data: Resume }>;
}
