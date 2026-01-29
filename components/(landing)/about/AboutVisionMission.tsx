"use client";

import { Card } from "@/components/ui/card";
import { Container } from "../Container";
import { Star, CheckCircle2 } from "lucide-react";

const visionText =
  "Menjadi institusi pendidikan terdepan yang menghasilkan generasi unggul, kreatif, dan berkarakter, yang siap menghadapi tantangan global melalui pendekatan pembelajaran yang inovatif dan menyenangkan.";

const missionItems = [
  "Menyelenggarakan program pendidikan berkualitas yang disesuaikan dengan kebutuhan dan minat siswa.",
  "Membangun lingkungan belajar yang kondusif, inspiratif, dan menyenangkan.",
  "Mengembangkan metode pembelajaran inovatif yang memadukan pendekatan tradisional dan modern.",
  "Membina karakter dan nilai-nilai positif dalam diri setiap siswa.",
  "Menjalin kerjasama dengan orangtua dan komunitas untuk mendukung perkembangan siswa.",
];

export function AboutVisionMission() {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#b42519]">
            Visi & Misi
          </h2>
          <p className="text-gray-600">
            Landasan dan tujuan yang memandu setiap langkah kami dalam
            memberikan layanan pendidikan terbaik
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-8">
            <div className="w-16 h-16 rounded-full bg-[#b42519] flex items-center justify-center mb-6 shadow-md">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-[#b42519]">Visi</h3>
            <p className="text-gray-600">{visionText}</p>
          </Card>
          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-8">
            <div className="w-16 h-16 rounded-full bg-[#d2a741] flex items-center justify-center mb-6 shadow-md">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-[#b42519]">Misi</h3>
            <ul className="space-y-2 text-gray-600">
              {missionItems.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span
                    className={
                      i === 0 ? "text-[#d2a741] mr-2" : "text-[#DAA625] mr-2"
                    }
                  >
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Container>
    </section>
  );
}
