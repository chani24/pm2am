"use client";

import Gallery from "@/components/gallery/gallery";
import Nav from "@/components/nav/nav";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = -1;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => (direction = e.direction * -1),
      },
      x: "-500px",
    });
    requestAnimationFrame(animate);
  }, []);
  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });

    xPercent += 0.035 * direction;

    requestAnimationFrame(animate);
  };
  return (
    <div>
      <section className="hero_section monument">
        <Nav />
        <div className="hero_text flex justify-center items-center sm:gap-3 gap-5 flex-col sm:flex-row text-3xl ">
          <span className="praise">FOR</span>
          <span className="monument_black">THE REAL</span>
          <span className="monument_light">PARTIERS</span>
        </div>
        <div
          className={isPaused ? "hero_music paused" : "hero_music"}
          onClick={() => setIsPaused(!isPaused)}
        >
          <div ref={slider} className="marquee">
            <p ref={firstText}>
              WE&apos;RE CURRENTLY LISTENING TO STARBOY - THE WEEKND
            </p>
            <p ref={secondText}>
              WE&apos;RE CURRENTLY LISTENING TO STARBOY - THE WEEKND
            </p>
          </div>
        </div>
      </section>
      <section className="event_section">
        <div>
          <div>NEXT UP</div>
          <div>
            <a
              href="https://tix.africa/discover/palmwine2am-with-the-outsiders-the-beach-carnival-5bd70329-6602-4940-8263-19b2b1d859b5"
              target="_blank"
            >
              THE BEACH CARNIVAL ↵
            </a>
          </div>
        </div>
      </section>
      <section className="gallery_section">
        <Gallery />
      </section>
    </div>
  );
}
