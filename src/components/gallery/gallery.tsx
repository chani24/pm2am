"use client";
import { useEffect, useState } from "react";
import "./gallery.css";
import Image from "next/image";

const gallery = [
  {
    image: "echo.png", //"social-nights.png", //"2-girls.jpg",
    span: "1",
    eventImage: "echo.png",
    venue: "THE CLUBHOUSE, VI",
    location: "LAGOS",
    buttonLink: "https://tix.africa/pm2ammadhouse",
    buttonText: "BUY TICKETS",
  },
  {
    image: "day-shift-party.jpeg",
    span: "2",
    eventImage: "day-shift.jpeg",
    venue: "VODA BEACH CLUB",
    location: "LAGOS",
    buttonLink: "https://www.instagram.com/p/DKm4YWXIJyD/?hl=en&img_index=1",
    buttonText: "VIEW MORE",
  },
  {
    image: "3-girls.jpeg",
    span: "2",
    eventImage: "day-shift.jpeg",
    venue: "VODA BEACH CLUB",
    location: "LAGOS",
    buttonLink: "https://www.instagram.com/p/DKm4YWXIJyD/?hl=en&img_index=1",
    buttonText: "VIEW MORE",
  },

  {
    image: "guy-smiling.jpg",
    span: "1",
    eventImage: "day-shift.jpeg",
    venue: "VODA BEACH CLUB",
    location: "LAGOS",
    buttonLink: "https://www.instagram.com/p/DKm4YWXIJyD/?hl=en&img_index=1",
    buttonText: "VIEW MORE",
  },
  {
    image: "girl-in-brazil.jpg",
    span: "1",
    eventImage: "day-shift.jpeg",
    venue: "VODA BEACH CLUB",
    location: "LAGOS",
    buttonLink: "https://www.instagram.com/p/DKm4YWXIJyD/?hl=en&img_index=1",
    buttonText: "VIEW MORE",
  },

  {
    image: "aw-girl-dancing.jpeg",
    span: "1",
    eventImage: "all-white.jpg",
    venue: "THE CLUBHOUSE",
    location: "LAGOS",
    buttonLink:
      "https://www.instagram.com/p/DIcBtpJoL3-/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    buttonText: "VIEW MORE",
  },
  {
    image: "aw-man-and-drink.jpeg",
    span: "1",
    eventImage: "all-white.jpg",
    venue: "THE CLUBHOUSE",
    location: "LAGOS",
    buttonLink:
      "https://www.instagram.com/p/DIcBtpJoL3-/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    buttonText: "VIEW MORE",
  },
  {
    image: "aw-girl-with-cash.jpg",
    span: "1",
    eventImage: "all-white.jpg",
    venue: "THE CLUBHOUSE",
    location: "LAGOS",
    buttonLink:
      "https://www.instagram.com/p/DIcBtpJoL3-/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    buttonText: "VIEW MORE",
  },
  {
    image: "aw-partiers.png",
    span: "2",
    eventImage: "all-white.jpg",
    venue: "THE CLUBHOUSE",
    location: "LAGOS",
    buttonLink:
      "https://www.instagram.com/p/DIcBtpJoL3-/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    buttonText: "VIEW MORE",
  },
  // {
  //   image: "aw-two-guys.jpeg",
  //   span: "1",
  //   eventImage: "all-white.jpg",
  //   venue: "THE CLUBHOUSE",
  //   location: "LAGOS",
  //   buttonLink:
  //     "https://www.instagram.com/p/DIcBtpJoL3-/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  //   buttonText: "VIEW MORE",
  // },

  {
    image: "heart-sign.jpeg",
    span: "1",
    eventImage: "raves-and-roses.jpeg",
    venue: "SPICE ROUTE, VI",
    location: "LAGOS",
    buttonLink: "https://www.instagram.com/p/DGkuTj9oOdj/?hl=en&img_index=1",
    buttonText: "VIEW MORE",
  },
  {
    image: "two-ravers.jpeg",
    span: "1",
    eventImage: "raves-and-roses.jpeg",
    venue: "SPICE ROUTE, VI",
    location: "LAGOS",
    buttonLink: "https://www.instagram.com/p/DGkuTj9oOdj/?hl=en&img_index=1",
    buttonText: "VIEW MORE",
  },
  {
    image: "two-ravers-2.jpeg",
    span: "1",
    eventImage: "raves-and-roses.jpeg",
    venue: "SPICE ROUTE, VI",
    location: "LAGOS",
    buttonLink: "https://www.instagram.com/p/DGkuTj9oOdj/?hl=en&img_index=1",
    buttonText: "VIEW MORE",
  },

  {
    image: "two-partiers.jpeg",
    span: "1",
    eventImage: "carnival.png",
    venue: "VODA BEACH CLUB",
    location: "LAGOS",
    buttonLink:
      "https://www.instagram.com/p/DEDM3Jpo4i5/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    buttonText: "VIEW MORE",
  },
  {
    image: "rave-rose-party.jpeg",
    span: "2",
    eventImage: "raves-and-roses.jpeg",
    venue: "SPICE ROUTE, VI",
    location: "LAGOS",
    buttonLink: "https://www.instagram.com/p/DGkuTj9oOdj/?hl=en&img_index=1",
    buttonText: "VIEW MORE",
  },
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
    image: "dj-naffy.jpeg",
    span: "1",
    eventImage: "carnival.png",
    venue: "VODA BEACH CLUB",
    location: "LAGOS",
    buttonLink:
      "https://www.instagram.com/p/DEDM3Jpo4i5/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
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
    image: "girls-1.jpeg",
    span: "1",
    eventImage: "hook-lounge.jpeg",
    venue: "THE HOOK LOUNGE",
    location: "LAGOS",
    buttonLink:
      "https://www.instagram.com/p/C-pNNF5IsfR/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    buttonText: "VIEW MORE",
  },
  {
    image: "rave-at-the-roses.jpeg",
    span: "2",
    eventImage: "raves-and-roses.jpeg",
    venue: "SPICE ROUTE, VI",
    location: "LAGOS",
    buttonLink: "https://www.instagram.com/p/DGkuTj9oOdj/?hl=en&img_index=1",
    buttonText: "VIEW MORE",
  },
  {
    image: "at-the-rave.jpeg",
    span: "1",
    eventImage: "raves-and-roses.jpeg",
    venue: "SPICE ROUTE, VI",
    location: "LAGOS",
    buttonLink: "https://www.instagram.com/p/DGkuTj9oOdj/?hl=en&img_index=1",
    buttonText: "VIEW MORE",
  },
  {
    image: "selfie-at-voda.jpeg",
    span: "1",
    eventImage: "carnival.png",
    venue: "VODA BEACH CLUB",
    location: "LAGOS",
    buttonLink:
      "https://www.instagram.com/p/DEDM3Jpo4i5/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    buttonText: "VIEW MORE",
  },
  {
    image: "silent-girl.jpg",
    span: "1",
    eventImage: "disco.JPG",
    venue: "THE LONG BAR, VI",
    location: "LAGOS",
    buttonLink:
      "https://www.instagram.com/p/DBJBbvSIajQ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
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
              className="event_background bg-cover bg-center w-full h-full"
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
