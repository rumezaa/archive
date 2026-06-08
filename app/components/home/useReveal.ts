"use client";

import { useEffect } from "react";

/** Fades `.reveal` elements in as they scroll into view (adds `.in`). */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<Element>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
