"use client";

import {
  ChevronRight,
  Tag,
  User,
  CalendarClock,
  FileText,
  Pencil,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";
import {
  getTugasById,
  updateTugasStatus,
  getInisial,
  STATUS_OPTIONS,
  type StatusTugas,
} from "@/lib/tugasData";

function statusBadgeClasses(status: StatusTugas) {
  if (status === "Menunggu") return "bg-amber-100 text-amber-700";
  if (status === "Selesai") return "bg-emerald-100 text-emerald-700";
  return "bg-red-100 text-red-700";
}

const KATEGORI_COLORS: Record<string, string> = {
  "Desain UI": "bg-blue-50 text-blue-600",
  Analisis: "bg-purple-50 text-purple-600",
  Dokumentasi: "bg-teal-50 text-teal-600",
  Testing: "bg-orange-50 text-orange-600",
  Laporan: "bg-pink-50 text-pink-600",
};

export default function TugasDetailPage() {
  const params = useParams<{ id: string }>();
  const tugas = getTugasById(params.id);
  if (!tugas) notFound();

  const [status, setStatus] = useState<StatusTugas>(tugas.status);

  function handleStatusChange(newStatus: StatusTugas) {
    setStatus(newStatus);
    updateTugasStatus(tugas!.id, newStatus);
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Detail Tugas
          </h1>
          <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-400">
            <Link href="/dashboard-pembina" className="hover:text-slate-600">
              Dashboard
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link
              href="/dashboard-pembina/tugas"
              className="hover:text-slate-600"
            >
              Kelola Tugas
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-500">{tugas.judul}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50">
            <Pencil className="h-4 w-4" />
            Edit
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50">
            <Trash2 className="h-4 w-4" />
            Hapus
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Main info */}
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          <span
            className={`inline-block rounded-md px-2.5 py-1 text-xs font-semibold ${
              KATEGORI_COLORS[tugas.kategori] ?? "bg-slate-100 text-slate-600"
            }`}
          >
            {tugas.kategori}
          </span>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-900">
            {tugas.judul}
          </h2>

          <div className="mt-6">
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <FileText className="h-4 w-4 text-slate-400" />
              Deskripsi
            </p>
            <p className="text-sm leading-relaxed text-slate-600">
              {tugas.deskripsi || "Tidak ada deskripsi untuk tugas ini."}
            </p>
          </div>
        </div>

        {/* Side info */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="mb-4 text-sm font-semibold text-slate-700">
              Informasi Tugas
            </p>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-slate-400" />
                <div>
                  <p className="text-slate-400">Peserta</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-blue-100 to-blue-200 text-[10px] font-bold text-blue-600">
                      {getInisial(tugas.pesertaNama)}
                    </span>
                    <span className="font-semibold text-slate-800">
                      {tugas.pesertaNama}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CalendarClock className="h-4 w-4 text-slate-400" />
                <div>
                  <p className="text-slate-400">Batas Waktu</p>
                  <p className="font-semibold text-slate-800">
                    {tugas.batasWaktu}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Tag className="h-4 w-4 text-slate-400" />
                <div>
                  <p className="text-slate-400">Kategori</p>
                  <p className="font-semibold text-slate-800">
                    {tugas.kategori}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Status changer */}
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="mb-3 text-sm font-semibold text-slate-700">Status</p>
            <span
              className={`mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusBadgeClasses(
                status
              )}`}
            >
              {status}
            </span>

            <div className="mt-2 space-y-2">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleStatusChange(opt)}
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
                    status === opt
                      ? "border-brand-blue bg-blue-50 text-brand-blue"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {opt}
                  {status === opt && (
                    <span className="h-2 w-2 rounded-full bg-brand-blue" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
