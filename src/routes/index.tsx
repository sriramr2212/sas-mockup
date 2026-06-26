import { createFileRoute } from "@tanstack/react-router";
import heroPortrait from "@/assets/hero-portrait.jpg";
import founder from "@/assets/founder.jpg";
import collectionKanjivaram from "@/assets/collection-kanjivaram.jpg";
import collectionSilkCotton from "@/assets/collection-silkcotton.jpg";
import featuredSilkCotton from "@/assets/featured-silkcotton.jpg";
import featured10Yard from "@/assets/featured-10yard.jpg";
import videoShopping from "@/assets/video-shopping.jpg";
import ig1 from "@/assets/ig-1.jpg";
import ig2 from "@/assets/ig-2.jpg";
import ig3 from "@/assets/ig-3.jpg";
import ig4 from "@/assets/ig-4.jpg";
import ig5 from "@/assets/ig-5.jpg";
import ig6 from "@/assets/ig-6.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sri Aishwarya Sarees — Authentic Handloom, Woven by Family" },
      {
        name: "description",
        content:
          "A family-owned heritage handloom house. Authentic Kanjivaram silk, silk cotton, and 10-yard sarees woven by master weavers across South India.",
      },
      { property: "og:title", content: "Sri Aishwarya Sarees — Authentic Handloom" },
      {
        property: "og:description",
        content:
          "100% authentic handloom. Traditional craftsmanship. Premium silk cotton. A family legacy in every weave.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: heroPortrait },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroPortrait },
    ],
  }),
  component: HomePage,
});

const SHOP_URL = "/shop";
const collectionUrl = (slug: string) => `/product-category/${slug}`;
const VIDEO_SHOPPING_URL = "/book-video-shopping";

const collections = [
  { n: "01", name: "Kanjivaram Silks", slug: "kanjivaram-silks", img: collectionKanjivaram, prose: "Temple-town silk with gold zari, woven on traditional pit looms." },
  { n: "02", name: "Silk Cotton", slug: "silk-cotton", img: collectionSilkCotton, prose: "Our signature weave — the breath of cotton, the sheen of silk." },
  { n: "03", name: "Cotton Sarees", slug: "cotton-sarees" },
  { n: "04", name: "10 Yard Sarees", slug: "10-yard-sarees" },
  { n: "05", name: "Dance Sarees", slug: "dance-sarees" },
  { n: "06", name: "Fancy Sarees", slug: "fancy-sarees" },
  { n: "07", name: "Men's Collection", slug: "mens-collection" },
];

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <main>
        <Hero />
        <FoundersStory />
        <AuthenticHandloom />
        <ShopByCollections />
        <FeaturedSilkCotton />
        <Featured10Yard />
        <VideoShopping />
        <Testimonials />
        <InstagramGallery />
      </main>

      <SiteFooter />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */

function SiteNav() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12 md:py-6">
        <a href="/" className="font-serif text-base uppercase tracking-[0.32em] md:text-lg">
          Sri Aishwarya
        </a>
        <div className="hidden items-center gap-10 lg:flex">
          <a href={SHOP_URL} className="label-mono hover:text-accent">Shop</a>
          <a href={collectionUrl("kanjivaram-silks")} className="label-mono hover:text-accent">Kanjivaram</a>
          <a href={collectionUrl("silk-cotton")} className="label-mono hover:text-accent">Silk Cotton</a>
          <a href="/our-story" className="label-mono hover:text-accent">Story</a>
          <a href={VIDEO_SHOPPING_URL} className="label-mono hover:text-accent">Video Shopping</a>
        </div>
        <div className="flex items-center gap-5">
          <a href="/my-account" className="label-mono hidden md:inline">Account</a>
          <a href="/cart" className="label-mono">Cart (0)</a>
          <button aria-label="Open menu" className="label-mono lg:hidden">Menu</button>
        </div>
      </div>
    </nav>
  );
}

