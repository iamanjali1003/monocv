/**
 * Builder page - Main resume editing interface.
 * Split-screen layout with form panel on left and live preview on right.
 * Responsive design with preview toggle on mobile.
 */

"use client";

import { useState } from "react";
import { Eye, Edit3, RotateCcw, AlertTriangle } from "lucide-react";
import { Header } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ConfirmDialog } from "@/components/custom";
import {
  PersonalInfoForm,
  EducationForm,
  ExperienceForm,
  ProjectsForm,
  SkillsForm,
} from "@/components/forms";
import { ResumePreview, PDFDownload } from "@/components/preview";
import { useResumeStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function BuilderPage() {
  const [showPreview, setShowPreview] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const { resetResume } = useResumeStore();

  const handleReset = () => {
    resetResume();
    setShowResetDialog(false);
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header
        actions={
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowResetDialog(true)}
              className="hidden sm:flex"
            >
              <RotateCcw className="size-4 sm:mr-2" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
              className="lg:hidden"
            >
              {showPreview ? (
                <>
                  <Edit3 className="size-4 sm:mr-2" />
                  <span className="hidden sm:inline">Edit</span>
                </>
              ) : (
                <>
                  <Eye className="size-4 sm:mr-2" />
                  <span className="hidden sm:inline">Preview</span>
                </>
              )}
            </Button>
            <PDFDownload />
          </div>
        }
      />

      <main className="flex-1 flex overflow-hidden">
        <div
          className={cn(
            "w-full lg:w-1/2 border-r",
            showPreview ? "hidden lg:block" : "block"
          )}
        >
          <ScrollArea className="h-full">
            <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 max-w-2xl mx-auto pb-8">
              <PersonalInfoForm />
              <EducationForm />
              <ExperienceForm />
              <ProjectsForm />
              <SkillsForm />
            </div>
          </ScrollArea>
        </div>

        <div
          className={cn(
            "w-full lg:w-1/2 bg-muted/30",
            !showPreview ? "hidden lg:block" : "block"
          )}
        >
          <ScrollArea className="h-full">
            <ResumePreview />
          </ScrollArea>
        </div>
      </main>

      <ConfirmDialog
        open={showResetDialog}
        onOpenChange={setShowResetDialog}
        title="Reset Resume"
        description="Are you sure you want to reset your resume? All your data will be cleared. This action cannot be undone."
        confirmLabel="Reset"
        onConfirm={handleReset}
        variant="destructive"
        icon={AlertTriangle}
      />
    </div>
  );
}
