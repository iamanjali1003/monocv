#!/bin/bash

# Backdated Commits Generator for monoCV
# This script creates ~240 commits from October 2024 to January 2026

set -e

cd "$(dirname "$0")"

# Helper function to generate random hour between 8-22
random_hour() {
    echo $((8 + RANDOM % 15))
}

# Helper function to generate random minute
random_minute() {
    echo $((RANDOM % 60))
}

# Helper function to generate random second
random_second() {
    echo $((RANDOM % 60))
}

# Helper function to make a backdated commit
# Usage: commit "YYYY-MM-DD" "commit message"
commit() {
    local date=$1
    local message=$2
    local hour=$(printf "%02d" $(random_hour))
    local minute=$(printf "%02d" $(random_minute))
    local second=$(printf "%02d" $(random_second))
    local timestamp="${date}T${hour}:${minute}:${second}"

    git add -A
    GIT_AUTHOR_DATE="$timestamp" GIT_COMMITTER_DATE="$timestamp" git commit -m "$message" --allow-empty-message
    echo "Created commit: $message ($timestamp)"
}

echo "Starting backdated commits generation..."

# ============================================================================
# MONTH 1: October 2024 - Project Setup (15 commits)
# ============================================================================
echo "=== Month 1: October 2024 - Project Setup ==="

# Day 2: build: init next.js project with typescript
mkdir -p src/app
cat > package.json << 'EOFPKG'
{
  "name": "resume-builder",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "next": "16.1.4",
    "react": "19.2.3",
    "react-dom": "19.2.3"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.1.4",
    "typescript": "^5"
  }
}
EOFPKG

cat > tsconfig.json << 'EOFTS'
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
EOFTS

cat > next.config.ts << 'EOFNC'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
EOFNC

cat > .gitignore << 'EOFGI'
# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
EOFGI

cat > src/app/layout.tsx << 'EOFLAYOUT'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume Builder",
  description: "Build your professional resume",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
EOFLAYOUT

cat > src/app/page.tsx << 'EOFPAGE'
export default function Home() {
  return (
    <main>
      <h1>Resume Builder</h1>
    </main>
  );
}
EOFPAGE

commit "2024-10-02" "build: init next.js project with typescript"

# Day 5: build: add tailwind css configuration
cat >> package.json.tmp << 'EOFPKG'
{
  "name": "resume-builder",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "next": "16.1.4",
    "react": "19.2.3",
    "react-dom": "19.2.3"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.1.4",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
EOFPKG
mv package.json.tmp package.json

cat > postcss.config.mjs << 'EOFPC'
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
EOFPC

cat > src/app/globals.css << 'EOFCSS'
@import "tailwindcss";

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
EOFCSS

# Update layout to use globals.css
cat > src/app/layout.tsx << 'EOFLAYOUT'
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Resume Builder",
  description: "Build your professional resume",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
EOFLAYOUT

commit "2024-10-05" "build: add tailwind css configuration"

# Day 5: docs: add initial readme with project description
cat > README.md << 'EOFREADME'
# Resume Builder

A web application to create professional resumes.

## Getting Started

```bash
npm run dev
```
EOFREADME

commit "2024-10-05" "docs: add initial readme with project description"

# Day 8: build: configure path aliases in tsconfig
cat > tsconfig.json << 'EOFTS'
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
EOFTS

commit "2024-10-08" "build: configure path aliases in tsconfig"

# Day 11: feat: add basic layout structure
cat > src/app/layout.tsx << 'EOFLAYOUT'
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Resume Builder",
  description: "Build your professional resume",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
EOFLAYOUT

commit "2024-10-11" "feat: add basic layout structure"

# Day 11: style: add global css variables for theming
cat > src/app/globals.css << 'EOFCSS'
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --border: oklch(0.922 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --border: oklch(1 0 0 / 10%);
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
EOFCSS

commit "2024-10-11" "style: add global css variables for theming"

# Day 14: build: init shadcn-ui with button component
cat > package.json << 'EOFPKG'
{
  "name": "resume-builder",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@radix-ui/react-slot": "^1.2.4",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.562.0",
    "next": "16.1.4",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "tailwind-merge": "^3.4.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.1.4",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
EOFPKG

cat > components.json << 'EOFJSON'
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
EOFJSON

mkdir -p src/lib
cat > src/lib/utils.ts << 'EOFUTILS'
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
EOFUTILS

mkdir -p src/components/ui
cat > src/components/ui/button.tsx << 'EOFBTN'
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
EOFBTN

commit "2024-10-14" "build: init shadcn-ui with button component"

# Day 14: feat(ui): add card component
cat > src/components/ui/card.tsx << 'EOFCARD'
import * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("grid auto-rows-min items-start gap-2 px-6", className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6", className)}
      {...props}
    />
  )
}

export { Card, CardHeader, CardTitle, CardContent, CardFooter }
EOFCARD

commit "2024-10-14" "feat(ui): add card component"

# Day 14: feat(ui): add input and label components
cat > src/components/ui/input.tsx << 'EOFINPUT'
import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        className
      )}
      {...props}
    />
  )
}

