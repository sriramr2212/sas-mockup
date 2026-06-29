## Changes

### 1. Match section sizing across Gift Card, Video Saree, AI Try-On
Use Gift Card section as the size/border reference. Update `.h-vshop--compact` and `.h-aitry` in `src/heritage-homepage/styles.css` to mirror Gift Card's padding, image min-height (~320px), grid ratios, and border treatment so all three sections feel uniform and compact.

### 2. Video Saree — flip image to right + fix vertical alignment
- In `src/routes/index.tsx`, reorder Video Shopping's grid so the image is on the right (text left). Gift Card has image left, AI Try-On has image left → Video Saree on the right alternates the rhythm.
- Add `align-items: center` to `.h-vshop-inner` so the text block and image align cleanly top/bottom.

### 3. Typography tweaks
- Increase H2 size for the three section titles (Gift Card, Video Saree, AI Try-On) — bump `.h-gift-text h2`, `.h-vshop-text h2`, `.h-aitry-text h2` up one step.
- Collections section: make the eyebrow "SHOP BY COLLECTION" larger and more prominent (bigger font, stronger letter-spacing/weight). Reduce the sub-tagline "Every collection, in its…" to a small, muted line.

### 4. AI Try-On description → one liner
Trim the paragraph under the AI Try-On heading in `src/routes/index.tsx` to a single sentence (e.g., "Virtually drape any saree from our collection — coming soon to your phone.").

### 5. Testimonials — carousel with 3 visible + arrows
- Rename section title to **"Testimonials from our Patrons"**.
- Replace the current static grid with a carousel showing up to 3 testimonials at a time, with left/right arrow controls on the sides. Implementation: lightweight state-based slider (index + prev/next) inside `src/routes/index.tsx` using existing `.h-test-*` card styles; arrows styled like the collections carousel arrows. On mobile, show 1 per view.

### 6. Reorder — move Instagram "From our looms" to the end
Move the `.h-ig` section JSX so it renders after the Featured Temple section (currently the last content section before footer-area).

## Technical Notes
- Files edited: `src/routes/index.tsx`, `src/heritage-homepage/styles.css`.
- No new dependencies — testimonial carousel uses local React state, not Embla.
- No changes to data files or assets.
