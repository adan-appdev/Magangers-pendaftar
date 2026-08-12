"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  CalendarDays,
  Clock,
  MapPin,
  NotebookPen,
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  X,
  FileText,
} from "lucide-react";

type Jurnal = {
  id: number;
  tanggal: string;
  jamMulai: string;
  jamSelesai: string;
  kegiatan: string;
  lokasi: string;
  deskripsi: string;
};

const initialJurnal: Jurnal[] = [
  {
    id: 1,
    tanggal: "2026-07-27",
    jamMulai: "08:00",
    jamSelesai: "15:00",
    kegiatan: "Mengerjakan tampilan dashboard peserta",
    lokasi: "Ruang Software Engineer",
    deskripsi:
      "Mengerjakan rancangan dan implementasi tampilan dashboard peserta magang menggunakan Next.js dan Tailwind CSS.",
  },
  {
    id: 2,
    tanggal: "2026-07-24",
    jamMulai: "08:00",
    jamSelesai: "15:00",
    kegiatan: "Membuat rancangan UI/UX",
    lokasi: "Ruang Software Engineer",
    deskripsi:
      "Membuat rancangan UI/UX untuk halaman dashboard peserta dan melakukan penyesuaian layout berdasarkan kebutuhan sistem.",
  },
  {
    id: 3,
    tanggal: "2026-07-23",
    jamMulai: "09:00",
    jamSelesai: "15:00",
    kegiatan: "Mempelajari struktur project",
    lokasi: "Ruang Software Engineer",
    deskripsi:
      "Mempelajari struktur project, komponen yang digunakan, serta alur navigasi pada sistem peserta magang.",
  },
];

