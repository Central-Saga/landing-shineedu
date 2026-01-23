"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, BookOpen, Star } from "lucide-react";
import { Section } from "../Section";
import { Container } from "../Container";

const HeroSection = () => {
  return (
    <Section
      id="hero-section"
      className="min-h-[90vh] flex items-center"
      padding="none"
    >
      <Container className="relative z-10 py-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left lg:pr-8 space-y-6">
            <div className="inline-block">
              <Badge 
                variant="secondary" 
                className="bg-[#b42519] text-white shadow-md inline-flex items-center gap-2 text-base px-5 py-2.5 mb-4 rounded-full"
              >
                <Star className="h-4 w-4 fill-white" />
                #1 Bimbel di Tabanan
                <span className="text-2xl">👋</span>
              </Badge>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-[#b42519] block">
                  Shine Education
                </span>
                <span className="text-[#d2a741] inline-block mt-2">
                  Bimbingan Belajar
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed">
                Belajar jadi lebih seru! 🚀 Bergabung dengan teman-teman hebat dan
                guru yang keren. Raih mimpimu dengan cara yang menyenangkan! ✨
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
              <Button 
                size="lg"
                className="bg-[#b42519] text-white px-8 py-6 rounded-full text-lg font-semibold hover:bg-[#7a160d] shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                <GraduationCap className="h-5 w-5" />
                Mulai Belajar
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 rounded-full text-lg font-semibold border-2 border-[#b42519] text-[#b42519] hover:bg-[#b42519] hover:text-white transition-all duration-300 flex items-center gap-2 bg-white"
              >
                <BookOpen className="h-5 w-5" />
                Pelajari Selengkapnya
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="lg:w-1/2 flex items-center justify-center">
            <div className="w-full max-w-[600px] relative">
              <div className="absolute inset-0 bg-[#b42519]/5 rounded-[2rem] blur-2xl transform rotate-6" />
              <div className="relative z-10 rounded-[2rem] overflow-hidden aspect-[3/2]">
                <Image
                  src="/pichome/hero-section3.svg"
                  alt="Students Learning"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default HeroSection;
