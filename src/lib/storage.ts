import { supabase } from "@/integrations/supabase/client";

const ASSET_BUCKET = "site-assets";

export function getAssetUrl(path: string) {
  const { data } = supabase.storage
    .from(ASSET_BUCKET)
    .getPublicUrl(path);

  return data.publicUrl;
}