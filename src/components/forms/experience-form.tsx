/**
 * ExperienceForm component - Form section for work experience entries.
 * Allows adding, editing, and removing experience items.
 * Each entry includes title, company, dates, and bullet points.
 */

"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Briefcase, Plus, X } from "lucide-react";
import { experienceSchema, type ExperienceFormData } from "@/lib/schemas";
import { useResumeStore } from "@/lib/store";
import { FormInput, SectionCard, EmptyState, ItemCard } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

function ExperienceEntry({
  experience,
  onUpdate,
  onDelete,
}: {
  experience: ExperienceFormData;
  onUpdate: (data: Partial<ExperienceFormData>) => void;
  onDelete: () => void;
}) {
  const [bullets, setBullets] = useState<string[]>(experience.bullets || []);

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: experience,
    mode: "onChange",
  });

  const watchedValues = watch();
  const currentJob = watch("current");

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
            label="Job Title"
            placeholder="Software Engineer"
            error={errors.title?.message}
            {...register("title")}
          />
          <FormInput
            label="Company"
            placeholder="Company Name"
            error={errors.company?.message}
            {...register("company")}
          />
        </div>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
          <FormInput
            label="Location"
            placeholder="City, State"
            error={errors.location?.message}
            {...register("location")}
          />
          <FormInput
            label="Start Date"
            placeholder="Jan 2020"
            error={errors.startDate?.message}
            {...register("startDate")}
          />
          <FormInput
            label="End Date"
            placeholder="Present"
            disabled={currentJob}
            error={errors.endDate?.message}
            {...register("endDate")}
          />
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id={`current-${experience.id}`}
            checked={currentJob}
            onCheckedChange={(checked) => setValue("current", checked)}
          />
          <Label htmlFor={`current-${experience.id}`} className="text-sm">
            I currently work here
          </Label>
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
              Add bullet points to describe your responsibilities
            </p>
          ) : (
            <div className="space-y-2">
              {bullets.map((bullet, index) => (
                <div key={index} className="flex gap-2">
                  <Textarea
                    value={bullet}
                    onChange={(e) => updateBullet(index, e.target.value)}
                    placeholder="Describe your achievement..."
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

export function ExperienceForm() {
  const { resume, addExperience, updateExperience, deleteExperience } =
    useResumeStore();

  const handleAdd = () => {
    addExperience({
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      bullets: [],
    });
  };

  return (
    <SectionCard
      title="Experience"
      icon={Briefcase}
      badge={resume.experience.length || undefined}
      actions={
        <Button variant="ghost" size="icon-sm" onClick={handleAdd}>
          <Plus className="size-4" />
        </Button>
      }
    >
      {resume.experience.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No experience added"
          description="Add your work experience"
          actionLabel="Add Experience"
          onAction={handleAdd}
        />
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {resume.experience.map((exp) => (
            <ExperienceEntry
              key={exp.id}
              experience={{ ...exp }}
              onUpdate={(data) => updateExperience(exp.id, data)}
              onDelete={() => deleteExperience(exp.id)}
            />
          ))}
        </div>
      )}
    </SectionCard>
  );
}
