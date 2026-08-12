"use client";

import {
  ChevronRight,
  ChevronDown,
  Search,
  Users,
  Plus,
  Eye,
  MoreVertical,
  ClipboardList,
  ChevronLeft,
  ArrowUpDown,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  getAllTugas,
  addTugas,
  STATUS_OPTIONS,
  getPesertaNames,
  getInisial,
  type StatusTugas,
  type Tugas,
} from "@/lib/tugasData";
import TambahTugasModal from "@/components/dashboard-pembina/TambahTugasModal";

function statusBadgeClasses(status: StatusTugas) {
  if (status === "Menunggu") return "bg-amber-100 text-amber-700";
  if (status === "Selesai") return "bg-emerald-100 text-emerald-700";
  return "bg-red-100 text-red-700";
}

function statusDotClasses(status: StatusTugas) {
  if (status === "Menunggu") return "bg-amber-500";
  if (status === "Selesai") return "bg-emerald-500";
  return "bg-red-500";
}

const KATEGORI_COLORS: Record<string, string> = {
  "Desain UI": "bg-blue-50 text-blue-600",
  Analisis: "bg-purple-50 text-purple-600",
  Dokumentasi: "bg-teal-50 text-teal-600",
  Testing: "bg-orange-50 text-orange-600",
  Laporan: "bg-pink-50 text-pink-600",
};

export default function KelolaTugasPage() {
  const [tugasList, setTugasList] = useState<Tugas[]>(() => getAllTugas());
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"Semua Status" | StatusTugas>(
    "Semua Status"
  );
  const [pesertaFilter, setPesertaFilter] = useState<"Semua Peserta" | string>(
    "Semua Peserta"
  );
  const [query, setQuery] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const pesertaNames = useMemo(() => getPesertaNames(), [tugasList]);

  const filtered = useMemo(() => {
    return tugasList.filter((t) => {
      const matchStatus =
        statusFilter === "Semua Status" || t.status === statusFilter;
      const matchPeserta =
        pesertaFilter === "Semua Peserta" || t.pesertaNama === pesertaFilter;
      const matchQuery =
        query.trim() === "" ||
        t.judul.toLowerCase().includes(query.toLowerCase());
      return matchStatus && matchPeserta && matchQuery;
    });
  }, [tugasList, statusFilter, pesertaFilter, query]);

  function handleAddTugas(data: Omit<Tugas, "id" | "status">) {
    const newTugas = addTugas({ ...data, status: "Menunggu" });
    setTugasList((prev) => [newTugas, ...prev]);
    setShowModal(false);
  }

  return (
    <div>
      {/* Header */}
      <div className="relative mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 via-white to-blue-50 p-6 sm:p-8">
        <h1 className="text-2xl font-extrabold text-slate-900">Kelola Tugas</h1>
        <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-400">
          <Link href="/dashboard-pembina" className="hover:text-slate-600">
            Dashboard
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-slate-500">Kelola Tugas</span>
        </div>

        <div className="pointer-events-none absolute -right-2 -top-2 hidden -rotate-6 sm:block">
          <div className="flex h-24 w-20 flex-col gap-2 rounded-2xl border-4 border-blue-400 bg-white p-3 shadow-lg">
            <span className="mx-auto -mt-5 h-4 w-9 rounded-full bg-blue-400" />
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="grid h-2.5 w-2.5 shrink-0 place-items-center rounded-full bg-blue-100 text-blue-500">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={4}>
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="h-1.5 flex-1 rounded-full bg-blue-100" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as "Semua Status" | StatusTugas)
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
          <Users className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <select
            value={pesertaFilter}
            onChange={(e) => setPesertaFilter(e.target.value)}
            className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-9 text-sm font-medium text-slate-700 outline-none focus:border-brand-blue"
          >
            <option>Semua Peserta</option>
            {pesertaNames.map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>

        <div className="relative flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari judul tugas..."
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-brand-blue"
          />
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-blue px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition-transform hover:-translate-y-0.5 hover:bg-blue-700 sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          Tambah Tugas
        </button>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 p-14 text-center">
            <ClipboardList className="h-8 w-8 text-slate-300" />
            <p className="text-sm text-slate-400">
              Tidak ada tugas yang cocok dengan filter ini.
            </p>
          </div>
        ) : (
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-slate-500">
                <th className="w-14 px-6 py-4 font-medium">No</th>
                <th className="px-4 py-4 font-medium">
                  <span className="inline-flex items-center gap-1">
                    Judul Tugas <ArrowUpDown className="h-3.5 w-3.5" />
                  </span>
                </th>
                <th className="px-4 py-4 font-medium">
                  <span className="inline-flex items-center gap-1">
                    Peserta <ArrowUpDown className="h-3.5 w-3.5" />
                  </span>
                </th>
                <th className="px-4 py-4 font-medium">
                  <span className="inline-flex items-center gap-1">
                    Batas Waktu <ArrowUpDown className="h-3.5 w-3.5" />
                  </span>
                </th>
                <th className="px-4 py-4 font-medium">
                  <span className="inline-flex items-center gap-1">
                    Status <ArrowUpDown className="h-3.5 w-3.5" />
                  </span>
                </th>
                <th className="px-6 py-4 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t, i) => (
                <tr
                  key={t.id}
                  className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60"
                >
                  <td className="px-6 py-4">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-sm font-semibold text-slate-500">
                      {i + 1}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-semibold text-slate-900">{t.judul}</p>
                    <span
                      className={`mt-1 inline-block rounded-md px-2 py-0.5 text-xs font-medium ${
                        KATEGORI_COLORS[t.kategori] ??
                        "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {t.kategori}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2.5">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-blue-100 to-blue-200 text-xs font-bold text-blue-600">
                        {getInisial(t.pesertaNama)}
                      </span>
                      <span className="font-medium text-slate-700">
                        {t.pesertaNama}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-500">{t.batasWaktu}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${statusBadgeClasses(
                        t.status
                      )}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${statusDotClasses(
                          t.status
                        )}`}
                      />
                      {t.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/dashboard-pembina/tugas/${t.id}`}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3.5 py-2 text-xs font-semibold text-brand-blue transition-colors hover:bg-blue-100"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Detail
                      </Link>
                      <div className="relative">
                        <button
                          onClick={() =>
                            setOpenMenuId(openMenuId === t.id ? null : t.id)
                          }
                          aria-label="Aksi lain"
                          className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                        {openMenuId === t.id && (
                          <div className="absolute right-0 z-10 mt-1 w-36 rounded-xl border border-slate-100 bg-white py-1.5 shadow-lg">
                            <button className="block w-full px-4 py-2 text-left text-xs font-medium text-slate-600 hover:bg-slate-50">
                              Edit Tugas
                            </button>
                            <button className="block w-full px-4 py-2 text-left text-xs font-medium text-red-500 hover:bg-red-50">
                              Hapus Tugas
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

      {showModal && (
        <TambahTugasModal
          pesertaOptions={pesertaNames}
          onClose={() => setShowModal(false)}
          onSubmit={handleAddTugas}
        />
      )}
    </div>
  );
}
