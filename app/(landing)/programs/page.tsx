"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { LandingPageLayout } from "@/components/(landing)/LandingPageLayout";
import { Section } from "@/components/(landing)/Section";
import { Container } from "@/components/(landing)/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchPublicProgram, type Program as ApiProgram } from "@/lib/api";
import { Star, Shield, BookOpen, Zap, X } from "lucide-react";

/** Shape tampilan program (dari API). */
interface ProgramDisplay {
  id: number;
  title: string;
  description: string;
  image: string;
  features: string[];
  jenjangs: string[];
}

const WHATSAPP_NUMBER = "6281237522400";
const CTA_REGISTRATION_MESSAGE =
  "Halo 👋\n" +
  "Saya tertarik untuk mendaftarkan putra/putri saya di program Shine Education.\n\n" +
  "Mohon informasi lebih lanjut mengenai:\n" +
  "• Program yang tersedia\n" +
  "• Jadwal belajar\n" +
  "• Biaya & cara pendaftaran\n\n" +
  "Terima kasih 🙏";
const CTA_INFO_MESSAGE =
  "Halo 👋\n" +
  "Saya ingin bertanya lebih lanjut tentang program di Shine Education.\n\n" +
  "Mohon dibantu informasi terkait program, jadwal, dan sistem pembelajarannya ya.\n\n" +
  "Terima kasih 🙏";

const DEFAULT_PROGRAM_IMAGES = [
  "/picprogram/calistung.png",
  "/picprogram/bahasainggris.png",
  "/picprogram/matematika.png",
  "/picprogram/coding.png",
];

/** Map response API ke shape tampilan (image & fitur dari API, fallback ke default). */
function mapApiProgramToUI(p: ApiProgram): ProgramDisplay {
  const features =
    Array.isArray(p.fitur) && p.fitur.length > 0
      ? p.fitur
      : p.jenjangs?.map((j) => `Jenjang: ${j.nama}`) ?? ["Program berkualitas"];
  const imageIndex = (p.id - 1) % DEFAULT_PROGRAM_IMAGES.length;
  const fallbackImage = DEFAULT_PROGRAM_IMAGES[imageIndex >= 0 ? imageIndex : 0];
  const image = p.image?.trim() || fallbackImage;
  const jenjangs = p.jenjangs?.map((j) => j.nama) ?? [];
  return {
    id: p.id,
    title: p.nama,
    description: p.deskripsi ?? "",
    image,
    features: features.length ? features : ["Program berkualitas"],
    jenjangs,
  };
}

