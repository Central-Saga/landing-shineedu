"use client";

import { motion } from "framer-motion";
import { Container } from "../Container";

/** Item dari API (image_url, title/alt) atau fallback lokal (src). */
interface GalleryItem {
  id: number;
  src?: string;
  alt?: string;
  title?: string;
  image_url?: string;
}

interface GalleryGridProps {
  items: GalleryItem[];
}

export function GalleryGrid({ items }: GalleryGridProps) {
  return (
    <section className="pb-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center"
        >
          {items.map((item) => {
            const imgSrc = item.image_url ?? item.src ?? "";
            const alt = item.alt ?? item.title ?? "";
            if (!imgSrc) return null;
            return (
              <div key={item.id} className="w-full max-w-[392px]">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-gray-50">
                  <img
                    src={imgSrc}
                    alt={alt}
                    className="object-cover w-full h-full"
                    sizes="(max-width: 640px) 100vw, 392px"
                  />
                </div>
                <p className="mt-3 text-sm text-gray-600 text-center">
                  {alt}
                </p>
              </div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
