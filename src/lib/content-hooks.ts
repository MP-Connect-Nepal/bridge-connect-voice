import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLang } from "@/lib/i18n";

export type ContentRow = { key: string; value_en: string | null; value_ne: string | null };

export function useAllContent() {
  return useQuery({
    queryKey: ["site_content"],
    queryFn: async (): Promise<Record<string, ContentRow>> => {
      const { data, error } = await supabase.from("site_content").select("key,value_en,value_ne");
      if (error) throw error;
      const map: Record<string, ContentRow> = {};
      for (const r of data ?? []) map[r.key] = r as ContentRow;
      return map;
    },
    staleTime: 60_000,
  });
}

// Returns overridden text for a key, or the fallback when not set.
export function useContent(key: string, fallback: string): string {
  const { lang } = useLang();
  const { data } = useAllContent();
  const row = data?.[key];
  if (!row) return fallback;
  const v = lang === "ne" ? row.value_ne : row.value_en;
  return (v && v.trim()) || fallback;
}

export function useImageOverride(key: string) {
  return useQuery({
    queryKey: ["site_image", key],
    queryFn: async () => {
      const { data } = await supabase
        .from("site_images")
        .select("storage_path,alt")
        .eq("key", key)
        .maybeSingle();
      return data as { storage_path: string; alt: string | null } | null;
    },
    staleTime: 60_000,
  });
}
