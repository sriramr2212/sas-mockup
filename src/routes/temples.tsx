import { createFileRoute, Link } from "@tanstack/react-router";
import "../heritage-homepage/styles.css";
import templesData from "../heritage-homepage/temples.json";
import logo from "../heritage-homepage/assets/logo.png";
import templeMeenakshi from "../heritage-homepage/assets/temple-meenakshi.jpg";
import templeKanchiPeriyavaAsset from "../heritage-homepage/assets/temple-kanchi-periyava.jpg.asset.json";
const templeKanchiPeriyava = templeKanchiPeriyavaAsset.url;
import templeChennakeshava from "../heritage-homepage/assets/temple-chennakeshava.jpg";
import templeRanganathaswamy from "../heritage-homepage/assets/temple-ranganathaswamy.jpg";

const templeImages: Record<string, string> = {
  "temple-meenakshi.jpg": templeMeenakshi,
  "temple-kanchi-periyava.jpg": templeKanchiPeriyava,
  "temple-chennakeshava.jpg": templeChennakeshava,
  "temple-ranganathaswamy.jpg": templeRanganathaswamy,
};

const BASE = "https://sriaishwaryasarees.com";

type Temple = {
  slug: string;
  name: string;
  location: string;
  month: string;
  image: string;
  url: string;
  description: string;
  story: string[];
};

const SITE_URL = "https://sriaishwaryasarees.com";
const CANONICAL = `${SITE_URL}/temples`;

const templeGeo: Record<string, { lat: number; lng: number; region: string; city: string }> = {
  "meenakshi-amman": { lat: 9.9195, lng: 78.1194, region: "Tamil Nadu", city: "Madurai" },
  "kanchi-periyava": { lat: 12.8422, lng: 79.7036, region: "Tamil Nadu", city: "Kanchipuram" },
  "chennakeshava-belur": { lat: 13.1628, lng: 75.8648, region: "Karnataka", city: "Belur" },
  "ranganathaswamy-srirangam": { lat: 10.8624, lng: 78.6889, region: "Tamil Nadu", city: "Srirangam" },
};

export const Route = createFileRoute("/temples")({
  head: () => {
    const temples = (templesData as Temple[]);
    const templeSchema = temples.map((t) => {
      const g = templeGeo[t.slug];
      return {
        "@type": "HinduTemple",
        name: t.name,
        url: t.url,
        image: `${SITE_URL}/temple-images/${t.image}`,
        description: t.description,
        address: {
          "@type": "PostalAddress",
          addressLocality: g?.city ?? t.location.split(",")[0].trim(),
          addressRegion: g?.region ?? t.location.split(",")[1]?.trim(),
          addressCountry: "IN",
        },
        ...(g ? { geo: { "@type": "GeoCoordinates", latitude: g.lat, longitude: g.lng } } : {}),
      };
    });

    const collectionLd = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Sacred Threads — Famous South Indian Temples",
      description:
        "A curated archive of sacred South Indian temples and spiritual figures — Meenakshi Amman (Madurai), Sri Kanchi Periyava, Sri Ranganathaswamy (Srirangam) and Chennakeshava (Belur) — that have shaped the motifs and colours of handloom Kanjivaram silk.",
      url: CANONICAL,
      inLanguage: "en-IN",
      isPartOf: { "@type": "WebSite", name: "Sri Aishwarya Sarees", url: SITE_URL },
      about: templeSchema,
      mainEntity: { "@type": "ItemList", itemListElement: templeSchema.map((t, i) => ({ "@type": "ListItem", position: i + 1, item: t })) },
    };

    const breadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Sacred Threads — Temples", item: CANONICAL },
      ],
    };

    return {
      meta: [
        {
          title:
            "Famous South Indian Temples — Meenakshi, Kanchi Periyava, Ranganathaswamy, Chennakeshava | Sri Aishwarya Sarees",
        },
        {
          name: "description",
          content:
            "A curated guide to sacred South Indian temples and spiritual figures — Meenakshi Amman Madurai, Sri Kanchi Periyava, Sri Ranganathaswamy Srirangam and Chennakeshava Belur — and the handloom motifs they inspired.",
        },
        {
          name: "keywords",
          content:
            "famous south indian temples, meenakshi amman temple madurai, kanchi periyava, mahaperiyava, sri ranganathaswamy temple srirangam, chennakeshava temple belur, tamil nadu temples, karnataka temples, temple gopurams, kanjivaram silk, handloom sarees",
        },
        { name: "robots", content: "index, follow, max-image-preview:large" },
        { name: "author", content: "KlivIQ Technologies OPC" },
        { name: "geo.region", content: "IN-TN" },
        { name: "geo.placename", content: "Chennai, Tamil Nadu, India" },
        { name: "geo.position", content: "13.0827;80.2707" },
        { name: "ICBM", content: "13.0827, 80.2707" },
        {
          property: "og:title",
          content: "Famous South Indian Temples — Sacred Threads | Sri Aishwarya Sarees",
        },
        {
          property: "og:description",
          content:
            "Meenakshi Amman, Sri Kanchi Periyava, Sri Ranganathaswamy and Chennakeshava — an archive of sacred South Indian temples and spiritual figures and the handloom motifs they inspired.",
        },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Sri Aishwarya Sarees" },
        { property: "og:locale", content: "en_IN" },
        { property: "og:url", content: CANONICAL },
        { property: "og:image", content: templeMeenakshi },
        { property: "og:image:alt", content: "Aerial view of the Meenakshi Amman Temple gopurams, Madurai" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Famous South Indian Temples — Sacred Threads" },
        {
          name: "twitter:description",
          content:
            "Meenakshi, Kanchi Periyava, Ranganathaswamy, Chennakeshava — sacred South Indian temples and spiritual figures and the handloom motifs they inspired.",
        },
        { name: "twitter:image", content: templeMeenakshi },
      ],
      links: [{ rel: "canonical", href: CANONICAL }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(collectionLd) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumbLd) },
      ],
    };
  },
  component: TemplesPage,
});



