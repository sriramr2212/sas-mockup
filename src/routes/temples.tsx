import { createFileRoute, Link } from "@tanstack/react-router";
import "../heritage-homepage/styles.css";
import templesData from "../heritage-homepage/temples.json";
import logo from "../heritage-homepage/assets/logo.png";
import templeMeenakshi from "../heritage-homepage/assets/temple-meenakshi.jpg";
import templeKamakshi from "../heritage-homepage/assets/temple-kamakshi.jpg";
import templeChennakeshava from "../heritage-homepage/assets/temple-chennakeshava.jpg";
import templeRanganathaswamy from "../heritage-homepage/assets/temple-ranganathaswamy.jpg";

const templeImages: Record<string, string> = {
  "temple-meenakshi.jpg": templeMeenakshi,
  "temple-kamakshi.jpg": templeKamakshi,
  "temple-chennakeshava.jpg": templeChennakeshava,
  "temple-ranganathaswamy.jpg": templeRanganathaswamy,
};

const BASE = "https://sriaishwaryasarees.com";

export const Route = createFileRoute("/temples")({
  head: () => ({
    meta: [
      { title: "Sacred Threads — Featured Temples · Sri Aishwarya Sarees" },
      {
        name: "description",
        content:
          "Each month we honour a temple that has inspired the weaves, motifs and colours of South Indian handloom. Read our growing archive of featured temples.",
      },
      { property: "og:title", content: "Sacred Threads — Featured Temples of the Month" },
      {
        property: "og:description",
        content: "A growing archive of temples that inspire our handloom craft — updated every month.",
      },
      { property: "og:image", content: templeMeenakshi },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: templeMeenakshi },
    ],
  }),
  component: TemplesPage,
});

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
          <span className="eyebrow">Temple of the Month · Archive</span>
          <h1>Sacred Threads</h1>
          <p>
            Every month, we honour a temple that has quietly shaped the weaves, motifs and colours of South
            Indian handloom. This is our growing archive — a place to pause, read, and remember where our
            craft comes from.
          </p>
        </div>
      </section>

      {featured && (
        <TempleEntry temple={featured} featured />
      )}

      {archive.length > 0 && (
        <div className="h-temples-archive-head container">
          <span className="eyebrow">Previously Featured</span>
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
          <img src={img} alt={`${temple.name}, ${temple.location}`} loading="lazy" />
        </a>
        <div className="h-temples-entry-text">
          <span className="eyebrow">{featured ? "This Month" : temple.month}</span>
          <h2>{temple.name}</h2>
          <div className="h-temples-entry-loc">{temple.location} · {temple.month}</div>
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
