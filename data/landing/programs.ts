export interface Program {
  id: number;
  title: string;
  description: string;
  image: string;
  features: string[];
}

export const programData: Program[] = [
  {
    id: 1,
    title: "Calistung",
    description: "Program untuk membantu anak-anak dalam belajar membaca, menulis, dan berhitung dengan metode yang menyenangkan.",
    image: "/picprogram/calistung.png",
    features: [
      "Metode pembelajaran interaktif",
      "Pendekatan yang menyenangkan",
      "Materi disesuaikan dengan usia",
      "Evaluasi berkala"
    ]
  },
  {
    id: 2,
    title: "Bahasa Inggris",
    description: "Program bahasa Inggris untuk semua tingkat usia dengan fokus pada kemampuan komunikasi dan pemahaman.",
    image: "/picprogram/bahasainggris.png",
    features: [
      "Native dan non-native speaker",
      "Fokus pada percakapan",
      "Persiapan ujian internasional",
      "Kelas kecil untuk perhatian maksimal"
    ]
  },
  {
    id: 3,
    title: "Matematika",
    description: "Program matematika yang dirancang untuk membangun fondasi kuat dalam konsep matematika dan pemecahan masalah.",
    image: "/picprogram/matematika.png",
    features: [
      "Metode pembelajaran yang terstruktur",
      "Penekanan pada pemahaman konsep",
      "Latihan soal beragam",
      "Bimbingan olimpiade"
    ]
  },
  {
    id: 4,
    title: "Coding",
    description: "Program pengenalan dan pengembangan kemampuan pemrograman untuk berbagai tingkat usia dan kemampuan.",
    image: "/picprogram/coding.png",
    features: [
      "Pengenalan dasar pemrograman",
      "Proyek praktis",
      "Pengembangan aplikasi sederhana",
      "Logika pemrograman"
    ]
  }
];
