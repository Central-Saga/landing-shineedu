import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shine Education - Bimbingan Belajar Tabanan",
  description: "Shine Education adalah lembaga pendidikan di Tabanan yang mengutamakan kursus dan bimbingan belajar dalam semua jenjang pendidikan.",
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
