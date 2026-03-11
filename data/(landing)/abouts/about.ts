export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  status?: string;
}

/** Satu orang pemilik / owner */
export const owner: TeamMember = {
  name: "Ni Putu Sri Indrawati",
  role: "Director",
  status: "Full time",
  image: "/pic-team/Miss Sri.jpg",
  bio: "Berpengalaman lebih dari 15 tahun dalam dunia pendidikan dan memiliki visi untuk memberikan pendidikan berkualitas yang dapat diakses oleh semua kalangan.",
};

/** Pengelola dikelompokkan per bidang (Admin, Content Creator, Manajemen, dll.) */
export interface PengelolaByBidang {
  bidang: string;
  label: string;
  description: string;
  members: TeamMember[];
}

export const pengelolaByBidang: PengelolaByBidang[] = [
  {
    bidang: "manajemen",
    label: "Manajemen",
    description: "Tim manajemen operasional dan kurikulum.",
    members: [
      {
        name: "Ni Luh Gede Rita Pinayanti",
        role: "Supervisor",
        status: "Full time",
        image: "/pic-team/Ms Rita.JPG",
        bio: "Lulusan S2 Pendidikan dengan pengalaman mengajar selama 10 tahun di berbagai institusi pendidikan terkemuka.",
      },
      {
        name: "Ni Putu Tania Erika Putri",
        role: "HR",
        status: "Full time",
        image: "/pic-team/Ms Tania.jpg",
        bio: "Membantu dalam pengelolaan sumber daya manusia dan operasional kepegawaian.",
      },
    ],
  },
  {
    bidang: "admin",
    label: "Admin",
    description: "Tim administrasi dan operasional harian.",
    members: [
      {
        name: "Ni Made Ayu Sri Widhi Antari",
        role: "Admin Operasional",
        status: "Full time",
        image: "/pic-team/Ms Ayu Sri.PNG",
        bio: "Menangani administrasi siswa, layanan operasional harian, dan informasi akademik.",
      },
    ],
  },
  {
    bidang: "content-creator",
    label: "Content Creator",
    description: "Tim konten dan media pembelajaran.",
    members: [
      {
        name: "Ni Putu Desy Prashanti",
        role: "Content Creator",
        status: "Full time",
        image: "/pic-team/Ms Desy.JPG",
        bio: "Membuat materi visual dan konten digital yang menarik untuk pembelajaran dan media sosial.",
      },
    ],
  },
];

/** Legacy: daftar pengelola flat (semua bidang digabung) */
export const pengelolaShine: TeamMember[] = pengelolaByBidang.flatMap(
  (g) => g.members
);

/** Guru dikelompokkan per mata pelajaran; setiap kelompok punya slideshow sendiri */
export interface TeachersBySubject {
  subject: string;
  subjectLabel: string;
  teachers: TeamMember[];
}