/* ────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="fade-up pt-28 md:pt-36">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex items-end justify-between border-b border-rule pb-4">
          <span className="label-mono text-muted-foreground">Vol. I — Heritage Edition</span>
          <span className="label-mono text-muted-foreground hidden md:inline">Est. 1978 · Kanchipuram</span>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl px-6 md:mt-16 md:grid md:grid-cols-12 md:gap-10 md:px-12">
        <div className="md:col-span-7">
          <img
            src={heroPortrait}
            alt="A woman draped in a heritage Kanjivaram silk saree against temple architecture"
            width={1088}
            height={1440}
            className="aspect-[3/4] w-full object-cover"
          />
        </div>

        <div className="mt-10 md:col-span-5 md:mt-0 md:flex md:flex-col md:justify-end md:pb-6">
          <span className="label-mono mb-6 block text-accent">The Quiet Authority of Craft</span>
          <h1 className="text-balance font-serif text-5xl leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
            Handwoven for those who recognise the <em className="font-serif italic">weight</em> of heritage.
          </h1>
          <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
            For four generations, our looms have kept time with the temple bells of Kanchipuram —
            preserving a craft you can feel in every fold.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={SHOP_URL}
              className="inline-flex items-center justify-center bg-ink px-8 py-4 text-sm tracking-wide text-background transition-colors hover:bg-accent"
            >
              Explore Collections
            </a>
            <a
              href={VIDEO_SHOPPING_URL}
              className="inline-flex items-center justify-center border border-ink/30 px-8 py-4 font-serif text-base italic transition-colors hover:border-accent hover:text-accent"
            >
              Book Video Shopping
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── */

