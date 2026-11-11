import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart-provider";
import { CartDrawer } from "@/components/cart-drawer";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});
const body = Jost({ subsets: ["latin"], variable: "--font-body" });

const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: "AR Clothings | Wear Excellence", template: "%s | AR Clothings" },
  description: "Considered tailoring, knitwear and outerwear from AR Clothings. Free shipping over $250, worldwide delivery.",
  openGraph: { title: "AR Clothings", description: "Wear Excellence", images: ["/logo.png"], type: "website" },
  icons: { icon: "/logo.png", apple: "/logo.png" },
};

export const viewport: Viewport = { themeColor: "#000000" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
