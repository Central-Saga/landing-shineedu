"use client";

import { Button } from "@/components/ui/button";
import { Container } from "../Container";

export function AboutCta() {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="max-w-5xl mx-auto bg-[#b42519] rounded-2xl p-8 md:p-12 shadow-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Hubungi Kami
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Tertarik untuk mengetahui lebih lanjut tentang Shine Education?
            Jangan ragu untuk menghubungi kami untuk informasi lebih detail.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-white text-[#b42519] hover:bg-gray-100">
              Hubungi Kami
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10"
            >
              Kunjungi Kami
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
