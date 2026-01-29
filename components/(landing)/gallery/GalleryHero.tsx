"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { Container } from "../Container";

export function GalleryHero() {
  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
        >
          <div className="space-y-6">
            <Badge
              variant="secondary"
              className="bg-[#b42519] text-white shadow-md inline-flex items-center gap-2 text-base px-5 py-2.5 rounded-full"
            >
              <Sparkles className="h-4 w-4 text-white" />
              Galeri Shine Education
            </Badge>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-[#b42519] block">Momen Belajar</span>
                <span className="text-[#d2a741] inline-block mt-2">
                  Yang Penuh Cerita
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed">
                Kumpulan dokumentasi kegiatan belajar, kelas kreatif, dan
                suasana seru di Shine Education. Semua dibuat konsisten, hangat,
                dan penuh semangat.
              </p>
            </div>
          </div>
          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute -inset-4 bg-[#b42519]/10 rounded-[2rem] blur-2xl" />
            <div className="relative w-full max-w-[420px] rounded-[2rem] overflow-hidden border border-[#b42519]/10 bg-white shadow-xl">
              <div className="relative w-full aspect-[9/16]">
                <iframe
                  src="https://www.instagram.com/reel/DThovDdkUo1/embed"
                  title="Instagram Reel Shine Education"
                  className="absolute inset-0 h-full w-full"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <div className="px-4 py-3 border-t border-gray-100 text-sm text-gray-500 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#d2a741]" />
                Cuplikan kegiatan terbaru dari Instagram
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
