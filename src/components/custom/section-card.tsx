/**
 * SectionCard component - A styled card for form sections.
 * Provides consistent styling for resume builder form sections.
 */

"use client";

import { type LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  title: string;
  icon?: LucideIcon;
  badge?: string | number;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function SectionCard({
  title,
  icon: Icon,
  badge,
  actions,
  children,
  className,
}: SectionCardProps) {
  return (
    <Card className={cn("shadow-sm", className)}>
      <CardHeader className="pb-3 sm:pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            {Icon && <Icon className="size-4 sm:size-5 text-muted-foreground" />}
            {title}
            {badge !== undefined && (
              <Badge variant="secondary" className="ml-1 text-xs">
                {badge}
              </Badge>
            )}
          </CardTitle>
          {actions && <div className="flex items-center gap-1">{actions}</div>}
        </div>
      </CardHeader>
      <CardContent className="pt-0">{children}</CardContent>
    </Card>
  );
}
