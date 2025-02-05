/**
 * CollapsibleSection component - An accordion wrapper with icon and title.
 * Used to organize resume form sections in the builder interface.
 */

"use client";

import { type LucideIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface CollapsibleSectionProps {
  title: string;
  icon: LucideIcon;
  defaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

export function CollapsibleSection({
  title,
  icon: Icon,
  defaultOpen = false,
  children,
  className,
  actions,
}: CollapsibleSectionProps) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultOpen ? title : undefined}
      className={cn("w-full", className)}
    >
      <AccordionItem value={title} className="border rounded-lg px-4">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center gap-3">
            <Icon className="size-5 text-muted-foreground" />
            <span className="font-semibold">{title}</span>
          </div>
          {actions && (
            <div
              className="ml-auto mr-2"
              onClick={(e) => e.stopPropagation()}
            >
              {actions}
            </div>
          )}
        </AccordionTrigger>
        <AccordionContent className="pt-2">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
