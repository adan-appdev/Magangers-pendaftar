import Link from "next/link";
import {
  ClipboardCheck,
  CalendarDays,
  Bell,
  FileText,
} from "lucide-react";

const actions = [
  {
    title: "Periksa Pengajuan",
    desc: "Review data dan dokumen peserta.",
    href: "/admin/pelamar",
    icon: ClipboardCheck,
    color: "bg-blue-600",
  },
  {
    title: "Jadwal Wawancara",
    desc: "Kelola jadwal interview peserta.",
    href: "/admin/wawancara",
    icon: CalendarDays,
    color: "bg-violet-600",
  },
  {
    title: "Buat Pengumuman",
    desc: "Informasikan peserta magang.",
    href: "/admin/pengumuman",
    icon: Bell,
    color: "bg-emerald-600",
  },
  {
    title: "Lihat Laporan",
    desc: "Rekap seluruh aktivitas magang.",
    href: "/admin/laporan",
    icon: FileText,
    color: "bg-orange-500",
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-lg font-semibold">
        Quick Action
      </h2>

      <div className="grid grid-cols-4 gap-5">

        {actions.map((item) => {

          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-2xl border border-gray-200 p-5 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}
              >
                <Icon size={22} className="text-white" />
              </div>

              <h3 className="font-semibold">
                {item.title}
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                {item.desc}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}