"use client";

import { motion } from "framer-motion";
import { Container } from "../Container";

export function BlogsHero() {
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
            <span className="text-[#b42519]">Blog & Artikel</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Informasi, tips, dan pengetahuan seputar pendidikan dan
            perkembangan anak
          </p>
          <div className="w-24 h-1 bg-[#b42519] mx-auto mb-10" />
        </motion.div>
      </Container>
    </section>
  );
}
