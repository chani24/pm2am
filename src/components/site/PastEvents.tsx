import Image from "next/image";
import { gallery, links } from "@/config/site";
import SectionHead from "./SectionHead";

// Snaps from past nights, printed like instant-camera photocards.
export default function PastEvents() {
  return (
    <section className="past" id="past">
      <div className="wrap">
        <SectionHead
          title="Recap"
          aside={
            <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="link-arrow">
              More on Instagram →
            </a>
          }
        />

        <ul className="cards">
          {gallery.map((shot, i) => (
            <li key={`${shot.src}-${i}`}>
              <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="pcardx">
                <div className="pcardx_img">
                  <Image src={shot.src} alt={`${shot.event} — PM2AM`} fill sizes="(max-width: 700px) 50vw, 25vw" />
                </div>
                <span className="pcardx_note tag">{shot.event}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
