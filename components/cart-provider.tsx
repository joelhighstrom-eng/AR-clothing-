"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getProduct, type Product } from "@/lib/products";

export type CartItem = { slug: string; size: string; qty: number };
export type CartLine = CartItem & { product: Product };

type CartContext = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  open: boolean;
  busy: boolean;
  error: string | null;
  setOpen: (v: boolean) => void;
  add: (item: CartItem) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  remove: (slug: string, size: string) => void;
  clear: () => void;
  checkout: () => Promise<void>;
};

const Ctx = createContext<CartContext | null>(null);
const KEY = "ar-clothings-bag-v1";
const MAX_QTY = 10;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, ready]);

  const add = useCallback((item: CartItem) => {
    setItems((prev) => {
      const found = prev.find((i) => i.slug === item.slug && i.size === item.size);
      if (found) {
        return prev.map((i) =>
          i === found ? { ...i, qty: Math.min(MAX_QTY, i.qty + item.qty) } : i
        );
      }
      return [...prev, item];
    });
    setOpen(true);
  }, []);

  const setQty = useCallback((slug: string, size: string, qty: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.slug === slug && i.size === size ? { ...i, qty: Math.min(MAX_QTY, qty) } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const remove = useCallback((slug: string, size: string) => {
    setItems((prev) => prev.filter((i) => !(i.slug === slug && i.size === size)));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const lines = useMemo<CartLine[]>(
    () =>
      items.flatMap((i) => {
        const product = getProduct(i.slug);
        return product ? [{ ...i, product }] : [];
      }),
    [items]
  );

  const count = lines.reduce((n, l) => n + l.qty, 0);
  const subtotal = lines.reduce((n, l) => n + l.qty * l.product.price, 0);

  const checkout = useCallback(async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Checkout could not start. Please try again.");
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Checkout could not start. Please try again.");
      setBusy(false);
    }
  }, [items]);

  const value = useMemo(
    () => ({ lines, count, subtotal, open, busy, error, setOpen, add, setQty, remove, clear, checkout }),
    [lines, count, subtotal, open, busy, error, add, setQty, remove, clear, checkout]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
