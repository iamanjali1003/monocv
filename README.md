# monoCV

A free resume builder that produces clean, ATS-friendly resumes. Fill in a guided
form, watch the preview update as you type, and export a PDF that parsers can
actually read.

## Why

Most resume builders either lock the export behind a paywall or generate a PDF
full of tables, columns and icons that applicant tracking systems fail to parse.
monoCV keeps the output deliberately plain so the text extracts cleanly, while
the editing experience stays pleasant.

## Features

- **Guided form** covering personal info, education, experience, projects and skills
- **Live preview** that re-renders as you type
- **PDF export** rendered from the same data through `@react-pdf/renderer`
- **Drafts survive reloads** — state is persisted to `localStorage`
- **Type-safe input** — every form is validated against a Zod schema
- **Modular templates** — adding a new design means adding one folder

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS, shadcn/ui, Lucide icons |
| Forms | React Hook Form + Zod |
| State | Zustand with the `persist` middleware |
| PDF | `@react-pdf/renderer` |
| Package manager | pnpm |

## How it fits together

**One source of truth.** A single `Resume` object lives in a Zustand store
(`src/lib/store.ts`). The `persist` middleware mirrors it to `localStorage`, so a
refresh never costs you a draft. Every form section writes back through its own
action rather than mutating shared state.

**Validation at the edge.** `src/lib/schemas.ts` defines a Zod schema per section.
React Hook Form validates against it before anything reaches the store, so the
store only ever holds well-formed data.

**Templates are pluggable.** `src/templates/registry.ts` maps a template id to a
`ResumeTemplate`. Each template supplies two renderers over the same data — a
React component for the on-screen preview and a `@react-pdf` component for the
exported file. Adding a template means creating a folder with `preview.tsx`,
`pdf.tsx` and `index.ts`, then registering it; nothing else changes.

```
src/
├── app/                  # routes: landing, templates gallery, builder
├── components/
│   ├── forms/            # one form per resume section
│   └── ui/               # shadcn/ui primitives
├── lib/
│   ├── store.ts          # Zustand store + localStorage persistence
│   ├── schemas.ts        # Zod validation schemas
│   └── types.ts          # Resume data model
└── templates/
    ├── registry.ts       # id -> template lookup
    └── classic/          # preview.tsx (screen) + pdf.tsx (export)
```

## Running it locally

Requires Node 20+ and pnpm.

```bash
git clone https://github.com/iamanjali1003/monocv.git
cd monocv
pnpm install
pnpm dev
```

Then open <http://localhost:3000>.

## Scripts

```bash
pnpm dev      # development server
pnpm build    # production build
pnpm start    # serve the production build
pnpm lint     # ESLint
```

## Adding a template

1. Create `src/templates/<name>/`
2. Add `preview.tsx` (React) and `pdf.tsx` (`@react-pdf/renderer`), both reading the same `Resume`
3. Export a `ResumeTemplate` from `index.ts`
4. Register it in `src/templates/registry.ts`

Set `available: false` to keep a work-in-progress template out of the gallery.

## License

MIT
