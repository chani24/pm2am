"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { links } from "@/config/site";
import { lockScroll } from "./SmoothScroll";

const menu = [
  { label: "Upcoming", href: "/#events" },
  { label: "About", href: "/#about" },
  { label: "Shop", href: "/#shop" },
  { label: "Past Events", href: "/#past" },
  { label: "Sounds", href: "/#sounds" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const tick = () => {
      setScrolled(window.scrollY > 40);
    };
    tick();
    window.addEventListener("scroll", tick, { passive: true });
    return () => window.removeEventListener("scroll", tick);
  }, []);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    return () => lockScroll(false);
  }, [open]);

  return (
    <>
      <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <Link href="/" className="nav_logo" aria-label="PM2AM home" onClick={() => setOpen(false)}>
          <Image src="/logo-new.svg" alt="PM2AM" width={112} height={68} priority />
        </Link>


        <div className="nav_actions">
          <Link href="/#events" className="btn btn--solid btn--sm nav_tickets">
            Tickets
          </Link>
          <button
            className={`nav_burger ${open ? "is-open" : ""}`}
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`menu ${open ? "menu--open" : ""}`} aria-hidden={!open}>
        <nav className="menu_links">
          {menu.map((m, i) => (
            <Link key={m.href} href={m.href} onClick={() => setOpen(false)} style={{ transitionDelay: `${open ? 80 + i * 50 : 0}ms` }}>
              <span>0{i + 1}</span>
              {m.label}
            </Link>
          ))}
        </nav>
        <div className="menu_foot">
          <Link href="/#events" className="btn btn--solid" onClick={() => setOpen(false)}>
            Buy Tickets
          </Link>
          <a href={links.tables} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
            Book a Table
          </a>
        </div>
      </div>
    </>
  );
}
