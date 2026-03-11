"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { MuridState } from "./types";

interface DataMuridSectionProps {
  murid: MuridState;
  setMurid: React.Dispatch<React.SetStateAction<MuridState>>;
}

export function DataMuridSection({ murid, setMurid }: DataMuridSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <Label htmlFor="nama_lengkap">
          Nama Lengkap <span className="text-red-500">*</span>
        </Label>
        <Input
          id="nama_lengkap"
          placeholder="Nama Murid"
          value={murid.nama_lengkap}
          onChange={(e) =>
            setMurid((p) => ({ ...p, nama_lengkap: e.target.value }))
          }
          className="mt-1"
        />
      </div>
      <div>
        <Label>Jenis Kelamin</Label>
        <div className="flex gap-6 mt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="jenis_kelamin"
              checked={murid.jenis_kelamin === "L"}
              onChange={() =>
                setMurid((p) => ({ ...p, jenis_kelamin: "L" }))
              }
            />
            Laki-laki
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="jenis_kelamin"
              checked={murid.jenis_kelamin === "P"}
              onChange={() =>
                setMurid((p) => ({ ...p, jenis_kelamin: "P" }))
              }
            />
            Perempuan
          </label>
        </div>
      </div>
      <div>
        <Label htmlFor="tanggal_lahir">Tanggal Lahir</Label>
        <Input
          id="tanggal_lahir"
          type="date"
          value={murid.tanggal_lahir}
          onChange={(e) =>
            setMurid((p) => ({ ...p, tanggal_lahir: e.target.value }))
          }
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="no_hp">
          No. HP (WhatsApp) <span className="text-red-500">*</span>
        </Label>
        <Input
          id="no_hp"
          placeholder="08..."
          value={murid.no_hp}
          onChange={(e) => setMurid((p) => ({ ...p, no_hp: e.target.value }))}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="email">
          Email Siswa <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="siswa@example.com"
          value={murid.email}
          onChange={(e) => setMurid((p) => ({ ...p, email: e.target.value }))}
          className="mt-1"
        />
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="alamat">Alamat</Label>
        <Textarea
          id="alamat"
          placeholder="Alamat lengkap..."
          value={murid.alamat}
          onChange={(e) => setMurid((p) => ({ ...p, alamat: e.target.value }))}
          className="mt-1"
          rows={3}
        />
      </div>
    </div>
  );
}
