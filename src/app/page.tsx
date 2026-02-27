"use client";

import Footer from "@/components/footer/footer";
import Nav from "@/components/nav/nav";
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
  const [isPaused, setIsPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
                  PM2AM PRESENTS: NO LOVE IN LAGOS 💘 • 28.02.26 • 8PM @ PRAIA
                  VI
                </p>
                <p ref={secondText}>
                  PM2AM PRESENTS: NO LOVE IN LAGOS 💘 • 28.02.26 • 8PM @ PRAIA
                  VI
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="event_section">
          <div>
            <h2>NEXT UP</h2>
            <h2 className="monument">
              <a
                href="https://www.pv.rsvp/pm2am-no-love-in-lagos"
                target="_blank"
              >
                NO LOVE IN LAGOS 💘
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
        <TicketsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          description="EVENTS 🎟️"
        />
      </div>
    </>
  );
}
