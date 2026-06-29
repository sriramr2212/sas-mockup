## 1. Theme dark color → logo brown (#6B4202)

The heritage homepage uses two "dark" families:
- **Burgundy** (`--h-burgundy: #5a1a23`, `--h-burgundy-dark: #41131a`, `--h-maroon: #7a1f2b`) — used for header background, primary buttons, links/hover, search button, nav active, badges, etc.
- **Ink/text** (`--h-ink: #1f1410`, `--h-text: #2a1f18`) — headings and body text.

The user wants the **existing dark theme color** replaced with the logo's dark brown. The visually dominant dark in the UI is the burgundy family, so I'll remap that family to a brown palette derived from `#6B4202` and leave ink/text alone (text remains readable).

New tokens in `src/heritage-homepage/styles.css`:
- `--h-burgundy: #6B4202` (was `#5a1a23`)
- `--h-burgundy-dark: #4a2d01` (deeper shade for hover)
- `--h-maroon: #8a5a18` (slightly warmer secondary)

I'll also sweep the stylesheet for any hardcoded `#5a1a23`, `#41131a`, `#7a1f2b` or `rgba(90,26,35,…)` literals and replace them so nothing is left burgundy. The few hardcoded `#1f1410` (ink/footer bg) stay — they match the requested brown family already.

Verification: read the stylesheet after edits, grep for the old hex codes to confirm zero matches, then visually check header/buttons/footer in the running preview.

## 2. Footer — handloom-themed photo background

Current footer (`.h-footer`) is flat `#1f1410`. I will:

1. **Generate** a wide background image with `generate_image` (premium quality not needed; `standard`): macro photo of golden silk warp threads on a traditional handloom, soft warm lighting, shallow depth of field, rich dark tones. Save to `src/heritage-homepage/assets/footer-loom.jpg` (1920×1080).
2. **Apply** in `.h-footer`:
   - `background-image: linear-gradient(rgba(20,12,4,0.82), rgba(20,12,4,0.92)), url(...)`
   - `background-size: cover; background-position: center;`
   - Keep existing padding and text color.
3. **Legibility pass**: bump body text opacity from `0.82` → `0.9`, brand tagline `0.7` → `0.85`, bottom strip `0.5` → `0.7`, and add a subtle `text-shadow: 0 1px 2px rgba(0,0,0,0.5)` on `.h-footer` so text stays crisp over the photo. Headings already use gold and remain readable.

## Files touched

- `src/heritage-homepage/styles.css` — color token remap + footer background + text-shadow/opacity tweaks.
- `src/heritage-homepage/assets/footer-loom.jpg` — new generated image.

No JSX changes required.

## Out of scope

- The base Tailwind/shadcn tokens in `src/styles.css` (the homepage is fully scoped under `.heritage-root` and doesn't use them).
- Logo image itself, layout, typography, or any other section.
