"use client";

import { useMemo, useState } from "react";

import InterviewFilter from "@/components/admin/interview/InterviewFilter";
import InterviewTable from "@/components/admin/interview/InterviewTable";
import InterviewDrawer from "@/components/admin/interview/InterviewDrawer";
import StatCard from "@/components/admin/dashboard/StatisticCard";

import {
  CalendarClock,
  Clock3,
  Users,
  BadgeCheck,
} from "lucide-react";

export interface Interview {
  id: number;
  nama: string;
  email: string;
  sekolah: string;
  posisi: string;
  interviewer: string;
  tanggal: string;
  jam: string;
  metode: string;
  lokasi: string;
  status: string;
}

const dummyInterview: Interview[] = [
  {
    id: 1,
    nama: "Ahmad Fauzi",
    email: "ahmad@gmail.com",
    sekolah: "SMKN 8 Malang",
    posisi: "Frontend Developer",
    interviewer: "Kak Fitri",
    tanggal: "24 Juli 2026",
    jam: "09.00 WIB",
    metode: "Offline",
    lokasi: "Meeting Room 1",
    status: "Dijadwalkan",
  },
  {
    id: 2,
    nama: "Nabila Putri",
    email: "nabila@gmail.com",
    sekolah: "SMKN 4 Malang",
    posisi: "UI/UX Designer",
    interviewer: "Pak Budi",
    tanggal: "24 Juli 2026",
    jam: "10.30 WIB",
    metode: "Online",
    lokasi: "Google Meet",
    status: "Selesai",
  },
  {
    id: 3,
    nama: "Rizky Saputra",
    email: "rizky@gmail.com",
    sekolah: "Universitas Brawijaya",
    posisi: "Backend Developer",
    interviewer: "Kak Fitri",
    tanggal: "25 Juli 2026",
    jam: "08.30 WIB",
    metode: "Offline",
    lokasi: "Meeting Room 2",
    status: "Menunggu",
  },
];

