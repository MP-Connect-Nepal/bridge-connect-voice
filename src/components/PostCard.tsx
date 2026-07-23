import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSignedUrl } from "@/lib/signed-url";
import { useAuth } from "@/lib/auth-context";

function getFingerprint(): string {
  if (typeof window === "undefined") return "";
  let fp = localStorage.getItem("mpcn-fp");
  if (!fp) {
    fp = crypto.randomUUID();
    localStorage.setItem("mpcn-fp", fp);
  }
  return fp;
}

export type Post = {
  id: string;
  title: string;
  caption: string;
  image_path: string | null;
  created_at: string;
};

export function PostCard({ post }: { post: Post }) {
  const qc = useQueryClient();
  const { user, profile } = useAuth();
  const img = useSignedUrl("post-images", post.image_path);
  const fp = useMemo(() => getFingerprint(), []);
  const [showComments, setShowComments] = useState(false);

  const likes = useQuery({
    queryKey: ["likes", post.id],
    queryFn: async () => {
      const { data } = await supabase.from("post_likes").select("fingerprint").eq("post_id", post.id);
      return data ?? [];
    },
  });
  const liked = (likes.data ?? []).some((l) => l.fingerprint === fp);
  const count = likes.data?.length ?? 0;

  async function toggleLike() {
    if (liked) {
      await supabase.from("post_likes").delete().eq("post_id", post.id).eq("fingerprint", fp);
    } else {
      await supabase.from("post_likes").insert({ post_id: post.id, fingerprint: fp });
    }
    qc.invalidateQueries({ queryKey: ["likes", post.id] });
  }

  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/wall#post-${post.id}` : "";
  const shareText = encodeURIComponent(`${post.title} — MPConnectNepal`);

  return (
    <article id={`post-${post.id}`} className="rounded-xl border border-border bg-card overflow-hidden">
      {img && (
        <div className="aspect-video w-full bg-secondary">
          <img src={img} alt={post.title} className="h-full w-full object-cover" loading="lazy" />
        </div>
      )}
      <div className="p-5">
        <h3 className="font-serif text-xl font-semibold text-primary">{post.title}</h3>
        <p className="mt-2 text-sm text-foreground/80 whitespace-pre-wrap">{post.caption}</p>
        <div className="mt-2 text-xs text-muted-foreground">{new Date(post.created_at).toLocaleDateString()}</div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            onClick={toggleLike}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm ${
              liked ? "border-crimson bg-crimson/10 text-crimson" : "border-border hover:bg-secondary"
            }`}
          >
            <span aria-hidden>{liked ? "♥" : "♡"}</span> {count}
          </button>
          <button
            onClick={() => setShowComments((s) => !s)}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm hover:bg-secondary"
          >
            💬 Comments
          </button>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="rounded-full border border-border px-3 py-1.5 text-sm hover:bg-secondary">Facebook</a>
          <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareText}`} target="_blank" rel="noopener noreferrer" className="rounded-full border border-border px-3 py-1.5 text-sm hover:bg-secondary">X</a>
          <a href={`https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="rounded-full border border-border px-3 py-1.5 text-sm hover:bg-secondary">WhatsApp</a>
          <button
            onClick={() => { navigator.clipboard.writeText(shareUrl); alert("Link copied"); }}
            className="rounded-full border border-border px-3 py-1.5 text-sm hover:bg-secondary"
          >
            Copy link
          </button>
        </div>

        {showComments && <Comments postId={post.id} defaultName={profile?.display_name ?? ""} authorId={user?.id ?? null} />}
      </div>
    </article>
  );
}

function Comments({ postId, defaultName, authorId }: { postId: string; defaultName: string; authorId: string | null }) {
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const { data } = await supabase
        .from("post_comments")
        .select("id,author_name,body,created_at")
        .eq("post_id", postId)
        .order("created_at", { ascending: true });
      return data ?? [];
    },
  });
  const [name, setName] = useState(defaultName);
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => { if (defaultName) setName(defaultName); }, [defaultName]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !body.trim()) return;
    setBusy(true);
    const { error } = await supabase.from("post_comments").insert({
      post_id: postId,
      author_name: name.trim().slice(0, 60),
      body: body.trim().slice(0, 1000),
      author_id: authorId,
    });
    setBusy(false);
    if (error) return alert(error.message);
    setBody("");
    qc.invalidateQueries({ queryKey: ["comments", postId] });
  }

  return (
    <div className="mt-4 border-t border-border pt-4">
      <div className="space-y-3">
        {(q.data ?? []).map((c) => (
          <div key={c.id} className="text-sm">
            <div className="font-medium text-foreground/90">{c.author_name}</div>
            <div className="text-xs text-muted-foreground">{new Date(c.created_at).toLocaleString()}</div>
            <p className="mt-0.5">{c.body}</p>
          </div>
        ))}
        {(q.data ?? []).length === 0 && <p className="text-xs text-muted-foreground">Be the first to comment.</p>}
      </div>
      <form onSubmit={submit} className="mt-4 grid gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          maxLength={60}
          className="rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Add a comment…"
          rows={2}
          required
          maxLength={1000}
          className="rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
        <button disabled={busy} className="w-fit rounded-md bg-primary text-primary-foreground px-4 py-1.5 text-sm font-semibold disabled:opacity-60">
          {busy ? "…" : "Post comment"}
        </button>
      </form>
    </div>
  );
}
