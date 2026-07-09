import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import "../heritage-homepage/styles.css";
import logo from "../heritage-homepage/assets/logo.png";

const SITE_URL = "https://sriaishwaryasarees.com";
const CANONICAL = `${SITE_URL}/faq`;
const BASE = SITE_URL;

type Faq = { q: string; a: string; group: string };

const faqs: Faq[] = [
  {
    group: "Care & Longevity",
    q: "How do I care for a silk cotton saree so it lasts longer?",
    a: "Always dry-clean the first wash. From the second wash onwards, gentle hand-wash in cool water with shikakai or a mild soap-nut solution — never harsh detergent. Dry in the shade, iron on the reverse at a low silk setting, and refold along a different crease every 3–4 months so the zari never weakens along the same line.",
  },
  {
    group: "Care & Longevity",
    q: "How should I store my silk saree between wears?",
    a: "Wrap the folded saree in a soft cotton or muslin cloth — never plastic or polythene, which trap moisture. Store flat, away from direct sunlight, with a small muslin sachet of dried neem leaves or cloves to keep insects away. Refold every 3–4 months.",
  },
  {
    group: "Care & Longevity",
    q: "Can I iron a Kanjivaram silk saree directly?",
    a: "Always iron on the reverse, on the lowest silk setting, with a thin cotton cloth between the iron and the saree. Never spray water directly onto pure zari — steam softens the gold thread and can leave water marks on the silk.",
  },
  {
    group: "Care & Longevity",
    q: "My saree has a small stain. What should I do?",
    a: "Blot — do not rub. Take it to a trusted saree dry-cleaner as soon as possible; home remedies can permanently damage pure silk and zari. If you bought the saree from us, bring it to either boutique and we will recommend the specialist we use ourselves.",
  },
  {
    group: "Handloom vs Powerloom",
    q: "Handloom vs powerloom — how do I tell the difference?",
    a: "Handloom sarees carry small human tells: slight variation in weft density, an uneven-but-alive selvedge, and a soft body that breathes on the shoulder. Powerloom sarees are mechanically perfect, feel stiffer, and the reverse of the pallu looks almost identical to the front. A true handloom saree also carries the government Handloom Mark.",
  },
  {
    group: "Handloom vs Powerloom",
    q: "Why does handloom cost more than powerloom?",
    a: "A single Kanjivaram silk saree can take a skilled weaver 10 to 45 days on the pit-loom, depending on the design. Powerloom versions of the same design can be produced in a few hours. What you pay for is time, skill, and a livelihood that keeps the craft alive for the next generation.",
  },
  {
    group: "Quality & Authenticity",
    q: "Why is Sri Aishwarya's silk cotton priced differently from cheaper alternatives?",
    a: "Cheaper silk cotton sarees usually mix polyester or viscose into the weft and use half-fine (imitation) zari. Ours are woven with pure mulberry silk warp, mercerised cotton weft, and tested pure zari — the same specification our weavers have used for three generations. The price reflects real yarn, real zari, and a fair wage to the weaver.",
  },
  {
    group: "Quality & Authenticity",
    q: "How do I verify pure zari and yarn authenticity?",
    a: "Every pure-zari saree we sell carries a Silk Mark and, where applicable, a Handloom Mark. You can also do the burn-test on a stray thread: pure silk smells like burning hair and leaves a soft ash; polyester melts into a hard bead. In store, we're happy to walk you through both tests before you buy.",
  },
  {
    group: "Quality & Authenticity",
    q: "What is the difference between pure zari and half-fine zari?",
    a: "Pure zari is a silver thread electroplated with real gold, twisted around a silk core — it tarnishes slowly and beautifully. Half-fine zari uses copper with a thin coating and darkens within a few years. A pure-zari saree costs more up front but is genuinely an heirloom.",
  },
  {
    group: "Choosing a Saree",
    q: "I'm buying my first Kanjivaram. Where should I start?",
    a: "Start with a classic — a mid-weight (500–600 gram) traditional colour like maroon, mustard, peacock or bottle-green with a temple or rudraksham border. Come to either boutique and one of the family will personally walk you through the difference between weaves and drape a few on you. There is no obligation to buy.",
  },
  {
    group: "Choosing a Saree",
    q: "What is a madisar (9-yard) saree and who wears it?",
    a: "The madisar is the traditional 9-yard drape worn by Iyer and Iyengar Tamil Brahmin women, especially for weddings, seemantham and religious rituals. We stock authentic 9-yard silks and silk cottons and can help you choose colours and borders that suit both the ceremony and the wearer.",
  },
  {
    group: "Ordering & Shipping",
    q: "Do you ship internationally?",
    a: "Yes. We ship to the US, UK, Canada, Australia, Singapore, the UAE and most of Europe. Shipping is complimentary within India; international rates and delivery times are shown at checkout.",
  },
  {
    group: "Ordering & Shipping",
    q: "Can I book a video-shopping session before I buy?",
    a: "Absolutely. Book a video-call appointment through the website and one of the family will bring the sarees you're interested in to camera, drape them, and answer every question — the same way we would in the shop.",
  },
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "FAQ", item: CANONICAL },
  ],
};

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Saree FAQ — Care, Handloom, Zari & Buying Guide | Sri Aishwarya Sarees" },
      {
        name: "description",
        content:
          "Answers to the questions we hear most often: how to care for silk cotton sarees, handloom vs powerloom, spotting pure zari, choosing your first Kanjivaram, shipping and more.",
      },
      {
        name: "keywords",
        content:
          "silk saree care, handloom vs powerloom, pure zari test, kanjivaram buying guide, madisar saree, silk cotton saree care, saree faq",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "author", content: "KlivIQ Technologies OPC" },
      { name: "geo.region", content: "IN-TN" },
      { name: "geo.placename", content: "Chennai, Tamil Nadu, India" },
      { property: "og:title", content: "Saree FAQ | Sri Aishwarya Sarees" },
      {
        property: "og:description",
        content:
          "Care, craft, zari, madisar, shipping — the questions we hear most often across the shop counter.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Sri Aishwarya Sarees" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:url", content: CANONICAL },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(faqLd) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbLd) },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const [open, setOpen] = useState<string | null>(faqs[0]?.q ?? null);
  const groups = Array.from(new Set(faqs.map((f) => f.group)));

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
          <span className="eyebrow">Frequently Asked</span>
          <h1>Care, craft &amp; what makes a saree honest.</h1>
          <p>
            A working guide to the questions we hear most often across the shop counter — from
            washing silk cottons to spotting pure zari and choosing your first Kanjivaram.
          </p>
        </div>
      </section>

      <section className="h-section h-faq h-faq--page">
        <div className="container">
          {groups.map((g) => (
            <div key={g} className="h-faq-group">
              <h2 className="h-faq-group-title">{g}</h2>
              <div className="h-faq-list">
                {faqs.filter((f) => f.group === g).map((f) => {
                  const isOpen = open === f.q;
                  return (
                    <div key={f.q} className={`h-faq-item${isOpen ? " is-open" : ""}`}>
                      <button
                        type="button"
                        className="h-faq-q"
                        aria-expanded={isOpen}
                        onClick={() => setOpen(isOpen ? null : f.q)}
                      >
                        <span>{f.q}</span>
                        <span className="h-faq-plus" aria-hidden="true">{isOpen ? "–" : "+"}</span>
                      </button>
                      {isOpen && <div className="h-faq-a"><p>{f.a}</p></div>}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="h-temples-cta">
        <div className="container">
          <p>Still have a question? We'd love to hear from you.</p>
          <a className="h-btn h-btn--gold" href={`${BASE}/contact`}>Contact Us</a>
          <Link to="/" className="h-temples-back">← Back to home</Link>
        </div>
      </section>

      <footer className="h-temples-footer">
        <div className="container">
          <div>© {new Date().getFullYear()} Sri Aishwarya Sarees · Temple of Silk Cottons</div>
          <div>Chennai · Three Generations of Handloom</div>
          <div className="h-temples-footer-links">
            <Link to="/">Home</Link> · <Link to="/temples">Temples</Link> · <Link to="/glossary">Glossary</Link>
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
