# SAT Bluebook — File Structure Guide

This file explains every important file in the app and what job it does.
Files you do NOT need to touch are marked as "Leave alone".

---

## The Files You Will Actually Edit

### `src/config.ts` ⭐ MOST IMPORTANT
**Your main control panel.** Change things here and they update everywhere automatically.
- Student name shown in all footers
- Break duration (minutes between R&W and Math sections)
- All colors used across the app (navy, blue, yellow, etc.)

---

### `src/data/questions.ts` ⭐ MOST IMPORTANT
**All 108 test questions live here.** This is where you add, edit, or remove questions.

Each question has this shape:
```
{
  id: 1,
  passage: "The text shown in the LEFT panel (only for R&W questions)",
  text: "The question prompt shown in the RIGHT panel",
  choices: [
    { letter: "A", text: "First option" },
    { letter: "B", text: "Second option" },
    { letter: "C", text: "Third option" },
    { letter: "D", text: "Fourth option" },
  ],
  answer: "A",   ← the correct letter (just for reference, not graded)
}
```

The file is divided into 4 sections (modules):
1. Reading and Writing — Module 1 (27 questions)
2. Reading and Writing — Module 2 (27 questions)
3. Math — Module 1 (22 questions)
4. Math — Module 2 (22 questions)

> **Rule:** R&W questions MUST have a `passage` field (shows two panels).
> Math questions do NOT use `passage` (shows one centered panel).

---

### `src/index.css`
**All the visual styling.** Controls fonts, colors, spacing, layout, button shapes, etc.
Edit this if you want to change how something looks but it is not in `config.ts`.

---

## The Screen Files (one file = one screen)

These files control what the user sees at each step of the test.

| File | Screen | When it appears |
|------|--------|-----------------|
| `src/screens/LoginScreen.tsx` | Sign In page | First thing the user sees |
| `src/screens/MenuScreen.tsx` | Dashboard / Main Menu | After signing in |
| `src/screens/StartScreen.tsx` | Start Code entry page | After clicking "Full-Length Practice" |
| `src/screens/TestScreen.tsx` | The actual test | While answering questions |
| `src/screens/ReviewScreen.tsx` | Review your answers | Before submitting a module |
| `src/screens/BreakScreen.tsx` | Break countdown | Between R&W and Math |
| `src/screens/ModuleOverScreen.tsx` | "Module Complete" message | After submitting a module |
| `src/screens/DoneScreen.tsx` | Congratulations page | After the whole test is done |

---

### `src/App.tsx`
**The traffic controller.** Decides which screen to show based on where the user is in the test flow.

Flow it manages:
```
StartScreen → TestScreen (R&W M1) → ReviewScreen → ModuleOverScreen
           → TestScreen (R&W M2) → ReviewScreen → ModuleOverScreen
           → BreakScreen
           → TestScreen (Math M1) → ReviewScreen → ModuleOverScreen
           → TestScreen (Math M2) → ReviewScreen → ModuleOverScreen
           → DoneScreen
```

You rarely need to edit this unless you want to add a completely new screen.

---

### `src/components/QuestionPaletteModal.tsx`
The pop-up panel that appears when you click "Question X of Y" in the footer.
Shows all question numbers, which are answered, and which are flagged.

---

## Files You Can Ignore (Leave Alone)

These are auto-generated or utility files. You do not need to touch them.

| Path | What it is |
|------|-----------|
| `src/main.tsx` | App entry point — just boots React |
| `src/lib/utils.ts` | One small helper function |
| `src/hooks/` | Two small utility hooks (toast + mobile detection) |
| `src/pages/not-found.tsx` | 404 page if someone goes to a wrong URL |
| `src/components/ui/` | A folder of ~40 pre-built UI components (buttons, dialogs, etc.) — none of them are used by the SAT app directly, they came with the template |

---

## Config & Build Files (Root of `artifacts/sat-bluebook/`)

| File | What it does |
|------|-------------|
| `vite.config.ts` | Build tool config — leave alone |
| `tailwind.config.ts` | Tailwind CSS config — leave alone |
| `tsconfig.json` | TypeScript settings — leave alone |
| `package.json` | Lists the app's dependencies — leave alone |
| `index.html` | The HTML shell that loads the React app — leave alone |

---

## Quick Reference — "Where do I go to change X?"

| What you want to change | File to open |
|------------------------|-------------|
| Student name | `src/config.ts` |
| Break duration | `src/config.ts` |
| App colors | `src/config.ts` |
| A question's text or answer options | `src/data/questions.ts` |
| Add or remove a question | `src/data/questions.ts` |
| How the test screen looks | `src/index.css` or `src/screens/TestScreen.tsx` |
| The congratulations page | `src/screens/DoneScreen.tsx` |
| The break page | `src/screens/BreakScreen.tsx` |
| The start/login page | `src/screens/StartScreen.tsx` |
