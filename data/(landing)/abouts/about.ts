export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

/** Satu orang pemilik / owner */
export const owner: TeamMember = {
  name: "Putu Aditya",
  role: "Owner & Founder",
  image: "/pichome/logo.png",
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
    bidang: "admin",
    label: "Admin",
    description: "Tim administrasi dan operasional harian.",
    members: [
      {
        name: "Putu Rina",
        role: "Admin & Front Office",
        image: "/pic-about/msrahmita.jpg",
        bio: "Menangani pendaftaran, administrasi siswa, dan layanan front office.",
      },
      {
        name: "Ketut Ari",
        role: "Admin Data",
        image: "/pic-about/msrahmita.jpg",
        bio: "Pengelola data siswa dan sistem informasi akademik.",
      },
    ],
  },
  {
    bidang: "content-creator",
    label: "Content Creator",
    description: "Tim konten dan media pembelajaran.",
    members: [
      {
        name: "Ni Made Sari",
        role: "Content Creator",
        image: "/pic-about/msrahmita.jpg",
        bio: "Membuat materi visual dan konten digital untuk pembelajaran.",
      },
      {
        name: "Wayan Dika",
        role: "Social Media & Design",
        image: "/pic-about/msrahmita.jpg",
        bio: "Desain grafis dan pengelola media sosial Shine.",
      },
    ],
  },
  {
    bidang: "manajemen",
    label: "Manajemen",
    description: "Tim manajemen operasional dan kurikulum.",
    members: [
      {
        name: "Made Dewi",
        role: "Academic Director",
        image: "/pic-about/msrahmita.jpg",
        bio: "Lulusan S2 Pendidikan dengan pengalaman mengajar selama 10 tahun di berbagai institusi pendidikan terkemuka.",
      },
      {
        name: "Nyoman Surya",
        role: "Head of Curriculum",
        image: "/pic-about/msrahmita.jpg",
        bio: "Spesialis pengembangan kurikulum yang fokus pada metode pembelajaran yang efektif dan menyenangkan untuk berbagai tingkat usia.",
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
        name: "Ni Putu Sari",
        role: "Guru Bahasa Inggris",
        image: "/pic-about/msrahmita.jpg",
        bio: "Sertifikasi TOEFL dan pengalaman mengajar English for Young Learners.",
      },
      {
        name: "Ketut Wira",
        role: "Guru Bahasa Inggris",
        image: "/pic-about/msrahmita.jpg",
        bio: "Spesialis conversation dan business English.",
      },
    ],
  },
  {
    subject: "matematika",
    subjectLabel: "Matematika",
    teachers: [
      {
        name: "Komang Budi",
        role: "Guru Matematika",
        image: "/pic-about/msrahmita.jpg",
        bio: "Fokus pada matematika dasar hingga persiapan olimpiade.",
      },
      {
        name: "Putu Ayu",
        role: "Guru Matematika",
        image: "/pic-about/msrahmita.jpg",
        bio: "Metode menyenangkan untuk matematika SD dan SMP.",
      },
    ],
  },
  {
    subject: "sains",
    subjectLabel: "Sains",
    teachers: [
      {
        name: "I Wayan Adi",
        role: "Guru Sains",
        image: "/pic-about/msrahmita.jpg",
        bio: "Eksperimen sains dan IPA untuk berbagai jenjang.",
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
    year: "2018",
    title: "Berdirinya Shine Education",
    description: "Shine Education didirikan dengan tujuan memberikan pendidikan berkualitas dengan pendekatan yang menyenangkan."
  },
  {
    year: "2019",
    title: "Pembukaan Cabang Pertama",
    description: "Membuka cabang pertama di Denpasar dan melayani lebih dari 100 siswa dalam tahun pertama."
  },
  {
    year: "2021",
    title: "Perluasan Program",
    description: "Menambah berbagai program baru termasuk kelas coding dan matematika tingkat lanjut."
  },
  {
    year: "2023",
    title: "Digital Transformation",
    description: "Mengembangkan platform pembelajaran online untuk menjangkau siswa di seluruh Bali."
  },
  {
    year: "2025",
    title: "Ekspansi Regional",
    description: "Membuka cabang baru di beberapa kota di Indonesia dan memperluas jangkauan layanan pendidikan."
  }
];
