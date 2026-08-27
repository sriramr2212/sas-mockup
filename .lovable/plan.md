# UI Comparison — Lovable build vs developer's live page

Compared this project's homepage (preview) against
`https://sriaishwaryasarees.com/new-home/` (the developer's WordPress build;
the `www.aishwaryasarees.com/new-home/` URL you sent returns 404).

Live page height: ~11,950px. Our page: ~9,510px — the live version is
significantly longer and looser than the approved design.

## Comparison table

| # | Area | Our design (reference) | Developer's live page | Fix needed |
|---|------|------------------------|------------------------|-----------|
| 1 | Announcement bar | "AADI SALE AT ADYAR STORE \| VISIT STORE FOR 5% TO 40% OFF \| GIVE LIFE TO HANDLOOM", dark maroon bar | "WELCOME TO SRI AISHWARYA SAREES" on an olive-green bar with a close button | Replace text; use the maroon/ink bar colour, remove dismiss button |
| 2 | Header | Logo left, centred search bar, INR default, Account / Wishlist / Cart in caps | Logo centred, currency dropdown ("Euro") top-left, no search bar, green cart pill | Rebuild header layout: logo left, search centre, INR default, match icon/label styling |
| 3 | Main nav | 11 items incl. SEMI SILK COTTON, 10 & 9 YARDS, KIDS, our custom mega-dropdowns | 9 items, different labels/order, theme dropdowns, pink bar on scroll | Match nav labels, order and dropdown styling; remove pink sticky bar |
| 4 | Typography | Cormorant Garamond serif headings (non-italic), Inter body, letter-spaced eyebrows | Sans-serif/italic pseudo-serif headings, mismatched weights | Load the same two web fonts and apply the heading/eyebrow scale |
| 5 | Hero | Two equal-height columns, text vertically aligned to image | Text sits at the very bottom of a tall empty column; large blank area above and below image | Apply hero grid rules (equal height, top-aligned text, no min-height gap) |
| 6 | Trust strip | Slim maroon strip under hero: 50+ Years / Direct from Weavers / Pure Yarn · Real Zari / Trusted by Three Generations | Missing under hero — appears instead as a scrolling marquee lower down | Add the static strip under the hero; keep marquee separate |
| 7 | Prices | Rupee symbol forced | Euro (€) shown by default | Set INR as default currency/symbol |
| 8 | New Arrivals | 16 products, 4 per row | Matches (16 products, 4 per row) | OK |
| 9 | Family Story | Compact, one paragraph, video and text equal height | Close match; slight padding drift | Minor padding tune |
| 10 | Craftsmanship marquee | Slim scrolling strip with paisley separators | Present, but placed after Collections and full-bleed at a different height | Confirm order and strip height |
| 11 | Shop by Collection | 8 collections in a carousel, serif heading | Only 4 tiles, sans-caps heading, no carousel | Restore the 8-tile carousel and heading style |
| 12 | Section order | Hero → Trust → Arrivals → Story → Collections → Craft → Gift → Video → Testimonials → Review QR → Stores → Temples → divider → Instagram → Newsletter → FAQ | Testimonials appear before Review QR and Stores, and a second block appears after Stores | Fix section order to match |
| 13 | Testimonials | Two cards with the exact Vishnu Lakshmi / Sneha quotes + "Read full article" links | Google-review widgets (Adyar / T Nagar carousels) instead | Replace widget with our two testimonial cards (or keep both, decided by you) |
| 14 | Review QR | Compact, loom background, two small QR cards | Very tall section, oversized QR cards | Reduce section height and QR card size |
| 15 | Visit Our Stores | Short cards, image height capped ~200px | Close match, taller images | Cap image height |
| 16 | Sacred Threads / Temples | "Temples That Inspire Us", compact two thumbnails + "Read the story" + "See all featured temples" | Heading wrongly reads "Two boutiques in the heart of Chennai." and shows WordPress blog cards (Sneha / Vishnu Lakshmi posts) instead of temples | Wrong content wired to this section — must show temples from `temples.json` with the correct heading |
| 17 | Duplicate heading | — | "Two boutiques in the heart of Chennai." appears twice on the page | Remove duplicate |
| 18 | Divider | Gold paisley mark between two hairlines | Present | OK |
| 19 | Instagram | 6 curated tiles | 12-tile live feed + "Follow on Instagram" button | Decide: keep live feed (fine) but trim to 8 and restyle button |
| 20 | Newsletter | Compact, big "JOIN OUR NEWSLETTER" title, no sub-copy | Matches, but adds "WE RESPECT YOUR INBOX…" line and a bright blue Subscribe button | Remove sub-line, restyle button to gold/maroon |
| 21 | FAQ | All accordions closed by default | First accordion open by default | Close all by default |
| 22 | Heading levels (SEO) | One H1 (hero), H2 for sections | Multiple H1s (New Arrivals, Shop by Collection, Testimonials, Stores, Instagram, Newsletter, FAQ all H1) | Demote all section headings to H2 — currently harms SEO |
| 23 | Floating buttons | WhatsApp round icon bottom-left | Green "Chat With Us" pill + back-to-top arrow | Match WhatsApp button style |
| 24 | Footer | Our editorial footer with FAQ / Glossary / Temples links + "Page designed by KlivIQ Technologies OPC" | Needs verification (not reached in capture) | Verify links and KlivIQ credit exist |

## Highest-priority fixes for the developer

1. Temples section is showing blog posts with a boutique heading (#16) — visibly wrong.
2. Duplicate "Two boutiques" heading (#17).
3. Currency defaults to Euro (#7).
4. Hero alignment and huge blank space (#5).
5. Multiple H1s hurting SEO (#22).
6. Missing trust strip, missing 4 collections, announcement text wrong (#1, #6, #11).

## Note on our own build

Our preview shows the rupee symbol but the same numeric values as the Euro
prices (₹76.87), i.e. the symbol is forced without converting. Worth fixing on
our side too if you want.

## Next step

Say the word and I can turn this into a developer-facing checklist document
(markdown in the repo, ready to send), or fix the items that live in our code.
