import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

import "../heritage-homepage/styles.css";
import testimonialsData from "../heritage-homepage/testimonials.json";
import templesData from "../heritage-homepage/temples.json";
import templeMeenakshi from "../heritage-homepage/assets/temple-meenakshi.jpg";
import templeKamakshi from "../heritage-homepage/assets/temple-kamakshi.jpg";
import templeChennakeshava from "../heritage-homepage/assets/temple-chennakeshava.jpg";
import templeRanganathaswamy from "../heritage-homepage/assets/temple-ranganathaswamy.jpg";
import {
  getNewArrivals,
  getCollectionThumbnails,
  type ArrivalProduct,
  type CollectionThumb,
} from "../lib/arrivals.functions";

// Map JSON image keys (filenames) to bundled assets so the featured temples can
// be swapped each month by editing temples.json — the first entry is the
// current month, the second is the previous month.
const templeImages: Record<string, string> = {
  "temple-meenakshi.jpg": templeMeenakshi,
  "temple-kamakshi.jpg": templeKamakshi,
  "temple-chennakeshava.jpg": templeChennakeshava,
  "temple-ranganathaswamy.jpg": templeRanganathaswamy,
};

import logo from "../heritage-homepage/assets/logo.png";
import heroAsset from "../heritage-homepage/assets/sas-hero.png.asset.json";
const hero = heroAsset.url;
import weaving from "../heritage-homepage/assets/weaving-video.jpg";
import giftcard from "../heritage-homepage/assets/giftcard.jpg";
import videoShop from "../heritage-homepage/assets/video.jpg";
import storeTnagar from "../heritage-homepage/assets/store-tnagar.jpg";
import storeAdyar from "../heritage-homepage/assets/store-adyar.jpg";

// Bundled fallback thumbnails, keyed by category slug — used until the live
// Store API returns a category image.
import colKanji from "../heritage-homepage/assets/col-kanjivaram.jpg";
import colSilkCotton from "../heritage-homepage/assets/col-silkcotton.jpg";
import col10Yard from "../heritage-homepage/assets/col-10yard.jpg";
import colPrinted from "../heritage-homepage/assets/col-printed.jpg";
import colSemisilk from "../heritage-homepage/assets/col-semisilk.jpg";
import colCotton from "../heritage-homepage/assets/col-cotton.jpg";
import colPattu from "../heritage-homepage/assets/col-pattu.jpg";
import colKurta from "../heritage-homepage/assets/col-kurta.jpg";
import colFancy from "../heritage-homepage/assets/col-fancy.jpg";
import colDance from "../heritage-homepage/assets/col-dance.jpg";
import colDhoti from "../heritage-homepage/assets/col-dhoti.jpg";
import colBridal from "../heritage-homepage/assets/col-bridal.jpg";
import colTussar from "../heritage-homepage/assets/col-tussar.jpg";

const collectionFallbackBySlug: Record<string, string> = {
  "kanjivaram-silks-sarees": colKanji,
  "silk-cotton-sarees-collection": colSilkCotton,
  "10-yards-sarees-2": col10Yard,
  "printed-saree": colPrinted,
  "traditional-polycotton": colSemisilk,
  "cotton-sarees-kuravalli-chettinad-kanchi": colCotton,
  "amman-pavadai": colPattu,
  "fancy-sarees": colFancy,
  "dance-sarees": colDance,
  "bridal-collections": colBridal,
  "tussar-silk": colTussar,
  "uga-mens-kurtas-bushirt": colKurta,
  "mens-cotton-dhotis": colDhoti,
};

import ig1 from "../heritage-homepage/assets/ig1.jpg";
import ig2 from "../heritage-homepage/assets/ig2.jpg";
import ig3 from "../heritage-homepage/assets/ig3.jpg";
import ig4 from "../heritage-homepage/assets/ig4.jpg";
import ig5 from "../heritage-homepage/assets/ig5.jpg";
import ig6 from "../heritage-homepage/assets/ig6.jpg";

const BASE = "https://sriaishwaryasarees.com";

const arrivalsQueryOptions = queryOptions({
  queryKey: ["arrivals", 8],
  queryFn: () => getNewArrivals({ data: { limit: 8 } }),
  staleTime: 10 * 60 * 1000,
});

const collectionsQueryOptions = queryOptions({
  queryKey: ["collections", "thumbs"],
  queryFn: () => getCollectionThumbnails(),
  staleTime: 60 * 60 * 1000,
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sri Aishwarya Sarees — Heritage Handloom House · Chennai Since 1972" },
      {
        name: "description",
        content:
          "Authentic Kanjivaram silk, silk cotton, 10-yard madisar and pure cotton sarees from a family-owned Chennai handloom house, trusted for three generations.",
      },
      { property: "og:title", content: "Sri Aishwarya Sarees — Chennai Heritage Handloom" },
      {
        property: "og:description",
        content: "Three generations of authentic South Indian sarees. Shop online or visit our T.Nagar & Adyar boutiques.",
      },
      { property: "og:image", content: hero },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: hero },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(arrivalsQueryOptions);
    context.queryClient.ensureQueryData(collectionsQueryOptions);
  },
  component: HeritageHome,
});

