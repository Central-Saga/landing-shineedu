"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trackJobApplication, type JobApplicationTrackResponse } from "@/lib/api";
import { cn } from "@/lib/utils";

const STATUS_LABELS: Record<string, { label: string; description: string; color: string }> = {
  pending: {
    label: "Menunggu Review",
    description: "Lamaran Anda telah diterima dan sedang dalam antrean untuk ditinjau oleh tim HR.",
    color: "bg-amber-500",
  },
  reviewed: {
    label: "Sudah Ditinjau",
    description: "Lamaran Anda telah ditinjau oleh tim kami.",
    color: "bg-blue-500",
  },
  shortlisted: {
    label: "Shortlist",
    description: "Anda masuk dalam daftar kandidat terpilih. Tim kami akan menghubungi Anda untuk tahap selanjutnya.",
    color: "bg-emerald-500",
  },
  rejected: {
    label: "Tidak Diteruskan",
    description: "Maaf, untuk lowongan ini kami memutuskan untuk tidak melanjutkan ke tahap berikutnya.",
    color: "bg-red-500",
  },
  hired: {
    label: "Diterima",
    description: "Selamat! Anda diterima. Tim HR akan menghubungi Anda untuk proses selanjutnya.",
    color: "bg-green-500",
  },
};

function formatDate(iso?: string | null): string {
  if (!iso) return "-";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return iso;
  }
}

export function TrackApplicationForm() {
  const [trackingData, setTrackingData] = useState({
    applicationId: "",
    email: "",
  });
  const [trackingResult, setTrackingResult] = useState<JobApplicationTrackResponse | null>(null);
  const [trackingError, setTrackingError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTrackingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTrackingError("");
    setTrackingResult(null);

    const id = String(trackingData.applicationId ?? "").trim();
    const email = String(trackingData.email ?? "").trim();

    if (!id) {
      setTrackingError("ID Aplikasi wajib diisi");
      return;
    }
    if (!email) {
      setTrackingError("Email wajib diisi");
      return;
    }

    setIsLoading(true);
    try {
      const result = await trackJobApplication(id, email);
      setTrackingResult(result);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Data aplikasi tidak ditemukan.";
      setTrackingError(msg);
    } finally {
      setIsLoading(false);
    }
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
          disabled={isLoading}
          className="w-full bg-[#DAA625] hover:bg-[#d2a741] text-white btn-animate disabled:opacity-50"
        >
          {isLoading ? "Memeriksa..." : "Cek Status"}
        </Button>
      </form>

      {trackingResult && (
        <div className="mt-8 border-t border-border pt-6">
          <h3 className="text-lg font-semibold mb-4 text-[#C40503]">
            Status Lamaran
          </h3>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div
                className={cn(
                  "w-3 h-3 rounded-full",
                  STATUS_LABELS[trackingResult.status]?.color ?? "bg-gray-500"
                )}
              />
              <span className="font-medium">
                {STATUS_LABELS[trackingResult.status]?.label ?? trackingResult.status}
              </span>
            </div>
            {trackingResult.position && (
              <p className="text-sm text-gray-600 mb-2">
                Posisi: {trackingResult.position.title}
                {trackingResult.position.location ? ` - ${trackingResult.position.location}` : ""}
              </p>
            )}
            <p className="text-gray-600">
              {STATUS_LABELS[trackingResult.status]?.description ??
                "Status lamaran Anda telah diperbarui."}
            </p>
            <p className="text-sm text-gray-500 mt-3">
              Diperbarui: {formatDate(trackingResult.updated_at ?? trackingResult.created_at)}
            </p>
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

