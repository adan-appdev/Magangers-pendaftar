"use client";

import {
  ChevronRight,
  ChevronDown,
  Calendar,
  Eye,
  MoreVertical,
  BookOpen,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  getAllJurnal,
  STATUS_OPTIONS,
  getTanggalOptions,
  getInisial,
  type StatusJurnal,
} from "@/lib/jurnalData";

function statusBadgeClasses(status: StatusJurnal) {
  if (status === "Menunggu") return "bg-amber-100 text-amber-700";
  if (status === "Disetujui") return "bg-emerald-100 text-emerald-700";
  return "bg-red-100 text-red-700";
}

function statusDotClasses(status: StatusJurnal) {
  if (status === "Menunggu") return "bg-amber-500";
  if (status === "Disetujui") return "bg-emerald-500";
  return "bg-red-500";
}

export default function PemeriksaanJurnalPage() {
  const jurnalList = useMemo(() => getAllJurnal(), []);
  const tanggalOptions = useMemo(() => getTanggalOptions(), [jurnalList]);

  const [statusFilter, setStatusFilter] = useState<"Semua Status" | StatusJurnal>(
    "Semua Status"
  );
  const [tanggalFilter, setTanggalFilter] = useState<"Pilih Tanggal" | string>(
    "Pilih Tanggal"
  );
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return jurnalList.filter((j) => {
      const matchStatus =
        statusFilter === "Semua Status" || j.status === statusFilter;
      const matchTanggal =
        tanggalFilter === "Pilih Tanggal" || j.tanggal === tanggalFilter;
      return matchStatus && matchTanggal;
    });
  }, [jurnalList, statusFilter, tanggalFilter]);

  const today = new Date().toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Pemeriksaan Jurnal
          </h1>
          <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-400">
            <Link href="/dashboard-pembina" className="hover:text-slate-600">
              Dashboard
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-500">Pemeriksaan Jurnal</span>
          </div>
        </div>

        <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm">
          <Calendar className="h-4 w-4 text-slate-400" />
          {today}
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </span>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Calendar className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as "Semua Status" | StatusJurnal)
            }
            className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-9 text-sm font-medium text-slate-700 outline-none focus:border-brand-blue"
          >
            <option>Semua Status</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>

        <div className="relative flex-1 sm:max-w-xs">
          <Calendar className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <select
            value={tanggalFilter}
            onChange={(e) => setTanggalFilter(e.target.value)}
            className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-9 text-sm font-medium text-slate-700 outline-none focus:border-brand-blue"
          >
            <option>Pilih Tanggal</option>
            {tanggalOptions.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 p-14 text-center">
            <BookOpen className="h-8 w-8 text-slate-300" />
            <p className="text-sm text-slate-400">
              Tidak ada jurnal yang cocok dengan filter ini.
            </p>
          </div>
        ) : (
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-slate-500">
                <th className="w-14 px-6 py-4 font-medium">No</th>
                <th className="px-4 py-4 font-medium">Peserta</th>
                <th className="px-4 py-4 font-medium">Tanggal</th>
                <th className="px-4 py-4 font-medium">Judul Jurnal</th>
                <th className="px-4 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((j, i) => (
                <tr
                  key={j.id}
                  className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60"
                >
                  <td className="px-6 py-4">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-sm font-semibold text-slate-500">
                      {i + 1}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2.5">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-blue-100 to-blue-200 text-xs font-bold text-blue-600">
                        {getInisial(j.pesertaNama)}
                      </span>
                      <span className="font-medium text-slate-700">
                        {j.pesertaNama}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-500">{j.tanggal}</td>
                  <td className="px-4 py-4 font-semibold text-slate-900">
                    {j.judulJurnal}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${statusBadgeClasses(
                        j.status
                      )}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${statusDotClasses(
                          j.status
                        )}`}
                      />
                      {j.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/dashboard-pembina/jurnal/${j.id}`}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3.5 py-2 text-xs font-semibold text-brand-blue transition-colors hover:bg-blue-100"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Detail
                      </Link>
                      <div className="relative">
                        <button
                          onClick={() =>
                            setOpenMenuId(openMenuId === j.id ? null : j.id)
                          }
                          aria-label="Aksi lain"
                          className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                        {openMenuId === j.id && (
                          <div className="absolute right-0 z-10 mt-1 w-40 rounded-xl border border-slate-100 bg-white py-1.5 shadow-lg">
                            <button className="block w-full px-4 py-2 text-left text-xs font-medium text-slate-600 hover:bg-slate-50">
                              Tandai Disetujui
                            </button>
                            <button className="block w-full px-4 py-2 text-left text-xs font-medium text-red-500 hover:bg-red-50">
                              Minta Revisi
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {filtered.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1 text-sm text-slate-500">
          <p>
            Menampilkan 1 sampai {filtered.length} dari {filtered.length} tugas
          </p>
          <div className="flex items-center gap-1.5">
            <button
              disabled
              className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-300"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-blue text-sm font-semibold text-white">
              1
            </span>
            <button
              disabled
              className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-300"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