// Header navigation — grouped dropdowns using real live-site category URLs.
const navGroups: { name: string; href: string; wide?: boolean; items: { name: string; href: string }[] }[] = [
  {
    name: "Kanjivaram Silks",
    href: `${BASE}/product-category/Kanjivaram-silks-sarees/`,
    items: [
      { name: "All Kanjivaram Silks", href: `${BASE}/product-category/kanjivaram-silks-sarees/all-collections-kanjivaram-silks-sarees/` },
      { name: "Pure Silk Sarees", href: `${BASE}/product-category/kanjivaram-silks-sarees/pure-silk-sarees/` },
      { name: "Soft Silk Sarees", href: `${BASE}/product-category/kanjivaram-silks-sarees/soft-silks/` },
      { name: "Korvai Kanjivaram", href: `${BASE}/product-category/kanjivaram-silks-sarees/korvai-kanchivaram-silk/` },
      { name: "Pure Raw Silk", href: `${BASE}/product-category/silk-saree/pure-raw-silk/` },
      { name: "Tussar Silk", href: `${BASE}/product-category/silk-saree/tussar-silk/` },
      { name: "Vegan Silk", href: `${BASE}/product-category/silk-saree/vegen-silks/` },
      { name: "Bridal Collection", href: `${BASE}/product-category/silk-saree/bridal-collections/` },
    ],
  },
  {
    name: "Silk Cotton",
    href: `${BASE}/product-category/silk-cotton-sarees-collection/`,
    wide: true,
    items: [
      { name: "All Silk Cotton", href: `${BASE}/product-category/silk-cotton-sarees-collection/` },
      { name: "Ameya Collections", href: `${BASE}/product-category/silk-cotton/ameya-collections/` },
      { name: "Kora Silk Cotton", href: `${BASE}/product-category/silk-cotton/kora-silk/` },
      { name: "Korvai Silk Cotton", href: `${BASE}/product-category/silk-cotton/silk-cotton-korvai/` },
      { name: "Big Border Silk Cotton", href: `${BASE}/product-category/silk-cotton/silk-cotton-big-border-sarees/` },
      { name: "Silk Cotton Butta", href: `${BASE}/product-category/silk-cotton/silk-cotton-butta/` },
      { name: "Muthukattam Silk Cotton", href: `${BASE}/product-category/silk-cotton/muthukattam-silk-cotton/` },
      { name: "Thread Work Silk Cotton", href: `${BASE}/product-category/silk-cotton/silk-cotton-classic-thread-work/` },
      { name: "Vaira Oosi Silk Cotton", href: `${BASE}/product-category/silk-cotton/vaira-oosi/` },
      { name: "Veldhari Silk Cotton", href: `${BASE}/product-category/silk-cotton/silk-cotton-veldhari/` },
      { name: "Simple Silk Cotton", href: `${BASE}/product-category/silk-cotton/silk-cotton-simple-sarees/` },
      { name: "Printed Silk Cotton", href: `${BASE}/product-category/printed-saree/` },
    ],
  },
  {
    name: "Semi Silk Cotton",
    href: `${BASE}/product-category/saree-collections/traditional-polycotton/`,
    items: [
      { name: "Traditional Semi Silk Cotton", href: `${BASE}/product-category/saree-collections/traditional-polycotton/` },
      { name: "Printed Semi Silk Cotton", href: `${BASE}/product-category/saree-collections/printed-semi-silk-cotton/` },
      { name: "Semi Mysore Silk", href: `${BASE}/product-category/saree-collections/semi-mysore-silk/` },
      { name: "Mangalagiri Silks", href: `${BASE}/product-category/saree-collections/mangalagiri-silk/` },
      { name: "Fancy Raw Silk", href: `${BASE}/product-category/saree-collections/fancy-raw-silk/` },
      { name: "Fancy Tussar Silks", href: `${BASE}/product-category/saree-collections/fancy-tussar-silk/` },
    ],
  },
  {
    name: "Cotton Sarees",
    href: `${BASE}/product-category/cotton-sarees-kuravalli-chettinad-kanchi/`,
    wide: true,
    items: [
      { name: "All Cotton Sarees", href: `${BASE}/product-category/cotton-sarees-kuravalli-chettinad-kanchi/cotton-sarees-kuravalli-cottons-kanchi-cotton/` },
      { name: "Kuravalli Cottons", href: `${BASE}/product-category/cotton-sarees/kuravalli-cottons/` },
      { name: "Chettinad Cotton", href: `${BASE}/product-category/cotton-sarees/chettinad-cotton/` },
      { name: "Kanchi Cotton", href: `${BASE}/product-category/cotton-sarees/kanchi-cotton/` },
      { name: "Jaipur Cotton", href: `${BASE}/product-category/cotton-sarees/jaipur-cotton/` },
      { name: "Chanderi Cotton", href: `${BASE}/product-category/cotton-sarees-kuravalli-chettinad-kanchi/chanderi-cotton/` },
      { name: "Kadhi Cotton", href: `${BASE}/product-category/cotton-sarees/kadhi-cotton/` },
      { name: "Devendra Cotton", href: `${BASE}/product-category/cotton-sarees-kuravalli-chettinad-kanchi/devendra-cotton-sarees/` },
      { name: "Rich Cotton", href: `${BASE}/product-category/cotton-sarees/rich-cotton/` },
      { name: "Printed Cotton", href: `${BASE}/product-category/cotton-sarees-kuravalli-chettinad-kanchi/printed-cotton-saree/` },
      { name: "Sungadi Saree", href: `${BASE}/product-category/cotton-sarees/sungadi-saree/` },
    ],
  },
  {
    name: "10 & 9 Yards",
    href: `${BASE}/product-category/10-yards-sarees-2/all-collections/`,
    items: [
      { name: "All Collections", href: `${BASE}/product-category/10-yards-sarees-2/all-collections/` },
      { name: "10 Yards Pure Silk", href: `${BASE}/product-category/10-yards-silk-sarees/` },
      { name: "10 Yards Pure Silk Cotton", href: `${BASE}/product-category/10-yards-sarees-2/10-yards-silk/` },
      { name: "10 Yards Semi Silk Cotton", href: `${BASE}/product-category/collections/10-yards-semi-silk-cotton/` },
      { name: "10 & 9 Yards Pure Cotton", href: `${BASE}/product-category/10-9-yards-cotton-saree/` },
      { name: "9 Yards Kalyani Cotton", href: `${BASE}/product-category/9-yards-kalyani-cotton/` },
      { name: "9 Yards Sungadi", href: `${BASE}/product-category/9-yards-sungadi/` },
      { name: "Devendra Sarees", href: `${BASE}/product-category/10-yards-sarees-2/10-9-yards-devendra-sarees-2/` },
    ],
  },
  {
    name: "Kids",
    href: `${BASE}/product-category/amman-pavadai/`,
    items: [
      { name: "Amman Pavadai (Pattu)", href: `${BASE}/product-category/amman-pavadai/` },
      { name: "Ready Made Kids Frock", href: `${BASE}/product-category/ready-made-kids-frock/` },
    ],
  },
  {
    name: "Men's",
    href: `${BASE}/product-category/uga-mens-kurtas-bushirt/`,
    items: [
      { name: "Kurtas & Bushirt", href: `${BASE}/product-category/uga-mens-kurtas-bushirt/` },
      { name: "Pattu Dhothi", href: `${BASE}/product-category/mens-cotton-dhotis/pattu-dhothi/` },
      { name: "4 Muzham Dhoti", href: `${BASE}/product-category/mens-cotton-dhotis/4-muzham-dhoti/` },
      { name: "6 Muzham Dhoti", href: `${BASE}/product-category/mens-cotton-dhotis/6-muzham/` },
      { name: "8 Muzham Dhothi", href: `${BASE}/product-category/mens-cotton-dhothis/dhothi-8-muzham/` },
      { name: "Dhoti 9×5", href: `${BASE}/product-category/mens-cotton-dhothis/dhothis-95/` },
      { name: "Dhoti 10×6", href: `${BASE}/product-category/mens-cotton-dhothis/dhothi-106/` },
      { name: "Dhothi 2×8", href: `${BASE}/product-category/mens-cotton-dhotis/dhothi-28/` },
    ],
  },
  {
    name: "Dance",
    href: `${BASE}/product-category/dance-sarees/`,
    items: [
      { name: "Arangetram Sarees", href: `${BASE}/product-category/dance-sarees/arangetram-sarees/` },
      { name: "Dance Practice Sarees", href: `${BASE}/product-category/dancing-practice-sarees/` },
    ],
  },
  {
    name: "Fancy",
    href: `${BASE}/product-category/fancy-sarees/`,
    items: [
      { name: "Fancy Sarees", href: `${BASE}/product-category/fancy-sarees/` },
      { name: "Fancy Raw Silk", href: `${BASE}/product-category/saree-collections/fancy-raw-silk/` },
      { name: "Fancy Tussar Silks", href: `${BASE}/product-category/saree-collections/fancy-tussar-silk/` },
    ],
  },
];

