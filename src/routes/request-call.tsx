import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHeader, Section } from "@/components/ui-bits";
import { MPCombobox } from "@/components/MPCombobox";
import { submitRequestCall } from "@/lib/form-submit.functions";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/request-call")({
  head: () => ({
    meta: [
      { title: "Request a Call with Your MP — MPConnectNepal" },
      { name: "description", content: "Submit your request for an organized video call with your Member of Parliament through MPConnectNepal." },
      { property: "og:title", content: "Request a Call with Your MP — MPConnectNepal" },
      { property: "og:description", content: "Share your question or idea and we'll organize a call with the MP who represents you." },
    ],
  }),
  component: RequestCall,
});

function RequestCall() {
  const { t } = useLang();
  const submit = useServerFn(submitRequestCall);
  const [mp, setMp] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!mp) {
      setError(t("rc_mp_missing"));
      return;
    }
    const f = new FormData(e.currentTarget);
    setStatus("submitting");
    try {
      await submit({
        data: {
          fullName: String(f.get("fullName") ?? ""),
          address: String(f.get("address") ?? ""),
          mp,
          question: String(f.get("question") ?? ""),
          email: String(f.get("email") ?? ""),
          phone: String(f.get("phone") ?? ""),
          bestTime: String(f.get("bestTime") ?? ""),
          timeNote: String(f.get("timeNote") ?? ""),
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
      <PageHeader eyebrow={t("rc_eyebrow")} title={t("rc_title")} lead={t("rc_lead")} />

      <Section className="pt-6">
        <div className="mx-auto max-w-2xl">
          {status === "done" ? (
            <div className="card-modern p-8 text-center">
              <h2 className="font-serif text-2xl font-semibold text-primary">{t("rc_done_title")}</h2>
              <p className="mt-3 text-foreground/80">{t("rc_done_msg")}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-5 card-modern p-6 md:p-8">
              <Field label={t("rc_fullname")} name="fullName" required />

              <label className="block">
                <span className="text-sm font-medium">
                  {t("rc_address")} <span className="text-crimson">*</span>
                </span>
                <textarea
                  name="address"
                  required
                  rows={2}
                  maxLength={500}
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
                <span className="mt-1 block text-xs text-muted-foreground">{t("rc_address_hint")}</span>
              </label>

              <label className="block">
                <span className="text-sm font-medium">
                  {t("rc_mp")} <span className="text-crimson">*</span>
                </span>
                <div className="mt-1">
                  <MPCombobox value={mp} onChange={setMp} />
                </div>
              </label>

              <label className="block">
                <span className="text-sm font-medium">
                  {t("rc_question")} <span className="text-crimson">*</span>
                </span>
                <textarea
                  name="question"
                  required
                  rows={5}
                  maxLength={2000}
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
                <span className="mt-1 block text-xs text-muted-foreground">{t("rc_question_hint")}</span>
              </label>

              <div className="grid gap-5 md:grid-cols-2">
                <Field label={t("rc_email")} name="email" type="email" required />
                <Field label={t("rc_phone")} name="phone" type="tel" required />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium">
                    {t("rc_besttime")} <span className="text-crimson">*</span>
                  </span>
                  <select
                    name="bestTime"
                    required
                    defaultValue=""
                    className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="" disabled>{t("rc_besttime_choose")}</option>
                    <option>{t("rc_time_morning")}</option>
                    <option>{t("rc_time_afternoon")}</option>
                    <option>{t("rc_time_evening")}</option>
                  </select>
                </label>
                <Field label={t("rc_besttime_note")} name="timeNote" placeholder={t("rc_besttime_note_ph")} />
              </div>

              {error && (
                <div className="rounded-md border border-crimson/40 bg-crimson/5 px-3 py-2 text-sm text-crimson">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-2 inline-flex justify-center btn-press rounded-full bg-crimson text-white px-6 py-3 text-sm font-semibold hover:opacity-90 disabled:opacity-60 transition"
              >
                {status === "submitting" ? t("rc_submitting") : t("rc_submit")}
              </button>

              <p className="text-xs text-muted-foreground">{t("rc_privacy")}</p>
            </form>
          )}
        </div>
      </Section>
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