function FoundersStory() {
  return (
    <section className="mt-32 md:mt-48">
      <div className="relative">
        <img
          src={founder}
          alt="Portrait of the founder of Sri Aishwarya Sarees beside a traditional handloom"
          width={1088}
          height={1600}
          loading="lazy"
          className="h-[90vh] w-full object-cover md:h-[100vh]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-6 pb-12 md:px-12 md:pb-20">
            <div className="md:grid md:grid-cols-12 md:gap-10">
              <div className="md:col-span-5">
                <span className="label-mono mb-6 block text-background/80">Chapter One — Our Lineage</span>
                <h2 className="font-serif text-4xl leading-tight text-background md:text-5xl">
                  <em className="italic">"We do not sell sarees.</em>
                  <br />
                  We pass on a rhythm — of loom, of family, of faith."
                </h2>
              </div>
              <div className="mt-8 md:col-span-5 md:col-start-8 md:mt-0 md:self-end">
                <p className="text-base leading-relaxed text-background/85">
                  Sri Aishwarya was begun in 1978 by Sri Krishnan Iyer, a third-generation weaver who
                  refused to let the power loom silence his family's craft. From a single pit loom in
                  Kanchipuram, the house grew — patient knot by patient knot — into a sanctuary for
                  collectors of authentic handloom.
                </p>
                <p className="mt-6 text-base leading-relaxed text-background/85">
                  Today his daughter and grandchildren tend the same looms, the same weavers,
                  the same uncompromising promise.
                </p>
                <a
                  href="/our-story"
                  className="label-mono mt-8 inline-block border-b border-background/50 pb-1 text-background hover:border-background"
                >
                  Read the full story →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── */

function AuthenticHandloom() {
  const pillars = [
    { n: "I", t: "What handloom means", b: "Each saree is woven on a wooden loom by a single weaver, over weeks — never by machine." },
    { n: "II", t: "Why authenticity matters", b: "A true handloom carries a quiet imperfection, a maker's signature, a weight you can feel." },
    { n: "III", t: "Direct from the weaver", b: "We source from a closed circle of master weavers we have known for three generations." },
    { n: "IV", t: "The Aishwarya promise", b: "Every saree carries a hand-stamped seal of provenance — and the name of its weaver." },
  ];

  return (
    <section className="mx-auto mt-32 max-w-7xl px-6 md:mt-48 md:px-12">
      <div className="flex items-end justify-between border-b border-rule pb-4">
        <span className="label-mono">Chapter Two — Authentic Handloom</span>
        <span className="label-mono text-muted-foreground">II / VIII</span>
      </div>

      <div className="mt-12 md:grid md:grid-cols-12 md:gap-10">
        <h2 className="font-serif text-4xl leading-[1.05] md:col-span-7 md:text-6xl">
          A saree is not stitched. It is <em className="italic">witnessed</em> — thread by thread, dawn after dawn.
        </h2>
        <p className="mt-8 text-base leading-relaxed text-muted-foreground md:col-span-4 md:col-start-9 md:mt-0 md:self-end">
          We hold to handloom not from nostalgia, but from conviction. The slowness is the point.
          The imperfection is the proof.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-px bg-rule md:grid-cols-2 md:mt-24 lg:grid-cols-4">
        {pillars.map((p) => (
          <div key={p.n} className="bg-background p-8 md:p-10">
            <span className="font-serif text-2xl italic text-accent">{p.n}</span>
            <h3 className="mt-6 font-serif text-2xl leading-snug">{p.t}</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.b}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── */

function ShopByCollections() {
  const [c1, c2, ...rest] = collections;
  return (
    <section className="mx-auto mt-32 max-w-7xl px-6 md:mt-48 md:px-12">
      <div className="flex items-end justify-between border-b border-rule pb-4">
        <span className="label-mono">Chapter Three — The Archive</span>
        <span className="label-mono text-muted-foreground">07 Collections</span>
      </div>

      <h2 className="mt-12 max-w-3xl font-serif text-4xl leading-[1.05] md:text-6xl">
        Seven houses, one lineage. <em className="italic">Choose your weave.</em>
      </h2>

      <div className="mt-16 grid grid-cols-1 gap-12 md:mt-24 md:grid-cols-2 md:gap-16">
        {[c1, c2].map((c) => (
          <a
            key={c.slug}
            href={collectionUrl(c.slug)}
            className="hover-zoom group block"
          >
            <div className="overflow-hidden">
              <img
                src={c.img}
                alt={c.name}
                width={1008}
                height={756}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="mt-5 flex items-baseline justify-between border-t border-rule pt-4">
              <div>
                <span className="label-mono text-muted-foreground">{c.n}</span>
                <h3 className="mt-1 font-serif text-2xl italic">{c.name}</h3>
              </div>
              <span className="label-mono group-hover:text-accent">View →</span>
            </div>
            {c.prose && (
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{c.prose}</p>
            )}
          </a>
        ))}
      </div>

      <ul className="mt-16 border-t border-rule">
        {rest.map((c) => (
          <li key={c.slug}>
            <a
              href={collectionUrl(c.slug)}
              className="group flex items-baseline justify-between border-b border-rule py-7 transition-colors hover:bg-paper md:py-9"
            >
              <div className="flex items-baseline gap-6 md:gap-12">
                <span className="label-mono text-muted-foreground">{c.n}</span>
                <span className="font-serif text-2xl italic md:text-4xl group-hover:text-accent">
                  {c.name}
                </span>
              </div>
              <span className="label-mono group-hover:text-accent">View →</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── */

function FeaturedSilkCotton() {
  return (
    <section className="mt-32 bg-paper py-24 md:mt-48 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="md:grid md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <img
              src={featuredSilkCotton}
              alt="A folded silk cotton saree with gold temple border beside a brass oil lamp"
              width={1200}
              height={1500}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="mt-10 md:col-span-4 md:col-start-9 md:mt-0 md:flex md:flex-col md:justify-center">
            <span className="label-mono mb-6 block text-accent">The Signature Weave</span>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">
              Silk Cotton — <em className="italic">our quiet masterpiece.</em>
            </h2>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Light enough to wear at noon, refined enough for an evening prayer. Silk Cotton is
              the saree we are best known for — woven on a finer reed than is common, with a
              cotton warp and a silk weft that catches light like still water.
            </p>
            <a
              href={collectionUrl("silk-cotton")}
              className="label-mono mt-10 inline-block self-start border-b border-ink pb-1 hover:border-accent hover:text-accent"
            >
              Explore Silk Cotton →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Featured10Yard() {
  return (
    <section className="mt-32 md:mt-48">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="md:grid md:grid-cols-12 md:gap-12">
          <div className="order-2 mt-10 md:order-1 md:col-span-4 md:mt-0 md:flex md:flex-col md:justify-center">
            <span className="label-mono mb-6 block text-accent">The Ten-Yard Tradition</span>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">
              For the rituals our grandmothers <em className="italic">remember by heart.</em>
            </h2>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              The Madisar drape — nine, sometimes ten yards of pure silk — is reserved for
              weddings, prayer, and the deepest occasions of family life. Each is woven to
              hold its pleats with grace through the longest day.
            </p>
            <a
              href={collectionUrl("10-yard-sarees")}
              className="label-mono mt-10 inline-block self-start border-b border-ink pb-1 hover:border-accent hover:text-accent"
            >
              Explore 10 Yard Sarees →
            </a>
          </div>
          <div className="order-1 md:order-2 md:col-span-7 md:col-start-6">
            <img
              src={featured10Yard}
              alt="A bride in a traditional ten-yard Madisar silk saree in a temple courtyard"
              width={1200}
              height={1500}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── */

function VideoShopping() {
  return (
    <section className="mt-32 bg-ink py-24 text-background md:mt-48 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="md:grid md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5 md:flex md:flex-col md:justify-center">
            <span className="label-mono mb-6 block text-background/60">By Appointment</span>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">
              The boutique, brought to your <em className="italic">drawing room.</em>
            </h2>
            <p className="mt-8 text-base leading-relaxed text-background/75">
              A private video consultation with one of our family members. We unfold sarees for you,
              answer every question about provenance and weave, and help you choose with the
              quiet attention of a true atelier.
            </p>
            <a
              href={VIDEO_SHOPPING_URL}
              className="mt-10 inline-flex items-center justify-center self-start border border-background/40 px-8 py-4 font-serif text-base italic transition-colors hover:bg-background hover:text-ink"
            >
              Book your appointment
            </a>
          </div>
          <div className="mt-12 md:col-span-6 md:col-start-7 md:mt-0">
            <img
              src={videoShopping}
              alt="A customer on a video shopping call with a Sri Aishwarya saree consultant"
              width={1408}
              height={912}
              loading="lazy"
              className="aspect-[7/5] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── */

function Testimonials() {
  const quotes = [
    {
      q: "The drape is like a second skin. You can feel the weight of heritage in every fold.",
      a: "Dr. Ananya V.",
      p: "Chennai · Collector since 2011",
    },
    {
      q: "I have bought my daughter her first Kanjivaram from the same house that wove mine. That is what this brand means to my family.",
      a: "Lakshmi R.",
      p: "Coimbatore",
    },
    {
      q: "It is the only place I trust for an authentic Madisar. The provenance card alone is a small heirloom.",
      a: "Dr. Padma K.",
      p: "Bengaluru",
    },
  ];

  return (
    <section className="mx-auto mt-32 max-w-7xl px-6 md:mt-48 md:px-12">
      <div className="flex items-end justify-between border-b border-rule pb-4">
        <span className="label-mono">Chapter Six — In Their Words</span>
        <span className="label-mono text-muted-foreground">Voices of the House</span>
      </div>

      <div className="mt-20 space-y-24 md:mt-32 md:space-y-40">
        {quotes.map((t, i) => (
          <figure
            key={i}
            className={`max-w-3xl ${i % 2 === 1 ? "ml-auto text-right" : ""}`}
          >
            <blockquote className="font-serif text-3xl italic leading-[1.25] md:text-5xl md:leading-[1.15]">
              “{t.q}”
            </blockquote>
            <figcaption className="mt-8">
              <span className="label-mono block">— {t.a}</span>
              <span className="mt-1 block font-serif text-sm italic text-muted-foreground">
                {t.p}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── */

function InstagramGallery() {
  const tiles = [
    { src: ig1, alt: "Hands of a weaver at a traditional handloom" },
    { src: ig2, alt: "A stack of folded silk sarees in jewel tones" },
    { src: ig3, alt: "Detail of a green silk saree with gold zari motifs" },
    { src: ig4, alt: "Brass lamp and jasmine flowers on a temple floor" },
    { src: ig5, alt: "Interior of the Sri Aishwarya heritage boutique" },
    { src: ig6, alt: "A woman draping a blue silk saree by a window" },
  ];

  return (
    <section className="mx-auto mt-32 max-w-7xl px-6 md:mt-48 md:px-12">
      <div className="flex items-end justify-between border-b border-rule pb-4">
        <span className="label-mono">Chapter Seven — In Situ</span>
        <a
          href="https://instagram.com/sriaishwaryasarees"
          target="_blank"
          rel="noreferrer"
          className="label-mono hover:text-accent"
        >
          @sriaishwaryasarees →
        </a>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-2 md:mt-16 md:grid-cols-3 md:gap-4">
        {tiles.map((t, i) => (
          <a
            key={i}
            href="https://instagram.com/sriaishwaryasarees"
            target="_blank"
            rel="noreferrer"
            className="hover-zoom block overflow-hidden"
          >
            <img
              src={t.src}
              alt={t.alt}
              width={700}
              height={700}
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
          </a>
        ))}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── */

function SiteFooter() {
  return (
    <footer className="mt-32 bg-ink text-background md:mt-48">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <div className="md:grid md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <div className="font-serif text-3xl uppercase tracking-[0.28em]">Sri Aishwarya</div>
            <p className="mt-8 max-w-sm font-serif text-xl italic leading-snug text-background/85">
              Handwoven in India, since 1978. A family promise, kept on the loom.
            </p>
            <a
              href={VIDEO_SHOPPING_URL}
              className="label-mono mt-10 inline-block border-b border-background/40 pb-1 hover:border-background"
            >
              Book Video Shopping →
            </a>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-y-10 md:col-span-7 md:col-start-6 md:mt-0 md:grid-cols-3">
            <FooterCol
              title="Shop"
              links={[
                ["Kanjivaram Silks", collectionUrl("kanjivaram-silks")],
                ["Silk Cotton", collectionUrl("silk-cotton")],
                ["Cotton Sarees", collectionUrl("cotton-sarees")],
                ["10 Yard Sarees", collectionUrl("10-yard-sarees")],
                ["Dance Sarees", collectionUrl("dance-sarees")],
                ["Men's Collection", collectionUrl("mens-collection")],
              ]}
            />
            <FooterCol
              title="House"
              links={[
                ["Our Story", "/our-story"],
                ["The Weavers", "/the-weavers"],
                ["Authenticity", "/authenticity"],
                ["Journal", "/journal"],
              ]}
            />
            <FooterCol
              title="Service"
              links={[
                ["My Account", "/my-account"],
                ["Cart", "/cart"],
                ["Shipping & Returns", "/shipping-returns"],
                ["Contact", "/contact"],
              ]}
            />
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-background/15 pt-8 md:flex-row md:items-center">
          <span className="label-mono text-background/50">
            © {new Date().getFullYear()} Sri Aishwarya Sarees · All rights reserved
          </span>
          <span className="label-mono text-background/50">100% Authentic Handloom · Made in India</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <span className="label-mono text-background/55">{title}</span>
      <ul className="mt-6 space-y-3">
        {links.map(([label, href]) => (
          <li key={href}>
            <a href={href} className="font-serif text-lg italic text-background/90 hover:text-background">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
