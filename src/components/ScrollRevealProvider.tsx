"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR = ".section, .stack-marquee-section, .card";

export default function ScrollRevealProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches || !("IntersectionObserver" in window)) return;

    const observed = new Set<HTMLElement>();
    let revealIndex = 0;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        element.classList.add("scroll-visible");
        observed.delete(element);
        observer.unobserve(element);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -36px 0px" });

    const observe = (root: ParentNode) => {
      if (root instanceof Element && root.matches(REVEAL_SELECTOR)) observeElement(root as HTMLElement);
      root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach(observeElement);
    };

    const observeElement = (element: HTMLElement) => {
      if (observed.has(element) || element.classList.contains("scroll-visible")) return;
      observed.add(element);
      element.classList.add("scroll-reveal-ready");
      if (!element.style.transitionDelay && element.matches(".card")) {
        element.style.transitionDelay = `${(revealIndex % 4) * 65}ms`;
        revealIndex += 1;
      }
      observer.observe(element);
    };

    observe(document);
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach((node) => {
        if (node instanceof Element) observe(node);
      }));
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
      observed.forEach((element) => {
        element.classList.remove("scroll-reveal-ready", "scroll-visible");
        element.style.transitionDelay = "";
      });
      observed.clear();
    };
  }, []);

  return <>{children}</>;
}
