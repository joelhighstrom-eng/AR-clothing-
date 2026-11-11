export type Shape = "tee" | "shirt" | "knit" | "jacket" | "coat" | "trouser" | "bag";

export type Product = {
  slug: string;
  name: string;
  category: Category;
  price: number; // USD, whole dollars
  description: string;
  details: string[];
  sizes: string[];
  colour: string;
  tone: string; // background tint used behind the artwork
  shape: Shape;
  isNew?: boolean;
  featured?: boolean;
  /** Real photos: drop files in /public/products and list them, e.g. ["/products/regent-1.jpg"] */
  images?: string[];
};

export const CATEGORIES = ["Tailoring", "Outerwear", "Knitwear", "Shirts", "Essentials", "Accessories"] as const;
export type Category = (typeof CATEGORIES)[number];

export const FREE_SHIPPING_AT = 250;
export const SHIPPING_FLAT = 15;

const LETTER = ["XS", "S", "M", "L", "XL", "XXL"];
const WAIST = ["30", "32", "34", "36", "38"];

export const products: Product[] = [
  {
    slug: "sovereign-double-breasted-blazer",
    name: "Sovereign Double-Breasted Blazer",
    category: "Tailoring",
    price: 685,
    description: "A structured double-breasted blazer in Italian wool twill, cut with a defined shoulder and a clean, narrow waist.",
    details: ["100% virgin wool twill", "Half-canvassed construction", "Horn-effect buttons", "Fully lined in cupro", "Dry clean only"],
    sizes: LETTER, colour: "Onyx", tone: "#1a1610", shape: "jacket", isNew: true, featured: true,
  },
  {
    slug: "regent-wool-overcoat",
    name: "Regent Wool Overcoat",
    category: "Outerwear",
    price: 890,
    description: "A long, single-breasted overcoat in a dense wool-cashmere blend. Warm without weight, with a drape that holds its line.",
    details: ["90% wool, 10% cashmere", "Concealed button placket", "Two welt pockets", "Knee-length cut", "Dry clean only"],
    sizes: LETTER, colour: "Charcoal", tone: "#17140f", shape: "coat", isNew: true, featured: true,
  },
  {
    slug: "meridian-cashmere-crewneck",
    name: "Meridian Cashmere Crewneck",
    category: "Knitwear",
    price: 340,
    description: "Grade-A Mongolian cashmere, knitted fully fashioned for a soft hand and a shape that stays.",
    details: ["100% cashmere", "Ribbed collar, cuff and hem", "Relaxed fit", "Hand wash cold or dry clean"],
    sizes: LETTER, colour: "Sand", tone: "#221c12", shape: "knit", isNew: true,
  },
  {
    slug: "aurelian-poplin-shirt",
    name: "Aurelian Poplin Shirt",
    category: "Shirts",
    price: 185,
    description: "A crisp two-ply cotton poplin shirt with a semi-spread collar and mother-of-pearl buttons.",
    details: ["100% long-staple cotton", "Mother-of-pearl buttons", "Regular fit", "Machine wash 30°C"],
    sizes: LETTER, colour: "Ivory", tone: "#1c1914", shape: "shirt", featured: true,
  },
  {
    slug: "noble-pleated-trousers",
    name: "Noble Pleated Trousers",
    category: "Tailoring",
    price: 295,
    description: "High-rise trousers with a single forward pleat and a tapered leg. Made to match the Sovereign blazer.",
    details: ["100% virgin wool twill", "Single pleat, side adjusters", "Tapered leg", "Dry clean only"],
    sizes: WAIST, colour: "Onyx", tone: "#15120d", shape: "trouser",
  },
  {
    slug: "heritage-merino-roll-neck",
    name: "Heritage Merino Roll Neck",
    category: "Knitwear",
    price: 310,
    description: "A fine-gauge extra-fine merino roll neck that layers cleanly under tailoring.",
    details: ["100% extra-fine merino", "Fine 12-gauge knit", "Slim fit", "Hand wash cold"],
    sizes: LETTER, colour: "Black", tone: "#1b1710", shape: "knit",
  },
  {
    slug: "gilded-heavyweight-tee",
    name: "Gilded Heavyweight Tee",
    category: "Essentials",
    price: 95,
    description: "A 280gsm combed cotton tee with a dense, clean handle and a gold-thread AR monogram at the hem.",
    details: ["100% combed cotton, 280gsm", "Embroidered gold monogram", "Boxy fit", "Machine wash 30°C"],
    sizes: LETTER, colour: "Black", tone: "#12100c", shape: "tee", featured: true,
  },
  {
    slug: "atlas-suede-bomber",
    name: "Atlas Suede Bomber",
    category: "Outerwear",
    price: 760,
    description: "A bomber in buttery Italian suede with ribbed trims and a satin lining.",
    details: ["Italian lambskin suede", "Ribbed wool trims", "Satin lining", "Specialist leather clean"],
    sizes: LETTER, colour: "Espresso", tone: "#241a10", shape: "jacket",
  },
  {
    slug: "crest-linen-overshirt",
    name: "Crest Linen Overshirt",
    category: "Shirts",
    price: 220,
    description: "A relaxed overshirt in washed Belgian linen, designed to be worn open or buttoned.",
    details: ["100% Belgian linen", "Chest and hip pockets", "Relaxed fit", "Machine wash 30°C"],
    sizes: LETTER, colour: "Stone", tone: "#1f1a12", shape: "shirt",
  },
  {
    slug: "orion-wide-leg-trouser",
    name: "Orion Wide-Leg Trousers",
    category: "Tailoring",
    price: 275,
    description: "A fluid wide-leg trouser in wool crepe with a clean front and a long, easy line.",
    details: ["Wool crepe", "Flat front, hidden hook closure", "Wide leg", "Dry clean only"],
    sizes: WAIST, colour: "Charcoal", tone: "#16130e", shape: "trouser",
  },
  {
    slug: "vault-leather-weekender",
    name: "Vault Leather Weekender",
    category: "Accessories",
    price: 540,
    description: "A full-grain leather weekender with brass hardware and a suede-lined interior. Large enough for three days away.",
    details: ["Full-grain calf leather", "Solid brass hardware", "Detachable shoulder strap", "Interior zip pocket"],
    sizes: ["One size"], colour: "Black", tone: "#1d1811", shape: "bag", isNew: true,
  },
  {
    slug: "ivory-pique-polo",
    name: "Ivory Piqué Polo",
    category: "Essentials",
    price: 120,
    description: "A long-staple cotton piqué polo with a soft collar and a refined, slightly cropped body.",
    details: ["100% Pima cotton piqué", "Three-button placket", "Regular fit", "Machine wash 30°C"],
    sizes: LETTER, colour: "Ivory", tone: "#1e1a13", shape: "tee",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const money = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
