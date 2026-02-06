"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { LandingPageLayout } from "@/components/(landing)/LandingPageLayout";
import { Section } from "@/components/(landing)/Section";
import { Container } from "@/components/(landing)/Container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  fetchPublicProgramHighlighted,
  fetchPublicProgram,
  fetchPublicGallery,
  type Program as ApiProgram,
  type PublicGalleryItem,
} from "@/lib/api";
import {
  GraduationCap,
  BookOpen,
  Star,
  Info,
  CheckCircle,
  ImageIcon,
} from "lucide-react";

const DEFAULT_PROGRAM_IMAGES = [
  "/picprogram/calistung.png",
  "/picprogram/bahasainggris.png",
  "/picprogram/matematika.png",
  "/picprogram/coding.png",
];

interface ProgramCard {
  id: number;
  title: string;
  description: string;
  image: string;
  features: string[];
}

function mapApiProgramToCard(p: ApiProgram): ProgramCard {
  const features =
    Array.isArray(p.fitur) && p.fitur.length > 0
      ? p.fitur
      : p.jenjangs?.map((j) => j.nama) ?? ["Program berkualitas"];
  const imageIndex = (p.id - 1) % DEFAULT_PROGRAM_IMAGES.length;
  const fallbackImage = DEFAULT_PROGRAM_IMAGES[imageIndex >= 0 ? imageIndex : 0];
  const image = p.image?.trim() || fallbackImage;
  return {
    id: p.id,
    title: p.nama,
    description: p.deskripsi ?? "",
    image,
    features: features.length ? features : ["Program berkualitas"],
  };
}

const motionProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const aboutListItems = [
  "Meningkatkan prestasi akademik",
  "Mengembangkan potensi diri",
  "Mempersiapkan untuk ujian",
  "Meningkatkan kemampuan bahasa",
];

