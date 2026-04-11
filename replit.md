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

## Easy Customization

### `artifacts/sat-bluebook/src/config.ts`
Edit to change:
- `studentName` — fallback name (overwritten at login with the logged-in user's real name)
- `breakDurationMinutes` — duration of the break between R&W and Math
- `colors` — all app colors in one place (navbar, buttons, etc.)

### `artifacts/sat-bluebook/src/data/users.ts`
Edit to add/remove authorized login accounts:
- `username` — login username (case-insensitive)
- `password` — login password (case-sensitive)
- `displayName` — full name shown in nav bar and all screen footers
- `firstName` — used in the welcome greeting on the menu screen

## SAT Bluebook App (`artifacts/sat-bluebook`)

A pixel-perfect replica of the College Board's Bluebook digital SAT interface.

### Authentication
- **LoginScreen** — two-stage: initial buttons → username/password form
- Credentials validated against `src/data/users.ts`; wrong credentials show an error message
- Logged-in user's name flows through App state to MenuScreen, TestScreen, BreakScreen, ReviewScreen

### Screens
- **LoginScreen** — sign-in page with real credential validation
- **MenuScreen** — dashboard showing "Your Tests" and "Practice and Prepare" sections; displays the logged-in user's name
- **StartScreen** — 6-digit proctor code entry; "Return to Home" navigates back to menu
- **TestScreen** — full test interface:
  - Header shows "Section X, Module Y: Subject" format
  - R&W modules: Annotate + More tools
  - Math modules: Calculator (real Desmos Graphing Calculator via API) + Reference + More
  - Two-panel layout (passage left / question right) for R&W; single-panel centered for Math
  - Timer with show/hide, low-time red highlight (under 5 min)
  - Mark for Review bookmark toggle
  - Answer cross-out: right-click an option to strike it through; click Undo to restore
  - Question palette modal (pop-up from bottom pill)
  - Directions dropdown (content varies by section type)
- **BreakScreen** — dark theme, live countdown timer, break rules, Resume button
- **ReviewScreen** — "Check Your Work" page with question grid, Back/Submit buttons
- **ModuleOverScreen** — auto-advances after 3s with CSS spinner
- **DoneScreen** — completion summary with questions answered count

### Data
- `src/data/questions.ts` — 4 modules: R&W M1 (27q, 32min), R&W M2 (27q, 32min), Math M1 (22q, 35min), Math M2 (22q, 35min)
- R&W questions have a `passage` field (two-panel layout)
- Math questions have no `passage` (single-panel centered layout)

### Fonts & Colors
- Font: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`
- Navy: `#1a1f71`
- Selected answer letter: filled blue `#1a4fcf`
- Next button: `#4b66f1`
- Low timer: `#dc2626`

### CSS Architecture
- `src/index.css` — all CSS: base reset, test screen layout classes, responsive breakpoints, spinner animation, break screen classes
- Components use `className` for CSS classes, `style` props for dynamic/conditional values only

### Third-Party Integrations
- **Desmos API** (`https://www.desmos.com/api/v1.8/calculator.js`) — loaded dynamically on first Calculator click; reused thereafter
