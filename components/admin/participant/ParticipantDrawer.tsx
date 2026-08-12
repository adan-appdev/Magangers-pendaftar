"use client";

import { useEffect, useState } from "react";
import {
  X,
  Building2,
  Calendar,
  User,
  GraduationCap,
  Mail,
} from "lucide-react";

import { Participant } from "@/app/admin/peserta/page";

interface Props {
  open: boolean;
  onClose: () => void;
  participant: Participant | null;
  onSave: (participant: Participant) => void;
}

export default function ParticipantDrawer({
  open,
  onClose,
  participant,
  onSave,
}: Props) {
  const [editedParticipant, setEditedParticipant] =
    useState<Participant | null>(participant);

  const [isEditing, setIsEditing] = useState(false);

  // Ketika peserta yang dipilih berubah
  useEffect(() => {
    setEditedParticipant(participant);
    setIsEditing(false);
  }, [participant]);

  if (!open || !editedParticipant) return null;

  const currentParticipant = editedParticipant;

  // ============================
  // UPDATE DATA
  // ============================

  function updateField(
    field: keyof Participant,
    value: string
  ) {
    setEditedParticipant((current) => {
      if (!current) return current;

      return {
        ...current,
        [field]: value,
      };
    });
  }

  // ============================
  // SIMPAN
  // ============================

  function handleSave() {
    if (!editedParticipant) return;

    onSave(editedParticipant);
    setIsEditing(false);
  }

  // ============================
  // UBAH STATUS
  // ============================

  function handleStatusChange(newStatus: string) {
  if (!editedParticipant) return;

  const updatedParticipant: Participant = {
    ...editedParticipant,
    status: newStatus,
  };

  setEditedParticipant(updatedParticipant);
  onSave(updatedParticipant);
}

  return (
    <>
      {/* =========================
          OVERLAY
      ========================== */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
      />

      {/* =========================
          DRAWER
      ========================== */}

      <div className="fixed right-0 top-0 z-50 h-screen w-full max-w-xl overflow-y-auto bg-white shadow-2xl">

        {/* =========================
            HEADER
        ========================== */}

        <div className="sticky top-0 z-20 flex items-center justify-between border-b bg-white px-6 py-5">

          <div>
            <h2 className="text-xl font-bold">
              Detail Peserta
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Informasi lengkap peserta magang.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-gray-100"
          >
            <X size={22} />
          </button>

        </div>

        {/* =========================
            CONTENT
        ========================== */}

        <div className="space-y-6 p-6">

          {/* =========================
              PROFILE
          ========================== */}

          <div className="flex items-center gap-4">

            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
              {currentParticipant.nama
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </div>

            <div className="min-w-0">

              <h2 className="text-2xl font-bold">
                {currentParticipant.nama}
              </h2>

              <p className="truncate text-gray-500">
                {currentParticipant.email}
              </p>

              <StatusBadge
                status={currentParticipant.status}
              />

            </div>

          </div>

          {/* =========================
              PROGRESS
          ========================== */}

          <div className="rounded-xl border border-gray-200 p-5">

            <h3 className="mb-4 font-semibold">
              Progress Magang
            </h3>

            <ProgressBar
              progress={
                currentParticipant.status === "Aktif"
                  ? 60
                  : currentParticipant.status === "Selesai"
                  ? 100
                  : 0
              }
            />

          </div>

          {/* =========================
              INFORMASI PESERTA
          ========================== */}

          <div className="rounded-xl border border-gray-200">

            <div className="border-b px-5 py-4 font-semibold">
              Informasi Peserta
            </div>

            <div className="space-y-5 p-5">

              {/* Sekolah */}

              <Item
                icon={<GraduationCap size={18} />}
                title="Sekolah"
                value={currentParticipant.sekolah}
              />

              {/* Posisi */}

              <Item
                icon={<Building2 size={18} />}
                title="Posisi"
                value={currentParticipant.posisi}
              />

              {/* Divisi */}

              <Item
                icon={<Building2 size={18} />}
                title="Divisi"
                value={currentParticipant.divisi}
              />

              {/* Pembimbing */}

              <Item
                icon={<User size={18} />}
                title="Pembimbing"
                value={currentParticipant.pembimbing}
              />

              {/* Periode */}

              <Item
                icon={<Calendar size={18} />}
                title="Periode"
                value={`${currentParticipant.mulai} - ${currentParticipant.selesai}`}
              />

              {/* Email */}

              <Item
                icon={<Mail size={18} />}
                title="Email"
                value={currentParticipant.email}
              />

            </div>

          </div>

          {/* =========================
              KEHADIRAN
          ========================== */}

          <div className="rounded-xl border border-gray-200 p-5">

            <h3 className="mb-5 font-semibold">
              Ringkasan Kehadiran
            </h3>

            <div className="grid grid-cols-3 gap-4">

              <AttendanceCard
                title="Hadir"
                value="94%"
                color="bg-green-100 text-green-700"
              />

              <AttendanceCard
                title="Izin"
                value="3"
                color="bg-yellow-100 text-yellow-700"
              />

              <AttendanceCard
                title="Terlambat"
                value="2"
                color="bg-red-100 text-red-700"
              />

            </div>

          </div>

          {/* =========================
              EVALUASI
          ========================== */}

          <div className="rounded-xl border border-gray-200 p-5">

            <h3 className="mb-5 font-semibold">
              Evaluasi
            </h3>

            <Score
              label="Disiplin"
              value={95}
            />

            <Score
              label="Komunikasi"
              value={92}
            />

            <Score
              label="Kerja Tim"
              value={90}
            />

            <Score
              label="Teknis"
              value={88}
            />

          </div>

          {/* =========================
              CATATAN
          ========================== */}

          <div className="rounded-xl border border-gray-200 p-5">

            <h3 className="mb-4 font-semibold">
              Catatan Pembimbing
            </h3>

            <p className="text-gray-600">
              Peserta menunjukkan perkembangan yang
              baik, aktif bertanya, serta mampu
              menyelesaikan tugas sesuai target yang
              diberikan.
            </p>

          </div>

          {/* =========================
              EDIT DATA
          ========================== */}

          {isEditing && (
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">

              <h3 className="mb-5 font-semibold">
                Ubah Data Peserta
              </h3>

              <div className="space-y-4">

                <InputField
                  label="Nama"
                  value={currentParticipant.nama}
                  onChange={(value) =>
                    updateField("nama", value)
                  }
                />

                <InputField
                  label="Email"
                  value={currentParticipant.email}
                  onChange={(value) =>
                    updateField("email", value)
                  }
                />

                <InputField
                  label="Sekolah"
                  value={currentParticipant.sekolah}
                  onChange={(value) =>
                    updateField("sekolah", value)
                  }
                />

                <InputField
                  label="Posisi"
                  value={currentParticipant.posisi}
                  onChange={(value) =>
                    updateField("posisi", value)
                  }
                />

                <InputField
                  label="Divisi"
                  value={currentParticipant.divisi}
                  onChange={(value) =>
                    updateField("divisi", value)
                  }
                />

                <InputField
                  label="Pembimbing"
                  value={currentParticipant.pembimbing}
                  onChange={(value) =>
                    updateField("pembimbing", value)
                  }
                />

                <InputField
                  label="Tanggal Mulai"
                  value={currentParticipant.mulai}
                  onChange={(value) =>
                    updateField("mulai", value)
                  }
                />

                <InputField
                  label="Tanggal Selesai"
                  value={currentParticipant.selesai}
                  onChange={(value) =>
                    updateField("selesai", value)
                  }
                />

              </div>

            </div>
          )}

        </div>

        {/* =========================
            FOOTER
        ========================== */}

        <div className="sticky bottom-0 flex gap-3 border-t bg-white p-6">

          {/* UBAH STATUS */}

          <div className="relative flex-1">

            <select
              value={currentParticipant.status}
              onChange={(e) =>
                handleStatusChange(e.target.value)
              }
              className="w-full appearance-none rounded-xl border border-yellow-500 bg-white px-4 py-3 text-center font-medium text-yellow-600 outline-none focus:ring-2 focus:ring-yellow-200"
            >
              <option value="Aktif">
                Aktif
              </option>

              <option value="Selesai">
                Selesai
              </option>

              <option value="Ditunda">
                Ditunda
              </option>
            </select>

          </div>

          {/* EDIT / SIMPAN */}

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Ubah Data
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="flex-1 rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Simpan
            </button>
          )}

        </div>

      </div>
    </>
  );
}