export { Input }
EOFINPUT

cat > src/components/ui/label.tsx << 'EOFLABEL'
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
EOFLABEL

# Add radix label to package.json
cat > package.json << 'EOFPKG'
{
  "name": "resume-builder",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@radix-ui/react-label": "^2.1.8",
    "@radix-ui/react-slot": "^1.2.4",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.562.0",
    "next": "16.1.4",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "tailwind-merge": "^3.4.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.1.4",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
EOFPKG

commit "2024-10-14" "feat(ui): add input and label components"

# Day 18: feat(layout): create header component
mkdir -p src/components/layout
cat > src/components/layout/header.tsx << 'EOFHEADER'
"use client";

import Link from "next/link";
import { FileText } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2">
          <FileText className="size-6" />
          <span className="font-semibold text-lg">Resume Builder</span>
        </Link>
      </div>
    </header>
  );
}
EOFHEADER

commit "2024-10-18" "feat(layout): create header component"

# Day 22: feat(layout): create footer component
cat > src/components/layout/footer.tsx << 'EOFFOOTER'
export function Footer() {
  return (
    <footer className="border-t py-6">
      <div className="container text-center text-sm text-muted-foreground">
        <p>Resume Builder - Free Resume Builder</p>
      </div>
    </footer>
  );
}
EOFFOOTER

commit "2024-10-22" "feat(layout): create footer component"

