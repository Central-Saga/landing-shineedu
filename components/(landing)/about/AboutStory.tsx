"use client";

import Image from "next/image";
import { Container } from "../Container";

export function AboutStory() {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="flex items-center justify-center">
            <div className="relative w-full aspect-4/3 rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/pichome/hero-section.JPG"
                alt="Shine Education Story"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6 text-[#b42519]">
              Cerita Kami
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Shine Education didirikan pada tahun 2018 dengan visi untuk
                menghadirkan pendidikan berkualitas yang dapat diakses oleh semua
                kalangan. Berawal dari sebuah ruangan kecil di Denpasar dengan
                hanya 15 siswa, kini kami telah berkembang menjadi institusi
                pendidikan yang dipercaya oleh ratusan keluarga di Bali.
              </p>
              <p>
                Filosofi pendidikan kami berlandaskan pada keyakinan bahwa
                setiap anak memiliki potensi unik yang perlu dieksplorasi dan
                dikembangkan. Kami tidak hanya fokus pada pencapaian akademik,
                tetapi juga pembentukan karakter dan keterampilan hidup yang
                esensial.
              </p>
              <p>
                Nama &quot;Shine&quot; dipilih karena kami percaya bahwa
                pendidikan adalah cahaya yang dapat menerangi masa depan.
                Melalui program-program inovatif dan pendekatan pembelajaran
                yang menyenangkan, kami berusaha membantu setiap siswa untuk
                bersinar dengan potensi terbaik mereka.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
