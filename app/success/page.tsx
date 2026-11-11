import type { Metadata } from "next";
import Link from "next/link";
import Stripe from "stripe";
import { ClearCart } from "@/components/clear-cart";
import { money } from "@/lib/products";

export const metadata: Metadata = { title: "Order confirmed" };

type Props = { searchParams: Promise<{ session_id?: string }> };

export default async function Success({ searchParams }: Props) {
  const { session_id } = await searchParams;
  let email: string | null = null;
  let total: number | null = null;

  if (session_id && process.env.STRIPE_SECRET_KEY) {
    try {
      const s = await new Stripe(process.env.STRIPE_SECRET_KEY).checkout.sessions.retrieve(session_id);
      if (s.payment_status === "paid") {
        email = s.customer_details?.email ?? null;
        total = (s.amount_total ?? 0) / 100;
      }
    } catch {}
  }

  return (
    <div className="container-x flex min-h-[80svh] flex-col items-center justify-center pt-24 text-center">
      <ClearCart />
      <h1 className="gold-text font-display text-5xl md:text-8xl">Thank you</h1>
      <p className="mt-6 max-w-md text-lg text-ivory/75">
        Your order is confirmed.
        {email && <> A receipt is on its way to <span className="text-gold">{email}</span>.</>}
      </p>
      {total !== null && <p className="mt-3 text-sm text-ivory/55">Order total {money(total)}</p>}
      <Link href="/shop" className="btn-gold mt-10">Continue shopping</Link>
    </div>
  );
}
