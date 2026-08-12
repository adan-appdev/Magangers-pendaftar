"use client";

import { useMemo, useState } from "react";

import StatCard from "@/components/admin/dashboard/StatisticCard";
import AnnouncementFilter from "@/components/admin/announcement/AnnouncementFilter";
import AnnouncementCard from "@/components/admin/announcement/AnnouncementCard";
import AnnouncementDrawer from "@/components/admin/announcement/AnnouncementDrawer";

import {
  Bell,
  Send,
  FileText,
  Clock3,
  X,
  Upload,
} from "lucide-react";

export interface AnnouncementAttachment {
  name: string;
  size: number;
  type: string;
  url: string;
}

export interface Announcement {
  id: number;
  judul: string;
  isi: string;
  target: string;
  tanggal: string;
  status: string;
  attachment?: AnnouncementAttachment;
}

const dummyAnnouncement: Announcement[] = [
  {
    id: 1,
    judul: "Jadwal Evaluasi Mingguan",
    isi: "Evaluasi dilakukan hari Jumat pukul 09.00.",
    target: "Semua Peserta",
    tanggal: "25 Juli 2026",
    status: "Dipublikasikan",
  },
  {
    id: 2,
    judul: "Pengumpulan Laporan",
    isi: "Seluruh peserta wajib mengumpulkan laporan.",
    target: "Frontend",
    tanggal: "28 Juli 2026",
    status: "Draft",
  },
  {
    id: 3,
    judul: "Perubahan Jadwal",
    isi: "Wawancara dipindah ke ruang Meeting 2.",
    target: "Backend",
    tanggal: "30 Juli 2026",
    status: "Terjadwal",
  },
];

