"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { useOutsideClick } from "@/hooks/use-outside-click";
import { GlowingEffect } from "@/components/aktif/ui/glowing-effect";

type Announcement = {
  id: number;
  title: string;
  date: string;
  category: string;
  image: string;
  description: string;
};

const announcements: Announcement[] = [
  {
    id: 1,
    title: "Pengumuman Jadwal Magang",
    date: "26 Juli 2026",
    category: "Informasi",
    image: "/pengumuman.jpg",
    description:
      "Berikut adalah informasi terbaru mengenai jadwal kegiatan magang. Peserta diharapkan memperhatikan jadwal masuk, jam kerja, serta ketentuan yang berlaku selama kegiatan magang.",
  },
  {
    id: 2,
    title: "Pembekalan Peserta Magang",
    date: "24 Juli 2026",
    category: "Kegiatan",
    image: "/pengajuan.jpg",
    description:
      "Pembekalan peserta magang akan dilaksanakan sebelum kegiatan dimulai. Materi pembekalan mencakup tata tertib, budaya kerja, keselamatan kerja, serta panduan selama berada di perusahaan.",
  },
  {
    id: 3,
    title: "Pengumpulan Jurnal Mingguan",
    date: "22 Juli 2026",
    category: "Penting",
    image: "/sertifikat.webp",
    description:
      "Peserta diwajibkan mengumpulkan jurnal kegiatan magang setiap minggu. Pastikan seluruh kegiatan telah dicatat dengan lengkap dan mendapatkan validasi dari pembimbing.",
  },
];

export default function Pengumuman() {
  const [active, setActive] = useState<Announcement | null>(null);

  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => {
    setActive(null);
  });

  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section className="relative min-h-screen w-full bg-[#F8FAFC] px-6 py-10 md:px-8 lg:px-10">

      <div className="mb-10">

        <h1 className="text-2xl font-bold tracking-tight text-[#1E293B] md:text-2xl">
          Informasi & Pengumuman Magang
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-6 text-[#64748B] md:text-base">
          Temukan informasi terbaru mengenai kegiatan, jadwal, dan
          pemberitahuan selama masa magang.
        </p>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <div className="relative z-50 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {announcements.map((announcement) => (
          <motion.div
            key={announcement.id}
            layoutId={`announcement-${announcement.id}`}
            onClick={() => setActive(announcement)}
            whileHover={{
              y: -6,
            }}
            transition={{
              duration: 0.25,
            }}
            className="group relative cursor-pointer rounded-3xl"
          >

            <GlowingEffect disabled={false} spread={30} borderWidth={1.5} proximity={60} inactiveZone={0.6} />

            <div
              className=" relative z-10 overflow-hidden rounded-3xl border border-[#E6EAF0] bg-gray-100 shadow-[0_4px_20px_rgba(15,23,42,0.05)] transition-shadow duration-300 group-hover:shadow-[0_12px_30px_rgba(37,99,235,0.10)] " >

              <motion.div layoutId={`image-${announcement.id}`} className="relative h-48 w-full overflow-hidden">
                <img src={announcement.image} alt={announcement.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"/>

                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                <div className="absolute left-4 top-4">
                  <span
                    className="
                      inline-flex
                      rounded-full
                      border
                      border-white/70
                      bg-white/90
                      px-3
                      py-1.5
                      text-xs
                      font-semibold
                      text-[#334155]
                      shadow-sm
                      backdrop-blur-md
                    "
                  >
                    {announcement.category}
                  </span>
                </div>
              </motion.div>

              <div className="p-5">

                <motion.p
                  layoutId={`date-${announcement.id}`}
                  className="mb-2 text-xs font-medium text-[#94A3B8]"
                >
                  {announcement.date}
                </motion.p>

                <motion.h2
                  layoutId={`title-${announcement.id}`}
                  className="
                    text-lg
                    font-bold
                    leading-snug
                    text-[#1E293B]
                  "
                >
                  {announcement.title}
                </motion.h2>

                <p
                  className="
                    mt-2
                    line-clamp-2
                    text-sm
                    leading-6
                    text-[#64748B]
                  "
                >
                  {announcement.description}
                </p>

                <div className="mt-6 flex items-center justify-between">

                  <span
                    className="
                      text-sm
                      font-semibold
                      text-[#2563EB]
                      transition-colors
                    "
                  >
                    Baca selengkapnya
                  </span>

                  <span
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      bg-[#EFF6FF]
                      text-[#2563EB]
                      transition-all
                      duration-300
                      group-hover:bg-[#2563EB]
                      group-hover:text-white
                    "
                  >
                    →
                  </span>

                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">

            <motion.div
              ref={ref}
              layoutId={`announcement-${active.id}`}
              className="
                relative
                max-h-[90vh]
                w-full
                max-w-2xl
                overflow-y-auto
                rounded-3xl
                border
                border-[#E6EAF0]
                bg-gray-100
                shadow-[0_25px_70px_rgba(15,23,42,0.18)]
                [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden
              "
            >

              <button
                onClick={() => setActive(null)}
                aria-label="Tutup pengumuman"
                className="
                  absolute
                  right-4
                  top-4
                  z-20
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/80
                  bg-white/90
                  text-xl
                  font-medium
                  text-[#475569]
                  shadow-md
                  backdrop-blur-md
                  transition-all
                  duration-200
                  hover:bg-white
                  hover:text-[#1E293B]
                  hover:shadow-lg
                "
              >
                x
              </button>

              <motion.div
                layoutId={`image-${active.id}`}
                className="relative h-64 w-full overflow-hidden md:h-80"
              >
                <img
                  src={active.image}
                  alt={active.title}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-6">
                  <span
                    className="
                      rounded-full
                      border
                      border-white/70
                      bg-white/90
                      px-3
                      py-1.5
                      text-xs
                      font-semibold
                      text-[#334155]
                      shadow-sm
                      backdrop-blur-md
                    "
                  >
                    {active.category}
                  </span>
                </div>
              </motion.div>

              <div className="p-6 md:p-8">

                <motion.p
                  layoutId={`date-${active.id}`}
                  className="mb-2 text-sm font-medium text-[#94A3B8]"
                >
                  {active.date}
                </motion.p>

                <motion.h2
                  layoutId={`title-${active.id}`}
                  className="
                    text-2xl
                    font-bold
                    leading-tight
                    text-[#1E293B]
                    md:text-3xl
                  "
                >
                  {active.title}
                </motion.h2>

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.15,
                  }}
                  className="
                    mt-6
                    space-y-4
                    text-sm
                    leading-7
                    text-[#64748B]
                  "
                >
                  <p>{active.description}</p>

                  <p>
                    Pastikan seluruh peserta membaca informasi ini dengan
                    seksama. Apabila terdapat pertanyaan lebih lanjut,
                    silakan menghubungi pembimbing atau pihak yang
                    bertanggung jawab.
                  </p>

                  <p>
                    Informasi ini dibuat sebagai bagian dari penyampaian
                    informasi resmi kepada seluruh peserta magang.
                  </p>
                </motion.div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setActive(null)}
                    className="
                      rounded-xl
                      bg-[#2563EB]
                      px-5
                      py-3
                      text-sm
                      font-semibold
                      text-white
                      shadow-sm
                      transition-all
                      duration-200
                      hover:bg-[#1D4ED8]
                      hover:shadow-md
                      active:scale-[0.98]
                    "
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}