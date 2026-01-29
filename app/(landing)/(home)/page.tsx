"use client";

import { motion } from "framer-motion";
import { LandingPageLayout } from "@/components/(landing)/LandingPageLayout";
import HeroSection from "@/components/(landing)/homes/HeroSection";
import About from "@/components/(landing)/homes/About";
import Program from "@/components/(landing)/homes/Program";
import Langganan from "@/components/(landing)/homes/Langganan";

const motionProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function LandingPage() {
  return (
    <LandingPageLayout>
      <motion.div {...motionProps}>
        <HeroSection />
      </motion.div>
      <motion.div {...motionProps}>
        <Program />
      </motion.div>
      <motion.div {...motionProps}>
        <About />
      </motion.div>
      <motion.div {...motionProps}>
        <Langganan />
      </motion.div>
    </LandingPageLayout>
  );
}
