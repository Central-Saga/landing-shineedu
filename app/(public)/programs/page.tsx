"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/landing/sections/Navbar";
import Footer from "@/components/landing/sections/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Shield, BookOpen, Zap, Star } from "lucide-react";
import { programData } from "@/data/landing/programs";
import { LightBackground } from "@/components/animations/BackgroundAnimations";
import { Container } from "@/components/landing/Container";

export default function ProgramsPage() {
  const [selectedProgram, setSelectedProgram] = useState<number | null>(null);
  const whatsappNumber = "6281237522400";
  const selectedProgramData = selectedProgram
    ? programData.find((program) => program.id === selectedProgram)
    : null;
  const programMention = selectedProgramData?.title
    ? `program ${selectedProgramData.title}`
    : "program kami";
  const buildWhatsappUrl = (message: string) =>
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  const registrationMessage =
    `saya ingin mendaftar untuk ${programMention},\n\n` +
    "nama:\nemail:\nno hp:\njenjang:\nprogram:\ntanggal lahir:\nalamat:";
  const infoMessage =
    `halllo ms shine, diisini saya ingin bertanya tentang ${programMention}`;
  const ctaInfoMessage =
    "Halo 👋\n" +
    "Saya ingin bertanya lebih lanjut tentang program di Shine Education.\n\n" +
    "Mohon dibantu informasi terkait program, jadwal, dan sistem pembelajarannya ya.\n\n" +
    "Terima kasih 🙏";
  const ctaRegistrationMessage =
    "Halo 👋\n" +
    "Saya tertarik untuk mendaftarkan putra/putri saya di program Shine Education.\n\n" +
    "Mohon informasi lebih lanjut mengenai:\n" +
    "• Program yang tersedia\n" +
    "• Jadwal belajar\n" +
    "• Biaya & cara pendaftaran\n\n" +
    "Terima kasih 🙏";

  return (
    <main className="min-h-screen relative bg-white">
      <LightBackground />

      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-white relative z-10">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-[#b42519]">
                Program Unggulan
              </span> <span className="text-[#d2a741]">Kami</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Shine Education menyediakan beragam program pendidikan berkualitas untuk membantu siswa mencapai potensi terbaik mereka.
            </p>
            <div className="w-24 h-1 bg-[#b42519] mx-auto mb-10"></div>
          </motion.div>
        </Container>
      </section>

      {/* Programs Grid */}
      <section className="py-8 relative overflow-hidden bg-white">
        <Container className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {programData.map((program) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -4 }}
              >
                <Card
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0"
                >
                  <div className="relative h-48 overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0">
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                    <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white z-10 drop-shadow-lg">
                      {program.title}
                    </h3>
                  </div>
                  <CardContent className="p-6 relative z-10 bg-white">
                    <p className="text-gray-700 mb-4 font-medium">{program.description}</p>
                    <ul className="space-y-2 mb-6">
                      {program.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <span className="mr-2 text-[#b42519] font-bold">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={() => setSelectedProgram(program.id)}
                      className="w-full bg-[#b42519] hover:bg-[#7a160d] text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-full"
                    >
                      Detail Program
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#b42519]">
              Mengapa Memilih Program Kami?
            </h2>
            <p className="text-gray-600">
              Kami memiliki beberapa keunggulan yang menjadikan program kami sebagai pilihan terbaik untuk pendidikan anak
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Shield, title: "Metode Teruji", desc: "Program kami menggunakan metode pembelajaran yang teruji dan dikembangkan oleh para ahli pendidikan.", color: "#b42519" },
              { icon: BookOpen, title: "Pengajar Berpengalaman", desc: "Para pengajar kami adalah profesional berpengalaman dengan latar belakang pendidikan yang kuat.", color: "#d2a741" },
              { icon: Zap, title: "Hasil Terukur", desc: "Kemajuan belajar siswa selalu dipantau dan dievaluasi secara teratur untuk memastikan hasil yang optimal.", color: "#d2a741" }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -4 }}
                >
                  <Card className="hover:shadow-xl transition-all duration-300 p-6">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center mb-4 shadow-md"
                      style={{ backgroundColor: item.color }}
                    >
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-[#b42519]">{item.title}</h3>
                    <p className="text-gray-600">
                      {item.desc}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-white">
        <Container>
          <div className="max-w-5xl mx-auto bg-[#b42519] rounded-2xl p-8 md:p-12 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Siap Bergabung Dengan Program Kami?
                </h2>
                <p className="text-white/90 mb-6">
                  Daftarkan putra-putri Anda sekarang dan rasakan manfaat dari program pendidikan berkualitas kami.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild className="bg-white text-[#b42519] hover:bg-gray-100">
                    <a
                      href={buildWhatsappUrl(ctaRegistrationMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Daftar Sekarang
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="bg-transparent border-2 border-white text-white hover:bg-white/10"
                  >
                    <a
                      href={buildWhatsappUrl(ctaInfoMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Hubungi Kami
                    </a>
                  </Button>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="relative h-64">
                  <div className="absolute inset-0 bg-white/10 rounded-lg overflow-hidden">
                    <div className="p-6 h-full flex items-center justify-center">
                      <div className="text-center">
                        <Star className="w-16 h-16 mx-auto text-white opacity-80" />
                        <h3 className="text-xl font-bold text-white mt-4">Jadwal Fleksibel</h3>
                        <p className="text-white/80 mt-2">Tersedia pilihan jadwal pagi, siang, dan sore untuk menyesuaikan kebutuhan Anda.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#b42519]">
              Apa Kata Mereka?
            </h2>
            <p className="text-gray-600">
              Testimoni dari para siswa dan orangtua yang telah merasakan manfaat program kami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center">
                    <svg className="w-full h-full text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Budi Santoso</h4>
                  <p className="text-sm text-gray-500">Orangtua Siswa</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                &quot;Anak saya mengalami peningkatan signifikan dalam kemampuan membaca dan menulis setelah mengikuti program Calistung. Pengajarnya sangat sabar dan metodenya menyenangkan.&quot;
              </p>
              <div className="flex mt-4 text-[#d2a741]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center">
                    <svg className="w-full h-full text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Dewi Putri</h4>
                  <p className="text-sm text-gray-500">Siswa Program Bahasa Inggris</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                &quot;Program Bahasa Inggris di sini sangat interaktif dan menyenangkan. Saya merasa lebih percaya diri berbicara dalam Bahasa Inggris sekarang. Gurunya juga sangat ramah.&quot;
              </p>
              <div className="flex mt-4 text-[#d2a741]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center">
                    <svg className="w-full h-full text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Agus Wijaya</h4>
                  <p className="text-sm text-gray-500">Orangtua Siswa</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                &quot;Nilai matematika anak saya naik drastis setelah mengikuti program di sini. Terima kasih Shine Education untuk metode yang luar biasa dan memudahkan anak memahami konsep.&quot;
              </p>
              <div className="flex mt-4 text-[#d2a741]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Program Detail Modal */}
      {
        selectedProgram && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold">
                    {selectedProgramData?.title}
                  </h2>
                  <button
                    onClick={() => setSelectedProgram(null)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="mt-6">
                  <div className="relative h-64 rounded-lg overflow-hidden mb-6 flex items-center justify-center">
                    <div className="absolute inset-0">
                      <Image
                        src={selectedProgramData?.image || ""}
                        alt={selectedProgramData?.title || ""}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 672px"
                      />
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-2 text-[#b42519]">Deskripsi Program</h3>
                  <p className="text-gray-600 mb-4">
                    {selectedProgramData?.description}
                  </p>

                  <h3 className="text-lg font-semibold mb-2 text-[#b42519]">Fitur Program</h3>
                  <ul className="space-y-2 mb-6">
                    {selectedProgramData?.features?.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="mr-2 text-[#b42519]">✓</span>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-lg font-semibold mb-2 text-[#b42519]">Jadwal dan Biaya</h3>
                  <p className="text-gray-600 mb-6">
                    Untuk informasi lebih lanjut mengenai jadwal dan biaya program, silahkan menghubungi kami melalui kontak yang tersedia.
                  </p>

                  <div className="flex gap-4">
                    <Button
                      asChild
                      className="bg-[#b42519] hover:bg-[#7a160d] text-white shadow-md"
                    >
                      <a
                        href={buildWhatsappUrl(registrationMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Daftar Program
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="border-[#b42519] text-[#b42519] hover:bg-[#b42519] hover:text-white"
                    >
                      <a
                        href={buildWhatsappUrl(infoMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Tanyakan Info
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      <Footer />
    </main>
  );
}
