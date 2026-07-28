import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Section, Eyebrow, TrustBadge } from "@/components/ui-bits";
import { Reveal, Parallax } from "@/components/Reveal";
import { useLang } from "@/lib/i18n";
import heroImage from "@/assets/virtual-call.jpg.asset.json";
import { useContent, useImageOverride } from "@/lib/content-hooks";
import { useSignedUrl } from "@/lib/signed-url";

const ctaClasses =
  "btn-press inline-flex items-center justify-center rounded-full bg-crimson text-white px-7 py-3.5 text-base font-semibold shadow-[var(--shadow-soft)]";

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
          style={{ background: "var(--gradient-hero)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -left-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 right-0 -z-10 h-[24rem] w-[24rem] rounded-full bg-crimson/10 blur-3xl"
        />
        <div className="mx-auto max-w-6xl px-4 pt-16 pb-20 md:pt-28 md:pb-32 grid gap-12 md:gap-14 md:grid-cols-2 md:items-center">
          <div className="enter-up">
            <TrustBadge />
            <h1 className="mt-6 font-serif text-[2.6rem] sm:text-5xl md:text-[3.75rem] font-semibold text-primary leading-[1.03] tracking-tight">
              {heroTitle}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-foreground/70 max-w-xl leading-relaxed">{heroLead}</p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link to="/request-call" className={ctaClasses}>
                {t("cta_request_arrow")}
              </Link>
              <Link
                to="/how-it-works"
                className="btn-press inline-flex items-center justify-center rounded-full glass px-7 py-3.5 text-base font-medium"
              >
                {t("how_link")}
              </Link>
            </div>
            <p className="mt-5 text-xs text-muted-foreground">{t("home_hero_meta")}</p>
          </div>
          <Parallax speed={0.05} scale={0.03} className="relative">
            <div className="media-frame aspect-[5/4] w-full bg-secondary">
              <img
                src={heroSrc}
                alt={t("hero_image_alt")}
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
          </Parallax>
        </div>
      </section>

      <Section>
        <Eyebrow>{t("home_how_eyebrow")}</Eyebrow>
        <h2 className="mt-4 font-serif text-3xl md:text-5xl font-semibold text-primary">
          {t("home_how_title")}
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { n: "01", t: t("home_step1_t"), d: t("home_step1_d") },
            { n: "02", t: t("home_step2_t"), d: t("home_step2_d") },
            { n: "03", t: t("home_step3_t"), d: t("home_step3_d") },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 110}>
              <div className="card-modern h-full p-8">
                <div className="text-crimson font-serif text-3xl">{s.n}</div>
                <h3 className="mt-4 font-serif text-xl font-semibold">{s.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <section className="relative border-y border-border/70 surface-gradient">
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28 grid gap-10 md:gap-14 md:grid-cols-2 md:items-start">
          <Reveal>
            <Eyebrow>{t("home_why_eyebrow")}</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl font-semibold text-primary">
              {t("home_why_title")}
            </h2>
          </Reveal>
          <Reveal delay={120} className="space-y-5 text-foreground/80 leading-[1.8] md:text-lg">
            <p>{whyP1}</p>
            <p>{whyP2}</p>
            <p>{whyP3}</p>
          </Reveal>
        </div>
      </section>

      <Section className="py-16 md:py-20">
        <div className="card-modern p-8 md:p-10 text-center">
          <p className="text-sm md:text-base text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            {disclaimer}
          </p>
        </div>
      </Section>

      <Section className="pb-24 pt-4 md:pb-32 md:pt-6">
        <div
          className="relative overflow-hidden rounded-3xl text-primary-foreground p-10 md:p-16 text-center shadow-[var(--shadow-media)]"
          style={{ backgroundImage: "var(--gradient-primary)" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          />
          <h2 className="font-serif text-3xl md:text-5xl font-semibold">{t("home_ready")}</h2>
          <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto md:text-lg">{t("home_ready_sub")}</p>
          <Link
            to="/request-call"
            className="btn-press mt-8 inline-flex items-center justify-center rounded-full bg-crimson text-white px-7 py-3.5 text-base font-semibold shadow-[var(--shadow-soft)]"
          >
            {t("cta_request_arrow")}
          </Link>
        </div>
      </Section>
    </SiteLayout>
  );
}
