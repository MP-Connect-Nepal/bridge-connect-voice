import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHeader, Section } from "@/components/ui-bits";
import { submitVolunteer } from "@/lib/form-submit.functions";
import { useLang } from "@/lib/i18n";

const CONTACT_EMAIL = "suunil428@gmail.com";

export const Route = createFileRoute("/get-involved")({
  head: () => ({
    meta: [
      { title: "Get Involved — MPConnectNepal" },
      { name: "description", content: "Volunteer with MPConnectNepal — review submissions, coordinate outreach, or help expand to more constituencies across Nepal." },
      { property: "og:title", content: "Get Involved — MPConnectNepal" },
      { property: "og:description", content: "Help us scale civic access across every constituency of Nepal." },
    ],
  }),
  component: GetInvolved,
});

function GetInvolved() {
  const { t } = useLang();
  const submit = useServerFn(submitVolunteer);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setStatus("submitting");
    setError(null);
    try {
      await submit({
        data: {
          fullName: String(f.get("name") ?? ""),
          email: String(f.get("email") ?? ""),
          constituency: String(f.get("constituency") ?? ""),
          role: String(f.get("role") ?? ""),
          notes: String(f.get("notes") ?? ""),
        },
      });
      setStatus("done");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError(err instanceof Error ? err.message : t("rc_error_generic"));
    }
  }

  return (
    <SiteLayout>
      <PageHeader eyebrow={t("gi_eyebrow")} title={t("gi_title")} lead={t("gi_lead")} />

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { t: t("gi_r1_t"), d: t("gi_r1_d") },
            { t: t("gi_r2_t"), d: t("gi_r2_d") },
            { t: t("gi_r3_t"), d: t("gi_r3_d") },
          ].map((r) => (
            <div key={r.t} className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-serif text-lg font-semibold text-primary">{r.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{r.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <section id="join-us" className="bg-secondary/50 border-y border-border">
        <div className="mx-auto max-w-3xl px-4 py-16 md:py-20">
          <h2 className="font-serif text-3xl font-semibold text-primary">{t("gi_form_title")}</h2>
          <p className="mt-3 text-foreground/80">{t("gi_form_lead")}</p>

          {status === "done" ? (
            <div className="mt-8 rounded-lg border border-border bg-card p-8 text-center">
              <h3 className="font-serif text-xl font-semibold text-primary">{t("gi_form_done_title")}</h3>
              <p className="mt-2 text-muted-foreground">
                {t("gi_form_done_msg")}{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>.
              </p>
            </div>
          ) : (
            <form className="mt-8 grid gap-4 rounded-lg border border-border bg-card p-6" onSubmit={onSubmit}>
              <VField label={t("gi_form_name")} name="name" required />
              <VField label={t("gi_form_email")} name="email" type="email" required />
              <VField label={t("gi_form_constituency")} name="constituency" required />
              <label className="block">
                <span className="text-sm font-medium">{t("gi_form_role")}</span>
                <select
                  name="role"
                  required
                  defaultValue=""
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="" disabled>{t("gi_form_choose")}</option>
                  <option>{t("gi_role_1")}</option>
                  <option>{t("gi_role_2")}</option>
                  <option>{t("gi_role_3")}</option>
                  <option>{t("gi_role_4")}</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-medium">{t("gi_form_notes")}</span>
                <textarea
                  name="notes"
                  rows={3}
                  maxLength={1000}
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </label>
              {error && <p className="text-sm text-crimson">{error}</p>}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-2 inline-flex justify-center rounded-md bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 disabled:opacity-60"
              >
                {status === "submitting" ? t("gi_form_submitting") : t("gi_form_submit")}
              </button>
              <p className="text-xs text-muted-foreground">{t("gi_privacy")}</p>
            </form>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function VField({
  label, name, type = "text", required,
}: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">
        {label}{required && <span className="text-crimson"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        maxLength={200}
        className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}
