import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shine Education - Bimbingan Belajar Tabanan",
  description: "Shine Education adalah lembaga pendidikan di Tabanan yang mengutamakan kursus dan bimbingan belajar dalam semua jenjang pendidikan.",
  icons: {
    icon: [
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon_io/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/favicon_io/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/favicon_io/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="bg-white">
      <body className="antialiased bg-white">
        {children}
      </body>
    </html>
  );
}
