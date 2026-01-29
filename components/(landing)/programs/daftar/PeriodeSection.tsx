"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface PeriodeSectionProps {
  tanggalMulai: string;
  setTanggalMulai: (v: string) => void;
  tanggalSelesai: string;
  setTanggalSelesai: (v: string) => void;
  catatan: string;
  setCatatan: (v: string) => void;
}

export function PeriodeSection({
  tanggalMulai,
  setTanggalMulai,
  tanggalSelesai,
  setTanggalSelesai,
  catatan,
  setCatatan,
}: PeriodeSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="tanggal_mulai">Tanggal Mulai</Label>
        <Input
          id="tanggal_mulai"
          type="date"
          value={tanggalMulai}
          onChange={(e) => setTanggalMulai(e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="tanggal_selesai">Tanggal Selesai</Label>
        <Input
          id="tanggal_selesai"
          type="date"
          value={tanggalSelesai}
          onChange={(e) => setTanggalSelesai(e.target.value)}
          className="mt-1"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Kosongkan jika aktif berkelanjutan
        </p>
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="catatan">Catatan</Label>
        <Textarea
          id="catatan"
          placeholder="Catatan tambahan (opsional)"
          value={catatan}
          onChange={(e) => setCatatan(e.target.value)}
          className="mt-1"
          rows={2}
        />
      </div>
    </div>
  );
}
