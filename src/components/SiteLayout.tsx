import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/about", label: "About" },
  { to: "/for-representatives", label: "For Representatives" },
  { to: "/get-involved", label: "Get Involved" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-primary focus:text-primary-foreground focus:px-3 focus:py-2 focus:rounded"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:flex lg:justify-between">
          <Link to="/" className="flex items-center gap-2 min-w-0" onClick={() => setOpen(false)}>
            <span className="grid place-items-center h-9 w-9 rounded-md bg-primary text-primary-foreground shrink-0">
              <span className="font-serif font-semibold">M</span>
            </span>
            <span className="flex flex-col leading-tight min-w-0">
              <span className="font-serif text-base font-semibold truncate">MPConnectNepal</span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground truncate">
                Independent · Non-partisan
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="px-3 py-2 text-sm text-foreground/80 rounded-md hover:bg-secondary hover:text-foreground transition"
                activeProps={{ className: "px-3 py-2 text-sm rounded-md bg-secondary text-foreground font-medium" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#google-form-link"
              className="hidden sm:inline-flex items-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition"
            >
              Request a Call
            </a>
            <button
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-md border border-border"
            >
              <span className="sr-only">Menu</span>
              <div className="flex flex-col gap-1">
                <span className="block h-0.5 w-4 bg-foreground" />
                <span className="block h-0.5 w-4 bg-foreground" />
                <span className="block h-0.5 w-4 bg-foreground" />
              </div>
            </button>
          </div>
        </div>
        {open && (
          <div className="lg:hidden border-t border-border">
            <nav className="mx-auto max-w-6xl px-4 py-2 flex flex-col">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="px-2 py-3 text-sm border-b border-border/60 last:border-b-0"
                  activeProps={{ className: "px-2 py-3 text-sm border-b border-border/60 last:border-b-0 font-semibold text-primary" }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {n.label}
                </Link>
              ))}
              <a
                href="#google-form-link"
                className="mt-2 mb-3 inline-flex justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium"
                onClick={() => setOpen(false)}
              >
                Request a Call
              </a>
            </nav>
          </div>
        )}
      </header>

      <main id="main" className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border bg-secondary/40 mt-16">
        <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid place-items-center h-8 w-8 rounded-md bg-primary text-primary-foreground font-serif">M</span>
              <span className="font-serif font-semibold">MPConnectNepal</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              An independent, non-partisan civic nonprofit connecting Nepali citizens with
              their elected representatives.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Nonprofit registration: <span className="italic">pending</span>
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Explore</h4>
            <ul className="space-y-2 text-sm">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-foreground/80 hover:text-primary">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="mailto:hello@mpconnectnepal.org" className="hover:text-primary">
                  hello@mpconnectnepal.org
                </a>
              </li>
              <li>Kathmandu, Nepal</li>
              <li className="flex gap-3 pt-2">
                <a href="#" className="hover:text-primary">Twitter</a>
                <a href="#" className="hover:text-primary">Facebook</a>
                <a href="#" className="hover:text-primary">LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-muted-foreground flex flex-col sm:flex-row gap-2 justify-between">
            <span>© {new Date().getFullYear()} MPConnectNepal. All rights reserved.</span>
            <span>Independent · Non-partisan · Not affiliated with any political party or the Government of Nepal.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
