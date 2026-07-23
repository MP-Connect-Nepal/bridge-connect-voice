import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const SHEET_ID = "1poCKXPusDQ-bXZBN1Kff2s9eRup_ozGYim5E-H02uPI";
const GATEWAY = "https://connector-gateway.lovable.dev/google_sheets/v4";

async function gatewayGet(path: string) {
  const lovableKey = process.env.LOVABLE_API_KEY!;
  const connectionKey = process.env.GOOGLE_SHEETS_API_KEY!;
  const res = await fetch(`${GATEWAY}${path}`, {
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": connectionKey,
    },
  });
  if (!res.ok) throw new Error(`Sheets ${res.status}: ${await res.text()}`);
  return res.json();
}

export type SheetTab = { name: string; header: string[]; rows: string[][] };

export const listSubmissions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<SheetTab[]> => {
    // Verify caller is admin
    const { data: role } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    if (!role) throw new Error("Forbidden");

    const tabs = ["Request a Call", "Volunteer", "MP Partnership"];
    const ranges = tabs.map((t) => `ranges=${encodeURIComponent(`${t}!A1:Z200`)}`).join("&");
    const data = await gatewayGet(`/spreadsheets/${SHEET_ID}/values:batchGet?${ranges}`);
    const out: SheetTab[] = [];
    const vrs: Array<{ range?: string; values?: string[][] }> = data.valueRanges ?? [];
    vrs.forEach((vr, i) => {
      const values = vr.values ?? [];
      const header = values[0] ?? [];
      const rows = values.slice(1).reverse().slice(0, 50);
      out.push({ name: tabs[i], header, rows });
    });
    return out;
  });
