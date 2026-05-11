import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "らいふ スタンプカード",
  description: "町外れのお好み焼き屋のデジタルスタンプカード",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
