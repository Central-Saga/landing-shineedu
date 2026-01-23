"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/landing/sections/Navbar";
import HeroSection from "@/components/landing/sections/HeroSection";
import About from "@/components/landing/sections/About";
import Program from "@/components/landing/sections/Program";
import Langganan from "@/components/landing/sections/Langganan";
import Footer from "@/components/landing/sections/Footer";
import { LightBackground } from "@/components/animations/BackgroundAnimations";

export default function LandingPage() {
  return (
    <main className="relative overflow-hidden bg-white">
      <LightBackground />
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <HeroSection />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Program />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <About />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Langganan />
      </motion.div>
      <Footer />
    </main>
  );
}
