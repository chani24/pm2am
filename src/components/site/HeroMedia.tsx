"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { HeroVideo } from "@/config/site";

type Props = { video?: HeroVideo; slides: string[] };

// Plays the hero video when the browser allows it; otherwise (iPhone Low Power
// Mode, data saver, reduced motion, or no video yet) falls back to the photo
// slideshow so the hero is never a frozen frame with a play button.
// Portrait clips only play on portrait screens — stretched across a laptop
// they'd be blown up and cropped to a blurry strip.
export default function HeroMedia({ video, slides }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [mode, setMode] = useState<"video" | "slides">(video ? "video" : "slides");
  const [src, setSrc] = useState<string>();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (mode !== "slides" || slides.length < 2) return;
    const t = setInterval(() => setActive((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [mode, slides.length]);

  useEffect(() => {
    if (!video) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const portraitClip = video.height > video.width;
    const landscapeScreen = window.innerWidth > window.innerHeight;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || conn?.saveData || (portraitClip && landscapeScreen)) {
      setMode("slides");
      return;
    }
    setSrc(window.innerWidth < 900 ? video.small : video.src);
  }, [video]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !src) return;
    let started = false;
    const onPlaying = () => (started = true);
    el.addEventListener("playing", onPlaying);
    el.play().catch(() => setMode("slides"));
    // Some browsers neither play nor reject (e.g. stalled on slow data).
    const timer = setTimeout(() => !started && setMode("slides"), 4000);
    return () => {
      clearTimeout(timer);
      el.removeEventListener("playing", onPlaying);
    };
  }, [src]);

  return (
    <div className="hero_media" aria-hidden="true">
      {mode === "video" && video ? (
        <video
          ref={ref}
          className="hero_video"
          src={src}
          poster={video.poster}
          muted
          playsInline
          loop
          preload="auto"
        />
      ) : (
        slides.map((s, i) => (
          <div key={s} className={`hero_slide ${i === active ? "is-active" : ""}`}>
            <Image src={s} alt="" fill priority={i === 0} sizes="100vw" />
          </div>
        ))
      )}
    </div>
  );
}