export const teachersBySubject: TeachersBySubject[] = [
  {
    subject: "bahasa-inggris",
    subjectLabel: "Bahasa Inggris",
    teachers: [
      {
        name: "Ni Putu Cendani Jelita Ruparti",
        role: "Tutor English",
        status: "Full time",
        image: "/pic-team/Ms Cendani.JPG",
        bio: "Menguasai teknik public speaking dan debat dalam Bahasa Inggris.",
      },
      {
        name: "Ni Kadek Mena Rahayu",
        role: "Tutor English",
        status: "Part time",
        image: "/pic-team/Ms Mena.jpg",
        bio: "Berpengalaman dalam mengajar Bahasa Inggris dengan metode interaktif.",
      },
      {
        name: "Ni Putu Intan Puspita",
        role: "Tutor English",
        status: "Full time",
        image: "/pic-team/Ms Intan Puspita.jpg",
        bio: "Menciptakan lingkungan belajar bahasa yang fun dan engaging.",
      },
      {
        name: "I Putu Adi Nita Adnyana",
        role: "Tutor English",
        status: "Full time",
        image: "/pic-team/Mr Adi nita.jpg",
        bio: "Membantu siswa memahami tata bahasa dan percakapan dasar hingga lanjut.",
      },
      {
        name: "Ni Putu Anjar Astriani Dewi",
        role: "Tutor English",
        status: "Part time",
        image: "/pic-team/Ms Anjar.jpg",
        bio: "Spesialisasi dalam membimbing siswa menguasai kemampuan listening dan speaking.",
      },
      {
        name: "Ni Luh Putu Ari Permata Dewi",
        role: "Tutor English",
        status: "Full time",
        image: "/pic-team/Ms Ari Permata.jpg",
        bio: "Sabar dan telaten dalam membangun dasar Bahasa Inggris anak-anak.",
      },
      {
        name: "Ni Wayan Widia Wulandari K",
        role: "Tutor English",
        status: "Full time",
        image: "/pic-team/Ms Widia.JPG",
        bio: "Membantu melatih pelafalan (pronunciation) dan pemahaman teks bacaan.",
      },
      {
        name: "Ni Made Rahmita Putri",
        role: "Tutor English",
        status: "Full time",
        image: "/pic-team/Ms Rahmita.jpg",
        bio: "Memiliki pendekatan belajar dengan aktivitas kreatif dan komunikatif.",
      },
      {
        name: "Kadek Mawar Sopiani",
        role: "Tutor English",
        status: "Full time",
        image: "/pic-team/Ms Mawar.jpg",
        bio: "Berpengalaman mengajar berbagai usia menggunakan media yang menyenangkan.",
      },
      {
        name: "Ni Wayan Linda Maharani",
        role: "Tutor English",
        status: "Freelance",
        image: "/pic-team/Ms Linda.jpg",
        bio: "Membimbing siswa agar lebih percaya diri berkomunikasi dalam Bahasa Inggris.",
      },
      {
        name: "Ayu Krisna",
        role: "Tutor English",
        status: "Freelance",
        image: "/pic-team/Ms Ayu Krisna.jpg",
        bio: "Fokus pada peningkatan kemampuan speaking dan writing siswa.",
      },
      {
        name: "Dewa Ayu Kristiani",
        role: "Tutor English",
        status: "Part time",
        image: "/pic-team/Ms Kristin.jpg",
        bio: "Menggunakan teknik pengajaran yang adaptif sesuai kemampuan anak.",
      },
    ],
  },
  {
    subject: "matematika",
    subjectLabel: "Matematika/Kumer",
    teachers: [
      {
        name: "Ade Ninik Ismayani",
        role: "Tutor Matematika/Kumer",
        status: "Full time",
        image: "/pichome/logo.png",
        bio: "Mengaplikasikan metode Kurikulum Merdeka yang eksploratif.",
      },
      {
        name: "I Gusti Ayu Putri Aswikawati",
        role: "Tutor Matematika/Kumer",
        status: "Part time",
        image: "/pic-team/Ms Putri Aswi.jpg",
        bio: "Fokus pada penguatan konsep dasar matematika SD dan SMP.",
      },
      {
        name: "Ni Luh Putu Puan Maharani",
        role: "Tutor Matematika/Kumer",
        status: "Part time",
        image: "/pic-team/Ms Puan.JPG",
        bio: "Sabar dalam mengajarkan logika dan penalaran matematika.",
      },
      {
        name: "I Gusti Made Ayu Anggun Tiara Pratini",
        role: "Tutor Matematika/Kumer",
        status: "Full time",
        image: "/pic-team/Ms Anggun.jpg",
        bio: "Membantu siswa mendalami kurikulum sekolah dengan pendekatan asyik.",
      },
      {
        name: "Dwi Jayanti",
        role: "Tutor Matematika/Kumer",
        status: "Part time",
        image: "/pic-team/Ms Dwi Jayanti.PNG",
        bio: "Metode menyenangkan untuk membantu anak mencintai matematika.",
      },
      {
        name: "Putri Intan Sumadewi",
        role: "Tutor Matematika/Kumer",
        status: "Full time",
        image: "/pic-team/Ms Putri Intan.JPG",
        bio: "Ahli dalam menguraikan masalah perhitungan agar mudah dipahami siswa.",
      },
      {
        name: "Yati",
        role: "Tutor Matematika/Kumer",
        status: "Freelance",
        image: "/pic-team/Ms Yati.jpg",
        bio: "Siap membantu siswa menyelesaikan kesulitan belajar berhitung secara intensif.",
      },
      {
        name: "Anis Suliyani",
        role: "Tutor Matematika/Kumer",
        status: "Full time",
        image: "/pic-team/Ms Anis.jpg",
        bio: "Mendampingi anak-anak belajar konsep numerasi sejak dini hingga lancar.",
      },
    ],
  },
  {
    subject: "komputer",
    subjectLabel: "Komputer/Coding",
    teachers: [
      {
        name: "I Putu Wira Budhi Guna Ariyasa",
        role: "Tutor Komputer/Coding",
        status: "Full time",
        image: "/pic-team/Mr Wira.JPG",
        bio: "Berpengalaman dalam membimbing logika pemrograman dan skill komputer.",
      },
    ],
  },
  {
    subject: "sains",
    subjectLabel: "Sains (Fisika, Kimia, IPA)",
    teachers: [
      {
        name: "Muhammad Nasir",
        role: "Tutor Fisika/Kimia",
        status: "Full time",
        image: "/pic-team/Mr Nasir.jpg",
        bio: "Mengajarkan konsep fisika dan kimia dengan metode eksperimen langsung.",
      },
      {
        name: "Luh Kade Surya Dwianggreni",
        role: "Tutor IPA",
        status: "Full time",
        image: "/pic-team/Ms Surya Dwi.jpg",
        bio: "Pendekatan belajar IPA berbasis proyek, alam sekitar, dan inkuiri.",
      },
    ],
  },
  {
    subject: "calistung",
    subjectLabel: "Calistung",
    teachers: [
      {
        name: "Ni Wayan Wahyu Astari",
        role: "Tutor Calistung",
        status: "Full time",
        image: "/pic-team/Ms Wahyu Astari.JPG",
        bio: "Mengembangkan kemampuan baca, tulis, hitung anak usia dini dengan bermain sambil belajar.",
      },
    ],
  },
  {
    subject: "ekonomi",
    subjectLabel: "Ekonomi/Akuntansi",
    teachers: [
      {
        name: "Ni Komang Putri Antari",
        role: "Tutor Ekonomi/Akuntansi",
        status: "Freelance",
        image: "/pic-team/Ms Putri Antari.jpg",
        bio: "Spesialis dalam dasar akuntansi dan pembukuan bagi pelajar menengah dan atas.",
      },
    ],
  },
  {
    subject: "mandarin",
    subjectLabel: "Mandarin",
    teachers: [
      {
        name: "Melinda",
        role: "Tutor Mandarin",
        status: "Freelance",
        image: "/pic-team/Ms Melinda.jpg",
        bio: "Membimbing anak-anak belajar pinyin dan percakapan dasar Mandarin dengan ceria.",
      },
    ],
  },
];

