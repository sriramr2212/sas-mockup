# WordPress/WooCommerce Integration — Answer + Developer Handoff

## Short answer (for you)

**Yes, it can be integrated.** The `static-export/` folder in this project is already exactly what a WordPress developer needs — plain HTML, CSS, and images with no framework or build step. Every shop/category/product link inside those files already points to your live WooCommerce site, and the four folders (`home/`, `temples/`, `glossary/`, `faq/`) link to each other with relative paths.

There is **one thing to decide** before handing off: the newsletter form is currently a visual-only form (it does not send emails anywhere yet). The developer needs to wire it to whatever email tool you already use (Mailchimp, Brevo/Sendinblue, MailPoet, Contact Form 7, or WooCommerce's built-in customer list).

## What I will deliver

1. **This chat message** — plain-language explanation and the step-by-step process.
2. **A downloadable Markdown file** at `/mnt/documents/wordpress-integration-guide.md` — the same instructions formatted as a developer handoff document you can forward as-is.

## What the handoff document will contain

1. **Overview** — what the export is, what's inside each folder.
2. **Pre-flight checks** — cPanel access, backup, permalink settings (WooCommerce needs "Post name" permalinks; the export assumes that).
3. **Step-by-step upload instructions**:
   - Back up existing `public_html/index.html` (or current theme home).
   - Decide: replace the WordPress home page with `home/index.html`, OR keep WordPress home and publish the new pages at `/new-home/`, `/temples/`, `/glossary/`, `/faq/`.
   - Upload each folder's contents to the matching path via cPanel File Manager.
   - Test each URL and confirm cross-page links, WhatsApp button, and product links to WooCommerce work.
4. **Newsletter wiring** — where the `<form>` lives in `home/index.html` and `temples/index.html`, and three drop-in options:
   - Mailchimp embedded form action URL.
   - Brevo/MailPoet shortcode replacement (requires PHP page instead of static HTML — noted as an alternative path).
   - Contact Form 7 replacement snippet.
5. **How to update content later** — either re-run `python3 scripts/export-static.py` from this Lovable project and re-upload, or edit HTML directly in cPanel for small tweaks.
6. **Known limitations & recommendations**:
   - Static HTML doesn't inherit the WordPress theme header/footer. If the client wants the WP menu/footer on these pages, the developer should convert each `index.html` into a WordPress **Page Template** (`.php` file) inside the active theme — instructions included.
   - SEO: submit new URLs to Google Search Console; add to `sitemap.xml`.
   - New arrivals are currently hard-coded thumbnails in the static export. Once the developer serves these as PHP pages inside WordPress, they can pull live products via the WooCommerce Store API (code already exists in `src/lib/arrivals.functions.ts` as a reference).
7. **Answer to the "blurry new arrivals" question** — confirms images will be replaced by real, high-resolution product photos once wired to WooCommerce.

## Out of scope

- No code changes to the app. This turn only produces the handoff document; no `src/**` or `static-export/**` files are modified.

## Files to be created

- `/mnt/documents/wordpress-integration-guide.md`

At the end I'll post the same guidance directly in chat and attach the file with `<presentation-artifact>` so you can download it.