const reviewLinks = {
  adyar: "https://search.google.com/local/writereview?placeid=ChIJO3_5v5JnUjoRQp3ZfkknJgg",
  tnagar: "https://search.google.com/local/writereview?placeid=ChIJQ5LU3VVmUjoRZUuYG7x_Jhc",
};
const qrUrl = (url: string) => `https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=0&data=${encodeURIComponent(url)}`;

// ------- ICONS ---------
const Icon = {
  Search: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>,
  User: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>,
  Heart: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Bag: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 7h12l-1 13H7L6 7Z"/><path d="M9 7a3 3 0 1 1 6 0"/></svg>,
  Menu: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>,
  Arrow: ({ dir = "right" }: { dir?: "left" | "right" }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ transform: dir === "left" ? "rotate(180deg)" : undefined }}><path d="M5 12h14M13 5l7 7-7 7"/></svg>,
  Play: () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 4l14 8-14 8V4z"/></svg>,
  Pin: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-7-6.6-7-12a7 7 0 0 1 14 0c0 5.4-7 12-7 12Z"/><circle cx="12" cy="10" r="2.5"/></svg>,
  Phone: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>,
  Clock: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
  Instagram: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>,
  Facebook: () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 22v-8h3l1-4h-4V7.5c0-1.2.4-2 2-2h2V2.2C16.6 2.1 15.4 2 14 2c-2.9 0-4.7 1.8-4.7 5v3H6v4h3.3v8H13Z"/></svg>,
  Whatsapp: () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 12a8 8 0 0 1-12.1 6.9L4 20l1.2-3.8A8 8 0 1 1 20 12Zm-4.5 2.3c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1l-.8 1c-.2.2-.3.2-.6.1-.2-.1-1-.4-2-1.3-.7-.7-1.2-1.5-1.4-1.7-.1-.2 0-.4.1-.5l.4-.5c.1-.1.2-.3.2-.4 0-.2 0-.4-.1-.5l-.8-1.9c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.3s1 2.7 1.2 2.9c.1.2 2.1 3.3 5.2 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.5-.3Z"/></svg>,
};

