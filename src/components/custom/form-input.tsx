/**
 * FormInput component - A form field wrapper that combines Label, Input, and error message.
 * Provides consistent styling and layout for all form inputs in the resume builder.
 */

"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface FormInputProps extends React.ComponentProps<"input"> {
  label: string;
  error?: string;
  helperText?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="space-y-2">
        <Label
          htmlFor={inputId}
          className={cn(error && "text-destructive")}
        >
          {label}
        </Label>
        <Input
          ref={ref}
          id={inputId}
          className={cn(error && "border-destructive", className)}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p
            id={`${inputId}-error`}
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

FormInput.displayName = "FormInput";
