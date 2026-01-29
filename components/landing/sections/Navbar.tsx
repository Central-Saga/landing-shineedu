"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search, ChevronDown, Home, BookOpen, Info, FileText,
  Menu, X, Briefcase, UserPlus, LogIn, Image as ImageIcon
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Container } from "../Container";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileOthersOpen, setIsMobileOthersOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) setIsMobileOthersOpen(false);
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: "Beranda", href: "/", icon: Home },
    { name: "Program", href: "/programs", icon: BookOpen },
    { name: "About Us", href: "/about", icon: Info },
    { name: "Gallery", href: "/gallery", icon: ImageIcon },
    { name: "Blog", href: "/blog", icon: FileText },
    {
      name: "Lainnya",
      href: "#",
      icon: Briefcase,
      isDropdown: true,
      subItems: [
        { name: "Job Vacancies", href: "/job-vacancies", icon: Briefcase },
        { name: "Job Applications", href: "/job-applications", icon: UserPlus },
      ]
    },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed w-full z-50 transition-all duration-300 bg-white",
          isScrolled
            ? "bg-white shadow-lg border-b border-gray-200"
            : "bg-white"
        )}
      >
        <Container>
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="relative">
              <Link href="/" className="flex items-center">
                <Image
                  src="/pichome/logo.png"
                  alt="Shine Education"
                  width={120}
                  height={40}
                  className="h-12 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2"> {/* Gap diperkecil agar lebih rapat */}
              {navItems.map((item) => {
                const Icon = item.icon;
                // Anggap saja kita menggunakan hook usePathname() dari next/navigation untuk deteksi tab aktif
                const isActive = false; // Ganti dengan logic: pathname === item.href

                return (
                  <div key={item.name} className="relative">
                    {item.isDropdown ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className={cn(
                              "group relative flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#b42519] transition-all font-medium rounded-full hover:bg-[#b42519]/5 outline-none",
                              isScrolled ? "text-sm" : "text-base"
                            )}
                          >
                            <Icon className="h-4 w-4" />
                            {item.name}
                            <ChevronDown className="h-3 w-3 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                          </Button>
                        </DropdownMenuTrigger>
                        
                        {/* Default dropdown behavior */}
                        <DropdownMenuContent
                          align="start"
                          sideOffset={12} 
                          className="w-52 rounded-xl shadow-2xl border border-gray-100 bg-white/95 backdrop-blur-md p-2"
                        >
                          {item.subItems?.map((subItem) => (
                            <DropdownMenuItem key={subItem.name} asChild>
                              <Link
                                href={subItem.href}
                                className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-gray-600 rounded-lg transition-all hover:text-[#b42519] hover:bg-[#b42519]/5 cursor-pointer"
                              >
                                <subItem.icon className="h-4 w-4" />
                                {subItem.name}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          "relative flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#b42519] transition-all font-medium rounded-full hover:bg-[#b42519]/5 group",
                          isScrolled ? "text-sm" : "text-base"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.name}
                        
                        {/* Tab Indicator (Garis bawah yang muncul saat hover atau aktif) */}
                        <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#b42519] transition-all duration-300 group-hover:w-1/2 group-hover:left-1/4" />
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
              
            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="https://app.shineeducationbali.test/login">
                <Button variant="ghost" className="text-[#b42519] flex items-center gap-2 hover:text-[#7a160d]">
                  <LogIn className="h-4 w-4" />
                  Masuk
                </Button>
              </Link>
              {/* <Link href="https://app.shineeducationbali.test/register">
                <Button className="bg-[#b42519] text-white hover:bg-[#7a160d] flex items-center gap-2 shadow-md">
                  <UserPlus className="h-4 w-4" />
                  Daftar
                </Button>
              </Link> */}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-foreground"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </Container>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-20 left-0 right-0 z-40 bg-white shadow-lg border-b border-gray-200 animate-in slide-in-from-top-2">
          <Container className="py-4">
            {/* Mobile Search */}
            <div className="mb-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Cari program..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="rounded-full pl-10 pr-4"
                />
                <Search
                  className={cn(
                    "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors",
                    isSearchFocused ? "text-[#b42519]" : "text-gray-400"
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.name}>
                {item.isDropdown ? (
                  <div className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => setIsMobileOthersOpen((v) => !v)}
                      className="flex items-center justify-between text-gray-900 font-medium py-2"
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {item.name}
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-300 ease-in-out",
                          isMobileOthersOpen ? "rotate-180" : "rotate-0"
                        )}
                      />
                    </button>

                    {isMobileOthersOpen && (
                      <div className="overflow-hidden bg-gray-50/50 rounded-lg">
                        <div className="flex flex-col gap-2 pl-8 pr-4 py-2 border-l-2 border-[#b42519]/20 ml-2 my-1">
                          {item.subItems?.map((subItem) => {
                            const SubIcon = subItem.icon;
                            return (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="flex items-center gap-2 text-gray-600 hover:text-[#b42519] transition-colors py-1.5"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <SubIcon className="h-4 w-4" />
                                {subItem.name}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                      <Link
                        href={item.href}
                        className="flex items-center gap-2 text-gray-600 hover:text-[#b42519] transition-colors py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    )}
                  </div>
                );
              })}
              <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
                <Link href="https://app.shineeducationbali.test/login">
                  <Button
                    variant="ghost"
                    className="w-full text-[#b42519] flex items-center gap-2 hover:text-[#7a160d]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LogIn className="h-4 w-4" />
                    Masuk
                  </Button>
                </Link>
                <Link href="https://app.shineeducationbali.test/register">
                  <Button
                    className="w-full bg-[#b42519] text-white hover:bg-[#7a160d] flex items-center gap-2 shadow-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <UserPlus className="h-4 w-4" />
                    Daftar
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </div>
      )}
    </>
  );
};

export default Navbar;
