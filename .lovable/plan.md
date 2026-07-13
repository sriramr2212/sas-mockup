# Homepage refinements (`src/routes/index.tsx` + `src/heritage-homepage/styles.css`)

Presentation-only changes. No data/business logic changes.

## 1. Hero — top-align text and image (desktop)
- In `.h-hero-grid` (desktop breakpoint only), set `align-items: start` so the eyebrow + H1 + copy + CTA column starts at the same top edge as the image column.
- Remove any vertical centering on `.h-hero-text` / `.h-hero-img` at ≥1024px. Leave the mobile stacked layout untouched.

## 2. New Arrivals — show two more rows
- Bump the query from 8 → **16** products:
  - Update `arrivalsQueryOptions` `queryKey: ["arrivals", 16]` and `queryFn` call to `{ limit: 16 }`.
  - Loader `ensureQueryData` picks it up automatically.
- Remove the CSS caps that hide items past a certain index so all 16 render:
  - Delete `.h-arrivals-grid > .h-product:nth-child(n+7) { display: none; }` (3-col breakpoint) and `.h-arrivals-grid > .h-product:nth-child(n+5) { display: none; }` (2-col breakpoint) in `styles.css`.
- Desktop stays 4 columns → 4 rows visible; tablet 3 cols → 6 rows; mobile 2 cols → 8 rows.

## 3. Family Story — one paragraph, equal height with video
- In `Founder()`, collapse the two `<p>` blocks into a single tighter paragraph (keep tone; ~4–5 lines) covering: family since 1972, same weavers three generations later, saree as a memory in the making.
- Make text column and `.h-video-frame` the same height:
  - On `.h-founder-grid` (desktop), use `align-items: stretch`.
  - On `.h-video-frame`, set `height: 100%` and keep `img { object-fit: cover }` so the video preview matches the text column's height.
  - On `.h-founder`, keep content top-aligned; push the signature/CTA to the bottom with `display: flex; flex-direction: column; justify-content: space-between` so the column fills the row height cleanly.

## 4. Craftsmanship → slim scrolling marquee
- Replace the entire `Craftsmanship()` return with a single slim horizontal marquee band (no eyebrow, no h2, no cards).
- Content, repeated twice for seamless loop:
  `The quiet craft behind every saree  ❃  Heritage Weaves  ❃  Quality, We stand behind  ❃  A story in every saree`
  where `❃` is a small inline paisley SVG lifted from the logo motif (simple leaf/paisley path, ~14px, using `currentColor`, gold tint).
- Styles: new `.h-craft-marquee` (dark ink background to keep continuity with current dark craft section, ~48–56px tall, single line, font-serif italic ~18px, gold paisley separators). Animate with `@keyframes h-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`, `animation: h-marquee 32s linear infinite`, `overflow: hidden`, pause on hover.
- Delete the old `.h-craft-grid`, `.h-craft-card`, `.h-craft-icon` markup usage. Leave the CSS rules in place (harmless) or trim if easy.

## 5. Remove the Stats section
- Remove `<Stats />` from `HeritageHome`'s render tree (leave the function definition removable or unused; simplest is to also delete the `Stats` component).

## 6. Review QR — minimal, on a loom backdrop
- Rewrite `ReviewQR()`:
  - Section wrapper gets a new class `h-review` with a background image of the existing weaving/loom photo (`weaving`, already imported), full-cover, `background-position: center`, no crop of the loom (use `background-size: cover` with a subtle dark overlay `rgba(0,0,0,0.45)` only — no image cropping via fixed height; let the section size to content).
  - Remove the eyebrow, the "Loved your saree? Share a word." H2, and the "Your review helps…" paragraph.
  - Keep only one heading: **"Scan or click to review us"** in white, bold, serif, centered.
  - Two small compact cards side-by-side (`.h-review-card`), each containing:
    - a small QR image (~110×110), and
    - the label **"Google Review — Adyar"** / **"Google Review — T. Nagar"** as a link to the existing `reviewLinks.adyar` / `reviewLinks.tnagar` URLs.
  - Remove the "Open your camera…" copy and the standalone "Write a Google Review →" link (label on the card is the link).
- Add CSS: `.h-review` (loom bg + overlay, generous padding), `.h-review h2` (white bold serif, centered), `.h-review-grid` (flex, gap, center), `.h-review-card` (translucent white/ivory panel, small, rounded, centered content, QR + label link).

## 7. FAQ — all accordions closed by default
- In `Faq()` (home) change `useState<number | null>(0)` → `useState<number | null>(null)`.
- In `src/routes/faq.tsx` change `useState<string | null>(faqs[0]?.q ?? null)` → `useState<string | null>(null)`.

## Verification
- After edits: check the built home in the preview at desktop (1280) and mobile (390) — hero top-align, 16 arrivals in 4×4, equal-height family story, thin scrolling marquee, no stats, minimal review section on loom photo, all FAQ items closed on first paint.
