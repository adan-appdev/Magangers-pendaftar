"use client";

import { useUser } from "@/components/pendaftar/UserContext";
import { motion } from "framer-motion";
import {
  Clock3,
  Search,
  ShieldCheck,
  CalendarDays,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function StatusPendaftaranPage() {
  const { status } = useUser();

  const statusConfig = {
    tidak_aktif: {
      color: "bg-gray-400",
      textColor: "text-gray-700",
      light: "bg-gray-50 border-gray-200",
      title: "Belum Aktif",
      message:
        "Silakan lengkapi data diri dan ajukan magang untuk memulai proses.",
      icon: Clock3,
      step: 1,
    },
    mengajukan: {
      color: "bg-yellow-400",
      textColor: "text-yellow-700",
      light: "bg-yellow-50 border-yellow-200",
      title: "Mengajukan",
      message:
        "Pengajuan Anda sedang diperiksa oleh administrator.",
      icon: Search,
      step: 2,
    },
    verifikasi: {
      color: "bg-blue-500",
      textColor: "text-blue-700",
      light: "bg-blue-50 border-blue-200",
      title: "Verifikasi",
      message:
        "Data Anda sedang diverifikasi oleh tim kami.",
      icon: ShieldCheck,
      step: 3,
    },
    wawancara: {
      color: "bg-purple-500",
      textColor: "text-purple-700",
      light: "bg-purple-50 border-purple-200",
      title: "Wawancara",
      message:
        "Selamat! Anda lolos tahap verifikasi dan menunggu jadwal wawancara.",
      icon: CalendarDays,
      step: 4,
    },
    diterima: {
      color: "bg-green-500",
      textColor: "text-green-700",
      light: "bg-green-50 border-green-200",
      title: "Diterima",
      message:
        "Selamat! Anda telah diterima sebagai peserta magang.",
      icon: CheckCircle2,
      step: 5,
    },
    ditolak: {
      color: "bg-red-500",
      textColor: "text-red-700",
      light: "bg-red-50 border-red-200",
      title: "Ditolak",
      message:
        "Mohon maaf, pengajuan Anda belum dapat kami terima.",
      icon: XCircle,
      step: 5,
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  const steps = [
    "Registrasi",
    "Pengajuan",
    "Verifikasi",
    "Wawancara",
    "Selesai",
  ];

  return (
    <div className="min-h-screen bg-gray-50/60">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-[32px] border border-gray-200 bg-white shadow-sm"
        >
          {/* Background Accent */}
          <div
            className={`absolute inset-0 opacity-[0.06] ${config.color}`}
          />

          <div className="relative p-6 sm:p-8 lg:p-10">
            {/* Header */}
            <div className="text-center">
              <div
                className={`mx-auto mb-5 w-20 h-20 rounded-3xl flex items-center justify-center border ${config.light}`}
              >
                <Icon className={`w-10 h-10 ${config.textColor}`} />
              </div>

              <p className="text-sm font-semibold text-gray-500 mb-2">
                Status Pendaftaran
              </p>

              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                {config.title}
              </h1>

              <div className="mt-4">
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${config.light} ${config.textColor}`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${config.color}`} />
                  {config.title}
                </span>
              </div>

              <p className="mt-6 text-gray-600 leading-relaxed max-w-2xl mx-auto">
                {config.message}
              </p>
            </div>

            {/* Progress */}
            <div className="mt-10 rounded-3xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">
                  Progress Pendaftaran
                </h2>

                <span className="text-sm font-medium text-gray-600">
                  Tahap {Math.min(config.step, 5)} / 5
                </span>
              </div>

              <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden mb-6">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${config.color}`}
                  style={{ width: `${(Math.min(config.step, 5) / 5) * 100}%` }}
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {steps.map((step, index) => {
                  const active = index < config.step;

                  return (
                    <div key={step} className="text-center">
                      <div
                        className={`mx-auto w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border transition-all duration-300 ${
                          active
                            ? `${config.color} text-white border-transparent`
                            : "bg-white text-gray-400 border-gray-200"
                        }`}
                      >
                        {index + 1}
                      </div>

                      <p
                        className={`mt-2 text-xs font-medium ${
                          active ? "text-gray-900" : "text-gray-400"
                        }`}
                      >
                        {step}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Information card */}
            <div className={`mt-6 rounded-3xl border p-5 ${config.light}`}>
              <div className="flex items-start gap-4">
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center ${config.color} text-white shadow-sm`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="text-left">
                  <h3 className={`font-semibold ${config.textColor}`}>
                    Informasi Tahap Saat Ini
                  </h3>

                  <p className="text-sm text-gray-700 mt-1 leading-relaxed">
                    {config.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}