"use client";

import { ChevronRight, Calendar, Save, Info, ChevronDown } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";
import { getPesertaById } from "@/lib/pesertaData";
import {
  getPenilaianByPesertaId,
  savePenilaian,
  hitungNilaiAkhir,
  hitungNilaiTotal,
  type AspekPenilaian,
  type StatusAspek,
} from "@/lib/penilaianData";

const STATUS_OPTIONS: Array<"Semua Status" | StatusAspek> = [
  "Semua Status",
  "Sudah Dinilai",
  "Belum Dinilai",
];

export default function PenilaianDetailPage() {
  const params = useParams<{ id: string }>();
  const peserta = getPesertaById(params.id);
  if (!peserta) notFound();

  const [aspekList, setAspekList] = useState<AspekPenilaian[]>(() =>
    getPenilaianByPesertaId(params.id)
  );
  const [statusFilter, setStatusFilter] = useState<"Semua Status" | StatusAspek>(
    "Semua Status"
  );
  const [periode, setPeriode] = useState("2026-07");
  const [savedMessage, setSavedMessage] = useState("");

  function handleSliderChange(id: string, nilai: number) {
    setAspekList((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, nilai, status: "Sudah Dinilai" } : a
      )
    );
    setSavedMessage("");
  }

  function handleSimpan() {
    savePenilaian(params.id, aspekList);
    setSavedMessage("Penilaian berhasil disimpan.");
    setTimeout(() => setSavedMessage(""), 3000);
  }

  const filtered = aspekList.filter(
    (a) => statusFilter === "Semua Status" || a.status === statusFilter
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Penilaian Peserta
          </h1>
          <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-400">
            <Link href="/dashboard-pembina" className="hover:text-slate-600">
              Dashboard
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link
              href="/dashboard-pembina/penilaian"
              className="hover:text-slate-600"
            >
              Penilaian Peserta
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-500">{peserta.nama}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Periode Penilaian</span>
            <div className="relative">
              <input
                type="month"
                value={periode}
                onChange={(e) => setPeriode(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white py-2.5 pl-3 pr-9 text-sm font-medium text-slate-700 outline-none focus:border-brand-blue"
              />
              <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          <button
            onClick={handleSimpan}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition-transform hover:-translate-y-0.5 hover:bg-blue-700"
          >
            <Save className="h-4 w-4" />
            Simpan Penilaian
          </button>
        </div>
      </div>

      {savedMessage && (
        <div className="mb-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {savedMessage}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative sm:w-56">
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as "Semua Status" | StatusAspek)
            }
            className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-9 text-sm font-medium text-slate-700 outline-none focus:border-brand-blue"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* Table */}
      <div className="relative mt-6 overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60 text-slate-500">
              <th className="w-14 px-6 py-4 font-medium">No</th>
              <th className="px-4 py-4 font-medium">Aspek Penilaian</th>
              <th className="px-4 py-4 font-medium">Bobot</th>
              <th className="px-4 py-4 font-medium">Nilai (1-100)</th>
              <th className="px-6 py-4 font-medium">Nilai Akhir</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a, i) => (
              <tr
                key={a.id}
                className="border-b border-slate-50 last:border-0"
              >
                <td className="px-6 py-4">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-blue-50 text-sm font-semibold text-brand-blue">
                    {i + 1}
                  </span>
                </td>
                <td className="px-4 py-4 font-semibold text-slate-900">
                  {a.aspek}
                </td>
                <td className="px-4 py-4 text-slate-500">{a.bobot}%</td>
                <td className="px-4 py-4">
                  <div className="max-w-xs">
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={a.nilai}
                      onChange={(e) =>
                        handleSliderChange(a.id, Number(e.target.value))
                      }
                      style={{ accentColor: "#1D4ED8" }}
                      className="w-full cursor-pointer"
                    />
                    <div className="mt-1 flex justify-between text-xs text-slate-400">
                      <span>0</span>
                      <span>100</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-block rounded-lg bg-emerald-50 px-3.5 py-1.5 text-sm font-bold text-emerald-600">
                    {hitungNilaiAkhir(a.nilai)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Info bubble */}
        <div className="pointer-events-none absolute -bottom-14 right-0 hidden sm:block">
          <span className="pointer-events-auto inline-flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-4 py-2.5 text-sm text-slate-500 shadow-md">
            <Info className="h-4 w-4 text-brand-blue" />
            Geser slider untuk memberikan nilai
          </span>
        </div>
      </div>

      {/* Nilai total */}
      <div className="mt-16 flex justify-end sm:mt-6">
        <div className="rounded-2xl border border-slate-100 bg-white px-6 py-4 text-right shadow-sm">
          <p className="text-xs text-slate-400">Nilai Akhir Total</p>
          <p className="text-2xl font-extrabold text-brand-blue">
            {hitungNilaiTotal(aspekList)}
          </p>
        </div>
      </div>
    </div>
  );
}
