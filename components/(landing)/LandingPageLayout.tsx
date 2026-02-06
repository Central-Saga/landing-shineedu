"use client";

import Navbar from "@/components/(landing)/Navbar";
import Footer from "@/components/(landing)/Footer";
import { LightBackground } from "@/components/animations/BackgroundAnimations";

interface LandingPageLayoutProps {
  children: React.ReactNode;
}

export function LandingPageLayout({ children }: LandingPageLayoutProps) {
  return (
    <main className="min-h-screen relative bg-white">
      <LightBackground />
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
