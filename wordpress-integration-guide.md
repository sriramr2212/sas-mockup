# Sri Aishwarya Sarees — WordPress/WooCommerce Integration Guide

**For:** the WordPress developer maintaining `sriaishwaryasarees.com`
**From:** Sri Aishwarya Sarees (site owner)
**Goal:** publish the new Home, Temples, Glossary, and FAQ pages on the existing WooCommerce site without disturbing the shop.

---

## 1. What you are receiving

A folder called `static-export/` with four sub-folders:

```
home/       index.html + css/heritage.css + images/   → new home page
temples/    index.html + css/heritage.css + images/   → "Sacred Threads" archive
glossary/   index.html + css/heritage.css + images/   → saree glossary
faq/        index.html + css/heritage.css + images/   → frequently asked questions
```

Each folder is **fully self-contained**: plain HTML, one CSS file, and its own copy of the images. No PHP, no JavaScript build step, no database changes required.

- Every shop/category/product link inside these pages already points to the live WooCommerce URLs (e.g. `https://sriaishwaryasarees.com/product-category/...`).
- The four pages link to each other with relative paths, so they work as a set.
- A floating WhatsApp button (+91 95001 92418) is already embedded on every page.

---

## 2. Before you start (pre-flight checks)

1. **Take a full backup** of `public_html/` and the WordPress database via cPanel → Backup / JetBackup.
2. Confirm WordPress → **Settings → Permalinks** is set to **Post name** (`/%postname%/`). WooCommerce already requires this; the new pages assume it.
3. Confirm you have cPanel → **File Manager** access to the site's document root (usually `public_html/`).
4. Note the currently active WordPress theme name — you may need it if the client later wants the WP header/footer on these pages (see §6).

---

## 3. Step-by-step upload (simplest path — static HTML)

This path publishes the new pages as plain HTML alongside WordPress. WordPress and WooCommerce continue running normally; the new URLs are served directly by the web server before WordPress sees them.

### 3.1 Decide what to do with the current home page

Pick **one**:

- **Option A — Replace the current home page.** The new editorial page becomes `sriaishwaryasarees.com/`.
- **Option B — Keep the current home page.** Publish the new one at `sriaishwaryasarees.com/new-home/` for review first, then switch later.

Option B is safer for the first upload.

### 3.2 Upload the Temples, Glossary, and FAQ pages

In cPanel → File Manager → `public_html/`:

1. Create three new folders: `temples`, `glossary`, `faq`.
2. Upload the **contents** of `static-export/temples/` into `public_html/temples/` (so you get `public_html/temples/index.html`, `public_html/temples/css/heritage.css`, `public_html/temples/images/...`).
3. Repeat for `glossary/` and `faq/`.
4. Verify in a browser:
   - `https://sriaishwaryasarees.com/temples/`
   - `https://sriaishwaryasarees.com/glossary/`
   - `https://sriaishwaryasarees.com/faq/`

WordPress will not intercept these URLs because a real folder with `index.html` exists — Apache/LiteSpeed serves the file directly before handing off to WordPress.

### 3.3 Upload the new Home page

**If Option A (replace):**

1. Rename the current WordPress home rendering to keep it accessible — you don't need to touch WordPress itself, but if there is an existing `public_html/index.html` (rare), rename it to `index.html.bak`.
2. Upload the **contents** of `static-export/home/` (`index.html`, `css/`, `images/`) directly into `public_html/`.
3. Test `https://sriaishwaryasarees.com/`. Because Apache serves `index.html` before falling through to `index.php` (WordPress), the new page takes over immediately.
4. To roll back: delete `public_html/index.html` (and `css/`, `images/` if you want a full clean-up). WordPress home returns automatically.

**If Option B (parallel):**

1. Create `public_html/new-home/`.
2. Upload the contents of `static-export/home/` into it.
3. Test `https://sriaishwaryasarees.com/new-home/`.
4. When approved, follow Option A steps to promote it.

### 3.4 Post-upload smoke test (5 minutes)

Open each of the four URLs on desktop **and** mobile and confirm:

