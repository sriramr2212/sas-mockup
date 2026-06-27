import { createFileRoute } from "@tanstack/react-router";
import "../heritage-homepage/styles.css";
import logo from "../heritage-homepage/assets/logo.png";
import hero from "../heritage-homepage/assets/hero.jpg";
import founder from "../heritage-homepage/assets/founder.jpg";
import authentic from "../heritage-homepage/assets/authentic.jpg";
import colKanji from "../heritage-homepage/assets/col-kanjivaram.jpg";
import colSilkCotton from "../heritage-homepage/assets/col-silkcotton.jpg";
import col10Yard from "../heritage-homepage/assets/col-10yard.jpg";
import colCotton from "../heritage-homepage/assets/col-cotton.jpg";
import colBridal from "../heritage-homepage/assets/col-bridal.jpg";
import colTussar from "../heritage-homepage/assets/col-tussar.jpg";
import colPattu from "../heritage-homepage/assets/col-pattu.jpg";
import featSilkCotton from "../heritage-homepage/assets/feat-silkcotton.jpg";
import feat10Yard from "../heritage-homepage/assets/feat-10yard.jpg";
import video from "../heritage-homepage/assets/video.jpg";
import ig1 from "../heritage-homepage/assets/ig1.jpg";
import ig2 from "../heritage-homepage/assets/ig2.jpg";
import ig3 from "../heritage-homepage/assets/ig3.jpg";
import ig4 from "../heritage-homepage/assets/ig4.jpg";
import ig5 from "../heritage-homepage/assets/ig5.jpg";
import ig6 from "../heritage-homepage/assets/ig6.jpg";

export const Route = createFileRoute("/heritage")({
  head: () => ({
    meta: [
      { title: "Sri Aishwarya Sarees — Temple of Silk Cottons | Heritage Handloom from Chennai" },
      {
        name: "description",
        content:
          "A family-owned heritage handloom house from Chennai. Authentic Kanjivaram silk, silk cotton, 10-yard madisar and pure handloom sarees — woven by master weavers, trusted for over 50 years.",
      },
      { property: "og:title", content: "Sri Aishwarya Sarees — Heritage Handloom from Chennai" },
      { property: "og:description", content: "Authentic South Indian handloom sarees. 50 years of trust." },
      { property: "og:image", content: hero },
    ],
  }),
  component: HeritageHome,
});

const collections = [
  { num: "01", name: "Kanjivaram Silk", href: "/product-category/kanjivaram", img: colKanji },
  { num: "02", name: "Silk Cotton", href: "/product-category/silk-cotton", img: colSilkCotton },
  { num: "03", name: "10 Yard Madisar", href: "/product-category/10-yard-sarees", img: col10Yard },
  { num: "04", name: "Pure Cotton", href: "/product-category/cotton", img: colCotton },
  { num: "05", name: "Bridal Collection", href: "/product-category/bridal", img: colBridal },
  { num: "06", name: "Tussar & Soft Silk", href: "/product-category/tussar", img: colTussar },
];

function Paisley() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M12 2c4 3 6 6 6 10s-3 8-6 10c-3-2-6-6-6-10s2-7 6-10Zm0 4c-2 2-3 4-3 6s1 4 3 6c2-2 3-4 3-6s-1-4-3-6Z"
        fill="currentColor"
      />
    </svg>
  );
}

