// src/lib/assets.ts

import { supabase } from "@/integrations/supabase/client";

export const logoAsset = {
  url: supabase.storage
    .from("site-assets")
    .getPublicUrl("branding/mpconnectnepal-logo.png").data.publicUrl,
};