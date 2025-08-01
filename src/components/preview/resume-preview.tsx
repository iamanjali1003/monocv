/**
 * ResumePreview component - Renders the selected template preview.
 * Displays the resume in a paper-like container with A4/Letter dimensions.
 * Dynamically loads the appropriate template based on the resume data.
 */

"use client";

import { useResumeStore } from "@/lib/store";
import { getTemplate } from "@/templates/registry";

export function ResumePreview() {
  const { resume } = useResumeStore();
  const template = getTemplate(resume.template);

  if (!template) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Template not found
      </div>
    );
  }

  const PreviewComponent = template.PreviewComponent;

  return (
    <div className="flex justify-center p-2 sm:p-4 min-h-full">
      <div className="w-full max-w-[8.5in] origin-top">
        <div
          className="bg-white shadow-lg mx-auto"
          style={{
            width: "100%",
            maxWidth: "8.5in",
            minHeight: "11in",
          }}
        >
          <PreviewComponent data={resume} />
        </div>
      </div>
    </div>
  );
}
