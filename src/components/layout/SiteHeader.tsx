"use client";

import { AnimatePresence, m } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { activeSocialLinks, navigation, site } from "@/content/site";

/** Routes whose first screen is a dark, full-bleed section. */
const DARK_TOP_ROUTES = new Set(["/", "/multimedia"]);

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [overDark, setOverDark] = useState(DARK_TOP_ROUTES.has(pathname));
  const [scrolled, setScrolled] = useState(false);
  const [renderedPath, setRenderedPath] = useState(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  // After navigation: close the menu and assume the new page's top theme
  // until the observer below reports otherwise.
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setMenuOpen(false);
    setOverDark(DARK_TOP_ROUTES.has(pathname));
  }

  // Track whether the header currently sits on top of a dark section.
  useEffect(() => {
    let io: IntersectionObserver | undefined;
    const visible = new Set<Element>();

    const setup = () => {
      io?.disconnect();
      visible.clear();
      const band = Math.max(0, window.innerHeight - 64);
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) visible.add(e.target);
            else visible.delete(e.target);
          }
          setOverDark(visible.size > 0);
        },
        { rootMargin: `0px 0px -${band}px 0px` },
      );
      document.querySelectorAll('[data-surface="dark"]').forEach((el) => io!.observe(el));
    };

    setup();
    window.addEventListener("resize", setup);
    return () => {
      io?.disconnect();
      window.removeEventListener("resize", setup);
    };
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback((restoreFocus = true) => {
    setMenuOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // While the menu is open: lock scroll, make the page behind it inert, and
  // close on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    const behind = document.querySelectorAll<HTMLElement>("#main-content, footer[role='contentinfo']");
    root.setAttribute("data-scroll-locked", "");
    behind.forEach((el) => el.setAttribute("inert", ""));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.removeAttribute("data-scroll-locked");
      behind.forEach((el) => el.removeAttribute("inert"));
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, closeMenu]);

  // Close if the viewport grows to the desktop layout while open.
  useEffect(() => {
    if (!menuOpen) return;
    const mq = window.matchMedia("(min-width: 64rem)");
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [menuOpen]);

  const dark = overDark && !menuOpen;

  return (
    <header
      role="banner"
      data-theme={dark ? "dark" : "light"}
      className={[
        "sticky top-0 z-50 h-header transition-[background-color,color,border-color,backdrop-filter] duration-300",
        dark ? "text-white" : "text-charcoal",
        // backdrop-filter would become the containing block of the fixed
        // mobile menu, so the open state uses a solid background instead.
        menuOpen
          ? "border-b border-rule bg-ivory"
          : scrolled
          ? dark
            ? "border-b border-rule-dark bg-charcoal/70 backdrop-blur-md"
            : "border-b border-rule bg-ivory/88 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <div className="shell flex h-full items-center justify-between gap-6">
        <Link
          href="/"
          className="group flex items-baseline gap-3 rounded-sm"
          aria-label={`${site.name}, ${site.role} — home`}
        >
          <span className="font-serif text-[1.375rem] leading-none font-medium tracking-[-0.01em]">
            {site.name}
          </span>
          <span
            className={`kicker hidden text-[0.6875rem] sm:inline ${dark ? "text-slate-light" : "text-slate-ink"}`}
          >
            {site.role}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "relative inline-flex h-11 items-center rounded-sm px-3 text-[0.9375rem] transition-opacity duration-200",
                      active ? "opacity-100" : "opacity-70 hover:opacity-100",
                    ].join(" ")}
                  >
                    {item.label}
                    {active && (
                      <m.span
                        layoutId="nav-indicator"
                        aria-hidden="true"
                        className={`absolute inset-x-3 bottom-2 h-px ${dark ? "bg-white" : "bg-cobalt"}`}
                        transition={{ type: "spring", stiffness: 420, damping: 38 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 inline-flex h-11 min-w-11 items-center gap-3 rounded-sm px-2 text-[0.9375rem] lg:hidden"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
        >
          <span>{menuOpen ? "Close" : "Menu"}</span>
          <span aria-hidden="true" className="relative block h-3 w-5">
            <span
              className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ease-out ${
                menuOpen ? "top-1.5 rotate-45" : "top-0.5"
              }`}
            />
            <span
              className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ease-out ${
                menuOpen ? "top-1.5 -rotate-45" : "top-2.5"
              }`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <MobileMenu id={menuId} pathname={pathname} onNavigate={() => closeMenu(false)} />
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileMenu({
  id,
  pathname,
  onNavigate,
}: {
  id: string;
  pathname: string;
  onNavigate: () => void;
}) {
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    firstLink.current?.focus();
  }, []);

  return (
    <m.div
      id={id}
      className="fixed inset-x-0 top-header bottom-0 overflow-y-auto bg-ivory text-charcoal lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav aria-label="Primary" className="shell flex min-h-full flex-col justify-between pt-6 pb-10">
        <ul className="border-t border-rule">
          {navigation.map((item, i) => {
            const active = isActive(pathname, item.href);
            return (
              <m.li
                key={item.href}
                className="border-b border-rule"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 + i * 0.045, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  ref={i === 0 ? firstLink : undefined}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={onNavigate}
                  className="flex items-baseline gap-4 py-4"
                >
                  <span className="kicker tabular w-6 text-slate-ink">{String(i + 1).padStart(2, "0")}</span>
                  <span
                    className={`font-serif text-[clamp(2rem,8vw,3rem)] leading-none tracking-[-0.015em] ${
                      active ? "text-cobalt" : ""
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              </m.li>
            );
          })}
        </ul>
        <m.div
          className="mt-10 space-y-3 text-step-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <a href={`mailto:${site.email}`} className="link-inline block">
            {site.email}
          </a>
          {activeSocialLinks.length > 0 && (
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-slate-ink">
              {activeSocialLinks.map((s) => (
                <li key={s.label}>
                  <a href={s.url} rel="me noopener noreferrer" target="_blank" className="link-inline">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </m.div>
      </nav>
    </m.div>
  );
}
