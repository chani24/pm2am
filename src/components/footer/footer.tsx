import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import "./styles.css";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
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
  const goBackTop = () => {
    const heroDiv = document.querySelector(".hero_section");
    if (heroDiv && window) {
      gsap.to(window, {
        duration: 1,
        scrollTo: heroDiv,
        ease: "power2.inOut",
      }); 
    }
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
        <div className="text-center  underline sm:hidden">
          <p className="text-2xl font-black pt-[40px]" onClick={goBackTop}>
            BACK TO TOP
          </p>
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
