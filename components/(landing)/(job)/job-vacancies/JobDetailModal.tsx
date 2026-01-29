"use client";

import Link from "next/link";
import { X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { JobVacancy } from "@/data/(landing)/(job)/job-vacancies/job-vacancies";

interface JobDetailModalProps {
  job: JobVacancy | null;
  onClose: () => void;
}

export function JobDetailModal({ job, onClose }: JobDetailModalProps) {
  if (!job) return null;

  const isFullTime = job.type === "Full-time";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <Badge
                className={cn(
                  "mb-2 rounded-full shadow-lg",
                  isFullTime
                    ? "bg-[#b42519] text-white"
                    : "bg-[#d2a741] text-white"
                )}
              >
                {job.type}
              </Badge>
              <h2 className="text-2xl font-bold">{job.title}</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Tutup"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center text-gray-500 mt-2 mb-6">
            <MapPin className="w-4 h-4 mr-1 shrink-0" />
            <span className="text-sm">{job.location}</span>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[#b42519]">
                Deskripsi Pekerjaan
              </h3>
              <p className="text-gray-600">{job.description}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[#b42519]">
                Kualifikasi
              </h3>
              <ul className="space-y-2">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-[#b42519] mr-2">•</span>
                    <span className="text-gray-600">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[#b42519]">
                Tanggung Jawab
              </h3>
              <ul className="space-y-2">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-[#b42519] mr-2">•</span>
                    <span className="text-gray-600">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[#b42519]">
                Benefit
              </h3>
              <ul className="space-y-2">
                {job.benefits.map((benefit, idx) => (
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
                  <p className="text-sm text-gray-500">
                    Diposting: {job.postedDate}
                  </p>
                  <p className="text-sm text-gray-500">
                    Ditutup: {job.endDate}
                  </p>
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
  );
}
