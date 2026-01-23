export interface JobVacancy {
  id: number;
  title: string;
  location: string;
  type: string;
  postedDate: string;
  endDate: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  description: string;
}

export const vacancyData: JobVacancy[] = [
  {
    id: 1,
    title: "Guru Bahasa Inggris",
    location: "Denpasar, Bali",
    type: "Full-time",
    postedDate: "28 Juni 2025",
    endDate: "28 Juli 2025",
    requirements: [
      "Sarjana Pendidikan Bahasa Inggris atau setara",
      "Pengalaman mengajar minimal 1 tahun",
      "Sertifikasi TEFL/TESOL merupakan nilai tambah",
      "Memiliki kemampuan komunikasi yang baik",
      "Kreatif dan inovatif dalam mengajar",
      "Sabar dalam menghadapi anak-anak"
    ],
    responsibilities: [
      "Menyiapkan dan menyampaikan materi pembelajaran Bahasa Inggris",
      "Melakukan evaluasi kemajuan siswa secara berkala",
      "Membuat laporan perkembangan siswa",
      "Berpartisipasi dalam kegiatan sekolah",
      "Mengikuti pelatihan pengembangan profesional"
    ],
    benefits: [
      "Gaji kompetitif",
      "Tunjangan kesehatan",
      "Pelatihan berkelanjutan",
      "Lingkungan kerja yang nyaman"
    ],
    description: "Kami mencari guru Bahasa Inggris yang bersemangat dan berdedikasi untuk bergabung dengan tim kami. Anda akan bertanggung jawab untuk mengajar siswa dari berbagai tingkat usia dengan metode yang menyenangkan dan efektif."
  },
  {
    id: 2,
    title: "Staff Administrasi",
    location: "Kuta, Bali",
    type: "Full-time",
    postedDate: "30 Juni 2025",
    endDate: "30 Juli 2025",
    requirements: [
      "Minimal lulusan D3/S1 jurusan apapun",
      "Menguasai Microsoft Office",
      "Teliti dan memiliki kemampuan administrasi yang baik",
      "Memiliki kemampuan komunikasi yang baik",
      "Dapat bekerja dalam tim"
    ],
    responsibilities: [
      "Mengelola pendaftaran siswa baru",
      "Menjaga dan mengatur dokumentasi",
      "Menangani komunikasi dengan orang tua siswa",
      "Membantu dalam pengaturan jadwal",
      "Mengelola inventaris kantor"
    ],
    benefits: [
      "Gaji kompetitif",
      "Tunjangan kesehatan",
      "Lingkungan kerja yang nyaman",
      "Jam kerja reguler"
    ],
    description: "Kami mencari staff administrasi yang terorganisir dan efisien untuk mengelola operasional harian di kantor kami. Posisi ini membutuhkan ketelitian tinggi dan kemampuan multi-tasking yang baik."
  },
  {
    id: 3,
    title: "Guru Matematika",
    location: "Denpasar, Bali",
    type: "Part-time",
    postedDate: "1 Juli 2025",
    endDate: "1 Agustus 2025",
    requirements: [
      "Sarjana Matematika atau Pendidikan Matematika",
      "Pengalaman mengajar minimal 1 tahun",
      "Memahami kurikulum nasional",
      "Mampu menjelaskan konsep matematika dengan mudah",
      "Sabar dan tekun dalam mengajar"
    ],
    responsibilities: [
      "Mengajar matematika untuk siswa SD hingga SMA",
      "Menyiapkan materi pembelajaran yang sesuai dengan tingkat siswa",
      "Melakukan evaluasi kemajuan siswa",
      "Memberikan tugas dan latihan yang sesuai",
      "Membantu siswa yang kesulitan dalam memahami konsep"
    ],
    benefits: [
      "Gaji per jam yang kompetitif",
      "Jadwal fleksibel",
      "Pengembangan karir",
      "Lingkungan belajar yang kondusif"
    ],
    description: "Bergabunglah dengan tim kami sebagai guru matematika paruh waktu. Kami mencari individu yang dapat membantu siswa memahami dan mencintai matematika melalui pendekatan pengajaran yang efektif dan menyenangkan."
  },
  {
    id: 4,
    title: "Marketing Executive",
    location: "Kuta, Bali",
    type: "Full-time",
    postedDate: "3 Juli 2025",
    endDate: "3 Agustus 2025",
    requirements: [
      "Sarjana Marketing atau bidang terkait",
      "Pengalaman marketing minimal 1 tahun",
      "Keterampilan komunikasi yang sangat baik",
      "Kreatif dan inovatif",
      "Menguasai media sosial dan digital marketing",
      "Kemampuan analisis data"
    ],
    responsibilities: [
      "Mengembangkan dan melaksanakan strategi marketing",
      "Mengelola kampanye pemasaran digital",
      "Membuat konten untuk media sosial dan website",
      "Melakukan analisis pasar dan kompetitor",
      "Berkoordinasi dengan tim untuk meningkatkan brand awareness"
    ],
    benefits: [
      "Gaji kompetitif plus bonus performa",
      "Tunjangan kesehatan",
      "Lingkungan kerja yang dinamis",
      "Peluang pengembangan karir"
    ],
    description: "Kami mencari Marketing Executive yang energik dan kreatif untuk membantu kami mengembangkan dan menjalankan strategi pemasaran yang efektif. Posisi ini ideal bagi individu yang bersemangat tentang pemasaran pendidikan dan ingin berkontribusi pada pertumbuhan institusi kami."
  }
];
