
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

DROP POLICY "anyone can like" ON public.post_likes;
CREATE POLICY "anyone can like" ON public.post_likes FOR INSERT
  WITH CHECK (fingerprint IS NOT NULL AND length(fingerprint) BETWEEN 8 AND 128);

DROP POLICY "anyone can unlike own fingerprint" ON public.post_likes;
CREATE POLICY "anyone can unlike" ON public.post_likes FOR DELETE
  USING (fingerprint IS NOT NULL);

-- Storage policies for two buckets
CREATE POLICY "public read site-assets" ON storage.objects FOR SELECT
  USING (bucket_id = 'site-assets');
CREATE POLICY "admin write site-assets" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'site-assets' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admin update site-assets" ON storage.objects FOR UPDATE
  USING (bucket_id = 'site-assets' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admin delete site-assets" ON storage.objects FOR DELETE
  USING (bucket_id = 'site-assets' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "public read post-images" ON storage.objects FOR SELECT
  USING (bucket_id = 'post-images');
CREATE POLICY "admin write post-images" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'post-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admin update post-images" ON storage.objects FOR UPDATE
  USING (bucket_id = 'post-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admin delete post-images" ON storage.objects FOR DELETE
  USING (bucket_id = 'post-images' AND public.has_role(auth.uid(), 'admin'));