- Fonts load (Fraunces + Inter — served from Google Fonts by `<link>` tags already in the HTML).
- Images render (all under each folder's `images/`).
- Cross-page nav (Home → Temples → Glossary → FAQ) works.
- WhatsApp float button opens `wa.me/919500192418` with the pre-filled message.
- Every "Shop", category, and product link goes to the live WooCommerce site.

---

## 4. Wire up the newsletter form (required — one-time)

The newsletter form on the Home and Temples pages is currently **visual only**. Clicking Subscribe does not send the email anywhere yet. Pick whichever tool the client already uses:

Find this block near the bottom of `home/index.html` (and the same in `temples/index.html`):

```html
<form class="h-newsletter-form" ...>
  <input type="email" ... name="email" placeholder="your@email.com" />
  <button type="submit">Subscribe</button>
</form>
```

### Option 1 — Mailchimp (recommended, easiest)

1. In Mailchimp → Audience → **Signup forms → Embedded forms → Naked**.
2. Copy the `<form action="https://xxx.list-manage.com/subscribe/post?u=...&id=...">` URL and the hidden bot-protection field (the `<div style="position: absolute; left: -5000px;">...</div>`).
3. Replace the existing `<form ...>` tag's `action` attribute and add `method="post"` and `target="_blank"`.
4. Paste the hidden bot-protection div just before `</form>`.
5. Rename the input's `name` attribute to `EMAIL` (Mailchimp requirement).

### Option 2 — Brevo / Sendinblue

Same shape — replace `action` with the Brevo form endpoint from **Contacts → Forms → Share** and set the input `name` to `email`.

### Option 3 — MailPoet or Contact Form 7 (WordPress plugins)

These require the page to be served by WordPress (PHP), not as static HTML, because they rely on WordPress shortcodes. If the client insists on one of these:

- Either use the shortcode via a small AJAX endpoint (advanced), or
- Convert the static HTML into a **WordPress Page Template** — see §6.

### Option 4 — Just collect emails to a Google Sheet

Use a free service like Formspree, Getform, or Google Apps Script. Replace `action` with the endpoint URL and leave the rest as-is.

**Test:** subscribe with a test email address, confirm it lands in the chosen system.

---

## 5. Updating content later

Two options depending on the change:

### 5.1 Small text tweak (a word, a price, a link)

Edit the `.html` file directly in cPanel → File Manager → **Edit**. Save. Done.

### 5.2 New "Sacred Threads" temple, new testimonial, structural change

The Lovable project is the source of truth. Ask the site owner to:

1. Update content in the Lovable project (e.g. prepend a new entry to `src/heritage-homepage/temples.json`, add the image to `src/heritage-homepage/assets/`).
2. Re-run `python3 scripts/export-static.py` to regenerate `static-export/`.
3. Send you the new `static-export/` folder — you re-upload the changed pages.

---

## 6. Optional upgrade — serve the pages through WordPress (recommended long-term)

Right now the new pages are static HTML sitting next to WordPress. They **do not** inherit the WordPress theme header/menu/footer, and they cannot use plugins (MailPoet, Yoast SEO fields per page, etc.).

If the client wants:
- the WordPress top menu + footer on these pages, **or**
- live WooCommerce product data in the "New Arrivals" section, **or**
- Yoast/RankMath SEO per page,

then convert each `index.html` into a WordPress **Page Template** in the active theme:

1. In the active theme folder (`public_html/wp-content/themes/<active-theme>/`), create four files:
   - `page-home.php`
   - `page-temples.php`
   - `page-glossary.php`
   - `page-faq.php`
2. At the top of each file, add:
   ```php
   <?php
   /* Template Name: SAS Home */  // change name per file
   get_header();  // optional — omit if you want the exact static look
   ?>
   ```
   Paste the `<body>` contents of the matching `index.html` below.
   End with:
   ```php
   <?php get_footer(); ?>  // optional
   ```
3. Move each folder's `css/heritage.css` and `images/` into `wp-content/themes/<theme>/assets/sas/` and update the `<link href>` and `<img src>` paths accordingly (or enqueue the CSS via `wp_enqueue_style` in `functions.php`).
4. In WP Admin → Pages → Add New, create four pages, and for each one select the matching template from the **Page Attributes → Template** dropdown.
5. Assign the "SAS Home" page as the site's front page in **Settings → Reading → A static page**.

**Bonus — live New Arrivals from WooCommerce:** the New Arrivals thumbnails in the static export are hard-coded snapshots. Once the pages are PHP templates, you can pull live products with the WooCommerce Store API:

```
GET https://sriaishwaryasarees.com/wp-json/wc/store/v1/products?per_page=8&orderby=date&order=desc
```

Reference implementation is in the Lovable project at `src/lib/arrivals.functions.ts`. Cache the response for 10 minutes to avoid load spikes.

This also answers a question the owner raised: **the "blurry" new arrivals are placeholder images from the export. Once you wire this API call, you'll be pulling the real product photos WooCommerce is already hosting — at whatever resolution the shop uploaded.**

---

## 7. SEO checklist (after go-live)

- Add the new URLs to `sitemap.xml` (Yoast/RankMath regenerates automatically if you use Page Templates in §6; for static HTML, add them manually).
- Submit the sitemap in **Google Search Console → Sitemaps**.
- Request indexing for `/`, `/temples/`, `/glossary/`, `/faq/`.
- Confirm each page's `<title>` and `<meta name="description">` are unique (already set by Lovable).
- Confirm `og:image` renders on WhatsApp / LinkedIn preview.

---

## 8. Known limitations of the static-HTML path

| Limitation | Fix |
|---|---|
| No WordPress header/menu/footer | Convert to Page Template (§6). |
| New Arrivals are static thumbnails | Convert to Page Template + call the Store API (§6). |
| Newsletter form does nothing until wired | Do §4. |
| Yoast/RankMath cannot manage these pages' SEO | Convert to Page Template (§6). |
| Cannot A/B test via WP plugins | Convert to Page Template (§6). |

None of these block go-live. They are upgrades for later.

---

## 9. Questions?

Contact the site owner. Do not push changes to production without a backup and a smoke test on staging or a hidden URL first.
