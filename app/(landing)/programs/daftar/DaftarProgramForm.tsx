"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/(landing)/Container";
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
import { defaultMurid, defaultWali, type MuridState, type WaliState } from "./types";
import { DataMuridSection } from "./DataMuridSection";
import { DataWaliSection } from "./DataWaliSection";
import { ProdukLayananSection } from "./ProdukLayananSection";
import { PeriodeSection } from "./PeriodeSection";
import { BiayaSection } from "./BiayaSection";

interface DaftarProgramFormProps {
  programIdParam: string | null;
  onSuccess: () => void;
}

export function DaftarProgramForm({
  programIdParam,
  onSuccess,
}: DaftarProgramFormProps) {
  const [jenjangs, setJenjangs] = useState<Jenjang[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([]);
  const [paketItems, setPaketItems] = useState<PaketHargaItem[]>([]);
  const [pricePreview, setPricePreview] = useState<number | null>(null);
  const [priceLoading, setPriceLoading] = useState(false);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [murid, setMurid] = useState<MuridState>(defaultMurid);
  const [wali, setWali] = useState<WaliState>(defaultWali);
  const [jenjangId, setJenjangId] = useState("");
  const [programId, setProgramId] = useState("");
  const [paketId, setPaketId] = useState("");
  const [jumlahSiswa, setJumlahSiswa] = useState(1);
  const [tanggalMulai, setTanggalMulai] = useState(() =>
    new Date().toISOString().split("T")[0]
  );
  const [tanggalSelesai, setTanggalSelesai] = useState("");
  const [catatan, setCatatan] = useState("");

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
        biaya_pendaftaran_amount: 0,
        biaya_pendaftaran_status: "WAIVED",
        biaya_pendaftaran_due_date: undefined,
      };
      await submitLandingRegister(payload);
      onSuccess();
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Gagal mendaftar."
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
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
            Isi data murid dan pilih program. Data akan masuk ke enrollment di
            admin dan akun siswa akan dibuat otomatis.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Accordion defaultValue="data-murid" collapsible>
              <AccordionItem value="data-murid">
                <AccordionTrigger>Informasi Murid</AccordionTrigger>
                <AccordionContent>
                  <DataMuridSection murid={murid} setMurid={setMurid} />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="data-wali">
                <AccordionTrigger>Informasi Orang Tua / Wali</AccordionTrigger>
                <AccordionContent>
                  <DataWaliSection wali={wali} setWali={setWali} />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="data-produk">
                <AccordionTrigger>Produk & Layanan</AccordionTrigger>
                <AccordionContent>
                  <ProdukLayananSection
                    jenjangs={jenjangs}
                    filteredPrograms={filteredPrograms}
                    paketItems={paketItems}
                    jenjangId={jenjangId}
                    setJenjangId={setJenjangId}
                    programId={programId}
                    setProgramId={setProgramId}
                    paketId={paketId}
                    setPaketId={setPaketId}
                    jumlahSiswa={jumlahSiswa}
                    setJumlahSiswa={setJumlahSiswa}
                    catalogLoading={catalogLoading}
                    isReguler={isReguler}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="data-periode">
                <AccordionTrigger>Periode & Catatan</AccordionTrigger>
                <AccordionContent>
                  <PeriodeSection
                    tanggalMulai={tanggalMulai}
                    setTanggalMulai={setTanggalMulai}
                    tanggalSelesai={tanggalSelesai}
                    setTanggalSelesai={setTanggalSelesai}
                    catatan={catatan}
                    setCatatan={setCatatan}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="data-biaya">
                <AccordionTrigger>Rincian Biaya</AccordionTrigger>
                <AccordionContent>
                  <BiayaSection
                    priceLoading={priceLoading}
                    pricePreview={pricePreview}
                    programId={programId}
                    jenjangId={jenjangId}
                    paketId={paketId}
                  />
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
  );
}
