"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Container } from "../Container";

export function BlogsNewsletter() {
  return (
    <section className="py-16 bg-white mt-12">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-[#b42519]">
            Dapatkan Artikel Terbaru
          </h2>
          <p className="text-gray-600 mb-6">
            Berlangganan newsletter kami untuk mendapatkan update artikel, tips
            pendidikan, dan informasi program terbaru dari Shine Education.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Alamat email Anda"
              className="rounded-full"
            />
            <Button
              type="button"
              className="bg-[#b42519] text-white rounded-full hover:bg-[#7a160d] min-w-[120px] shadow-md"
            >
              Langganan
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
