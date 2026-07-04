## 1. Footer image — proper handloom weaving, dark & on-theme

The footer currently uses `weaving-video.jpg` (or a similar dark asset) that reads as a black blob. Generate a new asset `src/heritage-homepage/assets/footer-weaving.jpg` — a close-up of hands at a Kanjivaram loom (silk warp threads, gold zari, wooden shuttle), rendered dark and warm to match the site's ivory/maroon palette. Replace the current footer background/image reference in `Footer()` (src/routes/index.tsx around L966+) and its CSS in `styles.css` so the subject is actually legible: reduce the dark overlay from whatever heavy tint is currently applied to a lighter gradient (e.g. `linear-gradient(180deg, rgba(20,10,6,.55), rgba(20,10,6,.75))`) and use `background-size: cover; background-position: center`.

## 2. Testimonials ↔ Stores spacing + shorter store cards

- In `styles.css`, cut the vertical padding on `.h-testimonials` bottom and `.h-stores` (a.k.a `.h-section--alt` used by Visit Our Stores) top by ~50% (target ~40–48px each on desktop, ~28px mobile).
- Constrain the boutique images: add `.h-store-media img { height: 220px; object-fit: cover; }` (desktop) and `~160px` on mobile. Currently they render at natural aspect ratio and dominate the section length.
- Tighten `.h-store-body` internal padding a notch so the whole card is shorter.

## 3. Shrink "Scan or Click to Review Us" + move it above Visit Our Stores

- In `src/routes/index.tsx`, reorder the JSX in `HeritageHome` from:
  `Testimonials → Stores → ReviewQR → FeaturedTemple`
  to:
  `Testimonials → ReviewQR → Stores → FeaturedTemple`.
- In `styles.css`, reduce `.h-reviewqr` (or whatever the ReviewQR section class is — will confirm on edit) padding to ~32–40px top/bottom, shrink the QR cards (`max-width: 260px`, QR image `140px` square) and tighten the heading margin so the block sits snug against Testimonials.

## 4. Featured Temple — two-column (previous month | current month)

Rework `FeaturedTemple()` and `featured-temple.json` so the section shows two temples side-by-side:

- Update `src/heritage-homepage/featured-temple.json` to:
  ```json
  { "previous": { …June entry… }, "current": { …July entry… } }
  ```
- Component renders a CSS grid `grid-template-columns: 1fr 1.35fr` (desktop), single column stacked on mobile. Left cell is the previous month (smaller image, muted eyebrow "Last Month"), right cell is the current month (larger image, eyebrow "This Month · July 2026", primary "Read the story →" button linking to `/temples#<slug>`).
- Both cells pull image + link data through the same `templeImages` map already in `src/routes/index.tsx`.

## 5. More temples in the archive (3–4 total additions)

Extend `src/heritage-homepage/temples.json` from 1 → 4 entries so the temples page has real archive depth. Fake but plausible monthly dates ending on July 2026:

| Month | Temple | Location |
|---|---|---|
| July 2026 (current) | Meenakshi Amman Temple | Madurai, Tamil Nadu |
| June 2026 | Kamakshi Amman Temple | Kanchipuram, Tamil Nadu |
| May 2026 | Chennakeshava Temple | Belur, Karnataka |
| April 2026 | Sri Ranganathaswamy Temple | Srirangam, Tamil Nadu |

For each new temple:
- Add a new JPG asset under `src/heritage-homepage/assets/` (`temple-kamakshi.jpg`, `temple-chennakeshava.jpg`, `temple-ranganathaswamy.jpg`) via imagegen — architectural exterior of the temple's iconic gopuram / vimana, warm daylight, matching the existing Meenakshi photo's editorial tone.
- Register each in the `templeImages` map at the top of `src/routes/temples.tsx` **and** in `src/routes/index.tsx` (so the Featured Temple cells can use them).
- Write a 1-paragraph `description` (used in cards) and a 3-paragraph `story` (used in the archive entry), each tying the temple's motifs/architecture back to South Indian handloom.
- Real official URLs where they exist:
  - Kamakshi Amman: `https://kanchikamakshi.com/`
  - Chennakeshava Belur: `https://www.karnatakatourism.org/tour-item/chennakeshava-temple/`
  - Ranganathaswamy Srirangam: `https://srirangam.org/`

The temples page already renders `[featured, ...archive]` from the JSON in order, so ordering entries `[Meenakshi (July), Kamakshi (June), Chennakeshava (May), Ranganathaswamy (April)]` makes the archive display work with no code change beyond the `templeImages` map.

## Files touched

**Created**
- `src/heritage-homepage/assets/footer-weaving.jpg`
- `src/heritage-homepage/assets/temple-kamakshi.jpg`
- `src/heritage-homepage/assets/temple-chennakeshava.jpg`
- `src/heritage-homepage/assets/temple-ranganathaswamy.jpg`

**Edited**
- `src/routes/index.tsx` — reorder sections, rewrite `FeaturedTemple` as two-column, swap footer image, extend `templeImages`.
- `src/routes/temples.tsx` — extend `templeImages` for the 3 new temples.
- `src/heritage-homepage/featured-temple.json` — new `{ previous, current }` shape.
- `src/heritage-homepage/temples.json` — add 3 new temple entries.
- `src/heritage-homepage/styles.css` — footer overlay + background, testimonial/stores padding, boutique image height cap, ReviewQR sizing, FeaturedTemple two-column grid.

**Also**: re-run `python3 scripts/export-static.py` after the React changes land so `static-export/` reflects the new layout and includes the new temple images.

## Out of scope

- Adding a real CMS for temple entries (still JSON-driven).
- Restructuring the temples page beyond adding the new archive entries.
- Any changes to header nav, New Arrivals data, or collections carousel.
