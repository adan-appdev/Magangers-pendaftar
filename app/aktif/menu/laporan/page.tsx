"use client";

import { useMemo, useState } from "react";
import EnterAnimation from "@/components/aktif/animation/entreAnimation";
import {
  FileText,
  CalendarDays,
  BookOpen,
  ClipboardList,
  Clock,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Eye,
} from "lucide-react";

type LaporanType =
  | "Laporan Mingguan"
  | "Laporan Bulanan"
  | "Laporan Akhir"
  | "Rekap Jurnal"
  | "Rekap Tugas"
  | "Rekap Absensi";

type StatusLaporan = "Tersedia" | "Belum tersedia";

type Laporan = {
  id: number;
  tipe: LaporanType;
  judul: string;
  periode: string;
  deskripsi: string;
  status: StatusLaporan;
  tanggal: string;
};

const laporanDummy: Laporan[] = [
  {
    id: 1,
    tipe: "Laporan Mingguan",
    judul: "Laporan Mingguan - Minggu ke-1",
    periode: "01 Juli - 05 Juli 2026",
    deskripsi:
      "Rekap kegiatan, pekerjaan, dan pencapaian peserta selama satu minggu.",
    status: "Tersedia",
    tanggal: "05/07/2026",
  },
  {
    id: 2,
    tipe: "Laporan Mingguan",
    judul: "Laporan Mingguan - Minggu ke-2",
    periode: "06 Juli - 10 Juli 2026",
    deskripsi:
      "Rekap kegiatan dan perkembangan pekerjaan peserta selama minggu kedua.",
    status: "Tersedia",
    tanggal: "10/07/2026",
  },
  {
    id: 3,
    tipe: "Laporan Bulanan",
    judul: "Laporan Bulanan - Juli 2026",
    periode: "01 Juli - 31 Juli 2026",
    deskripsi:
      "Ringkasan kegiatan peserta selama satu bulan pelaksanaan magang.",
    status: "Tersedia",
    tanggal: "31/07/2026",
  },
  {
    id: 4,
    tipe: "Laporan Akhir",
    judul: "Laporan Akhir Magang",
    periode: "01 Juli - 30 September 2026",
    deskripsi:
      "Dokumen rangkuman keseluruhan kegiatan dan hasil pelaksanaan magang.",
    status: "Belum tersedia",
    tanggal: "-",
  },
  {
    id: 5,
    tipe: "Rekap Jurnal",
    judul: "Rekap Jurnal Kegiatan",
    periode: "Juli 2026",
    deskripsi:
      "Rekap seluruh jurnal kegiatan yang telah dibuat selama pelaksanaan magang.",
    status: "Tersedia",
    tanggal: "31/07/2026",
  },
  {
    id: 6,
    tipe: "Rekap Tugas",
    judul: "Rekap Tugas Peserta",
    periode: "Juli 2026",
    deskripsi:
      "Ringkasan tugas yang diberikan, dikerjakan, dan diselesaikan oleh peserta.",
    status: "Tersedia",
    tanggal: "31/07/2026",
  },
  {
    id: 7,
    tipe: "Rekap Absensi",
    judul: "Rekap Kehadiran Peserta",
    periode: "Juli 2026",
    deskripsi:
      "Rekap kehadiran, keterlambatan, izin, dan ketidakhadiran peserta.",
    status: "Tersedia",
    tanggal: "31/07/2026",
  },
];

const filterOptions: ("Semua" | LaporanType)[] = [
  "Semua",
  "Laporan Mingguan",
  "Laporan Bulanan",
  "Laporan Akhir",
  "Rekap Jurnal",
  "Rekap Tugas",
  "Rekap Absensi",
];

const iconMap: Record<LaporanType, typeof FileText> = {
  "Laporan Mingguan": CalendarDays,
  "Laporan Bulanan": FileText,
  "Laporan Akhir": BookOpen,
  "Rekap Jurnal": ClipboardList,
  "Rekap Tugas": FileText,
  "Rekap Absensi": Clock,
};