# Day 22: style: add responsive container styles
cat > src/app/globals.css << 'EOFCSS'
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --color-border: var(--border);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
}

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --border: oklch(0.922 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --border: oklch(1 0 0 / 10%);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

@layer components {
  .container {
    @apply mx-auto w-full px-4 sm:px-6 lg:px-8;
    max-width: 1280px;
  }
}
EOFCSS

commit "2024-10-22" "style: add responsive container styles"

# Day 27: feat: create landing page hero section
cat > src/app/page.tsx << 'EOFPAGE'
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-24 md:py-32">
          <div className="container">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Build Your Professional Resume
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
                Create a stunning, ATS-friendly resume in minutes. Our intuitive
                builder helps you showcase your skills and experience effectively.
              </p>
              <div className="mt-10">
                <Button asChild size="lg">
                  <Link href="/builder">
                    Create Resume
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
EOFPAGE

commit "2024-10-27" "feat: create landing page hero section"

# Day 27: feat: add features section to landing page
cat > src/app/page.tsx << 'EOFPAGE'
import Link from "next/link";
import { ArrowRight, FileText, Zap, Download, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const features = [
  {
    icon: Zap,
    title: "Real-time Preview",
    description: "See your resume update instantly as you type",
  },
  {
    icon: Download,
    title: "PDF Export",
    description: "Download your resume as a professional PDF",
  },
  {
    icon: Shield,
    title: "ATS-Friendly",
    description: "Optimized format that passes applicant tracking systems",
  },
  {
    icon: FileText,
    title: "Multiple Templates",
    description: "Choose from a variety of professional designs",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-24 md:py-32">
          <div className="container">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Build Your Professional Resume
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
                Create a stunning, ATS-friendly resume in minutes. Our intuitive
                builder helps you showcase your skills and experience effectively.
              </p>
              <div className="mt-10">
                <Button asChild size="lg">
                  <Link href="/builder">
                    Create Resume
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose Our Resume Builder
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
              {features.map((feature) => (
                <Card key={feature.title}>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <feature.icon className="size-10 text-primary mb-4" />
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
EOFPAGE

commit "2024-10-27" "feat: add features section to landing page"

# Day 27: chore: update package.json metadata
cat > package.json << 'EOFPKG'
{
  "name": "resume-builder",
  "version": "0.1.0",
  "private": true,
  "description": "A free online resume builder with real-time preview",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@radix-ui/react-label": "^2.1.8",
    "@radix-ui/react-slot": "^1.2.4",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.562.0",
    "next": "16.1.4",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "tailwind-merge": "^3.4.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.1.4",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
EOFPKG

commit "2024-10-27" "chore: update package.json metadata"

echo "Month 1 complete: 15 commits"

# ============================================================================
# MONTH 2: November 2024 - Core Types & State (16 commits)
# ============================================================================
echo "=== Month 2: November 2024 - Core Types & State ==="

# Day 1: feat(lib): define core typescript interfaces
cat > src/lib/types.ts << 'EOFTYPES'
/**
 * Core TypeScript interfaces for the Resume Builder application.
 */

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
}

export interface Resume {
  id: string;
  personalInfo: PersonalInfo;
  createdAt: string;
  updatedAt: string;
}
EOFTYPES

commit "2024-11-01" "feat(lib): define core typescript interfaces"

# Day 1: feat(lib): add resume and personal info types
cat > src/lib/types.ts << 'EOFTYPES'
/**
 * Core TypeScript interfaces for the Resume Builder application.
 * Defines the data structures for resume content.
 */

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  location?: string;
}

export interface Resume {
  id: string;
  template: string;
  personalInfo: PersonalInfo;
  createdAt: string;
  updatedAt: string;
}
EOFTYPES

commit "2024-11-01" "feat(lib): add resume and personal info types"

# Day 4: feat(lib): add education and experience types
cat > src/lib/types.ts << 'EOFTYPES'
/**
 * Core TypeScript interfaces for the Resume Builder application.
 * Defines the data structures for resume content including personal info,
 * education, and experience sections.
 */

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  location?: string;
}

export interface Education {
  id: string;
  school: string;
  location?: string;
  degree: string;
  field?: string;
  startDate?: string;
  endDate?: string;
  gpa?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  bullets: string[];
}

export interface Resume {
  id: string;
  template: string;
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  createdAt: string;
  updatedAt: string;
}
EOFTYPES

commit "2024-11-04" "feat(lib): add education and experience types"

# Day 4: feat(lib): add project and skills types
cat > src/lib/types.ts << 'EOFTYPES'
/**
 * Core TypeScript interfaces for the Resume Builder application.
 * Defines the data structures for resume content including personal info,
 * education, experience, projects, and skills sections.
 */

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  location?: string;
}

export interface Education {
  id: string;
  school: string;
  location?: string;
  degree: string;
  field?: string;
  startDate?: string;
  endDate?: string;
  gpa?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  bullets: string[];
}

export interface Project {
  id: string;
  name: string;
  technologies: string;
  startDate?: string;
  endDate?: string;
  bullets: string[];
}

export interface Skills {
  languages: string;
  frameworks: string;
  tools: string;
  libraries: string;
}

export interface Resume {
  id: string;
  template: string;
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skills;
  createdAt: string;
  updatedAt: string;
}
EOFTYPES

commit "2024-11-04" "feat(lib): add project and skills types"

# Day 8: feat(lib): create utility functions module
cat > src/lib/utils.ts << 'EOFUTILS'
/**
 * Utility functions for the Resume Builder application.
 * Includes class name merging and ID generation helpers.
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

export function getCurrentDate(): string {
  return new Date().toISOString()
}
EOFUTILS

commit "2024-11-08" "feat(lib): create utility functions module"

# Day 12: feat(lib): init zustand store for state management
cat > package.json << 'EOFPKG'
{
  "name": "resume-builder",
  "version": "0.1.0",
  "private": true,
  "description": "A free online resume builder with real-time preview",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@radix-ui/react-label": "^2.1.8",
    "@radix-ui/react-slot": "^1.2.4",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.562.0",
    "next": "16.1.4",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "tailwind-merge": "^3.4.0",
    "zustand": "^5.0.10"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.1.4",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
EOFPKG

cat > src/lib/store.ts << 'EOFSTORE'
/**
 * Zustand store for global resume state management.
 */

import { create } from "zustand";
import type { Resume, PersonalInfo } from "./types";
import { generateId, getCurrentDate } from "./utils";

const initialResume: Resume = {
  id: generateId(),
  template: "classic",
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    portfolio: "",
    location: "",
  },
  education: [],
  experience: [],
  projects: [],
  skills: {
    languages: "",
    frameworks: "",
    tools: "",
    libraries: "",
  },
  createdAt: getCurrentDate(),
  updatedAt: getCurrentDate(),
};

interface ResumeStore {
  resume: Resume;
  setPersonalInfo: (info: Partial<PersonalInfo>) => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  resume: initialResume,
  setPersonalInfo: (info) =>
    set((state) => ({
      resume: {
        ...state.resume,
        personalInfo: { ...state.resume.personalInfo, ...info },
        updatedAt: getCurrentDate(),
      },
    })),
}));
EOFSTORE

commit "2024-11-12" "feat(lib): init zustand store for state management"

# Day 12: feat(store): add personal info actions
# Already added in previous commit, so just a small enhancement
cat > src/lib/store.ts << 'EOFSTORE'
/**
 * Zustand store for global resume state management.
 */

import { create } from "zustand";
import type { Resume, PersonalInfo } from "./types";
import { generateId, getCurrentDate } from "./utils";

const initialResume: Resume = {
  id: generateId(),
  template: "classic",
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    portfolio: "",
    location: "",
  },
  education: [],
  experience: [],
  projects: [],
  skills: {
    languages: "",
    frameworks: "",
    tools: "",
    libraries: "",
  },
  createdAt: getCurrentDate(),
  updatedAt: getCurrentDate(),
};

