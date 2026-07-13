# Sri Aishwarya Sarees — Static HTML/CSS Export

Four self-contained folders you can upload directly to cPanel File Manager.
No build step, no framework, no server-side code required.

## Contents

```
home/       index.html + css/heritage.css + images/   (home page)
temples/    index.html + css/heritage.css + images/   (Temple of the Month archive)
glossary/   index.html + css/heritage.css + images/   (Saree glossary)
faq/        index.html + css/heritage.css + images/   (Frequently asked questions)
```

## How to upload to WooCommerce cPanel

1. Log into cPanel → **File Manager** → `public_html/` (or wherever the site root is).
2. To replace the current home page: upload the **contents** of `home/`
   (`index.html`, `css/`, `images/`) into the site root.
3. To publish the other sections: create folders `temples/`, `glossary/`,
   `faq/` in the site root and upload each export folder's contents into
   the matching folder. Visitors reach them at:
   - `https://sriaishwaryasarees.com/temples/`
   - `https://sriaishwaryasarees.com/glossary/`
   - `https://sriaishwaryasarees.com/faq/`

All cross-page links (home ↔ temples ↔ glossary ↔ faq) are already rewritten
to relative paths. Every shop/category/product link is an absolute URL back
to the live WooCommerce site.

## The floating WhatsApp button

Present on every page, works on desktop and mobile, opens a chat with
+91 95001 92418 and a prefilled greeting.

## Adding next month's temple

Edit the React project's `src/heritage-homepage/temples.json`, prepend the
new temple object, add the JPG to `src/heritage-homepage/assets/`, then
re-run this export (`python3 scripts/export-static.py`). The new temple
will appear at the top of `temples/index.html`.
