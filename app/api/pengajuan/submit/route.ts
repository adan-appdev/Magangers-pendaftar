import { NextResponse } from "next/server";
import { requireUser } from "@/lib/apiAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { message: "Server misconfigured", detail: "SUPABASE_SERVICE_ROLE_KEY belum kebaca" },
        { status: 500 }
      );
    }

    const auth = await requireUser(req);
    if (!auth.ok) return auth.res;

    const body = await req.json().catch(() => ({}));
    const admin = supabaseAdmin();

    const { data: peserta, error: pesertaErr } = await admin
      .from("peserta")
      .select("id,status,user_id")
      .eq("user_id", auth.user.id)
      .maybeSingle();

    if (pesertaErr) {
      return NextResponse.json({ message: "Query peserta error", detail: pesertaErr.message }, { status: 500 });
    }

    if (!peserta) {
      return NextResponse.json(
        { message: "Peserta belum ada", detail: "Buat row peserta dulu untuk user ini" },
        { status: 400 }
      );
    }

    const { data: pengajuan, error: insErr } = await admin
      .from("pengajuan_magang")
      .insert({
        peserta_id: peserta.id,
        tanggal_pengajuan: new Date().toISOString(),
        status: "diajukan",
        posisi: body?.posisi ?? null,
        catatan: body?.catatan ?? null,
      })
      .select("id,peserta_id,status,tanggal_pengajuan,posisi,catatan")
      .single();

    if (insErr) {
      return NextResponse.json({ message: "Insert pengajuan error", detail: insErr.message }, { status: 500 });
    }

    const { error: upErr } = await admin
      .from("peserta")
      .update({ status: "mengajukan" })
      .eq("id", peserta.id);

    if (upErr) {
      return NextResponse.json({ message: "Update peserta error", detail: upErr.message }, { status: 500 });
    }

    return NextResponse.json({ message: "OK", pengajuan });
  } catch (err: any) {
    console.error("SUBMIT ROUTE CRASH:", err);
    return NextResponse.json(
      { message: "Route crash", detail: String(err?.message ?? err) },
      { status: 500 }
    );
  }
}