function TemplesPage() {
  const temples = templesData as Temple[];
  const [featured, ...archive] = temples;

  return (
    <div className="heritage-root">
      <header className="h-temples-header">
        <div className="container h-temples-header-inner">
          <Link to="/" className="h-logo" aria-label="Sri Aishwarya Sarees — Home">
            <img src={logo} alt="Sri Aishwarya Sarees" />
          </Link>
          <nav className="h-temples-nav" aria-label="Primary">
            <Link to="/">Home</Link>
            <a href={`${BASE}/shop`}>Shop</a>
            <a href={`${BASE}/contact`}>Contact</a>
          </nav>
        </div>
      </header>

      <section className="h-temples-hero">
        <div className="container">
          <span className="eyebrow">Sacred Threads · Featured Temples</span>
          <h1>Temples That Inspire Us</h1>
          <p>
            A living archive of the South Indian temples whose gopurams, colours and motifs quietly shape our
            handloom weaves. We add to this page from time to time — a place to pause, read, and remember
            where our craft comes from.
          </p>
          <nav className="h-temples-index" aria-label="Featured temples index">
            <span className="h-temples-index-label">Jump to:</span>
            <ul>
              {temples.map((t) => (
                <li key={t.slug}>
                  <a href={`#${t.slug}`}>
                    {t.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>


      {featured && (
        <TempleEntry temple={featured} featured />
      )}

      {archive.length > 0 && (
        <div className="h-temples-archive-head container">
          <span className="eyebrow">More Temples</span>
          <h2>From the Archive</h2>
        </div>
      )}
      {archive.map((t, i) => (
        <TempleEntry key={t.slug} temple={t} reverse={i % 2 === 1} />
      ))}

      <section className="h-temples-cta">
        <div className="container">
          <p>Discover our handloom sarees inspired by these sacred spaces.</p>
          <a className="h-btn h-btn--gold" href={`${BASE}/shop`}>Explore the Collection</a>
          <Link to="/" className="h-temples-back">← Back to home</Link>
        </div>
      </section>

      <footer className="h-temples-footer">
        <div className="container">
          <div>© {new Date().getFullYear()} Sri Aishwarya Sarees · Temple of Silk Cottons</div>
          <div>Chennai · Three Generations of Handloom</div>
          <div className="h-temples-footer-links">
            <Link to="/">Home</Link> · <Link to="/faq">FAQ</Link> · <Link to="/glossary">Glossary</Link>
          </div>
          <div>
            Page designed by{" "}
            <a href="https://kliviq.com" target="_blank" rel="noopener noreferrer">
              KlivIQ Technologies OPC
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function TempleEntry({
  temple,
  featured = false,
  reverse = false,
}: {
  temple: Temple;
  featured?: boolean;
  reverse?: boolean;
}) {
  const img = templeImages[temple.image] ?? templeMeenakshi;
  return (
    <article
      id={temple.slug}
      className={`h-temples-entry ${featured ? "is-featured" : ""} ${reverse ? "is-reverse" : ""}`}
    >
      <div className="container h-temples-entry-grid">
        <a
          className="h-temples-entry-media"
          href={temple.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`${temple.name} — visit temple site`}
        >
          <img src={img} alt={`${temple.name} gopuram, ${temple.location} — South Indian temple architecture`} loading="lazy" />
        </a>
        <div className="h-temples-entry-text">
          <span className="eyebrow">Sacred Threads</span>
          <h2>{temple.name}</h2>
          <div className="h-temples-entry-loc">{temple.location}</div>
          <p className="h-temples-entry-lede">{temple.description}</p>
          {temple.story.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
          <a
            className="h-btn h-btn--ghost-dark"
            href={temple.url}
            target="_blank"
            rel="noreferrer"
          >
            Visit Temple Site →
          </a>
        </div>
      </div>
    </article>
  );
}
