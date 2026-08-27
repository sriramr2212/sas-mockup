# Developer Fix List — sriaishwaryasarees.com/new-home/

Documentation only. No code changes to our project. This is the handoff list of fixes the developer must apply to the live page so it matches the approved design in this project.

## Fixes required on the live site

| # | Area | Approved design (our project) | Live page (current) | Fix on live site |
|---|---|---|---|---|
| 1 | Announcement bar | "AADI SALE AT ADYAR STORE \| VISIT STORE FOR 5% TO 40% OFF \| GIVE LIFE TO HANDLOOM", maroon background | "WELCOME TO SRI AISHWARYA SAREES", olive-green, with close button | Replace text, restore maroon bar, remove close button |
| 2 | Header | Logo left, centred search, INR default | Logo centred, no search, currency shows Euro, green cart pill | Rebuild header layout; default currency to INR |
| 3 | Navigation | 11 items (Semi Silk Cotton, 10 & 9 Yards, Kids…) with 2-column dropdowns | 9 items, different labels, pink sticky bar | Match labels, order and dropdown content; remove pink sticky bar |
| 4 | Typography | Cormorant Garamond headings + Inter body | Sans-serif/italic substitutes | Load the same two fonts |
| 5 | Hero | Text and image exactly equal height, content top-aligned, no text over image | Text pinned to bottom, large blank space above | Apply hero grid rules (stretch, image absolute inside column) |
| 6 | Trust strip | Slim maroon strip directly under hero | Missing | Add the trust strip back |
| 7 | Prices | ₹ rupees | € euros | Default currency INR site-wide |
| 8 | Collections | 8 tiles in a carousel | Only 4 tiles, no carousel, wrong heading style | Restore full carousel with all 8 tiles |
| 9 | Section order | Testimonials → Review QR → Stores → Temples | Testimonials before stores; extra block after stores | Reorder sections to match |
| 10 | Testimonials | Vishnu Lakshmi + Sneha cards with exact quotes and links | Google-review widgets instead | Use the two designed cards with exact text |
| 11 | Temples section | "Temples That Inspire Us" with temple thumbnails and stories | Heading wrongly says "Two boutiques in the heart of Chennai." and shows blog posts (Sneha/Vishnu) | Wrong content wired — pull from temples data |
| 12 | Duplicate heading | — | "Two boutiques…" appears twice | Remove the duplicate |
| 13 | Review QR | Compact section, small QR cards, no sub-text | Very tall, oversized QRs | Shrink to compact two-card layout |
| 14 | Newsletter | Big title, no sub-copy, gold button | Adds "We respect your inbox", bright blue Subscribe button | Remove sub-copy line; use gold button |
| 15 | Headings (SEO) | Exactly one H1 per page | 7+ H1s (New Arrivals, Collections, etc.) | Demote section headings to H2 |

## Priority order for the developer

1. **#11** — Temples section showing blog posts under a boutique heading (wrong content)
2. **#12** — Duplicate heading
3. **#7** — Euro pricing instead of ₹
4. **#5** — Hero blank space / misalignment
5. **#15** — Multiple H1s (SEO impact)
6. **#6 / #8** — Missing trust strip and only 4 collections

## Note on our side

- Our preview shows `₹76.87` — the rupee symbol is forced onto the Euro amount without conversion. This is a known item on our side, separate from the developer's list.

## Technical details

- Live page to fix: `https://www.sriaishwaryasarees.com/new-home/` (the `aishwaryasarees.com/new-home/` URL 404s)
- Reference implementation: this project's `src/routes/index.tsx` and `src/heritage-homepage/styles.css`
- No implementation work in this plan; it is a handoff document only.
