## 1. Hero — image sized to match text column height

The image column still runs taller than the text column because the grid enforces `min-height: max(65vh, 560px)` and `max-height: 820px`. The text (headline + short paragraph + two buttons) is naturally ~520px, so the image gets stretched to viewport height.

Edit `src/heritage-homepage/styles.css` (≥1024px only — mobile stays untouched):

- `.h-hero-grid`: remove `min-height` and `max-height`; keep `align-items: stretch`. Height now driven by the text column.
- `.h-hero-text`: reduce top/bottom padding from `64px 64px` to `72px 64px 64px` (keeps breathing room; no artificial min-height added).
- `.h-hero-img`: reduce inner padding from `32px` to `20px`, keep `height: 100%; overflow: hidden`.
- `.h-hero-img img`: keep `object-fit: cover` so the image fills the shorter box without letterboxing or distortion.

Result: the image column takes exactly the height of the text column on desktop; the model's height cannot exceed the copy any more.

**Verification (before marking build-ready):** run Playwright at 1440×900, screenshot the hero, and assert `getBoundingClientRect().height` of `.h-hero-text` equals `.h-hero-img` within 1px. Also spot-check at 1280 and 1920. If unequal, iterate on padding before shipping.

## 2. Lovable references — status

Remaining matches are all build-tooling for the Lovable dev/preview environment, not user-visible or shipped output:

- `package.json` → `@lovable.dev/vite-tanstack-config` (Vite preset)
- `vite.config.ts` → imports that preset
- `bunfig.toml` → install-age exclusion for Lovable packages

These are **required** for the app to build and preview inside Lovable. Removing them breaks the dev server with no user benefit. The static export shipped to the client (`static-export/home/`, `static-export/temples/`) contains **zero** Lovable strings — verified with ripgrep.

Recommendation: leave the three tooling references in place; they never reach the WordPress site. If you still want them scrubbed from the source repo, say so and I'll swap Vite config to a vanilla TanStack Start setup in a follow-up (higher risk — needs a full build verification pass).

## 3. WordPress integration confirmation

The developer flow is already drop-in via `scripts/export-static.py` → `static-export/`:

```text
static-export/
  home/       index.html + css/heritage.css + images/
  temples/    index.html + css/heritage.css + images/
```

Each folder is fully self-contained (no JS framework, no build step, no server code). Internal links are already rewritten to relative paths; shop/product links point to the live WooCommerce URLs.

**Gap to close before handoff:** the glossary and FAQ routes exist in the app but the export script only renders `/` and `/temples`. Add them to the loop in `scripts/export-static.py`:

- Add `("glossary", "http://localhost:8080/glossary")` and `("faq", "http://localhost:8080/faq")` to the route list.
- Add the reverse href rewrites so cross-page nav resolves (`/glossary` → `../glossary/index.html`, `/faq` → `../faq/index.html`, plus existing `/` and `/temples`).
- Update `static-export/README.md` with upload steps for the two new folders (`glossary/`, `faq/`) and their public URLs.

After that, re-run `python3 scripts/export-static.py`. The developer then uploads each folder into `public_html/` under its slug — no WordPress plugin, PHP edit, or theme change required. Existing WordPress pages/routes are untouched unless the client explicitly replaces `public_html/index.html`.

**Integration risks the developer should know:**
- If the WordPress theme injects a global stylesheet on all URLs, the `.heritage-root` scoping isolates our CSS but the theme's header/footer will not appear on these static pages (that's intentional — these are standalone pages).
- WooCommerce product links are hardcoded to `sriaishwaryasarees.com`; if the domain differs on staging, do a find-replace in the exported HTML.
- Fonts load from Google Fonts CDN — no local hosting needed.

## Deliverables in build mode

1. Edit `src/heritage-homepage/styles.css` (hero grid + padding rules above).
2. Edit `scripts/export-static.py` to include `glossary` and `faq` routes + href rewrites.
3. Update `static-export/README.md` with the two new folders.
4. Run Playwright verification on the hero heights; iterate if not equal.
5. Re-run the export script to regenerate `static-export/`.
