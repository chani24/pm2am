"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { gallery, links, recapPreviewCount } from "@/config/site";
import SectionHead from "./SectionHead";
import { lockScroll } from "./SmoothScroll";
import { CloseIcon, NextIcon, PrevIcon } from "./Icons";

// How often one card swaps to a fresh photo, and how long the crossfade takes.
const SWAP_EVERY_MS = 2600;
const FADE_MS = 900;

type Slot = { cur: number; prev: number | null };

// Snaps from past nights, printed like instant-camera photocards. The grid
// never changes size: every few seconds one card (never the same one twice in
// a row) crossfades to the next photo in the queue, so every night gets its
// turn while the newest, most-dancing shots lead. Tapping a card opens it
// large with the night's details; arrows/keys step through the whole set.
export default function PastEvents() {
  const count = Math.min(recapPreviewCount, gallery.length);
  const [slots, setSlots] = useState<Slot[]>(() =>
    Array.from({ length: count }, (_, i) => ({ cur: i, prev: null }))
  );
  const slotsRef = useRef(slots);
  slotsRef.current = slots;
  const queue = useRef<number[]>(gallery.map((_, i) => i).slice(count));
  const lastSlot = useRef(-1);
  const section = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const shot = open !== null ? gallery[open] : null;

  const swap = useCallback(() => {
    // Pinned cards stay put; pick among the rest.
    const free = slotsRef.current.map((s, i) => (gallery[s.cur].pinned ? -1 : i)).filter((i) => i !== -1 && i !== lastSlot.current);
    if (!queue.current.length || !free.length) return;
    const slot = free[Math.floor(Math.random() * free.length)];
    lastSlot.current = slot;
    const next = queue.current.shift()!;
    const leaving = slotsRef.current[slot].cur;
    // The photo leaving the grid rejoins the back of the queue.
    queue.current.push(leaving);
    setSlots((s) => s.map((x, i) => (i === slot ? { cur: next, prev: leaving } : x)));
    setTimeout(() => setSlots((s) => s.map((x, i) => (i === slot ? { ...x, prev: null } : x))), FADE_MS + 100);
  }, []);

  // Only rotate while the Recap is on screen, the tab is visible, nothing is
  // open, and the visitor hasn't asked for reduced motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.15 });
    if (section.current) io.observe(section.current);
    const t = setInterval(() => {
      if (visible && open === null && !document.hidden) swap();
    }, SWAP_EVERY_MS);
    return () => {
      clearInterval(t);
      io.disconnect();
    };
  }, [swap, open]);

  const step = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + gallery.length) % gallery.length)),
    []
  );

  useEffect(() => {
    if (open === null) return;
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, step]);

  return (
    <section className="past" id="past" ref={section}>
      <div className="wrap">
        <SectionHead
          title="Recap"
          aside={
            <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="link-arrow">
              More on Instagram →
            </a>
          }
        />

        <ul className="cards">
          {slots.map(({ cur, prev }, i) => {
            const s = gallery[cur];
            return (
              <li key={i}>
                <button className="pcardx" onClick={() => setOpen(cur)} aria-label={`Open photo from ${s.event}`}>
                  <div className="pcardx_img">
                    {prev !== null && (
                      <Image key={`p${prev}`} src={gallery[prev].src} alt="" fill sizes="(max-width: 700px) 50vw, 25vw" />
                    )}
                    <Image
                      key={`c${cur}`}
                      src={s.src}
                      alt={`${s.event} — PM2AM`}
                      fill
                      sizes="(max-width: 700px) 50vw, 25vw"
                      className={prev !== null ? "pcardx_in" : undefined}
                    />
                  </div>
                  <span key={`n${cur}`} className={`pcardx_note tag ${prev !== null ? "pcardx_in" : ""}`}>
                    {s.event}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {shot && open !== null && (
        <div className="viewer" role="dialog" aria-label={`Photo from ${shot.event}`} onClick={() => setOpen(null)}>
          <figure className="viewer_frame" onClick={(e) => e.stopPropagation()}>
            <div className="viewer_img">
              <Image
                src={shot.src}
                alt={`${shot.event} — PM2AM`}
                width={shot.width}
                height={shot.height}
                sizes="(max-width: 900px) 100vw, 60vw"
                priority
              />
            </div>
            <figcaption className="viewer_info">
              <span className="viewer_count">
                {open + 1} / {gallery.length}
              </span>
              <span className="viewer_event tag">{shot.event}</span>
              {(shot.date || shot.venue) && (
                <span className="viewer_meta">{[shot.date, shot.venue].filter(Boolean).join(" · ")}</span>
              )}
              {shot.credit && <span className="viewer_meta">Photo: {shot.credit}</span>}
            </figcaption>
          </figure>
          <button className="viewer_nav viewer_nav--prev" onClick={(e) => (e.stopPropagation(), step(-1))} aria-label="Previous photo">
            <PrevIcon />
          </button>
          <button className="viewer_nav viewer_nav--next" onClick={(e) => (e.stopPropagation(), step(1))} aria-label="Next photo">
            <NextIcon />
          </button>
          <button className="player_close" onClick={() => setOpen(null)} aria-label="Close">
            <CloseIcon />
          </button>
        </div>
      )}
    </section>
  );
}
