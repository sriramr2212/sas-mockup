import { createServerFn } from "@tanstack/react-start";

// Public WordPress WooCommerce Store API — no auth needed.
const STORE_BASE = "https://sriaishwaryasarees.com/wp-json/wc/store/v1";

export type ArrivalProduct = {
  id: number;
  name: string;
  price: string;
  img: string | null;
  href: string;
};

export type CollectionThumb = {
  slug: string;
  img: string | null;
  href: string;
  name: string;
};

// Simple in-memory cache (per server instance)
type CacheEntry<T> = { value: T; expires: number };
const cache = new Map<string, CacheEntry<unknown>>();
function getCached<T>(key: string): T | null {
  const e = cache.get(key);
  if (!e) return null;
  if (Date.now() > e.expires) {
    cache.delete(key);
    return null;
  }
  return e.value as T;
}
function setCached<T>(key: string, value: T, ttlMs: number) {
  cache.set(key, { value, expires: Date.now() + ttlMs });
}

function decode(s: string): string {
  return s
    .replace(/&#8211;/g, "–")
    .replace(/&#8217;/g, "'")
    .replace(/&#038;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"');
}

export const getNewArrivals = createServerFn({ method: "GET" })
  .inputValidator((data: { limit?: number } | undefined) => ({
    limit: Math.min(Math.max(data?.limit ?? 8, 1), 20),
  }))
  .handler(async ({ data }): Promise<ArrivalProduct[]> => {
    const key = `arrivals:${data.limit}`;
    const cached = getCached<ArrivalProduct[]>(key);
    if (cached) return cached;

    try {
      const res = await fetch(
        `${STORE_BASE}/products?per_page=${data.limit}&orderby=date&order=desc`,
        { headers: { Accept: "application/json" } },
      );
      if (!res.ok) return [];
      const items = (await res.json()) as Array<{
        id: number;
        name: string;
        permalink: string;
        images?: Array<{ src: string; thumbnail?: string }>;
        prices?: { price: string; currency_symbol: string; currency_minor_unit: number };
      }>;
      const mapped: ArrivalProduct[] = items.map((p) => {
        const minor = p.prices?.currency_minor_unit ?? 2;
        const raw = p.prices?.price ?? "0";
        const num = Number(raw) / Math.pow(10, minor);
        const priceStr = `${p.prices?.currency_symbol ?? "₹"}${num.toLocaleString("en-IN")}`;
        return {
          id: p.id,
          name: decode(p.name),
          price: priceStr,
          img: p.images?.[0]?.src ?? null,
          href: p.permalink,
        };
      });
      setCached(key, mapped, 10 * 60 * 1000);
      return mapped;
    } catch {
      return [];
    }
  });

// Slug list used both to request category images and to render tiles in order.
export const COLLECTION_SLUGS: Array<{ slug: string; name: string; href: string }> = [
  { slug: "kanjivaram-silks-sarees", name: "Pure Silk (Kanjivaram)", href: "https://sriaishwaryasarees.com/product-category/Kanjivaram-silks-sarees/" },
  { slug: "silk-cotton-sarees-collection", name: "Traditional Silk Cotton", href: "https://sriaishwaryasarees.com/product-category/silk-cotton-sarees-collection/" },
  { slug: "10-yards-sarees-2", name: "10 Yards Silk Cotton", href: "https://sriaishwaryasarees.com/product-category/10-yards-sarees-2/all-collections/" },
  { slug: "printed-saree", name: "Printed Silk Cotton", href: "https://sriaishwaryasarees.com/product-category/printed-saree/" },
  { slug: "traditional-polycotton", name: "Semi Silk Cotton", href: "https://sriaishwaryasarees.com/product-category/saree-collections/traditional-polycotton/" },
  { slug: "cotton-sarees-kuravalli-chettinad-kanchi", name: "Traditional Cotton", href: "https://sriaishwaryasarees.com/product-category/cotton-sarees-kuravalli-chettinad-kanchi/" },
  { slug: "amman-pavadai", name: "Kids Pattu Pavadai", href: "https://sriaishwaryasarees.com/product-category/amman-pavadai/" },
  { slug: "fancy-sarees", name: "Fancy Sarees", href: "https://sriaishwaryasarees.com/product-category/fancy-sarees/" },
  { slug: "dance-sarees", name: "Dance Sarees", href: "https://sriaishwaryasarees.com/product-category/dance-sarees/" },
  { slug: "bridal-collections", name: "Bridal Collection", href: "https://sriaishwaryasarees.com/product-category/silk-saree/bridal-collections/" },
  { slug: "tussar-silk", name: "Tussar & Soft Silk", href: "https://sriaishwaryasarees.com/product-category/silk-saree/tussar-silk/" },
  { slug: "uga-mens-kurtas-bushirt", name: "Men's Kurtas", href: "https://sriaishwaryasarees.com/product-category/uga-mens-kurtas-bushirt/" },
  { slug: "mens-cotton-dhotis", name: "Men's Dhothis", href: "https://sriaishwaryasarees.com/product-category/mens-cotton-dhotis/" },
];

export const getCollectionThumbnails = createServerFn({ method: "GET" }).handler(
  async (): Promise<CollectionThumb[]> => {
    const key = "collections:thumbs";
    const cached = getCached<CollectionThumb[]>(key);
    if (cached) return cached;

    try {
      const res = await fetch(`${STORE_BASE}/products/categories?per_page=100`, {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("bad status");
      const cats = (await res.json()) as Array<{
        slug: string;
        image?: { src: string } | null;
      }>;
      const bySlug = new Map(cats.map((c) => [c.slug, c.image?.src ?? null]));
      const out: CollectionThumb[] = COLLECTION_SLUGS.map((c) => ({
        slug: c.slug,
        name: c.name,
        href: c.href,
        img: bySlug.get(c.slug) ?? null,
      }));
      setCached(key, out, 60 * 60 * 1000);
      return out;
    } catch {
      return COLLECTION_SLUGS.map((c) => ({ ...c, img: null }));
    }
  },
);
