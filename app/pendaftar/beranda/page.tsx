"use client";

import { useUser } from "@/components/pendaftar/UserContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function BerandaPage() {
  const { status, userData, photo } = useUser();
  const router = useRouter();

  /* ================= STATUS: PENDAFTAR BARU ================= */
  if (status === "tidak_aktif") {
    return (
      <div className="min-h-[calc(100vh-96px)] bg-gray-50/60 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl rounded-[28px] border border-gray-200 bg-white p-8 sm:p-10 shadow-sm text-center"
        >
          <div className="mx-auto mb-6 w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
            <div className="w-10 h-10 rounded-2xl bg-white/20 border border-white/30" />
          </div>

          <div className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-700 mb-4">
            Status Belum Aktif
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-3">
            Lengkapi Data Dirimu
          </h1>

          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed mb-8">
            Akun kamu sudah berhasil dibuat. Untuk melanjutkan proses pendaftaran magang,
            silakan lengkapi data pribadi, pendidikan, dan unggah dokumen yang diperlukan.
          </p>

          <button
            onClick={() => router.push("/pendaftar/data-diri")}
            className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl active:scale-[0.99]"
          >
            Isi Data Dirimu
          </button>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            {[
              "Lengkapi data pribadi",
              "Lengkapi data pendidikan",
              "Unggah dokumen wajib",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-4"
              >
                <div className="w-2 h-2 rounded-full bg-blue-500 mb-3" />
                <p className="text-sm font-medium text-gray-800">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  /* ================= STATUS: MENGAJUKAN ================= */
  if (status === "mengajukan") {
    return (
      <div className="min-h-[calc(100vh-96px)] bg-gray-50/60 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full max-w-5xl rounded-[32px] border border-gray-200 bg-white p-6 sm:p-8 shadow-sm"
        >
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* FOTO */}
            <div className="w-full lg:w-64 flex flex-col items-center lg:items-start">
              <div className="w-44 h-44 rounded-[28px] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200 shadow-sm">
                {photo ? (
                  <img
                    src={photo}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-medium">
                    Tidak ada foto
                  </div>
                )}
              </div>

              <div className="mt-5 w-full rounded-2xl bg-yellow-50 border border-yellow-200 p-4 text-yellow-800">
                <p className="text-sm font-semibold">Status Saat Ini</p>
                <p className="text-sm mt-1">
                  Pengajuan sedang menunggu proses verifikasi oleh administrator.
                </p>
              </div>
            </div>

            {/* DATA USER */}
            <div className="flex-1 w-full">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm font-semibold text-blue-600 mb-2">
                    Data Pendaftar
                  </p>

                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                    {userData?.pribadi?.nama || "Nama Lengkap"}
                  </h1>

                  <p className="text-gray-500 mt-2">
                    Pastikan seluruh data yang dikirim sudah benar dan sesuai dokumen.
                  </p>
                </div>

                <div className="inline-flex items-center rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700 border border-yellow-200 h-fit">
                  Mengajukan
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  ["Email", userData?.pribadi?.email || "-"],
                  ["No HP", userData?.pribadi?.hp || "-"],
                  ["NIK", userData?.pribadi?.nik || "-"],
                  ["Tempat Lahir", userData?.pribadi?.tempat || "-"],
                  ["Tanggal Lahir", userData?.pribadi?.tanggal || "-"],
                  ["Gender", userData?.pribadi?.gender || "-"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-gray-200 bg-gray-50 p-4"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                      {label}
                    </p>
                    <p className="text-sm font-medium text-gray-900 break-words">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
                    i
                  </div>

                  <div>
                    <p className="font-semibold text-blue-900">
                      Informasi Verifikasi
                    </p>
                    <p className="text-sm text-blue-800 mt-1 leading-relaxed">
                      Data dan dokumen yang telah dikirim sedang diperiksa oleh tim administrasi.
                      Selama proses verifikasi berlangsung, beberapa data mungkin tidak dapat diubah.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ================= STATUS LAIN ================= */
  return (
    <div className="min-h-[calc(100vh-96px)] bg-gray-50/60 p-6 flex items-center justify-center">
      <div className="w-full max-w-xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm text-center">
        <p className="text-sm font-semibold text-gray-500 mb-2">Status Saat Ini</p>
        <h2 className="text-3xl font-bold text-gray-900 capitalize">{status}</h2>
      </div>
    </div>
  );
}