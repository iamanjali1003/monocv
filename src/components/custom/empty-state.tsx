/**
 * EmptyState component - Displays a message when a list is empty.
 * Used in form sections when no items have been added yet.
 */

"use client";

import { type LucideIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-6 sm:py-8 text-center">
      {Icon && (
        <div className="rounded-full bg-muted p-3 mb-3">
          <Icon className="size-5 sm:size-6 text-muted-foreground" />
        </div>
      )}
      <p className="text-sm font-medium text-foreground">{title}</p>
      {description && (
        <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xs">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction} className="mt-4">
          <Plus className="size-4 mr-1" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
