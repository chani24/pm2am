"use client";
import { useEffect, useState } from "react";
import "./gallery.css";
import Image from "next/image";

const gallery = [
  {
    image: "girl-at-bullet-party.png",
    span: "1",
    eventImage: "ftrp.jpeg",
    venue: "PRAIA LAGOS",
    location: "LAGOS",
    buttonLink: "https://tix.africa/discover/pm2am-for-the-real-partiers-ii",
    buttonText: "BUY TICKETS",
  },
  {
    image: "two-djs.jpg",
    span: "2",
    eventImage: "anniversary.png",
    venue: "VODA BEACH CLUB",
    location: "LAGOS",
    buttonLink: "https://www.instagram.com/p/DWwqgNIDOcN/",
    buttonText: "VIEW MORE",
  },
  {
    image: "two-dancing.jpg",
    span: "1",
    eventImage: "anniversary.png",
    venue: "VODA BEACH CLUB",
    location: "LAGOS",
    buttonLink: "https://www.instagram.com/p/DWwqgNIDOcN/",
    buttonText: "VIEW MORE",
  },

  {
    image: "artiste-performing.jpg",
    span: "1",
    eventImage: "anniversary.png",
    venue: "VODA BEACH CLUB",
    location: "LAGOS",
    buttonLink: "https://www.instagram.com/p/DWwqgNIDOcN/",
    buttonText: "VIEW MORE",
  },
  {
    image: "girl-hands-up.jpeg",
    span: "1",
    eventImage: "anniversary.png",
    venue: "VODA BEACH CLUB",
    location: "LAGOS",
    buttonLink: "https://www.instagram.com/p/DWwqgNIDOcN/",
    buttonText: "VIEW MORE",
  },
  {
    image: "2-girls-ii.png",
    span: "1",
    eventImage: "carnival-ii.png",
    venue: "VODA BEACH CLUB",
    location: "LAGOS",
    buttonLink: "https://www.instagram.com/p/DSpwWGCjEbt/",
    buttonText: "VIEW MORE",
  },
  {
    image: "partying-at-bullet.png",
    span: "1",
    eventImage: "bullet-party.png",
    venue: "PRAIA LAGOS, VI",
    location: "LAGOS",
    buttonLink: "https://www.instagram.com/p/DUBL33XDLuO/?img_index=4",
    buttonText: "VIEW MORE",
  },

  {
    image: "2-girls.jpg",
    span: "1",
    eventImage: "carnival-ii.png",
    venue: "VODA BEACH CLUB",
    location: "LAGOS",
    buttonLink: "https://www.instagram.com/p/DSpwWGCjEbt/",
    buttonText: "VIEW MORE",
  },

  {
    image: "guy-smiling.jpg",
    span: "1",
    eventImage: "day-shift.jpeg",
    venue: "VODA BEACH CLUB",
    location: "LAGOS",
    buttonLink: "",
    buttonText: "VIEW MORE",
  },
  {
    image: "day-shift-party.jpeg",
    span: "2",
    eventImage: "carnival-ii.png",
    venue: "VODA BEACH CLUB",
    location: "LAGOS",
    buttonLink: "https://www.instagram.com/p/DSpwWGCjEbt/",
    buttonText: "VIEW MORE",
  },
  {
    image: "3-girls.jpeg",
    span: "2",
    eventImage: "day-shift.jpeg",
    venue: "VODA BEACH CLUB",
    location: "LAGOS",
    buttonLink: "",
    buttonText: "VIEW MORE",
  },
  {
    image: "girl-in-brazil.jpg",
    span: "1",
    eventImage: "day-shift.jpeg",
    venue: "VODA BEACH CLUB",
    location: "LAGOS",
    buttonLink: "",
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
                <a
                  target="_blank"
                  href={
                    item.buttonLink ||
                    "https://www.instagram.com/pm2amofficial_/"
                  }
                >
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
