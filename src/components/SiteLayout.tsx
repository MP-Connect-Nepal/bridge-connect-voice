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
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLang();
  const contactEmail = useContent("contact_email", "mpconnectnepal@gmail.com");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-primary focus:text-primary-foreground focus:px-3 focus:py-2 focus:rounded"
      >
        {t("skip")}
      </a>
      <header
        className={`sticky top-0 z-40 border-b transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300 ${
          scrolled
            ? "border-border/70 glass shadow-[var(--shadow-soft)]"
            : "border-transparent bg-background/70 backdrop-blur-sm"
        }`}
      >
        <div
          className={`mx-auto max-w-6xl px-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:flex lg:justify-between transition-[padding] duration-300 ${
            scrolled ? "py-2" : "py-3.5"
          }`}
        >
          <Link to="/" className="flex items-center gap-3 min-w-0" onClick={() => setOpen(false)}>
            <img
              src={logoAsset.url}
              alt="MPConnectNepal logo"
              className={`rounded-xl object-contain shrink-0 transition-all duration-300 ${
                scrolled ? "h-11 w-11" : "h-14 w-14"
              }`}
            />
            <span className="flex flex-col leading-tight min-w-0">
              <span className="font-serif text-lg font-semibold text-primary truncate">MPConnectNepal</span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground truncate">
                {t("brand_tag")}
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="relative px-3 py-2 text-sm text-foreground/75 rounded-full hover:bg-secondary/70 hover:text-foreground transition"
                activeProps={{
                  className:
                    "relative px-3 py-2 text-sm rounded-full bg-secondary text-primary font-semibold shadow-[var(--shadow-soft)]",
                }}
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
              className="btn-press hidden sm:inline-flex items-center rounded-full bg-crimson text-white px-5 py-2 text-sm font-semibold shadow-[var(--shadow-soft)]"
            >
              {t("cta_request")}
            </Link>
            <button
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-xl border border-border bg-card/70 btn-press"
            >
              <span className="sr-only">Menu</span>
              <div className="flex flex-col gap-1">
                <span className={`block h-0.5 w-4 bg-foreground transition-transform duration-300 ${open ? "translate-y-1.5 rotate-45" : ""}`} />
                <span className={`block h-0.5 w-4 bg-foreground transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 w-4 bg-foreground transition-transform duration-300 ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
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
          <div className="mx-auto max-w-6xl px-4 py-6">
            <h4 className="text-sm font-semibold mb-4 text-center md:text-left">{t("footer_social")}</h4>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61592502211377"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-secondary transition"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="hidden sm:inline">Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/mpconnectnepal/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-secondary transition"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                <span className="hidden sm:inline">Instagram</span>
              </a>
              <a
                href="https://www.linkedin.com/in/mpconnectnepal/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-secondary transition"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.601 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
              <a
                href="https://www.youtube.com/@mpconnectnepal"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-secondary transition"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                <span className="hidden sm:inline">YouTube</span>
              </a>
            </div>
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
