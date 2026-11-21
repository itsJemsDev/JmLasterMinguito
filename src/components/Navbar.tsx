"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#stack", label: "Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const navbarRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);
  const scrollDirection = useRef<"up" | "down" | null>(null);
  const directionStartY = useRef(0);

  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;

    lastScrollY.current = window.scrollY;
    directionStartY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      if (currentScrollY <= 80) {
        navbar.classList.remove("nav-hidden");
        scrollDirection.current = null;
        directionStartY.current = currentScrollY;
      } else {
        const nextDirection = delta > 0 ? "down" : delta < 0 ? "up" : null;
        if (nextDirection && nextDirection !== scrollDirection.current) {
          scrollDirection.current = nextDirection;
          directionStartY.current = currentScrollY;
        }

        if (scrollDirection.current === "down" && currentScrollY - directionStartY.current >= 14) {
          navbar.classList.add("nav-hidden");
          setMobileOpen(false);
        } else if (scrollDirection.current === "up" && directionStartY.current - currentScrollY >= 8) {
          navbar.classList.remove("nav-hidden");
        }
      }
      lastScrollY.current = currentScrollY;

      if (currentScrollY > 10) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
      // Active nav link tracking
      const scrollY = currentScrollY + 100;
      let activeHref: string | null = null;
      for (const link of navLinks) {
        const el = document.getElementById(link.href.slice(1));
        if (!el) continue;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (scrollY >= top && scrollY < bottom) {
          activeHref = link.href;
          break;
        }
      }
      if (activeHref) {
        const current = activeHref;
        document.querySelectorAll<HTMLAnchorElement>(".nav-link-comp").forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === current);
        });
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    const handleResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) setMobileOpen(false);
    };
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (navbarRef.current?.contains(target) || mobileMenuRef.current?.contains(target)) return;
      setMobileOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [mobileOpen]);

  const handleMenuToggle = useCallback(() => {
    setMobileOpen((prev) => !prev);
    navbarRef.current?.classList.remove("nav-hidden");
  }, []);

  const handleLinkClick = () => setMobileOpen(false);

  return (
    <>
      <nav
        ref={navbarRef}
        className="navbar-glass fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-48px)] max-w-[720px] md:max-w-[1000px] rounded-2xl px-2 transition-all duration-300"
      >
        <div className="flex items-center justify-between h-[52px] px-3">
          <a
            href="#home"
            className="font-[family-name:var(--font-sans)] font-semibold text-[var(--color-text)] no-underline text-base tracking-tight"
          >
            Jems Dev
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex gap-1 items-center list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="nav-link-comp text-[var(--color-text-muted)] no-underline text-[0.85rem] px-3.5 py-1.5 rounded-full transition-all duration-200 hover:text-[var(--color-text)] hover:bg-[color-mix(in_srgb,var(--color-bg-hover)_60%,transparent)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={handleMenuToggle}
            className="md:hidden bg-transparent border-none cursor-pointer text-[var(--color-text)] flex items-center p-1"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-links"
          >
            {mobileOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="8" x2="21" y2="8" /><line x1="3" y1="16" x2="21" y2="16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav-links"
        ref={mobileMenuRef}
        className={`mobile-nav-links md:hidden ${mobileOpen ? "open" : ""}`}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={handleLinkClick}
            className="nav-link-comp"
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