/* =====================================================
   COMPONENT ITEM
===================================================== */

function Item({
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
   PROGRESS BAR
===================================================== */

function ProgressBar({
  progress,
}: {
  progress: number;
}) {
  return (
    <div>

      <div className="mb-2 flex justify-between">

        <span>Progress</span>

        <span>
          {progress}%
        </span>

      </div>

      <div className="h-3 rounded-full bg-gray-200">

        <div
          className="h-3 rounded-full bg-blue-600 transition-all"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

    </div>
  );
}


/* =====================================================
   ATTENDANCE CARD
===================================================== */

function AttendanceCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div
      className={`rounded-xl p-4 text-center ${color}`}
    >

      <h4 className="text-2xl font-bold">
        {value}
      </h4>

      <p className="mt-1 text-sm">
        {title}
      </p>

    </div>
  );
}


/* =====================================================
   SCORE
===================================================== */

function Score({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="mb-5">

      <div className="mb-2 flex justify-between">

        <span>{label}</span>

        <span className="font-semibold">
          {value}%
        </span>

      </div>

      <div className="h-2 rounded-full bg-gray-200">

        <div
          className="h-2 rounded-full bg-blue-600"
          style={{
            width: `${value}%`,
          }}
        />

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
  const color =
    status === "Aktif"
      ? "bg-green-100 text-green-700"
      : status === "Selesai"
      ? "bg-blue-100 text-blue-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <span
      className={`mt-3 inline-block rounded-full px-4 py-1 text-sm font-semibold ${color}`}
    >
      {status}
    </span>
  );
}


/* =====================================================
   INPUT FIELD
===================================================== */

function InputField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>

      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
      />

    </div>
  );
}