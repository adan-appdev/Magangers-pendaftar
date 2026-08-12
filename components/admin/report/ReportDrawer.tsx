"use client";

import { useState } from "react";

import {
  X,
  CalendarDays,
  User,
  FileText,
  ClipboardList,
  ExternalLink,
} from "lucide-react";

import { Report } from "@/app/admin/laporan/page";

interface Props {
  open: boolean;
  onClose: () => void;
  report: Report | null;
  onUpdate: (updatedReport: Report) => void;
}

export default function ReportDrawer({
  open,
  onClose,
  report,
  onUpdate,
}: Props) {
  const [catatan, setCatatan] = useState("");

  // Jangan render drawer jika tidak ada laporan
  if (!open || !report) {
    return null;
  }

  // Buka file lampiran
  const handleViewFile = () => {
    window.open(
      "/files/laporan-mingguan.pdf",
      "_blank"
    );
  };

  // Update status laporan
  const handleStatusChange = (
    newStatus: "Direvisi" | "Ditolak" | "Disetujui"
  ) => {
    const updatedReport: Report = {
      ...report,
      status: newStatus,
    };

    onUpdate(updatedReport);
    onClose();
  };

  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/30"
      />

      {/* DRAWER */}
      <div className="fixed right-0 top-0 z-50 h-screen w-full max-w-2xl overflow-y-auto bg-white shadow-2xl">

        {/* HEADER */}
        <div className="flex items-center justify-between border-b bg-white px-6 py-5">

          <div>
            <h2 className="text-2xl font-bold">
              Detail Laporan
            </h2>

            <p className="mt-1 text-gray-500">
              Informasi lengkap laporan peserta.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-gray-100"
          >
            <X size={22} />
          </button>

        </div>

        {/* BODY */}
        <div className="space-y-6 p-6">

          {/* JUDUL & STATUS */}
          <div>

            <StatusBadge status={report.status} />

            <h1 className="mt-4 text-3xl font-bold">
              {report.judul}
            </h1>

          </div>

          {/* INFORMASI LAPORAN */}
          <div className="rounded-xl border border-gray-200">

            <div className="border-b px-5 py-4 font-semibold">
              Informasi Laporan
            </div>

            <div className="space-y-5 p-5">

              <InfoItem
                icon={<User size={18} />}
                title="Peserta"
                value={report.peserta}
              />

              <InfoItem
                icon={<ClipboardList size={18} />}
                title="Pembimbing"
                value={report.pembimbing}
              />

              <InfoItem
                icon={<CalendarDays size={18} />}
                title="Tanggal"
                value={report.tanggal}
              />

            </div>

          </div>

          {/* ISI LAPORAN */}
          <div className="rounded-xl border border-gray-200 p-5">

            <h3 className="mb-4 font-semibold">
              Isi Laporan
            </h3>

            <p className="leading-7 text-gray-600">
              {report.deskripsi}
            </p>

          </div>

          {/* LAMPIRAN */}
          <div className="rounded-xl border border-gray-200 p-5">

            <h3 className="mb-4 font-semibold">
              Lampiran
            </h3>

            <div className="flex items-center justify-between rounded-xl border border-dashed border-gray-300 p-4">

              {/* FILE */}
              <div className="flex items-center gap-3">

                <div className="rounded-lg bg-blue-50 p-3">
                  <FileText
                    size={28}
                    className="text-blue-600"
                  />
                </div>

                <div>
                  <p className="font-medium">
                    laporan-mingguan.pdf
                  </p>

                  <p className="text-sm text-gray-500">
                    PDF • 1.2 MB
                  </p>
                </div>

              </div>

              {/* LIHAT */}
              <button
                type="button"
                onClick={handleViewFile}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
              >
                <ExternalLink size={16} />
                Lihat
              </button>

            </div>

          </div>

          {/* CATATAN PEMBIMBING */}
          <div className="rounded-xl border border-gray-200 p-5">

            <h3 className="mb-4 font-semibold">
              Catatan Pembimbing
            </h3>

            <textarea
              rows={5}
              value={catatan}
              onChange={(e) =>
                setCatatan(e.target.value)
              }
              placeholder="Tulis catatan atau revisi..."
              className="w-full resize-none rounded-xl border border-gray-300 p-4 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />

          </div>

        </div>

        {/* FOOTER */}
        <div className="sticky bottom-0 flex gap-3 border-t bg-white p-6">

          {/* REVISI */}
          <button
            type="button"
            onClick={() =>
              handleStatusChange("Direvisi")
            }
            className="flex-1 rounded-xl border border-yellow-500 py-3 font-medium text-yellow-600 hover:bg-yellow-50"
          >
            Revisi
          </button>

          {/* TOLAK */}
          <button
            type="button"
            onClick={() =>
              handleStatusChange("Ditolak")
            }
            className="flex-1 rounded-xl border border-red-500 py-3 font-medium text-red-600 hover:bg-red-50"
          >
            Tolak
          </button>

          {/* SETUJUI */}
          <button
            type="button"
            onClick={() =>
              handleStatusChange("Disetujui")
            }
            className="flex-1 rounded-xl bg-green-600 py-3 font-medium text-white hover:bg-green-700"
          >
            Setujui
          </button>

        </div>

      </div>
    </>
  );
}

/* =====================================================
   INFO ITEM
===================================================== */

function InfoItem({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4">

      <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
        {icon}
      </div>

      <div>

        <p className="text-sm text-gray-500">
          {title}
        </p>

        <p className="font-medium">
          {value}
        </p>

      </div>

    </div>
  );
}

/* =====================================================
   STATUS BADGE
===================================================== */

function StatusBadge({
  status,
}: {
  status: string;
}) {
  let color =
    "bg-gray-100 text-gray-700";

  if (status === "Menunggu") {
    color =
      "bg-yellow-100 text-yellow-700";
  }

  if (status === "Direvisi") {
    color =
      "bg-orange-100 text-orange-700";
  }

  if (status === "Disetujui") {
    color =
      "bg-green-100 text-green-700";
  }

  if (status === "Ditolak") {
    color =
      "bg-red-100 text-red-700";
  }

  return (
    <span
      className={`rounded-full px-4 py-2 text-sm font-semibold ${color}`}
    >
      {status}
    </span>
  );
}