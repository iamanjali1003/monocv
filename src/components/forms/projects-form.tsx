/**
 * ProjectsForm component - Form section for project entries.
 * Allows adding, editing, and removing project items.
 * Each entry includes project name, technologies, dates, and bullet points.
 */

"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FolderGit2, Plus, X } from "lucide-react";
import { projectSchema, type ProjectFormData } from "@/lib/schemas";
import { useResumeStore } from "@/lib/store";
import { FormInput, SectionCard, EmptyState, ItemCard } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function ProjectEntry({
  project,
  onUpdate,
  onDelete,
}: {
  project: ProjectFormData;
  onUpdate: (data: Partial<ProjectFormData>) => void;
  onDelete: () => void;
}) {
  const [bullets, setBullets] = useState<string[]>(project.bullets || []);

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: project,
    mode: "onChange",
  });

  const watchedValues = watch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      onUpdate({ ...watchedValues, bullets });
    }, 300);
    return () => clearTimeout(timeout);
  }, [watchedValues, bullets, onUpdate]);

  const addBullet = () => {
    setBullets([...bullets, ""]);
  };

  const updateBullet = (index: number, value: string) => {
    const newBullets = [...bullets];
    newBullets[index] = value;
    setBullets(newBullets);
  };

  const removeBullet = (index: number) => {
    setBullets(bullets.filter((_, i) => i !== index));
  };

  return (
    <ItemCard onDelete={onDelete}>
      <div className="grid gap-3 sm:gap-4">
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
          <FormInput
            label="Project Name"
            placeholder="My Awesome Project"
            error={errors.name?.message}
            {...register("name")}
          />
          <FormInput
            label="Technologies"
            placeholder="React, Node.js, PostgreSQL"
            error={errors.technologies?.message}
            {...register("technologies")}
          />
        </div>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
          <FormInput
            label="Start Date"
            placeholder="Jan 2023"
            error={errors.startDate?.message}
            {...register("startDate")}
          />
          <FormInput
            label="End Date"
            placeholder="Present"
            error={errors.endDate?.message}
            {...register("endDate")}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm">Bullet Points</Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={addBullet}
              className="h-7 text-xs"
            >
              <Plus className="size-3 mr-1" />
              Add
            </Button>
          </div>
          {bullets.length === 0 ? (
            <p className="text-xs text-muted-foreground py-2">
              Add bullet points to describe your project
            </p>
          ) : (
            <div className="space-y-2">
              {bullets.map((bullet, index) => (
                <div key={index} className="flex gap-2">
                  <Textarea
                    value={bullet}
                    onChange={(e) => updateBullet(index, e.target.value)}
                    placeholder="Describe what you built or achieved..."
                    className="min-h-[50px] sm:min-h-[60px] text-sm"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => removeBullet(index)}
                    className="shrink-0 size-7 sm:size-8"
                  >
                    <X className="size-3.5 sm:size-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ItemCard>
  );
}

export function ProjectsForm() {
  const { resume, addProject, updateProject, deleteProject } = useResumeStore();

  const handleAdd = () => {
    addProject({
      name: "",
      technologies: "",
      startDate: "",
      endDate: "",
      bullets: [],
    });
  };

  return (
    <SectionCard
      title="Projects"
      icon={FolderGit2}
      badge={resume.projects.length || undefined}
      actions={
        <Button variant="ghost" size="icon-sm" onClick={handleAdd}>
          <Plus className="size-4" />
        </Button>
      }
    >
      {resume.projects.length === 0 ? (
        <EmptyState
          icon={FolderGit2}
          title="No projects added"
          description="Add your personal or professional projects"
          actionLabel="Add Project"
          onAction={handleAdd}
        />
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {resume.projects.map((proj) => (
            <ProjectEntry
              key={proj.id}
              project={{ ...proj }}
              onUpdate={(data) => updateProject(proj.id, data)}
              onDelete={() => deleteProject(proj.id)}
            />
          ))}
        </div>
      )}
    </SectionCard>
  );
}
