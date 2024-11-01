/**
 * Template selection page - Displays available resume templates.
 * Users can select a template before proceeding to the builder.
 */

"use client";

import { useRouter } from "next/navigation";
import { Check, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Header, Footer } from "@/components/layout";
import { getAllTemplates } from "@/templates/registry";
import { useResumeStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function TemplatesPage() {
  const router = useRouter();
  const { resume, setTemplate } = useResumeStore();
  const templates = getAllTemplates();

  const handleSelectTemplate = (templateId: string) => {
    setTemplate(templateId);
    router.push("/builder");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-8 sm:py-12">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
              Choose Your Template
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Select a template to get started. You can always change it later.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {templates.map((template) => {
              const isSelected = resume.template === template.id;
              const isAvailable = template.available;

              return (
                <Card
                  key={template.id}
                  className={cn(
                    "relative overflow-hidden transition-all",
                    isSelected && "ring-2 ring-primary",
                    !isAvailable && "opacity-60"
                  )}
                >
                  <CardContent className="p-0">
                    <div className="aspect-[8.5/11] bg-muted flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="w-12 h-16 sm:w-16 sm:h-20 bg-white border mx-auto mb-2 rounded shadow-sm" />
                        <p className="text-xs sm:text-sm font-medium">
                          {template.name}
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                        <Check className="size-3 sm:size-4" />
                      </div>
                    )}
                    {!isAvailable && (
                      <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                        <div className="text-center">
                          <Lock className="size-6 sm:size-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            Coming Soon
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex flex-col items-start gap-2 p-3 sm:p-4">
                    <h3 className="font-semibold text-sm sm:text-base">
                      {template.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {template.description}
                    </p>
                    <Button
                      className="w-full mt-2"
                      size="sm"
                      variant={isSelected ? "secondary" : "default"}
                      disabled={!isAvailable}
                      onClick={() => handleSelectTemplate(template.id)}
                    >
                      {isSelected ? "Selected" : "Use Template"}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
