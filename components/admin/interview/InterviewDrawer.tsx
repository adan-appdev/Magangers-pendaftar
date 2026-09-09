"use client";

import { X, CalendarDays, Clock, MapPin, User, Video } from "lucide-react";

// Samakan dengan data yang dipakai WawancaraPage
export type Interview = {
  peserta_id: string;
  jadwal_id: string | null;

  nama: string;
  email: string;
  sekolah: string;
  posisi: string;

  interviewer: string;
  tanggal: string;
  jam: string;
  metode: string;
  lokasi: string;

  status: string; // ✅ pakai ini, bukan status_jadwal
};

export default function InterviewDrawer({
  open,
  onClose,
  interview,
  onPass,
  onFail,
  onReschedule,
}: {
  open: boolean;
  onClose: () => void;
  interview: Interview | null;
  onPass: () => void;
  onFail: () => void;
  onReschedule: () => void;
}) {
  if (!open || !interview) return null;

  const formatTanggal = (dateStr: string) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return d.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const badgeClass =
    interview.status === "Dijadwalkan"
      ? "bg-blue-100 text-blue-700"
      : interview.status === "Selesai"
      ? "bg-green-100 text-green-700"
      : interview.status === "Menunggu"
      ? "bg-gray-100 text-gray-700"
      : interview.status === "Lulus"
      ? "bg-emerald-100 text-emerald-700"
      : interview.status === "Tidak Lulus"
      ? "bg-red-100 text-red-700"
      : "bg-gray-100 text-gray-700";

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <h2 className="text-lg font-bold">Detail Wawancara</h2>
            <p className="text-sm text-gray-500">Informasi peserta & jadwal</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-gray-100">
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[calc(100vh-140px)] overflow-y-auto p-5 space-y-6">
          {/* DATA PESERTA */}
          <div className="rounded-2xl border p-4">
            <h3 className="font-semibold mb-3">Data Peserta</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="col-span-2">
                <div className="text-gray-500">Nama</div>
                <div className="font-medium">{interview.nama}</div>
              </div>
              <div>
                <div className="text-gray-500">Email</div>
                <div className="font-medium break-all">{interview.email}</div>
              </div>
              <div>
                <div className="text-gray-500">Sekolah</div>
                <div className="font-medium">{interview.sekolah}</div>
              </div>
              <div className="col-span-2">
                <div className="text-gray-500">Posisi</div>
                <div className="font-medium">{interview.posisi}</div>
              </div>
            </div>
          </div>

          {/* JADWAL */}
          <div className="rounded-2xl border p-4">
            <h3 className="font-semibold mb-3">Jadwal Wawancara</h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                <User size={16} className="text-gray-600" />
                <div>
                  <div className="text-xs text-gray-500">Interviewer</div>
                  <div className="font-medium">{interview.interviewer || "-"}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                <CalendarDays size={16} className="text-gray-600" />
                <div>
                  <div className="text-xs text-gray-500">Tanggal</div>
                  <div className="font-medium">{formatTanggal(interview.tanggal)}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                <Clock size={16} className="text-gray-600" />
                <div>
                  <div className="text-xs text-gray-500">Jam</div>
                  <div className="font-medium">{interview.jam || "-"}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                {interview.metode === "Online" ? (
                  <Video size={16} className="text-gray-600" />
                ) : (
                  <MapPin size={16} className="text-gray-600" />
                )}
                <div>
                  <div className="text-xs text-gray-500">Metode</div>
                  <div className="font-medium">{interview.metode || "-"}</div>
                </div>
              </div>

              {interview.lokasi ? (
                <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                  <MapPin size={16} className="text-gray-600" />
                  <div>
                    <div className="text-xs text-gray-500">Lokasi / Link</div>
                    <div className="font-medium break-all">{interview.lokasi}</div>
                  </div>
                </div>
              ) : null}

              <div className="flex items-center gap-2 mt-3">
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}>
                  {interview.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="border-t p-4 flex gap-2">
          <button
            onClick={onFail}
            className="flex-1 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-100"
          >
            Tidak Lulus
          </button>

          <button
            onClick={onReschedule}
            className="flex-1 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm font-semibold text-amber-700 hover:bg-amber-100"
          >
            {interview.jadwal_id ? "Jadwal Ulang" : "Buat Jadwal"}
          </button>

          <button
            onClick={onPass}
            className="flex-1 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Lulus
          </button>
        </div>
      </div>
    </>
  );
}