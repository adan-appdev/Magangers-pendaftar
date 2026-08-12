"use client";

import * as React from "react";
import {
  Award,
  Check,
  Clock,
  FileCheck,
  ClipboardCheck,
  BookOpenCheck,
  GraduationCap,
  Eye,
  Download,
  ShieldCheck,
} from "lucide-react";

type Syarat = {
  id: number;
  title: string;
  description: string;
  selesai: boolean;
  icon: React.ReactNode;
};

const syaratAwal: Syarat[] = [
  {
    id: 1,
    title: "Masa Magang Selesai",
    description: "Periode magang telah berakhir sesuai jadwal.",
    selesai: true,
    icon: <Clock size={20} />,
  },
  {
    id: 2,
    title: "Seluruh Tugas Selesai",
    description: "Semua tugas yang diberikan selama magang telah diselesaikan.",
    selesai: true,
    icon: <ClipboardCheck size={20} />,
  },
  {
    id: 3,
    title: "Laporan Akhir Disetujui",
    description: "Laporan akhir telah diperiksa dan disetujui oleh pembimbing.",
    selesai: true,
    icon: <FileCheck size={20} />,
  },
  {
    id: 4,
    title: "Penilaian Pembimbing Selesai",
    description: "Pembimbing telah menyelesaikan seluruh penilaian peserta.",
    selesai: false,
    icon: <BookOpenCheck size={20} />,
  },
  {
    id: 5,
    title: "Dinyatakan Lulus",
    description: "Peserta dinyatakan lulus dari program magang.",
    selesai: false,
    icon: <GraduationCap size={20} />,
  },
];

export default function SertifikatPage() {
  const [syarat] = React.useState<Syarat[]>(syaratAwal);

  const semuaSelesai = syarat.every((item) => item.selesai);

  const jumlahSelesai = syarat.filter(
    (item) => item.selesai
  ).length;

  const progress = Math.round(
    (jumlahSelesai / syarat.length) * 100
  );

  const handleLihatSertifikat = () => {
    console.log("Lihat sertifikat");
  };

  const handleDownload = () => {
    console.log("Download sertifikat");
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-8">

      {/* HEADER */}
      <div className="mb-8">
        <div className="mb-1 flex items-center gap-2">
          <Award
            size={18}
            className="text-neutral-900"
          />

          <p className="text-2xl font-semibold text-neutral-900">
            Sertfikat Magang
          </p>
        </div>

        <p className="mt-1 text-sm text-neutral-500">
          Sertifikat magang akan tersedia setelah seluruh persyaratan
          diselesaikan.
        </p>
      </div>

      {/* STATUS UTAMA */}
      <div
        className={`mb-6 rounded-3xl border p-6 shadow-sm ${
          semuaSelesai
            ? "border-emerald-200 bg-emerald-50/40"
            : "border-neutral-200 bg-white"
        }`}
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div className="flex items-start gap-4">

            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
                semuaSelesai
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-blue-50 text-blue-600"
              }`}
            >
              {semuaSelesai ? (
                <Award size={28} />
              ) : (
                <ShieldCheck size={28} />
              )}
            </div>

            <div>
              <p className="text-sm text-neutral-500">
                Status sertifikat
              </p>

              <h2 className="mt-1 text-xl font-semibold text-neutral-900">
                {semuaSelesai
                  ? "Sertifikat tersedia"
                  : "Sertifikat belum tersedia"}
              </h2>

              <p className="mt-1 max-w-xl text-sm leading-relaxed text-neutral-500">
                {semuaSelesai
                  ? "Selamat! Seluruh persyaratan magang telah terpenuhi."
                  : "Selesaikan seluruh persyaratan berikut untuk mendapatkan sertifikat magang."}
              </p>
            </div>

          </div>

          {semuaSelesai && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleLihatSertifikat}
                className="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <Eye size={16} />
                Lihat Sertifikat
              </button>

              <button
                onClick={handleDownload}
                className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
              >
                <Download size={16} />
                Download
              </button>
            </div>
          )}

        </div>
      </div>

      {/* PROGRESS */}
      <div className="mb-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">

        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">
              Progress Persyaratan
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              {jumlahSelesai} dari {syarat.length} persyaratan telah selesai.
            </p>
          </div>

          <span className="text-sm font-semibold text-blue-600">
            {progress}%
          </span>
        </div>

        {/* PROGRESS BAR */}
        <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

      </div>

      {/* DAFTAR PERSYARATAN */}
      <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-neutral-900">
            Persyaratan Sertifikat
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Pastikan seluruh persyaratan telah terpenuhi.
          </p>
        </div>

        <div className="space-y-3">

          {syarat.map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-4 rounded-2xl border p-4 transition ${
                item.selesai
                  ? "border-emerald-100 bg-emerald-50/40"
                  : "border-neutral-200 bg-white"
              }`}
            >

              {/* ICON */}
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                  item.selesai
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-neutral-100 text-neutral-500"
                }`}
              >
                {item.icon}
              </div>

              {/* TEXT */}
              <div className="min-w-0 flex-1">

                <div className="flex flex-wrap items-center gap-2">

                  <h3 className="text-sm font-semibold text-neutral-900">
                    {item.title}
                  </h3>

                  {item.selesai && (
                    <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                      <Check size={12} />
                      Selesai
                    </span>
                  )}

                  {!item.selesai && (
                    <span className="flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-medium text-neutral-500">
                      <Clock size={12} />
                      Menunggu
                    </span>
                  )}

                </div>

                <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                  {item.description}
                </p>

              </div>

              {/* STATUS */}
              <div
                className={`hidden h-8 w-8 shrink-0 items-center justify-center rounded-full sm:flex ${
                  item.selesai
                    ? "bg-emerald-500 text-white"
                    : "bg-neutral-100 text-neutral-400"
                }`}
              >
                {item.selesai ? (
                  <Check size={16} />
                ) : (
                  <Clock size={15} />
                )}
              </div>

            </div>
          ))}

        </div>
      </div>

      {/* INFO */}
      {!semuaSelesai && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/50 p-4">

          <ShieldCheck
            size={19}
            className="mt-0.5 shrink-0 text-blue-600"
          />

          <div>
            <p className="text-sm font-semibold text-blue-900">
              Sertifikat belum dapat diterbitkan
            </p>

            <p className="mt-1 text-xs leading-relaxed text-blue-700">
              Sertifikat hanya dapat dilihat setelah masa magang selesai,
              seluruh tugas telah diselesaikan, laporan akhir disetujui,
              penilaian pembimbing selesai, dan peserta dinyatakan lulus.
            </p>
          </div>

        </div>
      )}

    </div>
  );
}