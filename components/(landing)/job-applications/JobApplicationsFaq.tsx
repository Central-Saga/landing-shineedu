"use client";

import { Container } from "@/components/(landing)/Container";

const faqs = [
  {
    q: "Berapa lama proses seleksi lamaran kerja?",
    a: "Proses seleksi biasanya memakan waktu 2-3 minggu tergantung pada posisi yang dilamar. Kami akan menghubungi kandidat yang lolos seleksi administrasi untuk tahap selanjutnya.",
  },
  {
    q: "Apakah saya perlu membawa dokumen asli saat wawancara?",
    a: "Ya, kami meminta kandidat untuk membawa dokumen asli seperti ijazah, sertifikat, dan kartu identitas saat proses wawancara untuk keperluan verifikasi.",
  },
  {
    q: "Bagaimana cara mengetahui status lamaran saya?",
    a: 'Anda dapat menggunakan fitur "Pantau Status" dengan memasukkan ID Aplikasi dan email yang Anda gunakan saat melamar. ID Aplikasi akan dikirimkan ke email Anda setelah berhasil mengirimkan lamaran.',
  },
  {
    q: "Apakah saya bisa melamar lebih dari satu posisi?",
    a: "Ya, Anda dapat melamar untuk beberapa posisi yang berbeda. Namun, kami sarankan untuk melamar posisi yang sesuai dengan kualifikasi dan pengalaman Anda.",
  },
];

export function JobApplicationsFaq() {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#C40503]">
            FAQ Seputar Lamaran Kerja
          </h2>
          <p className="text-gray-600">
            Pertanyaan yang sering diajukan tentang proses lamaran kerja di Shine
            Education
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((item) => (
            <div
              key={item.q}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="font-semibold mb-2 text-[#C40503]">{item.q}</h3>
              <p className="text-gray-600">{item.a}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

