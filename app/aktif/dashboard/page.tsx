"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  FileText,
  ClipboardList,
  Megaphone,
  Plus,
  BookOpen,
  UserCheck,
  AlertCircle,
  ArrowRight,
  BriefcaseBusiness,
} from "lucide-react";

const stats = [
  {
    key: "hadir",
    label: "Hadir",
    value: 40,
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    icon: CheckCircle2,
  },
  {
    key: "sakit",
    label: "Sakit",
    value: 2,
    bg: "bg-amber-100",
    text: "text-amber-700",
    icon: AlertCircle,
  },
  {
    key: "izin",
    label: "Izin",
    value: 1,
    bg: "bg-blue-100",
    text: "text-blue-700",
    icon: FileText,
  },
  {
    key: "tugas",
    label: "Tugas",
    value: 5,
    bg: "bg-pink-100",
    text: "text-pink-700",
    icon: ClipboardList,
  },
];

const quickActions = [
  {
    key: "absen",
    label: "Absen",
    href: "/absensi",
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    icon: UserCheck,
  },
  {
    key: "izin",
    label: "Ajukan izin",
    href: "/absensi",
    bg: "bg-blue-100",
    text: "text-blue-700",
    icon: FileText,
  },
  {
    key: "jurnal",
    label: "Lihat jurnal",
    href: "/jurnal",
    bg: "bg-pink-100",
    text: "text-pink-700",
    icon: BookOpen,
  },
  {
    key: "tambah-jurnal",
    label: "Tambah jurnal",
    href: "/jurnal",
    bg: "bg-red-100",
    text: "text-red-700",
    icon: Plus,
  },
  {
    key: "tugas",
    label: "Lihat tugas",
    href: "/tugas",
    bg: "bg-violet-100",
    text: "text-violet-700",
    icon: ClipboardList,
  },
];

