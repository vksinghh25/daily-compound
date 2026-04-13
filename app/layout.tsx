import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "Daily Compounding — Learn Investing in 30 Days",
  description:
    "Spend 10–15 minutes a day for 30 days and go from financial beginner to confident investor. Free, jargon-free, built for India.",
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
