import { supabaseAdmin } from "./supabaseAdmin";

export async function insertHistory(args: {
  peserta_id: string;
  from_status: string | null;
  to_status: string;
  note?: string | null;
  changed_by?: string | null;
  entity?: string;
  entity_id?: string | null;
}) {
  const admin = supabaseAdmin();
  await admin.from("status_history").insert({
    peserta_id: args.peserta_id,
    entity: args.entity ?? "peserta",
    entity_id: args.entity_id ?? args.peserta_id,
    from_status: args.from_status,
    to_status: args.to_status,
    note: args.note ?? null,
    changed_by: args.changed_by ?? null,
  });
}