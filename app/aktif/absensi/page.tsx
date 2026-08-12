"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import {
  Camera,
  Check,
  Clock,
  FileText,
  MapPin,
  X,
  Navigation,
  ShieldCheck,
} from "lucide-react";

const LocationMap = dynamic(
  () => import("@/components/aktif/map/locationMap"),
  {
    ssr: false,
    loading: () => (
      <div className="mt-4 flex h-52 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50">
        <div className="text-center">
          <MapPin
            size={24}
            className="mx-auto mb-2 animate-pulse text-blue-500"
          />

          <p className="text-xs text-neutral-500">
            Memuat peta...
          </p>
        </div>
      </div>
    ),
  }
);

type StatusAbsensi =
  | "Hadir"
  | "Terlambat"
  | "Izin"
  | "Sakit"
  | "Tidak hadir";

type Riwayat = {
  tanggal: string;
  masuk: string;
  pulang: string;
  durasi: string;
  status: StatusAbsensi;
  catatan: string;
};

type ModalType = "absensi" | "izin" | null;

const riwayatAwal: Riwayat[] = [
  {
    tanggal: "01/07/2026",
    masuk: "08:00",
    pulang: "15:00",
    durasi: "7j 0m",
    status: "Hadir",
    catatan: "-",
  },
  {
    tanggal: "02/07/2026",
    masuk: "08:15",
    pulang: "15:00",
    durasi: "6j 45m",
    status: "Terlambat",
    catatan: "-",
  },
  {
    tanggal: "03/07/2026",
    masuk: "08:00",
    pulang: "15:00",
    durasi: "7j 0m",
    status: "Hadir",
    catatan: "-",
  },
  {
    tanggal: "04/07/2026",
    masuk: "-",
    pulang: "-",
    durasi: "-",
    status: "Izin",
    catatan: "Acara keluarga",
  },
  {
    tanggal: "07/07/2026",
    masuk: "08:00",
    pulang: "15:00",
    durasi: "7j 0m",
    status: "Hadir",
    catatan: "-",
  },
  {
    tanggal: "08/07/2026",
    masuk: "-",
    pulang: "-",
    durasi: "-",
    status: "Sakit",
    catatan: "Demam",
  },
];

const statusStyle: Record<StatusAbsensi, string> = {
  Hadir: "bg-emerald-100 text-emerald-700",
  Terlambat: "bg-amber-100 text-amber-700",
  Izin: "bg-blue-100 text-blue-700",
  Sakit: "bg-orange-100 text-orange-700",
  "Tidak hadir": "bg-red-100 text-red-700",
};

