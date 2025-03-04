/**
 * Header component - Site-wide navigation header.
 * Displays the logo and navigation links for the resume builder.
 */

"use client";

import Link from "next/link";
import { FileText } from "lucide-react";

interface HeaderProps {
  actions?: React.ReactNode;
}

export function Header({ actions }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 sm:h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <FileText className="size-5 sm:size-6" />
          <span className="font-semibold text-base sm:text-lg">monoCV</span>
        </Link>
        {actions && (
          <div className="flex items-center gap-1 sm:gap-2">{actions}</div>
        )}
      </div>
    </header>
  );
}
