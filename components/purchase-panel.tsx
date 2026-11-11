"use client";

import { useState } from "react";
import { useCart } from "./cart-provider";
import type { Product } from "@/lib/products";

export function PurchasePanel({ product }: { product: Product }) {
  const { add } = useCart();
  const single = product.sizes.length === 1;
  const [size, setSize] = useState<string | null>(single ? product.sizes[0] : null);
  const [warn, setWarn] = useState(false);

  const onAdd = () => {
    if (!size) return setWarn(true);
    add({ slug: product.slug, size, qty: 1 });
  };

  return (
    <div>
      {!single && (
        <fieldset>
          <legend className="flex w-full justify-between text-sm">
            <span>Select size</span>
            {warn && !size && <span role="alert" className="text-red-400">Choose a size to continue</span>}
          </legend>
          <div className="mt-3 grid grid-cols-6 gap-2" role="radiogroup" aria-label="Size">
            {product.sizes.map((s) => (
              <button
                key={s}
                role="radio"
                aria-checked={size === s}
                onClick={() => { setSize(s); setWarn(false); }}
                className={`h-12 border text-sm transition-colors ${
                  size === s ? "border-gold bg-gold text-ink" : "border-gold/30 hover:border-gold"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </fieldset>
      )}
      <button onClick={onAdd} className="btn-gold mt-6 w-full">Add to bag</button>
      <p className="mt-4 text-center text-xs text-ivory/50">Free shipping over $250 · 30-day returns</p>
    </div>
  );
}
