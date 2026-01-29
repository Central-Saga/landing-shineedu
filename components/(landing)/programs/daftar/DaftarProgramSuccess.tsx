"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/(landing)/Container";

export function DaftarProgramSuccess() {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative z-10">
      <Container>
        <div className="max-w-2xl mx-auto text-center bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-[#b42519] mb-4">
            Pendaftaran Berhasil
          </h1>
          <p className="text-gray-600 mb-6">
            Data telah tersimpan. Anda akan muncul di daftar enrollment admin.
            Untuk informasi lebih lanjut, hubungi kami via WhatsApp.
          </p>
          <Button asChild className="bg-[#b42519] hover:bg-[#7a160d]">
            <Link href="/programs">Kembali ke Program</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
