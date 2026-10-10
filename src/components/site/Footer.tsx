"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { links, socials } from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const root = useRef<HTMLElement>(null);

  // The night ends here: the sun climbs behind the wordmark as the footer scrolls in.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer_sun",
        { yPercent: 70, scale: 0.85 },
        {
          yPercent: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 80%", end: "bottom bottom", scrub: true },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className="footer" ref={root}>
      <div className="wrap">
        <h2 className="footer_title display">
          See you at
          <br />
          <span className="tag">sunrise</span>
        </h2>

        <div className="footer_grid">
          <form className="footer_form" onSubmit={submit}>
            <p className="footer_label">Be first to know about the next one</p>
            <div className="footer_fields">
              <input placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <button className="btn btn--solid" disabled={status === "sending" || status === "done"}>
                {status === "sending" ? "Joining…" : status === "done" ? "You're in" : "Join the list"}
              </button>
            </div>
            {/* If the mailing list is unreachable, nobody who wants updates
                should hit a dead end: point them at the WhatsApp community. */}
            {status === "error" && (
              <p className="footer_error">
                Couldn&apos;t sign you up right now.{" "}
                <a href={links.community} target="_blank" rel="noopener noreferrer">
                  Join our WhatsApp community instead →
                </a>
              </p>
            )}
          </form>

          <nav className="footer_links">
            <Link href="/#events">Tickets</Link>
            <a href={links.tables} target="_blank" rel="noopener noreferrer">Tables (WhatsApp)</a>
            <a href={links.shop} target="_blank" rel="noopener noreferrer">Shop</a>
            <a href={`mailto:${links.email}`}>{links.email}</a>
          </nav>

          <ul className="footer_socials">
            {socials.map((s) => (
              <li key={s.name}>
                <a href={s.link} target="_blank" rel="noopener noreferrer" aria-label={s.name}>
                  <Image src={`/${s.name}.svg`} alt="" width={22} height={22} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer_horizon" aria-hidden="true">
        <div className="footer_sun" />
        <div className="footer_mark">
          <Image src="/logo-new.svg" alt="" width={1400} height={850} />
        </div>
      </div>
      <p className="footer_legal">© {new Date().getFullYear()} PM2AM</p>
    </footer>
  );
}
