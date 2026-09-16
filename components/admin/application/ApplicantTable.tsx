"use client";

import type { AdminApplicant } from "@/types/adminApplicant";

export default function ApplicantTable({
  data,
  onDetail,
}: {
  data: AdminApplicant[];
  onDetail: (applicant: AdminApplicant) => void;
}) {
  const formatTanggal = (iso?: string) => {
    if (!iso) return "-";
    const d = new Date(iso);
    return d.toLocaleString("id-ID", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const badgeClass = (status: string) => {
    if (status === "Menunggu") return "bg-yellow-100 text-yellow-700";
    if (status === "Diperiksa") return "bg-blue-100 text-blue-700";
    if (status === "Revisi") return "bg-amber-100 text-amber-800";
    if (status === "Diterima") return "bg-green-100 text-green-700";
    if (status === "Ditolak") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Pelamar</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Posisi Terbaru</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Tanggal Terbaru</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Total</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {data.map((a) => (
              <tr key={a.peserta_id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{a.nama}</div>
                  <div className="text-xs text-gray-500 break-all">{a.email}</div>
                </td>

                <td className="px-4 py-3 text-sm text-gray-700">{a.posisi}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{formatTanggal(a.tanggal)}</td>

                <td className="px-4 py-3">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${badgeClass(a.status)}`}>
                    {a.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-sm text-gray-700">{a.total_pengajuan}x</td>

                <td className="px-4 py-3">
                  <button
                    onClick={() => onDetail(a)}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-sm text-gray-500">
                  Tidak ada data pelamar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}