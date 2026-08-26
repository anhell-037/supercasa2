import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Super Casa",
  description: "Shared family grocery list with realtime sync.",
  manifest: "/manifest.webmanifest",
};

export const viewport = {
  themeColor: "#0b0f17",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
