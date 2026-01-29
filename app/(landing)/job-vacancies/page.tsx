"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/(landing)/homes/Navbar";
import Footer from "@/components/(landing)/homes/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { X, MapPin, TrendingUp, Users, Clock } from "lucide-react";
import { vacancyData } from "@/data/landing/job-vacancies";
import { LightBackground } from "@/components/animations/BackgroundAnimations";
import { Container } from "@/components/(landing)/Container";

export default function JobVacanciesPage() {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);

  return (
    <main className="min-h-screen relative bg-white">
      <LightBackground />

      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-[#b42519]">
                Lowongan
              </span> <span className="text-[#d2a741]">Kerja</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Bergabunglah dengan tim kami dan jadilah bagian dari perjalanan mencerdaskan generasi penerus bangsa.
            </p>
            <div className="w-24 h-1 bg-[#b42519] mx-auto mb-10"></div>
          </motion.div>
        </Container>
      </section>

      {/* Job Listings */}
      <section className="py-12 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vacancyData.map((job) => (
              <Card
                key={job.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <Badge className={`
                      border-2 ${job.type === 'Full-time' ?
                        'bg-[#b42519] text-white border-[#7a160d] shadow-md' :
                        'bg-[#d2a741] text-white border-[#ad8934] shadow-md'}
                    `}>
                      {job.type}
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      Ditutup: {job.endDate}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{job.title}</h3>

                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{job.location}</span>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2 text-gray-900">Kualifikasi:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {job.requirements.slice(0, 3).map((req, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-[#b42519] mr-2">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                      {job.requirements.length > 3 && (
                        <li className="text-sm text-gray-500 italic">
                          +{job.requirements.length - 3} kualifikasi lainnya
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <span className="text-xs text-gray-500">
                      Diposting: {job.postedDate}
                    </span>
                    <Button
                      onClick={() => setSelectedJob(job.id)}
                      className="bg-[#b42519] hover:bg-[#7a160d] text-white shadow-md"
                    >
                      Detail
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Join Us */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#b42519]">
              Mengapa Bergabung dengan Shine Education?
            </h2>
            <p className="text-gray-600">
              Bekerja bersama kami memberikan kesempatan untuk tumbuh dan berkembang dalam lingkungan yang mendukung
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6">
              <div className="w-14 h-14 rounded-full bg-[#b42519] flex items-center justify-center mb-4 shadow-lg">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#b42519]">Pengembangan Karir</h3>
              <p className="text-gray-600">
                Kami menawarkan jalur pengembangan karir yang jelas dan kesempatan pelatihan berkelanjutan untuk semua karyawan.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-[#d2a741] flex items-center justify-center mb-4 border-2 border-[#ad8934] shadow-md">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#b42519]">Tim yang Supportif</h3>
              <p className="text-gray-600">
                Bekerja dalam lingkungan kolaboratif dengan rekan kerja yang bersemangat dan saling mendukung.
              </p>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6">
              <div className="w-14 h-14 rounded-full bg-[#d2a741] flex items-center justify-center mb-4 shadow-lg">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#b42519]">Work-Life Balance</h3>
              <p className="text-gray-600">
                Kami menghargai keseimbangan antara pekerjaan dan kehidupan pribadi dengan menawarkan jadwal yang fleksibel dan kebijakan yang berpihak pada karyawan.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* Application CTA */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-5xl mx-auto bg-[#b42519] rounded-2xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-10">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Siap Bergabung dengan Tim Kami?
                </h2>
                <p className="text-white/90 mb-6">
                  Kirimkan lamaran Anda sekarang dan jadilah bagian dari perjalanan kami mencerdaskan generasi masa depan.
                </p>
                <Link href="/job-applications">
                  <Button className="bg-white text-[#b42519] hover:bg-gray-100">
                    Kirim Lamaran Sekarang
                  </Button>
                </Link>
              </div>
              <div className="hidden md:block relative">
                <div className="absolute inset-0 bg-white/10">
                  <div className="h-full w-full flex items-center justify-center">
                    <svg className="w-24 h-24 text-white opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <Badge className={`
                    mb-2 rounded-full ${vacancyData.find(job => job.id === selectedJob)?.type === 'Full-time' ?
                      'bg-[#b42519] text-white shadow-lg' :
                      'bg-[#d2a741] text-white shadow-lg'
                    }
                  `}>
                    {vacancyData.find(job => job.id === selectedJob)?.type}
                  </Badge>
                  <h2 className="text-2xl font-bold">
                    {vacancyData.find(job => job.id === selectedJob)?.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex items-center text-gray-500 mt-2 mb-6">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{vacancyData.find(job => job.id === selectedJob)?.location}</span>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[#b42519]">Deskripsi Pekerjaan</h3>
                  <p className="text-gray-600">
                    {vacancyData.find(job => job.id === selectedJob)?.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[#b42519]">Kualifikasi</h3>
                  <ul className="space-y-2">
                    {vacancyData.find(job => job.id === selectedJob)?.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-[#b42519] mr-2">•</span>
                        <span className="text-gray-600">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[#b42519]">Tanggung Jawab</h3>
                  <ul className="space-y-2">
                    {vacancyData.find(job => job.id === selectedJob)?.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-[#b42519] mr-2">•</span>
                        <span className="text-gray-600">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[#b42519]">Benefit</h3>
                  <ul className="space-y-2">
                    {vacancyData.find(job => job.id === selectedJob)?.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-[#b42519] mr-2">•</span>
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-sm text-gray-500">Diposting: {vacancyData.find(job => job.id === selectedJob)?.postedDate}</p>
                      <p className="text-sm text-gray-500">Ditutup: {vacancyData.find(job => job.id === selectedJob)?.endDate}</p>
                    </div>
                    <Link href="/job-applications">
                      <Button className="bg-[#b42519] hover:bg-[#7a160d] text-white shadow-md">
                        Lamar Sekarang
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