export default function AbsensiPage() {
  const [jamMasuk, setJamMasuk] = useState<string | null>(null);
  const [jamPulang, setJamPulang] = useState<string | null>(null);

  const [modal, setModal] =
    useState<ModalType>(null);

  const [jenisIzin, setJenisIzin] =
    useState<"Izin" | "Sakit">("Izin");

  const [alasan, setAlasan] = useState("");

  const [fotoIzin, setFotoIzin] =
    useState<File | null>(null);

  const [lokasi, setLokasi] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [lokasiLoading, setLokasiLoading] =
    useState(false);

  const [lokasiError, setLokasiError] =
    useState("");

  const [riwayat, setRiwayat] =
    useState<Riwayat[]>(riwayatAwal);

  const tanggalHariIni = useMemo(() => {
    return new Date().toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, []);

  const statusHariIni = useMemo(() => {
    if (!jamMasuk) {
      return "belum-masuk";
    }

    if (jamMasuk && !jamPulang) {
      return "sudah-masuk";
    }

    return "selesai";
  }, [jamMasuk, jamPulang]);

  const jamSekarang = () => {
    return new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleAmbilLokasi = () => {
    if (!navigator.geolocation) {
      setLokasiError(
        "Browser kamu tidak mendukung fitur lokasi."
      );

      return;
    }

    setLokasiLoading(true);
    setLokasiError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {
          latitude,
          longitude,
        } = position.coords;

        setLokasi({
          latitude,
          longitude,
        });

        setLokasiLoading(false);
      },

      (error) => {
        setLokasiLoading(false);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLokasiError(
              "Izin lokasi ditolak. Silakan izinkan akses lokasi dari browser."
            );
            break;

          case error.POSITION_UNAVAILABLE:
            setLokasiError(
              "Lokasi tidak tersedia. Pastikan GPS atau Location Service aktif."
            );
            break;

          case error.TIMEOUT:
            setLokasiError(
              "Pengambilan lokasi terlalu lama. Silakan coba lagi."
            );
            break;

          default:
            setLokasiError(
              "Gagal mendapatkan lokasi."
            );
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleKonfirmasiAbsensi = () => {
    if (statusHariIni === "belum-masuk") {
      if (!lokasi) {
        setLokasiError(
          "Lokasi wajib diambil sebelum melakukan absen masuk."
        );

        return;
      }

      const waktu = jamSekarang();

      setJamMasuk(waktu);
      setModal(null);

      return;
    }

    if (statusHariIni === "sudah-masuk") {
      const waktu = jamSekarang();

      setJamPulang(waktu);
      setModal(null);

      return;
    }
  };

  const handleFotoIzin = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile =
      event.target.files?.[0];

    if (!selectedFile) return;

    setFotoIzin(selectedFile);
  };

  const handleAjukanIzin = () => {
    if (!alasan.trim()) return;

    const newData: Riwayat = {
      tanggal:
        new Date().toLocaleDateString("id-ID"),
      masuk: "-",
      pulang: "-",
      durasi: "-",
      status: jenisIzin,
      catatan: fotoIzin
        ? `${alasan} • Lampiran: ${fotoIzin.name}`
        : alasan,
    };

    setRiwayat((prev) => [
      newData,
      ...prev,
    ]);

    setAlasan("");
    setFotoIzin(null);
    setModal(null);
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-8">

      <div className="mb-8">

        <h1 className="text-2xl font-semibold text-neutral-900">
          Kehadiran Hari Ini
        </h1>

        <p className="mt-1 text-sm text-neutral-500">
          {tanggalHariIni}
        </p>

      </div>

      <div className="mb-8 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm md:p-7">

        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">

          <div>

            <p className="text-sm text-neutral-500">
              Status absensi hari ini
            </p>

            <h2 className="mt-1 text-xl font-semibold text-neutral-900">

              {statusHariIni ===
                "belum-masuk" &&
                "Belum melakukan absensi"}

              {statusHariIni ===
                "sudah-masuk" &&
                "Sudah melakukan absensi masuk"}

              {statusHariIni ===
                "selesai" &&
                "Absensi hari ini selesai"}

            </h2>

          </div>

          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full ${
              statusHariIni === "selesai"
                ? "bg-emerald-100 text-emerald-600"
                : "bg-blue-100 text-blue-600"
            }`}
          >

            {statusHariIni === "selesai" ? (
              <Check size={22} />
            ) : (
              <Clock size={22} />
            )}

          </div>

        </div>

        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">

          <div className="rounded-2xl bg-neutral-50 p-4">

            <p className="text-xs text-neutral-500">
              Jam masuk
            </p>

            <p className="mt-1 text-lg font-semibold text-neutral-900">
              {jamMasuk || "--:--"}
            </p>

          </div>

          <div className="rounded-2xl bg-neutral-50 p-4">

            <p className="text-xs text-neutral-500">
              Jam pulang
            </p>

            <p className="mt-1 text-lg font-semibold text-neutral-900">
              {jamPulang || "--:--"}
            </p>

          </div>

        </div>

        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/50 p-4">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <MapPin size={19} />
          </div>

          <div>

            <p className="text-sm font-medium text-neutral-800">
              Verifikasi lokasi
            </p>

            <p className="mt-1 text-xs leading-relaxed text-neutral-500">
              Lokasi wajib digunakan saat absen
              masuk, pastikan lokasi kamu sudah
              menyala.
            </p>

          </div>

        </div>

        <div className="flex flex-wrap gap-3">

          {statusHariIni !== "selesai" && (
            <button
              onClick={() => {
                setLokasiError("");
                setModal("absensi");
              }}
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              {statusHariIni ===
              "belum-masuk"
                ? "Absen Masuk"
                : "Absen Pulang"}
            </button>
          )}

          <button
            onClick={() =>
              setModal("izin")
            }
            className="rounded-full border border-neutral-200 bg-white px-6 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
          >
            Ajukan Izin / Sakit
          </button>

        </div>

      </div>

      <div>

        <div className="mb-4">

          <h2 className="text-xl font-semibold text-neutral-900">
            Riwayat Absensi
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Riwayat kehadiran dan pengajuan
            izin kamu.
          </p>

        </div>

        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">

          <div className="hidden grid-cols-6 gap-4 border-b border-neutral-200 bg-neutral-50 px-5 py-3 text-xs font-semibold text-neutral-500 md:grid">

            <span>Tanggal</span>
            <span>Masuk</span>
            <span>Pulang</span>
            <span>Durasi</span>
            <span>Status</span>
            <span>Catatan</span>

          </div>

          {riwayat.map(
            (row, index) => (
              <div
                key={index}
                className="grid grid-cols-2 gap-3 border-b border-neutral-100 px-5 py-4 text-sm transition-colors last:border-0 hover:bg-blue-50/40 md:grid-cols-6 md:items-center md:gap-4"
              >

                <div>

                  <p className="text-xs text-neutral-400 md:hidden">
                    Tanggal
                  </p>

                  <p className="font-medium text-neutral-800">
                    {row.tanggal}
                  </p>

                </div>

                <div>

                  <p className="text-xs text-neutral-400 md:hidden">
                    Masuk
                  </p>

                  <p
                    className={`font-medium ${
                      row.masuk === "-"
                        ? "text-neutral-400"
                        : "text-neutral-600"
                    }`}
                  >
                    {row.masuk}
                  </p>

                </div>

                <div>

                  <p className="text-xs text-neutral-400 md:hidden">
                    Pulang
                  </p>

                  <p
                    className={`font-medium ${
                      row.pulang === "-"
                        ? "text-neutral-400"
                        : "text-neutral-600"
                    }`}
                  >
                    {row.pulang}
                  </p>

                </div>

                <div>

                  <p className="text-xs text-neutral-400 md:hidden">
                    Durasi
                  </p>

                  <p
                    className={`font-medium ${
                      row.durasi === "-"
                        ? "text-neutral-400"
                        : "text-neutral-600"
                    }`}
                  >
                    {row.durasi}
                  </p>

                </div>

                <div>

                  <p className="mb-1 text-xs text-neutral-400 md:hidden">
                    Status
                  </p>

                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusStyle[row.status]}`}
                  >
                    {row.status}
                  </span>

                </div>

                <div>

                  <p className="text-xs text-neutral-400 md:hidden">
                    Catatan
                  </p>

                  <p
                    className={`truncate ${
                      row.catatan === "-"
                        ? "text-neutral-400"
                        : "text-neutral-600"
                    }`}
                  >
                    {row.catatan}
                  </p>

                </div>

              </div>
            )
          )}

        </div>

      </div>

      {modal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">

          <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl">

            <button
              onClick={() =>
                setModal(null)
              }
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 transition hover:bg-neutral-200"
            >
              <X size={18} />
            </button>

            {modal === "absensi" && (

              <>

                <div className="mb-6 pr-10">

                  <p className="text-sm font-medium text-blue-600">
                    VERIFIKASI ABSENSI
                  </p>

                  <h2 className="mt-1 text-xl font-semibold text-neutral-900">

                    {statusHariIni ===
                    "belum-masuk"
                      ? "Absen Masuk"
                      : "Absen Pulang"}

                  </h2>

                  <p className="mt-1 text-sm leading-relaxed text-neutral-500">

                    {statusHariIni ===
                    "belum-masuk"
                      ? "Lokasi wajib diambil untuk melakukan absensi masuk."
                      : "Absensi pulang tidak membutuhkan verifikasi lokasi."}

                  </p>

                </div>

                {statusHariIni ===
                  "belum-masuk" && (

                  <div>

                    <div
                      className={`rounded-2xl border p-5 ${
                        lokasi
                          ? "border-emerald-200 bg-emerald-50/60"
                          : "border-neutral-200 bg-neutral-50"
                      }`}
                    >

                      <div className="flex items-start gap-4">

                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                            lokasi
                              ? "bg-emerald-100 text-emerald-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >

                          {lokasi ? (
                            <ShieldCheck
                              size={21}
                            />
                          ) : (
                            <MapPin
                              size={21}
                            />
                          )}

                        </div>

                        <div className="min-w-0">

                          <p className="text-sm font-semibold text-neutral-900">

                            {lokasi
                              ? "Lokasi berhasil diperoleh"
                              : "Lokasi belum diperoleh"}

                          </p>

                          <p className="mt-1 text-xs leading-relaxed text-neutral-500">

                            {lokasi
                              ? "Lokasi kamu siap digunakan untuk verifikasi absensi masuk."
                              : "Tekan tombol di bawah untuk mengambil lokasi saat ini."}

                          </p>

                        </div>

                      </div>

                      {lokasi && (

                        <LocationMap
                          latitude={
                            lokasi.latitude
                          }
                          longitude={
                            lokasi.longitude
                          }
                        />

                      )}

                      <button
                        onClick={
                          handleAmbilLokasi
                        }
                        disabled={
                          lokasiLoading
                        }
                        className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold transition ${
                          lokasi
                            ? "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        } disabled:cursor-not-allowed disabled:opacity-50`}
                      >

                        <Navigation
                          size={16}
                          className={
                            lokasiLoading
                              ? "animate-pulse"
                              : ""
                          }
                        />

                        {lokasiLoading
                          ? "Mengambil lokasi..."
                          : lokasi
                            ? "Ambil Ulang Lokasi"
                            : "Ambil Lokasi"}

                      </button>

                    </div>

                    {lokasiError && (

                      <div className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-xs leading-relaxed text-red-600">
                        {lokasiError}
                      </div>

                    )}

                    <button
                      onClick={
                        handleKonfirmasiAbsensi
                      }
                      disabled={!lokasi}
                      className="mt-5 w-full rounded-full bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Konfirmasi Absen Masuk
                    </button>

                  </div>

                )}


                {statusHariIni ===
                  "sudah-masuk" && (

                  <div>

                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">

                      <div className="flex items-start gap-4">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                          <Check size={21} />
                        </div>

                        <div>

                          <p className="text-sm font-semibold text-neutral-900">
                            Absensi masuk sudah
                            tercatat
                          </p>

                          <p className="mt-1 text-xs leading-relaxed text-neutral-500">

                            Kamu masuk pada pukul{" "}

                            <span className="font-medium text-neutral-700">
                              {jamMasuk}
                            </span>

                            .

                          </p>

                        </div>

                      </div>

                    </div>

                    <div className="mt-4 rounded-2xl bg-neutral-50 p-4">

                      <div className="flex items-start gap-3">

                        <Clock
                          size={18}
                          className="mt-0.5 shrink-0 text-blue-600"
                        />

                        <div>

                          <p className="text-sm font-medium text-neutral-800">
                            Absen pulang
                          </p>

                          <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                            Absen pulang tidak
                            membutuhkan lokasi.
                          </p>

                        </div>

                      </div>

                    </div>

                    <button
                      onClick={
                        handleKonfirmasiAbsensi
                      }
                      className="mt-5 w-full rounded-full bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      Konfirmasi Absen Pulang
                    </button>

                  </div>

                )}

              </>

            )}

            {modal === "izin" && (

              <>

                <div className="mb-6 pr-10">

                  <p className="text-sm font-medium text-blue-600">
                    PENGAJUAN ABSENSI
                  </p>

                  <h2 className="mt-1 text-xl font-semibold text-neutral-900">
                    Izin / Sakit
                  </h2>

                  <p className="mt-1 text-sm leading-relaxed text-neutral-500">
                    Sampaikan alasan ketidakhadiran
                    kamu kepada pembimbing.
                  </p>

                </div>

                <div className="mb-5">

                  <p className="mb-2 text-xs font-medium text-neutral-500">
                    Jenis pengajuan
                  </p>

                  <div className="flex gap-2">

                    {(
                      ["Izin", "Sakit"] as const
                    ).map((jenis) => (

                      <button
                        key={jenis}
                        onClick={() =>
                          setJenisIzin(
                            jenis
                          )
                        }
                        className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                          jenisIzin === jenis
                            ? "bg-blue-600 text-white"
                            : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                        }`}
                      >
                        {jenis}
                      </button>

                    ))}

                  </div>

                </div>

                <div className="mb-5">

                  <label className="mb-2 block text-sm font-medium text-neutral-800">
                    Alasan
                  </label>

                  <textarea
                    value={alasan}
                    onChange={(e) =>
                      setAlasan(
                        e.target.value
                      )
                    }
                    placeholder="Tuliskan alasan ketidakhadiran..."
                    rows={5}
                    className="w-full resize-none rounded-2xl border border-neutral-200 bg-white p-4 text-sm text-neutral-700 outline-none transition placeholder:text-neutral-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />

                </div>
                <div>

                  <div className="mb-2 flex items-center justify-between">

                    <label className="text-sm font-medium text-neutral-800">
                      Lampiran foto
                    </label>

                    <span className="text-[11px] text-neutral-400">
                      Opsional
                    </span>

                  </div>

                  {!fotoIzin ? (

                    <label
                      htmlFor="foto-izin"
                      className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 p-4 transition hover:border-blue-300 hover:bg-blue-50/40"
                    >

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                        <Camera size={19} />
                      </div>

                      <div>

                        <p className="text-sm font-medium text-neutral-800">
                          Tambahkan foto
                        </p>

                        <p className="mt-1 text-xs text-neutral-400">
                          Foto surat atau bukti
                          pendukung jika diperlukan.
                        </p>

                      </div>

                      <input
                        id="foto-izin"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={
                          handleFotoIzin
                        }
                      />

                    </label>

                  ) : (

                    <div className="flex items-center justify-between gap-3 rounded-2xl border border-blue-100 bg-blue-50/50 p-4">

                      <div className="flex min-w-0 items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                          <FileText size={18} />
                        </div>

                        <div className="min-w-0">

                          <p className="truncate text-sm font-medium text-neutral-800">
                            {fotoIzin.name}
                          </p>

                          <p className="mt-1 text-xs text-neutral-400">

                            {(
                              fotoIzin.size /
                              1024 /
                              1024
                            ).toFixed(2)}{" "}
                            MB

                          </p>

                        </div>

                      </div>

                      <button
                        onClick={() =>
                          setFotoIzin(null)
                        }
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-neutral-400 transition hover:bg-red-50 hover:text-red-500"
                      >
                        <X size={15} />
                      </button>

                    </div>

                  )}

                </div>

                <button
                  onClick={
                    handleAjukanIzin
                  }
                  disabled={!alasan.trim()}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                >

                  <FileText size={17} />

                  Kirim Pengajuan

                </button>

              </>

            )}

          </div>

        </div>

      )}

    </div>
  );
}