## 1. Floating WhatsApp button (all pages, desktop + mobile)

- Add a small reusable `WhatsAppFloat` component rendered from `src/routes/__root.tsx` so it appears on every route.
- Number: `+91 95001 92418` → `https://wa.me/919500192418?text=...`
- Prefilled message: `Thank you for choosing Sri Aishwarya Sarees. How may we help you today?` (URL-encoded).
- Style (in `src/heritage-homepage/styles.css`, scoped `.h-wa-float`):
  - Fixed bottom-right, `bottom: 20px; right: 20px`, `z-index: 60`.
  - 56px circle (48px on mobile ≤600px), WhatsApp green `#25D366`, white glyph, soft shadow, gentle pulse ring.
  - `aria-label="Chat on WhatsApp"`, `target="_blank"`, `rel="noopener"`.
- Uses inline SVG (no new dep). Visible on both desktop and mobile — no hiding rules.

## 2. Kids category in header nav

Update the `navGroups` array in `src/routes/index.tsx` to add a new group **Kids** (placed after "Silk Cottons"):

- Group heading link: `https://sriaishwaryasarees.com/product-category/amman-pavadai/` (the existing Pattu Pavadai category on the live site).
- Sub-items:
  - **Kids Pattu Pavadai** → `https://sriaishwaryasarees.com/product-category/amman-pavadai/`
  - (Room left for a second sub-item later; only Pattu Pavadai confirmed for now.)

No other nav changes.

## 3. New `/temples` page — single scrolling page

New route file: `src/routes/temples.tsx` (createFileRoute `"/temples"`), with its own `head()` (title, description, og:title/description, og:image = current featured temple image).

Data source: new JSON file `src/heritage-homepage/temples.json` — an array, newest first:

```json
[
  { "slug": "meenakshi-amman",
    "name": "Meenakshi Amman Temple",
    "location": "Madurai, Tamil Nadu",
    "month": "December 2025",
    "image": "temple-meenakshi.jpg",
    "url": "https://maduraimeenakshi.org/",
    "description": "…full paragraph…",
    "story": ["Paragraph 1", "Paragraph 2", "Paragraph 3"] }
]
```

- Image key resolves via the existing `templeImages` map (moved to a shared `src/heritage-homepage/temple-images.ts` so both `index.tsx` and `temples.tsx` import it).
- To add next month's temple: drop a JPG in `assets/`, add an import + map entry in `temple-images.ts`, prepend a new object to `temples.json`. No component edits needed.

Page layout (all scoped under `.heritage-root`, reusing existing tokens):

```
[ Header — same as home, shared component ]
[ Hero band: "Temple of the Month" eyebrow, page title
  "Sacred Threads — Temples That Inspire Us", short intro paragraph ]

[ Featured (newest) temple — full-bleed section ]
   Large image left, name/location/month, long story on right,
   "Visit temple site" outline button.

[ Archive — each earlier temple as its own alternating section ]
   image ↔ text, subtle divider between entries,
   `<article id="{slug}">` so deep links like /temples#meenakshi-amman work.

[ Footer — same as home, shared component ]
```

New CSS block `.h-temples-*` added to `src/heritage-homepage/styles.css`.

**Link from home page:** in the existing "Temple of the Month" section on `index.tsx`, change the current external "Visit temple website" CTA area to also include a secondary link **"See all featured temples →"** pointing to `/temples`. The external "Visit temple website" button stays.

To keep header + footer identical across both pages without duplicating ~400 lines of JSX, extract them into two small components:
- `src/heritage-homepage/Header.tsx`
- `src/heritage-homepage/Footer.tsx`

`index.tsx` and `temples.tsx` both import these. `navGroups` moves into `src/heritage-homepage/nav.ts` so both use the same nav.

## 4. Static HTML/CSS export for cPanel (two folders)

Deliverable committed to the repo at `static-export/`:

```
static-export/
  home/
    index.html
    css/heritage.css
    js/whatsapp.js         (also handles mobile menu toggle)
    images/…               (all home-page JPGs/PNGs + logo)
  temples/
    index.html             (single scrolling page; uploaded as /temples/ on cPanel)
    css/heritage.css       (same file copied)
    js/whatsapp.js
    images/…               (temple images + shared header/footer images)
```

Rules for the export:
- Pure HTML + CSS + a single tiny vanilla JS file. No React, no build step, no framework.
- CSS is the current `src/heritage-homepage/styles.css` with the `.heritage-root` scope flattened to normal selectors (or kept as-is with `<body class="heritage-root">` — I'll keep the class to avoid rewriting selectors).
- All product / category / nav links are absolute URLs to `sriaishwaryasarees.com` (already the case).
- Cross-page links: `home/index.html` → Temple of the Month button links to `../temples/`; `temples/index.html` header logo links to `../home/`.
- Fonts loaded via `<link>` to Google Fonts in each `index.html` head (Cormorant Garamond + Inter) so no font files need to ship.
- WhatsApp float, mobile nav toggle, and simple carousel behaviour go into `js/whatsapp.js` (~50 lines, no dependencies).
- A short `static-export/README.md` explains: upload `home/` contents to the WooCommerce site root (replacing existing `index.html`) and upload `temples/` as a subfolder, or drop both folders wherever cPanel serves static HTML.

The static export is generated by hand (I'll write the two HTML files directly), not by a build script — that keeps it "no complex stuff", exactly matching what will be uploaded.

## Files touched

Created:
- `src/heritage-homepage/WhatsAppFloat.tsx`
- `src/heritage-homepage/Header.tsx`
- `src/heritage-homepage/Footer.tsx`
- `src/heritage-homepage/nav.ts`
- `src/heritage-homepage/temple-images.ts`
- `src/heritage-homepage/temples.json`
- `src/routes/temples.tsx`
- `static-export/home/index.html` + `css/heritage.css` + `js/whatsapp.js` + `images/*`
- `static-export/temples/index.html` + `css/heritage.css` + `js/whatsapp.js` + `images/*`
- `static-export/README.md`

Edited:
- `src/routes/__root.tsx` — mount `<WhatsAppFloat />`.
- `src/routes/index.tsx` — import shared Header/Footer/nav, add Kids nav group, add "See all featured temples" link.
- `src/heritage-homepage/styles.css` — `.h-wa-float` + `.h-temples-*` blocks.

## Out of scope

- Adding more than one Kids sub-item (only Pattu Pavadai confirmed).
- CMS/back-end for the temples archive — it's a JSON file, edit-then-deploy.
- Automating the static export via a build script.
