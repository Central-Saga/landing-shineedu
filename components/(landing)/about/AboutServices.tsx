import { 
  BookOpen, 
  Baby, 
  GraduationCap, 
  Award, 
  Users, 
  MonitorPlay, 
  Globe2, 
  ClipboardCheck 
} from "lucide-react";

const services = [
  {
    icon: <MonitorPlay className="w-6 h-6 text-white" />,
    title: "Kursus Bahasa Inggris, Komputer & Coding",
    description: "Membekali anak dengan keterampilan bahasa dan teknologi digital.",
  },
  {
    icon: <Baby className="w-6 h-6 text-white" />,
    title: "Bimbingan Belajar Anak Usia Dini",
    description: "Fokus pada program baca, tulis, dan hitung (Calistung) dasar.",
  },
  {
    icon: <GraduationCap className="w-6 h-6 text-white" />,
    title: "Bimbel TK, SD, SMP, SMA & Umum",
    description: "Pendampingan akademis komprehensif untuk semua jenjang usia.",
  },
  {
    icon: <Award className="w-6 h-6 text-white" />,
    title: "Persiapan Ujian & UTBK/SNBT",
    description: "Mempersiapkan siswa meraih nilai maksimal di ujian sekolah pendorong prestasi.",
  },
  {
    icon: <Users className="w-6 h-6 text-white" />,
    title: "Kelas Privat & Semi-Privat",
    description: "Pembelajaran eksklusif dengan personalisasi sesuai profil belajar anak.",
  },
  {
    icon: <Globe2 className="w-6 h-6 text-white" />,
    title: "Kelas Online Interaktif",
    description: "Tak terbatas jarak, siswa dapat belajar secara asyik dengan format e-learning.",
  },
  {
    icon: <BookOpen className="w-6 h-6 text-white" />,
    title: "Persiapan IELTS/TOEFL",
    description: "Pendampingan intensif bagi Anda yang bersiap kuliah atau kerja ke luar negeri.",
  },
  {
    icon: <ClipboardCheck className="w-6 h-6 text-white" />,
    title: "Try Out & Evaluasi Belajar",
    description: "Mengukur progres kemampuan lewat asesmen rutin secara berkala.",
  },
];

export function AboutServices() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#b42519] mb-4">
            Layanan Kami
          </h2>
          <p className="text-gray-600">
            Shine Education menyediakan berbagai program pendidikan yang disesuaikan dengan kebutuhan masa depan anak.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 bg-[#b42519] group-hover:bg-[#d2a741] transition-colors duration-300 rounded-xl flex items-center justify-center mb-4 shadow-md">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-[#b42519] mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-[#b42519] rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#d2a741]/40 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Bersama Shine Education, ayo raih prestasi terbaik dan wujudkan impian masa depan!
            </h3>
            <p className="text-xl text-[#d2a741] font-bold tracking-wide">
              Smart Learning, Bright Future!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
