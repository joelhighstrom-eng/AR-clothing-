import Link from "next/link";
import { ProductVisual } from "./product-visual";
import { money, type Product } from "@/lib/products";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative overflow-hidden">
        <ProductVisual
          product={product}
          priority={priority}
          className="aspect-[4/5] w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        {product.isNew && (
          <span className="absolute left-3 top-3 border border-gold/50 bg-black/70 px-2.5 py-1 text-[10px] tracking-[.2em] text-gold">New</span>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl leading-snug">{product.name}</h3>
          <p className="mt-1 text-xs text-ivory/55">{product.category} · {product.colour}</p>
        </div>
        <p className="pt-1 text-sm text-gold">{money(product.price)}</p>
      </div>
    </Link>
  );
}
