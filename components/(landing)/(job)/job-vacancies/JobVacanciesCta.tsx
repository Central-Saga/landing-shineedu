"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "../../Container";

export function JobVacanciesCta() {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="max-w-5xl mx-auto bg-[#b42519] rounded-2xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-10">
              <h2 className="text-3xl font-bold text-white mb-4">
                Siap Bergabung dengan Tim Kami?
              </h2>
              <p className="text-white/90 mb-6">
                Kirimkan lamaran Anda sekarang dan jadilah bagian dari
                perjalanan kami mencerdaskan generasi masa depan.
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
                  <svg
                    className="w-24 h-24 text-white opacity-30"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
