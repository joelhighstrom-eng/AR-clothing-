import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, FREE_SHIPPING_AT, getProduct, products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { ProductVisual } from "@/components/product-visual";
import { Newsletter } from "@/components/newsletter";

export default function Home() {
  const arrivals = products.filter((p) => p.isNew).slice(0, 4);
  const coat = getProduct("regent-wool-overcoat")!;

  return (
    <>
      {/* Hero: the logo is the moment */}
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-24 text-center">
        <div className="hero-glow pointer-events-none absolute left-1/2 top-[42%] h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,162,75,.24),transparent_65%)]" />
        <Image
          src="/logo.png"
          alt="AR Clothings. Wear Excellence."
          width={1254}
          height={1254}
          priority
          className="hero-logo relative h-auto w-[min(82vw,640px)] mix-blend-lighten"
        />
        <p className="relative -mt-14 max-w-md font-display text-xl italic text-ivory/75 md:-mt-24 md:text-2xl">
          The Autumn–Winter collection. Made to be worn for years.
        </p>
        <div className="relative mt-9 flex flex-wrap justify-center gap-4">
          <Link href="/shop" className="btn-gold">Shop the collection</Link>
          <Link href="/shop?category=Tailoring" className="btn-line">Explore tailoring</Link>
        </div>
      </section>

      {/* New arrivals */}
      <section className="container-x py-24">
        <div className="mb-12 flex items-end justify-between gap-6">
          <h2 className="font-display text-4xl md:text-6xl">New arrivals</h2>
          <Link href="/shop" className="text-sm text-gold underline underline-offset-8 hover:text-gold-light">View all pieces</Link>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
          {arrivals.map((p, i) => <ProductCard key={p.slug} product={p} priority={i < 2} />)}
        </div>
      </section>

      {/* Atelier: ivory contrast band */}
      <section id="atelier" className="bg-ivory text-ink">
        <div className="container-x grid items-center gap-12 py-24 md:grid-cols-2 md:gap-20">
          <div>
            <h2 className="font-display text-5xl leading-[1.05] md:text-7xl">Cut for the way you carry yourself.</h2>
            <p className="mt-8 max-w-md font-display text-xl leading-relaxed text-ink/75">
              Every AR piece starts with the fabric. We choose mills that weave for the long term, then cut each
              garment to hold its shape through seasons of wear. Nothing is rushed, and nothing is added that
              doesn't earn its place.
            </p>
            <Link href={`/product/${coat.slug}`} className="mt-10 inline-flex border border-ink px-9 py-4 text-[11px] uppercase tracking-[.3em] transition-colors hover:bg-ink hover:text-ivory">
              See the Regent Overcoat
            </Link>
          </div>
          <Link href={`/product/${coat.slug}`} aria-label={coat.name}>
            <ProductVisual product={coat} className="aspect-[4/5] w-full" />
          </Link>
        </div>
      </section>

      {/* Categories as a typographic index */}
      <section className="container-x py-24">
        <h2 className="mb-10 font-display text-4xl md:text-6xl">Shop by category</h2>
        <ul>
          {CATEGORIES.map((c) => {
            const n = products.filter((p) => p.category === c).length;
            return (
              <li key={c} className="border-t border-gold/20 last:border-b">
                <Link href={`/shop?category=${c}`} className="group flex items-baseline justify-between py-6 transition-colors hover:text-gold md:py-8">
                  <span className="font-display text-4xl transition-transform duration-500 group-hover:translate-x-3 md:text-7xl">{c}</span>
                  <span className="text-sm text-ivory/50">{n} {n === 1 ? "piece" : "pieces"}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Service */}
      <section className="border-y border-gold/15">
        <div className="container-x grid divide-gold/15 py-10 sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
          {[
            ["Free shipping", `On orders over $${FREE_SHIPPING_AT}`],
            ["30-day returns", "Unworn pieces, no questions asked"],
            ["Worldwide delivery", "Tracked and insured"],
            ["Secure checkout", "Cards, Apple Pay and Google Pay"],
          ].map(([t, d]) => (
            <div key={t} className="px-6 py-5 text-center">
              <p className="font-display text-2xl">{t}</p>
              <p className="mt-1 text-sm text-ivory/55">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="container-x flex flex-col items-center py-28 text-center">
        <h2 className="font-display text-4xl md:text-6xl">Be first to see what's next</h2>
        <p className="mb-10 mt-5 max-w-md text-ivory/60">New collections and private releases, sent to members before anyone else.</p>
        <Newsletter />
      </section>
    </>
  );
}
