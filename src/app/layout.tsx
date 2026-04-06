import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ConsentBanner from "@/components/ui/ConsentBanner";
import { Toaster } from "sonner";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "OSAA Connects | Connect Brands With High-Performing Creators.",
    template: "%s | OSAA Connects",
  },
  description:
    "OSAA Connects matches brands with 45+ vetted creators across fashion, tech, fitness, AI and more — fast. Managed from Delhi, global reach.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://osaaconnects.com"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://osaaconnects.com",
    siteName: "OSAA Connects",
    title: "OSAA Connects | Connect Brands With High-Performing Creators.",
    description:
      "We match brands with creators across fashion, tech, fitness, AI and more — fast.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "OSAA Connects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OSAA Connects | Connect Brands With High-Performing Creators.",
    description:
      "We match brands with creators across fashion, tech, fitness, AI and more — fast.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-cream text-charcoal font-inter antialiased">
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <ConsentBanner />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#F6F2EC",
              border: "1px solid #D4AF37",
              color: "#141317",
            },
          }}
        />
      </body>
    </html>
  );
}
