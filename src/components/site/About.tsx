"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about, sponsors } from "@/config/site";
import SectionHead from "./SectionHead";
import Marquee from "./Marquee";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Words light up one by one as you read down the section.
      gsap.to(".about_word", {
        opacity: 1,
        stagger: 0.08,
        ease: "none",
        scrollTrigger: { trigger: ".about_copy", start: "top 75%", end: "bottom 45%", scrub: true },
      });
      gsap.utils.toArray<HTMLElement>(".about_photo").forEach((el, i) => {
        gsap.to(el, {
          yPercent: i % 2 ? -25 : -12,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="about" id="about" ref={root}>
      <div className="wrap">
        <SectionHead
          title={
            <>
              Welcome to the <span className="tag">gang</span>
            </>
          }
        />

        <div className="about_grid">
          <p className="about_copy display">
            {about.copy.split(" ").map((w, i) => (
              <span key={i} className="about_word">
                {w}{" "}
              </span>
            ))}
          </p>

          <div className="about_photos" aria-hidden="true">
            {about.photos.map((src, i) => (
              <div key={src} className={`about_photo about_photo--${i}`}>
                <Image src={src} alt="" fill sizes="(max-width: 900px) 45vw, 22vw" />
              </div>
            ))}
          </div>
        </div>


      </div>

      <Marquee items={sponsors} reverse variant="light" />
    </section>
  );
}