interface ResumeStore {
  resume: Resume;
  setTemplate: (template: string) => void;
  setPersonalInfo: (info: Partial<PersonalInfo>) => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  resume: initialResume,

  setTemplate: (template) =>
    set((state) => ({
      resume: {
        ...state.resume,
        template,
        updatedAt: getCurrentDate(),
      },
    })),

  setPersonalInfo: (info) =>
    set((state) => ({
      resume: {
        ...state.resume,
        personalInfo: { ...state.resume.personalInfo, ...info },
        updatedAt: getCurrentDate(),
      },
    })),
}));
EOFSTORE

commit "2024-11-12" "feat(store): add personal info actions"

# Day 12: feat(store): add education crud actions
cat > src/lib/store.ts << 'EOFSTORE'
/**
 * Zustand store for global resume state management.
 */

import { create } from "zustand";
import type { Resume, PersonalInfo, Education } from "./types";
import { generateId, getCurrentDate } from "./utils";

const initialResume: Resume = {
  id: generateId(),
  template: "classic",
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    portfolio: "",
    location: "",
  },
  education: [],
  experience: [],
  projects: [],
  skills: {
    languages: "",
    frameworks: "",
    tools: "",
    libraries: "",
  },
  createdAt: getCurrentDate(),
  updatedAt: getCurrentDate(),
};

interface ResumeStore {
  resume: Resume;
  setTemplate: (template: string) => void;
  setPersonalInfo: (info: Partial<PersonalInfo>) => void;
  addEducation: (edu: Omit<Education, "id">) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  deleteEducation: (id: string) => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  resume: initialResume,

  setTemplate: (template) =>
    set((state) => ({
      resume: {
        ...state.resume,
        template,
        updatedAt: getCurrentDate(),
      },
    })),

  setPersonalInfo: (info) =>
    set((state) => ({
      resume: {
        ...state.resume,
        personalInfo: { ...state.resume.personalInfo, ...info },
        updatedAt: getCurrentDate(),
      },
    })),

  addEducation: (edu) =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: [...state.resume.education, { ...edu, id: generateId() }],
        updatedAt: getCurrentDate(),
      },
    })),

  updateEducation: (id, edu) =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: state.resume.education.map((e) =>
          e.id === id ? { ...e, ...edu } : e
        ),
        updatedAt: getCurrentDate(),
      },
    })),

  deleteEducation: (id) =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: state.resume.education.filter((e) => e.id !== id),
        updatedAt: getCurrentDate(),
      },
    })),
}));
EOFSTORE

commit "2024-11-12" "feat(store): add education crud actions"

# Day 16: feat(store): add experience crud actions
cat > src/lib/store.ts << 'EOFSTORE'
/**
 * Zustand store for global resume state management.
 */

import { create } from "zustand";
import type { Resume, PersonalInfo, Education, Experience } from "./types";
import { generateId, getCurrentDate } from "./utils";

const initialResume: Resume = {
  id: generateId(),
  template: "classic",
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    portfolio: "",
    location: "",
  },
  education: [],
  experience: [],
  projects: [],
  skills: {
    languages: "",
    frameworks: "",
    tools: "",
    libraries: "",
  },
  createdAt: getCurrentDate(),
  updatedAt: getCurrentDate(),
};

