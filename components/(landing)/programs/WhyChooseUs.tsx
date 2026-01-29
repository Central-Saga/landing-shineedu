"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Container } from "../Container";
import { Shield, BookOpen, Zap } from "lucide-react";

const items = [
  {
    icon: Shield,
    title: "Metode Teruji",
    desc: "Program kami menggunakan metode pembelajaran yang teruji dan dikembangkan oleh para ahli pendidikan.",
    color: "#b42519",
  },
  {
    icon: BookOpen,
    title: "Pengajar Berpengalaman",
    desc: "Para pengajar kami adalah profesional berpengalaman dengan latar belakang pendidikan yang kuat.",
    color: "#d2a741",
  },
  {
    icon: Zap,
    title: "Hasil Terukur",
    desc: "Kemajuan belajar siswa selalu dipantau dan dievaluasi secara teratur untuk memastikan hasil yang optimal.",
    color: "#d2a741",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#b42519]">
            Mengapa Memilih Program Kami?
          </h2>
          <p className="text-gray-600">
            Kami memiliki beberapa keunggulan yang menjadikan program kami
            sebagai pilihan terbaik untuk pendidikan anak
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {items.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -4 }}
              >
                <Card className="hover:shadow-xl transition-all duration-300 p-6">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-4 shadow-md"
                    style={{ backgroundColor: item.color }}
                  >
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-[#b42519]">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.desc}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
