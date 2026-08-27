# Developer Fix List — sriaishwaryasarees.com/new-home/

Documentation only. No code changes in this project. This is the final handoff list of fixes the developer must apply to the live page so it matches the approved design here. Both desktop (1280px) and mobile (390px, iOS UA) were checked.

## Final fix table

| # | Area | Approved design | Live page (desktop) | Live page (mobile) | Fix |
|---|---|---|---|---|---|
| 1 | Header | Logo left, centred search, INR default | No search, currency shows Euro, green cart pill | Hamburger "MENU", no search, full-width green Euro dropdown block above the header | 1. Remove the "MENU" label. 2. Make the currency selector a compact pill using currency codes (INR, USD, EUR), not full names, defaulting to INR. 3. Add the missing search field. |
| 2 | Navigation | No pink sticky bar | Pink sticky bar present | — | Remove the pink sticky bar |
| 3 | Typography | Cormorant Garamond headings + Inter body | Sans-serif/italic substitutes | Same substitutes | Load the same two fonts |
| 4 | Hero | Text and image exactly equal height, content top-aligned | Text pinned to bottom, large blank space above | ~350px of empty cream space above "Est. Chennai"; image sits far below the fold | 1. Apply hero grid rules (stretch, top-aligned text, image absolute in its column). 2. On mobile remove the leading blank block so text starts right under the header. |
| 5 | Trust strip | Slim strip directly under hero (50+ years · direct from weavers · pure yarn · three generations) | Missing | Missing | Add the trust strip on both breakpoints |
| 6 | Prices | ₹ rupees | € euros | € euros | Default currency INR site-wide |
| 7 | Collections | Tiles in a smooth carousel | No carousel, wrong heading style | No swipe carousel | 1. Restore the smooth tile carousel. 2. Make it swipeable on mobile. 3. Fix the heading style. |
| 8 | Section order | Testimonials → Review QR → Stores → Temples | Testimonials before stores; extra block after stores | Same wrong order | Reorder sections to match |
| 9 | Testimonials | Vishnu Lakshmi + Sneha cards with exact quotes and links | Google-review widgets | Same widgets, stacked and very tall | Reduce the height of the Google review widget |
| 10 | Temples section | "Temples That Inspire Us" with temple thumbnails and stories | Heading reads "Two boutiques in the heart of Chennai." and shows blog posts (Sneha/Vishnu) | Same wrong content | Wrong content wired — pull from temples data |
| 11 | Duplicate heading | — | "Two boutiques…" appears twice | Appears twice (confirmed in mobile heading audit) | Remove the duplicate |
| 13 | Newsletter | Big title, no sub-copy, gold button | Adds "We respect your inbox", bright blue Subscribe button | Same, plus email field not full-width; button alignment and colour wrong | 1. Remove the sub-copy line. 2. Use the gold button. 3. Full-width input on mobile. |
| 14 | Headings (SEO) | Exactly one H1 per page | 7+ H1s | 11 H1s measured on mobile | Demote all section headings to H2; keep only "Give Life to handloom." as H1 |
| 16 | Page width (mobile) | 390px, no horizontal overflow | n/a | Renders at 375px with a fixed-width feel | Make the layout fluid to the viewport width |

## SEO / GEO / AEO audit of the live /new-home/ page

Checked against the page source served today.

| Item | Live page state | Fix |
|---|---|---|
| Title tag | "New Home - Sri Aishwarya Sarees" — generic, no keywords | Use a descriptive title, e.g. "Handloom Kanjivaram & Silk Sarees in Chennai — Sri Aishwarya Sarees" |
| Meta description | **Missing entirely** | Add a unique 150-character description with Chennai + handloom saree keywords |
| Canonical | Present and self-referencing | OK |
| Robots | index, follow | OK |
| Open Graph | og:title is just "New Home"; og:description is a truncated auto-excerpt; og:type is "article" | Set a proper og:title/description; og:type should be "website" for a home page |
| Twitter card | summary_large_image present, but shows "Est. reading time 19 minutes" (blog-post treatment) | Fine once the page becomes the real home page; disable the reading-time meta |
| H1 structure | 11 H1s, only 4 H2s | Single H1 (row 14 above) |
| JSON-LD present | WebPage, ImageObject, BreadcrumbList, WebSite, Organization (Yoast defaults) | Baseline is fine |
| GEO — local business data | **No LocalBusiness / Store schema, no address, no geo coordinates, no opening hours** | Add LocalBusiness (or two Store entries for T. Nagar and Adyar) JSON-LD with streetAddress, Chennai, postal code, phone, geo lat/long, and openingHours |
| GEO — meta geo tags | No geo.region, geo.placename, geo.position or ICBM tags | Add them (geo.region=IN-TN, geo.placename=Chennai, geo.position/ICBM per store) |
| AEO — FAQ / answer content | **No FAQPage schema and no FAQ block on the page** | Publish the FAQ content and mark it up as FAQPage so answer engines can quote it |
| AEO — Product / offers | No Product or ItemList markup for New Arrivals or Collections | Add ItemList/Product markup for the arrivals grid so listings can surface |
| AEO — review signals | Google review widgets are embedded but carry no AggregateRating markup | Add AggregateRating on the Organization/LocalBusiness node |

Net: the page carries only Yoast's default technical SEO. Everything location-specific (GEO) and answer-engine-specific (AEO) that exists in our reference build is absent on the live page and needs to be added.

## Priority order for the developer

1. **#10** — Temples section showing blog posts under a boutique heading
2. **#11** — Duplicate heading
3. **#6 / #1** — Euro pricing and currency pill; default INR
4. **#4** — Hero blank space / misalignment (worst on mobile)
5. **#14** — Multiple H1s, plus the missing meta description
6. **#5 / #7** — Trust strip and collections carousel
7. **GEO/AEO** — LocalBusiness + geo tags + FAQPage markup
8. **#16 / #2** — Fluid mobile width and pink sticky bar

## Technical details

- Live page: `https://www.sriaishwaryasarees.com/new-home/` (the `aishwaryasarees.com/new-home/` URL 404s)
- Breakpoints checked: 1280×900 desktop and 390×1600 mobile (iOS user agent)
- Reference implementation: `src/routes/index.tsx`, `src/routes/faq.tsx`, `src/heritage-homepage/styles.css`
- Handoff document only; no implementation work in this plan.
