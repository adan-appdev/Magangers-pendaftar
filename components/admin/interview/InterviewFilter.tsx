"use client";

import { Search, Plus } from "lucide-react";

export default function InterviewFilter({
  search,
  setSearch,
  status,
  setStatus,
  onAdd,
}: {
  search: string;
  setSearch: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  onAdd: () => void;
}) {
  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-3">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Cari nama peserta..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-300 bg-white pl-10 pr-4 py-2.5 text-sm outline-none focus:border-blue-600"
        />
      </div>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-600"
      >
        <option>Semua Status</option>
        <option>Belum Dijadwalkan</option>
        <option>Dijadwalkan</option>
        <option>Selesai</option>
        <option>Lulus</option>
        <option>Tidak Lulus</option>
      </select>

      <button onClick={onAdd} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700">
        <Plus size={16} />
        Tambah Jadwal
      </button>
    </div>
  );
}