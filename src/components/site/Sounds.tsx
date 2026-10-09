"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { links, sets } from "@/config/site";
import SectionHead from "./SectionHead";
import { lockScroll } from "./SmoothScroll";

export default function Sounds() {
  const [playing, setPlaying] = useState<number | null>(null);
  const set = playing !== null ? sets[playing] : null;

  useEffect(() => {
    if (playing === null) return;
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPlaying(null);
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [playing]);

  return (
    <section className="sounds" id="sounds">
      <div className="wrap">
        <SectionHead
          title="Mixes"
          aside={
            <a href={links.youtube} target="_blank" rel="noopener noreferrer" className="link-arrow">
              All sets on YouTube →
            </a>
          }
        />

        <ul className="cards cards--sets">
          {sets.map((s, i) => (
            <li key={s.id}>
              <button className="pcardx" onClick={() => setPlaying(i)} aria-label={`Play ${s.title}`}>
                <div className="pcardx_img pcardx_img--wide">
                  <Image src={`https://img.youtube.com/vi/${s.id}/maxresdefault.jpg`} alt="" fill sizes="(max-width: 900px) 85vw, 32vw" />
                  <span className="pcardx_play" aria-hidden="true">▶</span>
                </div>
                <span className="pcardx_note tag">{s.dj}</span>
                <span className="pcardx_sub">{s.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* The YouTube player only loads once someone hits play. */}
      {set && (
        <div className="player" role="dialog" aria-label={set.title} onClick={() => setPlaying(null)}>
          <div className="player_frame" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${set.id}?autoplay=1&rel=0`}
              title={set.title}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
          <button className="player_close" onClick={() => setPlaying(null)}>
            Close ✕
          </button>
        </div>
      )}
    </section>
  );
}
