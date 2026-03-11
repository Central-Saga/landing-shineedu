"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import type { Jenjang, Program, PaketHargaItem } from "@/lib/api";

interface ProdukLayananSectionProps {
  jenjangs: Jenjang[];
  filteredPrograms: Program[];
  paketItems: PaketHargaItem[];
  jenjangId: string;
  setJenjangId: (v: string) => void;
  programId: string;
  setProgramId: (v: string) => void;
  paketId: string;
  setPaketId: (v: string) => void;
  jumlahSiswa: number;
  setJumlahSiswa: (v: number) => void;
  catalogLoading: boolean;
  isReguler: boolean;
}

export function ProdukLayananSection({
  jenjangs,
  filteredPrograms,
  paketItems,
  jenjangId,
  setJenjangId,
  programId,
  setProgramId,
  paketId,
  setPaketId,
  jumlahSiswa,
  setJumlahSiswa,
  catalogLoading,
  isReguler,
}: ProdukLayananSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label>Jenjang</Label>
        <Select
          value={jenjangId}
          onValueChange={setJenjangId}
          disabled={catalogLoading}
        >
          <SelectTrigger className="mt-1 w-full">
            <SelectValue placeholder="Pilih Jenjang" />
          </SelectTrigger>
          <SelectContent>
            {jenjangs.map((j) => (
              <SelectItem key={j.id} value={String(j.id)}>
                {j.nama}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Program</Label>
        <Select
          value={programId}
          onValueChange={setProgramId}
          disabled={!jenjangId || catalogLoading}
        >
          <SelectTrigger className="mt-1 w-full">
            <SelectValue
              placeholder={
                !jenjangId ? "Pilih jenjang dulu" : "Pilih Program"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {filteredPrograms.map((p) => (
              <SelectItem key={p.id} value={String(p.id)}>
                {p.nama}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Paket</Label>
        <Select
          value={paketId}
          onValueChange={setPaketId}
          disabled={!programId}
        >
          <SelectTrigger className="mt-1 w-full">
            <SelectValue
              placeholder={
                !programId ? "Pilih program dulu" : "Pilih Paket"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {paketItems.map((item) =>
              item.paket ? (
                <SelectItem
                  key={item.paket.id}
                  value={String(item.paket.id)}
                >
                  {item.paket.nama}
                </SelectItem>
              ) : null
            )}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="jumlah_siswa">Jumlah Siswa</Label>
        <Input
          id="jumlah_siswa"
          type="number"
          min={1}
          value={jumlahSiswa}
          onChange={(e) =>
            setJumlahSiswa(Number(e.target.value) || 1)
          }
          disabled={isReguler || !paketId}
          className="mt-1"
        />
        <p className="text-xs text-muted-foreground mt-1">
          {isReguler
            ? "Paket reguler dibatasi 1 siswa"
            : "Untuk private/semi-private"}
        </p>
      </div>
    </div>
  );
}
