/**
 * Shape tampilan blog untuk card/list (selaras dengan BlogPostShape dari lib/api).
 * Data live dari API public/blogs; file ini untuk tipe & fallback statis.
 */
export interface BlogPostDisplay {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  author: string;
}

export const blogPosts: BlogPostDisplay[] = [
  {
    id: 1,
    title: "5 Cara Efektif Membantu Anak Belajar Membaca",
    excerpt: "Temukan metode-metode terbaik untuk mendukung kemampuan membaca anak sejak dini dan membuat proses belajar menjadi lebih menyenangkan.",
    image: "/pichome/hero-section.JPG",
    category: "Parenting",
    date: "28 Juni 2025",
    author: "Putu Aditya"
  },
  {
    id: 2,
    title: "Mengenal Program Calistung untuk Anak Usia Dini",
    excerpt: "Apa itu program Calistung? Kapan waktu yang tepat untuk memulai dan bagaimana penerapan yang benar untuk anak-anak prasekolah.",
    image: "/picprogram/calistung.png",
    category: "Program",
    date: "21 Juni 2025",
    author: "Made Dewi"
  },
  {
    id: 3,
    title: "Pentingnya Pembelajaran Matematika yang Menyenangkan",
    excerpt: "Bagaimana mengubah persepsi anak tentang matematika dari mata pelajaran yang menakutkan menjadi mata pelajaran yang menyenangkan.",
    image: "/picprogram/matematika.png",
    category: "Pendidikan",
    date: "15 Juni 2025",
    author: "Nyoman Surya"
  },
  {
    id: 4,
    title: "Perkembangan Teknologi dalam Pendidikan Modern",
    excerpt: "Peran teknologi dalam transformasi metode pembelajaran dan bagaimana hal tersebut mempengaruhi perkembangan siswa di era digital.",
    image: "/picprogram/coding.png",
    category: "Teknologi",
    date: "10 Juni 2025",
    author: "Wayan Teknologi"
  },
  {
    id: 5,
    title: "Tips Memilih Program Bimbingan Belajar yang Tepat",
    excerpt: "Panduan lengkap untuk orangtua dalam memilih program bimbingan belajar yang sesuai dengan kebutuhan dan gaya belajar anak.",
    image: "/pichome/hero-section.JPG",
    category: "Tips",
    date: "5 Juni 2025",
    author: "Ketut Pendidik"
  },
  {
    id: 6,
    title: "Mengajarkan Bahasa Inggris pada Anak Sejak Dini",
    excerpt: "Strategi dan manfaat memperkenalkan bahasa Inggris pada anak usia dini untuk mempersiapkan mereka menghadapi era globalisasi.",
    image: "/picprogram/bahasainggris.png",
    category: "Bahasa",
    date: "1 Juni 2025",
    author: "Made English"
  }
];

export const blogCategories = ["Semua", "Parenting", "Program", "Pendidikan", "Teknologi", "Tips", "Bahasa"];
