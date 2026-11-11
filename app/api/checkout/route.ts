import { NextResponse } from "next/server";
import Stripe from "stripe";
import { FREE_SHIPPING_AT, SHIPPING_FLAT, getProduct } from "@/lib/products";

type Body = { items?: { slug: string; size: string; qty: number }[] };

const COUNTRIES = [
  "US", "CA", "GB", "IE", "AU", "NZ", "DE", "FR", "IT", "ES", "NL", "BE", "CH", "AT", "SE", "NO", "DK", "FI",
  "PT", "AE", "SA", "QA", "SG", "HK", "JP", "KR", "IN", "NG", "GH", "ZA", "KE",
] as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[];

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ error: "Payments are not set up yet. Add STRIPE_SECRET_KEY." }, { status: 500 });
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const items = body.items ?? [];
  if (!items.length) return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });

  // Prices always come from the server catalogue, never from the browser.
  let subtotal = 0;
  const origin = process.env.NEXT_PUBLIC_SITE_URL || req.headers.get("origin") || "http://localhost:3000";
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  for (const item of items) {
    const product = getProduct(item.slug);
    const qty = Math.floor(Number(item.qty));
    if (!product || !product.sizes.includes(item.size) || !(qty >= 1 && qty <= 10)) {
      return NextResponse.json({ error: "An item in your bag is no longer available." }, { status: 400 });
    }
    subtotal += product.price * qty;
    const image = product.images?.[0];
    line_items.push({
      quantity: qty,
      price_data: {
        currency: "usd",
        unit_amount: product.price * 100,
        product_data: {
          name: product.name,
          description: `${product.colour} · Size ${item.size}`,
          ...(image ? { images: [new URL(image, origin).toString()] } : {}),
          metadata: { slug: product.slug, size: item.size },
        },
      },
    });
  }

  const free = subtotal >= FREE_SHIPPING_AT;

  try {
    const stripe = new Stripe(secret);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      shipping_address_collection: { allowed_countries: COUNTRIES },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: free ? "Free tracked shipping" : "Tracked shipping",
            fixed_amount: { amount: free ? 0 : SHIPPING_FLAT * 100, currency: "usd" },
            delivery_estimate: { minimum: { unit: "business_day", value: 3 }, maximum: { unit: "business_day", value: 7 } },
          },
        },
      ],
      phone_number_collection: { enabled: true },
      allow_promotion_codes: true,
      // Turn on automatic tax in Stripe Dashboard → Tax, then uncomment:
      // automatic_tax: { enabled: true },
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop`,
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("Stripe error", e);
    return NextResponse.json({ error: "We couldn't start checkout. Please try again." }, { status: 500 });
  }
}