export default function DashboardPesertaPage() {
  const now = new Date();

  const tanggalHariIni = now.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const totalHari = 182;
  const sisaHari = 127;

  const hariBerjalan = totalHari - sisaHari;

  const progressMagang = Math.round(
    (hariBerjalan / totalHari) * 100
  );

  const totalTugas = 10;
  const tugasSelesai = 7;

  const progressTugas = Math.round(
    (tugasSelesai / totalTugas) * 100
  );

  return (
    <div className="min-h-screen w-full bg-white p-6 md:p-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-neutral-100">
              <Image src="/cartyWife.jpeg" width={150} height={150} alt="Foto profil peserta" className="h-full w-full object-cover"/>
              </div>

            <div className="min-w-0 flex-1">

              <div className="mb-4">

                <p className="text-sm font-medium text-blue-600">
                  PESERTA MAGANG
                </p>

                <h1 className="mt-1 text-xl font-semibold text-neutral-900">
                  Aldo Saputra
                </h1>

              </div>

              <div className="grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">

                <InfoItem
                  label="No peserta"
                  value="ASC124JU70JN"
                />

                <InfoItem
                  label="Pembimbing"
                  value="Pak Bambang"
                />

                <InfoItem
                  label="Sekolah"
                  value="SMKN 8 Malang"
                />

                <InfoItem
                  label="Divisi"
                  value="Software Engineer"
                />

              </div>

            </div>

            <div className="flex shrink-0 items-center gap-2 self-start rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700 md:self-center">

              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              Aktif

            </div>

          </div>

        </div>

        <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">

          <div className="mb-4 flex items-center justify-between">

            <div>

              <p className="text-sm text-neutral-500">
                Progress magang
              </p>

              <p className="mt-1 text-xl font-semibold text-neutral-900">
                {progressMagang}%
              </p>

            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <BriefcaseBusiness size={20} />
            </div>

          </div>

          <div className="mb-2 h-2 overflow-hidden rounded-full bg-neutral-100">

            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{
                width: `${progressMagang}%`,
              }}
            />

          </div>

          <div className="flex justify-between text-xs text-neutral-400">

            <span>
              {hariBerjalan} hari berjalan
            </span>

            <span>
              {sisaHari} hari tersisa
            </span>

          </div>

        </div>

      </div>

      <div className="mt-8">

        <div className="mb-4">

          <h2 className="mt-1 text-xl font-semibold text-neutral-900">
            {tanggalHariIni}
          </h2>

        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_1fr_320px]">

          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center justify-between">

              <div>

                <h3 className="text-base font-semibold text-neutral-900">
                  Kehadiran
                </h3>

                <p className="mt-1 text-xs text-neutral-500">
                  Status kehadiran hari ini
                </p>

              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <UserCheck size={19} />
              </div>

            </div>

            <div className="space-y-4">

              <InfoRow
                label="Jadwal"
                value="09:00 - 15:00"
              />

              <InfoRow
                label="Jam masuk"
                value="08:23"
              />

              <InfoRow
                label="Jam pulang"
                value="-"
              />

              <div className="flex items-center justify-between">

                <span className="text-sm text-neutral-500">
                  Status
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">

                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                  Hadir

                </span>

              </div>

            </div>

            <Link
              href="/absensi"
              className="mt-6 flex items-center justify-between rounded-2xl bg-neutral-50 px-4 py-3 text-sm font-medium text-neutral-700 transition hover:bg-blue-50 hover:text-blue-700"
            >

              <span>
                Lihat absensi
              </span>

              <ArrowRight size={16} />

            </Link>

          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">

            <div>

              <div className="mb-4 flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100 text-pink-600">
                    <ClipboardList size={19} />
                  </div>

                  <div>

                    <h3 className="text-base font-semibold text-neutral-900">
                      Tugas hari ini
                    </h3>

                    <p className="text-xs text-neutral-500">
                      Tugas yang perlu dikerjakan
                    </p>

                  </div>

                </div>

                <Link
                  href="/tugas"
                  className="text-xs font-medium text-blue-600 hover:text-blue-700"
                >
                  Lihat semua
                </Link>

              </div>

              <div className="space-y-2">
                <TaskItem text="Menata data" />
                <TaskItem text="Membuat laporan mingguan" />
              </div>
            </div>

            <div className="my-6 border-t border-neutral-100" />

            <div>

              <div className="mb-4 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <Megaphone size={19} />
                </div>

                <div>

                  <h3 className="text-base font-semibold text-neutral-900">
                    Pengumuman terbaru
                  </h3>

                  <p className="text-xs text-neutral-500">
                    Informasi terbaru dari pembimbing
                  </p>

                </div>

              </div>

              <div className="rounded-2xl bg-blue-50/60 p-4">

                <p className="text-sm font-medium text-neutral-800">
                  Rapat satu divisi
                </p>

                <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                  Akan dilaksanakan rapat bersama seluruh anggota
                  divisi.
                </p>

                <p className="mt-2 text-[11px] text-blue-600">
                  Hari ini • 10:00
                </p>

              </div>

            </div>

          </div>

          <div className="grid grid-cols-2 gap-3">

            {stats.map((item) => {

              const Icon = item.icon;

              return (
                <div
                  key={item.key}
                  className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm"
                >

                  <div
                    className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${item.bg} ${item.text}`}
                  >
                    <Icon size={17} />
                  </div>

                  <p className="text-xs text-neutral-500">
                    {item.label}
                  </p>

                  <p className="mt-1 text-lg font-semibold text-neutral-900">
                    {item.value}
                  </p>

                </div>
              );
            })}

            <div className="col-span-2 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs text-neutral-500">
                    Total jurnal
                  </p>

                  <p className="mt-1 text-lg font-semibold text-neutral-900">
                    15
                  </p>

                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-100 text-red-600">
                  <BookOpen size={17} />
                </div>

              </div>

            </div>

            <div className="col-span-2 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">

              <div className="mb-2 flex items-center justify-between">

                <p className="text-xs text-neutral-500">
                  Progress tugas
                </p>

                <p className="text-xs font-semibold text-blue-600">
                  {progressTugas}%
                </p>

              </div>

              <div className="h-2 overflow-hidden rounded-full bg-neutral-100">

                <div
                  className="h-full rounded-full bg-blue-500 transition-all"
                  style={{
                    width: `${progressTugas}%`,
                  }}
                />

              </div>

              <p className="mt-2 text-[11px] text-neutral-400">
                {tugasSelesai} dari {totalTugas} tugas selesai
              </p>

            </div>

          </div>

        </div>

      </div>

      <div className="mt-8">

        <div className="mb-4">

          <h2 className="mt-1 text-xl font-semibold text-neutral-900">
            Action Forward
          </h2>

        </div>

        <div className="flex flex-wrap gap-3">

          {quickActions.map((action) => {

            const Icon = action.icon;

            return (
              <Link
                key={action.key}
                href={action.href}
                className="group flex items-center gap-3 rounded-full border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
              >

                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${action.bg} ${action.text}`}
                >
                  <Icon size={16} />
                </span>

                <span>
                  {action.label}
                </span>

                <ArrowRight
                  size={14}
                  className="text-neutral-300 transition group-hover:translate-x-0.5 group-hover:text-blue-500"
                />

              </Link>
            );
          })}

        </div>

      </div>

    </div>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <p className="text-neutral-500">
      {label}{" "}
      <span className="font-medium text-neutral-900">
        {value}
      </span>
    </p>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-neutral-100 pb-3 last:border-0 last:pb-0">

      <span className="text-sm text-neutral-500">
        {label}
      </span>

      <span className="text-sm font-medium text-neutral-800">
        {value}
      </span>

    </div>
  );
}

function TaskItem({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-neutral-50 px-3 py-2.5">

      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-neutral-400 shadow-sm">
        <ClipboardList size={14} />
      </div>

      <span className="text-sm text-neutral-700">
        {text}
      </span>

    </div>
  );
}