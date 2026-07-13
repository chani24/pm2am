"use client";
import { useEffect, useState } from "react";
import "./gallery.css";
import Image from "next/image";

const IG_PROFILE = "https://www.instagram.com/pm2amofficial_/";

const gallery = [
  {
    image: "two-djs.jpg",
    span: "2",
    eventImage: "anniversary.png",
    venue: "VODA BEACH CLUB",
    location: "LAGOS",
    buttonLink: "https://www.instagram.com/p/DWwqgNIDOcN/",
  },
  {
    image: "artiste-performing.jpg",
    span: "1",
    eventImage: "anniversary.png",
    venue: "VODA BEACH CLUB",
    location: "LAGOS",
    buttonLink: "https://www.instagram.com/p/DWwqgNIDOcN/",
  },
  {
    image: "day-shift-party.jpeg",
    span: "1",
    eventImage: "carnival-ii.png",
    venue: "VODA BEACH CLUB",
    location: "LAGOS",
    buttonLink: "https://www.instagram.com/p/DSpwWGCjEbt/",
  },
  {
    image: "3-girls.jpeg",
    span: "2",
    eventImage: "day-shift.jpeg",
    venue: "VODA BEACH CLUB",
    location: "LAGOS",
    buttonLink: "https://www.instagram.com/p/DSpwWGCjEbt/",
  },
  {
    image: "two-dancing.jpg",
    span: "1",
    eventImage: "bullet-party.png",
    venue: "PRAIA LAGOS",
    location: "V.I LAGOS",
    buttonLink: IG_PROFILE,
  },
  {
    image: "girl-hands-up.jpeg",
    span: "1",
    eventImage: "bullet-party.png",
    venue: "PRAIA LAGOS",
    location: "V.I LAGOS",
    buttonLink: IG_PROFILE,
  },
  {
    image: "girl-in-brazil.jpg",
    span: "1",
    eventImage: "carnival-ii.png",
    venue: "VODA BEACH CLUB",
    location: "LAGOS",
    buttonLink: IG_PROFILE,
  },
];

export default function Gallery() {
  const [isMobile, setIsMobile] = useState(window?.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window?.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-[24px]">
      {gallery.map((item, index) => {
        return (
          <div
            className="gallery_container relative col-span-3 h-[500px] overflow-hidden"
            key={index}
            style={{
              gridColumn: isMobile
                ? "span 3 / span 3"
                : `span ${item.span} / span ${item.span}`,
            }}
          >
            <Image
              src={`/${item.image}`}
              alt="party"
              fill
              className="event_background object-cover object-center"
              loading="lazy"
              sizes={`(max-width: 768px) 100vw, ${item.span === "1" ? "33vw" : "66vw"}`}
            />
            <div className="event_info">
              <div>
                <Image
                  width={184}
                  height={228}
                  alt="party"
                  src={`/${item.eventImage}`}
                  loading="lazy"
                />
                <div className="flex justify-between">
                  <span className="light">VENUE</span>
                  <span>{item.venue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="light">LOCATION</span>
                  <span>{item.location}</span>
                </div>
                <a target="_blank" rel="noopener noreferrer" href={item.buttonLink}>
                  <button>VIEW MORE</button>
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
