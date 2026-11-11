import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, money, products } from "@/lib/products";
import { ProductVisual } from "@/components/product-visual";
import { ProductCard } from "@/components/product-card";
import { PurchasePanel } from "@/components/purchase-panel";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  return p ? { title: p.name, description: p.description } : {};
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);
  const extra = products.filter((p) => p.category !== product.category).slice(0, 4 - related.length);
  const more = [...related, ...extra];
  const gallery = product.images?.length ? product.images : [""];

  return (
    <div className="container-x pt-32">
      <nav aria-label="Breadcrumb" className="mb-8 text-xs text-ivory/50">
        <Link href="/shop" className="hover:text-gold">Shop</Link> /{" "}
        <Link href={`/shop?category=${product.category}`} className="hover:text-gold">{product.category}</Link>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
        <div className="grid gap-4">
          {gallery.map((_, i) => (
            <ProductVisual key={i} product={product} index={i} priority={i === 0} className="aspect-[4/5] w-full" />
          ))}
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs text-gold">{product.category}</p>
          <h1 className="mt-3 font-display text-4xl leading-tight md:text-6xl">{product.name}</h1>
          <p className="mt-5 font-display text-3xl text-gold">{money(product.price)}</p>
          <p className="mt-6 max-w-md leading-relaxed text-ivory/70">{product.description}</p>
          <p className="mt-4 text-sm text-ivory/55">Colour: {product.colour}</p>

          <div className="mt-8">
            <PurchasePanel product={product} />
          </div>

          <div className="mt-10 divide-y divide-gold/15 border-y border-gold/15">
            <details className="group py-4" open>
              <summary className="flex cursor-pointer list-none justify-between font-display text-xl">
                Details <span className="text-gold group-open:hidden">+</span><span className="hidden text-gold group-open:inline">−</span>
              </summary>
              <ul className="mt-4 space-y-2 text-sm text-ivory/70">
                {product.details.map((d) => <li key={d}>{d}</li>)}
              </ul>
            </details>
            <details className="group py-4">
              <summary className="flex cursor-pointer list-none justify-between font-display text-xl">
                Shipping and returns <span className="text-gold group-open:hidden">+</span><span className="hidden text-gold group-open:inline">−</span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-ivory/70">
                Free tracked shipping on orders over $250. Return unworn pieces within 30 days for a full refund.
              </p>
            </details>
          </div>
        </div>
      </div>

      <section className="mt-28">
        <h2 className="mb-10 font-display text-4xl md:text-5xl">Complete the look</h2>
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
          {more.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>
    </div>
  );
}