function buildWhatsappUrl(phone: string, message: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

const whyChooseItems = [
  {
    icon: Shield,
    title: "Metode Teruji",
    desc: "Program kami menggunakan metode pembelajaran yang teruji dan dikembangkan oleh para ahli pendidikan.",
    color: "#b42519",
  },
  {
    icon: BookOpen,
    title: "Pengajar Berpengalaman",
    desc: "Para pengajar kami adalah profesional berpengalaman dengan latar belakang pendidikan yang kuat.",
    color: "#d2a741",
  },
  {
    icon: Zap,
    title: "Hasil Terukur",
    desc: "Kemajuan belajar siswa selalu dipantau dan dievaluasi secara teratur untuk memastikan hasil yang optimal.",
    color: "#d2a741",
  },
];

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

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<ProgramDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("Semua");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchPublicProgram()
      .then((raw) => {
        if (cancelled) return;
        const list = Array.isArray(raw) ? raw : [];
        const active = list.filter(
          (p) => !p.status || p.status === "Aktif"
        ) as ApiProgram[];
        setPrograms(active.map(mapApiProgramToUI));
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Gagal memuat program");
          setPrograms([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const selectedProgramData = selectedProgram
    ? programs.find((p) => p.id === selectedProgram) ?? null
    : null;
  const programMention = selectedProgramData?.title
    ? `program ${selectedProgramData.title}`
    : "program kami";
  const registrationMessage =
    `saya ingin mendaftar untuk ${programMention},\n\n` +
    "nama:\nemail:\nno hp:\njenjang:\nprogram:\ntanggal lahir:\nalamat:";

  return (
    <LandingPageLayout>
      {/* Hero */}
      <Section padding="lg" className="pt-24 md:pt-32">
        <Container maxWidth="7xl" className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-[#b42519]">Program</span>{" "}
              <span className="text-[#d2a741]">Kami</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Shine Education menyediakan beragam program pendidikan berkualitas
              untuk membantu siswa mencapai potensi terbaik mereka.
            </p>
            <div className="w-24 h-1 bg-[#b42519] mx-auto mb-10" />
          </motion.div>
        </Container>
      </Section>

      {/* Grid Program (data dari API) */}
      <Section className="relative overflow-hidden">
        <Container maxWidth="7xl" className="relative z-10">
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-700 text-center">
              {error}
            </div>
          )}
          {loading && programs.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden border-0 animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-4" />
                    <div className="h-3 bg-gray-200 rounded mb-2 w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <>
              {programs.length > 0 && (
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                  {["Semua", ...Array.from(new Set(programs.flatMap((p) => p.jenjangs)))].map((cat) => (
                    <Button
                      key={cat}
                      variant="outline"
                      onClick={() => setActiveCategory(cat)}
                      className={
                        activeCategory === cat
                          ? "bg-[#b42519] hover:bg-[#7a160d] text-white border-transparent"
                          : "text-gray-600 border-gray-300 hover:border-[#b42519] hover:text-[#b42519]"
                      }
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {(activeCategory === "Semua" ? programs : programs.filter(p => p.jenjangs.includes(activeCategory))).map((program) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -4 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0">
                    <div className="relative h-48 overflow-hidden flex items-center justify-center bg-gray-100">
                      <div className="absolute inset-0">
                        <Image
                          src={program.image}
                          alt={program.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          onError={(e) => {
                            const t = e.target as HTMLImageElement;
                            t.style.display = "none";
                          }}
                        />
                      </div>
                      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/20 to-transparent" />
                      <h3 className="absolute bottom-4 left-4 right-4 text-xl font-bold text-white z-10 drop-shadow-lg">
                        {program.title}
                      </h3>
                    </div>
                    <CardContent className="p-6 relative z-10 bg-white">
                      <p className="text-gray-700 mb-4 font-medium line-clamp-3">
                        {program.description || "Program pendidikan berkualitas dari Shine Education."}
                      </p>
                      <ul className="space-y-2 mb-6">
                        {program.features.slice(0, 4).map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center text-sm text-gray-600"
                          >
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
              {activeCategory !== "Semua" && programs.filter(p => p.jenjangs.includes(activeCategory)).length === 0 && (
                <p className="text-center text-gray-500 py-8 col-span-full">
                  Belum ada program untuk kategori {activeCategory}.
                </p>
              )}
            </div>
            </>
          )}
          {!loading && programs.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              Belum ada program tersedia saat ini.
            </p>
          )}
        </Container>
      </Section>

      {/* Why Choose Us */}
      <Section>
        <Container maxWidth="7xl">
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
              Kami memiliki beberapa keunggulan yang menjadikan program kami
              sebagai pilihan terbaik untuk pendidikan anak
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {whyChooseItems.map((item, index) => {
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
                    <h3 className="text-xl font-semibold mb-3 text-[#b42519]">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section>
        <Container maxWidth="7xl">
          <div className="max-w-5xl mx-auto bg-[#b42519] rounded-2xl p-8 md:p-12 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Siap Bergabung Dengan Program Kami?
                </h2>
                <p className="text-white/90 mb-6">
                  Daftarkan putra-putri Anda sekarang dan rasakan manfaat dari
                  program pendidikan berkualitas kami.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    asChild
                    className="bg-white text-[#b42519] hover:bg-gray-100"
                  >
                    <a
                      href={buildWhatsappUrl(
                        WHATSAPP_NUMBER,
                        CTA_REGISTRATION_MESSAGE
                      )}
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
                      href={buildWhatsappUrl(WHATSAPP_NUMBER, CTA_INFO_MESSAGE)}
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
                        <h3 className="text-xl font-bold text-white mt-4">
                          Jadwal Fleksibel
                        </h3>
                        <p className="text-white/80 mt-2">
                          Tersedia pilihan jadwal pagi, siang, dan sore untuk
                          menyesuaikan kebutuhan Anda.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section>
        <Container maxWidth="7xl">
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
      </Section>

      {/* Modal Detail Program */}
      {selectedProgram !== null && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold">
                  {selectedProgramData?.title}
                </h2>
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  type="button"
                  aria-label="Tutup"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="mt-6">
                <div className="relative h-64 rounded-lg overflow-hidden mb-6 flex items-center justify-center bg-gray-100">
                  <div className="absolute inset-0">
                    <Image
                      src={selectedProgramData?.image ?? ""}
                      alt={selectedProgramData?.title ?? ""}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 672px"
                      onError={(e) => {
                        const t = e.target as HTMLImageElement;
                        t.style.display = "none";
                      }}
                    />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-[#b42519]">
                  Deskripsi Program
                </h3>
                <p className="text-gray-600 mb-4">
                  {selectedProgramData?.description ||
                    "Program pendidikan berkualitas dari Shine Education. Hubungi kami untuk detail jadwal dan biaya."}
                </p>
                <h3 className="text-lg font-semibold mb-2 text-[#b42519]">
                  Fitur / Jenjang
                </h3>
                <ul className="space-y-2 mb-6">
                  {selectedProgramData?.features?.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="mr-2 text-[#b42519]">✓</span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <h3 className="text-lg font-semibold mb-2 text-[#b42519]">
                  Jadwal dan Biaya
                </h3>
                <p className="text-gray-600 mb-6">
                  Untuk informasi lebih lanjut mengenai jadwal dan biaya program,
                  silahkan menghubungi kami melalui kontak yang tersedia.
                </p>
                <div className="flex gap-4">
                  <Button
                    asChild
                    className="bg-[#b42519] hover:bg-[#7a160d] text-white shadow-md"
                  >
                    <Link
                      href={
                        selectedProgram
                          ? `/programs/daftar?programId=${selectedProgram}`
                          : "/programs/daftar"
                      }
                    >
                      Daftar Program
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-[#b42519] text-[#b42519] hover:bg-[#b42519] hover:text-white"
                  >
                    <a
                      href={buildWhatsappUrl(WHATSAPP_NUMBER, registrationMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Hubungi via WA
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </LandingPageLayout>
  );
}
