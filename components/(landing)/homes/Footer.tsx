import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  MapPin, Phone, Mail, Twitter, Facebook, Instagram, 
  Home, BookOpen, FileText, MessageCircle 
} from "lucide-react";
import { Container } from "../Container";

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
              <Button variant="ghost" size="icon" className="hover:text-[#b42519]">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-[#b42519]">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-[#b42519]">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-900">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-600 hover:text-[#b42519] flex items-center gap-2 transition-colors">
                  <Home className="h-4 w-4" />
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-gray-600 hover:text-[#b42519] flex items-center gap-2 transition-colors">
                  <BookOpen className="h-4 w-4" />
                  Program
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-[#b42519] flex items-center gap-2 transition-colors">
                  <FileText className="h-4 w-4" />
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="text-gray-600 hover:text-[#b42519] flex items-center gap-2 transition-colors">
                  <MessageCircle className="h-4 w-4" />
                  Kontak
                </Link>
              </li>
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
                <span className="text-gray-600 text-sm">+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#b42519] flex-shrink-0" />
                <span className="text-gray-600 text-sm">info@shineeducation.com</span>
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