/** Legacy: daftar tim umum (tetap dipakai jika diperlukan) */
export const teamMembers: TeamMember[] = [owner, ...pengelolaShine];

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export const milestones: Milestone[] = [
  {
    year: "2019",
    title: "Awal Berdiri",
    description: "Pada 6 Februari 2019, Yayasan Pendidikan Gemilang Bali lahir dari keprihatinan terhadap kesenjangan pendidikan. Dimulai dari satu ruang kelas sederhana dengan 20 siswa pertama dengan 5 sesi pertemuan. Program pertama yaitu kursus bahasa inggris untuk jenjang SD dan SMP."
  },
  {
    year: "2020",
    title: "Program Kelas",
    description: "Membuka program bimbingan belajar untuk jenjang SD dan SMP, fokus pada pembelajaran yang menyenangkan dan efektif."
  },
  {
    year: "2021",
    title: "Peningkatan Fasilitas",
    description: "Pindah ke gedung baru dengan ruang kelas lebih luas, ruang tunggu yang nyaman dan fasilitas multimedia."
  },
  {
    year: "2022",
    title: "Prestasi Pertama",
    description: "Shine Education Bali resmi menjadi yayasan yang bernama Yayasan Pendidikan Gemilang Bali dengan memiliki izin LKP Bahasa dan Teknologi Informasi."
  },
  {
    year: "2023",
    title: "Ekspansi Program",
    description: "Menambah program belajar untuk persiapan ujian masuk PTN, SNBT dan coding."
  },
  {
    year: "2024",
    title: "Ekspansi Program (Lanjutan)",
    description: "Menambah program TKA jenjang SMP dan SMA."
  },
  {
    year: "2025 - Sekarang",
    title: "Smart Learning, Bright Future",
    description: "Membimbing lebih dari 1.000 siswa setiap tahunnya, dengan tim pengajar berpengalaman dan visi untuk menjangkau lebih banyak anak khususnya daerah Tabanan. Seperti moto kami “Smart Learning, Bright Future”."
  }
];
