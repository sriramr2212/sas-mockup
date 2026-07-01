# Sri Aishwarya Sarees — Static HTML/CSS Export

Two self-contained folders you can upload directly to cPanel File Manager.
No build step, no framework, no server-side code required.

## Contents

```
home/
  index.html          → the home page
  css/heritage.css    → all styles (scoped under .heritage-root)
  images/             → every image used on this page (logo, hero, products, temple, footer photo…)

temples/
  index.html          → the Temple of the Month archive (single scrolling page)
  css/heritage.css    → same stylesheet (kept per-folder so each page is self-contained)
  images/             → temple images + shared header/footer images
```

## How to upload to WooCommerce cPanel

1. Log into cPanel → **File Manager** → `public_html/` (or wherever the site root is).
2. To replace the current home page: upload the **contents** of `home/`
   (`index.html`, `css/`, `images/`) into the site root.
3. To publish the temples archive: create a new folder called `temples/` in
   the site root and upload the **contents** of the `temples/` export folder
   into it. Visitors reach it at `https://sriaishwaryasarees.com/temples/`.

The pages already link to each other correctly (home → temples, temples → home)
using relative paths, and every shop/category/product link is an absolute
URL back to the live WooCommerce site.

## The floating WhatsApp button

Present on both pages, works on desktop and mobile, opens a chat with
+91 95001 92418 and a prefilled greeting.

## Adding next month's temple

Edit the React project's `src/heritage-homepage/temples.json`, prepend the
new temple object, add the JPG to `src/heritage-homepage/assets/`, then
re-run this export (`python3 scripts/export-static.py`). The new temple
will appear at the top of `temples/index.html`.
