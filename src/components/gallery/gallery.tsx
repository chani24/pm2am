"use client";
import { useEffect, useState } from "react";
import "./gallery.css";
import Image from "next/image";

const gallery = [
  {
    image: "beach-rave.jpeg",
    span: "2",
    eventImage: "carnival.png",
    venue: "VODA BEACH CLUB",
    location: "LAGOS",
    buttonLink:
      "https://www.instagram.com/p/DEDM3Jpo4i5/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    buttonText: "VIEW MORE",
  },
  {
    image: "blow-kiss.jpg",
    span: "1",
    eventImage: "carnival.png",
    venue: "VODA BEACH CLUB",
    location: "LAGOS",
    buttonLink:
      "https://www.instagram.com/p/DEDM3Jpo4i5/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    buttonText: "VIEW MORE",
  },
  {
    image: "walking.jpg",
    span: "1",
    eventImage: "carnival.png",
    venue: "VODA BEACH CLUB",
    location: "LAGOS",
    buttonLink:
      "https://www.instagram.com/p/DEDM3Jpo4i5/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    buttonText: "VIEW MORE",
  },
  {
    image: "girls-2.jpeg",
    span: "1",
    eventImage: "hook-lounge.jpeg",
    venue: "THE HOOK LOUNGE",
    location: "LAGOS",
    buttonLink:
      "https://www.instagram.com/p/C-pNNF5IsfR/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    buttonText: "VIEW MORE",
  },
  {
    image: "women-dancing.jpg",
    span: "1",
    eventImage: "carnival.png",
    venue: "VODA BEACH CLUB",
    location: "LAGOS",
    buttonLink:
      "https://www.instagram.com/p/DEDM3Jpo4i5/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    buttonText: "VIEW MORE",
  },
  {
    image: "police.jpg",
    span: "1",
    eventImage: "halloween.JPG",
    venue: "SPICE ROUTE, VI",
    location: "LAGOS",
    buttonLink:
      "https://www.instagram.com/p/DB_3JS6oPLc/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    buttonText: "VIEW MORE",
  },
  {
    image: "grooving.jpeg",
    span: "2",
    eventImage: "carnival.png",
    venue: "VODA BEACH CLUB",
    location: "LAGOS",
    buttonLink:
      "https://www.instagram.com/p/DEDM3Jpo4i5/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    buttonText: "VIEW MORE",
  },
  {
    image: "groove.jpg",
    span: "2",
    eventImage: "hook-lounge.jpeg",
    venue: "THE HOOK LOUNGE",
    location: "LAGOS",
    buttonLink:
      "https://www.instagram.com/p/C-pk7_1oiu0/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    buttonText: "VIEW MORE",
  },
  {
    image: "girl-in-bikini.jpg",
    span: "1",
    eventImage: "hook-lounge.jpeg",
    venue: "THE HOOK LOUNGE",
    location: "LAGOS",
    buttonLink:
      "https://www.instagram.com/p/C-pk7_1oiu0/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    buttonText: "VIEW MORE",
  },
  {
    image: "silent-girl.jpg",
    span: "1",
    eventImage: "disco.jpg",
    venue: "THE LONG BAR, VI",
    location: "LAGOS",
    buttonLink:
      "https://www.instagram.com/p/DBJBbvSIajQ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    buttonText: "VIEW MORE",
  },
  {
    image: "partying.png",
    span: "2",
    eventImage: "halloween.JPG",
    venue: "SPICE ROUTE, VI",
    location: "LAGOS",
    buttonLink:
      "https://www.instagram.com/p/DB_3JS6oPLc/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    buttonText: "VIEW MORE",
  },
  {
    image: "silent-disco.png",
    span: "2",
    eventImage: "disco.jpg",
    venue: "THE LONG BAR, VI",
    location: "LAGOS",
    buttonLink:
      "https://www.instagram.com/p/DBJBbvSIajQ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    buttonText: "VIEW MORE",
  },
  {
    image: "girls-1.jpeg",
    span: "1",
    eventImage: "hook-lounge.jpeg",
    venue: "THE HOOK LOUNGE",
    location: "LAGOS",
    buttonLink:
      "https://www.instagram.com/p/C-pNNF5IsfR/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    buttonText: "VIEW MORE",
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
            className={`gallery_container relative col-span-3 h-[500px] overflow-hidden`}
            key={index}
            style={{
              gridColumn: isMobile
                ? "span 3 / span 3"
                : `span ${item.span} / span ${item.span}`,
            }}
          >
            <div
              className="event_background bg-cover w-full h-full"
              style={{
                backgroundImage: `url(/${item.image})`,
              }}
            ></div>
            <div className="event_info">
              <div>
                <Image
                  width={184}
                  height={228}
                  alt="party"
                  src={`/${item.eventImage}`}
                />
                <div className="flex justify-between">
                  <span className="light">VENUE</span>
                  <span>{item.venue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="light">LOCATION</span>
                  <span>{item.location}</span>
                </div>
                <a target="_blank" href={item.buttonLink}>
                  <button>{item.buttonText}</button>
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
