"use client";

import Footer from "@/components/footer/footer";
import Nav from "@/components/nav/nav";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Gallery = dynamic(() => import("@/components/gallery/gallery"), {
  ssr: false, // Disable SSR for this component
});

export default function Home() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const slider = useRef(null);
  let xPercent = 0;

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
      if (xPercent < -100) {
        xPercent = 0;
      } else if (xPercent > 0) {
        xPercent = -100;
      }
      gsap.set(firstText.current, { xPercent: xPercent });
      gsap.set(secondText.current, { xPercent: xPercent });

      xPercent += 0.035 * -2.5;
    };

    gsap.ticker.add(updateAnimation);

    return () => {
      gsap.ticker.remove(updateAnimation);
    };
  }, [isPaused]);
  return (
    <>
      <div>
        <Nav  fixed/>
      </div>
      <div>
        <section className="hero_section monument">
          <div>
            <div>
              <Nav/>
            </div>
            <div className="hero_text flex justify-center items-center lg:gap-3 sm:gap-[40px] gap-5 flex-col lg:flex-row text-3xl ">
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
                  Beach Carnival 🏖️ - December 21st, 6PM at Voda Beach Club📍
                </p>

                <p ref={secondText}>
                  Beach Carnival 🏖️ - December 21st, 6PM at Voda Beach Club📍
                </p>
              </div>
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
        <Footer />
      </div>{" "}
    </>
  );
}
