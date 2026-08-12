"use client";

import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  GraduationCap,
  Rocket,
  BarChart3,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import OtpModal from "@/components/OtpModal";

const FEATURES = [
  {
    icon: GraduationCap,
    color: "bg-brand-blue",
    title: "Kesempatan Terpercaya",
    subtitle: "Dari Perusahaan Terbaik",
  },
  {
    icon: Rocket,
    color: "bg-brand-orange",
    title: "Pengalaman Berkualitas",
    subtitle: "Tingkatkan Skill & Kompetensi",
  },
  {
    icon: BarChart3,
    color: "bg-brand-green",
    title: "Masa Depan Lebih Cerah",
    subtitle: "Persiapkan Kariermu Sekarang",
  },
];

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phone, setPhone] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("Password dan konfirmasi password tidak cocok.");
      return;
    }
    setPasswordError("");

    // TODO: kirim data pendaftaran ke API kamu di sini, lalu trigger
    // pengiriman OTP dari sisi server sebelum membuka modal ini.
    setShowOtpModal(true);
  }

  function handleVerifyOtp(code: string) {
    // TODO: kirim `code` ke API verifikasi OTP kamu di sini.
    console.log("Kode OTP dimasukkan:", code);
    setShowOtpModal(false);
    router.push("/pendaftar/beranda");
  }

  return (
    <section className="relative overflow-hidden rounded-b-[2.5rem] bg-slate-100 pb-20 pt-32 sm:pt-36">
      {/* Background photo layer */}
      <div className="absolute inset-x-0 top-0 -z-20 h-[620px] overflow-hidden lg:h-[680px]">
        <Image
          src="/kantor.png"
          alt="Suasana kantor"
          fill
          className="object-cover object-top"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-white/85 to-white/40" />
      <div className="absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-blue-200/50 blur-3xl" />
      <div className="absolute -right-10 bottom-0 -z-10 h-64 w-64 rounded-full bg-blue-300/40 blur-3xl" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-8">
        {/* Left: form card */}
        <div className="relative z-10 mx-auto w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
          <span className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-brand-blue">
            <User className="h-3.5 w-3.5" />
            Bergabung Sekarang
          </span>

          <h1 className="text-3xl font-extrabold text-slate-900">
            Registrasi Magang-ers
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Mulai perjalananmu menuju masa depan yang lebih cerah
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <div className="relative">
              <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                name="fullName"
                placeholder="Nama Lengkap"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-blue focus:bg-white"
              />
            </div>

            <div className="relative">
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-blue focus:bg-white"
              />
            </div>

            <div className="relative">
              <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="tel"
                name="phone"
                placeholder="Nomor Handphone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-blue focus:bg-white"
              />
            </div>

            <div className="relative">
              <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                minLength={8}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-11 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-blue focus:bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={
                  showPassword ? "Sembunyikan password" : "Tampilkan password"
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            <div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Konfirmasi Password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setPasswordError("");
                  }}
                  className={`w-full rounded-xl border bg-slate-50 py-3.5 pl-11 pr-11 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:bg-white ${
                    passwordError
                      ? "border-red-300 focus:border-red-400"
                      : "border-slate-200 focus:border-brand-blue"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  aria-label={
                    showConfirmPassword
                      ? "Sembunyikan konfirmasi password"
                      : "Tampilkan konfirmasi password"
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="mt-1.5 text-xs font-medium text-red-500">
                  {passwordError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-transform hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Daftar Sekarang
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Sudah punya akun?{" "}
            <a
              href="/masuk"
              className="font-semibold text-brand-blue hover:underline"
            >
              Masuk di sini
            </a>
          </p>
        </div>

        {/* Right: portrait with copy overlaid on top */}
        <div className="relative min-h-[560px] overflow-hidden rounded-[2rem] lg:min-h-[640px]">
          {/* Portrait — ganti /student.jpg dengan foto kamu di folder public */}
          <Image
            src="/student.png"
            alt="Mahasiswa magang"
            fill
            className="object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent" />

          <div className="relative z-10 max-w-md px-2 py-10 sm:px-6">
            <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Daftar Sekarang
              <br />
              dan Raih
              <br />
              <span className="text-brand-blue">Masa Depanmu!</span>
            </h2>

            <p className="mt-6 text-slate-600">
              Platform magang terpercaya yang menghubungkan mahasiswa dengan
              kesempatan terbaik untuk belajar, berkembang, dan bersiap
              menghadapi dunia kerja.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              {FEATURES.map(({ icon: Icon, color, title, subtitle }) => (
                <div
                  key={title}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur"
                >
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${color}`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </span>
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-slate-900">
                      {title}
                    </p>
                    <p className="text-xs text-slate-500">{subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showOtpModal && (
        <OtpModal
          phone={phone}
          onClose={() => setShowOtpModal(false)}
          onVerify={handleVerifyOtp}
        />
      )}
    </section>
  );
}
