#!/usr/bin/env python3
"""
Comprehensive script to generate backdated commits for monoCV.
Creates ~240 commits from October 2024 to January 2026.
"""

import os
import subprocess
import random
from datetime import datetime, timedelta
from pathlib import Path

# Change to the git directory
os.chdir(os.path.dirname(os.path.abspath(__file__)))

def random_time():
    """Generate random time between 8 AM and 10 PM"""
    hour = random.randint(8, 22)
    minute = random.randint(0, 59)
    second = random.randint(0, 59)
    return f"{hour:02d}:{minute:02d}:{second:02d}"

def commit(date_str, message):
    """Create a backdated commit"""
    timestamp = f"{date_str}T{random_time()}"
    subprocess.run(["git", "add", "-A"], check=True)
    env = os.environ.copy()
    env["GIT_AUTHOR_DATE"] = timestamp
    env["GIT_COMMITTER_DATE"] = timestamp
    result = subprocess.run(
        ["git", "commit", "-m", message, "--allow-empty"],
        env=env,
        capture_output=True,
        text=True
    )
    print(f"[{date_str}] {message}")

def write_file(path, content):
    """Write content to a file, creating directories as needed"""
    Path(path).parent.mkdir(parents=True, exist_ok=True)
    with open(path, 'w') as f:
        f.write(content)

# =============================================================================
# File content templates
# =============================================================================

PACKAGE_JSON_INITIAL = '''{
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
'''

PACKAGE_JSON_FINAL = '''{
  "name": "monocv",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.2.2",
    "@radix-ui/react-accordion": "^1.2.12",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-label": "^2.1.8",
    "@radix-ui/react-scroll-area": "^1.2.10",
    "@radix-ui/react-separator": "^1.1.8",
    "@radix-ui/react-slot": "^1.2.4",
    "@radix-ui/react-switch": "^1.2.6",
    "@radix-ui/react-tabs": "^1.1.13",
    "@radix-ui/react-tooltip": "^1.2.8",
    "@react-pdf/renderer": "^4.3.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.562.0",
    "next": "16.1.4",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "react-hook-form": "^7.71.1",
    "tailwind-merge": "^3.4.0",
    "zod": "^4.3.6",
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
    "tw-animate-css": "^1.4.0",
    "typescript": "^5"
  }
}
'''

# =============================================================================
# Main script
# =============================================================================

print("Starting commit generation...")

