import Image from "next/image";
import type { Product, Shape } from "@/lib/products";

const SHAPES: Record<Shape, { body: string; lines: string[] }> = {
  tee: {
    body: "M70 30 L40 45 L12 95 L38 108 L55 85 L55 215 L145 215 L145 85 L162 108 L188 95 L160 45 L130 30 Q100 52 70 30 Z",
    lines: ["M70 30 Q100 52 130 30"],
  },
  shirt: {
    body: "M70 28 L38 44 L16 196 L44 202 L56 112 L56 222 L144 222 L144 112 L156 202 L184 196 L162 44 L130 28 L100 44 Z",
    lines: ["M70 28 L100 70 L130 28", "M100 70 L100 222"],
  },
  knit: {
    body: "M72 30 L42 46 L18 192 L46 198 L58 104 L58 218 L142 218 L142 104 L154 198 L182 192 L158 46 L128 30 Q100 50 72 30 Z",
    lines: ["M58 204 H142", "M72 30 Q100 56 128 30"],
  },
  jacket: {
    body: "M72 28 L38 44 L18 190 L46 197 L56 110 L56 220 L144 220 L144 110 L154 197 L182 190 L162 44 L128 28 L100 124 Z",
    lines: ["M72 28 L100 124 L128 28", "M100 124 V220", "M56 170 H78", "M122 170 H144"],
  },
  coat: {
    body: "M72 26 L38 42 L18 196 L46 203 L56 108 L56 238 L144 238 L144 108 L154 203 L182 196 L162 42 L128 26 L100 128 Z",
    lines: ["M72 26 L100 128 L128 26", "M100 128 V238", "M56 190 H80", "M120 190 H144"],
  },
  trouser: {
    body: "M62 18 L138 18 L152 232 L108 232 L100 92 L92 232 L48 232 Z",
    lines: ["M62 18 Q100 30 138 18", "M100 24 V92"],
  },
  bag: {
    body: "M48 92 H152 L164 220 H36 Z",
    lines: ["M76 92 V64 Q100 30 124 64 V92", "M48 120 H152"],
  },
};

type Props = { product: Product; className?: string; priority?: boolean; index?: number };

export function ProductVisual({ product, className = "", priority = false, index = 0 }: Props) {
  const img = product.images?.[index];
  const shape = SHAPES[product.shape];
  const gid = `g-${product.slug}`;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: `radial-gradient(120% 90% at 50% 22%, ${product.tone} 0%, #000 100%)` }}
    >
      {img ? (
        <Image
          src={img}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 33vw, 50vw"
          className="object-cover"
          priority={priority}
        />
      ) : (
        <svg viewBox="0 0 200 250" className="absolute inset-0 h-full w-full p-[16%]" role="img" aria-label={product.name}>
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#EBCB82" stopOpacity=".16" />
              <stop offset="1" stopColor="#C9A24B" stopOpacity=".02" />
            </linearGradient>
          </defs>
          <path d={shape.body} fill={`url(#${gid})`} stroke="#C9A24B" strokeWidth="1.1" strokeLinejoin="round" />
          {shape.lines.map((d) => (
            <path key={d} d={d} fill="none" stroke="#C9A24B" strokeOpacity=".5" strokeWidth=".8" strokeLinecap="round" />
          ))}
        </svg>
      )}
    </div>
  );
}