const testimonialsHome = [
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

export default function LandingPage() {
  const [programs, setPrograms] = useState<ProgramCard[]>([]);
  const [programsLoading, setProgramsLoading] = useState(true);
  const [galleryItems, setGalleryItems] = useState<PublicGalleryItem[]>([]);

  useEffect(() => {
    let cancelled = false;
    setProgramsLoading(true);
    (async () => {
      try {
        const raw = await fetchPublicProgramHighlighted();
        if (cancelled) return;
        const list = Array.isArray(raw) ? raw : [];
        const active = list.filter(
          (p) => !p.status || p.status === "Aktif"
        ) as ApiProgram[];
        if (active.length > 0) {
          setPrograms(active.map(mapApiProgramToCard));
          toast.success("Program unggulan dimuat");
          return;
        }
        const fallback = await fetchPublicProgram();
        if (cancelled) return;
        const all = Array.isArray(fallback) ? fallback : [];
        const first = all
          .filter((p) => !p.status || p.status === "Aktif")
          .slice(0, 4) as ApiProgram[];
        setPrograms(first.map(mapApiProgramToCard));
        toast.info("Menampilkan daftar program");
      } catch {
        if (!cancelled) {
          setPrograms([]);
          toast.error("Gagal memuat program unggulan");
        }
      } finally {
        if (!cancelled) setProgramsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    fetchPublicGallery().then(setGalleryItems);
  }, []);

  return (
    <LandingPageLayout>
      {/* Hero Section */}
      <Section
        id="hero-section"
        className="min-h-[90vh] flex items-center"
        padding="none"
      >
        <Container className="relative z-10 py-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="lg:w-1/2 text-center lg:text-left lg:pr-8 space-y-6">
              <div className="inline-block">
                <Badge
                  variant="secondary"
                  className="bg-[#b42519] text-white shadow-md inline-flex items-center gap-2 text-base px-5 py-2.5 mb-4 rounded-full"
                >
                  <Star className="h-4 w-4 fill-white" />
                  #1 Bimbel di Tabanan
                  <span className="text-2xl">👋</span>
                </Badge>
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-[#b42519] block">Shine Education</span>
                  <span className="text-[#d2a741] inline-block mt-2">
                    Bimbingan Belajar
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed">
                  Belajar jadi lebih seru! 🚀 Bergabung dengan teman-teman hebat
                  dan guru yang keren. Raih mimpimu dengan cara yang menyenangkan! ✨
                </p>
              </div>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
                <Button
                  size="lg"
                  className="bg-[#b42519] text-white px-8 py-6 rounded-full text-lg font-semibold hover:bg-[#7a160d] shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                  asChild
                >
                  <Link href="/programs">
                    <GraduationCap className="h-5 w-5" />
                    Mulai Belajar
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 rounded-full text-lg font-semibold border-2 border-[#b42519] text-[#b42519] hover:bg-[#b42519] hover:text-white transition-all duration-300 flex items-center gap-2 bg-white"
                  asChild
                >
                  <Link href="/about">
                    <BookOpen className="h-5 w-5" />
                    Pelajari Selengkapnya
                  </Link>
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 flex items-center justify-center">
              <div className="w-full max-w-[600px] relative">
                <div className="absolute inset-0 bg-[#b42519]/5 rounded-4xl blur-2xl transform rotate-6" />
                <div className="relative z-10 rounded-4xl overflow-hidden aspect-3/2">
                  <Image
                    src="/pichome/hero-section3.svg"
                    alt="Students Learning"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Program Section - data dari API */}
      <Section id="program-section">
        <Container className="relative z-10">
          <motion.div
            {...motionProps}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-[#b42519]/10 rounded-lg">
                <BookOpen className="h-6 w-6 text-[#b42519]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#b42519]">
                Program Unggulan Kami
              </h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kami menawarkan berbagai program pendidikan yang dirancang untuk
              memenuhi kebutuhan belajar Anda dengan metode yang menyenangkan dan
              efektif
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programsLoading ? (
              [1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-2xl h-[358px] bg-gray-100 animate-pulse flex items-end p-6"
                >
                  <div className="w-full h-8 bg-gray-200 rounded" />
                </div>
              ))
            ) : programs.length > 0 ? (
              programs.slice(0, 4).map((program) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="group"
                >
                    <div className="relative overflow-hidden rounded-2xl h-[358px] shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      unoptimized={program.image.startsWith("http")}
                      onError={(e) => {
                        const t = e.target as HTMLImageElement;
                        t.style.display = "none";
                        const parent = t.closest(".relative");
                        const fallback = parent?.querySelector(".program-image-fallback");
                        if (fallback) (fallback as HTMLElement).classList.remove("hidden");
                      }}
                    />
                    <div className="program-image-fallback hidden absolute inset-0 bg-[#b42519]/20 flex items-center justify-center">
                      <span className="text-4xl font-bold text-[#b42519] opacity-80">
                        {program.title.slice(0, 1)}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10">
                        <h3 className="text-2xl md:text-xl font-bold text-white mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {program.title}
                        </h3>
                        <p className="text-sm text-gray-100 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 line-clamp-3">
                          {program.description || "Program pendidikan berkualitas."}
                        </p>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150 space-y-2 mb-4">
                          {program.features.slice(0, 2).map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <span className="text-[#fbbf24] font-bold">•</span>
                              <span className="text-xs text-gray-100">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                        <Link
                          href="/programs"
                          className="w-full px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#b42519] hover:bg-[#8a1a13] transition-all duration-300 opacity-0 group-hover:opacity-100 transform group-hover:scale-100 scale-95 inline-flex items-center justify-center"
                        >
                          Pelajari Lebih Lanjut
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              [1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-2xl h-[358px] bg-gray-100 animate-pulse flex items-end p-6"
                >
                  <div className="w-full h-8 bg-gray-200 rounded" />
                </div>
              ))
            )}
          </div>
        </Container>
      </Section>

      {/* About Section */}
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
              <div className="relative rounded-3xl overflow-hidden shadow-xl w-full aspect-4/3">
                <Image
                  src="/pichome/hero-section.JPG"
                  alt="Students Learning"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
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
                {aboutListItems.map((item, index) => (
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

      {/* Galeri aktivitas belajar-mengajar */}
      <Section id="galeri-section">
        <Container className="relative z-10">
          <motion.div {...motionProps} className="text-center mb-8 space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-[#b42519]/10 rounded-lg">
                <ImageIcon className="h-6 w-6 text-[#b42519]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#b42519]">
                Galeri Foto & Video Aktivitas Belajar-Mengajar
              </h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Lihat momen seru kegiatan belajar siswa dan suasana kelas di Shine Education.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {galleryItems.slice(0, 6).map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-gray-50"
              >
                <Image
                  src={item.image_url}
                  alt={item.alt ?? item.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  unoptimized={item.image_url.startsWith("http")}
                />
                {item.title && (
                  <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-3">
                    <p className="text-sm font-medium text-white truncate">{item.title}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          {galleryItems.length > 0 && (
            <div className="text-center">
              <Button asChild size="lg" className="bg-[#b42519] hover:bg-[#7a160d] text-white">
                <Link href="/gallery">Lihat Semua Galeri</Link>
              </Button>
            </div>
          )}
          {galleryItems.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p className="mb-4">Galeri akan segera tersedia.</p>
              <Button asChild variant="outline" size="lg" className="border-[#b42519] text-[#b42519]">
                <Link href="/gallery">Halaman Galeri</Link>
              </Button>
            </div>
          )}
        </Container>
      </Section>

      {/* Testimoni siswa/orang tua */}
      <Section id="testimoni-section">
        <Container className="relative z-10">
          <motion.div {...motionProps} className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-[#b42519]">
              Apa Kata Mereka?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Testimoni dari para siswa dan orangtua yang telah merasakan manfaat program kami.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonialsHome.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-[#b42519] font-bold text-lg mr-4">
                      {item.name.slice(0, 1)}
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
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </LandingPageLayout>
  );
}
