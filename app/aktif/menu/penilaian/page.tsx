"use client";

import {
  Award,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  MessageCircle,
  Star,
  Users,
  UserCheck,
  ShieldCheck,
} from "lucide-react";

type Penilaian = {
  id: number;
  nama: string;
  nilai: number;
  deskripsi: string;
  icon: React.ElementType;
};

const penilaian: Penilaian[] = [
  {
    id: 1,
    nama: "Kehadiran",
    nilai: 90,
    deskripsi: "Kehadiran selama pelaksanaan magang.",
    icon: UserCheck,
  },
  {
    id: 2,
    nama: "Kedisiplinan",
    nilai: 88,
    deskripsi: "Kedisiplinan terhadap waktu dan peraturan.",
    icon: ShieldCheck,
  },
  {
    id: 3,
    nama: "Tanggung Jawab",
    nilai: 92,
    deskripsi: "Kemampuan menyelesaikan tugas dan tanggung jawab.",
    icon: ClipboardCheck,
  },
  {
    id: 4,
    nama: "Sikap",
    nilai: 90,
    deskripsi: "Sikap dan perilaku selama berada di lingkungan kerja.",
    icon: Star,
  },
  {
    id: 5,
    nama: "Komunikasi",
    nilai: 87,
    deskripsi: "Kemampuan berkomunikasi dengan pembimbing dan tim.",
    icon: MessageCircle,
  },
  {
    id: 6,
    nama: "Kerja Sama",
    nilai: 91,
    deskripsi: "Kemampuan bekerja sama dengan anggota tim.",
    icon: Users,
  },
  {
    id: 7,
    nama: "Tugas",
    nilai: 89,
    deskripsi: "Kualitas dan penyelesaian tugas yang diberikan.",
    icon: BookOpen,
  },
  {
    id: 8,
    nama: "Laporan",
    nilai: 93,
    deskripsi: "Kelengkapan dan kualitas laporan magang.",
    icon: FileText,
  },
];

const nilaiAkhir = 90;

function getNilaiLabel(nilai: number) {
  if (nilai >= 90) {
    return "Sangat Baik";
  }

  if (nilai >= 80) {
    return "Baik";
  }

  if (nilai >= 70) {
    return "Cukup";
  }

  return "Perlu Perbaikan";
}

function getProgressWidth(nilai: number) {
  return `${nilai}%`;
}

export default function PenilaianPage() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-8">

      <div className="mb-8">
        <div className="mb-1 flex items-center gap-2">
          <Award
            size={18}
            className="text-neutral-900"
          />

          <p className="text-2xl font-semibold text-neutral-900">
            Penilaian Peserta
          </p>
        </div>

        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-neutral-500">
          Lihat hasil penilaian dan evaluasi kamu selama
          melaksanakan kegiatan magang.
        </p>
      </div>

      <div className="mb-8 grid gap-4 lg:grid-cols-[1.2fr_1fr]">

        <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-blue-50/50 p-6">

          <div className="relative z-10">
            <p className="text-sm font-medium text-blue-600">
              NILAI AKHIR
            </p>

            <div className="mt-4 flex items-end gap-3">
              <span className="text-6xl font-semibold tracking-tight text-neutral-900">
                {nilaiAkhir}
              </span>

              <span className="mb-2 text-sm text-neutral-500">
                / 100
              </span>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 size={16} />
              </span>

              <span className="text-sm font-medium text-emerald-700">
                {getNilaiLabel(nilaiAkhir)}
              </span>
            </div>
          </div>

          <Award
            className="absolute -bottom-8 -right-8 text-blue-100"
            size={180}
          />
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">

          <p className="text-sm text-neutral-500">
            Status penilaian
          </p>

          <div className="mt-3 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={20} />
            </div>

            <div>
              <p className="font-semibold text-neutral-900">
                Penilaian tersedia
              </p>

              <p className="mt-0.5 text-xs text-neutral-500">
                Telah dinilai oleh pembimbing
              </p>
            </div>
          </div>

          <div className="mt-6 border-t border-neutral-100 pt-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-500">
                Jumlah aspek
              </span>

              <span className="font-semibold text-neutral-900">
                {penilaian.length} aspek
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-neutral-500">
                Rata-rata nilai
              </span>

              <span className="font-semibold text-blue-600">
                {nilaiAkhir} / 100
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">

        <div className="mb-5">
          <h2 className="text-xl font-semibold text-neutral-900">
            Detail Penilaian
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Hasil penilaian berdasarkan beberapa aspek selama
            kegiatan magang.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">

          {penilaian.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md"
              >

                <div className="flex items-start justify-between gap-4">

                  <div className="flex items-start gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon size={19} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-neutral-900">
                        {item.nama}
                      </h3>

                      <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                        {item.deskripsi}
                      </p>
                    </div>

                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-2xl font-semibold text-neutral-900">
                      {item.nilai}
                    </p>

                    <p className="text-[11px] text-neutral-400">
                      / 100
                    </p>
                  </div>

                </div>

                <div className="mt-5">

                  <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all duration-500"
                      style={{
                        width: getProgressWidth(item.nilai),
                      }}
                    />
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-neutral-400">
                      Nilai
                    </span>

                    <span className="text-xs font-medium text-blue-600">
                      {getNilaiLabel(item.nilai)}
                    </span>
                  </div>

                </div>

              </div>
            );
          })}

        </div>
      </div>

      <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">

        <div className="mb-5 flex items-start gap-3">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <MessageCircle size={20} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-neutral-900">
              Catatan Pembimbing
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              Evaluasi dan masukan dari pembimbing selama
              pelaksanaan magang.
            </p>
          </div>

        </div>

        <div className="rounded-2xl bg-neutral-50 p-5">

          <div className="mb-3 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-600" />

            <p className="text-sm font-medium text-neutral-700">
              Catatan evaluasi
            </p>
          </div>

          <p className="text-sm leading-7 text-neutral-600">
            Peserta menunjukkan kinerja yang baik selama
            melaksanakan kegiatan magang. Mampu menyelesaikan
            tugas yang diberikan dengan cukup baik dan dapat
            bekerja sama dengan anggota tim. Pertahankan
            kedisiplinan dan tingkatkan kemampuan komunikasi
            serta inisiatif dalam menyelesaikan pekerjaan.
          </p>

        </div>

      </div>

    </div>
  );
}