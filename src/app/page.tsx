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
      <nav>
        <Nav fixed />
      </nav>
      <div>
        <section className="hero_section monument">
          <div>
            <nav>
              <Nav />
            </nav>
            <h1 className="hero_text flex justify-center items-center lg:gap-3 sm:gap-[40px] gap-5 flex-col lg:flex-row text-3xl ">
              <span className="praise">FOR</span>
              <span className="monument_black">THE REAL</span>
              <span className="monument_light">PARTIERS</span>
            </h1>
            {/* <div className="btn_container">
              <h1 className="hero_text flex justify-center items-center lg:gap-3 sm:gap-[40px] gap-5 flex-col lg:flex-row text-3xl ">
                <span className="praise">ALL</span>
                <span className="praise">WHITE</span>
                <span className="praise">AFFAIR</span>
              </h1>
              <a
                href="https://tix.africa/pm2am-anniversary-all-white-affair"
                target="_blank"
              >
                <button className="hero_btn">
                  <p>GET TICKETS</p>
                </button>
              </a>
            </div> */}

            <div
              className={isPaused ? "hero_music paused" : "hero_music"}
              onClick={() => setIsPaused(!isPaused)}
            >
              <div ref={slider} className="marquee">
                <p ref={firstText}>
                  PM2AM ANNIVERSARY: ALL WHITE AFFAIR - THANK YOU FOR PARTYING
                  WITH US!
                </p>

                <p ref={secondText}>
                  PM2AM ANNIVERSARY: ALL WHITE AFFAIR - THANK YOU FOR PARTYING
                  WITH US!
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="event_section">
          <div>
            <h2>RECENTLY</h2>
            <h2>
              <a
                href="https://www.instagram.com/p/DIcBtpJoL3-/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
                target="_blank"
              >
                ALL WHITE AFFAIR ↵
              </a>
            </h2>
          </div>
        </section>
        <section className="gallery_section">
          <Gallery />
        </section>
        <footer>
          <Footer />
        </footer>
      </div>{" "}
    </>
  );
}
