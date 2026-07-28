import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHeader, Section } from "@/components/ui-bits";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { listSubmissions, type SheetTab } from "@/lib/submissions.functions";
import { EDITABLE_CONTENT, EDITABLE_IMAGES } from "@/lib/editable-keys";
import { useSignedUrl } from "@/lib/signed-url";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin — MPConnectNepal" },
      { name: "description", content: "Manage site content, posts, and view submissions." },
      { property: "og:title", content: "Admin — MPConnectNepal" },
      { property: "og:description", content: "Manage site content, posts, and view submissions." },
    ],
  }),
  component: AdminPage,
});

type Tab = "submissions" | "content" | "posts" | "comments";

function AdminPage() {
  const { isAdmin, loading, user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("submissions");

  useEffect(() => {
    if (!loading && !isAdmin) navigate({ to: "/" });
  }, [loading, isAdmin, navigate]);

  if (loading) return <SiteLayout><Section>Loading…</Section></SiteLayout>;
  if (!isAdmin) return null;

  return (
    <SiteLayout>
      <PageHeader eyebrow="Admin" title="Admin panel" lead={`Signed in as ${user?.email}`} />
      <Section className="pt-2">
        <div className="mb-6 flex flex-wrap gap-2 border-b border-border">
          {([
            ["submissions", "Submissions"],
            ["content", "Content"],
            ["posts", "Posts"],
            ["comments", "Comments"],
          ] as const).map(([k, l]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`px-4 py-2 -mb-px border-b-2 text-sm font-medium ${
                tab === k ? "border-crimson text-crimson" : "border-transparent text-foreground/70"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
        {tab === "submissions" && <SubmissionsTab />}
        {tab === "content" && <ContentTab />}
        {tab === "posts" && <PostsTab />}
        {tab === "comments" && <CommentsTab />}
      </Section>
    </SiteLayout>
  );
}

function SubmissionsTab() {
  const fn = useServerFn(listSubmissions);
  const q = useQuery({ queryKey: ["submissions"], queryFn: () => fn() });
  const [active, setActive] = useState(0);

  if (q.isLoading) return <p>Loading submissions…</p>;
  if (q.error) return <p className="text-crimson">Failed: {String((q.error as Error).message)}</p>;
  const tabs = (q.data as SheetTab[]) ?? [];
  const cur = tabs[active];

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2">
        {tabs.map((t, i) => (
          <button
            key={t.name}
            onClick={() => setActive(i)}
            className={`rounded-full px-3 py-1 text-xs font-medium border ${
              active === i ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"
            }`}
          >
            {t.name} ({t.rows.length})
          </button>
        ))}
      </div>
      {cur && (
        <div className="overflow-x-auto card-modern">
          <table className="min-w-full text-sm">
            <thead className="bg-secondary/60">
              <tr>{cur.header.map((h, i) => <th key={i} className="px-3 py-2 text-left font-medium">{h}</th>)}</tr>
            </thead>
            <tbody>
              {cur.rows.map((r, i) => (
                <tr key={i} className="border-t border-border/60">
                  {cur.header.map((_, j) => (
                    <td key={j} className="px-3 py-2 align-top max-w-xs whitespace-pre-wrap">{r[j] ?? ""}</td>
                  ))}
                </tr>
              ))}
              {cur.rows.length === 0 && (
                <tr><td colSpan={cur.header.length} className="px-3 py-6 text-center text-muted-foreground">No submissions yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ContentTab() {
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["site_content_admin"],
    queryFn: async () => {
      const { data } = await supabase.from("site_content").select("key,value_en,value_ne");
      const map: Record<string, { en: string; ne: string }> = {};
      for (const r of data ?? []) map[r.key] = { en: r.value_en ?? "", ne: r.value_ne ?? "" };
      return map;
    },
  });
  const [state, setState] = useState<Record<string, { en: string; ne: string }>>({});
  useEffect(() => { if (q.data) setState({ ...q.data }); }, [q.data]);
  const [saving, setSaving] = useState<string | null>(null);

  async function save(key: string) {
    const v = state[key] ?? { en: "", ne: "" };
    setSaving(key);
    const { error } = await supabase.from("site_content").upsert({
      key, value_en: v.en, value_ne: v.ne,
    });
    setSaving(null);
    if (error) alert(error.message);
    else { qc.invalidateQueries({ queryKey: ["site_content"] }); qc.invalidateQueries({ queryKey: ["site_content_admin"] }); }
  }

  return (
    <div className="grid gap-6">
      <div>
        <h3 className="font-serif text-lg font-semibold mb-2">Text</h3>
        <p className="text-sm text-muted-foreground mb-4">Edit key site text. Leave blank to use the default. English and Nepali are stored separately.</p>
        <div className="grid gap-4">
          {EDITABLE_CONTENT.map(({ key, label, hint }) => {
            const v = state[key] ?? { en: "", ne: "" };
            return (
              <div key={key} className="card-modern p-4">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="font-medium text-sm">{label}</div>
                    {hint && <div className="text-xs text-muted-foreground">{hint}</div>}
                  </div>
                  <button
                    onClick={() => save(key)}
                    disabled={saving === key}
                    className="rounded-md bg-primary text-primary-foreground px-3 py-1.5 text-xs font-semibold disabled:opacity-60"
                  >
                    {saving === key ? "…" : "Save"}
                  </button>
                </div>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <label className="block">
                    <span className="text-xs font-medium">English</span>
                    <textarea
                      rows={3}
                      value={v.en}
                      onChange={(e) => setState((s) => ({ ...s, [key]: { ...v, en: e.target.value } }))}
                      className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-medium">नेपाली</span>
                    <textarea
                      rows={3}
                      value={v.ne}
                      onChange={(e) => setState((s) => ({ ...s, [key]: { ...v, ne: e.target.value } }))}
                      className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm"
                    />
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="font-serif text-lg font-semibold mb-2">Images</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {EDITABLE_IMAGES.map((img) => <ImageEditor key={img.key} k={img.key} label={img.label} />)}
        </div>
      </div>
    </div>
  );
}

function ImageEditor({ k, label }: { k: string; label: string }) {
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["site_image_admin", k],
    queryFn: async () => {
      const { data } = await supabase.from("site_images").select("storage_path,alt").eq("key", k).maybeSingle();
      return data as { storage_path: string; alt: string | null } | null;
    },
  });
  const url = useSignedUrl("site-assets", q.data?.storage_path);
  const [busy, setBusy] = useState(false);

  async function upload(file: File) {
    setBusy(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${k}-${Date.now()}.${ext}`;
      const up = await supabase.storage.from("site-assets").upload(path, file, { upsert: true });
      if (up.error) throw up.error;
      const { error } = await supabase.from("site_images").upsert({ key: k, storage_path: path, alt: label });
      if (error) throw error;
      qc.invalidateQueries({ queryKey: ["site_image_admin", k] });
      qc.invalidateQueries({ queryKey: ["site_image", k] });
    } catch (e) {
      alert(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card-modern p-4">
      <div className="font-medium text-sm mb-2">{label}</div>
      {url ? (
        <img src={url} alt="" className="aspect-video w-full object-cover rounded-md border border-border" />
      ) : (
        <div className="aspect-video w-full rounded-md border border-dashed border-border bg-secondary/40 flex items-center justify-center text-xs text-muted-foreground">
          Default image
        </div>
      )}
      <label className="mt-3 block">
        <span className="text-xs text-muted-foreground">Replace image</span>
        <input
          type="file"
          accept="image/*"
          disabled={busy}
          onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
          className="mt-1 block w-full text-xs"
        />
      </label>
    </div>
  );
}

function PostsTab() {
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["posts_admin"],
    queryFn: async () => {
      const { data } = await supabase.from("posts").select("id,title,caption,image_path,created_at").order("created_at", { ascending: false });
      return data ?? [];
    },
  });
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  async function create() {
    if (!title.trim() || !caption.trim()) return alert("Title and caption required");
    setBusy(true);
    try {
      let path: string | null = null;
      if (file) {
        const ext = file.name.split(".").pop() || "jpg";
        const key = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const up = await supabase.storage.from("post-images").upload(key, file);
        if (up.error) throw up.error;
        path = key;
      }
      const { error } = await supabase.from("posts").insert({ title, caption, image_path: path });
      if (error) throw error;
      setTitle(""); setCaption(""); setFile(null);
      qc.invalidateQueries({ queryKey: ["posts_admin"] });
      qc.invalidateQueries({ queryKey: ["posts"] });
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  async function del(id: string) {
    if (!confirm("Delete this post?")) return;
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) alert(error.message);
    else { qc.invalidateQueries({ queryKey: ["posts_admin"] }); qc.invalidateQueries({ queryKey: ["posts"] }); }
  }

  return (
    <div className="grid gap-6">
      <div className="card-modern p-4 grid gap-3">
        <h3 className="font-serif text-lg font-semibold">New post</h3>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="rounded-md border border-border bg-background px-3 py-2 text-sm" />
        <textarea placeholder="Short caption of the conversation…" rows={4} value={caption} onChange={(e) => setCaption(e.target.value)} className="rounded-md border border-border bg-background px-3 py-2 text-sm" />
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="text-sm" />
        <button onClick={create} disabled={busy} className="rounded-md bg-crimson text-white px-4 py-2 text-sm font-semibold disabled:opacity-60 w-fit">
          {busy ? "Publishing…" : "Publish post"}
        </button>
      </div>
      <div className="grid gap-3">
        {(q.data ?? []).map((p) => (
          <div key={p.id} className="card-modern p-4 flex items-center justify-between gap-3">
            <div>
              <div className="font-medium">{p.title}</div>
              <div className="text-xs text-muted-foreground">{new Date(p.created_at).toLocaleString()}</div>
            </div>
            <button onClick={() => del(p.id)} className="text-crimson text-sm">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function CommentsTab() {
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["comments_admin"],
    queryFn: async () => {
      const { data } = await supabase.from("post_comments").select("id,post_id,author_name,body,created_at").order("created_at", { ascending: false }).limit(100);
      return data ?? [];
    },
  });
  async function del(id: string) {
    if (!confirm("Delete comment?")) return;
    const { error } = await supabase.from("post_comments").delete().eq("id", id);
    if (error) alert(error.message);
    else qc.invalidateQueries({ queryKey: ["comments_admin"] });
  }
  return (
    <div className="grid gap-2">
      {(q.data ?? []).map((c) => (
        <div key={c.id} className="rounded-md border border-border bg-card p-3 text-sm flex items-start justify-between gap-3">
          <div>
            <div className="font-medium">{c.author_name}</div>
            <div className="text-xs text-muted-foreground">{new Date(c.created_at).toLocaleString()}</div>
            <p className="mt-1">{c.body}</p>
          </div>
          <button onClick={() => del(c.id)} className="text-crimson text-xs">Delete</button>
        </div>
      ))}
      {(q.data ?? []).length === 0 && <p className="text-sm text-muted-foreground">No comments yet.</p>}
    </div>
  );
}
