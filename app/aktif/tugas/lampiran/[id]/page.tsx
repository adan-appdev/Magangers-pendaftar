"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  FileText,
  Send,
  AlertCircle,
  UserRound,
  CalendarDays,
  Timer,
} from "lucide-react";

import { FileUpload } from "@/components/aktif/ui/file_upload";

const tugasDummy = {
  id: 1,
  judul: "Pembuatan UI/UX",
  deskripsi:
    "Membuat rancangan UI/UX untuk halaman dashboard peserta magang berdasarkan kebutuhan sistem yang telah diberikan.",
  pembimbing: "Pak Bambang",
  tanggalDiberikan: "xx/xx/xxxx xx:xx",
  batasWaktu: "xx/xx/xxxx xx:xx",
};

type StatusPengumpulan =
  | "Belum dikumpulkan"
  | "Menunggu Konfirmasi"
  | "Disetujui"
  | "Perlu Perbaikan";

export default function PengumpulanTugasPage() {
  const [file, setFile] = useState<File | null>(null);
  const [catatan, setCatatan] = useState("");

  const [status, setStatus] =
    useState<StatusPengumpulan>("Belum dikumpulkan");

  const handleFileChange = (files: File[]) => {
    if (!files.length) return;

    setFile(files[0]);
  };

  const handleSubmit = () => {
    if (!file) return;

    console.log("Mengirim tugas:", {
      file,
      catatan,
    });

    setStatus("Menunggu Konfirmasi");
  };

  const statusConfig = {
    "Belum dikumpulkan": {
      icon: <Clock3 size={17} />,
      className: "bg-neutral-100 text-neutral-600",
    },

    "Menunggu Konfirmasi": {
      icon: <Clock3 size={17} />,
      className: "bg-amber-100 text-amber-700",
    },

    Disetujui: {
      icon: <CheckCircle2 size={17} />,
      className: "bg-emerald-100 text-emerald-700",
    },

    "Perlu Perbaikan": {
      icon: <AlertCircle size={17} />,
      className: "bg-red-100 text-red-700",
    },
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-8">

      <div className="mb-8">
        <Link
          href="/tugas"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-blue-600"
        >
          <ArrowLeft size={17} />

          Kembali ke Tugas
        </Link>

        <h1 className="text-2xl font-semibold text-neutral-900">
          {tugasDummy.judul}
        </h1>

        <p className="mt-1 text-sm text-neutral-500">
          Kumpulkan hasil tugas untuk diperiksa oleh pembimbing.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">

        <div className="space-y-6">

          <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-neutral-900">
                Detail Tugas
              </h2>

              <p className="mt-1 text-sm text-neutral-500">
                Informasi tugas yang diberikan oleh pembimbing.
              </p>
            </div>

            <div className="rounded-2xl bg-neutral-50 p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <FileText size={20} />
                </div>

                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-neutral-900">
                    {tugasDummy.judul}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                    {tugasDummy.deskripsi}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 border-t border-neutral-200 pt-5 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-neutral-500">
                    <UserRound size={16} />
                  </div>

                  <div>
                    <p className="text-xs text-neutral-400">
                      Pembimbing
                    </p>

                    <p className="mt-1 text-sm font-medium text-neutral-800">
                      {tugasDummy.pembimbing}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-neutral-500">
                    <Timer size={16} />
                  </div>

                  <div>
                    <p className="text-xs text-neutral-400">
                      Batas Waktu
                    </p>

                    <p className="mt-1 text-sm font-medium text-neutral-800">
                      {tugasDummy.batasWaktu}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-neutral-500">
                    <CalendarDays size={16} />
                  </div>

                  <div>
                    <p className="text-xs text-neutral-400">
                      Tanggal Diberikan
                    </p>

                    <p className="mt-1 text-sm font-medium text-neutral-800">
                      {tugasDummy.tanggalDiberikan}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-neutral-900">
                Pengumpulan Tugas
              </h2>

              <p className="mt-1 text-sm text-neutral-500">
                Upload hasil pekerjaan kamu untuk dikirim kepada
                pembimbing.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
              <FileUpload onChange={handleFileChange} />
            </div>

            <div className="mt-4 rounded-2xl bg-blue-50 px-4 py-3">
              <div className="flex items-start gap-3">
                <FileText
                  size={17}
                  className="mt-0.5 shrink-0 text-blue-600"
                />

                <div>
                  <p className="text-xs font-semibold text-blue-700">
                    Format file yang dapat dikumpulkan
                  </p>

                  <p className="mt-1 text-xs leading-relaxed text-blue-600">
                    PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, ZIP,
                    JPG, JPEG, dan PNG.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-neutral-800">
                Catatan untuk pembimbing
                <span className="ml-1 font-normal text-neutral-400">
                  (opsional)
                </span>
              </label>

              <textarea
                value={catatan}
                onChange={(event) => setCatatan(event.target.value)}
                rows={4}
                placeholder="Tambahkan catatan mengenai tugas yang dikumpulkan..."
                className="w-full resize-none rounded-2xl border border-neutral-200 bg-white p-4 text-sm text-neutral-700 outline-none transition placeholder:text-neutral-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={
                !file ||
                status === "Menunggu Konfirmasi" ||
                status === "Disetujui"
              }
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send size={17} />

              {status === "Menunggu Konfirmasi"
                ? "Menunggu Konfirmasi"
                : status === "Disetujui"
                ? "Tugas Telah Disetujui"
                : "Kirim Tugas"}
            </button>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-blue-600">
              STATUS PENGUMPULAN
            </p>

            <h2 className="mt-1 text-lg font-semibold text-neutral-900">
              Status Tugas
            </h2>

            <div
              className={`mt-5 flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium ${statusConfig[status].className}`}
            >
              {statusConfig[status].icon}

              {status}
            </div>

            <div className="mt-6 space-y-5">

              <div className="flex gap-3">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                </div>

                <div>
                  <p className="text-sm font-medium text-neutral-800">
                    Pengumpulan
                  </p>

                  <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                    File tugas dikirim oleh peserta.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100">
                  <div className="h-2 w-2 rounded-full bg-amber-500" />
                </div>

                <div>
                  <p className="text-sm font-medium text-neutral-800">
                    Konfirmasi
                  </p>

                  <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                    Pembimbing akan memeriksa tugas yang dikirim.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                </div>

                <div>
                  <p className="text-sm font-medium text-neutral-800">
                    Selesai
                  </p>

                  <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                    Tugas disetujui oleh pembimbing.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-blue-100 bg-blue-50/50 p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <FileText size={17} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-neutral-900">
                  Perhatian
                </h3>

                <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                  Pastikan file yang kamu upload merupakan hasil
                  pekerjaan terbaru sebelum mengirimkannya kepada
                  pembimbing.
                </p>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}