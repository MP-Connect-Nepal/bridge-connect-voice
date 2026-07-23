import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// Turn a `bucket/path` into a temporary signed URL (1h).
export function useSignedUrl(bucket: string, path: string | null | undefined) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    if (!path) {
      setUrl(null);
      return;
    }
    supabase.storage.from(bucket).createSignedUrl(path, 60 * 60).then(({ data }) => {
      if (!cancelled) setUrl(data?.signedUrl ?? null);
    });
    return () => {
      cancelled = true;
    };
  }, [bucket, path]);
  return url;
}
