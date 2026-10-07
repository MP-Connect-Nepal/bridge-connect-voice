// src/lib/assets.ts

import { supabase } from "@/integrations/supabase/client";

export const logoAsset = {
  url: supabase.storage
    .from("site-assets")
    .getPublicUrl("mpconnectnepal-logo.png").data.publicUrl,
};

export const heroImage = {
  url: supabase.storage
    .from("site-assets")
    .getPublicUrl("virtaul-call.jpg").data.publicUrl,
};

export const sunilAsset = {
  url: supabase.storage
    .from("site-assets")
    .getPublicUrl("virtaul-call.jpg").data.publicUrl,
};

export const himalAsset = {
  url: supabase.storage
    .from("site-assets")
    .getPublicUrl("virtaul-call.jpg").data.publicUrl,
};