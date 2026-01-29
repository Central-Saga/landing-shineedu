"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { Program } from "@/data/(landing)/programs";

interface ProgramDetailModalProps {
  selectedProgram: number | null;
  selectedProgramData: Program | null;
  onClose: () => void;
  buildWhatsappUrl: (message: string) => string;
  hubungiWaMessage: string;
}

export function ProgramDetailModal({
  selectedProgram,
  selectedProgramData,
  onClose,
  buildWhatsappUrl,
  hubungiWaMessage,
}: ProgramDetailModalProps) {
  if (!selectedProgram) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold">
              {selectedProgramData?.title}
            </h2>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
              type="button"
              aria-label="Tutup"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="mt-6">
            <div className="relative h-64 rounded-lg overflow-hidden mb-6 flex items-center justify-center">
              <div className="absolute inset-0">
                <Image
                  src={selectedProgramData?.image ?? ""}
                  alt={selectedProgramData?.title ?? ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 672px"
                />
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-2 text-[#b42519]">
              Deskripsi Program
            </h3>
            <p className="text-gray-600 mb-4">
              {selectedProgramData?.description}
            </p>

            <h3 className="text-lg font-semibold mb-2 text-[#b42519]">
              Fitur Program
            </h3>
            <ul className="space-y-2 mb-6">
              {selectedProgramData?.features?.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2 text-[#b42519]">✓</span>
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold mb-2 text-[#b42519]">
              Jadwal dan Biaya
            </h3>
            <p className="text-gray-600 mb-6">
              Untuk informasi lebih lanjut mengenai jadwal dan biaya program,
              silahkan menghubungi kami melalui kontak yang tersedia.
            </p>

            <div className="flex gap-4">
              <Button
                asChild
                className="bg-[#b42519] hover:bg-[#7a160d] text-white shadow-md"
              >
                <Link
                  href={
                    selectedProgram
                      ? `/programs/daftar?programId=${selectedProgram}`
                      : "/programs/daftar"
                  }
                >
                  Daftar Program
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-[#b42519] text-[#b42519] hover:bg-[#b42519] hover:text-white"
              >
                <a
                  href={buildWhatsappUrl(hubungiWaMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hubungi via WA
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
