"use client";

import { useMemo, useState } from "react";

import StatCard from "@/components/admin/dashboard/StatisticCard";
import ParticipantFilter from "@/components/admin/participant/ParticipantFilter";
import ParticipantTable from "@/components/admin/participant/ParticipantTable";
import ParticipantDrawer from "@/components/admin/participant/ParticipantDrawer";

import {
  Users,
  BriefcaseBusiness,
  CircleCheckBig,
  CalendarClock,
} from "lucide-react";

export interface Participant {
  id: number;
  nama: string;
  email: string;
  sekolah: string;
  posisi: string;
  divisi: string;
  pembimbing: string;
  mulai: string;
  selesai: string;
  status: string;
}

const dummyParticipants: Participant[] = [
  {
    id: 1,
    nama: "Ahmad Fauzi",
    email: "ahmad@gmail.com",
    sekolah: "SMKN 8 Malang",
    posisi: "Frontend Developer",
    divisi: "IT Development",
    pembimbing: "Kak Fitri",
    mulai: "1 Agustus 2026",
    selesai: "31 Januari 2027",
    status: "Aktif",
  },

  {
    id: 2,
    nama: "Nabila Putri",
    email: "nabila@gmail.com",
    sekolah: "Universitas Brawijaya",
    posisi: "UI/UX Designer",
    divisi: "UI/UX",
    pembimbing: "Pak Budi",
    mulai: "1 Juli 2026",
    selesai: "31 Desember 2026",
    status: "Aktif",
  },

  {
    id: 3,
    nama: "Rizky Saputra",
    email: "rizky@gmail.com",
    sekolah: "Polinema",
    posisi: "Backend Developer",
    divisi: "Backend",
    pembimbing: "Kak Fitri",
    mulai: "1 Januari 2026",
    selesai: "30 Juni 2026",
    status: "Selesai",
  },
];

export default function PesertaPage() {
  /*
   * ============================
   * DATA PESERTA
   * ============================
   *
   * Menggunakan state supaya data
   * dapat berubah tanpa database.
   */

  const [participants, setParticipants] =
    useState<Participant[]>(dummyParticipants);

  /*
   * ============================
   * FILTER
   * ============================
   */

  const [search, setSearch] = useState("");

  const [status, setStatus] =
    useState("Semua Status");

  /*
   * ============================
   * DRAWER
   * ============================
   */

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [selectedParticipant, setSelectedParticipant] =
    useState<Participant | null>(null);

  /*
   * ============================
   * FILTER DATA
   * ============================
   */

  const filteredParticipants = useMemo(() => {
    return participants.filter((item) => {
      const matchSearch = item.nama
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchStatus =
        status === "Semua Status" ||
        item.status === status;

      return matchSearch && matchStatus;
    });
  }, [participants, search, status]);

  /*
   * ============================
   * BUKA DETAIL PESERTA
   * ============================
   */

  function openDrawer(participant: Participant) {
    setSelectedParticipant(participant);
    setDrawerOpen(true);
  }

  /*
   * ============================
   * SIMPAN PERUBAHAN PESERTA
   * ============================
   *
   * Function ini dipanggil dari
   * ParticipantDrawer ketika tombol
   * "Simpan" ditekan.
   */

  function handleSaveParticipant(
  updatedParticipant: Participant
) {
  setParticipants((currentParticipants) =>
    currentParticipants.map((participant) =>
      participant.id === updatedParticipant.id
        ? updatedParticipant
        : participant
    )
  );

  setSelectedParticipant(updatedParticipant);
}

  /*
   * ============================
   * STATISTIK
   * ============================
   */

  const totalParticipants =
    participants.length;

  const activeParticipants =
    participants.filter(
      (item) => item.status === "Aktif"
    ).length;

  const finishedParticipants =
    participants.filter(
      (item) => item.status === "Selesai"
    ).length;

  /*
   * Untuk sementara Evaluasi menggunakan
   * jumlah peserta yang aktif.
   *
   * Nanti ketika database sudah digabung,
   * angka ini bisa diganti berdasarkan
   * data evaluasi sebenarnya.
   */

  const evaluationParticipants =
    participants.filter(
      (item) => item.status === "Aktif"
    ).length;

  /*
   * ============================
   * RENDER
   * ============================
   */

  return (
    <div className="space-y-8">

      {/* =========================
          HEADER
      ========================== */}

      <div>
        <h1 className="text-3xl font-bold">
          Peserta Magang
        </h1>

        <p className="mt-2 text-gray-500">
          Kelola seluruh peserta yang sedang
          menjalani program magang.
        </p>
      </div>

      {/* =========================
          STATISTIK
      ========================== */}

      <div className="grid grid-cols-4 gap-5">

        <StatCard
          title="Total Peserta"
          value={totalParticipants}
          icon={Users}
          color="#2563EB"
        />

        <StatCard
          title="Peserta Aktif"
          value={activeParticipants}
          icon={BriefcaseBusiness}
          color="#14B8A6"
        />

        <StatCard
          title="Selesai"
          value={finishedParticipants}
          icon={CircleCheckBig}
          color="#22C55E"
        />

        <StatCard
          title="Evaluasi"
          value={evaluationParticipants}
          icon={CalendarClock}
          color="#F59E0B"
        />

      </div>

      {/* =========================
          FILTER
      ========================== */}

      <ParticipantFilter
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      {/* =========================
          TABLE
      ========================== */}

      <ParticipantTable
        data={filteredParticipants}
        onDetail={openDrawer}
      />

      {/* =========================
          DETAIL DRAWER
      ========================== */}

      <ParticipantDrawer
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedParticipant(null);
        }}
        participant={selectedParticipant}
        onSave={handleSaveParticipant}
      />

    </div>
  );
}