"use client";

import {
  ChevronRight,
  Pencil,
  GraduationCap,
  Briefcase,
  Mail,
  Phone,
  Calendar,
  Settings2,
  User,
  Clock,
  ClipboardList,
  BookOpen,
  FileCheck2,
  FileText,
  Star,
} from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";
import { getPesertaById } from "@/lib/pesertaData";

const TABS = [
  { label: "Profil", icon: User },
  { label: "Absensi", icon: Clock },
  { label: "Tugas", icon: ClipboardList },
  { label: "Jurnal", icon: BookOpen },
  { label: "Izin", icon: FileCheck2 },
  { label: "Laporan", icon: FileText },
  { label: "Nilai", icon: Star },
];

export default function PesertaDetailPage() {
  const params = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("Profil");

  const peserta = getPesertaById(params.id);
  if (!peserta) notFound();

  const informasiPribadi = [
    { label: "Tempat, Tanggal Lahir", value: peserta.tempatTanggalLahir },
    { label: "Jenis Kelamin", value: peserta.jenisKelamin },
    { label: "Alamat", value: peserta.alamat },
    { label: "No. Telepon", value: peserta.telepon },
  ];

  const informasiPendidikan = [
    { label: "Asal Instansi", value: peserta.asalInstansi },
    { label: "Jurusan/Fakultas", value: peserta.jurusan },
    { label: "Semester", value: peserta.semester },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Detail Peserta
          </h1>
          <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-400">
            <Link href="/dashboard-pembina" className="hover:text-slate-600">
              Dashboard
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link
              href="/dashboard-pembina/peserta"
              className="hover:text-slate-600"
            >
              Peserta Bimbingan
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-500">{peserta.nama}</span>
          </div>
        </div>

        <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-brand-blue px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-transform hover:-translate-y-0.5">
          <Pencil className="h-4 w-4" />
          Edit Data
        </button>
      </div>

      {/* Profile card */}
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-6">
            <span className="grid h-28 w-28 shrink-0 place-items-center rounded-full bg-gradient-to-br from-blue-100 to-blue-200 text-2xl font-bold text-blue-500 ring-4 ring-blue-50">
              {peserta.nama
                .split(" ")
                .slice(0, 2)
                .map((w) => w[0])
                .join("")}
            </span>

            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                {peserta.nama}
              </h2>
              <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold">
                <span className="text-slate-700">Mahasiswa</span>
                <span className="text-violet-600">{peserta.status}</span>
              </span>

              <div className="mt-3 space-y-1.5 text-sm text-slate-600">
                <p className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-slate-400" />
                  {peserta.kampus}
                </p>
                <p className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-slate-400" />
                  {peserta.posisi}
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-slate-400" />
                  {peserta.email}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-slate-400" />
                  {peserta.telepon}
                </p>
              </div>
            </div>
          </div>

          <div className="hidden w-px self-stretch bg-slate-100 sm:block" />

          <div className="flex-1 space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-slate-400" />
              <div>
                <p className="text-slate-400">Periode Magang</p>
                <p className="font-semibold text-slate-800">
                  {peserta.periodeMagang}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Briefcase className="h-4 w-4 text-slate-400" />
              <div>
                <p className="text-slate-400">Pembimbing</p>
                <p className="font-semibold text-slate-800">
                  {peserta.pembimbing}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Settings2 className="h-4 w-4 text-slate-400" />
              <div>
                <p className="text-slate-400">Status</p>
                <span className="mt-0.5 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {peserta.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex flex-wrap gap-2 rounded-2xl border border-slate-100 bg-white p-2 shadow-sm sm:gap-6 sm:px-6">
        {TABS.map(({ label, icon: Icon }) => {
          const isActive = activeTab === label;
          return (
            <button
              key={label}
              onClick={() => setActiveTab(label)}
              className={`flex items-center gap-2 border-b-2 px-2 py-3 text-sm font-semibold transition-colors ${
                isActive
                  ? "border-brand-blue text-brand-blue"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      {activeTab === "Profil" ? (
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-100">
                <User className="h-5 w-5 text-indigo-500" />
              </span>
              <h3 className="font-bold text-slate-900">Informasi Pribadi</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {informasiPribadi.map((item) => (
                <div key={item.label} className="py-3 text-sm">
                  <p className="text-slate-400">{item.label}</p>
                  <p className="mt-0.5 font-semibold text-slate-800">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-100">
                <GraduationCap className="h-5 w-5 text-indigo-500" />
              </span>
              <h3 className="font-bold text-slate-900">
                Informasi Pendidikan
              </h3>
            </div>
            <div className="divide-y divide-slate-100">
              {informasiPendidikan.map((item) => (
                <div key={item.label} className="py-3 text-sm">
                  <p className="text-slate-400">{item.label}</p>
                  <p className="mt-0.5 font-semibold text-slate-800">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-10 text-center text-sm text-slate-400 shadow-sm">
          Konten tab &ldquo;{activeTab}&rdquo; belum tersedia.
        </div>
      )}
    </div>
  );
}
