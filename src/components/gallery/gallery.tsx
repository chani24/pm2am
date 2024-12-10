"use client";
import { useEffect, useState } from "react";
import "./gallery.css";
import Image from "next/image";

const gallery = [
  {
    image: "payment",
    span: "2",
    eventImage: "carnival",
    venue: "VODA BEACH CLUB",
    location: "LAGOS",
    buttonLink:
      "https://tix.africa/discover/palmwine2am-with-the-outsiders-the-beach-carnival-5bd70329-6602-4940-8263-19b2b1d859b5",
    buttonText: "BUY TICKETS",
  },
  {
    image: "smiles",
    span: "1",
    eventImage: "halloween",
    venue: "VODA BEACH CLUB",
    location: "LAGOS",
    buttonLink:
      "https://tix.africa/discover/palmwine2am-with-the-outsiders-the-beach-carnival-5bd70329-6602-4940-8263-19b2b1d859b5",
    buttonText: "BUY TICKETS",
  },
  {
    image: "gathering",
    span: "3",
    eventImage: "carnival",
    venue: "VODA BEACH CLUB",
    location: "LAGOS",
    buttonLink:
      "https://tix.africa/discover/palmwine2am-with-the-outsiders-the-beach-carnival-5bd70329-6602-4940-8263-19b2b1d859b5",
    buttonText: "BUY TICKETS",
  },
  {
    image: "partying",
    span: "2",
    eventImage: "halloween",
    venue: "VODA BEACH CLUB",
    location: "LAGOS",
    buttonLink:
      "https://tix.africa/discover/palmwine2am-with-the-outsiders-the-beach-carnival-5bd70329-6602-4940-8263-19b2b1d859b5",
    buttonText: "BUY TICKETS",
  },
  {
    image: "girls",
    span: "1",
    eventImage: "carnival",
    venue: "VODA BEACH CLUB",
    location: "LAGOS",
    buttonLink:
      "https://tix.africa/discover/palmwine2am-with-the-outsiders-the-beach-carnival-5bd70329-6602-4940-8263-19b2b1d859b5",
    buttonText: "BUY TICKETS",
  },
  {
    image: "girls",
    span: "1",
    eventImage: "halloween",
    venue: "VODA BEACH CLUB",
    location: "LAGOS",
    buttonLink:
      "https://tix.africa/discover/palmwine2am-with-the-outsiders-the-beach-carnival-5bd70329-6602-4940-8263-19b2b1d859b5",
    buttonText: "BUY TICKETS",
  },
  {
    image: "gathering",
    span: "2",
    eventImage: "carnival",
    venue: "VODA BEACH CLUB",
    location: "LAGOS",
    buttonLink:
      "https://tix.africa/discover/palmwine2am-with-the-outsiders-the-beach-carnival-5bd70329-6602-4940-8263-19b2b1d859b5",
    buttonText: "BUY TICKETS",
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
            className={`gallery_container relative col-span-3 h-[500px]`}
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
                backgroundImage: `url(/${item.image}.png)`,
              }}
            ></div>
            <div className="event_info">
              <div>
                <Image
                  width={184}
                  height={228}
                  alt="party"
                  src={`/${item.eventImage}.png`}
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
