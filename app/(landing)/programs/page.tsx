"use client";

import { useState } from "react";
import Navbar from "@/components/(landing)/homes/Navbar";
import Footer from "@/components/(landing)/homes/Footer";
import { LightBackground } from "@/components/animations/BackgroundAnimations";
import {
  ProgramsHero,
  ProgramsGrid,
  WhyChooseUs,
  ProgramsCta,
  TestimonialsSection,
  ProgramDetailModal,
} from "@/components/(landing)/programs";
import { programData } from "@/data/landing/programs";

const WHATSAPP_NUMBER = "6281237522400";

export default function ProgramsPage() {
  const [selectedProgram, setSelectedProgram] = useState<number | null>(null);
  const selectedProgramData = selectedProgram
    ? programData.find((program) => program.id === selectedProgram)
    : null;
  const programMention = selectedProgramData?.title
    ? `program ${selectedProgramData.title}`
    : "program kami";
  const registrationMessage =
    `saya ingin mendaftar untuk ${programMention},\n\n` +
    "nama:\nemail:\nno hp:\njenjang:\nprogram:\ntanggal lahir:\nalamat:";
  const hubungiWaMessage = registrationMessage;

  const buildWhatsappUrl = (message: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <main className="min-h-screen relative bg-white">
      <LightBackground />
      <Navbar />

      <ProgramsHero />
      <ProgramsGrid
        programData={programData}
        onSelectProgram={setSelectedProgram}
      />
      <WhyChooseUs />
      <ProgramsCta whatsappNumber={WHATSAPP_NUMBER} />
      <TestimonialsSection />

      {selectedProgram !== null && (
        <ProgramDetailModal
          selectedProgram={selectedProgram}
          selectedProgramData={selectedProgramData ?? null}
          onClose={() => setSelectedProgram(null)}
          buildWhatsappUrl={buildWhatsappUrl}
          hubungiWaMessage={hubungiWaMessage}
        />
      )}

      <Footer />
    </main>
  );
}
