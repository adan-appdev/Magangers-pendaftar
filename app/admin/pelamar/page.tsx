"use client";

import { useMemo, useState } from "react";

import ApplicantFilter from "@/components/admin/application/ApplicantFilter";
import ApplicantTable from "@/components/admin/application/ApplicantTable";
import ApplicantDrawer from "@/components/admin/application/ApplicantDrawer";

import { X, UserPlus } from "lucide-react";

export interface Applicant {
  id: number;
  nama: string;
  email: string;
  sekolah: string;
  jurusan: string;
  posisi: string;
  alamat: string;
  nohp: string;
  tanggal: string;
  status: string;
}

const dummyApplicants: Applicant[] = [
  {
    id: 1,
    nama: "Ahmad Fauzi",
    email: "ahmad@gmail.com",
    sekolah: "SMKN 8 Malang",
    jurusan: "RPL",
    posisi: "Frontend Developer",
    alamat: "Malang, Jawa Timur",
    nohp: "08123456789",
    tanggal: "26 Juli 2026",
    status: "Menunggu",
  },
  {
    id: 2,
    nama: "Nabila Putri",
    email: "nabila@gmail.com",
    sekolah: "SMKN 4 Malang",
    jurusan: "DKV",
    posisi: "UI/UX Designer",
    alamat: "Malang, Jawa Timur",
    nohp: "08234567890",
    tanggal: "25 Juli 2026",
    status: "Diperiksa",
  },
  {
    id: 3,
    nama: "Rizky Saputra",
    email: "rizky@gmail.com",
    sekolah: "Politeknik Negeri Malang",
    jurusan: "Teknik Informatika",
    posisi: "Backend Developer",
    alamat: "Batu, Jawa Timur",
    nohp: "08345678901",
    tanggal: "24 Juli 2026",
    status: "Diterima",
  },
];

