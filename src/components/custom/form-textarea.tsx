/**
 * FormTextarea component - A form field wrapper that combines Label, Textarea, and error message.
 * Used for multi-line inputs like job descriptions and project details.
 */

"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface FormTextareaProps extends React.ComponentProps<"textarea"> {
  label: string;
  error?: string;
  helperText?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const textareaId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="space-y-2">
        <Label
          htmlFor={textareaId}
          className={cn(error && "text-destructive")}
        >
          {label}
        </Label>
        <Textarea
          ref={ref}
          id={textareaId}
          className={cn(error && "border-destructive", className)}
          aria-invalid={!!error}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          {...props}
        />
        {error && (
          <p
            id={`${textareaId}-error`}
            className="text-sm text-destructive"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  }
);

FormTextarea.displayName = "FormTextarea";
