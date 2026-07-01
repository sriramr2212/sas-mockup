"""Generate static HTML/CSS export from the running dev server.

Renders each route with Playwright, extracts the hydrated DOM under
<div class="heritage-root"> plus the WhatsApp float, rewrites /src/... asset
paths to local images/, and writes two self-contained folders:

  static-export/home/{index.html, css/heritage.css, images/*}
  static-export/temples/{index.html, css/heritage.css, images/*}
"""
import asyncio, os, re, shutil, sys
from pathlib import Path
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parent.parent
EXPORT = ROOT / "static-export"
CSS_SRC = ROOT / "src" / "heritage-homepage" / "styles.css"
ASSETS_SRC = ROOT / "src" / "heritage-homepage" / "assets"

FONTS_LINK = (
    '<link rel="preconnect" href="https://fonts.googleapis.com">'
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
    '<link rel="stylesheet" '
    'href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700'
    '&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&display=swap">'
)

WA_SVG = (
    '<a class="h-wa-float" href="https://wa.me/919500192418?text=' +
    'Thank%20you%20for%20choosing%20Sri%20Aishwarya%20Sarees.%20How%20may%20we%20help%20you%20today%3F"'
    ' target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">'
    '<span class="h-wa-pulse" aria-hidden="true"></span>'
    '<svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true">'
    '<path fill="#fff" d="M19.11 17.55c-.28-.14-1.65-.81-1.9-.9-.26-.1-.44-.14-.63.14-.19.28-.72.9-.88 1.09-.16.19-.32.21-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.66-1.55-1.94-.16-.28-.02-.44.12-.58.13-.13.28-.32.42-.49.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.63-1.52-.86-2.08-.23-.55-.46-.47-.63-.48l-.53-.01c-.19 0-.5.07-.76.35-.26.28-1 1-1 2.43s1.03 2.83 1.17 3.02c.14.19 2.02 3.08 4.89 4.31.68.29 1.22.47 1.63.6.69.22 1.31.19 1.8.11.55-.08 1.65-.68 1.88-1.33.23-.65.23-1.21.16-1.33-.07-.12-.25-.19-.53-.33ZM16.01 4c-6.63 0-12 5.37-12 12 0 2.11.55 4.16 1.6 5.97L4 28l6.19-1.62A11.94 11.94 0 0 0 16.01 28c6.63 0 12-5.37 12-12s-5.37-12-12-12Z"/>'
    '</svg></a>'
)


def strip_scope(css: str) -> str:
    """Keep .heritage-root selectors intact — body will carry the class."""
    return css


def rewrite_assets(html: str, used: set[str]) -> str:
    """Rewrite /src/heritage-homepage/assets/<file>?... and /assets/<file> to images/<file>."""
    def repl(m):
        fname = os.path.basename(m.group(1).split("?")[0])
        used.add(fname)
        return f'images/{fname}'
    # Vite dev serves /src/heritage-homepage/assets/xyz.jpg?hash&whatever
    html = re.sub(r'/src/heritage-homepage/assets/([^"\s?)]+(?:\?[^"\s)]*)?)', repl, html)
    # Also handle transformed URLs like /@fs/... rarely present
    return html


async def render(page, url: str) -> tuple[str, str]:
    await page.goto(url, wait_until="networkidle")
    await page.wait_for_selector(".heritage-root")
    # Extract innerHTML of the root wrapper + the floating WA anchor
    heritage_html = await page.eval_on_selector(
        ".heritage-root", "el => el.outerHTML"
    )
    # Grab head meta title/desc for this page
    title = await page.title()
    desc = await page.eval_on_selector(
        'meta[name="description"]', "el => el.getAttribute('content')"
    ) or ""
    return title, heritage_html + WA_SVG, desc  # type: ignore


def page_template(title: str, description: str, body_inner: str, css_href: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{description}">
{FONTS_LINK}
<link rel="stylesheet" href="{css_href}">
</head>
<body class="heritage-root-body">
{body_inner}
</body>
</html>
"""


async def main():
    if EXPORT.exists():
        shutil.rmtree(EXPORT)
    async with async_playwright() as p:
        b = await p.chromium.launch(headless=True)
        ctx = await b.new_context(viewport={"width": 1440, "height": 2400})
        page = await ctx.new_page()

        results = {}
        for slug, url in [("home", "http://localhost:8080/"),
                          ("temples", "http://localhost:8080/temples")]:
            await page.goto(url, wait_until="networkidle")
            await page.wait_for_selector(".heritage-root", timeout=15000)
            # Trigger lazy images to resolve their src attributes
            await page.wait_for_timeout(500)
            body_html = await page.eval_on_selector(".heritage-root", "el => el.outerHTML")
            title = await page.title()
            desc = await page.eval_on_selector(
                'meta[name="description"]', "el => el.getAttribute('content')"
            ) or ""
            # Append WhatsApp float
            body_html = body_html + WA_SVG
            # Rewrite Tanstack Link hrefs to relative HTML paths
            # Home -> temples: <a href="/temples">
            body_html = re.sub(r'href="/temples"', 'href="../temples/index.html"', body_html)
            # Temples -> home: <a href="/">
            body_html = re.sub(r'href="/"', 'href="../home/index.html"', body_html)
            # Remove any data-* debugging attributes from TanStack Router if present
            results[slug] = (title, desc, body_html)

        await b.close()

    # Write outputs
    css_text = CSS_SRC.read_text()
    used: set[str] = set()

    for slug, (title, desc, html) in results.items():
        out = EXPORT / slug
        (out / "css").mkdir(parents=True, exist_ok=True)
        (out / "images").mkdir(parents=True, exist_ok=True)
        html = rewrite_assets(html, used)
        (out / "index.html").write_text(page_template(title, desc, html, "css/heritage.css"))
        (out / "css" / "heritage.css").write_text(css_text)

    # Copy every used asset into each folder's images/
    for slug in results:
        for fname in used:
            src = ASSETS_SRC / fname
            if src.exists():
                shutil.copy2(src, EXPORT / slug / "images" / fname)

    # README
    (EXPORT / "README.md").write_text(README)
    print(f"Wrote export to {EXPORT}")
    print(f"Assets copied: {len(used)}")

README = """# Sri Aishwarya Sarees — Static HTML/CSS Export

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
"""

if __name__ == "__main__":
    asyncio.run(main())
