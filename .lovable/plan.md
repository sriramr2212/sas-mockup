## 1. Reduce temples hero padding
In `src/heritage-homepage/styles.css`, cut `.h-temples-hero` top/bottom padding roughly in half (desktop ~48px, mobile ~28px) so the hero feels tighter.

## 2. Blog-style in-page temple index (auto-updating)
In `src/routes/temples.tsx`, right below the hero add a `<nav class="h-temples-index">` that maps `templesData` into anchor lines like `July 2026 — Meenakshi Amman Temple → …`. Each links to `#{slug}`; entries already carry `id={slug}`, so clicks jump straight to the write-up. Because it's derived from `temples.json`, adding a new temple auto-adds a new index item. Add `scroll-margin-top` and `scroll-behavior:smooth` in CSS.

## 3. Ivory that matches sriaishwaryasarees.com
The live site's page background is a warm ivory around `#FFF6E5` with a softer cream `#FBEFD9` on some sections. Update ivory tokens in `src/heritage-homepage/styles.css` and `--background` / `--paper` in `src/styles.css` so the home page and temples page share the exact palette used on sriaishwaryasarees.com.

## 4. Single source of truth for the featured temple
Currently the home page reads `featured-temple.json` and the temples page reads `temples.json` — they drift.

- Refactor the home page's Featured Temple section to import `temples.json` directly. `temples[0]` = current month, `temples[1]` = previous month.
- Keep `temples.json` sorted newest-first; adding a new entry at the top rotates both the homepage feature and the temples archive automatically.
- Refresh dates/copy in `temples.json` if any are stale.
- Mark `src/heritage-homepage/featured-temple.json` for removal (see §6).

## 5. Remove every "Lovable" reference, add KlivIQ as author

Files to edit:
- `src/routes/__root.tsx` — drop any Lovable meta/OG/site-name; add `<meta name="author" content="KlivIQ Technologies OPC">`; set `og:site_name` to `Sri Aishwarya Sarees`.
- `src/routes/temples.tsx`, `src/routes/index.tsx` — add the same author meta; ensure both footers show "Page designed by KlivIQ Technologies OPC" linking to kliviq.com.
- `src/lib/lovable-error-reporting.ts` — rename to `src/lib/error-reporting.ts`, rename export to `reportError`, remove `window.__lovableEvents` (replace with a no-op console.error fallback), update all import sites.
- `package.json` — rename `"name"` off any lovable value; drop `lovable-tagger` from devDependencies and any `lovable:*` scripts.
- `vite.config.ts` — remove `lovable-tagger` plugin import + usage.
- `AGENTS.md`, `bunfig.toml` — strip Lovable strings.
- `bun.lock` and `tsconfig.tsbuildinfo` regenerate automatically.

## 6. File audit — deletion candidates (I will NOT delete without your OK)

I'll present the concrete list at the top of the build phase after grepping actual imports. Expected candidates:

**Very likely safe to remove:**
- `src/heritage-homepage/featured-temple.json` (superseded by §4)
- `src/lib/lovable-error-reporting.ts` (replaced in §5)
- `.lovable/` folder (`plan.md`, `project.json`) — Lovable-only metadata
- `src/routes/README.md` — internal note
- Unused shadcn components under `src/components/ui/*` — the site only imports a handful; ~40 files (accordion, alert-dialog, calendar, carousel, chart, command, drawer, menubar, resizable, sidebar, sheet, sonner, table, tabs, toggle-group, etc.) are unused. I'll list the exact set.
- `src/hooks/use-mobile.tsx` if no route imports it.
- `src/lib/arrivals.functions.ts` if no route imports it.

**Depends on how you deploy:**
- `static-export/` folder and `scripts/export-static.py` — only needed if you're shipping a static snapshot. If deployment uses TanStack Start on the Lovable host, this whole tree can go.

**Keep:**
- `src/routes/*`, `src/heritage-homepage/*` (minus featured-temple.json), in-use `src/components/ui/*`, `src/lib/utils.ts`, `src/router.tsx`, `src/server.ts`, `src/start.ts`, `src/styles.css`, config files (`vite.config.ts`, `tsconfig.json`, `components.json`, `eslint.config.js`, `.prettierrc`, `.prettierignore`).

## Execution order in build phase
1. Implement §1–§5 in one pass and verify the site renders (home + `/temples`).
2. Produce the exact §6 deletion list and wait for your approval before removing anything.

## Out of scope
- No redesign of unrelated sections, no content rewrites beyond dates/month labels, no package upgrades, no changes to `static-export/` behavior until you confirm deploy target.
