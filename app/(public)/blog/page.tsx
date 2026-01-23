"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/landing/sections/Navbar";
import Footer from "@/components/landing/sections/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";
import { blogPosts, blogCategories } from "@/data/landing/blog-posts";
import { LightBackground } from "@/components/animations/BackgroundAnimations";
import { Container } from "@/components/landing/Container";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    // Filter by category
    const categoryMatch = activeCategory === "Semua" || post.category === activeCategory;

    // Filter by search query
    const searchMatch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && searchMatch;
  });

  return (
    <main className="min-h-screen relative bg-white">
      <LightBackground />

      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-[#b42519]">
                Blog & Artikel
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Informasi, tips, dan pengetahuan seputar pendidikan dan perkembangan anak
            </p>
            <div className="w-24 h-1 bg-[#b42519] mx-auto mb-10"></div>
          </motion.div>
        </Container>
      </section>

      {/* Search and Filter Section */}
      <section className="pb-8 bg-white">
        <Container>
          <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between max-w-6xl mx-auto">
            {/* Search Bar */}
            <div className="relative w-full md:w-72">
              <Input
                type="text"
                placeholder="Cari artikel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full w-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>

            {/* Categories Filter */}
            <div className="flex flex-wrap gap-2">
              {blogCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-1 text-sm rounded-full transition-all ${activeCategory === category
                    ? "bg-[#b42519] text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-8 bg-white">
        <Container>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl text-gray-600">Tidak ada artikel yang ditemukan.</h3>
              <p className="mt-2 text-gray-500">Silakan coba kata kunci lain atau ubah kategori.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <Card
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-52 overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className="absolute top-4 left-4 z-10">
                        <Badge className="bg-white/90 text-[#b42519] hover:bg-white shadow-md rounded-full">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-6 bg-white">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <span>Oleh {post.author}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 line-clamp-2 text-gray-900">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <Link href={`/blog/${post.id}`}>
                        <Button variant="link" className="p-0 h-auto text-[#b42519] hover:text-[#7a160d]">
                          Baca Selengkapnya →
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-white mt-12">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-[#b42519]">
              Dapatkan Artikel Terbaru
            </h2>
            <p className="text-gray-600 mb-6">
              Berlangganan newsletter kami untuk mendapatkan update artikel, tips pendidikan, dan informasi program terbaru dari Shine Education.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Alamat email Anda"
                className="rounded-full"
              />
              <Button className="bg-[#b42519] text-white rounded-full hover:bg-[#7a160d] min-w-[120px] shadow-md">
                Langganan
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
