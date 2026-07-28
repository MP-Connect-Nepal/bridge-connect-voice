-- 1) Lock down the signup trigger helper (it only needs to run as a trigger)
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- 2) post_comments: hide author_id from public readers via column-level grants
REVOKE SELECT ON public.post_comments FROM anon, authenticated;
GRANT SELECT (id, post_id, author_name, body, created_at) ON public.post_comments TO anon, authenticated;

-- 3) post_likes: hide fingerprints and stop anyone deleting anyone's like
REVOKE SELECT ON public.post_likes FROM anon, authenticated;
GRANT SELECT (id, post_id, created_at) ON public.post_likes TO anon, authenticated;

DROP POLICY IF EXISTS "anyone can unlike" ON public.post_likes;

CREATE OR REPLACE FUNCTION public.unlike_post(p_post_id uuid, p_fingerprint text)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  DELETE FROM public.post_likes
  WHERE post_id = p_post_id
    AND fingerprint = p_fingerprint
    AND length(p_fingerprint) >= 8;
$$;

CREATE OR REPLACE FUNCTION public.has_liked_post(p_post_id uuid, p_fingerprint text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.post_likes
    WHERE post_id = p_post_id AND fingerprint = p_fingerprint
  );
$$;

REVOKE ALL ON FUNCTION public.unlike_post(uuid, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.has_liked_post(uuid, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.unlike_post(uuid, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_liked_post(uuid, text) TO anon, authenticated;