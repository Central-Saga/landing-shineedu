"use client";

import { Card } from "@/components/ui/card";
import { Container } from "../Container";
import { Star, CheckCircle2 } from "lucide-react";

const visionText =
  "Sebagai Lembaga Kursus yang unggul di Tingkat Nasional dan menyelaraskan kualitas yang handal sesuai dengan kebutuhan peserta didik serta terus aktif dalam mencerdaskan kehidupan bangsa dan menciptakan generasi emas.";

const missionItems = [
  "Menjadi Lembaga Kursus terbaik dan dipercaya oleh masyarakat.",
  "Meningkatkan daya serap lulusan dan berdaya saing tinggi.",
  "Mengintegrasikan pendidikan dan pelatihan dalam pengembangan keterampilan.",
  "Mengintegrasikan teknologi dalam proses pembelajaran untuk hasil yang lebih maksimal.",
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
