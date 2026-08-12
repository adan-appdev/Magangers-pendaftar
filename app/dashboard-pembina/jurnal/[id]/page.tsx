"use client";

import {
  ChevronRight,
  User,
  CalendarDays,
  FileText,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";
import {
  getJurnalById,
  updateJurnalStatus,
  getInisial,
  type StatusJurnal,
} from "@/lib/jurnalData";

function statusBadgeClasses(status: StatusJurnal) {
  if (status === "Menunggu") return "bg-amber-100 text-amber-700";
  if (status === "Disetujui") return "bg-emerald-100 text-emerald-700";
  return "bg-red-100 text-red-700";
}

export default function JurnalDetailPage() {
  const params = useParams<{ id: string }>();
  const jurnal = getJurnalById(params.id);
  if (!jurnal) notFound();

  const [status, setStatus] = useState<StatusJurnal>(jurnal.status);
  const [catatan, setCatatan] = useState("");

  function handleStatusChange(newStatus: StatusJurnal) {
    setStatus(newStatus);
    updateJurnalStatus(jurnal!.id, newStatus);
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">
          Detail Jurnal
        </h1>
        <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-400">
          <Link href="/dashboard-pembina" className="hover:text-slate-600">
            Dashboard
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link
            href="/dashboard-pembina/jurnal"
            className="hover:text-slate-600"
          >
            Pemeriksaan Jurnal
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-slate-500">{jurnal.judulJurnal}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Main content */}
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${statusBadgeClasses(
              status
            )}`}
          >
            {status}
          </span>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-900">
            {jurnal.judulJurnal}
          </h2>

          <div className="mt-6">
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <FileText className="h-4 w-4 text-slate-400" />
              Isi Jurnal
            </p>
            <p className="rounded-2xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">
              {jurnal.isiJurnal}
            </p>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Catatan untuk Peserta{" "}
              <span className="font-normal text-slate-400">(opsional)</span>
            </label>
            <textarea
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              rows={3}
              placeholder="Tulis masukan atau catatan revisi di sini..."
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-blue focus:bg-white"
            />
          </div>
        </div>

        {/* Side info + actions */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="mb-4 text-sm font-semibold text-slate-700">
              Informasi Jurnal
            </p>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-slate-400" />
                <div>
                  <p className="text-slate-400">Peserta</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-blue-100 to-blue-200 text-[10px] font-bold text-blue-600">
                      {getInisial(jurnal.pesertaNama)}
                    </span>
                    <span className="font-semibold text-slate-800">
                      {jurnal.pesertaNama}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CalendarDays className="h-4 w-4 text-slate-400" />
                <div>
                  <p className="text-slate-400">Tanggal</p>
                  <p className="font-semibold text-slate-800">
                    {jurnal.tanggal}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Review actions */}
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="mb-3 text-sm font-semibold text-slate-700">
              Tindakan Pemeriksaan
            </p>

            <div className="space-y-2.5">
              <button
                onClick={() => handleStatusChange("Disetujui")}
                className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-colors ${
                  status === "Disetujui"
                    ? "bg-emerald-500 text-white"
                    : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                }`}
              >
                <CheckCircle2 className="h-4 w-4" />
                Setujui Jurnal
              </button>

              <button
                onClick={() => handleStatusChange("Perlu Revisi")}
                className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-colors ${
                  status === "Perlu Revisi"
                    ? "bg-red-500 text-white"
                    : "bg-red-50 text-red-600 hover:bg-red-100"
                }`}
              >
                <RotateCcw className="h-4 w-4" />
                Minta Revisi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
