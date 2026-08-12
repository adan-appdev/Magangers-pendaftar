"use client";

import { Eye } from "lucide-react";
import { Participant } from "@/app/admin/peserta/page";

interface Props {
  data: Participant[];
  onDetail: (participant: Participant) => void;
}

export default function ParticipantTable({
  data,
  onDetail,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="text-left text-sm text-gray-500">
              <th className="px-6 py-4">Peserta</th>
              <th className="px-6 py-4">Posisi</th>
              <th className="px-6 py-4">Divisi</th>
              <th className="px-6 py-4">Pembimbing</th>
              <th className="px-6 py-4">Progress</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">
                Aksi
              </th>
            </tr>

          </thead>

          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className="border-t transition hover:bg-gray-50">

                <td className="px-6 py-5">

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">

                      {item.nama
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}

                    </div>

                    <div>

                      <p className="font-semibold">
                        {item.nama}
                      </p>

                      <p className="text-sm text-gray-500">
                        {item.email}
                      </p>

                      <p className="text-xs text-gray-400">
                        {item.sekolah}
                      </p>

                    </div>

                  </div>

                </td>

                <td className="px-6 py-5">
                  {item.posisi}
                </td>

                <td className="px-6 py-5">
                  {item.divisi}
                </td>

                <td className="px-6 py-5">
                  {item.pembimbing}
                </td>

                <td className="px-6 py-5">

                  <ProgressBar
                    progress={
                      item.status === "Aktif"
                        ? 60
                        : 100
                    }
                  />

                </td>

                <td className="px-6 py-5">

                  <StatusBadge
                    status={item.status}
                  />

                </td>

                <td className="px-6 py-5 text-center">

                  <button
                    onClick={() => onDetail(item)}
                    className="inline-flex items-center gap-2 rounded-xl border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white"
                  >

                    <Eye size={16} />

                    Detail

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="flex items-center justify-between border-t px-6 py-4">

        <p className="text-sm text-gray-500">
          Menampilkan {data.length} peserta
        </p>

        <div className="flex gap-2">

          <button className="rounded-lg border px-3 py-1 hover:bg-gray-100">
            ←
          </button>

          <button className="rounded-lg bg-blue-600 px-3 py-1 text-white">
            1
          </button>

          <button className="rounded-lg border px-3 py-1 hover:bg-gray-100">
            →
          </button>

        </div>

      </div>

    </div>
  );
}

function ProgressBar({
  progress,
}: {
  progress: number;
}) {
  return (
    <div className="w-36">

      <div className="mb-1 flex justify-between text-xs">

        <span>Progress</span>

        <span>{progress}%</span>

      </div>

      <div className="h-2 rounded-full bg-gray-200">

        <div
          className="h-2 rounded-full bg-blue-600"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  let color =
    "bg-gray-100 text-gray-700";

  if (status === "Aktif") {
    color =
      "bg-green-100 text-green-700";
  }

  if (status === "Selesai") {
    color =
      "bg-blue-100 text-blue-700";
  }

  if (status === "Cuti") {
    color =
      "bg-yellow-100 text-yellow-700";
  }

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${color}`}
    >
      {status}
    </span>
  );
}