function HeritageHome() {
  return (
    <div className="heritage-root">
      {/* Top announcement */}
      <div className="h-topbar">
        Complimentary Shipping Across India · Personalised Saree Consultation Available
      </div>

      {/* Header */}
      <header className="h-header">
        <div className="h-header-inner">
          <nav className="h-nav">
            <a href="/shop">Shop</a>
            <a href="/product-category/kanjivaram">Kanjivaram</a>
            <a href="/product-category/silk-cotton">Silk Cotton</a>
            <a href="/product-category/10-yard-sarees">10 Yard</a>
          </nav>
          <a href="/" className="h-logo" aria-label="Sri Aishwarya Sarees">
            <img src={logo} alt="Sri Aishwarya Sarees — Temple of Silk Cottons" />
          </a>
          <div className="h-actions">
            <a href="/?s=" aria-label="Search">Search</a>
            <a href="/my-account">Account</a>
            <a href="/cart">Cart</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="h-hero">
        <div className="h-hero-grid">
          <div className="h-hero-text">
            <span className="eyebrow">Est. Chennai · Since 1972</span>
            <h1>
              Woven in <em>devotion.</em><br />Worn through generations.
            </h1>
            <p>
              For over fifty years, our family has carried the looms of South India into the homes of those
              who cherish authentic handloom. Every saree here is chosen by hand, blessed by tradition, and
              meant to be passed on.
            </p>
            <div className="h-hero-cta">
              <a className="h-btn" href="/shop">Explore the Collection</a>
              <a className="h-btn h-btn--ghost" href="#story">Our Story</a>
            </div>
          </div>
          <div className="h-hero-img">
            <img src={hero} alt="South Indian woman in a maroon Kanjivaram saree" />
            <div className="h-hero-meta">A Heritage Maroon Kanjivaram · Hand-Woven in Kanchipuram</div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div className="h-strip">
        <div className="h-strip-inner">
          <span>50+ Years of Heritage</span>
          <span className="sep">·</span>
          <span>Pure Handloom</span>
          <span className="sep">·</span>
          <span>Direct from Weavers</span>
          <span className="sep">·</span>
          <span>Trusted by Three Generations</span>
        </div>
      </div>

      {/* Founder */}
      <section className="h-founder" id="story">
        <div className="container">
          <div className="h-founder-grid">
            <div className="h-founder-img">
              <img src={founder} alt="Founder of Sri Aishwarya Sarees" />
            </div>
            <div>
              <span className="eyebrow">A Family Story</span>
              <h2>From my father's loom to your wardrobe.</h2>
              <p>
                My father began this journey in 1972, walking from village to village across Tamil Nadu,
                Andhra and Karnataka — sitting with weavers, choosing yarn, learning the rhythm of every
                loom. He believed a saree was not a garment, but a memory in the making.
              </p>
              <p>
                Today, we continue what he started. The same families weave for us. The same care goes
                into every fold. Nothing here is mass-made. Nothing is rushed. Every saree carries a
                quiet promise — of authenticity, of patience, and of the hands that made it.
              </p>
              <div className="signature">
                — The Sri Aishwarya Family
                <small>Chennai · Three Generations of Handloom</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authentic Handloom */}
      <section className="h-authentic">
        <div className="h-authentic-bg" style={{ backgroundImage: `url(${authentic})` }} />
        <div className="h-authentic-content">
          <span className="eyebrow">Authentic Handloom</span>
          <h2>Not woven by machines. Woven by people we know by name.</h2>
          <p>
            Every saree in our store is sourced directly from weaving communities we have worked with
            for decades. No middlemen. No imitations. Only the honest weight of pure silk, cotton, and
            the unhurried craft of the handloom.
          </p>
          <div className="h-pillars">
            <div>
              <strong>Pure Yarn</strong>
              <span>Mulberry Silk · Handspun Cotton</span>
            </div>
            <div>
              <strong>Real Zari</strong>
              <span>Traditional Gold &amp; Silver Tested</span>
            </div>
            <div>
              <strong>Honest Pricing</strong>
              <span>Direct from the Weaver's Loom</span>
            </div>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="h-collections">
        <div className="container">
          <div className="h-section-head">
            <div className="h-divider"><Paisley /></div>
            <h2>Shop by Collection</h2>
            <p>
              Explore our curated chapters of South Indian handloom — each rooted in a region, a
              technique, and a story that has travelled with the women of our families.
            </p>
          </div>
          <div className="h-col-grid">
            {collections.map((c) => (
              <a key={c.num} className="h-col-card" href={c.href}>
                <div className="h-col-imgwrap">
                  <img src={c.img} alt={c.name} loading="lazy" />
                </div>
                <div className="h-col-meta">
                  <div className="num">— {c.num}</div>
                  <h3>{c.name}</h3>
                  <div className="arr">Explore →</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="h-featured">
        <div className="container">
          <div className="h-featured-row">
            <div>
              <img src={featSilkCotton} alt="Silk Cotton featured" loading="lazy" />
            </div>
            <div className="h-featured-text">
              <span className="eyebrow">Featured · Silk Cotton</span>
              <h2>The everyday silk of South Indian homes.</h2>
              <p>
                Light as breath, dignified as silk. Our handloom silk cotton sarees are made for the
                temple, the office, and every gathering in between — woven with traditional borders and
                soft, breathable comfort.
              </p>
              <a className="h-btn" href="/product-category/silk-cotton">Browse Silk Cotton</a>
            </div>
          </div>

          <div className="h-featured-row reverse">
            <div>
              <img src={feat10Yard} alt="10 Yard sarees featured" loading="lazy" />
            </div>
            <div className="h-featured-text">
              <span className="eyebrow">Featured · 10 Yard Madisar</span>
              <h2>The traditional madisar, in its truest form.</h2>
              <p>
                Woven the way it always has been — nine and ten yards of unbroken silk, ready for
                ceremony, wedding, and the sacred occasions our grandmothers prepared for. A rare craft,
                kept alive on our looms.
              </p>
              <a className="h-btn" href="/product-category/10-yard-sarees">Browse 10 Yard</a>
            </div>
          </div>
        </div>
      </section>

      {/* Video Shopping */}
      <section className="h-video">
        <div className="h-video-grid">
          <img src={video} alt="Video saree consultation" loading="lazy" />
          <div className="h-video-text">
            <span className="eyebrow">Video Saree Consultation</span>
            <h2>Shop with us, from anywhere in the world.</h2>
            <p>
              Book a private video appointment with one of our family consultants. We will walk you
              through our store, show you sarees in natural light, and help you find the one that
              feels right — just as you would in person at our Chennai boutique.
            </p>
            <a className="h-btn" href="/video-shopping">Book an Appointment</a>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="h-reviews">
        <div className="container">
          <div className="h-section-head">
            <span className="eyebrow">From Our Patrons</span>
            <h2>Trust, woven through generations.</h2>
          </div>
          <div className="h-reviews-grid">
            <div className="h-review">
              <div className="stars">★ ★ ★ ★ ★</div>
              <blockquote>
                "My mother bought her wedding saree from them in 1978. I bought mine in 2009. Last
                week, my daughter chose hers. Some places never lose their soul."
              </blockquote>
              <cite>Lakshmi R.<small>Chennai · Three-Generation Customer</small></cite>
            </div>
            <div className="h-review">
              <div className="stars">★ ★ ★ ★ ★</div>
              <blockquote>
                "The silk cotton sarees are unmatched. The zari is real, the weave is honest, and the
                people behind the counter treat you like family. This is what handloom should feel like."
              </blockquote>
              <cite>Meera Iyer<small>Bengaluru</small></cite>
            </div>
            <div className="h-review">
              <div className="stars">★ ★ ★ ★ ★</div>
              <blockquote>
                "I live in New Jersey now. Their video consultation made me feel like I was back home in
                Mylapore. The saree arrived perfectly packed and exactly as promised."
              </blockquote>
              <cite>Priya Sundaram<small>New Jersey, USA</small></cite>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section className="h-instagram">
        <div className="container">
          <div className="h-section-head">
            <span className="eyebrow">@sriaishwaryasarees</span>
            <h2>From our looms and our patrons.</h2>
          </div>
          <div className="h-ig-grid">
            {[ig1, ig2, ig3, ig4, ig5, ig6].map((src, i) => (
              <a key={i} href="https://instagram.com" target="_blank" rel="noreferrer">
                <img src={src} alt="" loading="lazy" />
              </a>
            ))}
          </div>
          <div className="h-ig-handle">
            Follow us · <a href="https://instagram.com" target="_blank" rel="noreferrer">@sriaishwaryasarees</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="h-footer">
        <div className="container">
          <div className="h-footer-grid">
            <div className="h-footer-brand">
              <h4>Sri Aishwarya Sarees</h4>
              <p>
                A family-owned heritage handloom house from Chennai. Authentic sarees woven by the
                hands we have known for fifty years.
              </p>
            </div>
            <div>
              <h4>Shop</h4>
              <ul>
                <li><a href="/product-category/kanjivaram">Kanjivaram Silk</a></li>
                <li><a href="/product-category/silk-cotton">Silk Cotton</a></li>
                <li><a href="/product-category/10-yard-sarees">10 Yard Madisar</a></li>
                <li><a href="/product-category/cotton">Pure Cotton</a></li>
                <li><a href="/product-category/bridal">Bridal</a></li>
                <li><a href="/shop">All Sarees</a></li>
              </ul>
            </div>
            <div>
              <h4>Customer Care</h4>
              <ul>
                <li><a href="/my-account">My Account</a></li>
                <li><a href="/cart">Cart</a></li>
                <li><a href="/checkout">Checkout</a></li>
                <li><a href="/contact">Contact Us</a></li>
                <li><a href="/shipping">Shipping &amp; Returns</a></li>
              </ul>
            </div>
            <div>
              <h4>Visit Us</h4>
              <ul>
                <li>Sri Aishwarya Sarees</li>
                <li>Chennai, Tamil Nadu</li>
                <li>India</li>
                <li><a href="tel:+910000000000">+91 00000 00000</a></li>
                <li><a href="mailto:hello@sriaishwaryasarees.com">hello@sriaishwaryasarees.com</a></li>
              </ul>
            </div>
          </div>
          <div className="h-footer-bottom">
            <div>© Sri Aishwarya Sarees · Temple of Silk Cottons</div>
            <div>Handloom · Heritage · Chennai</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
