import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://skvorechnik-coffee.ru"),
  title: "Скворечник — кофе с собой, ул. Толмачёва 21, Екатеринбург",
  description:
    "Кофейня Скворечник в центре Екатеринбурга. Кофе от 70 ₽, рейтинг 5,0. Авторские напитки, дружелюбные бариста.",
  openGraph: {
    title: "Скворечник — кофе с собой в Екатеринбурге",
    description:
      "Кофе с собой на ул. Толмачёва, 21: авторские сиропы, необычные вкусы, рейтинг 5,0 и быстрый формат в центре города.",
    type: "website",
    locale: "ru_RU",
    siteName: "Скворечник",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Кофейня Скворечник в Екатеринбурге",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Скворечник — кофе с собой в Екатеринбурге",
    description:
      "Кофе от 70 ₽, авторские напитки и рейтинг 5,0 на ул. Толмачёва, 21.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
