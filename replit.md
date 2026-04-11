# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Contains an API server and the SAT Bluebook digital test interface app.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/sat-bluebook run dev` — run SAT Bluebook app locally
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Easy Customization (`artifacts/sat-bluebook/src/config.ts`)

Edit `config.ts` to change:
- `studentName` — student name shown in all screen footers
- `breakDurationMinutes` — duration of the break between R&W and Math
- `colors` — all app colors in one place (navbar, buttons, etc.)

## SAT Bluebook App (`artifacts/sat-bluebook`)

A pixel-perfect replica of the College Board's Bluebook digital SAT interface.

### Features
- **StartScreen** — code entry screen matching Bluebook's login UI
- **TestScreen** — full test screen with:
  - Two-panel layout (passage left / question right) for R&W; single-panel for Math
  - Light blue `#E6EDF8` header and footer (matching original HTML design)
  - Timer with show/hide, low-time red highlight
  - Mark for Review bookmark toggle
  - Answer cross-out: right-click an option to strike it through; click Undo to restore
  - Question palette modal (pop-up from bottom pill, pin current, dashed borders)
  - Directions dropdown with gold close button
  - Calculator + Reference overlays for Math module
  - Fully responsive: tablet (≤1024px) and mobile (≤767px) breakpoints
- **BreakScreen** — dark theme, live countdown timer, break rules, Resume button
- **ReviewScreen** — "Check Your Work" page with question grid, Back/Next buttons
- **ModuleOverScreen** — auto-advances after 3s with CSS spinner
- **DoneScreen** — completion summary with questions answered count

### Data
- `src/data/questions.ts` — 15 R&W questions + 22 Math questions across 2 modules
- Module 1: Reading and Writing (32 min) with passages
- Module 2: Math (35 min) without passages, Calculator/Reference tools enabled

### Fonts & Colors
- Font: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif` (matching original)
- Header/footer: `#E6EDF8` blue-gray
- Navy: `#1a1f71`
- Selected answer: border `#1a1f71`, bg `#f0f4ff`
- Next button: `#4b66f1`

### CSS Architecture
- `src/index.css` — all CSS: base reset, test screen layout classes, responsive breakpoints, spinner animation, break screen classes
- Components use `className` for CSS classes, `style` props for dynamic/conditional values only
