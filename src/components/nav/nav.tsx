import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "./styles.css";
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

export default function Nav(props: any) {
  const [dropDown, setDropdown] = useState(false);
  return (
    <>
      <div className={props.fixed ? "hero_nav fixed_nav" : "hero_nav"}>
        <Link href="/">
          <Image
            src="/logo.svg"
            alt={"Pm2am Logo"}
            width={131.68}
            height={40}
          />
        </Link>
        <div>
          <div className="pc_links inter">
            <div>
              <p className="mb-2 font-bold">EVENTS</p>
              <div className="font-semibold">
                <div className="flex gap-2 items-center justify-center">
                  {" "}
                  <a
                    href="https://tix.africa/discover/palmwine2am-with-the-outsiders-the-beach-carnival-5bd70329-6602-4940-8263-19b2b1d859b5"
                    target="_blank"
                  >
                    THE BEACH CARNIVAL
                  </a>
                  <div className="new">NEW</div>
                </div>
                <p>HALLOWEEN SPECIAL</p>
              </div>
            </div>
            <div>
              <p className="mb-2 font-bold">CONTACT US</p>
              <div className="font-semibold">
                <div>
                  <p>PM2AM GANG</p>
                  <a
                    className="underline"
                    href="https://tix.africa/discover/palmwine2am-with-the-outsiders-the-beach-carnival-5bd70329-6602-4940-8263-19b2b1d859b5"
                    target="_blank"
                  >
                    GET IN TOUCH
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className={"mobile_links"}>
            <button onClick={() => setDropdown(!dropDown)}>MENU</button>
          </div>
        </div>
      </div>

      <div className={dropDown ? "mobile_nav active" : "mobile_nav"}>
        <div className="nav">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt={"Pm2am Logo"}
              width={131.68}
              height={40}
            />
          </Link>
          <div>
            <div className="pc_links"></div>
            <div className={dropDown ? "mobile_links active" : "mobile_links"}>
              <button onClick={() => setDropdown(!dropDown)}>CLOSE</button>
            </div>
          </div>
        </div>
        <div className="text-center">
          <p className="mb-5 text-2xl font-black">EVENTS</p>
          <div className="font-sm font-semibold">
            <div className="flex gap-2 items-center justify-center">
              {" "}
              <a
                href="https://tix.africa/discover/palmwine2am-with-the-outsiders-the-beach-carnival-5bd70329-6602-4940-8263-19b2b1d859b5"
                target="_blank"
              >
                THE BEACH CARNIVAL
              </a>
              <div className="new">NEW</div>
            </div>
            <p className="text-[#C2C2C2]">HALLOWEEN SPECIAL</p>
          </div>
        </div>
        <div className="nav_footer">
          <a target="_blank" href="mailto:pm2amgang@gmail.com">
            <p className="mb-5 text-lg font-semibold underline">
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
          <p className="mt-[40px] text-center inter font-semibold">
            ©2024 PM2AM® ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </>
  );
}
