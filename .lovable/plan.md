## Plan: Final Layout Refinements (Gift Cards → Stats)

### 1. AI Try-On — Break the 50/50 repetition
Gift Cards and Video Shopping keep their existing full-bleed split layouts.

Redesign AI Try-On into a **centered premium announcement card**:
- Contain the content in a centered card (`max-width: ~900px`) instead of a full-bleed two-column grid.
- Display the illustration with `object-fit: contain` so it is fully visible (not tightly cropped) and framed with a subtle gold glow / border for visual presence.
- Place the image above the text in a portrait/announcement composition, or keep it beside the text but inside the contained card with relaxed proportions.
- Keep the existing burgundy/gold/cream palette and dark gradient background.
- Update the heading copy: **"Your Personal AI Saree Trial Room. Coming Soon."**

### 2. Increase vertical spacing between sections
Add extra margin/padding between:
- Gift Cards → Video Shopping
- Video Shopping → AI Try-On
- AI Try-On → Heritage Statistics

Target: each transition should feel relaxed and premium, avoiding attached sections. Likely increase existing `padding` or add `margin` by ~24–40px at each boundary.

### 3. AI Try-On — more internal breathing room
Inside the new card layout, increase padding around:
- Heading
- Description (keep it the existing one-liner)
- Email field + CTA button

Make the content feel spacious rather than cramped.

### 4. Reduce AI section overall height by ~15–20%
By switching from a full-bleed 50/50 grid to a compact centered card, the section naturally becomes shorter. We will ensure the final rendered height is roughly 15–20% less than the current full-bleed split.

### 5. Heritage Statistics — distinct milestone spacing
Increase the top spacing (padding/margin) before the Statistics section so it sits as a clearly separate milestone block, not a continuation of the AI section.

---

**Files to edit:**
- `src/heritage-homepage/styles.css`
- `src/routes/index.tsx`

**No new dependencies or assets required.**