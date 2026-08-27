# SEO / GEO / AEO Checklist for the Live New Home Page

Page to update: `https://www.sriaishwaryasarees.com/new-home/`

| # | Task | Current live state | Required fix |
|---|---|---|---|
| 1 | **Title tag** | "New Home - Sri Aishwarya Sarees" — generic, no keywords | Use a keyword-rich title, e.g. `Handloom Kanjivaram & Silk Cotton Sarees in Chennai — Sri Aishwarya Sarees` (keep under 60 chars). |
| 2 | **Meta description** | Missing entirely | Add a unique 150-160 character description including Chennai, handloom, Kanjivaram, and silk cotton sarees. |
| 3 | **Canonical** | Present and self-referencing | Keep self-referencing canonical to `https://www.sriaishwaryasarees.com/new-home/`. |
| 4 | **Robots** | index, follow | Keep `index, follow`. |
| 5 | **Open Graph** | og:title is just "New Home"; og:description is a truncated auto-excerpt; og:type is "article" | Set og:title to match the title tag, write a unique og:description, and set og:type to `website`. og:url should self-reference the page. |
| 6 | **Twitter card** | summary_large_image present, but shows "Est. reading time 19 minutes" (blog treatment) | Disable the reading-time meta; keep `summary_large_image`. |
| 7 | **H1 structure** | 11 H1s, only 4 H2s | Demote every section heading to H2. Keep only "Give Life to handloom." as the single H1. Use H3 for card/section sub-headings. |
| 8 | **JSON-LD baseline** | WebPage, ImageObject, BreadcrumbList, WebSite, Organization (Yoast defaults) | Baseline is acceptable; leave it in place. |
| 9 | **GEO — LocalBusiness / Store schema** | No LocalBusiness/Store schema, no address, no geo coordinates, no opening hours | Add JSON-LD for both boutiques — T. Nagar and Adyar — as `Store` (or a single `Organization` with `department`). Each must include: name, image, streetAddress, addressLocality (Chennai), addressRegion (Tamil Nadu), addressCountry (IN), postalCode, telephone, geo latitude/longitude, openingHours, and url. |
| 10 | **GEO — meta geo tags** | No geo.region, geo.placename, geo.position, or ICBM tags | Add `<meta name="geo.region" content="IN-TN">`, `<meta name="geo.placename" content="Chennai, Tamil Nadu, India">`, and per-store `geo.position` / `ICBM` tags. |
| 11 | **AEO — FAQPage schema & content** | No FAQPage schema and no FAQ block on the page | Publish the FAQ content on the page (or link to a dedicated `/faq` page) and wrap it in `FAQPage` JSON-LD with `Question`/`Answer` entities. |
| 12 | **AEO — Product / ItemList markup** | No Product or ItemList markup for New Arrivals or Collections | Add `ItemList` + `Product` structured data for the New Arrivals grid, including name, image, description, url, and `offers` with `priceCurrency` = INR and the actual price. |
| 13 | **AEO — review signals** | Google review widgets embedded but carry no AggregateRating markup | Add `AggregateRating` JSON-LD on the Organization/LocalBusiness node with ratingValue and reviewCount sourced from Google reviews. |
| 14 | **Image alt text** | Verify all product, store, temple, and hero images have descriptive alt text | Add or correct alt attributes for accessibility and image SEO. |

## Validation steps

1. Run the page through Google's Rich Results Test and Schema Markup Validator.
2. Confirm only one `<h1>` remains in the DOM on both desktop and mobile.
3. Confirm the title and meta description appear correctly in search snippet previews.
4. Submit / resubmit `/new-home/` and the sitemap in Google Search Console after changes are live.
