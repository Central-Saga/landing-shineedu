"use client";

import { Button } from "@/components/ui/button";
import { Container } from "../Container";
import { Star } from "lucide-react";

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

interface ProgramsCtaProps {
  whatsappNumber: string;
}

function buildWhatsappUrl(phone: string, message: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function ProgramsCta({ whatsappNumber }: ProgramsCtaProps) {
  return (
    <section className="py-16 md:py-20 bg-white">
      <Container>
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
                      whatsappNumber,
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
                    href={buildWhatsappUrl(whatsappNumber, CTA_INFO_MESSAGE)}
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
    </section>
  );
}
