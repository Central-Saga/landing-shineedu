"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/landing/Container";

export function JobApplicationsHero() {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-[#b42519]">Lamaran</span>{" "}
            <span className="text-[#d2a741]">Kerja</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Kirim lamaran atau pantau status aplikasi Anda untuk bergabung dengan tim
            Shine Education.
          </p>
          <div className="w-24 h-1 bg-[#b42519] mx-auto mb-10"></div>
        </motion.div>
      </Container>
    </section>
  );
}

