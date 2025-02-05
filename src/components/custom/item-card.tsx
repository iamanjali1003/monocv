/**
 * ItemCard component - A styled card for individual form items.
 * Used for education, experience, and project entries with delete action.
 */

"use client";

import { Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ItemCardProps {
  onDelete?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function ItemCard({ onDelete, children, className }: ItemCardProps) {
  return (
    <Card className={cn("border-dashed", className)}>
      <CardContent className="p-3 sm:p-4">
        {onDelete && (
          <div className="flex justify-end mb-2">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={onDelete}
              className="size-7 sm:size-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="size-3.5 sm:size-4" />
            </Button>
          </div>
        )}
        {children}
      </CardContent>
    </Card>
  );
}
