"use client";

import {
  X,
  CalendarDays,
  Users,
  Bell,
  FileText,
  Download,
  Pencil,
  Send,
} from "lucide-react";

import { Announcement } from "@/app/admin/pengumuman/page";

interface Props {
  open: boolean;
  onClose: () => void;

  announcement: Announcement | null;

  onEdit: (
    announcement: Announcement
  ) => void;

  onPublish: (
    announcement: Announcement
  ) => void;
}

export default function AnnouncementDrawer({
  open,
  onClose,
  announcement,
  onEdit,
  onPublish,
}: Props) {
  if (!open || !announcement) {
    return null;
  }

  function handleDownload() {
    if (!announcement?.attachment) return;

    const link =
      document.createElement("a");

    link.href =
      announcement.attachment.url;

    link.download =
      announcement.attachment.name;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  }

  return (
    <>
      {/* OVERLAY */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/30"
      />

      {/* DRAWER */}

      <div className="fixed right-0 top-0 z-50 h-screen w-full max-w-xl overflow-y-auto bg-white shadow-2xl">

        {/* HEADER */}

        <div className="flex items-center justify-between border-b px-6 py-5">

          <div>

            <h2 className="text-2xl font-bold">
              Detail Pengumuman
            </h2>

            <p className="mt-1 text-gray-500">
              Informasi lengkap pengumuman.
            </p>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={22} />
          </button>

        </div>

        {/* BODY */}

        <div className="space-y-6 p-6">

          {/* STATUS + TITLE */}

          <div>

            <StatusBadge
              status={announcement.status}
            />

            <h1 className="mt-4 text-3xl font-bold">
              {announcement.judul}
            </h1>

          </div>

          {/* ISI */}

          <div className="rounded-xl border border-gray-200 p-5">

            <h3 className="mb-4 font-semibold">
              Isi Pengumuman
            </h3>

            <p className="whitespace-pre-line leading-7 text-gray-600">
              {announcement.isi}
            </p>

          </div>

          {/* INFORMASI */}

          <div className="rounded-xl border border-gray-200">

            <div className="border-b px-5 py-4 font-semibold">
              Informasi
            </div>

            <div className="space-y-5 p-5">

              <InfoItem
                icon={
                  <CalendarDays size={18} />
                }
                title="Tanggal"
                value={
                  announcement.tanggal
                }
              />

              <InfoItem
                icon={
                  <Users size={18} />
                }
                title="Target"
                value={
                  announcement.target
                }
              />

              <InfoItem
                icon={
                  <Bell size={18} />
                }
                title="Status"
                value={
                  announcement.status
                }
              />

              <InfoItem
                icon={
                  <FileText size={18} />
                }
                title="Lampiran"
                value={
                  announcement.attachment
                    ? announcement.attachment.name
                    : "Belum ada lampiran"
                }
              />

            </div>

          </div>

          {/* LAMPIRAN */}

          {announcement.attachment && (
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">

              <div className="flex items-center justify-between gap-4">

                <div className="flex min-w-0 items-center gap-3">

                  <div className="rounded-lg bg-white p-3 text-blue-600">
                    <FileText size={22} />
                  </div>

                  <div className="min-w-0">

                    <p className="font-medium text-blue-900">
                      Lampiran
                    </p>

                    <p className="truncate text-sm text-blue-700">
                      {announcement.attachment.name}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {(
                        announcement.attachment
                          .size / 1024
                      ).toFixed(1)}{" "}
                      KB
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  <Download size={16} />
                  Download
                </button>

              </div>

            </div>
          )}

          {/* RIWAYAT */}

          <div className="rounded-xl border border-gray-200 p-5">

            <h3 className="mb-5 font-semibold">
              Riwayat Publikasi
            </h3>

            <div className="space-y-4">

              <TimelineItem
                title="Pengumuman dibuat"
                date={
                  announcement.tanggal
                }
              />

              {announcement.status ===
                "Dipublikasikan" ? (
                <TimelineItem
                  title="Pengumuman dipublikasikan"
                  date={
                    announcement.tanggal
                  }
                />
              ) : (
                <TimelineItem
                  title="Menunggu publikasi"
                  date="-"
                />
              )}

            </div>

          </div>

        </div>

        {/* FOOTER */}

        <div className="sticky bottom-0 flex gap-3 border-t bg-white p-6">

          {/* EDIT */}

          <button
            type="button"
            onClick={() =>
              onEdit(announcement)
            }
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-yellow-500 py-3 font-medium text-yellow-600 hover:bg-yellow-50"
          >
            <Pencil size={18} />
            Edit
          </button>

          {/* PUBLISH */}

          {announcement.status !==
            "Dipublikasikan" && (
            <button
              type="button"
              onClick={() => {
                onPublish(
                  announcement
                );
              }}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-medium text-white hover:bg-blue-700"
            >
              <Send size={18} />
              Publikasikan
            </button>
          )}

        </div>

      </div>
    </>
  );
}

/*
 * ============================
 * INFO ITEM
 * ============================
 */

function InfoItem({
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

/*
 * ============================
 * TIMELINE
 * ============================
 */

function TimelineItem({
  title,
  date,
}: {
  title: string;
  date: string;
}) {
  return (
    <div className="flex gap-4">

      <div className="mt-2 h-3 w-3 shrink-0 rounded-full bg-blue-600" />

      <div>

        <p className="font-medium">
          {title}
        </p>

        <p className="text-sm text-gray-500">
          {date}
        </p>

      </div>

    </div>
  );
}

/*
 * ============================
 * STATUS BADGE
 * ============================
 */

function StatusBadge({
  status,
}: {
  status: string;
}) {
  let color =
    "bg-gray-100 text-gray-700";

  if (status === "Dipublikasikan") {
    color =
      "bg-green-100 text-green-700";
  }

  if (status === "Draft") {
    color =
      "bg-yellow-100 text-yellow-700";
  }

  if (status === "Terjadwal") {
    color =
      "bg-blue-100 text-blue-700";
  }

  return (
    <span
      className={`inline-block rounded-full px-4 py-2 text-sm font-semibold ${color}`}
    >
      {status}
    </span>
  );
}