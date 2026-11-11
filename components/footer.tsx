import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/lib/products";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-gold/15">
      <div className="container-x grid gap-14 py-20 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Image src="/logo.png" alt="AR Clothings" width={220} height={220} className="-ml-6 -mt-6 h-auto w-56 mix-blend-lighten" />
          <p className="-mt-6 max-w-xs text-sm leading-relaxed text-ivory/60">
            Considered tailoring, knitwear and outerwear, made to be worn for years.
          </p>
        </div>
        <div>
          <h3 className="font-display text-xl">Shop</h3>
          <ul className="mt-5 space-y-3 text-sm text-ivory/65">
            {CATEGORIES.map((c) => (
              <li key={c}><Link className="hover:text-gold" href={`/shop?category=${c}`}>{c}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-display text-xl">Customer care</h3>
          <ul className="mt-5 space-y-3 text-sm text-ivory/65">
            <li>Free shipping over $250</li>
            <li>30-day returns</li>
            <li>Worldwide delivery</li>
            <li><a className="hover:text-gold" href="mailto:care@arclothings.com">care@arclothings.com</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-display text-xl">Secure payment</h3>
          <p className="mt-5 text-sm leading-relaxed text-ivory/65">
            Payments are processed by Stripe. We never see or store your card details.
          </p>
        </div>
      </div>
      <div className="border-t border-gold/10 py-6 text-center text-xs text-ivory/40">
        © {new Date().getFullYear()} AR Clothings®. All rights reserved. Wear Excellence™
      </div>
    </footer>
  );
}
