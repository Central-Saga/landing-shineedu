export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Putu Aditya",
    role: "Founder & CEO",
    image: "/pichome/logo.png",
    bio: "Berpengalaman lebih dari 15 tahun dalam dunia pendidikan dan memiliki visi untuk memberikan pendidikan berkualitas yang dapat diakses oleh semua kalangan."
  },
  {
    name: "Made Dewi",
    role: "Academic Director",
    image: "/pichome/logo.png",
    bio: "Lulusan S2 Pendidikan dengan pengalaman mengajar selama 10 tahun di berbagai institusi pendidikan terkemuka."
  },
  {
    name: "Nyoman Surya",
    role: "Head of Curriculum",
    image: "/pichome/logo.png",
    bio: "Spesialis pengembangan kurikulum yang fokus pada metode pembelajaran yang efektif dan menyenangkan untuk berbagai tingkat usia."
  },
];

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
