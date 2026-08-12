"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/admin/dashboard/StatisticCard";
import ApplicantChart from "@/components/admin/dashboard/ApplicantChart";
import ActivityTimeline from "@/components/admin/dashboard/ActivityTimeline";
import RecentApplications from "@/components/admin/dashboard/RecentApplications";
import InterviewToday from "@/components/admin/dashboard/InterviewToday";
import QuickActions from "@/components/admin/dashboard/QuickAction";

import {
  Users,
  FileCheck,
  ClipboardCheck,
  UserCheck,
  CalendarClock,
  BadgeCheck,
  BriefcaseBusiness,
  CircleCheckBig,
  CircleX,
  Clock3,
} from "lucide-react";

export default function DashboardPage() {
  const [applicants] = useState<any[]>([]);

  useEffect(() => {
}, []);

  const totalApplicant = applicants.length;

    const newApplicant = applicants.filter(
      (a) => a.status === "Menunggu"
    ).length;

    const waitingVerification = applicants.filter(
      (a) => a.status === "Diperiksa"
    ).length;

    const revision = applicants.filter(
      (a) => a.status === "Revisi"
    ).length;

    const accepted = applicants.filter(
      (a) => a.status === "Diterima"
    ).length;

    const rejected = applicants.filter(
      (a) => a.status === "Ditolak"
    ).length;

    const acceptedData = 0;
    const waitingInterview = 0;
    const waitingResult = 0;
    const active = 0;
    const finished = 0;

  return (
    <div className="space-y-8">

      {/* Judul */}

      <div>

        <h1 className="text-3xl font-bold">
          Dashboard Administrator
        </h1>

        <p className="mt-1 text-gray-500">
          Ringkasan aktivitas sistem magang.
        </p>

      </div>

      {/* Statistik */}

      <div className="grid grid-cols-5 gap-5">

        <StatCard
          title="Jumlah Pendaftar"
          value={totalApplicant}
          icon={Users}
          color="#2563EB"
        />

        <StatCard
          title="Pengajuan Baru"
          value={newApplicant}
          icon={FileCheck}
          color="#7C3AED"
        />

        <StatCard
          title="Menunggu Pemeriksaan"
          value={waitingVerification}
          icon={Clock3}
          color="#F59E0B"
        />

        <StatCard
          title="Data Diri Diterima"
          value={acceptedData}
          icon={ClipboardCheck}
          color="#06B6D4"
        />

        <StatCard
          title="Menunggu Wawancara"
          value={waitingInterview}
          icon={CalendarClock}
          color="#0EA5E9"
        />

        <StatCard
          title="Menunggu Hasil"
          value={waitingResult}
          icon={UserCheck}
          color="#6366F1"
        />

        <StatCard
          title="Peserta Diterima"
          value={accepted}
          icon={BadgeCheck}
          color="#22C55E"
        />

        <StatCard
          title="Peserta Aktif"
          value={active}
          icon={BriefcaseBusiness}
          color="#14B8A6"
        />

        <StatCard
          title="Peserta Selesai"
          value={finished}
          icon={CircleCheckBig}
          color="#16A34A"
        />

        <StatCard
          title="Peserta Ditolak"
          value={rejected}
          icon={CircleX}
          color="#EF4444"
        />

      </div>

      <div className="grid grid-cols-3 gap-5">

        <div className="col-span-2">
          <ApplicantChart />
        </div>

        <ActivityTimeline />

      </div>

      <div className="mt-5 grid grid-cols-3 gap-5">

      <div className="col-span-2">
        <RecentApplications />
      </div>

      <InterviewToday />

    </div>

    <div className="mt-5">
      <QuickActions />
    </div>

    </div>
  );
}