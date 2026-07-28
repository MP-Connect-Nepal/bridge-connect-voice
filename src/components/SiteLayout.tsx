import { Link, useNavigate } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import logoAsset from "@/assets/mpconnectnepal-logo.png.asset.json";
import { useLang, type Lang } from "@/lib/i18n";
import { useAuth } from "@/lib/auth-context";
import { useContent } from "@/lib/content-hooks";

const navItems = [
  { to: "/", key: "nav_home" },
  { to: "/how-it-works", key: "nav_how" },
  { to: "/about", key: "nav_about" },
  { to: "/for-representatives", key: "nav_reps" },
  { to: "/get-involved", key: "nav_involved" },
  { to: "/wall", key: "nav_wall" },
  { to: "/contact", key: "nav_contact" },
] as const;

function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useLang();
  const next: Lang = lang === "en" ? "ne" : "en";
  return (
    <button
      type="button"
      onClick={() => setLang(next)}
      aria-label={t("lang_switch_aria")}
      className={`inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-secondary transition ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3.5 w-3.5"
        aria-hidden
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15 15 0 0 1 0 20a15 15 0 0 1 0-20" />
      </svg>
      <span>{t("lang_switch_label")}</span>
    </button>
  );
}

function UserMenu() {
  const { user, isAdmin, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { t } = useLang();
  if (!user) {
    return (
      <Link to="/auth" className="inline-flex items-center rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium hover:bg-secondary">
        {t("nav_signin")}
      </Link>
    );
  }
  const label = (profile?.display_name || user.email || "U").slice(0, 1).toUpperCase();
  return (
    <div className="relative">
      <button onClick={() => setOpen((v) => !v)} className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
        {label}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-md border border-border bg-card shadow-md z-50 py-1 text-sm">
          <div className="px-3 py-2 text-xs text-muted-foreground truncate">{profile?.display_name || user.email}</div>
          <button onClick={() => { setOpen(false); navigate({ to: "/account" }); }} className="block w-full text-left px-3 py-2 hover:bg-secondary">{t("nav_account")}</button>
          {isAdmin && <button onClick={() => { setOpen(false); navigate({ to: "/admin" }); }} className="block w-full text-left px-3 py-2 hover:bg-secondary">{t("nav_admin")}</button>}
          <button onClick={async () => { setOpen(false); await signOut(); navigate({ to: "/" }); }} className="block w-full text-left px-3 py-2 hover:bg-secondary">{t("nav_signout")}</button>
        </div>
      )}
    </div>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { t } = useLang();
  const contactEmail = useContent("contact_email", "mpconnectnepal@gmail.com");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-primary focus:text-primary-foreground focus:px-3 focus:py-2 focus:rounded"
      >
        {t("skip")}
      </a>
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:flex lg:justify-between">
          <Link to="/" className="flex items-center gap-3 min-w-0" onClick={() => setOpen(false)}>
            <img
              src={logoAsset.url}
              alt="MPConnectNepal logo"
              className="h-14 w-14 rounded-md object-contain shrink-0"
            />
            <span className="flex flex-col leading-tight min-w-0">
              <span className="font-serif text-lg font-semibold text-primary truncate">MPConnectNepal</span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground truncate">
                {t("brand_tag")}
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="px-3 py-2 text-sm text-foreground/80 rounded-md hover:bg-secondary hover:text-foreground transition"
                activeProps={{ className: "px-3 py-2 text-sm rounded-md bg-secondary text-foreground font-medium" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {t(n.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LangToggle />
            <UserMenu />
            <Link
              to="/request-call"
              className="hidden sm:inline-flex items-center rounded-md bg-crimson text-white px-4 py-2 text-sm font-semibold hover:opacity-90 transition"
            >
              {t("cta_request")}
            </Link>
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
              {navItems.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="px-2 py-3 text-sm border-b border-border/60 last:border-b-0"
                  activeProps={{ className: "px-2 py-3 text-sm border-b border-border/60 last:border-b-0 font-semibold text-primary" }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {t(n.key)}
                </Link>
              ))}
              <Link
                to="/request-call"
                className="mt-2 mb-3 inline-flex justify-center rounded-md bg-crimson text-white px-4 py-2 text-sm font-semibold"
                onClick={() => setOpen(false)}
              >
                {t("cta_request")}
              </Link>
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
              <img src={logoAsset.url} alt="" className="h-10 w-10 rounded-md object-contain" />
              <span className="font-serif font-semibold text-primary">MPConnectNepal</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{t("footer_desc")}</p>
            <p className="mt-3 text-xs text-muted-foreground">{t("footer_reg")}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">{t("footer_explore")}</h4>
            <ul className="space-y-2 text-sm">
              {navItems.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-foreground/80 hover:text-primary">
                    {t(n.key)}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/get-involved" className="text-foreground/80 hover:text-primary">
                  {t("footer_join")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">{t("footer_contact")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href={`mailto:${contactEmail}`} className="hover:text-primary">
                  {contactEmail}
                </a>
              </li>
              <li>{t("footer_location")}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-muted-foreground flex flex-col sm:flex-row gap-2 justify-between">
            <span>© {new Date().getFullYear()} MPConnectNepal. {t("footer_rights")}</span>
            <span>{t("footer_disclaimer")}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
