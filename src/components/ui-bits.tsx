import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

export function Section({
  children, className = "", id,
}: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-4 py-20 md:py-28 ${className}`}>
      <Reveal>{children}</Reveal>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-crimson font-semibold">
      <span className="h-px w-6 bg-crimson/60" aria-hidden />
      {children}
    </span>
  );
}

export function PageHeader({
  eyebrow, title, lead,
}: { eyebrow?: string; title: string; lead?: string }) {
  return (
    <div className="relative overflow-hidden border-b border-border/60">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 surface-gradient"
      />
      <div
        aria-hidden
        className="absolute -top-32 -right-24 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
      />
      <div className="mx-auto max-w-6xl px-4 pt-20 pb-12 md:pt-28 md:pb-16 enter-up">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="mt-4 font-serif text-4xl md:text-6xl font-semibold text-primary max-w-3xl">
          {title}
        </h1>
        {lead && <p className="mt-5 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">{lead}</p>}
      </div>
    </div>
  );
}

export function TrustBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium text-foreground/80 shadow-[var(--shadow-soft)]">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson/70" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-crimson" />
      </span>
      Independent nonprofit · Non-partisan
    </div>
  );
}