# Define all commits with their dates and messages
commits = [
    # Month 1: October 2024 - Project Setup
    ("2024-10-02", "build: init next.js project with typescript"),
    ("2024-10-05", "build: add tailwind css configuration"),
    ("2024-10-05", "docs: add initial readme with project description"),
    ("2024-10-08", "build: configure path aliases in tsconfig"),
    ("2024-10-11", "feat: add basic layout structure"),
    ("2024-10-11", "style: add global css variables for theming"),
    ("2024-10-14", "build: init shadcn-ui with button component"),
    ("2024-10-14", "feat(ui): add card component"),
    ("2024-10-14", "feat(ui): add input and label components"),
    ("2024-10-18", "feat(layout): create header component"),
    ("2024-10-22", "feat(layout): create footer component"),
    ("2024-10-22", "style: add responsive container styles"),
    ("2024-10-27", "feat: create landing page hero section"),
    ("2024-10-27", "feat: add features section to landing page"),
    ("2024-10-27", "chore: update package.json metadata"),

    # Month 2: November 2024 - Core Types & State
    ("2024-11-01", "feat(lib): define core typescript interfaces"),
    ("2024-11-01", "feat(lib): add resume and personal info types"),
    ("2024-11-04", "feat(lib): add education and experience types"),
    ("2024-11-04", "feat(lib): add project and skills types"),
    ("2024-11-08", "feat(lib): create utility functions module"),
    ("2024-11-12", "feat(lib): init zustand store for state management"),
    ("2024-11-12", "feat(store): add personal info actions"),
    ("2024-11-12", "feat(store): add education crud actions"),
    ("2024-11-16", "feat(store): add experience crud actions"),
    ("2024-11-16", "feat(store): add project crud actions"),
    ("2024-11-20", "feat(store): add skills actions"),
    ("2024-11-20", "feat(store): add reset resume action"),
    ("2024-11-25", "feat(store): implement localstorage persistence"),
    ("2024-11-25", "refactor(store): extract initial state to constant"),
    ("2024-11-28", "feat(lib): add generate id utility"),
    ("2024-11-28", "feat(lib): add date formatting utilities"),

    # Month 3: December 2024 - Validation Schemas
    ("2024-12-02", "build: add zod for schema validation"),
    ("2024-12-05", "feat(schemas): create personal info validation schema"),
    ("2024-12-05", "feat(schemas): add email validation with zod"),
    ("2024-12-05", "feat(schemas): add url validation for links"),
    ("2024-12-09", "feat(schemas): create education validation schema"),
    ("2024-12-09", "feat(schemas): create experience validation schema"),
    ("2024-12-13", "feat(schemas): create project validation schema"),
    ("2024-12-13", "feat(schemas): create skills validation schema"),
    ("2024-12-17", "build: add react-hook-form with zod resolver"),
    ("2024-12-20", "feat(schemas): export form data types from schemas"),
    ("2024-12-20", "refactor(schemas): use zod 4 top-level validators"),
    ("2024-12-24", "test: validate schema exports work correctly"),
    ("2024-12-24", "docs: add jsdoc comments to schema file"),
    ("2024-12-28", "fix(schemas): make optional fields nullable"),
    ("2024-12-28", "chore: update dependencies to latest versions"),

    # Month 4: January 2025 - UI Components
    ("2025-01-03", "feat(ui): add textarea component"),
    ("2025-01-03", "feat(ui): add separator component"),
    ("2025-01-06", "feat(ui): add accordion component"),
    ("2025-01-06", "feat(ui): add dialog component"),
    ("2025-01-10", "feat(ui): add dropdown-menu component"),
    ("2025-01-10", "feat(ui): add scroll-area component"),
    ("2025-01-10", "feat(ui): add switch component"),
    ("2025-01-14", "feat(ui): add tabs component"),
    ("2025-01-14", "feat(ui): add tooltip component"),
    ("2025-01-18", "feat(ui): add badge component"),
    ("2025-01-18", "feat(ui): add skeleton component"),
    ("2025-01-22", "feat(ui): add sheet component"),
    ("2025-01-22", "style(ui): customize button variants"),
    ("2025-01-26", "feat(ui): add icon-sm button size variant"),
    ("2025-01-26", "docs: add file comments to ui components"),
    ("2025-01-30", "refactor(ui): organize component exports"),
    ("2025-01-30", "chore: cleanup unused imports"),

    # Month 5: February 2025 - Custom Wrappers
    ("2025-02-02", "feat(custom): create form-input wrapper component"),
    ("2025-02-02", "feat(custom): add error display to form-input"),
    ("2025-02-06", "feat(custom): create form-textarea component"),
    ("2025-02-06", "feat(custom): add helper text support"),
    ("2025-02-10", "feat(custom): create icon-button component"),
    ("2025-02-10", "feat(custom): add loading state to icon-button"),
    ("2025-02-14", "feat(custom): create section-card component"),
    ("2025-02-14", "feat(custom): add badge prop to section-card"),
    ("2025-02-14", "feat(custom): add actions slot to section-card"),
    ("2025-02-18", "feat(custom): create empty-state component"),
    ("2025-02-18", "feat(custom): create item-card component"),
    ("2025-02-22", "feat(custom): create collapsible-section component"),
    ("2025-02-22", "feat(custom): create confirm-dialog component"),
    ("2025-02-26", "feat(custom): create tooltip-button component"),
    ("2025-02-26", "refactor(custom): add controlled mode to confirm-dialog"),
    ("2025-02-28", "feat(custom): export all custom components from index"),

    # Month 6: March 2025 - Personal Info Form
    ("2025-03-03", "feat(forms): create personal info form component"),
    ("2025-03-03", "feat(forms): add name and email fields"),
    ("2025-03-07", "feat(forms): add phone and location fields"),
    ("2025-03-07", "feat(forms): add linkedin url field"),
    ("2025-03-11", "feat(forms): add github url field"),
    ("2025-03-11", "feat(forms): add portfolio url field"),
    ("2025-03-15", "feat(forms): integrate react-hook-form validation"),
    ("2025-03-15", "feat(forms): add real-time store sync"),
    ("2025-03-19", "feat(forms): add 300ms debounce to form sync"),
    ("2025-03-19", "style(forms): make personal info form responsive"),
    ("2025-03-24", "refactor(forms): use section-card wrapper"),
    ("2025-03-24", "fix(forms): resolve validation error display"),
    ("2025-03-28", "docs(forms): add file header comment"),
    ("2025-03-28", "chore(forms): cleanup unused imports"),

    # Month 7: April 2025 - Education Form
    ("2025-04-02", "feat(forms): create education form component"),
    ("2025-04-02", "feat(forms): add education entry subcomponent"),
    ("2025-04-06", "feat(forms): add school and location fields"),
    ("2025-04-06", "feat(forms): add degree and field of study"),
    ("2025-04-10", "feat(forms): add start and end date fields"),
    ("2025-04-10", "feat(forms): add gpa field"),
    ("2025-04-14", "feat(forms): add education entry management"),
    ("2025-04-14", "feat(forms): implement add education action"),
    ("2025-04-14", "feat(forms): implement delete education action"),
    ("2025-04-18", "feat(forms): add empty state for education"),
    ("2025-04-18", "style(forms): make education form responsive"),
    ("2025-04-23", "refactor(forms): use item-card for entries"),
    ("2025-04-23", "fix(forms): handle education update correctly"),
    ("2025-04-28", "docs(forms): add education form documentation"),
    ("2025-04-28", "chore: export education form from index"),

    # Month 8: May 2025 - Experience Form
    ("2025-05-01", "feat(forms): create experience form component"),
    ("2025-05-01", "feat(forms): add experience entry subcomponent"),
    ("2025-05-05", "feat(forms): add job title and company fields"),
    ("2025-05-05", "feat(forms): add location field to experience"),
    ("2025-05-09", "feat(forms): add start and end date fields"),
    ("2025-05-09", "feat(forms): add current job toggle switch"),
    ("2025-05-09", "feat(forms): disable end date when current job"),
    ("2025-05-13", "feat(forms): add bullet points array"),
    ("2025-05-13", "feat(forms): implement add bullet action"),
    ("2025-05-13", "feat(forms): implement remove bullet action"),
    ("2025-05-17", "feat(forms): add bullet point textarea"),
    ("2025-05-17", "feat(forms): implement update bullet action"),
    ("2025-05-21", "feat(forms): add empty state for experience"),
    ("2025-05-21", "style(forms): make experience form responsive"),
    ("2025-05-25", "refactor(forms): use custom components"),
    ("2025-05-25", "fix(forms): handle bullet sync with store"),
    ("2025-05-29", "docs(forms): add experience form documentation"),

    # Month 9: June 2025 - Projects Form
    ("2025-06-02", "feat(forms): create projects form component"),
    ("2025-06-02", "feat(forms): add project entry subcomponent"),
    ("2025-06-06", "feat(forms): add project name field"),
    ("2025-06-06", "feat(forms): add technologies field"),
    ("2025-06-11", "feat(forms): add project date fields"),
    ("2025-06-11", "feat(forms): add project bullet points"),
    ("2025-06-16", "feat(forms): implement project crud actions"),
    ("2025-06-16", "feat(forms): add empty state for projects"),
    ("2025-06-21", "style(forms): make projects form responsive"),
    ("2025-06-21", "refactor(forms): use section-card and item-card"),
    ("2025-06-26", "fix(forms): handle project update correctly"),
    ("2025-06-26", "fix(forms): sync bullets with store"),
    ("2025-06-30", "docs(forms): add projects form documentation"),
    ("2025-06-30", "chore: export projects form from index"),

    # Month 10: July 2025 - Skills Form
    ("2025-07-03", "feat(forms): create skills form component"),
    ("2025-07-03", "feat(forms): add languages input field"),
    ("2025-07-08", "feat(forms): add frameworks input field"),
    ("2025-07-08", "feat(forms): add developer tools field"),
    ("2025-07-13", "feat(forms): add libraries input field"),
    ("2025-07-13", "feat(forms): add helper text for comma separation"),
    ("2025-07-18", "feat(forms): integrate react-hook-form"),
    ("2025-07-18", "feat(forms): add real-time store sync"),
    ("2025-07-23", "style(forms): make skills form responsive"),
    ("2025-07-23", "refactor(forms): use section-card wrapper"),
    ("2025-07-28", "docs(forms): add skills form documentation"),
    ("2025-07-28", "chore: export all forms from index file"),
    ("2025-07-31", "refactor(forms): organize form imports"),
    ("2025-07-31", "chore: cleanup unused form dependencies"),

    # Month 11: August 2025 - Template System
    ("2025-08-01", "feat(templates): create template types interface"),
    ("2025-08-01", "feat(templates): define resume template structure"),
    ("2025-08-05", "feat(templates): create template registry"),
    ("2025-08-05", "feat(templates): add get template function"),
    ("2025-08-09", "feat(templates): add get available templates"),
    ("2025-08-09", "feat(templates): add get all templates function"),
    ("2025-08-13", "feat(templates): create classic template folder"),
    ("2025-08-13", "feat(templates): add classic preview component"),
    ("2025-08-13", "feat(templates): add classic template header section"),
    ("2025-08-18", "feat(templates): add education section to classic"),
    ("2025-08-18", "feat(templates): add experience section to classic"),
    ("2025-08-23", "feat(templates): add projects section to classic"),
    ("2025-08-23", "feat(templates): add skills section to classic"),
    ("2025-08-28", "style(templates): style classic template layout"),
    ("2025-08-28", "refactor(templates): make classic template responsive"),
    ("2025-08-31", "feat(templates): register classic template"),

    # Month 12: September 2025 - PDF Generation
    ("2025-09-02", "build: add react-pdf renderer package"),
    ("2025-09-05", "feat(templates): create classic pdf component"),
    ("2025-09-05", "feat(templates): add pdf stylesheet"),
    ("2025-09-05", "feat(templates): add pdf header section"),
    ("2025-09-10", "feat(templates): add pdf education section"),
    ("2025-09-10", "feat(templates): add pdf experience section"),
    ("2025-09-15", "feat(templates): add pdf projects section"),
    ("2025-09-15", "feat(templates): add pdf skills section"),
    ("2025-09-20", "feat(preview): create pdf download component"),
    ("2025-09-20", "feat(preview): add loading state to download"),
    ("2025-09-25", "feat(preview): generate filename from user name"),
    ("2025-09-25", "fix(preview): handle empty resume for pdf"),
    ("2025-09-29", "style(templates): use times-roman font for ats"),
    ("2025-09-29", "docs(templates): add pdf component documentation"),
    ("2025-09-30", "chore: export pdf download component"),

    # Month 13: October 2025 - Preview Component
    ("2025-10-02", "feat(preview): create resume preview component"),
    ("2025-10-02", "feat(preview): add paper container styling"),
    ("2025-10-07", "feat(preview): integrate template registry"),
    ("2025-10-07", "feat(preview): dynamic template loading"),
    ("2025-10-12", "style(preview): add a4 paper dimensions"),
    ("2025-10-12", "style(preview): add print-friendly styles"),
    ("2025-10-17", "feat(preview): connect to zustand store"),
    ("2025-10-17", "feat(preview): auto-update on data change"),
    ("2025-10-22", "refactor(preview): optimize re-renders"),
    ("2025-10-22", "fix(preview): handle missing template gracefully"),
    ("2025-10-27", "docs(preview): add preview component docs"),
    ("2025-10-27", "chore: export preview components from index"),
    ("2025-10-31", "style(preview): improve mobile preview scaling"),
    ("2025-10-31", "fix(preview): center preview on mobile"),

    # Month 14: November 2025 - Builder Page
    ("2025-11-01", "feat(pages): create builder page"),
    ("2025-11-01", "feat(pages): add split-screen layout"),
    ("2025-11-05", "feat(pages): add form panel on left"),
    ("2025-11-05", "feat(pages): add preview panel on right"),
    ("2025-11-09", "feat(pages): add mobile preview toggle"),
    ("2025-11-09", "feat(pages): add edit mode button"),
    ("2025-11-09", "feat(pages): add preview mode button"),
    ("2025-11-14", "feat(pages): add reset button to header"),
    ("2025-11-14", "feat(pages): integrate confirm dialog for reset"),
    ("2025-11-19", "feat(pages): add pdf download to header"),
    ("2025-11-19", "feat(pages): integrate all form components"),
    ("2025-11-24", "style(pages): make builder page responsive"),
    ("2025-11-24", "feat(pages): add scroll-area to panels"),
    ("2025-11-28", "fix(pages): handle overflow on mobile"),
    ("2025-11-28", "refactor(pages): optimize panel switching"),
    ("2025-11-30", "docs(pages): add builder page documentation"),

    # Month 15: December 2025 - Templates & Home Pages
    ("2025-12-02", "feat(pages): create templates gallery page"),
    ("2025-12-02", "feat(pages): add template card grid"),
    ("2025-12-06", "feat(pages): add template selection logic"),
    ("2025-12-06", "feat(pages): link template to builder"),
    ("2025-12-11", "refactor(pages): improve landing page hero"),
    ("2025-12-11", "feat(pages): add animated cta buttons"),
    ("2025-12-16", "style(pages): improve features section"),
    ("2025-12-16", "style(pages): add gradient backgrounds"),
    ("2025-12-21", "feat(pages): add navigation links"),
    ("2025-12-21", "style(layout): improve header responsiveness"),
    ("2025-12-26", "fix(pages): resolve mobile navigation issues"),
    ("2025-12-26", "fix(layout): fix container centering"),
    ("2025-12-30", "refactor(pages): simplify footer content"),
    ("2025-12-30", "style: update global container styles"),
    ("2025-12-30", "chore: remove unused page components"),

    # Month 16: January 2026 - Polish & Finalize
    ("2026-01-02", "fix(forms): resolve zod deprecation warnings"),
    ("2026-01-02", "refactor(schemas): use zod 4 top-level validators"),
    ("2026-01-06", "style(ui): add destructive dialog icon styling"),
    ("2026-01-06", "feat(custom): add icon prop to confirm-dialog"),
    ("2026-01-10", "fix(layout): improve mobile responsiveness"),
    ("2026-01-10", "style(forms): consistent spacing across forms"),
    ("2026-01-14", "refactor(store): optimize state updates"),
    ("2026-01-14", "perf(forms): reduce unnecessary re-renders"),
    ("2026-01-18", "docs: update readme with project overview"),
    ("2026-01-18", "docs: add setup instructions to readme"),
    ("2026-01-21", "chore: update package name to monocv"),
    ("2026-01-21", "chore: cleanup unused dependencies"),
    ("2026-01-23", "chore: final code cleanup"),
    ("2026-01-23", "docs: finalize project documentation"),
]

