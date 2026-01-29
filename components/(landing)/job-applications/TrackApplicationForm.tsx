"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type TrackingResult = {
  status: string;
  details: string;
  nextSteps: string;
  date: string;
};

export function TrackApplicationForm() {
  const [trackingData, setTrackingData] = useState({
    applicationId: "",
    email: "",
  });
  const [trackingResult, setTrackingResult] = useState<TrackingResult | null>(null);
  const [trackingError, setTrackingError] = useState("");

  const handleTrackingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;
    if (!trackingData.applicationId.trim()) {
      setTrackingError("ID Aplikasi wajib diisi");
      hasError = true;
    } else if (!trackingData.email.trim()) {
      setTrackingError("Email wajib diisi");
      hasError = true;
    }

    if (hasError) return;

    setTimeout(() => {
      if (trackingData.applicationId && trackingData.email) {
        setTrackingResult({
          status: "Dalam Proses Review",
          details: "Lamaran Anda sedang dalam proses review oleh tim HR kami.",
          nextSteps:
            "Anda akan dihubungi melalui email atau telepon jika terpilih untuk tahap wawancara.",
          date: "Diperbarui pada: 4 Juli 2025",
        });
        setTrackingError("");
      } else {
        setTrackingError("Data aplikasi tidak ditemukan");
        setTrackingResult(null);
      }
    }, 800);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      <h2 className="text-2xl font-semibold mb-6 text-[#C40503]">
        Pantau Status Lamaran
      </h2>

      <form onSubmit={handleTrackingSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="applicationId">
              ID Aplikasi <span className="text-[#C40503]">*</span>
            </Label>
            <Input
              id="applicationId"
              value={trackingData.applicationId}
              onChange={(e) =>
                setTrackingData((prev) => ({
                  ...prev,
                  applicationId: e.target.value,
                }))
              }
              placeholder="Contoh: APP123456789"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="trackingEmail">
              Email <span className="text-[#C40503]">*</span>
            </Label>
            <Input
              id="trackingEmail"
              type="email"
              value={trackingData.email}
              onChange={(e) =>
                setTrackingData((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="Email yang digunakan saat melamar"
            />
          </div>
        </div>

        {trackingError && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm border border-destructive/20">
            {trackingError}
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-[#DAA625] hover:bg-[#d2a741] text-white btn-animate"
        >
          Cek Status
        </Button>
      </form>

      {trackingResult && (
        <div className="mt-8 border-t border-border pt-6">
          <h3 className="text-lg font-semibold mb-4 text-[#C40503]">
            Status Lamaran
          </h3>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <span className="font-medium">{trackingResult.status}</span>
            </div>

            <div className="space-y-3 text-gray-600">
              <p>{trackingResult.details}</p>
              <p>
                <span className="font-medium">Langkah Selanjutnya:</span>{" "}
                {trackingResult.nextSteps}
              </p>
              <p className="text-sm text-gray-500">{trackingResult.date}</p>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center text-sm">
            <span className="text-gray-600">
              Ada pertanyaan? Hubungi kami di{" "}
              <span className="font-medium">recruitment@shineeducation.com</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

