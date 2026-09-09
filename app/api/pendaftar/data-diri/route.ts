import { NextResponse } from "next/server";
import { requireUser } from "@/lib/apiAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  const auth = await requireUser(req);
  if (!auth.ok) return auth.res;

  const body = await req.json().catch(() => ({}));
  const admin = supabaseAdmin();

  // pastikan peserta row sudah ada (sesuai pola yang kamu pakai di submit pengajuan)
  const { data: peserta, error: pErr } = await admin
    .from("peserta")
    .select("id")
    .eq("user_id", auth.user.id)
    .maybeSingle();

  if (pErr) {
    return NextResponse.json(
      { message: "Query peserta error", detail: pErr.message },
      { status: 500 }
    );
  }

  if (!peserta) {
    return NextResponse.json(
      {
        message: "Peserta belum ada",
        detail: "Buat row peserta dulu untuk user ini",
      },
      { status: 400 }
    );
  }

  // mapping dari form (camelCase) -> kolom DB (snake_case)
  const payload = {
    nama_lengkap: body?.nama ?? null,
    email: body?.email ?? null,
    nomor_hp: body?.hp ?? null,

    nik: body?.nik ?? null,
    tempat_lahir: body?.tempat ?? null,
    tanggal_lahir: body?.tanggal ? body.tanggal : null, // "YYYY-MM-DD" cocok untuk date
    jenis_kelamin: body?.gender ?? null,

    alamat: body?.alamat ?? null,
    kota: body?.kota ?? null,
    provinsi: body?.provinsi ?? null,

    jenjang: body?.jenjang ?? null,
    sekolah: body?.sekolah ?? null,
    jurusan: body?.jurusan ?? null,
    kelas: body?.kelas ?? null,
    nisn: body?.nisn ?? null,

    pembimbing: body?.pembimbing ?? null,
    hp_pembimbing: body?.hpPembimbing ?? null,
  };

  const { error: upErr } = await admin
    .from("peserta")
    .update(payload)
    .eq("id", peserta.id);

  if (upErr) {
    return NextResponse.json(
      { message: "Update data diri error", detail: upErr.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "OK" }, { status: 200 });
}