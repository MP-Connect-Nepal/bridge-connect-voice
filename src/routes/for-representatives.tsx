import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHeader, Section } from "@/components/ui-bits";
import { submitPartnership } from "@/lib/form-submit.functions";
import { useLang } from "@/lib/i18n";

const CONTACT_EMAIL = "mpconnectnepal@gmail.com";

export const Route = createFileRoute("/for-representatives")({
  head: () => ({
    meta: [
      { title: "For Representatives — MPConnectNepal" },
      { name: "description", content: "How MPConnectNepal helps Members of Parliament and their offices efficiently hear from pre-screened, organized constituents." },
      { property: "og:title", content: "For Representatives — MPConnectNepal" },
      { property: "og:description", content: "Pre-screened constituent input, organized by constituency, logistics handled." },
    ],
  }),
  component: ForReps,
});

function ForReps() {
  const { t } = useLang();
  const submit = useServerFn(submitPartnership);
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
          name: String(f.get("name") ?? ""),
          role: String(f.get("role") ?? ""),
          constituency: String(f.get("constituency") ?? ""),
          email: String(f.get("email") ?? ""),
          message: String(f.get("message") ?? ""),
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
      <PageHeader eyebrow={t("reps_eyebrow")} title={t("reps_title")} lead={t("reps_lead")} />

      <Section className="pt-6">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { t: t("reps_b1_t"), d: t("reps_b1_d") },
            { t: t("reps_b2_t"), d: t("reps_b2_d") },
            { t: t("reps_b3_t"), d: t("reps_b3_d") },
          ].map((b) => (
            <div key={b.t} className="card-modern p-6">
              <h3 className="font-serif text-lg font-semibold text-primary">{b.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-secondary/50 border-y border-border">
        <div className="mx-auto max-w-3xl px-4 py-16 md:py-20">
          <h2 className="font-serif text-3xl font-semibold text-primary">{t("reps_partner_title")}</h2>
          <p className="mt-3 text-foreground/80">{t("reps_partner_lead")}</p>

          {status === "done" ? (
            <div className="mt-8 card-modern p-8 text-center">
              <h3 className="font-serif text-xl font-semibold text-primary">{t("reps_form_done")}</h3>
              <p className="mt-2 text-muted-foreground">{t("reps_form_done_msg")}</p>
            </div>
          ) : (
            <form className="mt-8 grid gap-4 card-modern p-6" onSubmit={onSubmit}>
              <Field label={t("reps_form_name")} name="name" required />
              <Field label={t("reps_form_role")} name="role" placeholder={t("reps_form_role_ph")} required />
              <Field label={t("reps_form_constituency")} name="constituency" required />
              <Field label={t("reps_form_email")} name="email" type="email" required />
              <label className="block">
                <span className="text-sm font-medium">{t("reps_form_message")}</span>
                <textarea
                  name="message"
                  rows={4}
                  required
                  maxLength={2000}
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </label>
              {error && <p className="text-sm text-crimson">{error}</p>}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-2 inline-flex justify-center rounded-md bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 disabled:opacity-60"
              >
                {status === "submitting" ? t("reps_form_submitting") : t("reps_form_submit")}
              </button>
              <p className="text-xs text-muted-foreground">
                {t("reps_form_or_email")} <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>.
              </p>
            </form>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({
  label, name, type = "text", required, placeholder,
}: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">
        {label}{required && <span className="text-crimson"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        maxLength={255}
        className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}
