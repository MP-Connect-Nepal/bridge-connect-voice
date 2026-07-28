import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHeader, Section } from "@/components/ui-bits";
import { useLang } from "@/lib/i18n";

const CONTACT_EMAIL = "mpconnectnepal@gmail.com";

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
  const { t } = useLang();
  return (
    <SiteLayout>
      <PageHeader eyebrow={t("contact_eyebrow")} title={t("contact_title")} lead={t("contact_lead")} />

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          <ContactCard title={t("contact_general")} desc={t("contact_general_d")} />
          <ContactCard title={t("contact_mp")} desc={t("contact_mp_d")} />
          <ContactCard title={t("contact_media")} desc={t("contact_media_d")} />
        </div>

        <div className="mt-12 card-modern p-6 md:p-8">
          <h2 className="font-serif text-xl font-semibold text-primary">{t("contact_commit_title")}</h2>
          <ul className="mt-4 space-y-2 text-sm text-foreground/80">
            <li>• {t("contact_commit_1")}</li>
            <li>• {t("contact_commit_2")}</li>
            <li>• {t("contact_commit_3")}</li>
          </ul>
        </div>
      </Section>
    </SiteLayout>
  );
}

function ContactCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="card-modern p-6">
      <h3 className="font-serif text-lg font-semibold text-primary">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
      <a href={`mailto:${CONTACT_EMAIL}`} className="mt-4 inline-block text-sm font-medium text-crimson hover:underline break-all">
        {CONTACT_EMAIL}
      </a>
    </div>
  );
}
