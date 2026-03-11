"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { WaliState } from "./types";

interface DataWaliSectionProps {
  wali: WaliState;
  setWali: React.Dispatch<React.SetStateAction<WaliState>>;
}

export function DataWaliSection({ wali, setWali }: DataWaliSectionProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nama_wali">Nama Wali</Label>
          <Input
            id="nama_wali"
            placeholder="Nama orang tua / wali"
            value={wali.nama_wali}
            onChange={(e) =>
              setWali((p) => ({ ...p, nama_wali: e.target.value }))
            }
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="email_wali">Email Wali</Label>
          <Input
            id="email_wali"
            type="email"
            placeholder="email@example.com"
            value={wali.email_wali}
            onChange={(e) =>
              setWali((p) => ({ ...p, email_wali: e.target.value }))
            }
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="no_hp_wali">No. HP Wali</Label>
          <Input
            id="no_hp_wali"
            placeholder="08..."
            value={wali.no_hp_wali}
            onChange={(e) =>
              setWali((p) => ({ ...p, no_hp_wali: e.target.value }))
            }
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="hubungan_wali">Hubungan Keluarga</Label>
          <Input
            id="hubungan_wali"
            placeholder="Ayah / Ibu / Dsb"
            value={wali.hubungan_wali}
            onChange={(e) =>
              setWali((p) => ({ ...p, hubungan_wali: e.target.value }))
            }
            className="mt-1"
          />
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        * Data lainnya dapat dilengkapi nanti melalui menu Edit Murid di admin.
      </p>
    </>
  );
}
