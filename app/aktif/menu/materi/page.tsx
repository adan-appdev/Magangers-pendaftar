"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    ChevronDown,
    FileText,
    FileSpreadsheet,
    Presentation,
    Download,
    Eye,
    FolderOpen,
    Search,
} from "lucide-react";

type FileType = "PDF" | "DOCX" | "XLSX" | "PPTX";

type MateriFile = {
    id: number;
    nama: string;
    tipe: FileType;
    ukuran: string;
    tanggal: string;
    deskripsi?: string;
};

type KategoriMateri = {
    id: number;
    nama: string;
    deskripsi: string;
    files: MateriFile[];
};

const materiData: KategoriMateri[] = [
    {
        id: 1,
        nama: "Peraturan Perusahaan",
        deskripsi: "Peraturan dan ketentuan yang berlaku selama kegiatan magang.",
        files: [
            {
                id: 101,
                nama: "Peraturan Perusahaan.pdf",
                tipe: "PDF",
                ukuran: "2.4 MB",
                tanggal: "20 Juli 2026",
                deskripsi: "Peraturan umum dan tata tertib perusahaan.",
            },
            {
                id: 102,
                nama: "Tata Tertib Peserta Magang.pdf",
                tipe: "PDF",
                ukuran: "1.2 MB",
                tanggal: "20 Juli 2026",
                deskripsi: "Ketentuan yang harus dipatuhi oleh peserta magang.",
            },
        ],
    },

    {
        id: 2,
        nama: "Panduan Peserta Magang",
        deskripsi: "Panduan yang membantu peserta memahami kegiatan magang.",
        files: [
            {
                id: 201,
                nama: "Panduan Peserta Magang.pdf",
                tipe: "PDF",
                ukuran: "3.1 MB",
                tanggal: "21 Juli 2026",
                deskripsi: "Panduan lengkap selama mengikuti program magang.",
            },
            {
                id: 202,
                nama: "Panduan Penggunaan Dashboard.docx",
                tipe: "DOCX",
                ukuran: "845 KB",
                tanggal: "21 Juli 2026",
                deskripsi: "Panduan menggunakan dashboard peserta magang.",
            },
        ],
    },

    {
        id: 3,
        nama: "Materi Orientasi",
        deskripsi: "Materi pengenalan perusahaan, lingkungan kerja, dan budaya kerja.",
        files: [
            {
                id: 301,
                nama: "Pengenalan Perusahaan.pdf",
                tipe: "PDF",
                ukuran: "4.2 MB",
                tanggal: "22 Juli 2026",
                deskripsi: "Profil dan pengenalan lingkungan perusahaan.",
            },
            {
                id: 302,
                nama: "Budaya dan Etika Kerja.pptx",
                tipe: "PPTX",
                ukuran: "5.8 MB",
                tanggal: "22 Juli 2026",
                deskripsi: "Materi budaya dan etika yang diterapkan di perusahaan.",
            },
        ],
    },

    {
        id: 4,
        nama: "Materi Pelatihan",
        deskripsi: "Materi pembelajaran dan pelatihan yang diberikan oleh pembimbing.",
        files: [
            {
                id: 401,
                nama: "Dasar UI UX.pdf",
                tipe: "PDF",
                ukuran: "6.4 MB",
                tanggal: "23 Juli 2026",
                deskripsi: "Materi dasar mengenai UI/UX dan usability.",
            },
            {
                id: 402,
                nama: "Git dan GitHub.docx",
                tipe: "DOCX",
                ukuran: "1.7 MB",
                tanggal: "23 Juli 2026",
                deskripsi: "Materi penggunaan Git dan GitHub dalam pengembangan aplikasi.",
            },
            {
                id: 403,
                nama: "Materi Frontend.pptx",
                tipe: "PPTX",
                ukuran: "8.2 MB",
                tanggal: "24 Juli 2026",
                deskripsi: "Materi dasar pengembangan frontend.",
            },
        ],
    },

    {
        id: 5,
        nama: "Prosedur Kerja",
        deskripsi: "Dokumen mengenai prosedur dan alur kerja selama magang.",
        files: [
            {
                id: 501,
                nama: "Prosedur Kerja Divisi.pdf",
                tipe: "PDF",
                ukuran: "2.8 MB",
                tanggal: "24 Juli 2026",
                deskripsi: "Prosedur kerja yang berlaku pada divisi penempatan.",
            },
            {
                id: 502,
                nama: "Alur Pengajuan Pekerjaan.pdf",
                tipe: "PDF",
                ukuran: "1.5 MB",
                tanggal: "24 Juli 2026",
                deskripsi: "Alur pengajuan dan penyelesaian pekerjaan.",
            },
        ],
    },

    {
        id: 6,
        nama: "Template Jurnal",
        deskripsi: "Template yang digunakan untuk mencatat kegiatan harian magang.",
        files: [
            {
                id: 601,
                nama: "Template Jurnal Harian.docx",
                tipe: "DOCX",
                ukuran: "125 KB",
                tanggal: "25 Juli 2026",
                deskripsi: "Template jurnal kegiatan harian peserta magang.",
            },
            {
                id: 602,
                nama: "Template Jurnal.xlsx",
                tipe: "XLSX",
                ukuran: "84 KB",
                tanggal: "25 Juli 2026",
                deskripsi: "Template jurnal dalam format Excel.",
            },
        ],
    },

    {
        id: 7,
        nama: "Template Laporan",
        deskripsi: "Template yang digunakan untuk menyusun laporan akhir magang.",
        files: [
            {
                id: 701,
                nama: "Template Laporan Magang.docx",
                tipe: "DOCX",
                ukuran: "215 KB",
                tanggal: "25 Juli 2026",
                deskripsi: "Template laporan akhir kegiatan magang.",
            },
            {
                id: 702,
                nama: "Format Laporan Akhir.pdf",
                tipe: "PDF",
                ukuran: "1.1 MB",
                tanggal: "25 Juli 2026",
                deskripsi: "Panduan format penulisan laporan akhir.",
            },
        ],
    },

    {
        id: 8,
        nama: "Surat Penerimaan",
        deskripsi: "Dokumen resmi terkait penerimaan peserta magang.",
        files: [
            {
                id: 801,
                nama: "Surat Penerimaan Magang.pdf",
                tipe: "PDF",
                ukuran: "650 KB",
                tanggal: "19 Juli 2026",
                deskripsi: "Surat resmi penerimaan peserta magang.",
            },
        ],
    },
];

