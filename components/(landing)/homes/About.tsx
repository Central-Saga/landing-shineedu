"use client";

import Image from "next/image";
import { Info, CheckCircle } from "lucide-react";
import { Section } from "../Section";
import { Container } from "../Container";

const About = () => {
  const listItems = [
    "Meningkatkan prestasi akademik",
    "Mengembangkan potensi diri",
    "Mempersiapkan untuk ujian",
    "Meningkatkan kemampuan bahasa",
  ];

  return (
    <Section>
      <Container className="relative z-10">
        <div className="text-center mb-12 space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-[#b42519] rounded-xl shadow-md">
              <Info className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#b42519]">
              Tentang Kami
            </h2>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 max-w-6xl mx-auto">
          <div className="md:w-1/2 relative flex items-center justify-center w-full">
            <div className="absolute -inset-4 bg-[#b42519]/10 rounded-3xl blur-2xl opacity-50" />
            <div className="relative rounded-3xl overflow-hidden shadow-xl w-full aspect-[4/3]">
              <div className="absolute inset-0">
                <Image
                  src="/pichome/hero-section.jpg"
                  alt="Students Learning"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 space-y-6">
            <div>
              <h3 className="text-3xl font-semibold mb-4 text-[#b42519]">
                Shine Education
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Shine Education adalah lembaga pendidikan di Tabanan yang
                mengutamakan kursus dan bimbingan belajar dalam semua jenjang
                pendidikan. Dengan pengajar yang berkualitas dan metode
                pembelajaran yang efektif, kami membantu siswa untuk:
              </p>
            </div>
            
            <div className="space-y-4">
              {listItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-default group"
                >
                  <div className="p-2.5 bg-[#b42519] rounded-full group-hover:scale-105 transition-transform shadow-md">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-600 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default About;
