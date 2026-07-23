import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHeader, Section } from "@/components/ui-bits";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — MPConnectNepal" },
      {
        name: "description",
        content:
          "The step-by-step process for how MPConnectNepal organizes citizen requests and arranges video calls with Members of Parliament.",
      },
      { property: "og:title", content: "How It Works — MPConnectNepal" },
      { property: "og:description", content: "From submission to a real conversation with your MP." },
    ],
  }),
  component: HowItWorks,
});

const steps = [
  { t: "You submit a request", d: "Fill out a short form with your name, contact info, constituency, and the topic or question you want to raise." },
  { t: "We review and group by constituency", d: "Our team reads every submission and organizes people by the constituency they live in, so your MP hears a clear signal — not scattered noise." },
  { t: "We reach out to your MP's office", d: "Once we have enough interest from a constituency, we formally request time with the MP on your behalf." },
  { t: "A shared video call is scheduled", d: "We host the call on Google Meet with the MP, the participating citizens, and an MPConnectNepal representative to keep things organized." },
  { t: "Can't attend? We relay for you", d: "If a live call doesn't work for you, we'll present your question or idea to the MP on your behalf and share the response back with you." },
];

const faqs = [
  { q: "Is this free?", a: "Yes. MPConnectNepal is a nonprofit initiative. Citizens are never charged to submit a request or participate in a call." },
  { q: "Will my MP definitely respond?", a: "We can't guarantee a response from every MP — participation is at their discretion. What we do guarantee is that your request is organized, presented professionally, and delivered to the right office." },
  { q: "How long does it take?", a: "It depends on your constituency and your MP's availability. Some calls are arranged within a few weeks; others take longer. We'll keep you updated at every stage." },
  { q: "Is my information kept private?", a: "Yes. We only share your details with your MP's office in the context of arranging a call. We do not sell, publish, or share personal data with third parties." },
  { q: "Who is behind MPConnectNepal?", a: "MPConnectNepal is run by an independent, non-partisan team of Nepali citizens who believe democracy works better when representatives can actually hear from the people they represent." },
];

function HowItWorks() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="The process"
        title="How MPConnectNepal works."
        lead="From the moment you submit a request to the moment you speak with your MP — here's exactly what happens."
      />

      <Section className="pt-6">
        <ol className="space-y-6">
          {steps.map((s, i) => (
            <li key={s.t} className="grid grid-cols-[auto_1fr] gap-5 rounded-lg border border-border bg-card p-6">
              <div className="grid place-items-center h-10 w-10 rounded-full bg-primary text-primary-foreground font-serif font-semibold shrink-0">
                {i + 1}
              </div>
              <div className="min-w-0">
                <h3 className="font-serif text-xl font-semibold text-primary">{s.t}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <section className="bg-secondary/50 border-y border-border">
        <div className="mx-auto max-w-3xl px-4 py-16 md:py-20">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-primary">Frequently asked questions</h2>
          <div className="mt-8 divide-y divide-border rounded-lg border border-border bg-card">
            {faqs.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      <Section className="text-center">
        <h2 className="font-serif text-3xl font-semibold text-primary">Ready to submit your request?</h2>
        <a
          href="#google-form-link"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-3 font-medium hover:opacity-90 transition"
        >
          Request a Call with Your MP →
        </a>
      </Section>
    </SiteLayout>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 hover:bg-secondary/50 transition"
        aria-expanded={open}
      >
        <span className="font-medium text-foreground">{q}</span>
        <span className="text-crimson text-xl leading-none shrink-0">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="px-5 pb-5 text-muted-foreground leading-relaxed">{a}</div>}
    </div>
  );
}