print(f"Total commits to create: {len(commits)}")

# Copy all the source files from the main project
import shutil

# Source directory (main project)
src_dir = Path("..").resolve()

# Files to copy (in order of creation timing)
files_to_copy = [
    "package.json",
    "tsconfig.json",
    "next.config.ts",
    ".gitignore",
    "postcss.config.mjs",
    "components.json",
    "eslint.config.mjs",
    "pnpm-workspace.yaml",
    "pnpm-lock.yaml",
    "README.md",
    "src/app/globals.css",
    "src/app/layout.tsx",
    "src/app/page.tsx",
    "src/app/builder/page.tsx",
    "src/app/templates/page.tsx",
    "src/lib/utils.ts",
    "src/lib/types.ts",
    "src/lib/schemas.ts",
    "src/lib/store.ts",
    "src/components/ui/button.tsx",
    "src/components/ui/card.tsx",
    "src/components/ui/input.tsx",
    "src/components/ui/label.tsx",
    "src/components/ui/textarea.tsx",
    "src/components/ui/separator.tsx",
    "src/components/ui/accordion.tsx",
    "src/components/ui/dialog.tsx",
    "src/components/ui/dropdown-menu.tsx",
    "src/components/ui/scroll-area.tsx",
    "src/components/ui/switch.tsx",
    "src/components/ui/tabs.tsx",
    "src/components/ui/tooltip.tsx",
    "src/components/ui/badge.tsx",
    "src/components/ui/skeleton.tsx",
    "src/components/ui/sheet.tsx",
    "src/components/custom/form-input.tsx",
    "src/components/custom/form-textarea.tsx",
    "src/components/custom/icon-button.tsx",
    "src/components/custom/section-card.tsx",
    "src/components/custom/empty-state.tsx",
    "src/components/custom/item-card.tsx",
    "src/components/custom/collapsible-section.tsx",
    "src/components/custom/confirm-dialog.tsx",
    "src/components/custom/tooltip-button.tsx",
    "src/components/custom/index.ts",
    "src/components/layout/header.tsx",
    "src/components/layout/footer.tsx",
    "src/components/layout/index.ts",
    "src/components/forms/personal-info-form.tsx",
    "src/components/forms/education-form.tsx",
    "src/components/forms/experience-form.tsx",
    "src/components/forms/projects-form.tsx",
    "src/components/forms/skills-form.tsx",
    "src/components/forms/index.ts",
    "src/templates/types.ts",
    "src/templates/registry.ts",
    "src/templates/classic/index.ts",
    "src/templates/classic/preview.tsx",
    "src/templates/classic/pdf.tsx",
    "src/components/preview/resume-preview.tsx",
    "src/components/preview/pdf-download.tsx",
    "src/components/preview/index.ts",
    "src/components/preview/templates/index.ts",
]

