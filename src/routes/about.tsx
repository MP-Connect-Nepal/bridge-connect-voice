import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHeader, Section, Eyebrow } from "@/components/ui-bits";

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
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Our mission"
        title="Democracy works better when the two sides can talk."
        lead="MPConnectNepal was started to fix a small, stubborn problem: engaged citizens rarely get through to the people who represent them, and MPs rarely have a reliable way to hear from constituents."
      />

      <Section>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <Eyebrow>Founding story</Eyebrow>
            <h2 className="mt-3 font-serif text-2xl md:text-3xl font-semibold text-primary">Why we started this.</h2>
            <div className="mt-4 space-y-4 text-foreground/80 leading-relaxed">
              <p><em>[Placeholder — customize with founder story.]</em> After watching neighbours in our own constituency try — and fail — to get five minutes with their MP over local issues, we realised the problem wasn't lack of interest on either side. It was logistics.</p>
              <p>MPConnectNepal is our attempt to fix that logistics problem permanently, one constituency at a time, until every Nepali citizen has a reliable path to their representative.</p>
            </div>
          </div>
          <div>
            <Eyebrow>Our vision</Eyebrow>
            <h2 className="mt-3 font-serif text-2xl md:text-3xl font-semibold text-primary">Nationwide, across every constituency.</h2>
            <div className="mt-4 space-y-4 text-foreground/80 leading-relaxed">
              <p>Start in a handful of constituencies. Prove the model with real, respectful calls that produce real outcomes. Then recruit constituency-level volunteers to expand across all 165 electoral constituencies of Nepal.</p>
              <p>Long term: any citizen in any district should be able to request a call with their MP and know that a trustworthy, non-partisan organization will make it happen.</p>
            </div>
          </div>
        </div>
      </Section>

      <section className="bg-secondary/50 border-y border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <Eyebrow>Meet the team</Eyebrow>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl font-semibold text-primary">The people behind it.</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="h-20 w-20 rounded-full bg-secondary grid place-items-center font-serif text-2xl text-primary">F</div>
              <h3 className="mt-4 font-serif text-lg font-semibold">[Founder Name]</h3>
              <p className="text-sm text-crimson">President &amp; Founder</p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">[Placeholder bio — background, why they started MPConnectNepal, and their long-term commitment to civic engagement in Nepal.]</p>
            </div>
            <div className="rounded-lg border border-dashed border-border p-6 grid place-items-center text-center text-muted-foreground">
              <div>
                <p className="font-medium text-foreground">Volunteer team</p>
                <p className="mt-1 text-sm">Constituency coordinators across Nepal.</p>
              </div>
            </div>
            <div className="rounded-lg border border-dashed border-border p-6 grid place-items-center text-center text-muted-foreground">
              <div>
                <p className="font-medium text-foreground">Join us</p>
                <p className="mt-1 text-sm">We're actively looking for people who care.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="rounded-lg border border-border bg-card p-8 md:p-10">
          <Eyebrow>Our commitment</Eyebrow>
          <h2 className="mt-3 font-serif text-2xl md:text-3xl font-semibold text-primary">Non-partisan. Independent. Always.</h2>
          <p className="mt-4 text-foreground/80 leading-relaxed max-w-3xl">MPConnectNepal does not endorse candidates, parties, or ideologies. We do not accept funding that would compromise our independence. We serve every Nepali citizen — regardless of who they voted for, where they live, or what they believe.</p>
        </div>
      </Section>
    </SiteLayout>
  );
}
