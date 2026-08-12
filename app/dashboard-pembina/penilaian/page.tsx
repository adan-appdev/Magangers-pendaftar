"use client";

import { ChevronRight, Search, Eye, BarChart3 } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { PESERTA_LIST } from "@/lib/pesertaData";
import { getInisial } from "@/lib/izinData";

export default function PenilaianListPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return PESERTA_LIST.filter(
      (p) =>
        query.trim() === "" ||
        p.nama.toLowerCase().includes(query.toLowerCase()) ||
        p.kampus.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">
          Penilaian Peserta
        </h1>
        <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-400">
          <Link href="/dashboard-pembina" className="hover:text-slate-600">
            Dashboard
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-slate-500">Penilaian Peserta</span>
        </div>
      </div>

      {/* Search */}
      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="relative sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama atau kampus..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-blue focus:bg-white"
          />
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 p-14 text-center">
            <BarChart3 className="h-8 w-8 text-slate-300" />
            <p className="text-sm text-slate-400">
              Tidak ada peserta yang cocok dengan pencarian ini.
            </p>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-slate-500">
                <th className="w-14 px-6 py-4 font-medium">No</th>
                <th className="px-4 py-4 font-medium">Peserta</th>
                <th className="px-4 py-4 font-medium">Kampus</th>
                <th className="px-4 py-4 font-medium">Posisi</th>
                <th className="px-4 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr
                  key={p.id}
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
                        {getInisial(p.nama)}
                      </span>
                      <span className="font-semibold text-slate-900">
                        {p.nama}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-500">{p.kampus}</td>
                  <td className="px-4 py-4 text-slate-500">{p.posisi}</td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/dashboard-pembina/penilaian/${p.id}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3.5 py-2 text-xs font-semibold text-brand-blue transition-colors hover:bg-blue-100"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
