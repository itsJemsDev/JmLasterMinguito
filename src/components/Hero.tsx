"use client";

import { useEffect, useRef } from "react";
import VerifiedBadge from "./VerifiedBadge";

export default function Hero() {
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = profileRef.current;
    if (!el) return;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const hero = document.querySelector(".hero-section");
          if (hero) {
            const bottom = hero.getBoundingClientRect().bottom;
            if (bottom > 0) {
              el.style.transform = `translateY(${window.scrollY * -0.06}px)`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="hero-section flex items-start pt-28 md:pt-[112px]"
    >
      <div className="max-w-[1000px] mx-auto px-6 md:px-6 w-full">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-10">
          {/* Text */}
          <div className="flex-1 max-w-[500px] text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-[0.85rem] text-[var(--color-text-muted)] mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span>OPEN FOR COMMISSION</span>
            </div>

            <h1 className="font-[family-name:var(--font-sans)] text-[clamp(1.8rem,4.5vw,2.6rem)] font-bold tracking-tighter leading-[1.1] mb-2">
              <span>Jm Laster D. </span>
              <span className="inline-flex items-center whitespace-nowrap">
                Minguito
                <VerifiedBadge />
              </span>
            </h1>

            <p className="text-[1.1rem] text-[var(--color-text-muted)] mb-6 tracking-tight">
              IT Student &amp; Developer
            </p>

            <div className="hero-actions">
              <a href="#contact" className="hero-action-primary">
                Contact Me
              </a>
              <div className="hero-resume-actions">
                <a
                  href="/JLM_RESUME.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-action-secondary"
                >
                  <LucideIcon name="eye" />
                  View CV
                </a>
                <a
                  href="/JLM_RESUME.pdf"
                  download="Jm_Laster_Minguito_CV.pdf"
                  className="hero-action-secondary"
                >
                  <LucideIcon name="download" />
                  Download CV
                </a>
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div
            ref={profileRef}
            className="flex-shrink-0 w-[180px] h-[195px] md:w-[240px] md:h-[260px] rounded-lg md:rounded-[var(--radius-lg)] p-2 border border-dashed border-[var(--color-border-hover)] flex items-center justify-center"
          >
            <img
              src="/profile.jpg"
              alt="Jm Laster D. Minguito"
              className="w-full h-full object-cover rounded-[calc(var(--radius-lg)-4px)] md:rounded-[calc(var(--radius-lg)-4px)] grayscale-[20%] transition-all duration-200 hover:grayscale-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// Simple Lucide icon renderer for client components
function LucideIcon({ name, size = 18 }: { name: string; size?: number }) {
  const icons: Record<string, string> = {
    eye: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
    download: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  };

  return <span dangerouslySetInnerHTML={{ __html: icons[name] || "" }} />;
}

