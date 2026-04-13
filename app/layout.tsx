import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "Daily Compounding — Learn Investing in 30 Days",
  description:
    "A free 30-day course built for India. Master investing basics — compounding, mutual funds, SIPs, stocks, and tax — in 10 minutes a day.",
  metadataBase: new URL("https://dailycompound.in"),
  openGraph: {
    type: "website",
    url: "https://dailycompound.in/",
    siteName: "Daily Compounding",
    title: "Daily Compounding — Learn Investing in 30 Days",
    description:
      "A free 30-day course built for India. Master investing basics — compounding, mutual funds, SIPs, stocks, and tax — in 10 minutes a day.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Compounding — Learn Investing in 30 Days",
    description:
      "A free 30-day course built for India. Master investing basics — compounding, mutual funds, SIPs, stocks, and tax — in 10 minutes a day.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${sora.className} h-full bg-white`}>{children}</body>
    </html>
  );
}
