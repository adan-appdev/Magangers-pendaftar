"use client";

import { useEffect, useState } from "react";

import StatCard from "@/components/admin/dashboard/StatisticCard";
import ApplicantChart from "@/components/admin/dashboard/ApplicantChart";
import ActivityTimeline from "@/components/admin/dashboard/ActivityTimeline";
import RecentApplications from "@/components/admin/dashboard/RecentApplications";
import InterviewToday from "@/components/admin/dashboard/InterviewToday";
import QuickActions from "@/components/admin/dashboard/QuickAction";

import { supabase } from "@/lib/supabase";

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

interface DashboardStats {
  totalApplicant: number;
  newApplicant: number;
  waitingVerification: number;
  acceptedData: number;
  waitingInterview: number;
  waitingResult: number;
  accepted: number;
  active: number;
  finished: number;
  rejected: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalApplicant: 0,
    newApplicant: 0,
    waitingVerification: 0,
    acceptedData: 0,
    waitingInterview: 0,
    waitingResult: 0,
    accepted: 0,
    active: 0,
    finished: 0,
    rejected: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);

      // ==========================================
      // 1. JUMLAH PENDAFTAR
      // ==========================================

      const { count: totalApplicant, error: applicantError } =
        await supabase
          .from("profiles")
          .select("id", {
            count: "exact",
            head: true,
          })
          .eq("role", "pendaftar");

      if (applicantError) {
        console.error(
          "TOTAL APPLICANT ERROR:",
          applicantError
        );
      }

      // ==========================================
      // 2. PENGAJUAN BARU
      // status = draft
      // ==========================================

      const { count: newApplicant, error: newApplicantError } =
        await supabase
          .from("pengajuan_magang")
          .select("id", {
            count: "exact",
            head: true,
          })
          .eq("status", "draft");

      if (newApplicantError) {
        console.error(
          "NEW APPLICANT ERROR:",
          newApplicantError
        );
      }

      // ==========================================
      // 3. MENUNGGU PEMERIKSAAN
      // status = diajukan
      // ==========================================

      const {
        count: waitingVerification,
        error: verificationError,
      } = await supabase
        .from("pengajuan_magang")
        .select("id", {
          count: "exact",
          head: true,
        })
        .eq("status", "diajukan");

      if (verificationError) {
        console.error(
          "VERIFICATION ERROR:",
          verificationError
        );
      }

      // ==========================================
      // 4. DATA DIRI DITERIMA
      // peserta.status = diterima
      // ==========================================

      const {
        count: acceptedData,
        error: acceptedDataError,
      } = await supabase
        .from("peserta")
        .select("id", {
          count: "exact",
          head: true,
        })
        .eq("status", "diterima");

      if (acceptedDataError) {
        console.error(
          "ACCEPTED DATA ERROR:",
          acceptedDataError
        );
      }

      // ==========================================
      // 5. PESERTA DITERIMA
      // pengajuan_magang.status = diterima
      // ==========================================

      const { count: accepted, error: acceptedError } =
        await supabase
          .from("pengajuan_magang")
          .select("id", {
            count: "exact",
            head: true,
          })
          .eq("status", "diterima");

      if (acceptedError) {
        console.error(
          "ACCEPTED ERROR:",
          acceptedError
        );
      }

      // ==========================================
      // 6. PESERTA AKTIF
      // peserta.status = aktif
      // ==========================================

      const { count: active, error: activeError } =
        await supabase
          .from("peserta")
          .select("id", {
            count: "exact",
            head: true,
          })
          .eq("status", "aktif");

      if (activeError) {
        console.error(
          "ACTIVE ERROR:",
          activeError
        );
      }

      // ==========================================
      // 7. PESERTA SELESAI
      // peserta.status = selesai
      // ==========================================

      const { count: finished, error: finishedError } =
        await supabase
          .from("peserta")
          .select("id", {
            count: "exact",
            head: true,
          })
          .eq("status", "selesai");

      if (finishedError) {
        console.error(
          "FINISHED ERROR:",
          finishedError
        );
      }

      // ==========================================
      // 8. PESERTA DITOLAK
      // pengajuan_magang.status = ditolak
      // ==========================================

      const { count: rejected, error: rejectedError } =
        await supabase
          .from("pengajuan_magang")
          .select("id", {
            count: "exact",
            head: true,
          })
          .eq("status", "ditolak");

      if (rejectedError) {
        console.error(
          "REJECTED ERROR:",
          rejectedError
        );
      }

      // ==========================================
      // WAWANCARA & HASIL
      //
      // Saat ini belum ada tabel wawancara
      // di database kamu.
      //
      // Jadi sementara = 0
      // ==========================================

      const waitingInterview = 0;
      const waitingResult = 0;

      // ==========================================
      // SET DATA DASHBOARD
      // ==========================================

      setStats({
        totalApplicant: totalApplicant ?? 0,
        newApplicant: newApplicant ?? 0,
        waitingVerification: waitingVerification ?? 0,
        acceptedData: acceptedData ?? 0,
        waitingInterview,
        waitingResult,
        accepted: accepted ?? 0,
        active: active ?? 0,
        finished: finished ?? 0,
        rejected: rejected ?? 0,
      });
    } catch (error) {
      console.error(
        "DASHBOARD ERROR:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">

      {/* ==========================================
          JUDUL
      ========================================== */}

      <div>
        <h1 className="text-3xl font-bold">
          Dashboard Administrator
        </h1>

        <p className="mt-1 text-gray-500">
          Ringkasan aktivitas sistem magang.
        </p>
      </div>


      <div className="grid grid-cols-5 gap-5">

        <StatCard
          title="Jumlah Pendaftar"
          value={stats.totalApplicant}
          icon={Users}
          color="#2563EB"
        />

        <StatCard
          title="Pengajuan Baru"
          value={stats.newApplicant}
          icon={FileCheck}
          color="#7C3AED"
        />

        <StatCard
          title="Menunggu Pemeriksaan"
          value={stats.waitingVerification}
          icon={Clock3}
          color="#F59E0B"
        />

        <StatCard
          title="Data Diri Diterima"
          value={stats.acceptedData}
          icon={ClipboardCheck}
          color="#06B6D4"
        />

        <StatCard
          title="Menunggu Wawancara"
          value={stats.waitingInterview}
          icon={CalendarClock}
          color="#0EA5E9"
        />

        <StatCard
          title="Menunggu Hasil"
          value={stats.waitingResult}
          icon={UserCheck}
          color="#6366F1"
        />

        <StatCard
          title="Peserta Diterima"
          value={stats.accepted}
          icon={BadgeCheck}
          color="#22C55E"
        />

        <StatCard
          title="Peserta Aktif"
          value={stats.active}
          icon={BriefcaseBusiness}
          color="#14B8A6"
        />

        <StatCard
          title="Peserta Selesai"
          value={stats.finished}
          icon={CircleCheckBig}
          color="#16A34A"
        />

        <StatCard
          title="Peserta Ditolak"
          value={stats.rejected}
          icon={CircleX}
          color="#EF4444"
        />

      </div>

      {/* ==========================================
          CHART + ACTIVITY
      ========================================== */}

      <div className="grid grid-cols-3 gap-5">

        <div className="col-span-2">
          <ApplicantChart />
        </div>

        <ActivityTimeline />

      </div>

      {/* ==========================================
          RECENT APPLICATION + INTERVIEW
      ========================================== */}

      <div className="mt-5 grid grid-cols-3 gap-5">

        <div className="col-span-2">
          <RecentApplications />
        </div>

        <InterviewToday />

      </div>

      {/* ==========================================
          QUICK ACTION
      ========================================== */}

      <div className="mt-5">
        <QuickActions />
      </div>

    </div>
  );
}