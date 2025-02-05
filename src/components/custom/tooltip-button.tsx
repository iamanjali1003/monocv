/**
 * TooltipButton component - A button with a tooltip on hover.
 * Wraps the shadcn/ui Button and Tooltip components together.
 */

"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button, type buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";

interface TooltipButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  tooltip: string;
  tooltipSide?: "top" | "right" | "bottom" | "left";
  asChild?: boolean;
}

export function TooltipButton({
  tooltip,
  tooltipSide = "bottom",
  children,
  ...props
}: TooltipButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button {...props}>{children}</Button>
        </TooltipTrigger>
        <TooltipContent side={tooltipSide}>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
