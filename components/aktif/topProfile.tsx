"use client";

import Image from "next/image";
import Link from "next/link";
import { Bell, ChevronDown, User } from "lucide-react";
import { useState } from "react";

export default function TopNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex h-[76px] flex-shrink-0 items-center justify-end border-b border-neutral-200 bg-white px-6 md:px-8">
      <div className="flex items-center gap-3">
        <Link
          href="/pengumuman"
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
          aria-label="Notifikasi"
        >
          <Bell size={20} />
        </Link>
        <div className="relative">

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 rounded-full border border-neutral-200 bg-white py-1.5 pl-1.5 pr-3 transition hover:bg-neutral-50"
          >
            <div className="h-9 w-9 overflow-hidden rounded-full bg-neutral-100">
              <Image
                src="/cartyWife.jpeg"
                width={40}
                height={40}
                alt="Foto profil Aldo Saputra"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-neutral-900">
                Aldo Saputra
              </p>

              <p className="text-[11px] text-neutral-500">
                Peserta Magang
              </p>
            </div>

            <ChevronDown
              size={16}
              className={`text-neutral-400 transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />

          </button>

          {open && (
            <>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="fixed inset-0 z-[-1] h-screen w-screen cursor-default"
                aria-label="Tutup menu"
              />

              <div className="absolute right-0 top-[52px] z-50 w-64 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl">

                <div className="border-b border-neutral-100 p-4">

                  <div className="flex items-center gap-3">

                    <div className="h-11 w-11 overflow-hidden rounded-full bg-neutral-100">
                      <Image
                        src="/cartyWife.jpeg"
                        width={50}
                        height={50}
                        alt="Foto profil"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-neutral-900">
                        Aldo Saputra
                      </p>

                      <p className="truncate text-xs text-neutral-500">
                        ASC124JU70JN
                      </p>
                    </div>

                  </div>

                </div>

                <div className="p-2">

                  <Link
                    href="/aktif/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
                  >

                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <User size={16} />
                    </span>

                    Lihat Profil

                  </Link>

                </div>

              </div>
            </>
          )}

        </div>

      </div>

    </header>
  );
}