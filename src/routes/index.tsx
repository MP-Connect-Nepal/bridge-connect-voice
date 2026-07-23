import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Section, Eyebrow, TrustBadge } from "@/components/ui-bits";

const ctaClasses = "inline-flex items-center justify-center rounded-md bg-crimson text-white px-6 py-3.5 text-base font-semibold hover:opacity-90 transition";

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
        <div className="mx-auto max-w-6xl px-4 pt-14 pb-20 md:pt-24 md:pb-28">
          <TrustBadge />
          <h1 className="mt-6 font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-primary max-w-3xl leading-[1.05]">
            Your voice, delivered to your representative.
          </h1>
          <p className="mt-6 text-lg text-foreground/70 max-w-2xl">
            MPs sit in Kathmandu. You live in your constituency. MPConnectNepal
            bridges that distance — collecting your questions and ideas, and
            personally arranging video calls with the MP who represents you.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link to="/request-call" className={ctaClasses}>
              Request a Call with Your MP →
            </Link>
            <Link
              to="/how-it-works"
              className="inline-flex items-center justify-center rounded-md border border-border bg-card px-6 py-3.5 text-base font-medium hover:bg-secondary transition"
            >
              How it works
            </Link>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Free · Independent · Non-partisan · Available in English &amp; नेपाली
          </p>
        </div>
      </section>

      <Section>
        <Eyebrow>The process</Eyebrow>
        <h2 className="mt-3 font-serif text-3xl md:text-4xl font-semibold text-primary">
          Three simple steps.
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { n: "01", t: "Submit your request", d: "Tell us who you are, your constituency, and the question or idea you want to raise." },
            { n: "02", t: "We group by constituency", d: "We organize submissions so your MP hears from many constituents at once, not scattered messages." },
            { n: "03", t: "We arrange the call", d: "A shared video call is scheduled with your MP. Can't attend live? We'll relay your idea for you." },
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
            <Eyebrow>Why MPConnectNepal exists</Eyebrow>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl font-semibold text-primary">
              A gap between citizens and the people who represent them.
            </h2>
          </div>
          <div className="space-y-4 text-foreground/80 leading-relaxed">
            <p>Members of Parliament often want to hear from the people they serve — but with hundreds of thousands of constituents each, they have no reliable way to filter who to listen to.</p>
            <p>Meanwhile, engaged citizens with real ideas, local problems, or policy suggestions rarely get through. The result: a democracy where the two sides can't reliably talk to each other.</p>
            <p>MPConnectNepal fills that gap. We screen and organize citizen requests, then personally arrange video calls — free, on the record, and open to any citizen who wants to be heard.</p>
          </div>
        </div>
      </section>

      <Section className="py-12 md:py-14">
        <div className="rounded-lg border border-border bg-card p-6 md:p-8 text-center">
          <p className="text-sm md:text-base text-foreground/80 max-w-3xl mx-auto">
            <span className="font-semibold text-primary">MPConnectNepal is an independent, non-partisan civic nonprofit.</span>{" "}
            We are not affiliated with, endorsed by, or funded by any political party or the Government of Nepal.
          </p>
        </div>
      </Section>

      <Section className="py-12 md:py-16">
        <div className="rounded-xl bg-primary text-primary-foreground p-8 md:p-12 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold">Ready to be heard?</h2>
          <p className="mt-3 text-primary-foreground/80 max-w-xl mx-auto">
            Requesting a call takes about two minutes. There is no cost.
          </p>
          <Link
            to="/request-call"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-crimson text-white px-6 py-3 text-base font-semibold hover:opacity-90 transition"
          >
            Request a Call with Your MP →
          </Link>
        </div>
      </Section>
    </SiteLayout>
  );
}
