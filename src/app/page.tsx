"use client";

import Footer from "@/components/footer/footer";
import Nav from "@/components/nav/nav";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import TicketsModal from "@/components/ticketsModal/TicketsModal";
import HeroVideo from "@/components/HeroVideo";
import { currentEvent } from "@/config/event";

const Gallery = dynamic(() => import("@/components/gallery/gallery"), { ssr: false });

export default function Home() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const heroRef = useRef<HTMLElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [countdown, setCountdown] = useState<{ days: number; hours: number; isPast: boolean } | null>(null);
  const slider = useRef(null);
  const xPercent = useRef(0);
  const [activeMerch, setActiveMerch] = useState(0);
  const touchStartX = useRef(0);
  const merchTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToMerch = (idx: number) => {
    setActiveMerch(idx);
    if (merchTimerRef.current) clearInterval(merchTimerRef.current);
    merchTimerRef.current = setInterval(() => setActiveMerch(p => (p + 1) % 2), 5000);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
      },
      x: "-500px",
    });

    const updateAnimation = () => {
      if (xPercent.current < -100) {
        xPercent.current = 0;
      } else if (xPercent.current > 0) {
        xPercent.current = -100;
      }
      gsap.set(firstText.current, { xPercent: xPercent.current });
      gsap.set(secondText.current, { xPercent: xPercent.current });

      xPercent.current += 0.035 * -2.5;
    };

    gsap.ticker.add(updateAnimation);

    return () => {
      gsap.ticker.remove(updateAnimation);
    };
  }, [isPaused]);

  useEffect(() => {
    const eventDate = new Date("2026-08-01T00:00:00+01:00");
    const calc = () => {
      const diff = eventDate.getTime() - Date.now();
      const remaining = Math.max(0, diff);
      const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      setCountdown({ days, hours, isPast: diff <= 0 });
    };
    calc();
    const interval = setInterval(calc, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    merchTimerRef.current = setInterval(() => setActiveMerch(p => (p + 1) % 2), 5000);
    return () => { if (merchTimerRef.current) clearInterval(merchTimerRef.current); };
  }, []);

  const eventIsPast = countdown?.isPast ?? false;

  return (
    <>
      <nav>
        <Nav fixed />
      </nav>
      <div>
        <section className="hero_section monument" id="home" ref={heroRef}>
          <HeroVideo />
          <div className="hero_content">
            <nav>
              <Nav />
            </nav>

            <div className="hero_center">
              <h1 className="hero_text flex justify-center items-center lg:gap-3 sm:gap-[40px] gap-5 flex-col lg:flex-row">
                <span className="rubik">FOR</span>
                <span className="rubik hero_text_accent">THE REAL</span>
                <span className="rubik">PARTIERS</span>
              </h1>
              <div className="hero_actions inter">
                <button className="hero_btn" onClick={() => setIsModalOpen(true)}>
                  BUY TICKETS
                </button>
                <a className="hero_secondary" href="#merch">
                  SHOP MERCH
                </a>
              </div>
            </div>

            <div className="hero_lower">
              <div
                className={isPaused ? "hero_music paused" : "hero_music"}
                onClick={() => setIsPaused(!isPaused)}
              >
                <div ref={slider} className="marquee">
                  <p ref={firstText}>
                    PM2AM PRESENTS: {currentEvent.name} / {currentEvent.dateLabel} @ {currentEvent.venue}
                  </p>
                  <p ref={secondText}>
                    PM2AM PRESENTS: {currentEvent.name} / {currentEvent.dateLabel} @ {currentEvent.venue}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="event_section" id="tickets">
          <div className="event_inner">
            <div className="event_header">
              <p className="event_label inter">{eventIsPast ? "LATEST PARTY" : "NEXT UP"}</p>
              <h2 className="monument">
                <a href={currentEvent.link} target="_blank" rel="noopener noreferrer">
                  {currentEvent.name}
                </a>
              </h2>
              <p className="event_copy inter">
                PM2AM with SmallztheDJ at Casa 45, Victoria Island. Tickets
                and event details are available on Faaji.
              </p>
              <div className="event_flyer event_flyer_mobile">
                <Image
                  src={currentEvent.poster}
                  alt="PM2AM with SmallztheDJ at Casa 45"
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
              <div className="event_detail_grid inter">
                <div>
                  <span>DATE</span>
                  <strong>{currentEvent.fullDate}</strong>
                </div>
                <div>
                  <span>VENUE</span>
                  <strong>{currentEvent.venue}</strong>
                </div>
                <div>
                  <span>LOCATION</span>
                  <strong>{currentEvent.location}</strong>
                </div>
              </div>
              {countdown && !countdown.isPast && countdown.days > 0 && (
                <div className="countdown">
                  <div className="countdown_unit">
                    <span className="countdown_num">{String(countdown.days).padStart(2, "0")}</span>
                    <span className="countdown_label">DAYS</span>
                  </div>
                  <span className="countdown_sep">:</span>
                  <div className="countdown_unit">
                    <span className="countdown_num">{String(countdown.hours).padStart(2, "0")}</span>
                    <span className="countdown_label">HRS</span>
                  </div>
                </div>
              )}
              {countdown && !countdown.isPast && countdown.days === 0 && (
                <p className="countdown_tonight">TONIGHT 🔥</p>
              )}
              {countdown?.isPast && (
                <p className="countdown_tonight">RECAPS SOON</p>
              )}
              <a
                href={currentEvent.link}
                target="_blank"
                rel="noopener noreferrer"
                className="event_cta monument"
              >
                {eventIsPast ? "VIEW EVENT" : "GET TICKETS"}
              </a>
            </div>
            <div className="event_details inter">
              <div className="event_flyer">
                <Image
                  src={currentEvent.poster}
                  alt="PM2AM with SmallztheDJ at Casa 45"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 420px"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="merch_outer" id="merch">
          <div className="section_header">
            <span className="section_label inter">SHOP THE DROP</span>
            <h2 className="monument">Official PM2AM merch.</h2>
          </div>
          <div
            className="merch_section"
            onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              const diff = touchStartX.current - e.changedTouches[0].clientX;
              if (Math.abs(diff) > 50) goToMerch(diff > 0 ? 1 : 0);
            }}
          >
            <div className="merch_track" style={{ transform: `translateX(-${activeMerch * 100}%)` }}>
              <div className="merch_slide">
                <Image
                  src="/hot-body.png"
                  alt="Hot Body Bikini"
                  fill
                  className="object-cover object-[center_15%] md:object-center"
                  sizes="(max-width: 768px) 100vw, 90vw"
                  priority
                />
                <div className="merch_overlay" />
              </div>
              <div className="merch_slide">
                <Image
                  src="/pm-merch.png"
                  alt="PM2AM Store"
                  fill
                  className="object-cover object-[center_15%] md:object-center"
                  sizes="(max-width: 768px) 100vw, 90vw"
                />
                <div className="merch_overlay" />
              </div>
            </div>

            <div className="merch_text_layer">
              {[
                { eyebrow: "IN COLLAB WITH MAVIN RECORDS", titleLines: ["HOT BODY", "BIKINI"], link: "https://shop.mavinrecords.com/product/hot-body-bikini/", cta: "SHOP COLLAB" },
                { eyebrow: "PM2AM OFFICIAL STORE", titleLines: ["PM2AM", "STORE"], link: "https://pm2amstore.bumpa.shop", cta: "SHOP NOW" },
              ].map((slide, i) => (
                <div key={i} className={`merch_text_slide${i === activeMerch ? " active" : ""}`}>
                  <p className="merch_eyebrow inter">{slide.eyebrow}</p>
                  <h2 className="merch_title monument">{slide.titleLines[0]}<br />{slide.titleLines[1]}</h2>
                  <a href={slide.link} target="_blank" rel="noopener noreferrer" className="merch_btn inter">{slide.cta}</a>
                </div>
              ))}
            </div>

            <span className="merch_counter inter">0{activeMerch + 1} / 02</span>

            <button className="merch_arrow merch_prev" aria-label="Previous" onClick={() => goToMerch((activeMerch - 1 + 2) % 2)}>‹</button>
            <button className="merch_arrow merch_next" aria-label="Next" onClick={() => goToMerch((activeMerch + 1) % 2)}>›</button>

            <div className="merch_dots">
              {[0, 1].map(i => (
                <button key={i} className={`merch_dot${i === activeMerch ? " active" : ""}`} onClick={() => goToMerch(i)} aria-label={`Go to slide ${i + 1}`} />
              ))}
            </div>
          </div>
        </section>
        <section className="gallery_section" id="gallery">
          <div className="section_header gallery_header">
            <span className="section_label inter">PAST EVENTS</span>
            <h2 className="monument">Recaps from past events.</h2>
          </div>
          <Gallery />
          <a
            href="https://www.instagram.com/pm2amofficial_/"
            target="_blank"
            rel="noopener noreferrer"
            className="gallery_cta inter"
          >
            <Image src="/instagram.svg" alt="" width={16} height={16} />
            SEE MORE ON INSTAGRAM
          </a>
        </section>
        <section className="youtube_section" id="watch">
          <div className="section_header">
            <span className="section_label inter">WATCH THE GANG</span>
            <h2 className="monument">PM2AM on YouTube.</h2>
          </div>
          <div className="youtube_grid">
            {[
              { id: "tdC8RBsLWHg", url: "https://www.youtube.com/watch?v=tdC8RBsLWHg" },
              { id: "WIqWhVy2DYY", url: "https://www.youtube.com/watch?v=WIqWhVy2DYY" },
            ].map((video) => (
              <a key={video.id} href={video.url} target="_blank" rel="noopener noreferrer" className="youtube_card">
                <div className="youtube_thumb">
                  <Image
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt="PM2AM recap"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="youtube_overlay">
                    <div className="youtube_play">▶</div>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <a href="https://www.youtube.com/@Pm2amgang" target="_blank" rel="noopener noreferrer" className="youtube_cta inter">
            <Image src="/youtube.svg" alt="" width={16} height={16} />
            SEE ALL VIDEOS
          </a>
        </section>
        <footer>
          <Footer />
        </footer>
        <TicketsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          description="EVENTS 🎟️"
        />
      </div>

      <div className={`sticky_bar inter ${showStickyBar ? "visible" : ""}`}>
        <button className="monument sticky_btn" onClick={() => setIsModalOpen(true)}>
          BUY TICKETS
        </button>
      </div>
    </>
  );
}
