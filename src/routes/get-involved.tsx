import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHeader, Section } from "@/components/ui-bits";

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
  const [submitted, setSubmitted] = useState(false);
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Volunteer"
        title="Help us reach every constituency."
        lead="MPConnectNepal grows one volunteer at a time. Whether you have an hour a week or a day, there's a role for you."
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { t: "Review submissions", d: "Read incoming citizen requests, tag them by constituency and topic, and help us group them for MP outreach." },
            { t: "Coordinate outreach", d: "Help contact MP offices, schedule calls, and moderate video sessions between constituents and MPs." },
            { t: "Expand to your district", d: "Become the constituency lead for your area — build local trust and be the friendly face of MPConnectNepal on the ground." },
          ].map((r) => (
            <div key={r.t} className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-serif text-lg font-semibold text-primary">{r.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{r.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-secondary/50 border-y border-border">
        <div className="mx-auto max-w-3xl px-4 py-16 md:py-20">
          <h2 className="font-serif text-3xl font-semibold text-primary">Sign up to volunteer</h2>
          <p className="mt-3 text-foreground/80">Tell us a little about yourself and how you'd like to help. We'll be in touch within a week.</p>

          {submitted ? (
            <div className="mt-8 rounded-lg border border-border bg-card p-8 text-center">
              <h3 className="font-serif text-xl font-semibold text-primary">धन्यवाद — Thank you!</h3>
              <p className="mt-2 text-muted-foreground">Your response has been noted. We'll reach out soon.</p>
            </div>
          ) : (
            <form
              className="mt-8 grid gap-4 rounded-lg border border-border bg-card p-6"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <VField label="Full name" name="name" required />
              <VField label="Email" name="email" type="email" required />
              <VField label="Constituency (or district)" name="constituency" required />
              <label className="block">
                <span className="text-sm font-medium">How would you like to help?</span>
                <select
                  name="role"
                  required
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Choose one…</option>
                  <option>Review submissions</option>
                  <option>Coordinate outreach</option>
                  <option>Become a constituency lead</option>
                  <option>Other / open to anything</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-medium">Anything else? (optional)</span>
                <textarea
                  name="notes"
                  rows={3}
                  maxLength={1000}
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </label>
              <button
                type="submit"
                className="mt-2 inline-flex justify-center rounded-md bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90"
              >
                Submit
              </button>
              <p className="text-xs text-muted-foreground">We use your details only to coordinate with you as a volunteer.</p>
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
