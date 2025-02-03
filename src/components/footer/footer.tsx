import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import "./styles.css";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useState } from "react";
gsap.registerPlugin(ScrollToPlugin);
const links = [
  {
    name: "instagram",
    link: "https://www.instagram.com/_pm2am?igsh=MXJoMXd1eHVnbTZjag==",
    width: 24,
    height: 24,
  },
  {
    name: "twitter",
    link: "https://x.com/pm2am_?s=21",
    width: 26.56,
    height: 24,
  },
  { name: "spotify", link: "", width: 24, height: 24 },
  {
    name: "whatsapp",
    link: "https://chat.whatsapp.com/D4Uww3fQ5hXK1yhQ383Szt",
    width: 23.87,
    height: 24,
  },
  {
    name: "tiktok",
    link: "https://www.tiktok.com/@pm2am_?_t=ZM-8roQ7TLm78x&_r=1",
    width: 20.97,
    height: 24,
  },
];

export default function Footer() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [butttonText, setButtonText] = useState("SUBSCRIBE");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setButtonText("SUBSCRIBING...");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, email }),
      });

      if (response.ok) {
        setButtonText("SUBSCRIBED!");
        setEmail("");
        setFirstName("");
      } else {
        setButtonText("TRY AGAIN :(");
      }
    } catch (error) {
      setButtonText("TRY LATER :(");
    }

    setTimeout(() => {
      setButtonText("SUBSCRIBE");
    }, 3000);
  };

  return (
    <>
      <div className="footer monument">
        <div className="logo">
          <Link href="/">
            <Image
              src="/logo-big.svg"
              alt={"Pm2am Logo"}
              width={1440.68}
              height={422}
            />
          </Link>
        </div>
        <div className="newsletter">
          <p>SUBSCRIBE TO THE GANG</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="FIRST NAME"
              className="input"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="email"
              placeholder="EMAIL ADDRESS"
              className="input"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              disabled={butttonText !== "SUBSCRIBE"}
              style={{
                cursor: butttonText !== "SUBSCRIBE" ? "not-allowed" : "pointer",
                color: butttonText !== "SUBSCRIBE" ? "#d3d3d3" : "white",
              }}
              className="btn primary"
              type="submit"
            >
              {butttonText}
            </button>
          </form>
        </div>
        <div className="nav_footer">
          <a target="_blank" href="mailto:pm2amgang@gmail.com">
            <p className="mb-5 text-lg font-semibold underline font-black">
              PM2AMGANG@GMAIL.COM
            </p>
          </a>

          <div className="flex gap-5 items-center">
            {links.map((link, index) => {
              return (
                <a key={index} href={link.link} target="_blank">
                  <Image
                    src={`/${link.name}.svg`}
                    width={link.width}
                    height={link.height}
                    alt={`${link.name} logo`}
                  />
                </a>
              );
            })}
          </div>
          <p className="mt-[40px] md:mt-[60px] text-center inter font-semibold">
            ©2024 PM2AM® ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </>
  );
}