function formatTanggal(tanggal: string) {
  const date = new Date(`${tanggal}T00:00:00`);

  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const emptyForm: Omit<Jurnal, "id"> = {
  tanggal: "",
  jamMulai: "",
  jamSelesai: "",
  kegiatan: "",
  lokasi: "",
  deskripsi: "",
};

export default function JurnalPage() {
  const [jurnalList, setJurnalList] = useState<Jurnal[]>(initialJurnal);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [showDetail, setShowDetail] = useState(false);

  const [selectedJurnal, setSelectedJurnal] =
    useState<Jurnal | null>(null);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [form, setForm] =
    useState<Omit<Jurnal, "id">>(emptyForm);

  const filteredJurnal = jurnalList.filter((jurnal) => {
    const keyword = search.toLowerCase();

    return (
      jurnal.kegiatan.toLowerCase().includes(keyword) ||
      jurnal.lokasi.toLowerCase().includes(keyword) ||
      jurnal.deskripsi.toLowerCase().includes(keyword)
    );
  });

  const handleChange = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const openTambahForm = () => {
    setEditingId(null);
    setForm({
      ...emptyForm,
      tanggal: new Date().toISOString().split("T")[0],
    });
    setShowForm(true);
  };

  const openEditForm = (jurnal: Jurnal) => {
    setEditingId(jurnal.id);

    setForm({
      tanggal: jurnal.tanggal,
      jamMulai: jurnal.jamMulai,
      jamSelesai: jurnal.jamSelesai,
      kegiatan: jurnal.kegiatan,
      lokasi: jurnal.lokasi,
      deskripsi: jurnal.deskripsi,
    });

    setShowForm(true);
  };

  const handleSubmit = () => {
    if (
      !form.tanggal ||
      !form.jamMulai ||
      !form.jamSelesai ||
      !form.kegiatan ||
      !form.lokasi ||
      !form.deskripsi
    ) {
      alert("Mohon lengkapi semua data jurnal.");
      return;
    }

    if (editingId !== null) {
      setJurnalList((prev) =>
        prev.map((jurnal) =>
          jurnal.id === editingId
            ? {
                ...jurnal,
                ...form,
              }
            : jurnal
        )
      );
    } else {
      const newJurnal: Jurnal = {
        id: Date.now(),
        ...form,
      };

      setJurnalList((prev) => [
        newJurnal,
        ...prev,
      ]);
    }

    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleDelete = (id: number) => {
    const confirmed = window.confirm(
      "Yakin ingin menghapus jurnal ini?"
    );

    if (!confirmed) return;

    setJurnalList((prev) =>
      prev.filter((jurnal) => jurnal.id !== id)
    );
  };

  const openDetail = (jurnal: Jurnal) => {
    setSelectedJurnal(jurnal);
    setShowDetail(true);
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-8">

      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">
            Jurnal Kegiatan
          </h1>

          <p className="mt-1 text-sm text-neutral-500">
            Catat dan dokumentasikan kegiatan magangmu.
          </p>
        </div>

        <button
          onClick={openTambahForm}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Tambah Jurnal
        </button>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <NotebookPen size={20} />
            </div>

            <div>
              <p className="text-xs text-neutral-500">
                Total Jurnal
              </p>

              <p className="text-xl font-semibold text-neutral-900">
                {jurnalList.length}
              </p>
            </div>

          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CalendarDays size={20} />
            </div>

            <div>
              <p className="text-xs text-neutral-500">
                Jurnal Bulan Ini
              </p>

              <p className="text-xl font-semibold text-neutral-900">
                {
                  jurnalList.filter((jurnal) =>
                    jurnal.tanggal.startsWith("2026-07")
                  ).length
                }
              </p>
            </div>

          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <FileText size={20} />
            </div>

            <div>
              <p className="text-xs text-neutral-500">
                Status
              </p>

              <p className="text-sm font-semibold text-emerald-600">
                Aktif
              </p>
            </div>

          </div>
        </div>

      </div>

      <div className="mb-6">

        <div className="relative max-w-md">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
          />

          <input
            type="text"
            placeholder="Cari jurnal..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-xl border border-neutral-200 bg-white py-3 pl-10 pr-4 text-sm text-neutral-800 outline-none transition placeholder:text-neutral-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />

        </div>

      </div>

      <div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-neutral-900">
            Riwayat Jurnal
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Daftar kegiatan magang yang telah kamu catat.
          </p>
        </div>

        {filteredJurnal.length === 0 ? (

          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-neutral-200 bg-neutral-50 px-6 text-center">

            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
              <NotebookPen
                size={24}
                className="text-neutral-400"
              />
            </div>

            <h3 className="text-sm font-semibold text-neutral-800">
              Jurnal tidak ditemukan
            </h3>

            <p className="mt-1 max-w-sm text-xs leading-relaxed text-neutral-500">
              Belum ada jurnal yang sesuai dengan pencarianmu.
            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {filteredJurnal.map((jurnal, index) => (

              <motion.div
                key={jurnal.id}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.25,
                  delay: index * 0.05,
                }}
                className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md md:p-6"
              >

                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

                  <div className="flex items-start gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <NotebookPen size={20} />
                    </div>

                    <div>

                      <p className="mb-1 text-xs font-medium text-blue-600">
                        {formatTanggal(jurnal.tanggal)}
                      </p>

                      <h3 className="text-base font-semibold text-neutral-900">
                        {jurnal.kegiatan}
                      </h3>

                    </div>

                  </div>

                  <div className="flex items-center gap-2">

                    <button
                      onClick={() =>
                        openDetail(jurnal)
                      }
                      className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-2 text-xs font-medium text-neutral-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Eye size={15} />
                      Detail
                    </button>

                    <button
                      onClick={() =>
                        openEditForm(jurnal)
                      }
                      className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-2 text-xs font-medium text-neutral-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Pencil size={15} />
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(jurnal.id)
                      }
                      className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-2 text-xs font-medium text-red-500 transition hover:border-red-200 hover:bg-red-50"
                    >
                      <Trash2 size={15} />
                      Hapus
                    </button>

                  </div>

                </div>

                <div className="mt-5 grid gap-3 border-t border-neutral-100 pt-4 sm:grid-cols-2 lg:grid-cols-3">

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-50 text-neutral-500">
                      <Clock size={16} />
                    </div>

                    <div>
                      <p className="text-[11px] text-neutral-400">
                        Waktu
                      </p>

                      <p className="text-sm font-medium text-neutral-700">
                        {jurnal.jamMulai} -{" "}
                        {jurnal.jamSelesai}
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-50 text-neutral-500">
                      <MapPin size={16} />
                    </div>

                    <div>
                      <p className="text-[11px] text-neutral-400">
                        Lokasi
                      </p>

                      <p className="text-sm font-medium text-neutral-700">
                        {jurnal.lokasi}
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                      <FileText size={16} />
                    </div>

                    <div>
                      <p className="text-[11px] text-neutral-400">
                        Keterangan
                      </p>

                      <p className="text-sm font-medium text-emerald-600">
                        Jurnal tersimpan
                      </p>
                    </div>

                  </div>

                </div>

                <div className="mt-4 rounded-xl bg-neutral-50 p-4">

                  <p className="mb-1 text-[11px] font-medium text-neutral-400">
                    Deskripsi kegiatan
                  </p>

                  <p className="line-clamp-2 text-sm leading-relaxed text-neutral-600">
                    {jurnal.deskripsi}
                  </p>

                </div>

              </motion.div>

            ))}

          </div>

        )}

      </div>

      <AnimatePresence>

        {showForm && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm"
            onClick={() =>
              setShowForm(false)
            }
          >

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
              }}
              transition={{
                duration: 0.25,
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-xl md:p-7"
            >

              <div className="mb-6 flex items-start justify-between">

                <div>

                  <p className="text-xs font-medium text-blue-600">
                    {editingId
                      ? "EDIT JURNAL"
                      : "JURNAL BARU"}
                  </p>

                  <h2 className="mt-1 text-xl font-semibold text-neutral-900">
                    {editingId
                      ? "Edit Jurnal Kegiatan"
                      : "Tambah Jurnal Kegiatan"}
                  </h2>

                  <p className="mt-1 text-sm text-neutral-500">
                    Catat kegiatan magang yang kamu lakukan.
                  </p>

                </div>

                <button
                  onClick={() =>
                    setShowForm(false)
                  }
                  className="rounded-xl p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700"
                >
                  <X size={20} />
                </button>

              </div>

              <div className="space-y-5">

                <div>

                  <label className="mb-2 block text-sm font-medium text-neutral-700">
                    Tanggal
                  </label>

                  <input
                    type="date"
                    value={form.tanggal}
                    onChange={(e) =>
                      handleChange(
                        "tanggal",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />

                </div>

                <div className="grid gap-4 sm:grid-cols-2">

                  <div>

                    <label className="mb-2 block text-sm font-medium text-neutral-700">
                      Jam mulai
                    </label>

                    <input
                      type="time"
                      value={form.jamMulai}
                      onChange={(e) =>
                        handleChange(
                          "jamMulai",
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-sm font-medium text-neutral-700">
                      Jam selesai
                    </label>

                    <input
                      type="time"
                      value={form.jamSelesai}
                      onChange={(e) =>
                        handleChange(
                          "jamSelesai",
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>

                </div>

                <div>

                  <label className="mb-2 block text-sm font-medium text-neutral-700">
                    Kegiatan
                  </label>

                  <input
                    type="text"
                    placeholder="Contoh: Membuat UI dashboard"
                    value={form.kegiatan}
                    onChange={(e) =>
                      handleChange(
                        "kegiatan",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none placeholder:text-neutral-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-sm font-medium text-neutral-700">
                    Lokasi
                  </label>

                  <input
                    type="text"
                    placeholder="Contoh: Ruang Software Engineer"
                    value={form.lokasi}
                    onChange={(e) =>
                      handleChange(
                        "lokasi",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none placeholder:text-neutral-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-sm font-medium text-neutral-700">
                    Deskripsi kegiatan
                  </label>

                  <textarea
                    rows={5}
                    placeholder="Ceritakan kegiatan yang kamu lakukan hari ini..."
                    value={form.deskripsi}
                    onChange={(e) =>
                      handleChange(
                        "deskripsi",
                        e.target.value
                      )
                    }
                    className="w-full resize-none rounded-xl border border-neutral-200 px-4 py-3 text-sm leading-relaxed outline-none placeholder:text-neutral-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />

                </div>

              </div>

              <div className="mt-7 flex justify-end gap-3 border-t border-neutral-100 pt-5">

                <button
                  onClick={() =>
                    setShowForm(false)
                  }
                  className="rounded-xl border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-600 transition hover:bg-neutral-50"
                >
                  Batal
                </button>

                <button
                  onClick={handleSubmit}
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                  {editingId
                    ? "Simpan Perubahan"
                    : "Simpan Jurnal"}
                </button>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

      <AnimatePresence>

        {showDetail && selectedJurnal && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm"
            onClick={() =>
              setShowDetail(false)
            }
          >

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 15,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 15,
              }}
              transition={{
                duration: 0.25,
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
              className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-xl md:p-7"
            >

              <div className="mb-6 flex items-start justify-between">

                <div>

                  <p className="text-xs font-medium text-blue-600">
                    DETAIL JURNAL
                  </p>

                  <h2 className="mt-1 text-xl font-semibold text-neutral-900">
                    {selectedJurnal.kegiatan}
                  </h2>

                  <p className="mt-1 text-sm text-neutral-500">
                    {formatTanggal(
                      selectedJurnal.tanggal
                    )}
                  </p>

                </div>

                <button
                  onClick={() =>
                    setShowDetail(false)
                  }
                  className="rounded-xl p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700"
                >
                  <X size={20} />
                </button>

              </div>

              <div className="grid gap-3 sm:grid-cols-2">

                <div className="rounded-xl bg-neutral-50 p-4">

                  <div className="mb-2 flex items-center gap-2 text-neutral-400">
                    <Clock size={16} />

                    <span className="text-xs">
                      Waktu
                    </span>
                  </div>

                  <p className="text-sm font-medium text-neutral-800">
                    {selectedJurnal.jamMulai} -{" "}
                    {selectedJurnal.jamSelesai}
                  </p>

                </div>

                <div className="rounded-xl bg-neutral-50 p-4">

                  <div className="mb-2 flex items-center gap-2 text-neutral-400">
                    <MapPin size={16} />

                    <span className="text-xs">
                      Lokasi
                    </span>
                  </div>

                  <p className="text-sm font-medium text-neutral-800">
                    {selectedJurnal.lokasi}
                  </p>

                </div>

              </div>

              <div className="mt-4 rounded-2xl border border-neutral-200 p-5">

                <div className="mb-2 flex items-center gap-2">

                  <FileText
                    size={16}
                    className="text-blue-600"
                  />

                  <p className="text-sm font-semibold text-neutral-800">
                    Deskripsi Kegiatan
                  </p>

                </div>

                <p className="text-sm leading-relaxed text-neutral-600">
                  {selectedJurnal.deskripsi}
                </p>

              </div>

              <div className="mt-5 flex justify-end">

                <button
                  onClick={() =>
                    setShowDetail(false)
                  }
                  className="rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
                >
                  Tutup
                </button>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}