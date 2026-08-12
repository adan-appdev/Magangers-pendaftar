"use client";

import {
  Search,
  LayoutGrid,
  List as ListIcon,
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  Mail,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { PESERTA_LIST, type StatusPeserta } from "@/lib/pesertaData";

const STATUS_FILTERS: Array<StatusPeserta | "Semua"> = [
  "Semua",
  "Aktif",
  "Menunggu Verifikasi",
  "Selesai",
];

function statusBadgeClasses(status: StatusPeserta) {
  if (status === "Aktif") return "bg-emerald-50 text-emerald-600";
  if (status === "Menunggu Verifikasi") return "bg-amber-50 text-amber-600";
  return "bg-slate-100 text-slate-500";
}

export default function PesertaListPage() {
  const [view, setView] = useState<"table" | "grid">("table");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusPeserta | "Semua">(
    "Semua"
  );

  const stats = useMemo(() => {
    const total = PESERTA_LIST.length;
    const aktif = PESERTA_LIST.filter((p) => p.status === "Aktif").length;
    const menunggu = PESERTA_LIST.filter(
      (p) => p.status === "Menunggu Verifikasi"
    ).length;
    const butuhPerhatian = PESERTA_LIST.filter((p) => p.needsAttention).length;
    return { total, aktif, menunggu, butuhPerhatian };
  }, []);

  const filtered = useMemo(() => {
    return PESERTA_LIST.filter((p) => {
      const matchQuery =
        query.trim() === "" ||
        p.nama.toLowerCase().includes(query.toLowerCase()) ||
        p.kampus.toLowerCase().includes(query.toLowerCase());
      const matchStatus = statusFilter === "Semua" || p.status === statusFilter;
      return matchQuery && matchStatus;
    });
  }, [query, statusFilter]);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">
          Peserta Bimbingan
        </h1>
        <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-400">
          <Link href="/dashboard-pembina" className="hover:text-slate-600">
            Dashboard
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-slate-500">Peserta Bimbingan</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-100">
            <Users className="h-5 w-5 text-blue-500" />
          </span>
          <div>
            <p className="text-xl font-extrabold text-slate-900">
              {stats.total}
            </p>
            <p className="text-xs text-slate-500">Total Peserta</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-100">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          </span>
          <div>
            <p className="text-xl font-extrabold text-slate-900">
              {stats.aktif}
            </p>
            <p className="text-xs text-slate-500">Aktif</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-100">
            <Clock className="h-5 w-5 text-amber-500" />
          </span>
          <div>
            <p className="text-xl font-extrabold text-slate-900">
              {stats.menunggu}
            </p>
            <p className="text-xs text-slate-500">Menunggu Verifikasi</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-red-100">
            <AlertCircle className="h-5 w-5 text-red-500" />
          </span>
          <div>
            <p className="text-xl font-extrabold text-slate-900">
              {stats.butuhPerhatian}
            </p>
            <p className="text-xs text-slate-500">Butuh Perhatian</p>
          </div>
        </div>
      </div>

      {/* Controls: search, filter, view toggle */}
      <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama atau kampus..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-blue focus:bg-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Status filter pills */}
          <div className="flex flex-wrap gap-1.5">
            {STATUS_FILTERS.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  statusFilter === status
                    ? "bg-brand-blue text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1 rounded-xl border border-slate-200 p-1">
            <button
              onClick={() => setView("table")}
              aria-label="Tampilan tabel"
              className={`grid h-8 w-8 place-items-center rounded-lg transition-colors ${
                view === "table"
                  ? "bg-brand-blue text-white"
                  : "text-slate-400 hover:bg-slate-100"
              }`}
            >
              <ListIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("grid")}
              aria-label="Tampilan kartu"
              className={`grid h-8 w-8 place-items-center rounded-lg transition-colors ${
                view === "grid"
                  ? "bg-brand-blue text-white"
                  : "text-slate-400 hover:bg-slate-100"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-12 text-center shadow-sm">
          <p className="text-sm text-slate-400">
            Tidak ada peserta yang cocok dengan pencarian/filter ini.
          </p>
        </div>
      )}

      {/* Table view */}
      {filtered.length > 0 && view === "table" && (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400">
                <th className="px-6 py-4 font-medium">Peserta</th>
                <th className="px-4 py-4 font-medium">Kampus</th>
                <th className="px-4 py-4 font-medium">Status</th>
                <th className="px-4 py-4 font-medium">Progress</th>
                <th className="px-6 py-4 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-blue-100 to-blue-200 text-sm font-bold text-blue-600">
                        {p.nama
                          .split(" ")
                          .slice(0, 2)
                          .map((w) => w[0])
                          .join("")}
                        {p.needsAttention && (
                          <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-red-500" />
                        )}
                      </span>
                      <div>
                        <p className="font-semibold text-slate-900">
                          {p.nama}
                        </p>
                        <p className="text-xs text-slate-400">{p.posisi}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-500">{p.kampus}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadgeClasses(
                        p.status
                      )}`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-brand-blue"
                          style={{ width: `${p.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-400">
                        {p.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/dashboard-pembina/peserta/${p.id}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue hover:underline"
                    >
                      Detail
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Grid view */}
      {filtered.length > 0 && view === "grid" && (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <Link
              key={p.id}
              href={`/dashboard-pembina/peserta/${p.id}`}
              className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <span className="relative grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-blue-100 to-blue-200 text-base font-bold text-blue-600">
                  {p.nama
                    .split(" ")
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join("")}
                  {p.needsAttention && (
                    <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-red-500" />
                  )}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadgeClasses(
                    p.status
                  )}`}
                >
                  {p.status}
                </span>
              </div>

              <h3 className="mt-3 font-bold text-slate-900 group-hover:text-brand-blue">
                {p.nama}
              </h3>
              <p className="text-sm text-slate-500">{p.posisi}</p>
              <p className="mt-1 text-xs text-slate-400">{p.kampus}</p>

              <div className="mt-4 space-y-1.5 text-xs text-slate-500">
                <p className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  {p.email}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-slate-400" />
                  {p.telepon}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-brand-blue"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
                <span className="text-xs text-slate-400">{p.progress}%</span>
              </div>

              {p.needsAttention && p.attentionNote && (
                <p className="mt-3 flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  {p.attentionNote}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
