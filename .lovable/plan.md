## 1. Correct temple website links

Update both `src/heritage-homepage/temples.json` and `src/heritage-homepage/featured-temple.json` with the verified official URLs:

| Temple | New URL |
|---|---|
| Meenakshi Amman (Madurai) | `https://maduraimeenakshi.hrce.tn.gov.in/` |
| Kamakshi Amman (Kanchipuram) | `https://kanchikamakshi.org/` (was `.com`) |
| Chennakeshava (Belur) | `https://hassan.nic.in/en/tourist-place/chennakeshava-temple-belur/` |
| Sri Ranganathaswamy (Srirangam) | `https://srirangamranganathar.hrce.tn.gov.in/` |

## 2. Real, iconic photos for each temple

Replace the current AI-generated JPGs with real photos matching the temple's most recognizable feature. Fetch from Wikimedia Commons (public-domain / CC-licensed) via `curl` and drop into `src/heritage-homepage/assets/`:

- **temple-meenakshi.jpg** — aerial / drone view showing multiple gopurams of Meenakshi complex (search Wikimedia "Meenakshi Amman Temple aerial")
- **temple-ranganathaswamy.jpg** — the towering white Rajagopuram entrance (Wikimedia "Srirangam Rajagopuram")
- **temple-chennakeshava.jpg** — full front elevation of the star-shaped Chennakeshava at Belur (Wikimedia "Chennakeshava Temple Belur")
- **temple-kamakshi.jpg** — use the **user-uploaded image** at `user-uploads://kanchikamakshitemple.jpg` (do NOT AI-generate). Register via `lovable-assets` OR copy into `src/heritage-homepage/assets/temple-kamakshi.jpg` to match existing import pattern in `temples.tsx` and `index.tsx`. Copy chosen to match sibling files.

If a Wikimedia fetch fails or license is unclear, fall back to `imagegen` for that one temple only — but attempt real photos first for the three named above.

No code changes needed since filenames stay the same; imports in `temples.tsx` and `index.tsx` continue to work.

## 3. Footer credit on Temples page

In `src/routes/temples.tsx`, update the `<footer className="h-temples-footer">` block to add a third line:
```
Page designed by <a href="https://kliviq.com" target="_blank" rel="noopener">KlivIQ Technologies OPC</a>
```
Matches the credit that already exists on the homepage footer.

## 4. SEO + GEO for the Temples page

Rewrite the `head()` in `src/routes/temples.tsx` with a keyword-rich, discoverable metadata block:

- **title**: "Famous South Indian Temples — Meenakshi, Kamakshi, Ranganathaswamy, Chennakeshava | Sri Aishwarya Sarees"
- **description**: 155-char summary mentioning "famous temples of Tamil Nadu and Karnataka", the four named temples, and handloom heritage.
- **keywords** meta: meenakshi amman temple, kamakshi amman kanchipuram, ranganathaswamy srirangam, chennakeshava belur, famous south indian temples, temple gopurams, tamil nadu temples.
- Canonical `<link rel="canonical" href="https://aish-sample.lovable.app/temples">`.
- Open Graph + Twitter (already partially present) — expand with `og:type=website`, `og:site_name`, `og:locale=en_IN`.
- **JSON-LD** via `scripts` array in `head()`:
  - A `CollectionPage` schema listing all four temples as `HinduTemple` items with `name`, `address` (city, region, country), `geo` (lat/lng), and `url` (the official site).
  - A `BreadcrumbList` (Home → Sacred Threads).
  - An `Organization` block for Sri Aishwarya Sarees.
- Ensure a single `<h1>` (already "Sacred Threads") and that each temple entry uses `<h2>` (already true).
- Add `alt` text improvements referencing "gopuram" and location for AI/image search.

Also update `public/robots.txt` (if present) to ensure `/temples` is crawlable and add `Sitemap:` entry; add `/temples` to `public/sitemap.xml` if the file exists — otherwise skip.

## 5. Static export

After edits, re-run `python3 scripts/export-static.py` so `static-export/temples/index.html` reflects new links, footer credit, and SEO/JSON-LD.

## Files touched

**Edited**
- `src/heritage-homepage/temples.json` — URLs
- `src/heritage-homepage/featured-temple.json` — URLs
- `src/heritage-homepage/assets/temple-meenakshi.jpg` — replaced with real photo
- `src/heritage-homepage/assets/temple-kamakshi.jpg` — replaced with user upload
- `src/heritage-homepage/assets/temple-chennakeshava.jpg` — replaced with real photo
- `src/heritage-homepage/assets/temple-ranganathaswamy.jpg` — replaced with real photo
- `src/routes/temples.tsx` — expanded `head()` (SEO/GEO/JSON-LD), footer credit, richer alt text
- `public/sitemap.xml` / `public/robots.txt` — only if they exist
- `static-export/temples/index.html` — regenerated

## Out of scope
- Homepage FeaturedTemple visual changes (only its URLs/images inherit via the JSON updates).
- Adding more temples beyond the current four.