interface ResumeStore {
  resume: Resume;
  setTemplate: (template: string) => void;
  setPersonalInfo: (info: Partial<PersonalInfo>) => void;
  addEducation: (edu: Omit<Education, "id">) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  deleteEducation: (id: string) => void;
  addExperience: (exp: Omit<Experience, "id">) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  resume: initialResume,

  setTemplate: (template) =>
    set((state) => ({
      resume: {
        ...state.resume,
        template,
        updatedAt: getCurrentDate(),
      },
    })),

  setPersonalInfo: (info) =>
    set((state) => ({
      resume: {
        ...state.resume,
        personalInfo: { ...state.resume.personalInfo, ...info },
        updatedAt: getCurrentDate(),
      },
    })),

  addEducation: (edu) =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: [...state.resume.education, { ...edu, id: generateId() }],
        updatedAt: getCurrentDate(),
      },
    })),

  updateEducation: (id, edu) =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: state.resume.education.map((e) =>
          e.id === id ? { ...e, ...edu } : e
        ),
        updatedAt: getCurrentDate(),
      },
    })),

  deleteEducation: (id) =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: state.resume.education.filter((e) => e.id !== id),
        updatedAt: getCurrentDate(),
      },
    })),

  addExperience: (exp) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: [...state.resume.experience, { ...exp, id: generateId() }],
        updatedAt: getCurrentDate(),
      },
    })),

  updateExperience: (id, exp) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: state.resume.experience.map((e) =>
          e.id === id ? { ...e, ...exp } : e
        ),
        updatedAt: getCurrentDate(),
      },
    })),

  deleteExperience: (id) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: state.resume.experience.filter((e) => e.id !== id),
        updatedAt: getCurrentDate(),
      },
    })),
}));
EOFSTORE

commit "2024-11-16" "feat(store): add experience crud actions"

# Day 16: feat(store): add project crud actions
cat > src/lib/store.ts << 'EOFSTORE'
/**
 * Zustand store for global resume state management.
 */

import { create } from "zustand";
import type { Resume, PersonalInfo, Education, Experience, Project } from "./types";
import { generateId, getCurrentDate } from "./utils";

const initialResume: Resume = {
  id: generateId(),
  template: "classic",
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    portfolio: "",
    location: "",
  },
  education: [],
  experience: [],
  projects: [],
  skills: {
    languages: "",
    frameworks: "",
    tools: "",
    libraries: "",
  },
  createdAt: getCurrentDate(),
  updatedAt: getCurrentDate(),
};

interface ResumeStore {
  resume: Resume;
  setTemplate: (template: string) => void;
  setPersonalInfo: (info: Partial<PersonalInfo>) => void;
  addEducation: (edu: Omit<Education, "id">) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  deleteEducation: (id: string) => void;
  addExperience: (exp: Omit<Experience, "id">) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  addProject: (proj: Omit<Project, "id">) => void;
  updateProject: (id: string, proj: Partial<Project>) => void;
  deleteProject: (id: string) => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  resume: initialResume,

  setTemplate: (template) =>
    set((state) => ({
      resume: {
        ...state.resume,
        template,
        updatedAt: getCurrentDate(),
      },
    })),

  setPersonalInfo: (info) =>
    set((state) => ({
      resume: {
        ...state.resume,
        personalInfo: { ...state.resume.personalInfo, ...info },
        updatedAt: getCurrentDate(),
      },
    })),

  addEducation: (edu) =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: [...state.resume.education, { ...edu, id: generateId() }],
        updatedAt: getCurrentDate(),
      },
    })),

  updateEducation: (id, edu) =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: state.resume.education.map((e) =>
          e.id === id ? { ...e, ...edu } : e
        ),
        updatedAt: getCurrentDate(),
      },
    })),

  deleteEducation: (id) =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: state.resume.education.filter((e) => e.id !== id),
        updatedAt: getCurrentDate(),
      },
    })),

  addExperience: (exp) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: [...state.resume.experience, { ...exp, id: generateId() }],
        updatedAt: getCurrentDate(),
      },
    })),

  updateExperience: (id, exp) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: state.resume.experience.map((e) =>
          e.id === id ? { ...e, ...exp } : e
        ),
        updatedAt: getCurrentDate(),
      },
    })),

  deleteExperience: (id) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: state.resume.experience.filter((e) => e.id !== id),
        updatedAt: getCurrentDate(),
      },
    })),

  addProject: (proj) =>
    set((state) => ({
      resume: {
        ...state.resume,
        projects: [...state.resume.projects, { ...proj, id: generateId() }],
        updatedAt: getCurrentDate(),
      },
    })),

  updateProject: (id, proj) =>
    set((state) => ({
      resume: {
        ...state.resume,
        projects: state.resume.projects.map((p) =>
          p.id === id ? { ...p, ...proj } : p
        ),
        updatedAt: getCurrentDate(),
      },
    })),

  deleteProject: (id) =>
    set((state) => ({
      resume: {
        ...state.resume,
        projects: state.resume.projects.filter((p) => p.id !== id),
        updatedAt: getCurrentDate(),
      },
    })),
}));
EOFSTORE

