/**
 * Classic template definition.
 * Provides a traditional, ATS-friendly resume format.
 */

import type { ResumeTemplate } from "../types";
import { ClassicPreview } from "./preview";
import { ClassicPDF } from "./pdf";

export const classicTemplate: ResumeTemplate = {
  id: "classic",
  name: "Classic",
  description: "A traditional ATS-friendly resume format with clean sections",
  thumbnail: "/templates/classic-thumbnail.png",
  available: true,
  PreviewComponent: ClassicPreview,
  PDFComponent: ClassicPDF,
};
