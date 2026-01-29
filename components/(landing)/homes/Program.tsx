"use client";

import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Section } from "../Section";
import { Container } from "../Container";
import { programData } from "@/data/(landing)/programs";

const Program = () => {
  return (
    <Section id="program-section">
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 bg-[#b42519]/10 rounded-lg">
              <BookOpen className="h-6 w-6 text-[#b42519]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#b42519]">
              Program Unggulan Kami
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kami menawarkan berbagai program pendidikan yang dirancang untuk
            memenuhi kebutuhan belajar Anda dengan metode yang menyenangkan dan efektif
          </p>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programData.map((program) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl h-[358px] shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                {/* Background Image */}
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  priority
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300" />

                {/* Content - Always Visible */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  {/* Hover Overlay with Full Info */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Title and Description - Visible on Hover only */}
                  <div className="relative z-10 transform translate-y-0 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl md:text-xl font-bold text-white mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {program.title}
                    </h3>
                    <p className="text-sm text-gray-100 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 line-clamp-3">
                      {program.description}
                    </p>

                    {/* Features */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150 space-y-2 mb-4">
                      {program.features.slice(0, 2).map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-[#fbbf24] font-bold">•</span>
                          <span className="text-xs text-gray-100">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Button - CTA ke halaman menu program */}
                    <Link
                      href="/programs"
                      className="w-full px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#b42519] hover:bg-[#8a1a13] transition-all duration-300 opacity-0 group-hover:opacity-100 transform group-hover:scale-100 scale-95 inline-flex items-center justify-center"
                    >
                      Pelajari Lebih Lanjut
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Program;
