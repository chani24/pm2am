"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { links } from "@/config/site";

// Mobile-only bar that appears once the hero's own buttons scroll away.
export default function StickyCta({ ticketHref = "/#events" }: { ticketHref?: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const nearEnd = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 400;
      setShow(window.scrollY > window.innerHeight * 0.8 && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`sticky ${show ? "sticky--on" : ""}`}>
      {ticketHref.startsWith("http") ? (
        <a href={ticketHref} target="_blank" rel="noopener noreferrer" className="btn btn--solid">
          Tickets
        </a>
      ) : (
        <Link href={ticketHref} className="btn btn--solid">
          Tickets
        </Link>
      )}
      <a href={links.tables} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
        Tables
      </a>
    </div>
  );
}
