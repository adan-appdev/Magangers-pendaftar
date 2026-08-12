import {
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  FileText,
  FileSearch,
  CalendarClock,
  ClipboardCheck,
  BookMarked,
} from "lucide-react";

const STATS = [
  {
    label: "Peserta Bimbingan",
    value: 24,
    note: "+2 dari bulan lalu",
    icon: Users,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
  },
  {
    label: "Hadir Hari Ini",
    value: 18,
    note: "75% dari 24 peserta",
    icon: CheckCircle2,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-500",
  },
  {
    label: "Terlambat",
    value: 3,
    note: "12% dari 24 Peserta",
    icon: Clock,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
  },
  {
    label: "Pengajuan Izin",
    value: 5,
    note: "-1 dari kemarin",
    icon: FileText,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
  },
  {
    label: "Laporan Menunggu Pemeriksaan",
    value: 4,
    note: "+1 dari kemarin",
    icon: FileSearch,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
  },
  {
    label: "Jadwal Evaluasi",
    value: 7,
    note: "Dalam 7 hari ke depan",
    icon: CalendarClock,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
  },
  {
    label: "Tugas Menunggu Pemeriksaan",
    value: 8,
    note: "+2 dari kemarin",
    icon: ClipboardCheck,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-500",
  },
  {
    label: "Jurnal Menunggu Pemeriksaan",
    value: 6,
    note: "+1 dari kemarin",
    icon: BookMarked,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-500",
  },
];

const EVALUASI = [
  { tanggal: "15 Jul 2026", jenis: "Evaluasi Bulanan", nama: "Sasa Shahidah", waktu: "09.00 - 10.00" },
  { tanggal: "15 Jul 2026", jenis: "Evaluasi Bulanan", nama: "Nobeng", waktu: "10.30 - 11.30" },
  { tanggal: "15 Jul 2026", jenis: "Evaluasi Bulanan", nama: "Daffa Capt", waktu: "13.00 - 14.00" },
  { tanggal: "15 Jul 2026", jenis: "Evaluasi Bulanan", nama: "Adan Abiyyu", waktu: "14.30 - 15.30" },
];

const TUGAS_TERBARU = [
  { judul: "Membuat UI Dasboard", nama: "Dimas Saputra", batas: "16 Jul 2026" },
  { judul: "Analisis Kebutuhan Sistem", nama: "Nadia Safitri", batas: "16 Jul 2026" },
  { judul: "Pembuatan API Dokumentasi", nama: "Yoga Firmansyah", batas: "17 Jul 2026" },
];

const JURNAL_TERBARU = [
  { judul: "Jurnal 12 Juli", nama: "Dimas Saputra", tanggal: "12 Jul 2026" },
  { judul: "Jurnal 12 Juli", nama: "Nadia Safitri", tanggal: "12 Jul 2026" },
  { judul: "Jurnal 11 Juli", nama: "Yoga Firmansyah", tanggal: "11 Jul 2026" },
];

const IZIN_TERBARU = [
  { inisial: "DP", nama: "Dimas Saputra", alasan: "Izin Sakit", tanggal: "13 Jul 2026" },
  { inisial: "NS", nama: "Nadia Safitri", alasan: "Izin Keperluan Keluarga", tanggal: "13 Jul 2026" },
  { inisial: "YF", nama: "Yoga Firmansyah", alasan: "Izin Kuliah", tanggal: "12 Jul 2026" },
];

function StatCard({
  label,
  value,
  note,
  icon: Icon,
  iconBg,
  iconColor,
}: (typeof STATS)[number]) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${iconBg}`}>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </span>
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="mt-1 text-3xl font-extrabold text-slate-900">{value}</p>
        <p className="mt-1 text-xs text-slate-400">{note}</p>
      </div>
    </div>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        <a
          href="#"
          className="text-sm font-semibold text-brand-blue hover:underline"
        >
          Lihat semua
        </a>
      </div>
      {children}
    </div>
  );
}

function StatusBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="whitespace-nowrap rounded-lg bg-amber-100 px-4 py-1.5 text-sm font-semibold text-amber-700">
      {children}
    </span>
  );
}

export default function PembinaDashboardPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Dashboard Pembimbing
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Selamat Datang! Berikut ringkasan bimbingan hari ini.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm">
          <Calendar className="h-4 w-4 text-slate-400" />
          Senin, 13 Juli 2026
        </span>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {STATS.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Jadwal Evaluasi Mendatang */}
      <div className="mt-8">
        <SectionCard title="Jadwal Evaluasi Mendatang">
          <div className="divide-y divide-slate-100">
            {EVALUASI.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-2 items-center gap-3 py-3.5 text-sm sm:grid-cols-4"
              >
                <span className="text-slate-500">{item.tanggal}</span>
                <span className="text-slate-500">{item.jenis}</span>
                <span className="font-semibold text-slate-800">{item.nama}</span>
                <span className="text-right text-slate-500 sm:text-left">
                  {item.waktu}
                </span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Tugas Terbaru */}
      <div className="mt-6">
        <SectionCard title="Tugas Terbaru">
          <div className="divide-y divide-slate-100">
            {TUGAS_TERBARU.map((item, i) => (
              <div
                key={i}
                className="flex flex-wrap items-center gap-4 py-3.5"
              >
                <span className="h-10 w-10 shrink-0 rounded-xl bg-blue-200" />
                <div className="min-w-[180px] flex-1">
                  <p className="text-sm font-semibold text-slate-900">
                    {item.judul}
                  </p>
                  <p className="text-sm text-slate-500">{item.nama}</p>
                </div>
                <StatusBadge>Menunggu</StatusBadge>
                <span className="text-sm text-slate-500">
                  Batas : {item.batas}
                </span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Jurnal Terbaru */}
      <div className="mt-6">
        <SectionCard title="Jurnal Terbaru">
          <div className="divide-y divide-slate-100">
            {JURNAL_TERBARU.map((item, i) => (
              <div
                key={i}
                className="flex flex-wrap items-center gap-4 py-3.5"
              >
                <span className="h-10 w-10 shrink-0 rounded-xl bg-blue-200" />
                <div className="min-w-[180px] flex-1">
                  <p className="text-sm font-semibold text-slate-900">
                    {item.judul}
                  </p>
                  <p className="text-sm text-slate-500">{item.nama}</p>
                </div>
                <StatusBadge>Menunggu</StatusBadge>
                <span className="text-sm text-slate-500">{item.tanggal}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Pengajuan Izin Terbaru */}
      <div className="mt-6">
        <SectionCard title="Pengajuan Izin Terbaru">
          <div className="divide-y divide-slate-100">
            {IZIN_TERBARU.map((item, i) => (
              <div
                key={i}
                className="flex flex-wrap items-center gap-4 py-3.5"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-200 text-sm font-bold text-blue-700">
                  {item.inisial}
                </span>
                <div className="min-w-[180px] flex-1">
                  <p className="text-sm font-semibold text-slate-900">
                    {item.nama}
                  </p>
                  <p className="text-sm text-slate-500">{item.alasan}</p>
                </div>
                <span className="text-sm text-slate-500">{item.tanggal}</span>
                <StatusBadge>Menunggu</StatusBadge>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
