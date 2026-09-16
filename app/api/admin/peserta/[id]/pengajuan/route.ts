import { NextResponse, type NextRequest } from "next/server";
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

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return auth.res;

  const { id } = await context.params; // id = peserta_id
  if (!id) {
    return NextResponse.json({ message: "Bad request", detail: "Missing params.id" }, { status: 400 });
  }

  const admin = supabaseAdmin();

  const { data, error } = await admin
    .from("pengajuan_magang")
    .select("id,tanggal_pengajuan,status,posisi,catatan,diproses_at")
    .eq("peserta_id", id)
    .order("tanggal_pengajuan", { ascending: false });

  if (error) {
    return NextResponse.json({ message: "Query error", detail: error.message }, { status: 500 });
  }

  const items = (data ?? []).map((x: any) => ({
    id: x.id,
    tanggal: x.tanggal_pengajuan,
    posisi: x.posisi ?? "-",
    status: mapStatus(x.status),
    raw_status: x.status,
    catatan: x.catatan ?? null,
    diproses_at: x.diproses_at ?? null,
  }));

  return NextResponse.json({ data: items });
}