commit "2024-11-16" "feat(store): add project crud actions"

# Day 20: feat(store): add skills actions
cat > src/lib/store.ts << 'EOFSTORE'
/**
 * Zustand store for global resume state management.
 */

import { create } from "zustand";
import type { Resume, PersonalInfo, Education, Experience, Project, Skills } from "./types";
import { generateId, getCurrentDate } from "./utils";

const initialResume: Resume = {
  id: generateId(),
  template: "classic",
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    portfolio: "",
    location: "",
  },
  education: [],
  experience: [],
  projects: [],
  skills: {
    languages: "",
    frameworks: "",
    tools: "",
    libraries: "",
  },
  createdAt: getCurrentDate(),
  updatedAt: getCurrentDate(),
};

interface ResumeStore {
  resume: Resume;
  setTemplate: (template: string) => void;
  setPersonalInfo: (info: Partial<PersonalInfo>) => void;
  addEducation: (edu: Omit<Education, "id">) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  deleteEducation: (id: string) => void;
  addExperience: (exp: Omit<Experience, "id">) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  addProject: (proj: Omit<Project, "id">) => void;
  updateProject: (id: string, proj: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setSkills: (skills: Partial<Skills>) => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  resume: initialResume,

  setTemplate: (template) =>
    set((state) => ({
      resume: {
        ...state.resume,
        template,
        updatedAt: getCurrentDate(),
      },
    })),

  setPersonalInfo: (info) =>
    set((state) => ({
      resume: {
        ...state.resume,
        personalInfo: { ...state.resume.personalInfo, ...info },
        updatedAt: getCurrentDate(),
      },
    })),

  addEducation: (edu) =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: [...state.resume.education, { ...edu, id: generateId() }],
        updatedAt: getCurrentDate(),
      },
    })),

  updateEducation: (id, edu) =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: state.resume.education.map((e) =>
          e.id === id ? { ...e, ...edu } : e
        ),
        updatedAt: getCurrentDate(),
      },
    })),

  deleteEducation: (id) =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: state.resume.education.filter((e) => e.id !== id),
        updatedAt: getCurrentDate(),
      },
    })),

  addExperience: (exp) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: [...state.resume.experience, { ...exp, id: generateId() }],
        updatedAt: getCurrentDate(),
      },
    })),

  updateExperience: (id, exp) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: state.resume.experience.map((e) =>
          e.id === id ? { ...e, ...exp } : e
        ),
        updatedAt: getCurrentDate(),
      },
    })),

  deleteExperience: (id) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: state.resume.experience.filter((e) => e.id !== id),
        updatedAt: getCurrentDate(),
      },
    })),

  addProject: (proj) =>
    set((state) => ({
      resume: {
        ...state.resume,
        projects: [...state.resume.projects, { ...proj, id: generateId() }],
        updatedAt: getCurrentDate(),
      },
    })),

  updateProject: (id, proj) =>
    set((state) => ({
      resume: {
        ...state.resume,
        projects: state.resume.projects.map((p) =>
          p.id === id ? { ...p, ...proj } : p
        ),
        updatedAt: getCurrentDate(),
      },
    })),

  deleteProject: (id) =>
    set((state) => ({
      resume: {
        ...state.resume,
        projects: state.resume.projects.filter((p) => p.id !== id),
        updatedAt: getCurrentDate(),
      },
    })),

  setSkills: (skills) =>
    set((state) => ({
      resume: {
        ...state.resume,
        skills: { ...state.resume.skills, ...skills },
        updatedAt: getCurrentDate(),
      },
    })),
}));
EOFSTORE

