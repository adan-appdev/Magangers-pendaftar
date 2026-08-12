"use client";

import { X, ShieldCheck } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";

const CODE_LENGTH = 6;
const RESEND_SECONDS = 60;

type OtpModalProps = {
  phone: string;
  onClose: () => void;
  onVerify: (code: string) => void;
};

function maskPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length <= 4) return phone;
  const visibleStart = digits.slice(0, 4);
  const visibleEnd = digits.slice(-2);
  return `${visibleStart}${"*".repeat(
    Math.max(digits.length - 6, 3)
  )}${visibleEnd}`;
}

export default function OtpModal({ phone, onClose, onVerify }: OtpModalProps) {
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  // Countdown for resend
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft]);

  // Focus first box on mount
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  function handleChange(index: number, value: string) {
    const clean = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = clean;
    setDigits(next);
    setError("");

    if (clean && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;
    e.preventDefault();
    const next = Array(CODE_LENGTH).fill("");
    pasted
      .slice(0, CODE_LENGTH)
      .split("")
      .forEach((char, i) => (next[i] = char));
    setDigits(next);
    const lastFilled = Math.min(pasted.length, CODE_LENGTH) - 1;
    inputsRef.current[Math.max(lastFilled, 0)]?.focus();
  }

  function handleResend() {
    if (secondsLeft > 0) return;
    // TODO: panggil API pengiriman ulang OTP di sini
    setDigits(Array(CODE_LENGTH).fill(""));
    setError("");
    setSecondsLeft(RESEND_SECONDS);
    inputsRef.current[0]?.focus();
  }

  function handleSubmit() {
    const code = digits.join("");
    if (code.length < CODE_LENGTH) {
      setError("Masukkan 6 digit kode verifikasi.");
      return;
    }
    setSubmitting(true);
    // TODO: ganti dengan pemanggilan API verifikasi OTP sesungguhnya
    setTimeout(() => {
      setSubmitting(false);
      onVerify(code);
    }, 800);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm animate-in fade-in-0 duration-200"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="otp-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-3xl bg-white p-7 shadow-2xl animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2 duration-300"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="absolute right-5 top-5 text-slate-400 transition-colors hover:text-slate-600"
        >
          <X className="h-5 w-5" />
        </button>

        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-brand-blue">
          <ShieldCheck className="h-6 w-6" />
        </span>

        <h2
          id="otp-modal-title"
          className="mt-4 text-xl font-extrabold text-slate-900"
        >
          Verifikasi Nomor Telepon
        </h2>
        <p className="mt-1.5 text-sm text-slate-500">
          Kami telah mengirimkan kode 6 digit ke nomor{" "}
          <span className="font-semibold text-slate-700">
            {maskPhone(phone)}
          </span>
          . Masukkan kode tersebut di bawah ini.
        </p>

        <div className="mt-6 flex justify-between gap-2">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                inputsRef.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              className="h-14 w-full max-w-[46px] rounded-xl border border-slate-200 bg-slate-50 text-center text-lg font-bold text-slate-900 outline-none transition-colors focus:border-brand-blue focus:bg-white"
            />
          ))}
        </div>

        {error && (
          <p className="mt-3 text-sm font-medium text-red-500">{error}</p>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-transform hover:-translate-y-0.5 hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-60"
        >
          {submitting ? "Memverifikasi..." : "Verifikasi Kode"}
        </button>

        <p className="mt-5 text-center text-sm text-slate-500">
          Tidak menerima kode?{" "}
          {secondsLeft > 0 ? (
            <span className="font-medium text-slate-400">
              Kirim ulang dalam {secondsLeft}d
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="font-semibold text-brand-blue hover:underline"
            >
              Kirim ulang
            </button>
          )}
        </p>
      </div>
    </div>
  );
}