export default function WawancaraPage() {
  const [data, setData] = useState<Interview[]>(dummyInterview);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Semua Status");

  const [selectedInterview, setSelectedInterview] =
    useState<Interview | null>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [addModalOpen, setAddModalOpen] = useState(false);

  const [rescheduleModalOpen, setRescheduleModalOpen] =
    useState(false);

  const [newSchedule, setNewSchedule] = useState({
    nama: "",
    email: "",
    sekolah: "",
    posisi: "",
    interviewer: "",
    tanggal: "",
    jam: "",
    metode: "Offline",
    lokasi: "",
  });

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchSearch = item.nama
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchStatus =
        status === "Semua Status" ||
        item.status === status;

      return matchSearch && matchStatus;
    });
  }, [data, search, status]);

  /* =========================
     STATISTIK
  ========================= */

  const totalInterview = data.length;

  const waitingInterview = data.filter(
    (item) =>
      item.status === "Menunggu" ||
      item.status === "Dijadwalkan"
  ).length;

  const finishedInterview = data.filter(
    (item) => item.status === "Selesai"
  ).length;

  const todayInterview = data.filter(
    (item) => item.tanggal === "24 Juli 2026"
  ).length;

  /* =========================
     BUKA DETAIL
  ========================= */

  function openDrawer(interview: Interview) {
    setSelectedInterview(interview);
    setDrawerOpen(true);
  }

  /* =========================
     LULUS
  ========================= */

  function handlePass() {
    if (!selectedInterview) return;

    setData((currentData) =>
      currentData.map((item) =>
        item.id === selectedInterview.id
          ? {
              ...item,
              status: "Lulus",
            }
          : item
      )
    );

    setSelectedInterview({
      ...selectedInterview,
      status: "Lulus",
    });
  }

  /* =========================
     TIDAK LULUS
  ========================= */

  function handleFail() {
    if (!selectedInterview) return;

    setData((currentData) =>
      currentData.map((item) =>
        item.id === selectedInterview.id
          ? {
              ...item,
              status: "Tidak Lulus",
            }
          : item
      )
    );

    setSelectedInterview({
      ...selectedInterview,
      status: "Tidak Lulus",
    });
  }

  /* =========================
     BUKA JADWAL ULANG
  ========================= */

  function handleOpenReschedule() {
    if (!selectedInterview) return;

    setRescheduleModalOpen(true);
  }

  /* =========================
     SIMPAN JADWAL ULANG
  ========================= */

  function handleReschedule() {
    if (!selectedInterview) return;

    if (
      !newSchedule.tanggal ||
      !newSchedule.jam
    ) {
      alert("Tanggal dan jam harus diisi.");
      return;
    }

    const updatedInterview: Interview = {
      ...selectedInterview,
      tanggal: newSchedule.tanggal,
      jam: newSchedule.jam,
      interviewer:
        newSchedule.interviewer ||
        selectedInterview.interviewer,
      metode:
        newSchedule.metode ||
        selectedInterview.metode,
      lokasi:
        newSchedule.lokasi ||
        selectedInterview.lokasi,
      status: "Dijadwalkan",
    };

    setData((currentData) =>
      currentData.map((item) =>
        item.id === selectedInterview.id
          ? updatedInterview
          : item
      )
    );

    setSelectedInterview(updatedInterview);

    setRescheduleModalOpen(false);

    setNewSchedule({
      nama: "",
      email: "",
      sekolah: "",
      posisi: "",
      interviewer: "",
      tanggal: "",
      jam: "",
      metode: "Offline",
      lokasi: "",
    });
  }

  /* =========================
     TAMBAH JADWAL
  ========================= */

  function handleAddSchedule() {
    if (
      !newSchedule.nama ||
      !newSchedule.email ||
      !newSchedule.tanggal ||
      !newSchedule.jam ||
      !newSchedule.interviewer
    ) {
      alert("Mohon lengkapi data jadwal.");
      return;
    }

    const newInterview: Interview = {
      id:
        data.length > 0
          ? Math.max(...data.map((item) => item.id)) + 1
          : 1,

      nama: newSchedule.nama,
      email: newSchedule.email,
      sekolah: newSchedule.sekolah,
      posisi: newSchedule.posisi,
      interviewer: newSchedule.interviewer,
      tanggal: newSchedule.tanggal,
      jam: newSchedule.jam,
      metode: newSchedule.metode,
      lokasi: newSchedule.lokasi,
      status: "Dijadwalkan",
    };

    setData((currentData) => [
      ...currentData,
      newInterview,
    ]);

    setAddModalOpen(false);

    setNewSchedule({
      nama: "",
      email: "",
      sekolah: "",
      posisi: "",
      interviewer: "",
      tanggal: "",
      jam: "",
      metode: "Offline",
      lokasi: "",
    });
  }

  return (
    <div>

      {/* =========================
          HEADER
      ========================= */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Pengelolaan Wawancara
        </h1>

        <p className="mt-2 text-gray-500">
          Kelola jadwal, interviewer, dan hasil
          wawancara peserta magang.
        </p>

      </div>

      {/* =========================
          STATISTIK
      ========================= */}

      <div className="mb-8 grid grid-cols-4 gap-5">

        <StatCard
          title="Total Wawancara"
          value={totalInterview}
          icon={CalendarClock}
          color="#2563EB"
        />

        <StatCard
          title="Hari Ini"
          value={todayInterview}
          icon={Clock3}
          color="#F59E0B"
        />

        <StatCard
          title="Menunggu"
          value={waitingInterview}
          icon={Users}
          color="#7C3AED"
        />

        <StatCard
          title="Selesai"
          value={finishedInterview}
          icon={BadgeCheck}
          color="#22C55E"
        />

      </div>

      {/* =========================
          FILTER
      ========================= */}

      <InterviewFilter
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        onAdd={() => setAddModalOpen(true)}
      />

      {/* =========================
          TABLE
      ========================= */}

      <InterviewTable
        data={filteredData}
        onDetail={openDrawer}
      />

      {/* =========================
          DRAWER DETAIL
      ========================= */}

      <InterviewDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        interview={selectedInterview}
        onPass={handlePass}
        onFail={handleFail}
        onReschedule={handleOpenReschedule}
      />

      {/* =========================
          MODAL TAMBAH JADWAL
      ========================= */}

      {addModalOpen && (
        <ScheduleModal
          title="Tambah Jadwal Wawancara"
          data={newSchedule}
          setData={setNewSchedule}
          onClose={() => setAddModalOpen(false)}
          onSubmit={handleAddSchedule}
        />
      )}

      {/* =========================
          MODAL JADWAL ULANG
      ========================= */}

      {rescheduleModalOpen && (
        <ScheduleModal
          title="Jadwalkan Ulang Wawancara"
          data={newSchedule}
          setData={setNewSchedule}
          onClose={() =>
            setRescheduleModalOpen(false)
          }
          onSubmit={handleReschedule}
        />
      )}

    </div>
  );
}

/* =====================================================
   MODAL SCHEDULE
===================================================== */

