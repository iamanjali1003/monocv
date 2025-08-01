/**
 * PDFDownload component - Handles PDF generation and download.
 * Uses @react-pdf/renderer to create a downloadable PDF from the resume data.
 * Renders as a button that triggers the PDF generation and download.
 */

"use client";

import { useState, useCallback } from "react";
import { pdf } from "@react-pdf/renderer";
import { Download } from "lucide-react";
import { useResumeStore } from "@/lib/store";
import { getTemplate } from "@/templates/registry";
import { IconButton } from "@/components/custom";

export function PDFDownload() {
  const [loading, setLoading] = useState(false);
  const { resume } = useResumeStore();

  const handleDownload = useCallback(async () => {
    const template = getTemplate(resume.template);
    if (!template) return;

    setLoading(true);
    try {
      const PDFComponent = template.PDFComponent;
      const blob = await pdf(<PDFComponent data={resume} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${resume.personalInfo.fullName || "resume"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setLoading(false);
    }
  }, [resume]);

  return (
    <IconButton
      icon={Download}
      onClick={handleDownload}
      loading={loading}
      disabled={loading}
      size="sm"
    >
      <span className="hidden sm:inline">Download PDF</span>
      <span className="sm:hidden">PDF</span>
    </IconButton>
  );
}
