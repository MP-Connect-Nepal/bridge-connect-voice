import type { ReactNode } from "react";

export function Section({
  children, className = "", id,
}: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-4 py-16 md:py-20 ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block text-xs uppercase tracking-[0.15em] text-crimson font-medium">
      {children}
    </span>
  );
}

export function PageHeader({
  eyebrow, title, lead,
}: { eyebrow?: string; title: string; lead?: string }) {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-14 pb-4 md:pt-20">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h1 className="mt-3 font-serif text-4xl md:text-5xl font-semibold text-primary max-w-3xl">
        {title}
      </h1>
      {lead && <p className="mt-4 text-lg text-muted-foreground max-w-2xl">{lead}</p>}
    </div>
  );
}

export function TrustBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-foreground/80">
      <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
      Independent nonprofit · Non-partisan
    </div>
  );
}