function HeritageHome() {
  return (
    <div className="heritage-root">
      <SiteHeader />
      <div className="h-header-spacer" aria-hidden="true" />
      <Hero />
      <TrustStrip />
      <NewArrivals />
      <Founder />
      <CollectionsCarousel />
      <Craftsmanship />
      <GiftCards />
      <VideoShopping />
      <AiTryOn />
      <Stats />
      <Testimonials />
      <ReviewQR />
      <Stores />
      <FeaturedTemple />
      <Instagram />
      <Footer />
    </div>
  );
}

const CURRENCIES = [
  { code: "INR", symbol: "₹", label: "INR ₹" },
  { code: "USD", symbol: "$", label: "USD $" },
  { code: "GBP", symbol: "£", label: "GBP £" },
  { code: "EUR", symbol: "€", label: "EUR €" },
];

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currency, setCurrency] = useState("INR");
  const [wishlistCount] = useState(0);
  const [cartCount] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const fromUrl =
      url.searchParams.get("currency") ||
      url.searchParams.get("wmc-currency") ||
      url.searchParams.get("woocs");
    const cookies = Object.fromEntries(
      document.cookie.split(";").map((c) => {
        const [k, ...v] = c.trim().split("=");
        return [k, decodeURIComponent(v.join("="))];
      }),
    );
    const fromCookie =
      cookies["woocommerce_current_currency"] ||
      cookies["aelia_cs_selected_currency"] ||
      cookies["wmc_current_currency"] ||
      cookies["woocs_current_currency"];
    const detected = (fromUrl || fromCookie || "").toUpperCase();
    if (detected && CURRENCIES.some((c) => c.code === detected)) {
      setCurrency(detected);
    }
  }, []);

  const onCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    setCurrency(code);
    if (typeof window === "undefined") return;

    const oneYear = 60 * 60 * 24 * 365;
    const cookieOpts = `path=/; max-age=${oneYear}; SameSite=Lax`;
    document.cookie = `woocommerce_current_currency=${code}; ${cookieOpts}`;
    document.cookie = `aelia_cs_selected_currency=${code}; ${cookieOpts}`;
    document.cookie = `wmc_current_currency=${code}; ${cookieOpts}`;
    document.cookie = `woocs_current_currency=${code}; ${cookieOpts}`;

    const url = new URL(window.location.href);
    url.searchParams.set("currency", code);
    url.searchParams.set("wmc-currency", code);
    window.location.assign(url.toString());
  };

  return (
    <>
      <div className={`h-fixed-wrap ${scrolled ? "is-scrolled" : ""}`}>
        <div className="h-topbar">
          Complimentary Shipping Across India
          <span className="sep">·</span>
          Personalised Saree Consultation
          <span className="sep">·</span>
          Three Generations of Trust
        </div>

        <header className="h-header">
          <div className="h-header-top">
            <button
              className="h-mobile-toggle"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <Icon.Menu />
            </button>

            <a href={BASE} className="h-logo" aria-label="Sri Aishwarya Sarees">
              <img src={logo} alt="Sri Aishwarya Sarees — Temple of Silk Cottons" />
            </a>

            <form
              className="h-search-inline"
              action={BASE}
              method="get"
              role="search"
              aria-label="Search products"
            >
              <Icon.Search />
              <input
                type="text"
                name="s"
                placeholder="Search sarees, collections, fabrics…"
                aria-label="Search sarees"
              />
              <input type="hidden" name="post_type" value="product" />
              <button type="submit">Search</button>
            </form>

            <div className="h-header-utils">
              <label className="h-currency" aria-label="Select currency">
                <select value={currency} onChange={onCurrencyChange}>
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>{c.label}</option>
                  ))}
                </select>
                <span className="h-currency-display" aria-hidden="true">
                  {CURRENCIES.find((c) => c.code === currency)?.label}
                  <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
                </span>
              </label>

              <a href={`${BASE}/my-account`} className="h-util" aria-label="My account">
                <Icon.User />
                <span>Account</span>
              </a>

              <a href={`${BASE}/wishlist`} className="h-util h-util--badge" aria-label={`Wishlist (${wishlistCount})`}>
                <Icon.Heart />
                <span>Wishlist</span>
                {wishlistCount > 0 && <em className="h-badge">{wishlistCount}</em>}
              </a>

              <a href={`${BASE}/cart`} className="h-util h-util--badge" aria-label={`Cart (${cartCount})`}>
                <Icon.Bag />
                <span>Cart</span>
                <em className="h-badge h-badge--solid" data-count={cartCount}>{cartCount}</em>
              </a>
            </div>
          </div>

          <nav className="h-nav" aria-label="Collections">
            <div className="h-nav-inner">
              {navGroups.map((g) => (
                <div key={g.name} className="h-nav-group">
                  <a href={g.href} className="h-nav-top">
                    {g.name}
                    <svg className="h-nav-caret" viewBox="0 0 12 7" width="10" height="6" aria-hidden="true"><path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                  {g.items.length > 0 && (
                    <div className={`h-nav-panel${g.wide ? " is-wide" : ""}`} role="menu">
                      {g.items.map((it) => (
                        <a key={it.name} href={it.href} role="menuitem">{it.name}</a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </header>
      </div>

      <div className={`h-mobile-nav ${menuOpen ? "open" : ""}`}>
        <button className="h-mobile-nav-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">×</button>
        <form className="h-mobile-search" action={BASE} method="get" role="search">
          <Icon.Search />
          <input name="s" type="text" placeholder="Search sarees…" />
          <input type="hidden" name="post_type" value="product" />
        </form>
        {navGroups.map((g) => (
          <div key={g.name} className="h-mobile-group">
            <a className="h-mobile-group-title" href={g.href} onClick={() => setMenuOpen(false)}>{g.name}</a>
            {g.items.map((it) => (
              <a key={it.name} className="h-mobile-sub" href={it.href} onClick={() => setMenuOpen(false)}>{it.name}</a>
            ))}
          </div>
        ))}
        <a href={`${BASE}/my-account`} onClick={() => setMenuOpen(false)}>My Account</a>
        <a href={`${BASE}/wishlist`} onClick={() => setMenuOpen(false)}>Wishlist</a>
        <a href={`${BASE}/cart`} onClick={() => setMenuOpen(false)}>Cart ({cartCount})</a>
      </div>
    </>
  );
}

function Hero() {
  return (
    <section className="h-hero">
      <div className="h-hero-grid">
        <div className="h-hero-text">
          <span className="eyebrow">Est. Chennai · Since 1972</span>
          <h1>Give Life to handloom.</h1>
          <p>
            For more than five decades, our family has carried the looms of South India into the homes of those
            who cherish authenticity. Every saree here is chosen by hand, blessed by tradition, and meant to be
            passed on.
          </p>
          <div className="h-hero-cta">
            <a className="h-btn" href={`${BASE}/shop`}>Explore the Collection</a>
            <a className="h-btn h-btn--ghost" href="#story">Our Story</a>
          </div>
        </div>
        <div className="h-hero-img">
          <img src={hero} alt="Sri Aishwarya Sarees — woman seated at a temple threshold in a teal silk-cotton saree with maroon zari border" />
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <div className="h-strip">
      <div className="h-strip-inner">
        <span className="h-strip-item">50+ Years of Heritage</span>
        <span className="sep">·</span>
        <span className="h-strip-item">Direct from Weavers</span>
        <span className="sep">·</span>
        <span className="h-strip-item">Pure Yarn · Real Zari</span>
        <span className="sep">·</span>
        <span className="h-strip-item">Trusted by Three Generations</span>
      </div>
    </div>
  );
}

function NewArrivals() {
  const { data: products } = useSuspenseQuery(arrivalsQueryOptions);
  const items: ArrivalProduct[] = products ?? [];

  return (
    <section className="h-section">
      <div className="container">
        <div className="h-section-head">
          <span className="eyebrow">Just Arrived</span>
          <h2>New Arrivals</h2>
          <p>The latest sarees to enter our store — direct from the looms we have known for generations.</p>
        </div>
        {items.length === 0 ? (
          <div className="h-section-cta">
            <a className="h-btn" href={`${BASE}/product-category/latest-collections/`}>
              View All New Arrivals
            </a>
          </div>
        ) : (
          <>
            <div className="h-arrivals-grid">
              {items.map((p) => (
                <a key={p.id} className="h-product" href={p.href}>
                  <div className="h-product-img">
                    {p.img ? (
                      <img src={p.img} alt={p.name} loading="lazy" />
                    ) : (
                      <div style={{ width: "100%", height: "100%", background: "var(--h-ivory)" }} />
                    )}
                    <div className="h-product-badge">New</div>
                  </div>
                  <div className="h-product-name">{p.name}</div>
                  <div className="h-product-price">{p.price}</div>
                </a>
              ))}
            </div>
            <div className="h-section-cta">
              <a className="h-btn" href={`${BASE}/product-category/latest-collections/`}>View All New Arrivals</a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function Founder() {
  return (
    <section className="h-section h-section--alt" id="story">
      <div className="container">
        <div className="h-founder-grid">
          <div className="h-video-frame" role="button" tabIndex={0} aria-label="Play weaving video (coming soon)">
            <img src={weaving} alt="A master weaver at the loom" />
            <div className="h-play"><Icon.Play /></div>
            <div className="h-video-caption">Watch the loom in motion</div>
          </div>
          <div>
            <span className="eyebrow">A Family Story</span>
            <h2>From my father's loom to your wardrobe.</h2>
            <p>
              Sri Aishwarya Sarees began in 1972 when our father set out across Tamil Nadu, Andhra and Karnataka,
              sitting with weavers, choosing yarn, and learning the rhythm of every loom. He believed a saree
              was never just a garment — it was a memory in the making.
            </p>
            <p>
              Three generations later, the same families weave for us. The same care goes into every fold. From
              our boutiques in T.Nagar and Adyar to homes across the world, every saree carries a quiet promise
              of patience, of authenticity, and of the hands that made it.
            </p>
            <div className="h-signature">
              — The Sri Aishwarya Family
              <small>Chennai · Three Generations of Handloom</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Craftsmanship() {
  return (
    <section className="h-craft">
      <div className="container">
        <div className="h-section-head">
          <span className="eyebrow">Our Craftsmanship</span>
          <h2>The quiet craft behind every saree.</h2>
          <p>Patience, pure yarn, and looms that have stayed in the same families for generations.</p>
        </div>
        <div className="h-craft-grid">
          <div className="h-craft-card">
            <div className="h-craft-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 7h18M3 12h18M3 17h18"/><path d="M7 3v18M17 3v18"/></svg>
            </div>
            <h3>Heritage Weaves</h3>
            <p>Curated from Kanchipuram, Chettinad, Arani and beyond — true to each region's tradition.</p>
          </div>
          <div className="h-craft-card">
            <div className="h-craft-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></svg>
            </div>
            <h3>Quality We Stand Behind</h3>
            <p>Pure yarn, real zari, honest weave — every saree inspected by our family.</p>
          </div>
          <div className="h-craft-card">
            <div className="h-craft-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 2l2.5 5 5.5.8-4 3.9.9 5.5L12 14.5 7.1 17.2 8 11.7 4 7.8 9.5 7Z"/></svg>
            </div>
            <h3>A Story in Every Saree</h3>
            <p>Weavers, villages, and a craft kept alive — one saree at a time.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CollectionsCarousel() {
  const { data: liveCollections } = useSuspenseQuery(collectionsQueryOptions);
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const collections = (liveCollections ?? []).map((c: CollectionThumb) => ({
    name: c.name,
    href: c.href,
    img: c.img ?? collectionFallbackBySlug[c.slug] ?? colKanji,
  }));
  const items = [...collections, ...collections];

  const nudge = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    setPaused(true);
    const card = el.querySelector(".h-col-card") as HTMLElement | null;
    const dist = card ? card.offsetWidth + 22 : 300;
    const wrap = el.parentElement;
    if (wrap) wrap.scrollBy({ left: dir === "right" ? dist : -dist, behavior: "smooth" });
    setTimeout(() => setPaused(false), 2400);
  };

  return (
    <section className="h-section">
      <div className="container">
        <div className="h-section-head h-collections-head">
          <span className="eyebrow">Shop by Collection</span>
          <h2>Every collection, in its own chapter.</h2>
        </div>
        <div className={`h-carousel ${paused ? "is-paused" : ""}`}
             onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="h-carousel-track-wrap" style={{ overflowX: "auto", scrollbarWidth: "none" }}>
            <div className="h-carousel-track" ref={trackRef}>
              {items.map((c, i) => (
                <a key={`${c.name}-${i}`} className="h-col-card" href={c.href}>
                  <div className="h-col-imgwrap">
                    <img src={c.img} alt={c.name} loading="lazy" />
                    <div className="h-col-meta">
                      <h3>{c.name}</h3>
                      <div className="arr">Explore →</div>
                    </div>
                  </div>
                  <div className="h-col-name">{c.name}</div>
                </a>
              ))}
            </div>
          </div>
          <div className="h-carousel-nav">
            <button className="h-carousel-btn" onClick={() => nudge("left")} aria-label="Previous"><Icon.Arrow dir="left" /></button>
            <a className="h-carousel-viewall" href={`${BASE}/shop`}>View all collections →</a>
            <button className="h-carousel-btn" onClick={() => nudge("right")} aria-label="Next"><Icon.Arrow /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

function GiftCards() {
  return (
    <section className="h-gift h-gift--compact">
      <div className="h-gift-grid">
        <div className="h-gift-img">
          <img src={giftcard} alt="Sri Aishwarya Sarees gift card on a thamboolam plate" loading="lazy" />
        </div>
        <div className="h-gift-text">
          <span className="eyebrow">Gift Cards & Coupons</span>
          <h2>The gift of a saree, chosen with love.</h2>
          <p>Let her pick her own heritage — a gift card for every celebration.</p>
          <a className="h-btn h-btn--gold" href={`${BASE}/gift-cards/`}>Purchase a Gift Card</a>
        </div>
      </div>
    </section>
  );
}

function VideoShopping() {
  return (
    <section className="h-vshop h-vshop--compact h-vshop--right">
      <div className="h-vshop-grid">
        <div className="h-vshop-text">
          <span className="eyebrow">Video Saree Consultation</span>
          <h2>Shop with us, from anywhere in the world.</h2>
          <p>Book a private video appointment with our family consultants.</p>
          <a className="h-btn h-btn--gold" href={`${BASE}/video-call-appointment/`}>Book an Appointment</a>
        </div>
        <img src={videoShop} alt="Video saree consultation" loading="lazy" />
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { n: "50+", l: "Years of Heritage" },
    { n: "3", l: "Generations" },
    { n: "2", l: "Chennai Boutiques" },
    { n: "1000s", l: "Sarees · One Family" },
  ];
  return (
    <section className="h-stats">
      <div className="container">
        <div className="h-stats-grid">
          {stats.map((s) => (
            <div key={s.l} className="h-stat">
              <strong>{s.n}</strong>
              <span>{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const t = testimonialsData as Array<{ name: string; location: string; rating: number; review: string }>;
  const [perView, setPerView] = useState(3);
  const [start, setStart] = useState(0);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setPerView(w < 720 ? 1 : w < 1080 ? 2 : 3);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const maxStart = Math.max(0, t.length - perView);
  const safeStart = Math.min(start, maxStart);
  const visible = t.slice(safeStart, safeStart + perView);
  const prev = () => setStart((s) => Math.max(0, s - 1));
  const next = () => setStart((s) => Math.min(maxStart, s + 1));

  return (
    <section className="h-section h-section--alt h-testimonials">
      <div className="container">
        <div className="h-section-head">
          <span className="eyebrow">From Our Patrons</span>
          <h2>Testimonials from our Patrons</h2>
        </div>
        <div className="h-test-carousel">
          <button className="h-test-arrow" onClick={prev} disabled={safeStart === 0} aria-label="Previous testimonials">
            <Icon.Arrow dir="left" />
          </button>
          <div className="h-test-row" data-per-view={perView}>
            {visible.map((cur, i) => (
              <div className="h-test-card" key={`${safeStart}-${i}`}>
                <div className="h-test-stars">{"★".repeat(cur.rating)}</div>
                <blockquote>"{cur.review}"</blockquote>
                <cite>{cur.name}<small>{cur.location}</small></cite>
              </div>
            ))}
          </div>
          <button className="h-test-arrow" onClick={next} disabled={safeStart >= maxStart} aria-label="Next testimonials">
            <Icon.Arrow />
          </button>
        </div>
      </div>
    </section>
  );
}

function Instagram() {
  return (
    <section className="h-section">
      <div className="container">
        <div className="h-section-head">
          <span className="eyebrow">@sri_aishwarya_sarees</span>
          <h2>From our looms and our patrons.</h2>
        </div>
        <div className="h-ig-grid">
          {[ig1, ig2, ig3, ig4, ig5, ig6].map((src, i) => (
            <a key={i} href="https://www.instagram.com/sri_aishwarya_sarees/" target="_blank" rel="noreferrer">
              <img src={src} alt="" loading="lazy" />
            </a>
          ))}
        </div>
        <div className="h-ig-handle">
          Follow us <a href="https://www.instagram.com/sri_aishwarya_sarees/" target="_blank" rel="noreferrer">@sri_aishwarya_sarees</a>
        </div>
      </div>
    </section>
  );
}

function Stores() {
  return (
    <section className="h-section h-section--alt h-section--tight">
      <div className="container">
        <div className="h-section-head">
          <span className="eyebrow">Visit Our Stores</span>
          <h2>Two boutiques in the heart of Chennai.</h2>
          <p>Step into either boutique for an unhurried, personal saree consultation.</p>
        </div>
        <div className="h-stores-grid">
          <div className="h-store">
            <img src={storeTnagar} alt="Sri Aishwarya Sarees T.Nagar Branch" loading="lazy" />
            <div className="h-store-body">
              <h3>T. Nagar Branch</h3>
              <address>10, Arcot Street, T. Nagar,<br />Near MGR Memorial House,<br />Chennai 600 017</address>
              <div className="h-store-meta">
                <div className="h-store-meta-row"><Icon.Phone /><div><a href="tel:+914442604447">+91 44 4260 4447</a> · <a href="tel:+919840983999">+91 98409 83999</a></div></div>
                <div className="h-store-meta-row"><Icon.Clock /><div>Open Daily · 10:00 AM – 9:00 PM</div></div>
              </div>
              <div className="h-store-actions">
                <a className="h-btn" href="https://maps.google.com/?q=Sri+Aishwarya+Sarees+T+Nagar+Chennai" target="_blank" rel="noreferrer">Get Directions</a>
                <a className="h-btn h-btn--ghost" href="https://wa.me/919840983999">WhatsApp</a>
              </div>
            </div>
          </div>
          <div className="h-store">
            <img src={storeAdyar} alt="Sri Aishwarya Sarees Adyar Branch" loading="lazy" />
            <div className="h-store-body">
              <h3>Adyar Branch</h3>
              <address>4/1, Indira Nagar 1st Avenue,<br />Adyar,<br />Chennai 600 020</address>
              <div className="h-store-meta">
                <div className="h-store-meta-row"><Icon.Phone /><div><a href="tel:+914442604449">+91 44 4260 4449</a> · <a href="tel:+919500192418">+91 95001 92418</a></div></div>
                <div className="h-store-meta-row"><Icon.Clock /><div>Open Daily · 10:00 AM – 9:00 PM</div></div>
              </div>
              <div className="h-store-actions">
                <a className="h-btn" href="https://maps.google.com/?q=Sri+Aishwarya+Sarees+Adyar+Chennai" target="_blank" rel="noreferrer">Get Directions</a>
                <a className="h-btn h-btn--ghost" href="https://wa.me/919500192418">WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewQR() {
  return (
    <section className="h-section h-section--dark">
      <div className="container">
        <div className="h-section-head">
          <span className="eyebrow">Scan or Click to Review Us</span>
          <h2>Loved your saree? Share a word.</h2>
          <p>Your review helps another family find an honest handloom store. Scan the QR for your nearest branch.</p>
        </div>
        <div className="h-qr-grid">
          <div className="h-qr">
            <h3>Adyar Branch</h3>
            <div className="h-qr-img"><img src={qrUrl(reviewLinks.adyar)} alt="Adyar Google review QR" loading="lazy" /></div>
            <p>Open your camera and point it at the code, or tap below.</p>
            <a href={reviewLinks.adyar} target="_blank" rel="noreferrer">Write a Google Review →</a>
          </div>
          <div className="h-qr">
            <h3>T. Nagar Branch</h3>
            <div className="h-qr-img"><img src={qrUrl(reviewLinks.tnagar)} alt="T.Nagar Google review QR" loading="lazy" /></div>
            <p>Open your camera and point it at the code, or tap below.</p>
            <a href={reviewLinks.tnagar} target="_blank" rel="noreferrer">Write a Google Review →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function AiTryOn() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };
  return (
    <section className="h-aitry h-aitry--slim" aria-labelledby="h-aitry-title">
      <div className="h-aitry-inner h-aitry-inner--textonly">
        <div className="h-aitry-text">
          <div className="h-aitry-badge-row">
            <span className="h-aitry-badge">
              <span className="dot" /> Coming Soon
            </span>
          </div>
          <span className="eyebrow">AI Saree Try-On</span>
          <h2 id="h-aitry-title">Your Personal AI Saree Trial Room.</h2>
          <p>Virtually drape any saree from our collection — coming soon to your phone.</p>
          {submitted ? (
            <p className="h-aitry-thanks">Thank you. We will write to you the moment it is ready.</p>
          ) : (
            <form className="h-aitry-form" onSubmit={onSubmit}>
              <input
                type="email"
                required
                placeholder="Your email address"
                aria-label="Email for AI Try-On launch notification"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="h-btn h-btn--gold">Notify Me</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function FeaturedTemple() {
  type Entry = {
    slug: string;
    month: string;
    name: string;
    location: string;
    image: string;
    description: string;
    url: string;
  };
  const all = templesData as Entry[];
  if (all.length < 2) return null;
  const current = all[0];
  const previous = all[1];

  const resolveImg = (img: string) => {
    const key = img.split("/").pop() ?? "";
    return templeImages[key] ?? templeMeenakshi;
  };

  const cell = (t: Entry, kind: "previous" | "current") => {
    const img = resolveImg(t.image);
    return (
      <div className={`h-temple-cell h-temple-cell--${kind}`}>
        <Link
          to="/temples"
          hash={t.slug}
          className="h-temple-media"
          aria-label={`${t.name} — read the story`}
        >
          <img src={img} alt={`${t.name}, ${t.location}`} loading="lazy" />
        </Link>
        <div className="h-temple-text">
          <span className="eyebrow">{t.month}</span>
          <h3>{t.name}</h3>
          <div className="h-temple-loc">
            <Icon.Pin /> <span>{t.location}</span>
          </div>
          <Link to="/temples" hash={t.slug} className="h-temple-cell-btn">
            Read the Story
          </Link>
        </div>
      </div>
    );
  };

  return (
    <section className="h-temple h-temple--simple" aria-labelledby="h-temple-title">
      <div className="container">
        <div className="h-section-head h-temple-head">
          <span className="eyebrow">Featured Temples</span>
          <h2 id="h-temple-title">Sacred Threads · Temple of the Month</h2>
        </div>
        <div className="h-temple-simple-grid">
          {cell(previous, "previous")}
          <div className="h-temple-divider" aria-hidden="true" />
          {cell(current, "current")}
        </div>
        <div className="h-temple-archive-cta">
          <Link to="/temples" className="h-temple-archive-link">
            See all featured temples →
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="h-footer">
      <div className="container">
        <div className="h-footer-grid">
          <div className="h-footer-brand">
            <img src={logo} alt="Sri Aishwarya Sarees" />
            <p>A family-owned heritage handloom house from Chennai. Authentic South Indian sarees, woven by the hands we have known for fifty years.</p>
            <div className="h-footer-social">
              <a href="https://www.instagram.com/sri_aishwarya_sarees/" target="_blank" rel="noreferrer" aria-label="Instagram"><Icon.Instagram /></a>
              <a href="https://www.facebook.com/sriaishwaryasarees" target="_blank" rel="noreferrer" aria-label="Facebook"><Icon.Facebook /></a>
              <a href="https://wa.me/919500192418" target="_blank" rel="noreferrer" aria-label="WhatsApp"><Icon.Whatsapp /></a>
            </div>
          </div>
          <div>
            <h4>Shop</h4>
            <ul>
              <li><a href={`${BASE}/product-category/Kanjivaram-silks-sarees/`}>Pure Silk</a></li>
              <li><a href={`${BASE}/product-category/silk-cotton-sarees-collection/`}>Silk Cotton</a></li>
              <li><a href={`${BASE}/product-category/10-yards-sarees-2/all-collections/`}>10 Yards</a></li>
              <li><a href={`${BASE}/product-category/cotton-sarees-kuravalli-chettinad-kanchi/`}>Cotton</a></li>
              <li><a href={`${BASE}/product-category/fancy-sarees/`}>Fancy</a></li>
              <li><a href={`${BASE}/product-category/dance-sarees/`}>Dance</a></li>
              <li><a href={`${BASE}/shop`}>All Sarees</a></li>
            </ul>
          </div>
          <div>
            <h4>Customer Care</h4>
            <ul>
              <li><a href={`${BASE}/my-account`}>My Account</a></li>
              <li><a href={`${BASE}/cart`}>Cart</a></li>
              <li><a href={`${BASE}/video-call-appointment/`}>Video Shopping</a></li>
              <li><a href={`${BASE}/gift-cards/`}>Gift Cards</a></li>
              <li><a href={`${BASE}/contact`}>Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4>Visit Us</h4>
            <ul>
              <li><strong style={{ color: "var(--h-cream)" }}>T. Nagar:</strong><br />10, Arcot Street, T. Nagar, Chennai</li>
              <li><a href="tel:+919840983999">+91 98409 83999</a></li>
              <li style={{ marginTop: 10 }}><strong style={{ color: "var(--h-cream)" }}>Adyar:</strong><br />4/1, Indira Nagar 1st Ave, Chennai</li>
              <li><a href="tel:+919500192418">+91 95001 92418</a></li>
              <li style={{ marginTop: 10 }}><a href="mailto:hello@sriaishwaryasarees.com">hello@sriaishwaryasarees.com</a></li>
            </ul>
          </div>
        </div>
        <div className="h-footer-bottom">
          <div>© {new Date().getFullYear()} Sri Aishwarya Sarees · Temple of Silk Cottons</div>
          <div>Handloom · Heritage · Chennai</div>
          <div className="h-footer-credit">
            Homepage designed by{" "}
            <a href="https://kliviq.com" target="_blank" rel="noopener noreferrer">
              KlivIQ Technologies OPC
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