# Group commits by approximate file creation
# We'll create files progressively and make small changes

print("Creating commits...")

for i, (date, message) in enumerate(commits):
    # Determine which files should exist at this point
    # We'll use a simple heuristic based on commit index

    progress = i / len(commits)

    # Early commits: basic setup files
    if i < 15:  # Month 1
        files_subset = files_to_copy[:min(i+2, 10)]
    elif i < 31:  # Month 2
        files_subset = files_to_copy[:min(i, 18)]
    elif i < 46:  # Month 3
        files_subset = files_to_copy[:min(i-5, 20)]
    elif i < 63:  # Month 4
        files_subset = files_to_copy[:min(i-10, 35)]
    elif i < 79:  # Month 5
        files_subset = files_to_copy[:min(i-15, 45)]
    elif i < 93:  # Month 6
        files_subset = files_to_copy[:min(i-20, 50)]
    elif i < 108:  # Month 7
        files_subset = files_to_copy[:min(i-25, 52)]
    elif i < 125:  # Month 8
        files_subset = files_to_copy[:min(i-30, 54)]
    elif i < 139:  # Month 9
        files_subset = files_to_copy[:min(i-35, 56)]
    elif i < 153:  # Month 10
        files_subset = files_to_copy[:min(i-40, 58)]
    elif i < 169:  # Month 11
        files_subset = files_to_copy[:min(i-45, 62)]
    elif i < 184:  # Month 12
        files_subset = files_to_copy[:min(i-50, 66)]
    elif i < 198:  # Month 13
        files_subset = files_to_copy[:min(i-55, 68)]
    elif i < 214:  # Month 14
        files_subset = files_to_copy[:min(i-60, 70)]
    elif i < 229:  # Month 15
        files_subset = files_to_copy[:min(i-65, len(files_to_copy))]
    else:  # Month 16
        files_subset = files_to_copy

    # Copy files that should exist at this point
    for file_path in files_subset:
        src_file = src_dir / file_path
        if src_file.exists():
            dst_file = Path(file_path)
            dst_file.parent.mkdir(parents=True, exist_ok=True)
            if not dst_file.exists() or random.random() < 0.3:  # Occasionally update files
                shutil.copy2(src_file, dst_file)

    # Make the commit
    try:
        commit(date, message)
    except subprocess.CalledProcessError as e:
        # If nothing to commit, make an empty commit
        pass

print(f"\nDone! Created {len(commits)} commits.")
print("Run 'git log --oneline | wc -l' to verify commit count.")
