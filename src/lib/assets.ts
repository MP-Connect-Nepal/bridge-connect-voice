// src/lib/assets.ts

import { supabase } from "@/integrations/supabase/client";

export const logoAsset = {
  url: supabase.storage
    .from("site-assets")
    .getPublicUrl("mpconnectnepal-logo.png").data.publicUrl,
};