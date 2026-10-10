import { heroSlides, heroVideos, links, type PartyEvent } from "@/config/site";
import HeroMedia from "./HeroMedia";
import Marquee from "./Marquee";

export default function Hero({ upcoming }: { upcoming: PartyEvent[] }) {
  const dates = upcoming.map((e) => `${e.name} ${e.dateLabel}`);
  const scene = [
    "Detty December",
    ...upcoming.filter((e) => e.collab).map((e) => `PM2AM x ${e.collab}`),
    ...Array.from(new Set(upcoming.map((e) => e.venue))),
  ];

  return (
    <section className="hero" id="home">
      <HeroMedia video={heroVideos[0]} slides={heroSlides} />
      <div className="hero_shade" aria-hidden="true" />

      <div className="hero_inner">
        <h1 className="hero_title tag tag--solid">
          <span className="hero_line">For the real</span>
          <span className="hero_line">partiers</span>
        </h1>

        <div className="hero_ctas">
          <a href="#events" className="btn btn--solid">
            Buy Tickets
          </a>
          <a href={links.tables} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
            Book a Table
          </a>
        </div>
      </div>

      <div className="hero_tickers">
        {dates.length > 0 && <Marquee items={dates} tilt={-2} />}
        <Marquee items={scene} variant="light" reverse tilt={1.5} />
      </div>
    </section>
  );
}