export default function PengumumanPage() {
  /*
   * ============================
   * DATA
   * ============================
   */

  const [data, setData] =
    useState<Announcement[]>(dummyAnnouncement);

  /*
   * ============================
   * SEARCH
   * ============================
   */

  const [search, setSearch] = useState("");

  /*
   * ============================
   * DRAWER
   * ============================
   */

  const [selected, setSelected] =
    useState<Announcement | null>(null);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  /*
   * ============================
   * MODAL TAMBAH / EDIT
   * ============================
   */

  const [formOpen, setFormOpen] = useState(false);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [target, setTarget] = useState("Semua Peserta");
  const [tanggal, setTanggal] = useState("");
  const [status, setStatus] = useState("Draft");

  const [file, setFile] =
    useState<File | null>(null);

  /*
   * ============================
   * FILTER
   * ============================
   */

  const filtered = useMemo(() => {
    return data.filter((item) =>
      item.judul
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [data, search]);

  /*
   * ============================
   * RESET FORM
   * ============================
   */

  function resetForm() {
    setJudul("");
    setIsi("");
    setTarget("Semua Peserta");
    setTanggal("");
    setStatus("Draft");
    setFile(null);
    setEditingId(null);
  }

  /*
   * ============================
   * TAMBAH
   * ============================
   */

  function handleAdd() {
    resetForm();
    setFormOpen(true);
  }

  /*
   * ============================
   * EDIT
   * ============================
   */

  function handleEdit(announcement: Announcement) {
    setEditingId(announcement.id);

    setJudul(announcement.judul);
    setIsi(announcement.isi);
    setTarget(announcement.target);
    setTanggal(announcement.tanggal);
    setStatus(announcement.status);

    setFile(null);

    setDrawerOpen(false);
    setFormOpen(true);
  }

  /*
   * ============================
   * SIMPAN
   * ============================
   */

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!judul.trim()) {
      alert("Judul pengumuman wajib diisi.");
      return;
    }

    if (!isi.trim()) {
      alert("Isi pengumuman wajib diisi.");
      return;
    }

    if (!tanggal.trim()) {
      alert("Tanggal wajib diisi.");
      return;
    }

    /*
     * Buat data lampiran
     */

    let attachment =
      editingId !== null
        ? data.find((item) => item.id === editingId)
            ?.attachment
        : undefined;

    if (file) {
      attachment = {
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
      };
    }

    /*
     * EDIT
     */

    if (editingId !== null) {
      setData((current) =>
        current.map((item) =>
          item.id === editingId
            ? {
                ...item,
                judul,
                isi,
                target,
                tanggal,
                status,
                attachment,
              }
            : item
        )
      );
    }

    /*
     * TAMBAH
     */

    else {
      const newAnnouncement: Announcement = {
        id:
          data.length > 0
            ? Math.max(...data.map((item) => item.id)) + 1
            : 1,

        judul,
        isi,
        target,
        tanggal,
        status,
        attachment,
      };

      setData((current) => [
        ...current,
        newAnnouncement,
      ]);
    }

    setFormOpen(false);
    resetForm();
  }

  /*
   * ============================
   * HAPUS
   * ============================
   */

  function handleDelete(id: number) {
    const announcement = data.find(
      (item) => item.id === id
    );

    if (!announcement) return;

    const confirmed = window.confirm(
      `Yakin ingin menghapus pengumuman "${announcement.judul}"?`
    );

    if (!confirmed) return;

    setData((current) =>
      current.filter((item) => item.id !== id)
    );

    if (selected?.id === id) {
      setSelected(null);
      setDrawerOpen(false);
    }
  }

  /*
   * ============================
   * PUBLISH
   * ============================
   */

  function handlePublish(announcement: Announcement) {
    setData((current) =>
      current.map((item) =>
        item.id === announcement.id
          ? {
              ...item,
              status: "Dipublikasikan",
            }
          : item
      )
    );

    setSelected((current) =>
      current
        ? {
            ...current,
            status: "Dipublikasikan",
          }
        : null
    );
  }

  /*
   * ============================
   * DETAIL
   * ============================
   */

  function handleDetail(announcement: Announcement) {
    setSelected(announcement);
    setDrawerOpen(true);
  }

  /*
   * ============================
   * EXPORT CSV
   * ============================
   */

  function handleExport() {
    if (data.length === 0) {
      alert("Tidak ada data untuk diexport.");
      return;
    }

    const header = [
      "ID",
      "Judul",
      "Isi",
      "Target",
      "Tanggal",
      "Status",
      "Lampiran",
    ];

    const rows = data.map((item) => [
      item.id,
      item.judul,
      item.isi,
      item.target,
      item.tanggal,
      item.status,
      item.attachment?.name || "-",
    ]);

    const csv = [
      header,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value).replace(/"/g, '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "data-pengumuman.csv";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  /*
   * ============================
   * STATISTIK
   * ============================
   */

  const total = data.length;

  const published = data.filter(
    (item) => item.status === "Dipublikasikan"
  ).length;

  const draft = data.filter(
    (item) => item.status === "Draft"
  ).length;

  const scheduled = data.filter(
    (item) => item.status === "Terjadwal"
  ).length;

  /*
   * ============================
   * RENDER
   * ============================
   */

  return (
    <div className="space-y-8">

      {/* HEADER */}

      <div>
        <h1 className="text-3xl font-bold">
          Pengumuman
        </h1>

        <p className="mt-2 text-gray-500">
          Kelola seluruh informasi dan pengumuman peserta magang.
        </p>
      </div>

      {/* STATISTIK */}

      <div className="grid grid-cols-4 gap-5">

        <StatCard
          title="Total"
          value={total}
          icon={Bell}
          color="#2563EB"
        />

        <StatCard
          title="Dipublikasikan"
          value={published}
          icon={Send}
          color="#22C55E"
        />

        <StatCard
          title="Draft"
          value={draft}
          icon={FileText}
          color="#F59E0B"
        />

        <StatCard
          title="Terjadwal"
          value={scheduled}
          icon={Clock3}
          color="#7C3AED"
        />

      </div>

      {/* FILTER */}

      <AnnouncementFilter
        search={search}
        setSearch={setSearch}
        onAdd={handleAdd}
        onExport={handleExport}
      />

      {/* CARD */}

      <AnnouncementCard
        data={filtered}
        onDetail={handleDetail}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* DRAWER */}

      <AnnouncementDrawer
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setSelected(null);
        }}
        announcement={selected}
        onEdit={handleEdit}
        onPublish={handlePublish}
      />

      {/* MODAL TAMBAH / EDIT */}

      {formOpen && (
        <>
          <div
            className="fixed inset-0 z-[60] bg-black/40"
            onClick={() => {
              setFormOpen(false);
              resetForm();
            }}
          />

          <div className="fixed left-1/2 top-1/2 z-[70] max-h-[90vh] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* HEADER */}

            <div className="flex items-center justify-between border-b px-6 py-5">

              <div>
                <h2 className="text-xl font-bold">
                  {editingId !== null
                    ? "Edit Pengumuman"
                    : "Tambah Pengumuman"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Isi informasi pengumuman di bawah ini.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setFormOpen(false);
                  resetForm();
                }}
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <X size={22} />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >

              {/* JUDUL */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Judul Pengumuman
                </label>

                <input
                  type="text"
                  value={judul}
                  onChange={(e) =>
                    setJudul(e.target.value)
                  }
                  placeholder="Contoh: Jadwal Evaluasi Mingguan"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                />
              </div>

              {/* ISI */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Isi Pengumuman
                </label>

                <textarea
                  value={isi}
                  onChange={(e) =>
                    setIsi(e.target.value)
                  }
                  rows={5}
                  placeholder="Tuliskan isi pengumuman..."
                  className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                />
              </div>

              {/* TARGET + STATUS */}

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Target Peserta
                  </label>

                  <select
                    value={target}
                    onChange={(e) =>
                      setTarget(e.target.value)
                    }
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                  >
                    <option>Semua Peserta</option>
                    <option>Frontend</option>
                    <option>Backend</option>
                    <option>UI/UX</option>
                    <option>Mobile Developer</option>
                    <option>Data Analyst</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Status
                  </label>

                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value)
                    }
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                  >
                    <option>Draft</option>
                    <option>Terjadwal</option>
                    <option>Dipublikasikan</option>
                  </select>
                </div>

              </div>

              {/* TANGGAL */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Tanggal
                </label>

                <input
                  type="date"
                  value={tanggal}
                  onChange={(e) =>
                    setTanggal(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                />
              </div>

              {/* FILE */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Lampiran
                </label>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-8 transition hover:border-blue-500 hover:bg-blue-50">

                  <Upload
                    size={30}
                    className="mb-3 text-blue-600"
                  />

                  <span className="font-medium">
                    Klik untuk memilih file
                  </span>

                  <span className="mt-1 text-sm text-gray-500">
                    PDF, DOC, DOCX, XLS, XLSX, JPG, PNG
                  </span>

                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      const selectedFile =
                        e.target.files?.[0];

                      if (selectedFile) {
                        setFile(selectedFile);
                      }
                    }}
                  />

                </label>

                {file && (
                  <div className="mt-3 rounded-xl bg-blue-50 p-4">

                    <p className="text-sm font-medium text-blue-700">
                      File dipilih:
                    </p>

                    <p className="mt-1 text-sm text-blue-600">
                      {file.name}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>

                  </div>
                )}
              </div>

              {/* BUTTON */}

              <div className="flex justify-end gap-3 border-t pt-5">

                <button
                  type="button"
                  onClick={() => {
                    setFormOpen(false);
                    resetForm();
                  }}
                  className="rounded-xl border border-gray-300 px-6 py-3 font-medium hover:bg-gray-100"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
                >
                  {editingId !== null
                    ? "Simpan Perubahan"
                    : "Tambah Pengumuman"}
                </button>

              </div>

            </form>

          </div>
        </>
      )}

    </div>
  );
}