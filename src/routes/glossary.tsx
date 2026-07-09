import { createFileRoute, Link } from "@tanstack/react-router";
import "../heritage-homepage/styles.css";
import logo from "../heritage-homepage/assets/logo.png";

const SITE_URL = "https://sriaishwaryasarees.com";
const CANONICAL = `${SITE_URL}/glossary`;
const BASE = SITE_URL;

type Term = { term: string; definition: string; group: string };

const terms: Term[] = [
  // Weaves & techniques
  { group: "Weaves & Techniques", term: "Kanjivaram (Kanchipuram silk)", definition: "The heirloom silk saree of Tamil Nadu, woven in Kanchipuram from pure mulberry silk and real gold-silver zari, with the body, border and pallu often woven separately and interlocked (see korvai)." },
  { group: "Weaves & Techniques", term: "Silk cotton", definition: "A saree with a pure mulberry silk warp and a mercerised cotton weft — softer and cooler than pure silk, but with the sheen and drape of silk. A signature Sri Aishwarya weave." },
  { group: "Weaves & Techniques", term: "Handloom", definition: "A saree woven on a pit-loom or frame-loom operated entirely by human hands and feet. Carries the government Handloom Mark and shows small, alive variations no machine can replicate." },
  { group: "Weaves & Techniques", term: "Powerloom", definition: "A saree woven on an electricity-driven mechanical loom — faster and cheaper, but stiffer, more uniform, and cannot carry the Handloom Mark." },
  { group: "Weaves & Techniques", term: "Korvai", definition: "The traditional Kanchipuram technique of weaving the border and body in different colours on separate shuttles and interlocking them at the selvedge. A true korvai border can be gently pulled away from the body without unravelling." },
  { group: "Weaves & Techniques", term: "Petni (Pitni)", definition: "The technique of joining a contrast pallu to the body of a Kanjivaram — you can often see a fine zigzag line where the two colours meet." },
  { group: "Weaves & Techniques", term: "Mubbagam", definition: "A three-shuttle Kanjivaram woven with three different colours — body, border and pallu each in a distinct shade. One of the most technically demanding weaves." },
  { group: "Weaves & Techniques", term: "Jacquard", definition: "A loom attachment that lets the weaver produce complex figured patterns automatically. Handloom jacquard is still hand-thrown; powerloom jacquard is mechanised." },
  { group: "Weaves & Techniques", term: "Dobby", definition: "A simpler loom attachment used for small geometric patterns — checks, stripes, small buttis." },
  { group: "Weaves & Techniques", term: "Tussar", definition: "A wild silk from the Antheraea moth — coarser, more textured, and naturally beige-gold. Prized for summer sarees." },
  { group: "Weaves & Techniques", term: "Semi-silk / polycotton", definition: "A saree that blends silk or cotton with polyester or viscose. Everyday-wearable and easy to care for, but not a pure-yarn saree." },

  // Yarn & zari
  { group: "Yarn & Zari", term: "Mulberry silk", definition: "The finest cultivated silk, spun by Bombyx mori silkworms fed on mulberry leaves. The standard silk used in a genuine Kanjivaram." },
  { group: "Yarn & Zari", term: "Pure zari", definition: "A silver thread electroplated with real gold, twisted around a silk or cotton core. Tarnishes slowly and beautifully, and is the only zari that qualifies a saree as an heirloom." },
  { group: "Yarn & Zari", term: "Half-fine zari", definition: "Copper with a thin gold-coloured coating. Cheaper, but darkens within a few years. Common in imitation Kanjivarams." },
  { group: "Yarn & Zari", term: "Tested zari", definition: "Zari certified by the Silk Mark Organisation of India — the mark you should look for on any premium Kanjivaram." },
  { group: "Yarn & Zari", term: "Denier", definition: "A unit for the fineness of a silk thread. Lower denier = finer yarn, softer drape." },
  { group: "Yarn & Zari", term: "Mercerised cotton", definition: "Cotton treated with caustic soda to give it strength, sheen and better dye uptake. The cotton weft in a fine silk cotton saree is almost always mercerised." },

  // Motifs
  { group: "Motifs & Patterns", term: "Rudraksham", definition: "A repeating bead-like motif inspired by the rudraksha seed, sacred to Lord Shiva. Common on traditional Kanjivaram borders." },
  { group: "Motifs & Patterns", term: "Mayilkann (peacock eye)", definition: "A small motif shaped like the eye of a peacock feather, worked into borders and buttis." },
  { group: "Motifs & Patterns", term: "Kuyilkann (koel eye)", definition: "A finer, more delicate version of mayilkann, often used in silk cotton sarees." },
  { group: "Motifs & Patterns", term: "Annam", definition: "The mythical swan motif — a symbol of grace and discernment, woven into pallus and borders." },
  { group: "Motifs & Patterns", term: "Yaali", definition: "A composite mythical creature (part lion, part elephant, part horse) carved on temple pillars and woven onto grand bridal Kanjivarams." },
  { group: "Motifs & Patterns", term: "Temple border", definition: "A saw-tooth border shaped like the gopuram of a South Indian temple — the most recognisable of all Kanjivaram borders." },
  { group: "Motifs & Patterns", term: "Butti / buta", definition: "A small repeating motif scattered across the body of the saree." },

  // Parts of a saree
  { group: "Parts of a Saree", term: "Pallu / mundhi", definition: "The decorated end of the saree that drapes over the shoulder — usually the most ornate section." },
  { group: "Parts of a Saree", term: "Mundani", definition: "The Tamil term for the pallu, especially in wedding contexts." },
  { group: "Parts of a Saree", term: "Body", definition: "The main length of the saree between the two borders — usually the most understated section, in a single field colour." },
  { group: "Parts of a Saree", term: "Border", definition: "The woven strip along both long edges of the saree. On a korvai Kanjivaram, the border is a different colour from the body." },
  { group: "Parts of a Saree", term: "Contrast pallu", definition: "A pallu in a contrasting colour to the body — a classic Kanjivaram signature." },

  // Regional & drape
  { group: "Regions & Drapes", term: "Kanchipuram", definition: "The temple town near Chennai that gives Kanjivaram silk its name — home to the community of weavers who have made these sarees for over 400 years." },
  { group: "Regions & Drapes", term: "Arni", definition: "A weaving town in Tamil Nadu known for lighter, everyday silk sarees at a friendlier price point." },
  { group: "Regions & Drapes", term: "Thirubuvanam", definition: "A weaving cluster near Kumbakonam known for finely woven pure silks and silk cottons." },
  { group: "Regions & Drapes", term: "Madisar (9-yard)", definition: "The traditional 9-yard drape of Tamil Brahmin women, worn for weddings, seemantham and religious rituals." },
  { group: "Regions & Drapes", term: "Koorai", definition: "The bridal saree gifted to the bride by the groom's family in a Tamil wedding — traditionally a nine-yard madisar in Kanchipuram silk." },
  { group: "Regions & Drapes", term: "Dhoti / veshti", definition: "The unstitched lower garment worn by South Indian men, often in matching handloom cotton or silk." },

  // Care
  { group: "Care & Storage", term: "First wash", definition: "The very first wash of a new silk saree. Always dry-clean — home washing can bleed dye and shrink the yarn." },
  { group: "Care & Storage", term: "Refolding", definition: "The practice of unfolding and refolding a stored saree every 3–4 months along a different crease, so the zari never wears through the same line." },
  { group: "Care & Storage", term: "Muslin wrap", definition: "A soft, breathable cotton cloth used to wrap folded silk sarees for storage. Never use plastic — it traps humidity and stains the zari." },
  { group: "Care & Storage", term: "Silk Mark", definition: "The government-issued label certifying that a saree is made of 100% natural silk. Look for it on the corner of any silk saree you buy." },
  { group: "Care & Storage", term: "Handloom Mark", definition: "The government-issued label certifying that a saree was woven on a handloom. The one mark powerloom sarees cannot legally carry." },
];

const definedTermSetLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Saree Glossary — Weaves, Zari, Motifs & Regions",
  url: CANONICAL,
  inLanguage: "en-IN",
  hasDefinedTerm: terms.map((t) => ({
    "@type": "DefinedTerm",
    name: t.term,
    description: t.definition,
    inDefinedTermSet: CANONICAL,
    termCode: t.term.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  })),
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Glossary", item: CANONICAL },
  ],
};

export const Route = createFileRoute("/glossary")({
  head: () => ({
    meta: [
      {
        title:
          "Saree Glossary — Kanjivaram, Zari, Motifs, Madisar & More | Sri Aishwarya Sarees",
      },
      {
        name: "description",
        content:
          "A working glossary of South Indian handloom saree terms — Kanjivaram, korvai, petni, pure zari, mayilkann, rudraksham, madisar, temple border and more, explained by weavers of three generations.",
      },
      {
        name: "keywords",
        content:
          "saree glossary, kanjivaram terms, korvai border, petni, pure zari, mayilkann, rudraksham motif, madisar meaning, handloom saree terminology, silk cotton terms",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "author", content: "KlivIQ Technologies OPC" },
      { name: "geo.region", content: "IN-TN" },
      { property: "og:title", content: "Saree Glossary | Sri Aishwarya Sarees" },
      {
        property: "og:description",
        content:
          "A working glossary of handloom saree terms — weaves, zari, motifs, regions and care — explained by a Chennai handloom house.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Sri Aishwarya Sarees" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:url", content: CANONICAL },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(definedTermSetLd) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbLd) },
    ],
  }),
  component: GlossaryPage,
});

function GlossaryPage() {
  const groups = Array.from(new Set(terms.map((t) => t.group)));
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
          <span className="eyebrow">A Working Glossary</span>
          <h1>The language of the loom.</h1>
          <p>
            Every craft has its own vocabulary. This is ours — a working glossary of the weaves,
            motifs, regions and care rituals that shape a South Indian handloom saree.
          </p>
          <nav className="h-temples-index" aria-label="Glossary sections">
            <span className="h-temples-index-label">Jump to:</span>
            <ul>
              {groups.map((g) => (
                <li key={g}>
                  <a href={`#${g.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{g}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <section className="h-section h-glossary">
        <div className="container">
          {groups.map((g) => {
            const id = g.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            return (
              <div key={g} className="h-glossary-group" id={id}>
                <h2 className="h-glossary-group-title">{g}</h2>
                <dl className="h-glossary-list">
                  {terms.filter((t) => t.group === g).map((t) => (
                    <div key={t.term} className="h-glossary-item">
                      <dt>{t.term}</dt>
                      <dd>{t.definition}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            );
          })}
        </div>
      </section>

      <section className="h-temples-cta">
        <div className="container">
          <p>Ready to see these weaves in person?</p>
          <a className="h-btn h-btn--gold" href={`${BASE}/shop`}>Explore the Collection</a>
          <Link to="/" className="h-temples-back">← Back to home</Link>
        </div>
      </section>

      <footer className="h-temples-footer">
        <div className="container">
          <div>© {new Date().getFullYear()} Sri Aishwarya Sarees · Temple of Silk Cottons</div>
          <div>Chennai · Three Generations of Handloom</div>
          <div className="h-temples-footer-links">
            <Link to="/">Home</Link> · <Link to="/temples">Temples</Link> · <Link to="/faq">FAQ</Link>
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
