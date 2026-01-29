"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/(landing)/homes/Navbar";
import Footer from "@/components/(landing)/homes/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle2 } from "lucide-react";
import { teamMembers, milestones } from "@/data/landing/about";
import { LightBackground } from "@/components/animations/BackgroundAnimations";
import { Container } from "@/components/(landing)/Container";

export default function AboutPage() {

  return (
    <main className="min-h-screen relative bg-white">
      <LightBackground />

      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-[#b42519]">
                Tentang
              </span> <span className="text-[#d2a741]">Kami</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Mengenal lebih dekat Shine Education dan perjalanan kami dalam mencerdaskan generasi penerus bangsa.
            </p>
            <div className="w-24 h-1 bg-primary mx-auto mb-10"></div>
          </motion.div>
        </Container>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="flex items-center justify-center">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/pichome/hero-section.JPG"
                  alt="Shine Education Story"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#b42519]">
                Cerita Kami
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Shine Education didirikan pada tahun 2018 dengan visi untuk menghadirkan pendidikan berkualitas yang dapat diakses oleh semua kalangan. Berawal dari sebuah ruangan kecil di Denpasar dengan hanya 15 siswa, kini kami telah berkembang menjadi institusi pendidikan yang dipercaya oleh ratusan keluarga di Bali.
                </p>
                <p>
                  Filosofi pendidikan kami berlandaskan pada keyakinan bahwa setiap anak memiliki potensi unik yang perlu dieksplorasi dan dikembangkan. Kami tidak hanya fokus pada pencapaian akademik, tetapi juga pembentukan karakter dan keterampilan hidup yang esensial.
                </p>
                <p>
                  Nama &quot;Shine&quot; dipilih karena kami percaya bahwa pendidikan adalah cahaya yang dapat menerangi masa depan. Melalui program-program inovatif dan pendekatan pembelajaran yang menyenangkan, kami berusaha membantu setiap siswa untuk bersinar dengan potensi terbaik mereka.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#b42519]">
              Visi & Misi
            </h2>
            <p className="text-gray-600">
              Landasan dan tujuan yang memandu setiap langkah kami dalam memberikan layanan pendidikan terbaik
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-8">
              <div className="w-16 h-16 rounded-full bg-[#b42519] flex items-center justify-center mb-6 shadow-md">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#b42519]">Visi</h3>
              <p className="text-gray-600">
                Menjadi institusi pendidikan terdepan yang menghasilkan generasi unggul, kreatif, dan berkarakter, yang siap menghadapi tantangan global melalui pendekatan pembelajaran yang inovatif dan menyenangkan.
              </p>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-8">
              <div className="w-16 h-16 rounded-full bg-[#d2a741] flex items-center justify-center mb-6 shadow-md">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#b42519]">Misi</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#d2a741] mr-2">•</span>
                  <span>Menyelenggarakan program pendidikan berkualitas yang disesuaikan dengan kebutuhan dan minat siswa.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#DAA625] mr-2">•</span>
                  <span>Membangun lingkungan belajar yang kondusif, inspiratif, dan menyenangkan.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#DAA625] mr-2">•</span>
                  <span>Mengembangkan metode pembelajaran inovatif yang memadukan pendekatan tradisional dan modern.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#DAA625] mr-2">•</span>
                  <span>Membina karakter dan nilai-nilai positif dalam diri setiap siswa.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#DAA625] mr-2">•</span>
                  <span>Menjalin kerjasama dengan orangtua dan komunitas untuk mendukung perkembangan siswa.</span>
                </li>
              </ul>
            </Card>
          </div>
        </Container>
      </section>

      {/* Our Team Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#b42519]">
              Tim Kami
            </h2>
            <p className="text-gray-600">
              Kenali para profesional berdedikasi yang bekerja keras di balik layar untuk memberikan pendidikan terbaik
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-64">
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <svg className="w-24 h-24 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#d2a741] font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600">
                    {member.bio}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Our Journey Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#b42519]">
              Perjalanan Kami
            </h2>
            <p className="text-gray-600">
              Jejak langkah kami dalam membangun dan mengembangkan Shine Education hingga saat ini
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 md:left-1/2 ml-4 md:ml-0 transform md:-translate-x-1/2 h-full w-0.5 bg-[#b42519]"></div>

              {/* Timeline Items */}
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`relative flex flex-col ${index % 2 === 0
                      ? 'md:flex-row'
                      : 'md:flex-row-reverse'
                      } md:gap-8 items-start`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-0 md:left-1/2 ml-4 md:ml-0 transform md:-translate-x-1/2 w-8 h-8 bg-white rounded-full border-4 border-[#b42519] z-10"></div>

                    {/* Year */}
                    <div className={`pl-12 md:pl-0 md:w-1/2 ${index % 2 === 0
                      ? 'md:text-right md:pr-8'
                      : 'md:text-left md:pl-8'
                      }`}>
                      <span className={`inline-block px-4 py-1 text-white font-bold rounded-full mb-2 shadow-lg ${index % 2 === 0 ? 'bg-[#b42519] hover:bg-[#7a160d]' : 'bg-[#d2a741] hover:bg-[#ad8934]'
                        } transition-colors`}>
                        {milestone.year}
                      </span>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">
                        {milestone.description}
                      </p>
                    </div>

                    {/* Empty Space for Alignment */}
                    <div className="md:w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-5xl mx-auto bg-[#b42519] rounded-2xl p-8 md:p-12 shadow-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Hubungi Kami
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Tertarik untuk mengetahui lebih lanjut tentang Shine Education? Jangan ragu untuk menghubungi kami untuk informasi lebih detail.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-white text-[#b42519] hover:bg-gray-100">
                Hubungi Kami
              </Button>
              <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10">
                Kunjungi Kami
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
