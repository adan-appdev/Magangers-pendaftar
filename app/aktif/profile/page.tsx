"use client";

import Image from "next/image";
import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  School,
  GraduationCap,
  BriefcaseBusiness,
  UserRoundCheck,
  CalendarDays,
  Lock,
  Eye,
  EyeOff,
  X,
  ShieldCheck,
} from "lucide-react";

export default function ProfilePage() {
  const [passwordModal, setPasswordModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [passwordLama, setPasswordLama] = useState("");
  const [passwordBaru, setPasswordBaru] = useState("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState("");

  const handleUbahPassword = () => {
    if (!passwordLama || !passwordBaru || !konfirmasiPassword) {
      return;
    }

    if (passwordBaru !== konfirmasiPassword) {
      alert("Konfirmasi password tidak sesuai.");
      return;
    }

    alert("Password berhasil diubah.");

    setPasswordLama("");
    setPasswordBaru("");
    setKonfirmasiPassword("");
    setPasswordModal(false);
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-8">

      <div className="mb-8">
      </div>

      <div className="mb-6 overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">

        <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:p-8">

          <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-3xl bg-neutral-100">

            <Image
              src="/cartyWife.jpeg"
              width={150}
              height={150}
              alt="Foto profil Aldo Saputra"
              className="h-full w-full object-cover"
            />

          </div>

          <div className="flex-1">

            <p className="text-sm text-neutral-500">
              Peserta Magang
            </p>

            <h2 className="mt-1 text-2xl font-semibold text-neutral-900">
              Aldo Saputra
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              ASC124JU70JN
            </p>

            <div className="mt-3 flex flex-wrap gap-2">

              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Aktif
              </span>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                Software Engineer
              </span>

            </div>

          </div>

        </div>

      </div>

      <ProfileSection
        title="Informasi Pribadi"
        description="Informasi dasar mengenai peserta magang."
      >
        <div className="grid gap-4 md:grid-cols-2">

          <ProfileItem
            icon={User}
            label="Nama Lengkap"
            value="Aldo Saputra"
          />

          <ProfileItem
            icon={Mail}
            label="Email"
            value="aldo.saputra@gmail.com"
          />

          <ProfileItem
            icon={Phone}
            label="Nomor Handphone"
            value="081234567890"
          />

        </div>
      </ProfileSection>

      <ProfileSection
        title="Data Pendidikan"
        description="Informasi pendidikan peserta magang."
      >
        <div className="grid gap-4 md:grid-cols-2">

          <ProfileItem
            icon={School}
            label="Sekolah"
            value="SMKN 8 Malang"
          />

          <ProfileItem
            icon={GraduationCap}
            label="Jurusan"
            value="Rekayasa Perangkat Lunak"
          />

        </div>
      </ProfileSection>

      <ProfileSection
        title="Informasi Penempatan"
        description="Informasi mengenai penempatan dan pembimbing magang."
      >
        <div className="grid gap-4 md:grid-cols-2">

          <ProfileItem
            icon={BriefcaseBusiness}
            label="Divisi / Penempatan"
            value="Software Engineer"
          />

          <ProfileItem
            icon={UserRoundCheck}
            label="Nama Pembimbing"
            value="Pak Bambang"
          />

          <ProfileItem
            icon={CalendarDays}
            label="Periode Magang"
            value="01 Juli 2026 - 31 Desember 2026"
          />

        </div>
      </ProfileSection>

      <ProfileSection
        title="Keamanan Akun"
        description="Kelola keamanan akun peserta magang."
      >

        <div className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Lock size={18} />
            </div>

            <div>
              <p className="text-xs text-neutral-400">
                Password
              </p>

              <p className="mt-1 text-sm font-medium tracking-widest text-neutral-800">
                ••••••••••••
              </p>
            </div>

          </div>

          <button
            onClick={() => setPasswordModal(true)}
            className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Ubah Password
          </button>

        </div>

      </ProfileSection>

      {passwordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">

          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">

            <button
              onClick={() => setPasswordModal(false)}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 transition hover:bg-neutral-200"
            >
              <X size={18} />
            </button>

            <div className="mb-6">

              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <ShieldCheck size={21} />
              </div>

              <h2 className="text-xl font-semibold text-neutral-900">
                Ubah Password
              </h2>

              <p className="mt-1 text-sm leading-relaxed text-neutral-500">
                Gunakan password baru yang kuat untuk menjaga keamanan akun.
              </p>

            </div>

            <div className="space-y-4">

              <PasswordInput
                label="Password Lama"
                value={passwordLama}
                onChange={setPasswordLama}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />

              <PasswordInput
                label="Password Baru"
                value={passwordBaru}
                onChange={setPasswordBaru}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />

              <PasswordInput
                label="Konfirmasi Password Baru"
                value={konfirmasiPassword}
                onChange={setKonfirmasiPassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />

            </div>

            <div className="mt-6 flex gap-3">

              <button
                onClick={() => setPasswordModal(false)}
                className="flex-1 rounded-full border border-neutral-200 bg-white py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
              >
                Batal
              </button>

              <button
                onClick={handleUbahPassword}
                className="flex-1 rounded-full bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Simpan Password
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

function ProfileSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm md:p-7">

      <div className="mb-5">

        <h2 className="text-lg font-semibold text-neutral-900">
          {title}
        </h2>

        <p className="mt-1 text-sm text-neutral-500">
          {description}
        </p>

      </div>

      {children}

    </section>
  );
}

function ProfileItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4">

      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        <Icon size={18} />
      </div>

      <div className="min-w-0">

        <p className="text-xs text-neutral-400">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-medium text-neutral-800">
          {value}
        </p>

      </div>

    </div>
  );
}

function PasswordInput({
  label,
  value,
  onChange,
  showPassword,
  setShowPassword,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-medium text-neutral-700">
        {label}
      </label>

      <div className="relative">

        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Masukkan password"
          className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 pr-12 text-sm text-neutral-800 outline-none transition placeholder:text-neutral-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 transition hover:text-neutral-700"
        >
          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>

      </div>

    </div>
  );
}