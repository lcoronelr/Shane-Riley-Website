"use client";

import { useEffect } from "react";

/**
 * One IntersectionObserver for the whole site. Any element with
 * [data-reveal] gets [data-revealed] the first time it scrolls into view;
 * the transition itself is pure CSS (see globals.css). New elements added by
 * client navigation are picked up via a MutationObserver.
 */
export function RevealObserver() {
  useEffect(() => {
    const reveal = (el: Element) => el.setAttribute("data-revealed", "");

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll("[data-reveal]").forEach(reveal);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const scan = () => {
      document
        .querySelectorAll("[data-reveal]:not([data-revealed]):not([data-observed])")
        .forEach((el) => {
          el.setAttribute("data-observed", "");
          io.observe(el);
        });
    };
    scan();

    let frame = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
