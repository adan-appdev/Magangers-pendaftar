"use client";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  LogIn,
  GraduationCap,
  Rocket,
  BarChart3,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Akun demo pembina — ganti mekanisme ini dengan pengecekan role dari API
  // login kamu yang sesungguhnya begitu backend-nya siap.
  const PEMBINA_ACCOUNT = {
    email: "pembina@gmail.com",
    password: "pembina123",
  };

  const ADMIN_ACCOUNT = {
  email: "admin@gmail.com",
  password: "admin123",
};

  function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  setError("");
  setSubmitting(true);

  setTimeout(() => {
    setSubmitting(false);

    const inputEmail = email.trim().toLowerCase();

    const isAdmin =
      inputEmail === ADMIN_ACCOUNT.email &&
      password === ADMIN_ACCOUNT.password;

    const isPembina =
      inputEmail === PEMBINA_ACCOUNT.email &&
      password === PEMBINA_ACCOUNT.password;

    if (isAdmin) {
      router.push("/admin/dashboard");
      return;
    }

    if (isPembina) {
      router.push("/dashboard-pembina");
      return;
    }

    // Sementara peserta diarahkan ke halaman pendaftar
    router.push("/pendaftar/beranda");
  }, 600);
}

  return (
    <section className="relative isolate overflow-hidden rounded-b-[2.5rem] bg-slate-100 pb-20 pt-32 sm:pt-36">
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
            <LogIn className="h-3.5 w-3.5" />
            Selamat Datang Kembali
          </span>

          <h1 className="text-3xl font-extrabold text-slate-900">
            Masuk ke Magang-ers
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Lanjutkan perjalanan magangmu dari tempat kamu berhenti
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <div className="relative">
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-blue focus:bg-white"
              />
            </div>

            <div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              {error && (
                <p className="mt-1.5 text-xs font-medium text-red-500">
                  {error}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
                />
                Ingat saya
              </label>
              <a
                href="/lupa-password"
                className="font-semibold text-brand-blue hover:underline"
              >
                Lupa password?
              </a>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-transform hover:-translate-y-0.5 hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-60"
            >
              {submitting ? "Memproses..." : "Masuk"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Belum punya akun?{" "}
            <a
              href="/register"
              className="font-semibold text-brand-blue hover:underline"
            >
              Daftar di sini
            </a>
          </p>
        </div>

        {/* Right: portrait with copy overlaid on top */}
        <div className="relative min-h-[560px] overflow-hidden rounded-[2rem] lg:min-h-[640px]">
          {/* Portrait — ganti /student.png dengan foto kamu di folder public */}
          <Image
            src="/student.png"
            alt="Mahasiswa magang"
            fill
            className="object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent" />

          <div className="relative z-10 max-w-md px-2 py-10 sm:px-6">
            <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Selamat Datang
              <br />
              Kembali di
              <br />
              <span className="text-brand-blue">Magang-ers!</span>
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
    </section>
  );
}
