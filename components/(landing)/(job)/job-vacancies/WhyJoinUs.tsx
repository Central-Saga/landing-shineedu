"use client";

import { Card } from "@/components/ui/card";
import { Container } from "../../Container";
import { TrendingUp, Users, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  {
    icon: TrendingUp,
    title: "Pengembangan Karir",
    desc: "Kami menawarkan jalur pengembangan karir yang jelas dan kesempatan pelatihan berkelanjutan untuk semua karyawan.",
    className: "bg-[#b42519]",
  },
  {
    icon: Users,
    title: "Tim yang Supportif",
    desc: "Bekerja dalam lingkungan kolaboratif dengan rekan kerja yang bersemangat dan saling mendukung.",
    className: "bg-[#d2a741] border-2 border-[#ad8934]",
  },
  {
    icon: Clock,
    title: "Work-Life Balance",
    desc: "Kami menghargai keseimbangan antara pekerjaan dan kehidupan pribadi dengan menawarkan jadwal yang fleksibel dan kebijakan yang berpihak pada karyawan.",
    className: "bg-[#d2a741]",
  },
];

export function WhyJoinUs() {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#b42519]">
            Mengapa Bergabung dengan Shine Education?
          </h2>
          <p className="text-gray-600">
            Bekerja bersama kami memberikan kesempatan untuk tumbuh dan
            berkembang dalam lingkungan yang mendukung
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {items.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card
                key={index}
                className={cn(
                  "hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6",
                  index === 1 && "hover:shadow-lg"
                )}
              >
                <div
                  className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center mb-4 shadow-md",
                    item.className
                  )}
                >
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#b42519]">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
