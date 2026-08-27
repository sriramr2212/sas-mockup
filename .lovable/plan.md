# Developer Fix List — sriaishwaryasarees.com/new-home/

Documentation only. No code changes in this project. This is the handoff list of fixes the developer must apply to the live page so it matches the approved design here. Both desktop (1280px) and mobile (390px, iPhone UA) were checked on the live page and on our reference build.

## Desktop + mobile comparison

| # | Area | Approved design (our project) | Live page — desktop | Live page — mobile | Fix |
|---|---|---|---|---|---|
| 1 | Header | Logo left, centred search, INR default | Logo centred, no search, currency shows Euro, green cart pill | Hamburger "MENU" + centred logo, no search, full-width green **Euro** dropdown block above the header | Rebuild header layout, add search, default currency to INR on both breakpoints |
| 2 | Navigation | 11 items with 2-column dropdowns | 9 items, different labels, pink sticky bar | Items hidden in hamburger drawer; extra fixed bottom bar (Shop / Wishlist / Cart / My account) not in our design | Match labels, order and dropdown content; remove pink sticky bar and the mobile bottom bar (or confirm it as an intentional store feature) |
| 3 | Typography | Cormorant Garamond headings + Inter body | Sans-serif/italic substitutes | Same substitutes | Load the same two fonts |
| 4 | Hero | Text and image exactly equal height, content top-aligned | Text pinned to bottom, large blank space above | ~350px of empty cream space above "Est. Chennai", image sits far below the fold | Apply hero grid rules (stretch, top-aligned text, image absolute in its column); on mobile remove the leading blank block so text starts right under the header |
| 5 | Trust strip | Slim strip directly under hero (50+ years · direct from weavers · pure yarn · three generations) | Missing | Missing | Add the trust strip back on both breakpoints |
| 6 | Prices | ₹ rupees | € euros | € euros | Default currency INR site-wide |
| 7 | Collections | 8 tiles in a carousel | Only 4 tiles, no carousel, wrong heading style | 4 tiles stacked, no swipe carousel | Restore full 8-tile carousel; swipeable on mobile |
| 8 | Section order | Testimonials → Review QR → Stores → Temples | Testimonials before stores; extra block after stores | Same wrong order | Reorder sections to match |
| 9 | Testimonials | Vishnu Lakshmi + Sneha cards with exact quotes and links | Google-review widgets | Same widgets, stacked and very tall | Use the two designed cards with exact text |
| 10 | Temples section | "Temples That Inspire Us" with temple thumbnails and stories | Heading reads "Two boutiques in the heart of Chennai." and shows blog posts (Sneha/Vishnu) | Same wrong content | Wrong content wired — pull from temples data |
| 11 | Duplicate heading | — | "Two boutiques…" appears twice | Appears twice (confirmed in mobile heading audit) | Remove the duplicate |
| 12 | Review QR | Compact section, small QR cards, no sub-text | Very tall, oversized QRs | Full-width oversized QRs, adds a lot of scroll | Shrink to compact two-card layout; side-by-side compact cards on mobile |
| 13 | Newsletter | Big title, no sub-copy, gold button | Adds "We respect your inbox", bright blue Subscribe button | Same, plus email field not matching our full-width mobile treatment | Remove sub-copy line; use gold button; full-width input on mobile |
| 14 | Headings (SEO) | Exactly one H1 per page | 7+ H1s | **11 H1s** measured on mobile (New Arrivals, Shop by Collection, Testimonials, Two boutiques ×2, Newsletter, etc.) | Demote all section headings to H2, keep only "Give Life to handloom." as H1 |
| 15 | Overlays (mobile only) | No floating overlays other than the WhatsApp button | n/a | Green "Chat With Us" pill plus a fixed bottom nav bar cover the hero image | Keep one floating action (WhatsApp) and avoid stacking it over content |
| 16 | Page width (mobile) | 390px, no horizontal overflow | n/a | Renders at 375px with a fixed-width feel rather than fluid | Make layout fluid to the viewport width |

## Priority order for the developer

1. **#10** — Temples section showing blog posts under a boutique heading (wrong content)
2. **#11** — Duplicate heading
3. **#6** — Euro pricing instead of ₹
4. **#4** — Hero blank space / misalignment (worst on mobile)
5. **#14** — Multiple H1s (SEO impact)
6. **#5 / #7** — Missing trust strip and only 4 collections
7. **#15 / #16** — Mobile overlays and fluid width

## Note on our side

- Our preview shows `₹76.87` — the rupee symbol is forced onto the Euro amount without conversion. Known item on our side, separate from the developer's list.

## Technical details

- Live page: `https://www.sriaishwaryasarees.com/new-home/` (the `aishwaryasarees.com/new-home/` URL 404s)
- Breakpoints checked: 1280×900 desktop and 390×1600 mobile (iOS user agent)
- Reference implementation: `src/routes/index.tsx` and `src/heritage-homepage/styles.css`
- Handoff document only; no implementation work in this plan.
