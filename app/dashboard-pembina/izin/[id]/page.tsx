"use client";

import {
  ChevronRight,
  User,
  CalendarDays,
  Tag,
  FileText,
  ImageIcon,
  FileType2,
  Download,
  Check,
  X,
} from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";
import {
  getIzinById,
  updateIzinStatus,
  getInisial,
  type StatusIzin,
} from "@/lib/izinData";

function statusBadgeClasses(status: StatusIzin) {
  if (status === "Menunggu") return "bg-amber-100 text-amber-700";
  if (status === "Disetujui") return "bg-emerald-100 text-emerald-700";
  return "bg-red-100 text-red-700";
}

export default function IzinDetailPage() {
  const params = useParams<{ id: string }>();
  const izin = getIzinById(params.id);
  if (!izin) notFound();

  const [status, setStatus] = useState<StatusIzin>(izin.status);
  const [catatan, setCatatan] = useState(izin.catatanPembimbing ?? "");

  function handleDecision(newStatus: StatusIzin) {
    setStatus(newStatus);
    updateIzinStatus(izin!.id, newStatus, catatan);
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">
          Detail Pengajuan Izin
        </h1>
        <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-400">
          <Link href="/dashboard-pembina" className="hover:text-slate-600">
            Dashboard
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link
            href="/dashboard-pembina/izin"
            className="hover:text-slate-600"
          >
            Persetujuan Izin
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-slate-500">{izin.pesertaNama}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Main content */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusBadgeClasses(
                status
              )}`}
            >
              {status}
            </span>
            <h2 className="mt-3 text-2xl font-extrabold text-slate-900">
              {izin.jenisIzin}
            </h2>
            <p className="mt-1 text-sm text-slate-500">{izin.keterangan}</p>
          </div>

          {/* Bukti lampiran */}
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
            <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <FileText className="h-4 w-4 text-slate-400" />
              Bukti Lampiran
            </p>

            {izin.bukti.tipe === "gambar" && (
              <div className="overflow-hidden rounded-2xl border border-slate-100">
                <div className="flex aspect-video items-center justify-center bg-slate-50">
                  <div className="text-center text-slate-400">
                    <ImageIcon className="mx-auto mb-2 h-10 w-10" />
                    <p className="text-sm">Pratinjau gambar tidak tersedia</p>
                    <p className="text-xs">(contoh data, belum ada file asli)</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
                  <span className="text-sm text-slate-600">
                    {izin.bukti.namaFile}
                  </span>
                  <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:underline">
                    <Download className="h-3.5 w-3.5" />
                    Unduh
                  </button>
                </div>
              </div>
            )}

            {izin.bukti.tipe === "dokumen" && (
              <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-red-50 text-red-500">
                    <FileType2 className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium text-slate-700">
                    {izin.bukti.namaFile}
                  </span>
                </div>
                <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:underline">
                  <Download className="h-3.5 w-3.5" />
                  Unduh
                </button>
              </div>
            )}

            {izin.bukti.tipe === null && (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-6 text-center text-sm text-slate-400">
                Peserta tidak melampirkan bukti untuk pengajuan izin ini.
              </div>
            )}
          </div>
        </div>

        {/* Side info + decision */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="mb-4 text-sm font-semibold text-slate-700">
              Informasi Pengajuan
            </p>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-slate-400" />
                <div>
                  <p className="text-slate-400">Peserta</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-blue-100 to-blue-200 text-[10px] font-bold text-blue-600">
                      {getInisial(izin.pesertaNama)}
                    </span>
                    <span className="font-semibold text-slate-800">
                      {izin.pesertaNama}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CalendarDays className="h-4 w-4 text-slate-400" />
                <div>
                  <p className="text-slate-400">Tanggal</p>
                  <p className="font-semibold text-slate-800">
                    {izin.tanggal}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Tag className="h-4 w-4 text-slate-400" />
                <div>
                  <p className="text-slate-400">Jenis Izin</p>
                  <p className="font-semibold text-slate-800">
                    {izin.jenisIzin}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Decision */}
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="mb-3 text-sm font-semibold text-slate-700">
              Keputusan
            </p>

            <label className="mb-2 block text-xs font-medium text-slate-500">
              Catatan (opsional)
            </label>
            <textarea
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              rows={3}
              placeholder="Tulis alasan atau catatan keputusan..."
              className="mb-4 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-blue focus:bg-white"
            />

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => handleDecision("Ditolak")}
                className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-colors ${
                  status === "Ditolak"
                    ? "bg-red-500 text-white"
                    : "bg-red-50 text-red-600 hover:bg-red-100"
                }`}
              >
                <X className="h-4 w-4" />
                Tolak
              </button>
              <button
                onClick={() => handleDecision("Disetujui")}
                className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-colors ${
                  status === "Disetujui"
                    ? "bg-emerald-500 text-white"
                    : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                }`}
              >
                <Check className="h-4 w-4" />
                Setujui
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
