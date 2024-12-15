"use client";
import { useEffect, useState } from "react";
import "./gallery.css";
import Image from "next/image";

const gallery = [
  {
    image: "girls.webp",
    span: "2",
    eventImage: "carnival.png",
    venue: "VODA BEACH CLUB",
    location: "LAGOS",
    buttonLink:
      "https://tix.africa/discover/palmwine2am-with-the-outsiders-the-beach-carnival-5bd70329-6602-4940-8263-19b2b1d859b5",
    buttonText: "BUY TICKETS",
  },
  {
    image: "smiles.png",
    span: "1",
    eventImage: "rooftop.JPG",
    venue: "ASCENDA ROOFTOP",
    location: "LAGOS",
    buttonLink: "https://www.instagram.com/_pm2am?igsh=MXJoMXd1eHVnbTZjag==",
    buttonText: "VIEW MORE",
  },
  {
    image: "groove.jpeg",
    span: "3",
    eventImage: "halloween.JPG",
    venue: "SPICE ROUTE, VI",
    location: "LAGOS",
    buttonLink: "https://www.instagram.com/_pm2am?igsh=MXJoMXd1eHVnbTZjag==",
    buttonText: "VIEW MORE",
  },
  {
    image: "partying.png",
    span: "2",
    eventImage: "halloween.JPG",
    venue: "SPICE ROUTE, VI",
    location: "LAGOS",
    buttonLink: "https://www.instagram.com/_pm2am?igsh=MXJoMXd1eHVnbTZjag==",
    buttonText: "VIEW MORE",
  },
  {
    image: "silent-girl.jpg",
    span: "1",
    eventImage: "disco.JPG",
    venue: "THE LONG BAR, VI",
    location: "LAGOS",
    buttonLink: "https://www.instagram.com/_pm2am?igsh=MXJoMXd1eHVnbTZjag==",
    buttonText: "VIEW MORE",
  },
  {
    image: "girls.png",
    span: "1",
    eventImage: "carnival.png",
    venue: "VODA BEACH CLUB",
    location: "LAGOS",
    buttonLink:
      "https://tix.africa/discover/palmwine2am-with-the-outsiders-the-beach-carnival-5bd70329-6602-4940-8263-19b2b1d859b5",
    buttonText: "BUY TICKETS",
  },
  {
    image: "silent-disco.png",
    span: "2",
    eventImage: "disco.JPG",
    venue: "THE LONG BAR, VI",
    location: "LAGOS",
    buttonLink: "https://www.instagram.com/_pm2am?igsh=MXJoMXd1eHVnbTZjag==",
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
