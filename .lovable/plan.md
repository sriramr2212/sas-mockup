## 1. Full dropdown lists in header (from live site)

Rewrite `navGroups` in `src/routes/index.tsx` using the real category URLs scraped from sriaishwaryasarees.com. Each parent still links to its own top category; sub-items go into the existing `.h-nav-panel` (already supports any length — will add multi-column CSS if a group has >6 items).

Groups (parent → sub-items):

- **Kanjivaram Silks** → Pure Silk, Soft Silk, Korvai Kanjivaram, Pure Raw Silk, Tussar Silk, Vegan Silk, Bridal Collection.
- **Silk Cotton** → All Collections, Ameya, Kora, Korvai, Big Border, Butta, Muthukattam, Thread Work, Vaira Oosi, Veldhari, Simple Silk Cotton, Printed Silk Cotton.
- **Semi Silk Cotton** → Traditional Semi Silk Cotton, Printed Semi Silk Cotton, Semi Mysore Silk, Mangalagiri Silks, Fancy Raw Silk, Fancy Tussar Silks.
- **Cotton Sarees** → Kuravalli, Chettinad, Kanchi, Jaipur, Chanderi, Kadhi, Devendra, Rich Cotton, Printed Cotton, Sungadi.
- **10 & 9 Yards** → All Collections, 10 Yards Pure Silk, 10 Yards Silk Cotton, 10 Yards Semi Silk Cotton, 10 & 9 Yards Pure Cotton, 9 Yards Kalyani Cotton, 9 Yards Sungadi, Devendra Sarees.
- **Kids** → Amman Pavadai, Ready Made Kids Frock.
- **Men's** → Kurtas & Bushirt, Pattu Dhothi, 4/6/8 Muzham Dhoti, Dhoti 9×5 / 10×6, Dhothi 2×8.
- **Dance** → Arangetram Sarees, Dance Practice Sarees.
- **Fancy** → Fancy Sarees, Fancy Raw Silk, Fancy Tussar Silks.

CSS: add `.h-nav-panel.is-wide { columns: 2; min-width: 460px; }` for the two biggest groups (Silk Cotton, Cotton Sarees) so the panel stays a comfortable width.

## 2. Live New Arrivals from WordPress (no keys needed)

Verified: `https://sriaishwaryasarees.com/wp-json/wc/store/v1/products?per_page=…&orderby=date&order=desc` returns 200 JSON publicly — no auth required. Nothing needed from you.

Implementation:
- New server function `src/lib/arrivals.functions.ts` — `getNewArrivals({ limit })` fetches the Store API server-side with a 10-minute in-memory cache and maps each product to `{ name, price, img, href }` using `images[0].src`, `prices.price + prices.currency_symbol`, and `permalink`. Reason to fetch server-side: some hosts block browser CORS; also lets us cache and shrink bundle payload.
- `src/routes/index.tsx` loader primes `queryClient.ensureQueryData` with those options (default read pattern from tanstack-query-integration). `NewArrivals` reads via `useSuspenseQuery`. Removes hardcoded `newArrivals` and the 6 `na-*.jpg` imports.
- On fetch error (rare), the loader returns an empty array and the section shows a small "View all new arrivals on our store →" fallback instead of crashing.

## 3. Responsive item count for New Arrivals

Currently the grid shows all 6. Change:
- Fetch **8** products.
- Grid: mobile 2 cols → show 4 items (hide 5th–8th via `:nth-child(n+5){display:none}`), tablet 3 cols → show 6, desktop 4 cols → show 8.
- Purely CSS in `styles.css`, no JS.

## 4. Trim Our Craftsmanship

- Shorten section heading paragraph to a single line.
- Reduce each of the 3 card paragraphs to ~1 short sentence.
- CSS: cut `.h-craft` vertical padding roughly in half (e.g. `padding: 64px 0` → `40px 0`), tighten `.h-section-head` bottom margin.

## 5. Reorder + faster mobile carousel

- In `HeritageHome`, move `<CollectionsCarousel />` above `<Craftsmanship />`.
- In `.h-carousel-track` marquee CSS, add a media query: `@media (max-width: 720px) { animation-duration: 28s; }` (or whatever value gives ~1.4× current mobile speed — still smooth, not frantic). Desktop untouched.

## 6. Collections thumbnails & links sourced from the site

Keep the current 13 collection tiles but rewrite each `href` to the exact live category URL (from the scrape above) and add real per-category thumbnails.
- Fetch category images at build/render time via the Store API `/products/categories?slug=…` (returns `image.src`). Same server function file adds `getCollectionThumbnails()` (cached 1 hour), keyed by slug list defined in code. The current bundled `col-*.jpg` files act as SSR fallbacks so the site never renders blank.
- Component uses whichever it has: live image first, bundled fallback second.

## 7. Shorten Visit Our Stores

- Trim intro paragraph to one line.
- CSS `.h-section--alt` (used by this section): reduce top/bottom padding ~30–40%. Cards keep their layout; only vertical breathing room shrinks.

## 8. Global padding audit

Sweep every `.h-section`, `.h-gift`, `.h-vshop`, `.h-craft`, `.h-stats`, `.h-ig-grid` block; where padding exceeds ~80px top/bottom, reduce to ~48–56px on desktop and ~32–40px on mobile. Sections that already feel tight (TrustStrip, Hero) are left as-is.

## 9. Trim AI Try-On section

- Delete the image column and `aiTryon` import.
- Convert `.h-aitryon-grid` to a single centered text block, ~60ch max width.
- Shorten copy to 2 short lines + CTA button. Cut vertical padding in half.

## 10. Footer credit

In the existing `Footer` component, add a final line inside the bottom bar (right-aligned on desktop, centered on mobile):

> Homepage designed by [KlivIQ Technologies OPC](https://kliviq.com)

Link opens in a new tab (`target="_blank"`, `rel="noopener"`).

## Files touched

Created:
- `src/lib/arrivals.functions.ts` — `getNewArrivals`, `getCollectionThumbnails` server fns hitting the public WP Store API.

Edited:
- `src/routes/index.tsx` — new `navGroups`, loader wiring, live arrivals + collections, section reorder, trimmed Craftsmanship/Stores/AI Try-On copy, updated Footer, drop `ai-tryon.jpg` and `na-*.jpg` imports.
- `src/heritage-homepage/styles.css` — wide nav panels, responsive arrivals grid, faster mobile marquee, reduced section paddings, single-column AI Try-On, footer credit style.

Also regenerate the static export (`python3 scripts/export-static.py`) once React changes are in, so `static-export/` reflects the new home page.

## Out of scope

- Wiring the WooCommerce REST API with consumer keys (not needed — public Store API is sufficient).
- Changing the temples page or WhatsApp float.
- Automated CMS for collection categories (the slug list stays in code; the images/links are live).