export default function PelamarPage() {
  // =========================
  // DATA
  // =========================

  const [applicants, setApplicants] =
    useState<Applicant[]>(dummyApplicants);

  // =========================
  // FILTER
  // =========================

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Semua Status");
  const [position, setPosition] = useState("Semua Posisi");

  // =========================
  // DRAWER DETAIL
  // =========================

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectedApplicant, setSelectedApplicant] =
    useState<Applicant | null>(null);

  // =========================
  // MODAL TAMBAH
  // =========================

  const [addModalOpen, setAddModalOpen] = useState(false);

  const [form, setForm] = useState({
    nama: "",
    email: "",
    sekolah: "",
    jurusan: "",
    posisi: "",
    alamat: "",
    nohp: "",
  });

  // =========================
  // FILTER DATA
  // =========================

  const filteredApplicants = useMemo(() => {
    return applicants.filter((item) => {
      const matchSearch = item.nama
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchStatus =
        status === "Semua Status" ||
        item.status === status;

      const matchPosition =
        position === "Semua Posisi" ||
        item.posisi === position;

      return (
        matchSearch &&
        matchStatus &&
        matchPosition
      );
    });
  }, [applicants, search, status, position]);

  // =========================
  // BUKA DETAIL
  // =========================

  function openDrawer(applicant: Applicant) {
    setSelectedApplicant(applicant);
    setDrawerOpen(true);
  }

  // =========================
  // UPDATE STATUS
  // =========================

  function updateStatus(newStatus: string) {
    if (!selectedApplicant) return;

    setApplicants((prev) =>
      prev.map((item) =>
        item.id === selectedApplicant.id
          ? {
              ...item,
              status: newStatus,
            }
          : item
      )
    );

    setSelectedApplicant({
      ...selectedApplicant,
      status: newStatus,
    });

    setDrawerOpen(false);
  }

  // =========================
  // INPUT FORM
  // =========================

  function handleInputChange(
    field: string,
    value: string
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  // =========================
  // TAMBAH PELAMAR
  // =========================

  function handleAddApplicant() {
    if (
      !form.nama ||
      !form.email ||
      !form.sekolah ||
      !form.jurusan ||
      !form.posisi ||
      !form.nohp
    ) {
      alert("Silakan lengkapi data pelamar terlebih dahulu.");
      return;
    }

    const newApplicant: Applicant = {
      id: Date.now(),
      nama: form.nama,
      email: form.email,
      sekolah: form.sekolah,
      jurusan: form.jurusan,
      posisi: form.posisi,
      alamat: form.alamat,
      nohp: form.nohp,
      tanggal: new Date().toLocaleDateString(
        "id-ID",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
      status: "Menunggu",
    };

    setApplicants((prev) => [
      ...prev,
      newApplicant,
    ]);

    // Reset form
    setForm({
      nama: "",
      email: "",
      sekolah: "",
      jurusan: "",
      posisi: "",
      alamat: "",
      nohp: "",
    });

    // Tutup modal
    setAddModalOpen(false);
  }

  return (
    <div>

      {/* =========================
          HEADER
      ========================= */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Pemeriksaan Pengajuan
        </h1>

        <p className="mt-2 text-gray-500">
          Kelola data pelamar dan lakukan pemeriksaan
          dokumen sebelum proses wawancara.
        </p>
      </div>

      {/* =========================
          FILTER
      ========================= */}

      <ApplicantFilter
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        position={position}
        setPosition={setPosition}
        onAdd={() => setAddModalOpen(true)}
      />

      {/* =========================
          TABLE
      ========================= */}

      <ApplicantTable
        data={filteredApplicants}
        onDetail={openDrawer}
      />

      {/* =========================
          DRAWER DETAIL
      ========================= */}

      <ApplicantDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        applicant={selectedApplicant}
        onAccept={() => updateStatus("Diterima")}
        onReject={() => updateStatus("Ditolak")}
        onRevision={() => updateStatus("Revisi")}
      />

      {/* =========================
          MODAL TAMBAH PELAMAR
      ========================= */}

      {addModalOpen && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setAddModalOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-5">

            <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">

              {/* Header */}
              <div className="flex items-center justify-between border-b px-6 py-5">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                    <UserPlus
                      size={20}
                      className="text-blue-600"
                    />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold">
                      Tambah Pelamar
                    </h2>

                    <p className="text-sm text-gray-500">
                      Masukkan data pelamar baru
                    </p>
                  </div>

                </div>

                <button
                  onClick={() =>
                    setAddModalOpen(false)
                  }
                  className="rounded-lg p-2 hover:bg-gray-100"
                >
                  <X size={20} />
                </button>

              </div>

              {/* Form */}
              <div className="max-h-[70vh] overflow-y-auto p-6">

                <div className="grid grid-cols-2 gap-5">

                  {/* Nama */}
                  <FormInput
                    label="Nama Lengkap"
                    placeholder="Masukkan nama lengkap"
                    value={form.nama}
                    onChange={(value) =>
                      handleInputChange(
                        "nama",
                        value
                      )
                    }
                  />

                  {/* Email */}
                  <FormInput
                    label="Email"
                    placeholder="contoh@email.com"
                    type="email"
                    value={form.email}
                    onChange={(value) =>
                      handleInputChange(
                        "email",
                        value
                      )
                    }
                  />

                  {/* Sekolah */}
                  <FormInput
                    label="Sekolah / Kampus"
                    placeholder="Nama sekolah atau kampus"
                    value={form.sekolah}
                    onChange={(value) =>
                      handleInputChange(
                        "sekolah",
                        value
                      )
                    }
                  />

                  {/* Jurusan */}
                  <FormInput
                    label="Jurusan"
                    placeholder="Contoh: RPL"
                    value={form.jurusan}
                    onChange={(value) =>
                      handleInputChange(
                        "jurusan",
                        value
                      )
                    }
                  />

                  {/* Posisi */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Posisi Magang
                    </label>

                    <select
                      value={form.posisi}
                      onChange={(e) =>
                        handleInputChange(
                          "posisi",
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                    >
                      <option value="">
                        Pilih posisi
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

                  {/* No HP */}
                  <FormInput
                    label="No. Handphone"
                    placeholder="08xxxxxxxxxx"
                    value={form.nohp}
                    onChange={(value) =>
                      handleInputChange(
                        "nohp",
                        value
                      )
                    }
                  />

                  {/* Alamat */}
                  <div className="col-span-2">

                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Alamat
                    </label>

                    <textarea
                      rows={3}
                      placeholder="Masukkan alamat lengkap"
                      value={form.alamat}
                      onChange={(e) =>
                        handleInputChange(
                          "alamat",
                          e.target.value
                        )
                      }
                      className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                    />

                  </div>

                </div>

              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 border-t px-6 py-5">

                <button
                  onClick={() =>
                    setAddModalOpen(false)
                  }
                  className="rounded-xl border border-gray-300 px-5 py-2.5 font-medium hover:bg-gray-50"
                >
                  Batal
                </button>

                <button
                  onClick={handleAddApplicant}
                  className="rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
                >
                  Simpan Pelamar
                </button>

              </div>

            </div>

          </div>
        </>
      )}

    </div>
  );
}

/* =========================
   FORM INPUT COMPONENT
========================= */

function FormInput({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
      />

    </div>
  );
}