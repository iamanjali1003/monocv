/**
 * EducationForm component - Form section for education entries.
 * Allows adding, editing, and removing education items.
 * Each entry includes school, degree, field of study, dates, and GPA.
 */

"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GraduationCap, Plus } from "lucide-react";
import { educationSchema, type EducationFormData } from "@/lib/schemas";
import { useResumeStore } from "@/lib/store";
import { FormInput, SectionCard, EmptyState, ItemCard } from "@/components/custom";
import { Button } from "@/components/ui/button";

function EducationEntry({
  education,
  onUpdate,
  onDelete,
}: {
  education: EducationFormData;
  onUpdate: (data: Partial<EducationFormData>) => void;
  onDelete: () => void;
}) {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: education,
    mode: "onChange",
  });

  const watchedValues = watch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      onUpdate(watchedValues);
    }, 300);
    return () => clearTimeout(timeout);
  }, [watchedValues, onUpdate]);

  return (
    <ItemCard onDelete={onDelete}>
      <div className="grid gap-3 sm:gap-4">
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
          <FormInput
            label="School"
            placeholder="University Name"
            error={errors.school?.message}
            {...register("school")}
          />
          <FormInput
            label="Location"
            placeholder="City, State"
            error={errors.location?.message}
            {...register("location")}
          />
        </div>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
          <FormInput
            label="Degree"
            placeholder="Bachelor of Science"
            error={errors.degree?.message}
            {...register("degree")}
          />
          <FormInput
            label="Field of Study"
            placeholder="Computer Science"
            error={errors.field?.message}
            {...register("field")}
          />
        </div>
        <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3">
          <FormInput
            label="Start Date"
            placeholder="Aug 2018"
            error={errors.startDate?.message}
            {...register("startDate")}
          />
          <FormInput
            label="End Date"
            placeholder="May 2022"
            error={errors.endDate?.message}
            {...register("endDate")}
          />
          <FormInput
            label="GPA"
            placeholder="3.8"
            error={errors.gpa?.message}
            {...register("gpa")}
            className="col-span-2 sm:col-span-1"
          />
        </div>
      </div>
    </ItemCard>
  );
}

export function EducationForm() {
  const { resume, addEducation, updateEducation, deleteEducation } =
    useResumeStore();

  const handleAdd = () => {
    addEducation({
      school: "",
      location: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      gpa: "",
    });
  };

  return (
    <SectionCard
      title="Education"
      icon={GraduationCap}
      badge={resume.education.length || undefined}
      actions={
        <Button variant="ghost" size="icon-sm" onClick={handleAdd}>
          <Plus className="size-4" />
        </Button>
      }
    >
      {resume.education.length === 0 ? (
        <EmptyState
          icon={GraduationCap}
          title="No education added"
          description="Add your educational background"
          actionLabel="Add Education"
          onAction={handleAdd}
        />
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {resume.education.map((edu) => (
            <EducationEntry
              key={edu.id}
              education={{ ...edu }}
              onUpdate={(data) => updateEducation(edu.id, data)}
              onDelete={() => deleteEducation(edu.id)}
            />
          ))}
        </div>
      )}
    </SectionCard>
  );
}
