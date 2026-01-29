"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type BiayaStatus = "UNPAID" | "PAID" | "WAIVED";

interface BiayaPendaftaranSectionProps {
  biayaPendaftaran: number;
  setBiayaPendaftaran: (v: number) => void;
  biayaStatus: BiayaStatus;
  setBiayaStatus: (v: BiayaStatus) => void;
  biayaDueDate: string;
  setBiayaDueDate: (v: string) => void;
}

export function BiayaPendaftaranSection({
  biayaPendaftaran,
  setBiayaPendaftaran,
  biayaStatus,
  setBiayaStatus,
  biayaDueDate,
  setBiayaDueDate,
}: BiayaPendaftaranSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="biaya_pendaftaran">
          Nominal Biaya Pendaftaran
        </Label>
        <Input
          id="biaya_pendaftaran"
          type="number"
          min={0}
          value={biayaPendaftaran || ""}
          onChange={(e) => {
            const v = Number(e.target.value) || 0;
            setBiayaPendaftaran(v);
            setBiayaStatus(v > 0 ? "UNPAID" : "WAIVED");
          }}
          className="mt-1"
        />
      </div>
      <div>
        <Label>Status Pembayaran</Label>
        <Select
          value={biayaStatus}
          onValueChange={(v) =>
            setBiayaStatus(v as BiayaStatus)
          }
          disabled={biayaPendaftaran === 0}
        >
          <SelectTrigger className="mt-1 w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="UNPAID">Unpaid</SelectItem>
            <SelectItem value="PAID">Paid</SelectItem>
            <SelectItem value="WAIVED">Waived</SelectItem>
          </SelectContent>
        </Select>
        {biayaPendaftaran === 0 && (
          <p className="text-xs text-muted-foreground mt-1">
            Otomatis WAIVED jika 0
          </p>
        )}
      </div>
      {biayaPendaftaran > 0 && biayaStatus !== "WAIVED" && (
        <div>
          <Label htmlFor="biaya_due">Jatuh Tempo</Label>
          <Input
            id="biaya_due"
            type="date"
            value={biayaDueDate}
            onChange={(e) => setBiayaDueDate(e.target.value)}
            className="mt-1"
          />
        </div>
      )}
    </div>
  );
}
