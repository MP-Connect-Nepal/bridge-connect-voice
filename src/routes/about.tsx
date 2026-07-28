import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHeader, Section, Eyebrow } from "@/components/ui-bits";
import sunilAsset from "@/assets/sunil-chaudhary.jpg.asset.json";
import himalAsset from "@/assets/himal-subedi.png.asset.json";
import { useLang } from "@/lib/i18n";
import { useContent, useImageOverride } from "@/lib/content-hooks";
import { useSignedUrl } from "@/lib/signed-url";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — MPConnectNepal" },
      { name: "description", content: "Our mission: build reliable, non-partisan bridges between Nepali citizens and their elected representatives." },
      { property: "og:title", content: "About MPConnectNepal" },
      { property: "og:description", content: "Why we exist, and the people building it." },
    ],
  }),
  component: About,
});

function About() {
  const { t } = useLang();
  const founderBio = useContent("about_founder_bio", "");
  const programBio = useContent("about_program_bio", "");
  const founderImg = useImageOverride("about_founder");
  const programImg = useImageOverride("about_program");
  const founderUrl = useSignedUrl("site-assets", founderImg.data?.storage_path) ?? sunilAsset.url;
  const programUrl = useSignedUrl("site-assets", programImg.data?.storage_path) ?? himalAsset.url;
  return (
    <SiteLayout>
      <PageHeader eyebrow={t("about_eyebrow")} title={t("about_title")} lead={t("about_lead")} />

      <Section>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <Eyebrow>{t("about_story_eyebrow")}</Eyebrow>
            <h2 className="mt-3 font-serif text-2xl md:text-3xl font-semibold text-primary">{t("about_story_title")}</h2>
            <div className="mt-4 space-y-4 text-foreground/80 leading-relaxed">
              <p>{t("about_story_p1")}</p>
              <p>{t("about_story_p2")}</p>
            </div>
          </div>
          <div>
            <Eyebrow>{t("about_vision_eyebrow")}</Eyebrow>
            <h2 className="mt-3 font-serif text-2xl md:text-3xl font-semibold text-primary">{t("about_vision_title")}</h2>
            <div className="mt-4 space-y-4 text-foreground/80 leading-relaxed">
              <p>{t("about_vision_p1")}</p>
              <p>{t("about_vision_p2")}</p>
            </div>
          </div>
        </div>
      </Section>

      <section className="bg-secondary/50 border-y border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <Eyebrow>{t("about_team_eyebrow")}</Eyebrow>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl font-semibold text-primary">{t("about_team_title")}</h2>

          <div className="mt-10 grid gap-8 lg:grid-cols-[2fr_1fr] items-start">
            <div className="card-modern p-6 md:p-8">
              <div className="flex flex-col sm:flex-row gap-6">
                <img
                  src={founderUrl}
                  alt="Sunil K. Chaudhary"
                  className="h-32 w-32 rounded-full object-cover border border-border shrink-0"
                />
                <div>
                  <h3 className="font-serif text-xl font-semibold text-primary">Sunil K. Chaudhary</h3>
                  <p className="text-sm text-crimson font-medium">{t("about_founder_role")}</p>
                  <div className="mt-4 space-y-3 text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
                    {founderBio ? <p>{founderBio}</p> : (<><p>{t("about_bio_p1")}</p><p>{t("about_bio_p2")}</p></>)}
                  </div>
                </div>
              </div>
            </div>

            <div className="card-modern p-6 text-center">
              <img
                src={programUrl}
                alt="Himal Subedi"
                className="mx-auto h-28 w-28 rounded-full object-cover border border-border"
              />
              <h3 className="mt-4 font-serif text-lg font-semibold text-primary">Himal Subedi</h3>
              <p className="text-sm text-crimson font-medium">{t("about_associate_role")}</p>
              {programBio && <p className="mt-3 text-sm text-foreground/80 whitespace-pre-wrap">{programBio}</p>}
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-dashed border-border p-6 text-muted-foreground">
              <p className="font-medium text-foreground">{t("about_vol_team")}</p>
              <p className="mt-1 text-sm">{t("about_vol_desc")}</p>
            </div>
            <div className="rounded-lg border border-dashed border-border p-6 text-muted-foreground flex items-center justify-between gap-4">
              <div>
                <p className="font-medium text-foreground">{t("about_join_title")}</p>
                <p className="mt-1 text-sm">{t("about_join_desc")}</p>
              </div>
              <Link
                to="/get-involved"
                className="inline-flex items-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90"
              >
                {t("about_join_cta")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="card-modern p-8 md:p-10">
          <Eyebrow>{t("about_commit_eyebrow")}</Eyebrow>
          <h2 className="mt-3 font-serif text-2xl md:text-3xl font-semibold text-primary">{t("about_commit_title")}</h2>
          <p className="mt-4 text-foreground/80 leading-relaxed max-w-3xl">{t("about_commit_p")}</p>
        </div>
      </Section>
    </SiteLayout>
  );
}
