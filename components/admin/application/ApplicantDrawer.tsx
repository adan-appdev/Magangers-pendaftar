"use client";

import type { Applicant } from "@/types/applicant";
import { X, FileText } from "lucide-react";

type AdminDoc = {
  jenis: string;
  url: string | null;
  path: string;
  mime_type: string | null;
  size: number | null;
  uploaded_at: string;
};

function jenisLabel(jenis: string) {
  const map: Record<string, string> = {
    kartuPelajar: "Kartu Pelajar / Mahasiswa",
    ktp: "KTP / KK",
    cv: "Curriculum Vitae",
    suratPengantar: "Surat Pengantar",
    pasFoto: "Pas Foto",
  };
  return map[jenis] ?? jenis;
}

function formatBytes(bytes?: number | null) {
  if (!bytes || bytes <= 0) return "-";
  const units = ["B", "KB", "MB", "GB"];
  let n = bytes;
  let i = 0;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i++;
  }
  return `${n.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

export default function ApplicantDrawer({
  open,
  onClose,
  applicant,
  onAccept,
  onReject,
  onRevision,
  docs,
  docsLoading,
  docsError,
}: {
  open: boolean;
  onClose: () => void;
  applicant: Applicant | null;
  onAccept: () => void;
  onReject: () => void;
  onRevision: () => void;
  docs: AdminDoc[];
  docsLoading: boolean;
  docsError: string | null;
}) {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <h2 className="text-lg font-bold">Detail Pelamar</h2>
            <p className="text-sm text-gray-500">Periksa data & dokumen</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-gray-100">
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[calc(100vh-140px)] overflow-y-auto p-5 space-y-6">
          {/* DATA */}
          <div className="rounded-2xl border p-4">
            <div className="text-sm text-gray-500">Nama</div>
            <div className="font-semibold">{applicant?.nama ?? "-"}</div>

            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-gray-500">Email</div>
                <div className="font-medium break-all">{applicant?.email ?? "-"}</div>
              </div>
              <div>
                <div className="text-gray-500">No HP</div>
                <div className="font-medium">{applicant?.nohp ?? "-"}</div>
              </div>
              <div>
                <div className="text-gray-500">Sekolah</div>
                <div className="font-medium">{applicant?.sekolah ?? "-"}</div>
              </div>
              <div>
                <div className="text-gray-500">Jurusan</div>
                <div className="font-medium">{applicant?.jurusan ?? "-"}</div>
              </div>
              <div className="col-span-2">
                <div className="text-gray-500">Alamat</div>
                <div className="font-medium">{applicant?.alamat ?? "-"}</div>
              </div>
              <div>
                <div className="text-gray-500">Posisi</div>
                <div className="font-medium">{applicant?.posisi ?? "-"}</div>
              </div>
              <div>
                <div className="text-gray-500">Status</div>
                <div className="font-medium">{applicant?.status ?? "-"}</div>
              </div>
            </div>

            {applicant?.catatan ? (
              <div className="mt-3 text-sm">
                <div className="text-gray-500">Catatan pelamar</div>
                <div className="mt-1 rounded-xl bg-gray-50 p-3">{applicant.catatan}</div>
              </div>
            ) : null}
          </div>

          {/* DOKUMEN */}
          <div className="rounded-2xl border p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Dokumen</h3>
              {docsLoading ? <span className="text-xs text-gray-500">Loading...</span> : null}
            </div>

            {docsError ? (
              <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {docsError}
              </div>
            ) : null}

            {!docsLoading && !docsError && (
              <div className="mt-3 space-y-2">
                {docs.length === 0 ? (
                  <div className="text-sm text-gray-500">Belum ada dokumen.</div>
                ) : (
                  docs.map((d) => (
                    <div key={d.jenis} className="flex items-center justify-between gap-3 rounded-xl bg-gray-50 p-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <FileText size={16} className="text-gray-600" />
                          <div className="truncate font-medium">{jenisLabel(d.jenis)}</div>
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          {formatBytes(d.size)} {d.mime_type ? `• ${d.mime_type}` : ""}
                        </div>
                      </div>

                      {d.url ? (
                        <a
                          href={d.url}
                          target="_blank"
                          rel="noreferrer"
                          className="shrink-0 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                        >
                          Lihat / Unduh
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400">-</span>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="border-t p-4 flex gap-2">
          <button
            onClick={onReject}
            className="flex-1 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-100"
          >
            Tolak
          </button>
          <button
            onClick={onRevision}
            className="flex-1 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm font-semibold text-amber-700 hover:bg-amber-100"
          >
            Revisi
          </button>
          <button
            onClick={onAccept}
            className="flex-1 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Terima
          </button>
        </div>
      </div>
    </>
  );
}