interface ScheduleData {
  nama: string;
  email: string;
  sekolah: string;
  posisi: string;
  interviewer: string;
  tanggal: string;
  jam: string;
  metode: string;
  lokasi: string;
}

interface ScheduleModalProps {
  title: string;
  data: ScheduleData;
  setData: React.Dispatch<
    React.SetStateAction<ScheduleData>
  >;
  onClose: () => void;
  onSubmit: () => void;
}

function ScheduleModal({
  title,
  data,
  setData,
  onClose,
  onSubmit,
}: ScheduleModalProps) {

  function updateField(
    field: keyof ScheduleData,
    value: string
  ) {
    setData((current) => ({
      ...current,
      [field]: value,
    }));
  }

  return (
    <>

      {/* Overlay */}

      <div
        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}

      <div className="fixed inset-0 z-[70] flex items-center justify-center p-5">

        <div
          className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >

          {/* Header */}

          <div className="flex items-center justify-between border-b px-6 py-5">

            <div>
              <h2 className="text-xl font-bold">
                {title}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Masukkan informasi jadwal wawancara.
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100"
            >
              ✕
            </button>

          </div>

          {/* Form */}

          <div className="max-h-[70vh] overflow-y-auto p-6">

            <div className="grid grid-cols-2 gap-5">

              {/* Nama */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Nama Peserta
                </label>

                <input
                  type="text"
                  value={data.nama}
                  onChange={(e) =>
                    updateField(
                      "nama",
                      e.target.value
                    )
                  }
                  placeholder="Nama peserta"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                />
              </div>

              {/* Email */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Email
                </label>

                <input
                  type="email"
                  value={data.email}
                  onChange={(e) =>
                    updateField(
                      "email",
                      e.target.value
                    )
                  }
                  placeholder="email@gmail.com"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                />
              </div>

              {/* Sekolah */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Sekolah / Kampus
                </label>

                <input
                  type="text"
                  value={data.sekolah}
                  onChange={(e) =>
                    updateField(
                      "sekolah",
                      e.target.value
                    )
                  }
                  placeholder="Nama sekolah / kampus"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                />
              </div>

              {/* Posisi */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Posisi
                </label>

                <select
                  value={data.posisi}
                  onChange={(e) =>
                    updateField(
                      "posisi",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                >
                  <option value="">
                    Pilih Posisi
                  </option>

                  <option>
                    Frontend Developer
                  </option>

                  <option>
                    Backend Developer
                  </option>

                  <option>
                    UI/UX Designer
                  </option>

                  <option>
                    Mobile Developer
                  </option>

                  <option>
                    Data Analyst
                  </option>

                </select>
              </div>

              {/* Interviewer */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Interviewer
                </label>

                <select
                  value={data.interviewer}
                  onChange={(e) =>
                    updateField(
                      "interviewer",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                >

                  <option value="">
                    Pilih Interviewer
                  </option>

                  <option>
                    Kak Fitri
                  </option>

                  <option>
                    Pak Budi
                  </option>

                  <option>
                    Kak Andi
                  </option>

                </select>
              </div>

              {/* Tanggal */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Tanggal
                </label>

                <input
                  type="date"
                  value={data.tanggal}
                  onChange={(e) =>
                    updateField(
                      "tanggal",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                />
              </div>

              {/* Jam */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Jam
                </label>

                <input
                  type="time"
                  value={data.jam}
                  onChange={(e) =>
                    updateField(
                      "jam",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                />
              </div>

              {/* Metode */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Metode
                </label>

                <select
                  value={data.metode}
                  onChange={(e) =>
                    updateField(
                      "metode",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                >

                  <option value="Offline">
                    Offline
                  </option>

                  <option value="Online">
                    Online
                  </option>

                </select>
              </div>

              {/* Lokasi */}

              <div className="col-span-2">

                <label className="mb-2 block text-sm font-medium">
                  Lokasi / Link Meeting
                </label>

                <input
                  type="text"
                  value={data.lokasi}
                  onChange={(e) =>
                    updateField(
                      "lokasi",
                      e.target.value
                    )
                  }
                  placeholder="Meeting Room / Google Meet"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                />

              </div>

            </div>

          </div>

          {/* Footer */}

          <div className="flex justify-end gap-3 border-t px-6 py-5">

            <button
              onClick={onClose}
              className="rounded-xl border border-gray-300 px-5 py-2.5 hover:bg-gray-50"
            >
              Batal
            </button>

            <button
              onClick={onSubmit}
              className="rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
            >
              Simpan Jadwal
            </button>

          </div>

        </div>

      </div>

    </>
  );
}