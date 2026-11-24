"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { PartyEvent, RoadMap } from "@/config/site";
import SectionHead from "./SectionHead";
import Tagline from "./Tagline";
import { lockScroll } from "./SmoothScroll";
import { CloseIcon } from "./Icons";

export default function Events({ events, roadMap }: { events: PartyEvent[]; roadMap?: RoadMap }) {
  const [active, setActive] = useState<number | null>(null);
  const [mapOpen, setMapOpen] = useState(false);
  const preview = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapOpen) return;
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMapOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [mapOpen]);

  // Desktop: the hovered night's flyer (or mood photo) trails the cursor.
  const onMove = (e: React.MouseEvent) => {
    const el = preview.current;
    if (!el) return;
    el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%) rotate(-4deg)`;
  };

  if (events.length === 0) return null;
  // The section's "Buy tickets" goes to the next party, not a one-off screening.
  const next = events.find((e) => e.kind !== "screening") ?? events[0];

  return (
    <section className="events" id="events">
      <div className="wrap">
        <SectionHead
          title="Upcoming"
          aside={
            <>
              {roadMap && (
                <button type="button" className="link-arrow" onClick={() => setMapOpen(true)}>
                  {roadMap.label}
                </button>
              )}
              <a href={next.ticketLink} target="_blank" rel="noopener noreferrer" className="link-arrow">
                Buy tickets →
              </a>
            </>
          }
        />


        <ul className="events_list" onMouseMove={onMove} onMouseLeave={() => setActive(null)}>
            {events.map((e, i) => (
              <li key={e.slug} className="erow" onMouseEnter={() => setActive(i)}>
                <Link href={`/events/${e.slug}`} className="erow_link" aria-label={`${e.name} details`} />

                <div className="erow_img">
                  <Image src={e.image} alt="" fill sizes="(max-width: 900px) 100vw, 10vw" />
                </div>

                <span className="erow_date display">{e.dateLabel}</span>

                <div className="erow_title">
                  <span className="erow_collab">{e.collab ? `PM2AM x ${e.collab}` : "PM2AM"}</span>
                  <h3>
                    <Tagline text={e.styledName ?? e.name} />
                  </h3>
                </div>

                <div className="erow_meta">
                  <span>{e.dayLabel} · {e.timeLabel}</span>
                  <span>{e.venue}</span>
                </div>

                <div className="erow_actions">
                  <a href={e.ticketLink} target="_blank" rel="noopener noreferrer" className="btn btn--solid btn--sm">
                    Tickets
                  </a>
                </div>
              </li>
            ))}
          </ul>
      </div>

      <div ref={preview} className={`events_preview ${active !== null ? "is-on" : ""}`} aria-hidden="true">
        {events.map((e, i) => (
          <div key={e.slug} className={`events_preview_img ${active === i ? "is-active" : ""}`}>
            <Image src={e.flyer ?? e.image} alt="" fill sizes="320px" />
          </div>
        ))}
      </div>

      {roadMap && mapOpen && (
        <div className="viewer" role="dialog" aria-label={roadMap.label} onClick={() => setMapOpen(false)}>
          <figure className="viewer_frame" onClick={(e) => e.stopPropagation()}>
            <div className="viewer_img">
              <Image
                src={roadMap.src}
                alt={roadMap.alt}
                width={roadMap.width}
                height={roadMap.height}
                sizes="(max-width: 900px) 100vw, 60vw"
                priority
              />
            </div>
          </figure>
          <button className="player_close" onClick={() => setMapOpen(false)} aria-label="Close">
            <CloseIcon />
          </button>
        </div>
      )}
    </section>
  );
}
