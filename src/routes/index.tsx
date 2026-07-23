import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Section, Eyebrow, TrustBadge } from "@/components/ui-bits";
import { useLang } from "@/lib/i18n";
import heroImage from "@/assets/virtual-call.jpg.asset.json";
import { useContent, useImageOverride } from "@/lib/content-hooks";
import { useSignedUrl } from "@/lib/signed-url";

const ctaClasses =
  "inline-flex items-center justify-center rounded-md bg-crimson text-white px-6 py-3.5 text-base font-semibold hover:opacity-90 transition";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MPConnectNepal — Your voice, delivered to your representative" },
      {
        name: "description",
        content:
          "An independent, non-partisan nonprofit that organizes video calls between Nepali citizens and their Members of Parliament.",
      },
      { property: "og:title", content: "MPConnectNepal — Your voice, delivered to your representative" },
      {
        property: "og:description",
        content:
          "An independent, non-partisan nonprofit that organizes video calls between Nepali citizens and their Members of Parliament.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { t } = useLang();
  const heroTitle = useContent("home_hero_title", t("home_hero_title"));
  const heroLead = useContent("home_hero_lead", t("home_hero_lead"));
  const whyP1 = useContent("home_why_p1", t("home_why_p1"));
  const whyP2 = useContent("home_why_p2", t("home_why_p2"));
  const whyP3 = useContent("home_why_p3", t("home_why_p3"));
  const disclaimer = useContent("home_disclaimer", t("home_disclaimer"));
  const heroImg = useImageOverride("home_hero");
  const heroOverride = useSignedUrl("site-assets", heroImg.data?.storage_path);
  const heroSrc = heroOverride ?? heroImage.url;
  return (
    <SiteLayout>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.97 0.02 240) 0%, oklch(0.985 0.005 90) 100%)",
          }}
        />
        <div className="mx-auto max-w-6xl px-4 pt-12 pb-16 md:pt-20 md:pb-24 grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <TrustBadge />
            <h1 className="mt-5 font-serif text-4xl sm:text-5xl md:text-[3.25rem] font-semibold text-primary leading-[1.05]">
              {heroTitle}
            </h1>
            <p className="mt-5 text-lg text-foreground/70 max-w-xl">{heroLead}</p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link to="/request-call" className={ctaClasses}>
                {t("cta_request_arrow")}
              </Link>
              <Link
                to="/how-it-works"
                className="inline-flex items-center justify-center rounded-md border border-border bg-card px-6 py-3.5 text-base font-medium hover:bg-secondary transition"
              >
                {t("how_link")}
              </Link>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">{t("home_hero_meta")}</p>
          </div>
          <div className="relative">
            <div className="aspect-[5/4] w-full overflow-hidden rounded-2xl border border-border bg-secondary shadow-sm">
              <img
                src={heroSrc}
                alt={t("hero_image_alt")}
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      <Section>
        <Eyebrow>{t("home_how_eyebrow")}</Eyebrow>
        <h2 className="mt-3 font-serif text-3xl md:text-4xl font-semibold text-primary">
          {t("home_how_title")}
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { n: "01", t: t("home_step1_t"), d: t("home_step1_d") },
            { n: "02", t: t("home_step2_t"), d: t("home_step2_d") },
            { n: "03", t: t("home_step3_t"), d: t("home_step3_d") },
          ].map((s) => (
            <div key={s.n} className="rounded-lg border border-border bg-card p-6 hover:shadow-sm transition">
              <div className="text-crimson font-serif text-2xl">{s.n}</div>
              <h3 className="mt-3 font-serif text-xl font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-secondary/50 border-y border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20 grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <Eyebrow>{t("home_why_eyebrow")}</Eyebrow>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl font-semibold text-primary">
              {t("home_why_title")}
            </h2>
          </div>
          <div className="space-y-4 text-foreground/80 leading-relaxed">
            <p>{whyP1}</p>
            <p>{whyP2}</p>
            <p>{whyP3}</p>
          </div>
        </div>
      </section>

      <Section className="py-12 md:py-14">
        <div className="rounded-lg border border-border bg-card p-6 md:p-8 text-center">
          <p className="text-sm md:text-base text-foreground/80 max-w-3xl mx-auto">
            {disclaimer}
          </p>
        </div>
      </Section>

      <Section className="py-12 md:py-16">
        <div className="rounded-xl bg-primary text-primary-foreground p-8 md:p-12 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold">{t("home_ready")}</h2>
          <p className="mt-3 text-primary-foreground/80 max-w-xl mx-auto">{t("home_ready_sub")}</p>
          <Link
            to="/request-call"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-crimson text-white px-6 py-3 text-base font-semibold hover:opacity-90 transition"
          >
            {t("cta_request_arrow")}
          </Link>
        </div>
      </Section>
    </SiteLayout>
  );
}
