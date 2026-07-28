import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHeader, Section } from "@/components/ui-bits";
import { useLang } from "@/lib/i18n";

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

function HowItWorks() {
  const { t } = useLang();
  const steps = [
    { t: t("how_s1_t"), d: t("how_s1_d") },
    { t: t("how_s2_t"), d: t("how_s2_d") },
    { t: t("how_s3_t"), d: t("how_s3_d") },
    { t: t("how_s4_t"), d: t("how_s4_d") },
    { t: t("how_s5_t"), d: t("how_s5_d") },
  ];
  const faqs = [
    { q: t("faq_q1"), a: t("faq_a1") },
    { q: t("faq_q2"), a: t("faq_a2") },
    { q: t("faq_q3"), a: t("faq_a3") },
    { q: t("faq_q4"), a: t("faq_a4") },
    { q: t("faq_q5"), a: t("faq_a5") },
  ];

  return (
    <SiteLayout>
      <PageHeader eyebrow={t("how_eyebrow")} title={t("how_title")} lead={t("how_lead")} />

      <Section className="pt-6">
        <ol className="space-y-6">
          {steps.map((s, i) => (
            <li key={s.t} className="grid grid-cols-[auto_1fr] gap-5 card-modern p-6">
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
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-primary">{t("how_faq")}</h2>
          <div className="mt-8 divide-y divide-border card-modern">
            {faqs.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      <Section className="text-center">
        <h2 className="font-serif text-3xl font-semibold text-primary">{t("how_ready")}</h2>
        <Link
          to="/request-call"
          className="mt-6 inline-flex items-center justify-center btn-press rounded-full bg-crimson text-white px-6 py-3 font-semibold hover:opacity-90 transition"
        >
          {t("cta_request_arrow")}
        </Link>
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
