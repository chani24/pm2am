"use client";

import Footer from "@/components/footer/footer";
import Nav from "@/components/nav/nav";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import TicketsModal from "@/components/ticketsModal/TicketsModal";

const Gallery = dynamic(() => import("@/components/gallery/gallery"), {
  ssr: false, // Disable SSR for this component
});

export default function Home() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const heroRef = useRef<HTMLElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [countdown, setCountdown] = useState<{ days: number; hours: number } | null>(null);
  const slider = useRef(null);
  const xPercent = useRef(0);

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
    const eventDate = new Date("2026-07-04T20:00:00");
    const calc = () => {
      const diff = Math.max(0, eventDate.getTime() - Date.now());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      setCountdown({ days, hours });
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
  return (
    <>
      <nav>
        <Nav fixed />
      </nav>
      <div>
        <section className="hero_section monument" ref={heroRef}>
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/new-hero.png"
            className="absolute inset-0 w-full h-full object-cover object-center"
          >
            <source src="/hot-body-video.mp4" type="video/mp4" />
          </video>
          <div>
            <nav>
              <Nav />
            </nav>
            <h1 className="hero_text flex justify-center items-center lg:gap-3 sm:gap-[40px] gap-5 flex-col lg:flex-row">
              <span className="rubik">FOR</span>
              <span className="rubik"> THE REAL </span>
              <span className="rubik">PARTIERS</span>
            </h1>
            <div className="btn_container">
              {/* <h1 className="hero_text flex justify-center items-center lg:gap-3 sm:gap-[40px] gap-5 flex-col lg:flex-row text-3xl ">
                <span className="praise">ALL</span>
                <span className="praise">WHITE</span>
                <span className="praise">AFFAIR</span>
              </h1> */}

              <button className="hero_btn" onClick={() => setIsModalOpen(true)}>
                <p>BUY TICKETS 🎟️</p>
              </button>
            </div>

            <div
              className={isPaused ? "hero_music paused" : "hero_music"}
              onClick={() => setIsPaused(!isPaused)}
            >
              <div ref={slider} className="marquee">
                <p ref={firstText}>
                  PM2AM PRESENTS: HOT BODY SUMMER • 04.07.26 • 8PM @ VODA BEACH
                  CLUB
                </p>
                <p ref={secondText}>
                  PM2AM PRESENTS: HOT BODY SUMMER • 04.07.26 • 8PM @ VODA BEACH
                  CLUB
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="event_section">
          <div className="event_inner">
            <div className="event_header">
              <p className="event_label inter">NEXT UP</p>
              <h2 className="monument">
                <a href="https://tix.africa/discover/pm2am-hot-body" target="_blank">
                  HOT BODY SUMMER 🏖️
                </a>
              </h2>
            </div>
            <div className="event_details inter">
              {countdown && countdown.days > 0 && (
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
              {countdown && countdown.days === 0 && (
                <p className="countdown_tonight">TONIGHT 🔥</p>
              )}
            </div>
          </div>
        </section>
        <section className="merch_section">
          <div className="merch_images">
            <div className="merch_image_item">
              <Image
                src="https://shop.mavinrecords.com/wp-content/uploads/2026/06/hot-body-bikini-2.png"
                alt="Hot Body Bikini"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </div>
          <div className="merch_content monument">
            <p className="merch_label inter">WEAR THE GANG</p>
            <h2 className="merch_title">HOT BODY<br />BIKINI</h2>
            <a
              href="https://shop.mavinrecords.com/product/hot-body-bikini/"
              target="_blank"
              className="merch_btn inter"
            >
              SHOP NOW →
            </a>
          </div>
        </section>
        <section className="gallery_section">
          <Gallery />
        </section>
        <section className="youtube_section">
          <span className="youtube_label inter">WATCH THE GANG</span>
          <div className="youtube_grid">
            {[
              { id: "tdC8RBsLWHg", url: "https://www.youtube.com/watch?v=tdC8RBsLWHg" },
              { id: "WIqWhVy2DYY", url: "https://www.youtube.com/watch?v=WIqWhVy2DYY" },
            ].map((video) => (
              <a key={video.id} href={video.url} target="_blank" className="youtube_card">
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
          <a href="https://www.youtube.com/@Pm2amgang" target="_blank" className="youtube_cta inter">
            SEE ALL VIDEOS →
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
        <div className="sticky_left">
          <p className="sticky_event monument">HOT BODY SUMMER</p>
          <p className="sticky_meta">04.07.26 • VODA BEACH CLUB</p>
        </div>
        <button className="monument sticky_btn" onClick={() => setIsModalOpen(true)}>
          BUY TICKETS 🎟️
        </button>
      </div>
    </>
  );
}
