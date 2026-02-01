import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Home,
  BookOpen,
  FileText,
  MessageCircle,
  Info,
  Image as ImageIcon,
  Briefcase,
  UserPlus,
} from "lucide-react";
import { Container } from "../Container";

const QUICK_LINKS = [
  { label: "Beranda", href: "/", icon: Home },
  { label: "Program", href: "/programs", icon: BookOpen },
  { label: "About Us", href: "/about", icon: Info },
  { label: "Gallery", href: "/gallery", icon: ImageIcon },
  { label: "Blog", href: "/blog", icon: FileText },
  { label: "Job Vacancies", href: "/job-vacancies", icon: Briefcase },
  { label: "Job Applications", href: "/job-applications", icon: UserPlus },
  { label: "Kontak", href: "/kontak", icon: MessageCircle },
];

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 relative z-10">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <Image
              src="/pichome/logo.png"
              alt="Shine Education Logo"
              width={150}
              height={40}
              className="mb-4"
            />
            <p className="text-gray-600 text-sm leading-relaxed max-w-md">
              Shine Education adalah lembaga pendidikan di Tabanan yang fokus
              pada pengembangan potensi siswa melalui berbagai program
              pembelajaran yang efektif.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="hover:text-[#b42519]" asChild>
                <a href="https://www.facebook.com/shineeducationbali" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-[#b42519]" asChild>
                <a href="https://www.instagram.com/shineeducationbali/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-900">Quick Links</h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map(({ label, href, icon: Icon }) => (
                <li key={href + label}>
                  <Link href={href} className="text-gray-600 hover:text-[#b42519] flex items-center gap-2 transition-colors">
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-900">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-[#b42519] flex-shrink-0" />
                <span className="text-gray-600 text-sm">Jl. Kesiman No.123, Tabanan, Bali</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#b42519] flex-shrink-0" />
                <a href="https://wa.me/6281237522400" className="text-gray-600 text-sm hover:text-[#b42519]" target="_blank" rel="noopener noreferrer">
                  +62 812-3752-2400
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#b42519] flex-shrink-0" />
                <a href="mailto:yayasanpendidikangemilangbali@gmail.com" className="text-gray-600 text-sm hover:text-[#b42519]">
                  yayasanpendidikangemilangbali@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Shine Education. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
