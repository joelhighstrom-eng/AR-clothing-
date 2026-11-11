import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[80svh] flex-col items-center justify-center text-center">
      <h1 className="font-display text-5xl md:text-7xl">Page not found</h1>
      <p className="mt-4 text-ivory/60">The page you're looking for has moved or doesn't exist.</p>
      <Link href="/shop" className="btn-gold mt-8">Shop the collection</Link>
    </div>
  );
}
