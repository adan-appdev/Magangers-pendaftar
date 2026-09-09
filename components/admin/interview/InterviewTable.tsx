"use client";

// Samakan dengan data dari page wawancara admin
export type Interview = {
  peserta_id: string;
  jadwal_id: string | null;

  nama: string;
  email: string;
  sekolah: string;
  posisi: string;

  interviewer: string;
  tanggal: string; // "YYYY-MM-DD" atau ""
  jam: string;     // "HH:MM" atau ""
  metode: string;
  lokasi: string;

  status: string; // ✅ Menunggu | Dijadwalkan | Selesai | Lulus | Tidak Lulus | dll
};

export default function InterviewTable({
  data,
  onDetail,
}: {
  data: Interview[];
  onDetail: (interview: Interview) => void;
}) {
  const formatTanggal = (dateStr: string) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const badgeClass = (status: string) => {
    if (status === "Dijadwalkan") return "bg-blue-100 text-blue-700";
    if (status === "Menunggu") return "bg-gray-100 text-gray-700";
    if (status === "Belum Dijadwalkan") return "bg-gray-100 text-gray-700";
    if (status === "Selesai") return "bg-green-100 text-green-700";
    if (status === "Lulus") return "bg-emerald-100 text-emerald-700";
    if (status === "Tidak Lulus") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">
                Peserta
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">
                Posisi
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">
                Interviewer
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">
                Tanggal
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">
                Jam
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">
                Status
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {data.map((item) => (
              <tr key={item.peserta_id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{item.nama}</div>
                  <div className="text-xs text-gray-500 break-all">{item.email}</div>
                </td>

                <td className="px-4 py-3 text-sm text-gray-700">{item.posisi || "-"}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{item.interviewer || "-"}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{formatTanggal(item.tanggal)}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{item.jam || "-"}</td>

                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${badgeClass(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <button
                    onClick={() => onDetail(item)}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-sm text-gray-500">
                  Tidak ada data wawancara.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}