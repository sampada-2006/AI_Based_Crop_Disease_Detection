---
trigger: always_on
---

PROJECT RULES (apply to every task in this workspace)
- Stack: React (Vite, JavaScript), Tailwind CSS v4, lucide-react, i18next/react-i18next. No TypeScript, no UI kits, no router library. Do NOT add any dependency unless the task explicitly allows it.
- Frontend-only prototype. All data is local mock data. No network calls, no external image or font URLs: everything must work offline. Illustrations = inline SVG / CSS / emoji.
- Every visible string goes through i18next t() with matching keys in BOTH mr and en in src/i18n.js (Marathi is the default language). Never hardcode UI text in components.
- Style with Tailwind utility classes and the design tokens in src/index.css.
- Visual reference: docs/reference/ui-showcase.png (10 screens). Match layout, spacing, rounded corners, colours and hierarchy of the panel named in the task.
- SCOPE DISCIPLINE: do ONLY what the current batch lists. Do not refactor, rename, restyle or "improve" anything outside the listed files. Do not start the next batch. Do not add features, pages, animations or comments that were not requested. Do not run git commands.
- Only Batch 1 may edit src/components/DesktopLayout.jsx. Never edit src/data/mockData.js after Batch 1 (both are legacy and are deleted in the final batch).
- Finish every batch with `npm run build` passing, then reply with exactly: (1) files created/modified, (2) anything you could not match to the reference. Nothing else.