export default function LaporanPage() {
  const [filter, setFilter] =
    useState<"Semua" | LaporanType>("Semua");

  const [selectedLaporan, setSelectedLaporan] =
    useState<Laporan | null>(null);

  const laporanTampil = useMemo(() => {
    if (filter === "Semua") {
      return laporanDummy;
    }

    return laporanDummy.filter(
      (laporan) => laporan.tipe === filter
    );
  }, [filter]);

  const jumlahTersedia = laporanDummy.filter(
    (laporan) => laporan.status === "Tersedia"
  ).length;

  return (
    <div className="min-h-screen bg-white p-6 md:p-8">

      <div className="mb-8">
        <div className="mb-1 flex items-center gap-2">
          <FileText
            size={18}
            className="text-neutral-900"
          />

          <p className="text-2xl font-semibold text-neutral-900">
            Laporan Peserta
          </p>
        </div>

        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-neutral-500">
          Lihat laporan dan rekap kegiatan selama pelaksanaan
          magang.
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FileText size={19} />
          </div>

          <p className="text-sm text-neutral-500">
            Total laporan
          </p>

          <p className="mt-1 text-2xl font-semibold text-neutral-900">
            {laporanDummy.length}
          </p>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <CheckCircle2 size={19} />
          </div>

          <p className="text-sm text-neutral-500">
            Laporan tersedia
          </p>

          <p className="mt-1 text-2xl font-semibold text-neutral-900">
            {jumlahTersedia}
          </p>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <Clock size={19} />
          </div>

          <p className="text-sm text-neutral-500">
            Belum tersedia
          </p>

          <p className="mt-1 text-2xl font-semibold text-neutral-900">
            {laporanDummy.length - jumlahTersedia}
          </p>
        </div>

      </div>

      <div className="mb-6">

        <div className="mb-3">
          <h2 className="text-lg font-semibold text-neutral-900">
            Daftar Laporan
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Pilih jenis laporan yang ingin kamu lihat.
          </p>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">

          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                filter === option
                  ? "bg-blue-600 text-white"
                  : "border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
              }`}
            >
              {option}
            </button>
          ))}

        </div>
      </div>

      <div className="space-y-3">

        {laporanTampil.map((laporan) => {
          const Icon = iconMap[laporan.tipe];

          return (
            <div
              key={laporan.id}
              className="group rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md"
            >

              <div className="flex flex-col gap-5 md:flex-row md:items-center">

                <div className="flex items-start gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={20} />
                  </div>

                  <div>
                    <div className="mb-1 flex flex-wrap items-center gap-2">

                      <span className="text-xs font-medium text-blue-600">
                        {laporan.tipe}
                      </span>

                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                          laporan.status === "Tersedia"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-neutral-100 text-neutral-500"
                        }`}
                      >
                        {laporan.status}
                      </span>

                    </div>

                    <h3 className="font-semibold text-neutral-900">
                      {laporan.judul}
                    </h3>

                    <p className="mt-1 text-sm text-neutral-500">
                      {laporan.deskripsi}
                    </p>
                  </div>

                </div>

                <div className="flex shrink-0 flex-col gap-2 text-sm md:ml-auto md:min-w-[190px]">

                  <div className="flex items-center gap-2 text-neutral-500">
                    <CalendarDays size={15} />

                    <span>{laporan.periode}</span>
                  </div>

                  <div className="flex items-center gap-2 text-neutral-400">
                    <Clock size={15} />

                    <span>
                      {laporan.tanggal === "-"
                        ? "Belum tersedia"
                        : `Diperbarui ${laporan.tanggal}`}
                    </span>
                  </div>

                </div>

                <button
                  disabled={laporan.status !== "Tersedia"}
                  onClick={() => setSelectedLaporan(laporan)}
                  className={`flex shrink-0 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                    laporan.status === "Tersedia"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "cursor-not-allowed bg-neutral-100 text-neutral-400"
                  }`}
                >
                  <Eye size={16} />

                  {laporan.status === "Tersedia"
                    ? "Lihat"
                    : "Belum tersedia"}

                  {laporan.status === "Tersedia" && (
                    <ChevronRight size={16} />
                  )}
                </button>

              </div>

            </div>
          );
        })}

      </div>

      {laporanTampil.length === 0 && (
        <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
            <FileText
              size={24}
              className="text-neutral-400"
            />
          </div>

          <h3 className="text-sm font-semibold text-neutral-800">
            Tidak ada laporan
          </h3>

          <p className="mt-1 text-sm text-neutral-500">
            Belum ada laporan pada kategori ini.
          </p>
        </div>
      )}

      {selectedLaporan && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm"
    onClick={() => setSelectedLaporan(null)}
  >
    <EnterAnimation className="w-full max-w-lg">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full rounded-3xl bg-white p-6 shadow-2xl"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              {(() => {
                const Icon = iconMap[selectedLaporan.tipe];

                return <Icon size={20} />;
              })()}
            </div>

            <div>
              <p className="text-xs font-medium text-blue-600">
                {selectedLaporan.tipe}
              </p>

              <h2 className="mt-1 text-lg font-semibold leading-snug text-neutral-900">
                {selectedLaporan.judul}
              </h2>
            </div>
          </div>

          <button
            onClick={() => setSelectedLaporan(null)}
            className="shrink-0 rounded-full bg-neutral-100 px-3 py-1.5 text-sm text-neutral-500 transition hover:bg-neutral-200"
          >
            Tutup
          </button>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl bg-neutral-50 p-4">
            <p className="text-xs text-neutral-400">
              Periode
            </p>

            <p className="mt-1 text-sm font-medium text-neutral-800">
              {selectedLaporan.periode}
            </p>
          </div>

          <div className="rounded-2xl bg-neutral-50 p-4">
            <p className="text-xs text-neutral-400">
              Deskripsi
            </p>

            <p className="mt-1 text-sm leading-relaxed text-neutral-600">
              {selectedLaporan.deskripsi}
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-neutral-800">
                  Dokumen laporan
                </p>

                <p className="mt-1 text-xs text-neutral-400">
                  Preview dokumen
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FileText size={19} />
              </div>
            </div>

            <div className="flex min-h-[180px] flex-col items-center justify-center rounded-xl border border-dashed border-neutral-300 bg-neutral-50 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                <FileText size={22} />
              </div>

              <p className="text-sm font-semibold text-neutral-800">
                Preview dokumen
              </p>

              <p className="mt-1 max-w-xs text-xs leading-relaxed text-neutral-500">
                File laporan akan ditampilkan di sini setelah
                tersedia.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setSelectedLaporan(null)}
          className="mt-6 w-full rounded-full bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Tutup
        </button>
      </div>
    </EnterAnimation>
  </div>
)}

    </div>
  );
}