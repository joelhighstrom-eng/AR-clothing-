import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES, products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export const metadata: Metadata = { title: "Shop" };

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "new", label: "Newest" },
  { id: "low", label: "Price, low to high" },
  { id: "high", label: "Price, high to low" },
];

type Props = { searchParams: Promise<{ category?: string; sort?: string }> };

export default async function Shop({ searchParams }: Props) {
  const { category, sort = "featured" } = await searchParams;
  const active = CATEGORIES.find((c) => c === category);

  let list = products.filter((p) => !active || p.category === active);
  if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
  else if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
  else if (sort === "new") list = [...list].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
  else list = [...list].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

  const href = (c?: string, s = sort) => {
    const q = new URLSearchParams();
    if (c) q.set("category", c);
    if (s !== "featured") q.set("sort", s);
    const str = q.toString();
    return `/shop${str ? `?${str}` : ""}`;
  };

  return (
    <div className="container-x pb-8 pt-36">
      <h1 className="font-display text-5xl md:text-8xl">{active ?? "The collection"}</h1>
      <p className="mt-4 text-ivory/55">{list.length} pieces</p>

      <div className="mt-12 flex flex-col gap-6 border-y border-gold/15 py-5 md:flex-row md:items-center md:justify-between">
        <nav aria-label="Categories" className="flex flex-wrap gap-x-7 gap-y-3 text-sm">
          <Link href={href(undefined)} className={!active ? "text-gold" : "text-ivory/70 hover:text-gold"} aria-current={!active ? "page" : undefined}>All</Link>
          {CATEGORIES.map((c) => (
            <Link key={c} href={href(c)} className={active === c ? "text-gold" : "text-ivory/70 hover:text-gold"} aria-current={active === c ? "page" : undefined}>
              {c}
            </Link>
          ))}
        </nav>
        <nav aria-label="Sort" className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
          {SORTS.map((s) => (
            <Link key={s.id} href={href(active, s.id)} className={sort === s.id ? "text-gold" : "text-ivory/55 hover:text-gold"}>
              {s.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-14 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((p, i) => <ProductCard key={p.slug} product={p} priority={i < 4} />)}
      </div>
    </div>
  );
}
