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
                Bagi kami, setiap meja di ruang kelas bukan sekadar tempat duduk, melainkan peluncur bagi mimpi-mimpi besar. Sejak membuka pintu pertama kali pada 2019, kami tidak pernah percaya pada konsep siswa rata-rata. Kami melihat percikan jenius dalam diri setiap anak yang mungkin selama ini tertutup oleh tumpukan rumus yang membosankan atau soal logika yang rumit. Ratusan alumni kami telah membuktikannya; dari yang awalnya ragu menatap lembar ujian, kini mereka bangga mengenakan jaket almamater kampus impian atau memimpin peringkat di sekolahnya.
              </p>
              <p>
                Kami bukan sekadar barisan pengajar dengan tumpukan gelar, melainkan partner petualangan intelektual bagi para siswa. Di sini, pengajar kami adalah mentor yang tahu kapan harus memberi tantangan dan kapan harus memberikan semangat. Kami meninggalkan metode hafalan kuno yang kaku dan menggantinya dengan diskusi interaktif yang memicu rasa ingin tahu. Kami percaya bahwa saat seorang siswa mulai bertanya mengapa daripada sekadar bagaimana, di situlah keajaiban belajar yang sesungguhnya sedang terjadi.
              </p>
              <p>
                Belajar di sini tidak akan terasa seperti beban tambahan setelah seharian di sekolah, melainkan momen Aha! yang ditunggu-tunggu. 
                Kami menciptakan atmosfer yang hangat dan personal, di mana setiap kesulitan akademik disambut dengan solusi kreatif, bukan tekanan. 
                Dengan metode yang menyenangkan dan pendekatan yang menyentuh sisi unik tiap individu, kami tidak hanya mencetak peraih nilai sempurna, tapi juga membangun kepercayaan diri yang akan mereka bawa seumur hidup. 
                Karena bagi kami, keberhasilan seorang siswa adalah perayaan bersama yang kami rawat dengan sepenuh hati.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
