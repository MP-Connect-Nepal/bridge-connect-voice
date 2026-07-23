import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHeader, Section } from "@/components/ui-bits";

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
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="For MPs & Staff"
        title="Hear from your constituents — without the noise."
        lead="MPConnectNepal filters, groups, and organizes citizen requests by constituency so your time on the call goes to real, substantive input."
      />

      <Section className="pt-6">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { t: "Pre-screened requests", d: "Every submission is reviewed by our team. Duplicates, spam, and off-topic messages don't reach you." },
            { t: "Grouped by constituency", d: "You hear from many of your own constituents at once, in a single organized session." },
            { t: "Logistics fully handled", d: "We schedule, host on Google Meet, moderate the session, and share notes back with participants." },
          ].map((b) => (
            <div key={b.t} className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-serif text-lg font-semibold text-primary">{b.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-secondary/50 border-y border-border">
        <div className="mx-auto max-w-3xl px-4 py-16 md:py-20">
          <h2 className="font-serif text-3xl font-semibold text-primary">Partner with us</h2>
          <p className="mt-3 text-foreground/80">If you're an MP or a member of an MP's office, we'd love to hear from you. Fill out the short form below and we'll be in touch to discuss a pilot session.</p>

          <form
            className="mt-8 grid gap-4 rounded-lg border border-border bg-card p-6"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const subject = encodeURIComponent("MP Partnership inquiry — MPConnectNepal");
              const body = encodeURIComponent(
                `Name: ${data.get("name")}\nRole / Office: ${data.get("role")}\nConstituency: ${data.get("constituency")}\nEmail: ${data.get("email")}\n\nMessage:\n${data.get("message")}`
              );
              window.location.href = `mailto:partners@mpconnectnepal.org?subject=${subject}&body=${body}`;
            }}
          >
            <Field label="Name" name="name" required />
            <Field label="Role / Office" name="role" placeholder="e.g. Chief of Staff, MP Office" required />
            <Field label="Constituency" name="constituency" required />
            <Field label="Email" name="email" type="email" required />
            <label className="block">
              <span className="text-sm font-medium">Message</span>
              <textarea
                name="message"
                rows={4}
                required
                maxLength={1000}
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
            <button
              type="submit"
              className="mt-2 inline-flex justify-center rounded-md bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90"
            >
              Send inquiry
            </button>
            <p className="text-xs text-muted-foreground">
              Or email us directly at <a href="mailto:partners@mpconnectnepal.org" className="underline">partners@mpconnectnepal.org</a>.
            </p>
          </form>
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
        maxLength={200}
        className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}
