"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, ChevronDown, Paperclip, Clock, User } from "lucide-react";

type StatusTugas = "Belum dikerjakan" | "Sudah dikerjakan";

type Tugas = {
  id: number;
  judul: string;
  deskripsi: string;
  pembimbing: string;
  tanggalDiberikan: string;
  batasWaktu: string;
  status: StatusTugas;
  prioritas: boolean;
};

const initialTugas: Tugas[] = [
  {
    id: 1,
    judul: "Pembuatan UI/UX",
    deskripsi:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    pembimbing: "Pak Bambang",
    tanggalDiberikan: "xx/xx/xxxx xx:xx",
    batasWaktu: "xx/xx/xxxx xx:xx",
    status: "Belum dikerjakan",
    prioritas: true,
  },
  {
    id: 2,
    judul: "Backend Website",
    deskripsi:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    pembimbing: "Pak Bambang",
    tanggalDiberikan: "xx/xx/xxxx xx:xx",
    batasWaktu: "xx/xx/xxxx xx:xx",
    status: "Sudah dikerjakan",
    prioritas: false,
  },
];

const statusStyle: Record<StatusTugas, string> = {
  "Belum dikerjakan": "bg-red-100 text-red-600 hover:bg-red-200",
  "Sudah dikerjakan":
    "bg-emerald-100 text-emerald-600 hover:bg-emerald-200",
};

function StatusDropdown({
  status,
  onChange,
}: {
  status: StatusTugas;
  onChange: (status: StatusTugas) => void;
}) {
  const [open, setOpen] = useState(false);

  const options: StatusTugas[] = [
    "Belum dikerjakan",
    "Sudah dikerjakan",
  ];

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition ${statusStyle[status]}`}
      >
        {status === "Belum dikerjakan"
          ? "Belum Dikerjakan"
          : "Sudah Dikerjakan"}

        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""
            }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-2 w-48 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-1 shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className="block w-full rounded-xl px-4 py-2.5 text-left text-sm text-neutral-700 transition hover:bg-neutral-50"
            >
              {option === "Belum dikerjakan"
                ? "Belum Dikerjakan"
                : "Sudah Dikerjakan"}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function TugasPage() {
  const [tugasList, setTugasList] = useState<Tugas[]>(initialTugas);

  const togglePrioritas = (id: number) => {
    setTugasList((prev) =>
      prev.map((tugas) =>
        tugas.id === id
          ? {
            ...tugas,
            prioritas: !tugas.prioritas,
          }
          : tugas
      )
    );
  };

  const updateStatus = (
    id: number,
    status: StatusTugas
  ) => {
    setTugasList((prev) =>
      prev.map((tugas) =>
        tugas.id === id
          ? {
            ...tugas,
            status,
          }
          : tugas
      )
    );
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-8">

      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-neutral-900">
          Kegiatan Magang
        </h1>

        <p className="mt-1 text-sm text-neutral-500">
          Lihat dan kelola tugas yang diberikan oleh pembimbing.
        </p>
      </div>

      <div className="space-y-5">
        {tugasList.map((tugas) => (
          <div
            key={tugas.id}
            className="relative rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md md:p-7"
          >
            <button
              type="button"
              onClick={() => togglePrioritas(tugas.id)}
              className="absolute right-6 top-6 flex items-center gap-1.5 text-sm text-neutral-400 transition hover:text-amber-500"
            >
              <Star
                size={17}
                className={
                  tugas.prioritas
                    ? "fill-amber-400 text-amber-400"
                    : ""
                }
              />

              <span className="hidden sm:inline">
                Prioritas
              </span>
            </button>

            <div className="pr-24">
              <h2 className="text-xl font-semibold text-neutral-900">
                {tugas.judul}
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-500">
                {tugas.deskripsi}
              </p>
            </div>

            <div className="mt-6 grid gap-4 border-t border-neutral-100 pt-5 sm:grid-cols-3">

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <User size={17} />
                </div>

                <div>
                  <p className="text-xs text-neutral-400">
                    Pembimbing
                  </p>

                  <p className="mt-0.5 text-sm font-medium text-neutral-700">
                    {tugas.pembimbing}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Clock size={17} />
                </div>

                <div>
                  <p className="text-xs text-neutral-400">
                    Tanggal diberikan
                  </p>

                  <p className="mt-0.5 text-sm font-medium text-neutral-700">
                    {tugas.tanggalDiberikan}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
                  <Clock size={17} />
                </div>

                <div>
                  <p className="text-xs text-neutral-400">
                    Batas waktu
                  </p>

                  <p className="mt-0.5 text-sm font-medium text-neutral-700">
                    {tugas.batasWaktu}
                  </p>
                </div>
              </div>

            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-100 pt-5">

              <StatusDropdown
                status={tugas.status}
                onChange={(status) =>
                  updateStatus(tugas.id, status)
                }
              />

              <Link
                href={`/aktif/tugas/lampiran/${tugas.id}`}
                className="flex items-center gap-2 rounded-full bg-neutral-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700"
              >
                <Paperclip size={16} />

                Lampiran Tugas
              </Link>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}