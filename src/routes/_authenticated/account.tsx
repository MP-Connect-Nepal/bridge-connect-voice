import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Section, PageHeader } from "@/components/ui-bits";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/_authenticated/account")({
  head: () => ({
    meta: [
      { title: "Your account — MPConnectNepal" },
      { name: "description", content: "Manage your MPConnectNepal profile." },
      { property: "og:title", content: "Your account — MPConnectNepal" },
      { property: "og:description", content: "Manage your MPConnectNepal profile." },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const { user, profile, isAdmin, signOut, refreshProfile } = useAuth();
  const [name, setName] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (profile) setName(profile.display_name ?? "");
  }, [profile]);

  async function save() {
    if (!user) return;
    setMsg(null);
    const { error } = await supabase.from("profiles").update({ display_name: name.trim() || null }).eq("id", user.id);
    if (error) setMsg(error.message);
    else {
      setMsg("Saved");
      await refreshProfile();
    }
  }

  return (
    <SiteLayout>
      <PageHeader eyebrow="Account" title="Your account" lead={user?.email ?? ""} />
      <Section className="pt-4">
        <div className="mx-auto max-w-lg card-modern p-6 grid gap-4">
          <label className="block">
            <span className="text-sm font-medium">Display name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
            <span className="mt-1 block text-xs text-muted-foreground">Shown on your comments.</span>
          </label>
          {msg && <div className="text-sm text-primary">{msg}</div>}
          <div className="flex flex-wrap gap-2">
            <button onClick={save} className="btn-press rounded-full bg-crimson text-white px-4 py-2 text-sm font-semibold">
              Save
            </button>
            {isAdmin && (
              <button
                onClick={() => navigate({ to: "/admin" })}
                className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-secondary"
              >
                Admin panel
              </button>
            )}
            <button
              onClick={async () => {
                await signOut();
                navigate({ to: "/" });
              }}
              className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-secondary"
            >
              Sign out
            </button>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