function getFileIcon(type: FileType) {
    if (type === "XLSX") {
        return <FileSpreadsheet size={20} />;
    }

    if (type === "PPTX") {
        return <Presentation size={20} />;
    }

    return <FileText size={20} />;
}

function getFileStyle(type: FileType) {
    switch (type) {
        case "PDF":
            return "bg-red-50 text-red-500";

        case "DOCX":
            return "bg-blue-50 text-blue-600";

        case "XLSX":
            return "bg-emerald-50 text-emerald-600";

        case "PPTX":
            return "bg-orange-50 text-orange-600";

        default:
            return "bg-neutral-50 text-neutral-600";
    }
}

export default function MateriPage() {
    const [openCategory, setOpenCategory] = useState<number | null>(1);
    const [search, setSearch] = useState("");

    const toggleCategory = (id: number) => {
        setOpenCategory((current) => (current === id ? null : id));
    };

    const filteredData = materiData
        .map((category) => ({
            ...category,
            files: category.files.filter((file) =>
                file.nama.toLowerCase().includes(search.toLowerCase())
            ),
        }))
        .filter(
            (category) =>
                category.files.length > 0 ||
                category.nama.toLowerCase().includes(search.toLowerCase())
        );

    return (
        <div className="min-h-screen bg-white p-6 md:p-8">

            <div className="mb-8">
                <div className="mb-1 flex items-center gap-2">
                    <FolderOpen
                        size={18}
                        className="text-neutral-900"
                    />

                    <p className="text-2xl font-semibold text-neutral-900">
                        Materi & Dokumen
                    </p>
                </div>

                <p className="mt-1 max-w-2xl text-sm text-neutral-500">
                    Akses berbagai materi, panduan, dan dokumen yang
                    diberikan oleh pembimbing selama kegiatan magang.
                </p>
            </div>

            <div className="mb-6">
                <div className="relative max-w-xl">
                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                    />

                    <input
                        type="text"
                        placeholder="Cari materi atau dokumen..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="
              w-full rounded-2xl
              border border-neutral-200
              bg-white
              py-3 pl-11 pr-4
              text-sm text-neutral-700
              outline-none
              transition
              placeholder:text-neutral-400
              focus:border-blue-400
              focus:ring-4
              focus:ring-blue-50
            "
                    />
                </div>
            </div>

            <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50/50 p-4">
                <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                        <FileText size={18} />
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-neutral-900">
                            Materi dari pembimbing
                        </p>

                        <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                            Dokumen dan materi di halaman ini dapat diperbarui
                            oleh pembimbing sesuai kebutuhan kegiatan magang.
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                {filteredData.map((category) => {
                    const isOpen = openCategory === category.id;

                    return (
                        <div key={category.id} className=" overflow-hidden rounded-2xl border border-neutral-200 bg-white transition">
                            <button
                                onClick={() => toggleCategory(category.id)}
                                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-neutral-50">
                                <div className="flex min-w-0 items-center gap-4">

                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        <FolderOpen size={20} />
                                    </div>

                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h2 className="text-sm font-semibold text-neutral-900">
                                                {category.nama}
                                            </h2>

                                            <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-medium text-neutral-500 ">
                                                {category.files.length} file
                                            </span>
                                        </div>

                                        <p className="mt-1 text-xs text-neutral-500">
                                            {category.deskripsi}
                                        </p>
                                    </div>
                                </div>

                                <ChevronDown
                                    size={19}
                                    className={`
                    shrink-0
                    text-neutral-400
                    transition-transform duration-200
                    ${isOpen ? "rotate-180" : ""}
                  `}
                                />
                            </button>

                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        initial={{
                                            height: 0,
                                            opacity: 0,
                                        }}
                                        animate={{
                                            height: "auto",
                                            opacity: 1,
                                        }}
                                        exit={{
                                            height: 0,
                                            opacity: 0,
                                        }}
                                        transition={{
                                            height: {
                                                duration: 0.3,
                                                ease: [0.4, 0, 0.2, 1],
                                            },
                                            opacity: {
                                                duration: 0.2,
                                            },
                                        }}
                                        className="overflow-hidden border-t border-neutral-100 bg-neutral-50/40"
                                    >
                                        <div className="px-4 py-4 md:px-5">
                                            <div className="space-y-2">
                                                {category.files.map((file) => (
                                                    <motion.div
                                                        key={file.id}
                                                        initial={{
                                                            opacity: 0,
                                                            y: -8,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            y: 0,
                                                        }}
                                                        exit={{
                                                            opacity: 0,
                                                            y: -8,
                                                        }}
                                                        transition={{
                                                            duration: 0.2,
                                                        }}
                                                        className="
                group
                flex flex-col gap-4
                rounded-2xl
                border border-neutral-200
                bg-white
                p-4
                transition
                hover:border-blue-100
                hover:shadow-sm
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
                                                    >
                                                        {/* FILE INFO */}
                                                        <div className="flex min-w-0 items-center gap-3">

                                                            <div
                                                                className={`
                    flex h-11 w-11 shrink-0
                    items-center justify-center
                    rounded-xl
                    ${getFileStyle(file.tipe)}
                  `}
                                                            >
                                                                {getFileIcon(file.tipe)}
                                                            </div>

                                                            <div className="min-w-0">
                                                                <h3 className="
                    truncate
                    text-sm
                    font-medium
                    text-neutral-800
                  ">
                                                                    {file.nama}
                                                                </h3>

                                                                <div className="
                    mt-1
                    flex flex-wrap
                    items-center gap-x-2 gap-y-1
                    text-[11px]
                    text-neutral-400
                  ">
                                                                    <span>{file.tipe}</span>
                                                                    <span>•</span>
                                                                    <span>{file.ukuran}</span>
                                                                    <span>•</span>
                                                                    <span>
                                                                        Upload {file.tanggal}
                                                                    </span>
                                                                </div>

                                                                {file.deskripsi && (
                                                                    <p className="
                      mt-1
                      hidden
                      text-xs
                      text-neutral-500
                      md:block
                    ">
                                                                        {file.deskripsi}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* ACTION */}
                                                        <div className="flex shrink-0 gap-2">

                                                            <button
                                                                onClick={() =>
                                                                    console.log("Lihat file:", file.nama)
                                                                }
                                                                className="
                    flex items-center
                    gap-2
                    rounded-full
                    border border-neutral-200
                    bg-white
                    px-4 py-2
                    text-xs
                    font-medium
                    text-neutral-600
                    transition
                    hover:border-blue-200
                    hover:bg-blue-50
                    hover:text-blue-600
                  "
                                                            >
                                                                <Eye size={15} />
                                                                Lihat
                                                            </button>

                                                            <button
                                                                onClick={() =>
                                                                    console.log("Download file:", file.nama)
                                                                }
                                                                className="
                    flex items-center
                    gap-2
                    rounded-full
                    bg-blue-600
                    px-4 py-2
                    text-xs
                    font-medium
                    text-white
                    transition
                    hover:bg-blue-700
                  "
                                                            >
                                                                <Download size={15} />
                                                                Download
                                                            </button>

                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>

            {filteredData.length === 0 && (
                <div className="
          flex min-h-[280px]
          flex-col items-center
          justify-center
          rounded-3xl
          border border-neutral-200
          bg-neutral-50
          px-6
          text-center
        ">
                    <div className="
            mb-4 flex h-14 w-14
            items-center justify-center
            rounded-full bg-white
            shadow-sm
          ">
                        <Search
                            size={24}
                            className="text-neutral-400"
                        />
                    </div>

                    <h3 className="text-sm font-semibold text-neutral-800">
                        Materi tidak ditemukan
                    </h3>

                    <p className="mt-1 max-w-sm text-xs text-neutral-500">
                        Coba gunakan kata kunci lain untuk mencari
                        materi atau dokumen.
                    </p>
                </div>
            )}

        </div>
    );
}