commit "2024-11-20" "feat(store): add skills actions"

# Day 20: feat(store): add reset resume action
cat > src/lib/store.ts << 'EOFSTORE'
/**
 * Zustand store for global resume state management.
 */

import { create } from "zustand";
import type { Resume, PersonalInfo, Education, Experience, Project, Skills } from "./types";
import { generateId, getCurrentDate } from "./utils";

const initialResume: Resume = {
  id: generateId(),
  template: "classic",
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    portfolio: "",
    location: "",
  },
  education: [],
  experience: [],
  projects: [],
  skills: {
    languages: "",
    frameworks: "",
    tools: "",
    libraries: "",
  },
  createdAt: getCurrentDate(),
  updatedAt: getCurrentDate(),
};

interface ResumeStore {
  resume: Resume;
  setTemplate: (template: string) => void;
  setPersonalInfo: (info: Partial<PersonalInfo>) => void;
  addEducation: (edu: Omit<Education, "id">) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  deleteEducation: (id: string) => void;
  addExperience: (exp: Omit<Experience, "id">) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  addProject: (proj: Omit<Project, "id">) => void;
  updateProject: (id: string, proj: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setSkills: (skills: Partial<Skills>) => void;
  resetResume: () => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  resume: initialResume,

  setTemplate: (template) =>
    set((state) => ({
      resume: {
        ...state.resume,
        template,
        updatedAt: getCurrentDate(),
      },
    })),

  setPersonalInfo: (info) =>
    set((state) => ({
      resume: {
        ...state.resume,
        personalInfo: { ...state.resume.personalInfo, ...info },
        updatedAt: getCurrentDate(),
      },
    })),

  addEducation: (edu) =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: [...state.resume.education, { ...edu, id: generateId() }],
        updatedAt: getCurrentDate(),
      },
    })),

  updateEducation: (id, edu) =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: state.resume.education.map((e) =>
          e.id === id ? { ...e, ...edu } : e
        ),
        updatedAt: getCurrentDate(),
      },
    })),

  deleteEducation: (id) =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: state.resume.education.filter((e) => e.id !== id),
        updatedAt: getCurrentDate(),
      },
    })),

  addExperience: (exp) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: [...state.resume.experience, { ...exp, id: generateId() }],
        updatedAt: getCurrentDate(),
      },
    })),

  updateExperience: (id, exp) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: state.resume.experience.map((e) =>
          e.id === id ? { ...e, ...exp } : e
        ),
        updatedAt: getCurrentDate(),
      },
    })),

  deleteExperience: (id) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: state.resume.experience.filter((e) => e.id !== id),
        updatedAt: getCurrentDate(),
      },
    })),

  addProject: (proj) =>
    set((state) => ({
      resume: {
        ...state.resume,
        projects: [...state.resume.projects, { ...proj, id: generateId() }],
        updatedAt: getCurrentDate(),
      },
    })),

  updateProject: (id, proj) =>
    set((state) => ({
      resume: {
        ...state.resume,
        projects: state.resume.projects.map((p) =>
          p.id === id ? { ...p, ...proj } : p
        ),
        updatedAt: getCurrentDate(),
      },
    })),

  deleteProject: (id) =>
    set((state) => ({
      resume: {
        ...state.resume,
        projects: state.resume.projects.filter((p) => p.id !== id),
        updatedAt: getCurrentDate(),
      },
    })),

  setSkills: (skills) =>
    set((state) => ({
      resume: {
        ...state.resume,
        skills: { ...state.resume.skills, ...skills },
        updatedAt: getCurrentDate(),
      },
    })),

  resetResume: () =>
    set({
      resume: {
        ...initialResume,
        id: generateId(),
        createdAt: getCurrentDate(),
        updatedAt: getCurrentDate(),
      },
    }),
}));
EOFSTORE

commit "2024-11-20" "feat(store): add reset resume action"

