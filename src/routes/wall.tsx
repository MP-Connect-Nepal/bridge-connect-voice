import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHeader, Section } from "@/components/ui-bits";
import { supabase } from "@/integrations/supabase/client";
import { PostCard, type Post } from "@/components/PostCard";

export const Route = createFileRoute("/wall")({
  head: () => ({
    meta: [
      { title: "Community Wall — MPConnectNepal" },
      { name: "description", content: "Recent MP conversations organized by MPConnectNepal. Like, comment, and share." },
      { property: "og:title", content: "Community Wall — MPConnectNepal" },
      { property: "og:description", content: "Recent MP conversations. Like, comment, and share." },
    ],
  }),
  component: WallPage,
});

function WallPage() {
  const q = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await supabase.from("posts").select("id,title,caption,image_path,created_at").order("created_at", { ascending: false });
      return (data ?? []) as Post[];
    },
  });

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Community Wall"
        title="Recent conversations"
        lead="Photos and short recaps from calls we've organized. Like, comment, and share to help more citizens connect."
      />
      <Section className="pt-2">
        {q.isLoading ? (
          <p>Loading…</p>
        ) : (q.data ?? []).length === 0 ? (
          <div className="rounded-lg border border-dashed border-border p-10 text-center text-muted-foreground">
            No posts yet. Check back soon.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {(q.data ?? []).map((p) => <PostCard key={p.id} post={p} />)}
          </div>
        )}
      </Section>
    </SiteLayout>
  );
}
