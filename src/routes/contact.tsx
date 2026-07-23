import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHeader, Section } from "@/components/ui-bits";

const CONTACT_EMAIL = "suunil428@gmail.com";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — MPConnectNepal" },
      { name: "description", content: "Get in touch with MPConnectNepal — for citizens, MP offices, media, and partnership inquiries." },
      { property: "og:title", content: "Contact MPConnectNepal" },
      { property: "og:description", content: "We'd love to hear from you." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch."
        lead="Questions, ideas, or want to partner with us? Reach out — we read every message."
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          <ContactCard title="General" desc="Citizens, questions, or anything else." />
          <ContactCard title="MP offices" desc="Partnership and pilot session inquiries." />
          <ContactCard title="Media" desc="Interviews, coverage, and press inquiries." />
        </div>

        <div className="mt-12 rounded-lg border border-border bg-card p-6 md:p-8">
          <h2 className="font-serif text-xl font-semibold text-primary">Our commitments to you</h2>
          <ul className="mt-4 space-y-2 text-sm text-foreground/80">
            <li>• We reply to every message within 5 working days.</li>
            <li>• We never share your contact details with third parties.</li>
            <li>• MPConnectNepal is an independent, non-partisan nonprofit — not affiliated with any political party or the Government of Nepal.</li>
          </ul>
        </div>
      </Section>
    </SiteLayout>
  );
}

function ContactCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="font-serif text-lg font-semibold text-primary">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
      <a href={`mailto:${CONTACT_EMAIL}`} className="mt-4 inline-block text-sm font-medium text-crimson hover:underline break-all">
        {CONTACT_EMAIL}
      </a>
    </div>
  );
}