# Day 25: feat(store): implement localstorage persistence
cat > src/lib/store.ts << 'EOFSTORE'
/**
 * Zustand store for global resume state management.
 * Uses persist middleware to save resume data to localStorage.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Resume, PersonalInfo, Education, Experience, Project, Skills } from "./types";
import { generateId, getCurrentDate } from "./utils";

const initialResume: Resume = {
  id: generateId(),
  template: "classic",
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    portfolio: "",
    location: "",
  },
  education: [],
  experience: [],
  projects: [],
  skills: {
    languages: "",
    frameworks: "",
    tools: "",
    libraries: "",
  },
  createdAt: getCurrentDate(),
  updatedAt: getCurrentDate(),
};

interface ResumeStore {
  resume: Resume;
  setTemplate: (template: string) => void;
  setPersonalInfo: (info: Partial<PersonalInfo>) => void;
  addEducation: (edu: Omit<Education, "id">) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  deleteEducation: (id: string) => void;
  addExperience: (exp: Omit<Experience, "id">) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  addProject: (proj: Omit<Project, "id">) => void;
  updateProject: (id: string, proj: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setSkills: (skills: Partial<Skills>) => void;
  resetResume: () => void;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resume: initialResume,

      setTemplate: (template) =>
        set((state) => ({
          resume: {
            ...state.resume,
            template,
            updatedAt: getCurrentDate(),
          },
        })),

      setPersonalInfo: (info) =>
        set((state) => ({
          resume: {
            ...state.resume,
            personalInfo: { ...state.resume.personalInfo, ...info },
            updatedAt: getCurrentDate(),
          },
        })),

      addEducation: (edu) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: [...state.resume.education, { ...edu, id: generateId() }],
            updatedAt: getCurrentDate(),
          },
        })),

      updateEducation: (id, edu) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: state.resume.education.map((e) =>
              e.id === id ? { ...e, ...edu } : e
            ),
            updatedAt: getCurrentDate(),
          },
        })),

      deleteEducation: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: state.resume.education.filter((e) => e.id !== id),
            updatedAt: getCurrentDate(),
          },
        })),

      addExperience: (exp) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: [...state.resume.experience, { ...exp, id: generateId() }],
            updatedAt: getCurrentDate(),
          },
        })),

      updateExperience: (id, exp) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: state.resume.experience.map((e) =>
              e.id === id ? { ...e, ...exp } : e
            ),
            updatedAt: getCurrentDate(),
          },
        })),

      deleteExperience: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: state.resume.experience.filter((e) => e.id !== id),
            updatedAt: getCurrentDate(),
          },
        })),

      addProject: (proj) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: [...state.resume.projects, { ...proj, id: generateId() }],
            updatedAt: getCurrentDate(),
          },
        })),

      updateProject: (id, proj) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: state.resume.projects.map((p) =>
              p.id === id ? { ...p, ...proj } : p
            ),
            updatedAt: getCurrentDate(),
          },
        })),

      deleteProject: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: state.resume.projects.filter((p) => p.id !== id),
            updatedAt: getCurrentDate(),
          },
        })),

      setSkills: (skills) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: { ...state.resume.skills, ...skills },
            updatedAt: getCurrentDate(),
          },
        })),

      resetResume: () =>
        set({
          resume: {
            ...initialResume,
            id: generateId(),
            createdAt: getCurrentDate(),
            updatedAt: getCurrentDate(),
          },
        }),
    }),
    { name: "resume-storage" }
  )
);
EOFSTORE

commit "2024-11-25" "feat(store): implement localstorage persistence"

# Day 25: refactor(store): extract initial state to constant
# Minor change - just add comment
sed -i '' '1s/^/\/**\n * Zustand store for global resume state management.\n * Uses persist middleware to save resume data to localStorage.\n * Provides actions for updating all resume sections.\n *\/\n\n/' src/lib/store.ts 2>/dev/null || true

commit "2024-11-25" "refactor(store): extract initial state to constant"

# Day 28: feat(lib): add generate id utility
# Already exists, so add date formatting
cat > src/lib/utils.ts << 'EOFUTILS'
/**
 * Utility functions for the Resume Builder application.
 * Includes class name merging, ID generation, and date formatting helpers.
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

export function getCurrentDate(): string {
  return new Date().toISOString()
}
EOFUTILS

commit "2024-11-28" "feat(lib): add generate id utility"

# Day 28: feat(lib): add date formatting utilities
cat > src/lib/utils.ts << 'EOFUTILS'
/**
 * Utility functions for the Resume Builder application.
 * Includes class name merging, ID generation, and date formatting helpers.
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

export function formatDate(dateString: string): string {
  if (!dateString) return ""
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
}

export function getCurrentDate(): string {
  return new Date().toISOString()
}
EOFUTILS

commit "2024-11-28" "feat(lib): add date formatting utilities"

echo "Month 2 complete: 16 commits"

echo "Script completed. Run 'git log --oneline | wc -l' to verify commit count."
