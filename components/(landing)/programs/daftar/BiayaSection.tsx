"use client";

interface BiayaSectionProps {
  priceLoading: boolean;
  pricePreview: number | null;
  programId: string;
  jenjangId: string;
  paketId: string;
}

export function BiayaSection({
  priceLoading,
  pricePreview,
  programId,
  jenjangId,
  paketId,
}: BiayaSectionProps) {
  const hasSelection = programId && jenjangId && paketId;

  return (
    <div className="rounded-lg border bg-slate-50 p-4">
      {priceLoading ? (
        <p className="text-sm text-muted-foreground">Memuat harga...</p>
      ) : pricePreview != null ? (
        <p className="text-lg font-semibold text-[#b42519]">
          Harga:{" "}
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
          }).format(pricePreview)}
        </p>
      ) : hasSelection ? (
        <p className="text-sm text-amber-600">
          Harga tidak ditemukan untuk kombinasi ini.
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">
          Pilih Jenjang, Program, Paket, dan Tanggal Mulai untuk melihat harga.
        </p>
      )}
    </div>
  );
}
