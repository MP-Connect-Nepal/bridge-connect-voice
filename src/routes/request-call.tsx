import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHeader, Section } from "@/components/ui-bits";
import { MPCombobox } from "@/components/MPCombobox";
import { submitRequestCall } from "@/lib/form-submit.functions";

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
  const submit = useServerFn(submitRequestCall);
  const [mp, setMp] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!mp) {
      setError("Please select the MP you want to talk with.");
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
      setError("Sorry — we couldn't submit your request just now. Please try again in a moment.");
    }
  }

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Request a call"
        title="Request a Call with Your MP."
        lead="Fill out the form below. Our team will review your submission and coordinate an organized video call with your representative."
      />

      <Section className="pt-6">
        <div className="mx-auto max-w-2xl">
          {status === "done" ? (
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <h2 className="font-serif text-2xl font-semibold text-primary">Thank you.</h2>
              <p className="mt-3 text-foreground/80">
                We've received your request and will be in touch as we coordinate with your representative.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-5 rounded-lg border border-border bg-card p-6 md:p-8">
              <Field label="Full Name" name="fullName" required />

              <label className="block">
                <span className="text-sm font-medium">
                  Complete Address <span className="text-crimson">*</span>
                </span>
                <textarea
                  name="address"
                  required
                  rows={2}
                  maxLength={500}
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
                <span className="mt-1 block text-xs text-muted-foreground">
                  This helps us confirm your constituency.
                </span>
              </label>

              <label className="block">
                <span className="text-sm font-medium">
                  MP You Want to Talk With <span className="text-crimson">*</span>
                </span>
                <div className="mt-1">
                  <MPCombobox value={mp} onChange={setMp} />
                </div>
              </label>

              <label className="block">
                <span className="text-sm font-medium">
                  Your Question or Idea <span className="text-crimson">*</span>
                </span>
                <textarea
                  name="question"
                  required
                  rows={5}
                  maxLength={2000}
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
                <span className="mt-1 block text-xs text-muted-foreground">
                  Briefly describe the problem or solution you'd like to discuss.
                </span>
              </label>

              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Email Address" name="email" type="email" required />
                <Field label="Phone Number" name="phone" type="tel" required />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium">
                    Best Time to Reach You <span className="text-crimson">*</span>
                  </span>
                  <select
                    name="bestTime"
                    required
                    defaultValue=""
                    className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="" disabled>Choose one…</option>
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                  </select>
                </label>
                <Field label="Best Way to Reach You (note)" name="timeNote" placeholder="e.g. Call on WhatsApp after 5pm" />
              </div>

              {error && (
                <div className="rounded-md border border-crimson/40 bg-crimson/5 px-3 py-2 text-sm text-crimson">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-2 inline-flex justify-center rounded-md bg-crimson text-white px-6 py-3 text-sm font-semibold hover:opacity-90 disabled:opacity-60 transition"
              >
                {status === "submitting" ? "Submitting…" : "Submit request"}
              </button>

              <p className="text-xs text-muted-foreground">
                Your information is used only to arrange your call and will not be shared publicly or with any third party outside this process.
              </p>
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
