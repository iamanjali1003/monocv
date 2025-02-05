/**
 * IconButton component - A button wrapper that displays an icon with optional loading state.
 * Extends the base shadcn/ui Button component with icon positioning and loading indicator.
 */

"use client";

import { type LucideIcon, Loader2 } from "lucide-react";
import { Button, type buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

interface IconButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  icon: LucideIcon;
  loading?: boolean;
  iconPosition?: "left" | "right";
  asChild?: boolean;
}

export function IconButton({
  icon: Icon,
  loading = false,
  iconPosition = "left",
  children,
  className,
  disabled,
  ...props
}: IconButtonProps) {
  return (
    <Button
      className={cn(className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : iconPosition === "left" ? (
        <Icon className="size-4" />
      ) : null}
      {children}
      {!loading && iconPosition === "right" ? (
        <Icon className="size-4" />
      ) : null}
    </Button>
  );
}
