"use client";

import Navbar from "@/components/(landing)/homes/Navbar";
import Footer from "@/components/(landing)/homes/Footer";
import { LightBackground } from "@/components/animations/BackgroundAnimations";

interface DaftarProgramLayoutProps {
  children: React.ReactNode;
}

export function DaftarProgramLayout({ children }: DaftarProgramLayoutProps) {
  return (
    <main className="min-h-screen relative bg-white">
      <LightBackground />
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
