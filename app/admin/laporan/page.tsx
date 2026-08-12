"use client";

import { useMemo, useState } from "react";

import ReportFilter from "@/components/admin/report/ReportFilter";
import ReportTable from "@/components/admin/report/ReportTable";
import ReportDrawer from "@/components/admin/report/ReportDrawer";
import StatCard from "@/components/admin/dashboard/StatisticCard";

import {
  FileText,
  Clock3,
  CircleCheckBig,
  RotateCcw,
  CircleX,
} from "lucide-react";

export interface Report {
  id: number;
  peserta: string;
  judul: string;
  tanggal: string;
  pembimbing: string;
  status: string;
  deskripsi: string;

  catatan?: string;

  lampiran?: {
    nama: string;
    ukuran: string;
    url?: string;
  };
}

const dummyReport: Report[] = [
  {
    id: 1,
    peserta: "Ahmad Fauzi",
    judul: "Laporan Minggu Ke-1",
    tanggal: "25 Juli 2026",
    pembimbing: "Kak Fitri",
    status: "Menunggu",
    deskripsi: "Mengerjakan halaman login dan dashboard.",
    catatan: "",
    lampiran: {
      nama: "laporan-mingguan.pdf",
      ukuran: "1.2 MB",
    },
  },

  {
    id: 2,
    peserta: "Nabila Putri",
    judul: "Laporan Minggu Ke-2",
    tanggal: "27 Juli 2026",
    pembimbing: "Pak Budi",
    status: "Direvisi",
    deskripsi: "Perbaikan UI halaman peserta.",
    catatan: "Perbaiki ukuran font pada tabel peserta.",
    lampiran: {
      nama: "laporan-minggu-2.pdf",
      ukuran: "980 KB",
    },
  },

  {
    id: 3,
    peserta: "Rizky Saputra",
    judul: "Laporan Minggu Ke-3",
    tanggal: "29 Juli 2026",
    pembimbing: "Kak Fitri",
    status: "Disetujui",
    deskripsi: "Integrasi API Supabase.",
    catatan: "Integrasi sudah sesuai.",
    lampiran: {
      nama: "laporan-minggu-3.pdf",
      ukuran: "1.5 MB",
    },
  },
];

export default function ReportPage() {
  const [reports, setReports] = useState(dummyReport);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("Semua Status");

  const [selectedReport, setSelectedReport] =
    useState<Report | null>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredData = useMemo(() => {
    return reports.filter((item) => {
      const matchSearch = item.peserta
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchStatus =
        status === "Semua Status" ||
        item.status === status;

      return matchSearch && matchStatus;
    });
  }, [reports, search, status]);

  // ==============================
  // UPDATE LAPORAN
  // ==============================

  function handleUpdateReport(updatedReport: Report) {
    setReports((currentReports) =>
      currentReports.map((item) =>
        item.id === updatedReport.id
          ? updatedReport
          : item
      )
    );

    setSelectedReport(updatedReport);
  }

  // ==============================
  // BUKA DETAIL
  // ==============================

  function handleDetail(report: Report) {
    setSelectedReport(report);
    setDrawerOpen(true);
  }

  // ==============================
  // STATISTIK
  // ==============================

  const totalReports = reports.length;

  const waitingReports = reports.filter(
    (item) => item.status === "Menunggu"
  ).length;

  const revisedReports = reports.filter(
    (item) => item.status === "Direvisi"
  ).length;

  const approvedReports = reports.filter(
    (item) => item.status === "Disetujui"
  ).length;

  const rejectedReports = reports.filter(
    (item) => item.status === "Ditolak"
  ).length;

  return (
    <div className="space-y-8">

      {/* HEADER */}

      <div>
        <h1 className="text-3xl font-bold">
          Laporan Magang
        </h1>

        <p className="mt-2 text-gray-500">
          Kelola seluruh laporan mingguan peserta magang.
        </p>
      </div>

      {/* STATISTIK */}

      <div className="grid grid-cols-5 gap-5">

        <StatCard
          title="Total"
          value={totalReports}
          icon={FileText}
          color="#2563EB"
        />

        <StatCard
          title="Menunggu"
          value={waitingReports}
          icon={Clock3}
          color="#F59E0B"
        />

        <StatCard
          title="Direvisi"
          value={revisedReports}
          icon={RotateCcw}
          color="#F97316"
        />

        <StatCard
          title="Disetujui"
          value={approvedReports}
          icon={CircleCheckBig}
          color="#22C55E"
        />

        <StatCard
          title="Ditolak"
          value={rejectedReports}
          icon={CircleX}
          color="#EF4444"
        />

      </div>

      {/* FILTER */}

      <ReportFilter
  search={search}
  setSearch={setSearch}
  status={status}
  setStatus={setStatus}
  onRefresh={() => {
    setSearch("");
    setStatus("Semua Status");
  }}
  onExport={() => {
    const csv = [
      ["Peserta", "Judul", "Tanggal", "Pembimbing", "Status"],
      ...reports.map((item) => [
        item.peserta,
        item.judul,
        item.tanggal,
        item.pembimbing,
        item.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "laporan-magang.csv";
    link.click();

    URL.revokeObjectURL(url);
  }}
/>

      {/* TABLE */}

      <ReportTable
        data={filteredData}
        onDetail={handleDetail}
      />

      {/* DRAWER */}

      <ReportDrawer
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedReport(null);
        }}
        report={selectedReport}
        onUpdate={handleUpdateReport}
      />

    </div>
  );
}