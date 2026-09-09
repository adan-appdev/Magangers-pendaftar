import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/apiAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

function mapStatus(appStatus: string) {
  if (appStatus === "diajukan") return "Menunggu";
  if (appStatus === "diproses") return "Diperiksa";
  if (appStatus === "revisi") return "Revisi";
  if (appStatus === "diterima") return "Diterima";
  if (appStatus === "ditolak") return "Ditolak";
  if (appStatus === "draft") return "Draft";
  return appStatus;
}

export async function GET(req: Request) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return auth.res;

  const admin = supabaseAdmin();

  const { data, error } = await admin
    .from("pengajuan_magang")
    .select(`
      id,
      posisi,
      catatan,
      status,
      tanggal_pengajuan,
      peserta:peserta_id (
        id,
        user_id,
        nama_lengkap,
        email,
        nomor_hp,
        alamat,
        sekolah,
        jurusan
      )
    `)
    .order("tanggal_pengajuan", { ascending: false });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  const items = (data ?? []).map((row: any) => ({
    id: row.id,
    nama: row.peserta?.nama_lengkap ?? "-",
    email: row.peserta?.email ?? "-",
    sekolah: row.peserta?.sekolah ?? "-",
    jurusan: row.peserta?.jurusan ?? "-",
    posisi: row.posisi ?? "-",
    alamat: row.peserta?.alamat ?? "-",
    nohp: row.peserta?.nomor_hp ?? "-",
    tanggal: row.tanggal_pengajuan,
    status: mapStatus(row.status),
    raw_status: row.status,
    catatan: row.catatan ?? null,
  }));

  return NextResponse.json({ data: items });
}