"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "./cart-provider";
import { ProductVisual } from "./product-visual";
import { FREE_SHIPPING_AT, SHIPPING_FLAT, money } from "@/lib/products";

export function CartDrawer() {
  const { lines, subtotal, open, setOpen, setQty, remove, checkout, busy, error } = useCart();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  const remaining = Math.max(0, FREE_SHIPPING_AT - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_AT) * 100);

  return (
    <div className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`} inert={!open}>
      <div
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-black/75 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-gold/20 bg-ink-soft transition-transform duration-500 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-gold/15 px-6 py-5">
          <h2 className="font-display text-2xl">Your bag</h2>
          <button onClick={() => setOpen(false)} className="text-sm text-ivory/70 hover:text-gold" aria-label="Close bag">
            Close
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
            <p className="font-display text-3xl">Your bag is empty</p>
            <p className="max-w-xs text-sm text-ivory/60">Add a piece from the collection and it will wait for you here.</p>
            <Link href="/shop" onClick={() => setOpen(false)} className="btn-line">Shop the collection</Link>
          </div>
        ) : (
          <>
            <div className="border-b border-gold/15 px-6 py-4">
              <p className="text-xs text-ivory/70">
                {remaining > 0 ? `Add ${money(remaining)} more for free shipping` : "Your order ships free"}
              </p>
              <div className="mt-2 h-px w-full bg-gold/20">
                <div className="h-px bg-gold transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <ul className="flex-1 divide-y divide-gold/10 overflow-y-auto px-6">
              {lines.map((l) => (
                <li key={l.slug + l.size} className="flex gap-4 py-5">
                  <Link href={`/product/${l.slug}`} onClick={() => setOpen(false)} className="w-24 shrink-0">
                    <ProductVisual product={l.product} className="aspect-[4/5] w-full" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <p className="font-display text-lg leading-tight">{l.product.name}</p>
                    <p className="mt-1 text-xs text-ivory/60">{l.product.colour} · Size {l.size}</p>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center border border-gold/30">
                        <button className="h-8 w-8 hover:text-gold" aria-label="Decrease quantity" onClick={() => setQty(l.slug, l.size, l.qty - 1)}>−</button>
                        <span className="w-8 text-center text-sm" aria-live="polite">{l.qty}</span>
                        <button className="h-8 w-8 hover:text-gold" aria-label="Increase quantity" onClick={() => setQty(l.slug, l.size, l.qty + 1)}>+</button>
                      </div>
                      <p className="text-sm">{money(l.product.price * l.qty)}</p>
                    </div>
                    <button onClick={() => remove(l.slug, l.size)} className="mt-2 self-start text-xs text-ivory/50 underline underline-offset-4 hover:text-gold">
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-gold/20 px-6 py-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ivory/70">Subtotal</span>
                <span className="font-display text-2xl">{money(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-ivory/50">
                {subtotal >= FREE_SHIPPING_AT ? "Free shipping applied." : `Shipping ${money(SHIPPING_FLAT)}.`} Taxes calculated at checkout.
              </p>
              {error && <p role="alert" className="mt-3 text-sm text-red-400">{error}</p>}
              <button onClick={checkout} disabled={busy} className="btn-gold mt-4 w-full">
                {busy ? "Opening secure checkout" : "Checkout securely"}
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
