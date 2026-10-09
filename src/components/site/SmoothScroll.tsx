"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// The page is one night: scroll progress drives the sky colour behind every
// section, from dusk purple at the top to near-black and out into sunrise.
const SKY: [number, [number, number, number]][] = [
  [0, [34, 7, 58]],
  [0.3, [16, 5, 26]],
  [0.6, [6, 3, 9]],
  [0.82, [14, 6, 20]],
  [1, [58, 18, 30]],
];

function skyAt(p: number) {
  for (let i = 1; i < SKY.length; i++) {
    const [p1, c1] = SKY[i];
    const [p0, c0] = SKY[i - 1];
    if (p <= p1) {
      const t = (p - p0) / (p1 - p0);
      const c = c0.map((v, k) => Math.round(v + (c1[k] - v) * t));
      return `rgb(${c.join(",")})`;
    }
  }
  return `rgb(${SKY[SKY.length - 1][1].join(",")})`;
}

export function scrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
}

let lenis: Lenis | null = null;

// Freezes the page behind overlays (menu, video player).
export function lockScroll(on: boolean) {
  document.documentElement.classList.toggle("menu-lock", on);
  if (on) lenis?.stop();
  else lenis?.start();
}

export default function SmoothScroll() {
  useEffect(() => {
    const root = document.documentElement;
    const paint = () => root.style.setProperty("--sky", skyAt(scrollProgress()));
    paint();
    window.addEventListener("scroll", paint, { passive: true });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return () => window.removeEventListener("scroll", paint);

    lenis = new Lenis({ lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // In-page anchor links go through Lenis so they glide instead of jump.
    // Runs in the capture phase, ahead of next/link: preventDefault() stops
    // Link's own navigation while still letting its onClick (e.g. closing the
    // menu) run. On other pages, "/#…" links fall through to normal routing.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      let href = a?.getAttribute("href");
      if (href?.startsWith("/#") && window.location.pathname === "/") href = href.slice(1);
      if (!href?.startsWith("#") || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      // Coming from the open menu: unfreeze first or the scroll is swallowed.
      if (document.documentElement.classList.contains("menu-lock")) lockScroll(false);
      lenis?.scrollTo(target as HTMLElement, { offset: -60 });
    };
    document.addEventListener("click", onClick, true);

    return () => {
      window.removeEventListener("scroll", paint);
      document.removeEventListener("click", onClick, true);
      gsap.ticker.remove(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return null;
}
