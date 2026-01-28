"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/landing/sections/Navbar";
import Footer from "@/components/landing/sections/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/landing/Container";
import {
  fetchPublicJenjang,
  fetchPublicProgram,
  fetchPublicPaketHarga,
  fetchPublicHargaLookup,
  submitLandingRegister,
  type Jenjang,
  type Program,
  type PaketHargaItem,
  type LandingRegisterPayload,
} from "@/lib/api";
import { LightBackground } from "@/components/animations/BackgroundAnimations";

const defaultMurid = {
  nama_lengkap: "",
  no_hp: "",
  email: "",
  jenis_kelamin: "" as "" | "L" | "P",
  tanggal_lahir: "",
  alamat: "",
};
const defaultWali = {
  nama_wali: "",
  email_wali: "",
  no_hp_wali: "",
  hubungan_wali: "",
};

export default function DaftarProgramPage() {
  const searchParams = useSearchParams();
  const programIdParam = searchParams.get("programId");

  const [jenjangs, setJenjangs] = useState<Jenjang[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([]);
  const [paketItems, setPaketItems] = useState<PaketHargaItem[]>([]);
  const [pricePreview, setPricePreview] = useState<number | null>(null);
  const [priceLoading, setPriceLoading] = useState(false);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [murid, setMurid] = useState(defaultMurid);
  const [wali, setWali] = useState(defaultWali);
  const [jenjangId, setJenjangId] = useState<string>("");
  const [programId, setProgramId] = useState<string>("");
  const [paketId, setPaketId] = useState<string>("");
  const [jumlahSiswa, setJumlahSiswa] = useState(1);
  const [tanggalMulai, setTanggalMulai] = useState(() =>
    new Date().toISOString().split("T")[0]
  );
  const [tanggalSelesai, setTanggalSelesai] = useState("");
  const [catatan, setCatatan] = useState("");
  const [biayaPendaftaran, setBiayaPendaftaran] = useState(0);
  const [biayaStatus, setBiayaStatus] = useState<"UNPAID" | "PAID" | "WAIVED">(
    "WAIVED"
  );
  const [biayaDueDate, setBiayaDueDate] = useState("");

  useEffect(() => {
    const load = async () => {
      setCatalogLoading(true);
      try {
        const [jData, pData] = await Promise.all([
          fetchPublicJenjang(),
          fetchPublicProgram(),
        ]);
        setJenjangs(jData);
        setPrograms(pData);
      } catch {
        setJenjangs([]);
        setPrograms([]);
      } finally {
        setCatalogLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (!programIdParam) return;
    const id = programIdParam;
    if (jenjangs.length && programs.length) {
      const prog = programs.find((p) => String(p.id) === id);
      if (prog?.jenjangs?.[0]) {
        setJenjangId(String(prog.jenjangs[0].id));
        setProgramId(id);
      }
    }
  }, [programIdParam, jenjangs.length, programs]);

  useEffect(() => {
    if (!jenjangId) {
      setFilteredPrograms([]);
      setProgramId("");
      setPaketId("");
      setPaketItems([]);
      return;
    }
    const filtered = programs.filter((p) =>
      p.jenjangs?.some((j) => String(j.id) === jenjangId)
    );
    setFilteredPrograms(filtered);
    if (programId && !filtered.some((p) => String(p.id) === programId)) {
      setProgramId("");
      setPaketId("");
      setPaketItems([]);
    }
  }, [jenjangId, programs, programId]);

  const loadPakets = useCallback(async () => {
    if (!programId || !jenjangId) {
      setPaketItems([]);
      setPaketId("");
      return;
    }
    try {
      const items = await fetchPublicPaketHarga({
        program_id: Number(programId),
        jenjang_id: Number(jenjangId),
      });
      const seen = new Set<number>();
      const unique = items.filter((i) => {
        if (i.paket_id && !seen.has(i.paket_id)) {
          seen.add(i.paket_id);
          return true;
        }
        return false;
      });
      setPaketItems(unique);
      if (
        paketId &&
        !unique.some((u) => u.paket_id && String(u.paket_id) === paketId)
      ) {
        setPaketId("");
      }
    } catch {
      setPaketItems([]);
    }
  }, [programId, jenjangId, paketId]);

  useEffect(() => {
    loadPakets();
  }, [loadPakets]);

  useEffect(() => {
    if (
      !programId ||
      !jenjangId ||
      !paketId ||
      !jumlahSiswa ||
      !tanggalMulai
    ) {
      setPricePreview(null);
      return;
    }
    setPriceLoading(true);
    setPricePreview(null);
    fetchPublicHargaLookup({
      program_id: Number(programId),
      jenjang_id: Number(jenjangId),
      paket_id: Number(paketId),
      jumlah_siswa: jumlahSiswa,
      tanggal: tanggalMulai,
    })
      .then((r) => {
        if (r?.harga != null) setPricePreview(Number(r.harga));
        else setPricePreview(null);
      })
      .catch(() => setPricePreview(null))
      .finally(() => setPriceLoading(false));
  }, [programId, jenjangId, paketId, jumlahSiswa, tanggalMulai]);

  const selectedPaket = paketItems.find(
    (p) => p.paket_id && String(p.paket_id) === paketId
  );
  const isReguler = selectedPaket?.paket?.tipe === "REGULER";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!murid.nama_lengkap.trim()) {
      setSubmitError("Nama lengkap murid wajib diisi.");
      return;
    }
    if (!murid.no_hp.trim()) {
      setSubmitError("No. HP murid wajib diisi.");
      return;
    }
    if (!murid.email.trim()) {
      setSubmitError("Email murid wajib diisi.");
      return;
    }
    if (!programId || !jenjangId || !paketId) {
      setSubmitError("Pilih Jenjang, Program, dan Paket.");
      return;
    }
    setSubmitLoading(true);
    try {
      const payload: LandingRegisterPayload = {
        murid_baru: {
          nama_lengkap: murid.nama_lengkap.trim(),
          no_hp: murid.no_hp.trim(),
          email: murid.email.trim(),
          jenis_kelamin: murid.jenis_kelamin || undefined,
          tanggal_lahir: murid.tanggal_lahir || undefined,
          alamat: murid.alamat || undefined,
          nama_wali: wali.nama_wali || undefined,
          email_wali: wali.email_wali || undefined,
          no_hp_wali: wali.no_hp_wali || undefined,
          hubungan_wali: wali.hubungan_wali || undefined,
        },
        program_id: Number(programId),
        jenjang_id: Number(jenjangId),
        paket_id: Number(paketId),
        jumlah_siswa: isReguler ? 1 : jumlahSiswa,
        tanggal_mulai: tanggalMulai || undefined,
        tanggal_selesai: tanggalSelesai || undefined,
        catatan: catatan || undefined,
        biaya_pendaftaran_amount: biayaPendaftaran,
        biaya_pendaftaran_status: biayaStatus,
        biaya_pendaftaran_due_date: biayaDueDate || undefined,
      };
      await submitLandingRegister(payload);
      setSuccess(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Gagal mendaftar.");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen relative bg-white">
        <LightBackground />
        <Navbar />
        <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative z-10">
          <Container>
            <div className="max-w-2xl mx-auto text-center bg-white rounded-2xl shadow-lg p-8">
              <h1 className="text-2xl font-bold text-[#b42519] mb-4">
                Pendaftaran Berhasil
              </h1>
              <p className="text-gray-600 mb-6">
                Data telah tersimpan. Anda akan muncul di daftar enrollment admin. Untuk informasi lebih lanjut, hubungi kami via WhatsApp.
              </p>
              <Button asChild className="bg-[#b42519] hover:bg-[#7a160d]">
                <Link href="/programs">Kembali ke Program</Link>
              </Button>
            </div>
          </Container>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen relative bg-white">
      <LightBackground />
      <Navbar />
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative z-10">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <Link
                href="/programs"
                className="text-sm text-[#b42519] hover:underline"
              >
                ← Kembali ke Program
              </Link>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#b42519] mb-2">
              Daftar Program
            </h1>
            <p className="text-gray-600 mb-8">
              Isi data murid dan pilih program. Data akan masuk ke enrollment di admin dan akun siswa akan dibuat otomatis.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Accordion defaultValue="data-murid" collapsible>
                <AccordionItem value="data-murid">
                  <AccordionTrigger>Informasi Murid</AccordionTrigger>
                  <AccordionContent>
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
                          onChange={(e) =>
                            setMurid((p) => ({ ...p, no_hp: e.target.value }))
                          }
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
                          onChange={(e) =>
                            setMurid((p) => ({ ...p, email: e.target.value }))
                          }
                          className="mt-1"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="alamat">Alamat</Label>
                        <Textarea
                          id="alamat"
                          placeholder="Alamat lengkap..."
                          value={murid.alamat}
                          onChange={(e) =>
                            setMurid((p) => ({ ...p, alamat: e.target.value }))
                          }
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="data-wali">
                  <AccordionTrigger>Informasi Orang Tua / Wali</AccordionTrigger>
                  <AccordionContent>
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
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="data-produk">
                  <AccordionTrigger>Produk & Layanan</AccordionTrigger>
                  <AccordionContent>
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
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="data-periode">
                  <AccordionTrigger>Periode & Catatan</AccordionTrigger>
                  <AccordionContent>
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
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="data-biaya">
                  <AccordionTrigger>Rincian Biaya</AccordionTrigger>
                  <AccordionContent>
                    <div className="rounded-lg border bg-slate-50 p-4">
                      {priceLoading ? (
                        <p className="text-sm text-muted-foreground">
                          Memuat harga...
                        </p>
                      ) : pricePreview != null ? (
                        <p className="text-lg font-semibold text-[#b42519]">
                          Harga:{" "}
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            maximumFractionDigits: 0,
                          }).format(pricePreview)}
                        </p>
                      ) : programId && jenjangId && paketId ? (
                        <p className="text-sm text-amber-600">
                          Harga tidak ditemukan untuk kombinasi ini.
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Pilih Jenjang, Program, Paket, dan Tanggal Mulai untuk melihat harga.
                        </p>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="data-biaya-pendaftaran">
                  <AccordionTrigger>Biaya Pendaftaran</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="biaya_pendaftaran">Nominal Biaya Pendaftaran</Label>
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
                            setBiayaStatus(v as "UNPAID" | "PAID" | "WAIVED")
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
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {submitError && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {submitError}
                </div>
              )}

              <div className="flex flex-wrap gap-3 pt-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={
                    submitLoading ||
                    !murid.nama_lengkap.trim() ||
                    !murid.no_hp.trim() ||
                    !murid.email.trim() ||
                    !programId ||
                    !jenjangId ||
                    !paketId
                  }
                  className="bg-[#b42519] hover:bg-[#7a160d] text-white px-8 font-bold"
                >
                  {submitLoading ? "Menyimpan..." : "Simpan Pendaftaran"}
                </Button>
                <Button type="button" variant="outline" size="lg" asChild>
                  <Link href="/programs">Batal</Link>
                </Button>
              </div>
            </form>
          </div>
        </Container>
      </section>
      <Footer />
    </main>
  );
}
