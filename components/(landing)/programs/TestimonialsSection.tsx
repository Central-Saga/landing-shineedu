"use client";

import { Card } from "@/components/ui/card";
import { Container } from "../Container";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Budi Santoso",
    role: "Orangtua Siswa",
    text: "Anak saya mengalami peningkatan signifikan dalam kemampuan membaca dan menulis setelah mengikuti program Calistung. Pengajarnya sangat sabar dan metodenya menyenangkan.",
  },
  {
    name: "Dewi Putri",
    role: "Siswa Program Bahasa Inggris",
    text: "Program Bahasa Inggris di sini sangat interaktif dan menyenangkan. Saya merasa lebih percaya diri berbicara dalam Bahasa Inggris sekarang. Gurunya juga sangat ramah.",
  },
  {
    name: "Agus Wijaya",
    role: "Orangtua Siswa",
    text: "Nilai matematika anak saya naik drastis setelah mengikuti program di sini. Terima kasih Shine Education untuk metode yang luar biasa dan memudahkan anak memahami konsep.",
  },
];

function AvatarPlaceholder() {
  return (
    <svg
      className="w-full h-full text-muted-foreground"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#b42519]">
            Apa Kata Mereka?
          </h2>
          <p className="text-gray-600">
            Testimoni dari para siswa dan orangtua yang telah merasakan manfaat
            program kami
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((item, index) => (
            <Card
              key={index}
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6"
            >
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center">
                    <AvatarPlaceholder />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">&quot;{item.text}&quot;</p>
              <div className="flex mt-4 text-[#d2a741]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
