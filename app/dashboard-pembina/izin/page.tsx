"use client";

import {
  ChevronRight,
  ChevronDown,
  Calendar,
  Search,
  Eye,
  X,
  Check,
  FileCheck2,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  getAllIzin,
  updateIzinStatus,
  STATUS_OPTIONS,
  getInisial,
  type StatusIzin,
} from "@/lib/izinData";

function statusBadgeClasses(status: StatusIzin) {
  if (status === "Menunggu") return "bg-amber-100 text-amber-700";
  if (status === "Disetujui") return "bg-emerald-100 text-emerald-700";
  return "bg-red-100 text-red-700";
}

function statusDotClasses(status: StatusIzin) {
  if (status === "Menunggu") return "bg-amber-500";
  if (status === "Disetujui") return "bg-emerald-500";
  return "bg-red-500";
}

export default function PersetujuanIzinPage() {
  const [izinList, setIzinList] = useState(() => getAllIzin());
  const [statusFilter, setStatusFilter] = useState<"Semua Status" | StatusIzin>(
    "Semua Status"
  );
  const [tanggalFilter, setTanggalFilter] = useState("");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return izinList.filter((i) => {
      const matchStatus =
        statusFilter === "Semua Status" || i.status === statusFilter;
      const matchQuery =
        query.trim() === "" ||
        i.pesertaNama.toLowerCase().includes(query.toLowerCase()) ||
        i.jenisIzin.toLowerCase().includes(query.toLowerCase()) ||
        i.keterangan.toLowerCase().includes(query.toLowerCase());
      // tanggalFilter dari <input type="date"> formatnya YYYY-MM-DD,
      // sementara data tanggal contoh formatnya "15 Jul 2026" — filter ini
      // jadi placeholder yang siap dihubungkan begitu format tanggalnya
      // diseragamkan (misalnya begitu datanya berasal dari API).
      const matchTanggal = tanggalFilter === "";
      return matchStatus && matchQuery && matchTanggal;
    });
  }, [izinList, statusFilter, query, tanggalFilter]);

  function handleQuickAction(id: string, status: StatusIzin) {
    updateIzinStatus(id, status);
    setIzinList((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status } : i))
    );
  }

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
            Persetujuan Izin
          </h1>
          <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-400">
            <Link href="/dashboard-pembina" className="hover:text-slate-600">
              Dashboard
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-500">Persetujuan Izin</span>
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
        <div className="relative sm:w-56">
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as "Semua Status" | StatusIzin)
            }
            className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-9 text-sm font-medium text-slate-700 outline-none focus:border-brand-blue"
          >
            <option>Semua Status</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>

        <div className="relative sm:w-52">
          <input
            type="date"
            value={tanggalFilter}
            onChange={(e) => setTanggalFilter(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-9 text-sm font-medium text-slate-700 outline-none focus:border-brand-blue"
          />
          <Calendar className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>

        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari izin..."
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-brand-blue"
          />
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 p-14 text-center">
            <FileCheck2 className="h-8 w-8 text-slate-300" />
            <p className="text-sm text-slate-400">
              Tidak ada pengajuan izin yang cocok dengan filter ini.
            </p>
          </div>
        ) : (
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-slate-500">
                <th className="w-14 px-6 py-4 font-medium">No</th>
                <th className="px-4 py-4 font-medium">Peserta</th>
                <th className="px-4 py-4 font-medium">Tanggal</th>
                <th className="px-4 py-4 font-medium">Jenis Izin</th>
                <th className="px-4 py-4 font-medium">Keterangan</th>
                <th className="px-4 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((izin, i) => (
                <tr
                  key={izin.id}
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
                        {getInisial(izin.pesertaNama)}
                      </span>
                      <span className="font-medium text-slate-700">
                        {izin.pesertaNama}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-500">{izin.tanggal}</td>
                  <td className="px-4 py-4 font-semibold text-slate-900">
                    {izin.jenisIzin}
                  </td>
                  <td className="px-4 py-4 text-slate-500">
                    {izin.keterangan}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${statusBadgeClasses(
                        izin.status
                      )}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${statusDotClasses(
                          izin.status
                        )}`}
                      />
                      {izin.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/dashboard-pembina/izin/${izin.id}`}
                        aria-label="Lihat detail"
                        className="grid h-9 w-9 place-items-center rounded-lg bg-blue-50 text-brand-blue transition-colors hover:bg-blue-100"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleQuickAction(izin.id, "Ditolak")}
                        aria-label="Tolak"
                        className="grid h-9 w-9 place-items-center rounded-lg bg-red-500 text-white transition-colors hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleQuickAction(izin.id, "Disetujui")}
                        aria-label="Setujui"
                        className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-500 text-white transition-colors hover:bg-emerald-600"
                      >
                        <Check className="h-4 w-4" />
                      </button>
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
            Menampilkan 1 sampai {filtered.length} dari {filtered.length} izin
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
