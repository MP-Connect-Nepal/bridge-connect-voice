import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHeader, Section, Eyebrow } from "@/components/ui-bits";
import sunilAsset from "@/assets/sunil-chaudhary.jpg.asset.json";
import himalAsset from "@/assets/himal-subedi.png.asset.json";

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
              <p>After watching people in our own constituencies try — and fail — to get five minutes with their MP over real local issues, we realised the problem wasn't lack of interest on either side. It was logistics, and the absence of a professional, well-timed channel.</p>
              <p>MPConnectNepal is our attempt to fix that permanently, one constituency at a time, until every Nepali citizen has a reliable path to their representative.</p>
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

          <div className="mt-10 grid gap-8 lg:grid-cols-[2fr_1fr] items-start">
            <div className="rounded-lg border border-border bg-card p-6 md:p-8">
              <div className="flex flex-col sm:flex-row gap-6">
                <img
                  src={sunilAsset.url}
                  alt="Sunil K. Chaudhary"
                  className="h-32 w-32 rounded-full object-cover border border-border shrink-0"
                />
                <div>
                  <h3 className="font-serif text-xl font-semibold text-primary">Sunil K. Chaudhary</h3>
                  <p className="text-sm text-crimson font-medium">Founder</p>
                  <div className="mt-4 space-y-3 text-sm text-foreground/80 leading-relaxed">
                    <p>
                      "I've often seen our country's representatives asking their own citizens for the problems and solutions they should be raising in parliament. But what I noticed is that the people who end up talking to them are often random, and the conversations aren't professional or productive. At the same time, I've seen many bright, thoughtful people who genuinely want to talk to their representatives but never get the chance. The core issue was clear: there was no channel to bring together the people of a specific constituency and give them a well-organized, properly timed conversation with their representative."
                    </p>
                    <p>
                      "At MPConnectNepal, we're committed to making that process more professional — helping people communicate more clearly and thoughtfully, from how they write their message to how they present it, so they walk away feeling genuinely heard. At the same time, we help save our MPs' time by filtering out unproductive or unprepared calls. And while MPs are in Kathmandu for extended periods, they get to hear about the real problems and real solutions worth raising in parliament."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <img
                src={himalAsset.url}
                alt="Himal Subedi"
                className="mx-auto h-28 w-28 rounded-full object-cover border border-border"
              />
              <h3 className="mt-4 font-serif text-lg font-semibold text-primary">Himal Subedi</h3>
              <p className="text-sm text-crimson font-medium">Program Associate</p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-dashed border-border p-6 text-muted-foreground">
              <p className="font-medium text-foreground">Volunteer team</p>
              <p className="mt-1 text-sm">Constituency coordinators across Nepal.</p>
            </div>
            <div className="rounded-lg border border-dashed border-border p-6 text-muted-foreground flex items-center justify-between gap-4">
              <div>
                <p className="font-medium text-foreground">Join us</p>
                <p className="mt-1 text-sm">We're actively looking for people who care.</p>
              </div>
              <Link
                to="/get-involved"
                className="inline-flex items-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90"
              >
                Join Us
              </Link>
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
