"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "./cart-provider";

const links = [
  { href: "/shop", label: "Shop all" },
  { href: "/shop?category=Tailoring", label: "Tailoring" },
  { href: "/shop?category=Outerwear", label: "Outerwear" },
  { href: "/shop?category=Knitwear", label: "Knitwear" },
];

export function Header() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menu]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "border-b border-gold/15 bg-black/85 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <div className="container-x grid h-20 grid-cols-3 items-center">
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="text-[11px] uppercase tracking-[.26em] text-ivory/80 transition-colors hover:text-gold">
                {l.label}
              </Link>
            ))}
          </nav>
          <button
            className="justify-self-start text-[11px] uppercase tracking-[.26em] md:hidden"
            onClick={() => setMenu(true)}
            aria-label="Open menu"
          >
            Menu
          </button>

          <Link href="/" aria-label="AR Clothings home" className="flex flex-col items-center justify-self-center leading-none">
            <span className="gold-text font-display text-[34px] font-medium tracking-[.14em]">AR</span>
            <span className="mt-1 text-[8px] uppercase tracking-[.55em] text-gold/80">Clothings</span>
          </Link>

          <div className="flex items-center justify-self-end gap-8">
            <Link href="/#atelier" className="hidden text-[11px] uppercase tracking-[.26em] text-ivory/80 transition-colors hover:text-gold md:block">
              Atelier
            </Link>
            <button
              onClick={() => setOpen(true)}
              className="text-[11px] uppercase tracking-[.26em] text-ivory/90 transition-colors hover:text-gold"
              aria-label={`Open bag, ${count} items`}
            >
              Bag{count > 0 && <span className="ml-2 text-gold">({count})</span>}
            </button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-[70] bg-black transition-opacity duration-300 ${menu ? "opacity-100" : "pointer-events-none opacity-0"}`} inert={!menu}>
        <div className="container-x flex h-20 items-center justify-between">
          <span className="gold-text font-display text-3xl tracking-[.14em]">AR</span>
          <button onClick={() => setMenu(false)} className="text-[11px] uppercase tracking-[.26em]">Close</button>
        </div>
        <nav className="container-x mt-10 flex flex-col gap-6" aria-label="Mobile">
          {[...links, { href: "/#atelier", label: "Atelier" }].map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMenu(false)} className="border-b border-gold/15 pb-5 font-display text-4xl transition-colors hover:text-gold">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
