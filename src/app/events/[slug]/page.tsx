import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import StickyCta from "@/components/site/StickyCta";
import Tagline from "@/components/site/Tagline";
import { events, eventTitle, links, upcomingEvents } from "@/config/site";

type Params = { params: Promise<{ slug: string }> };

export const revalidate = 3600;

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) return {};
  const title = `${eventTitle(event)} — ${event.dayLabel}`;
  const image = event.flyer ?? event.image;
  return {
    title,
    description: event.intro,
    openGraph: { title, description: event.intro, images: [image] },
    twitter: { card: "summary_large_image", title, description: event.intro, images: [image] },
  };
}

export default async function EventPage({ params }: Params) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();
  const others = upcomingEvents().filter((e) => e.slug !== event.slug);

  return (
    <>
      <Nav />
      <main className="ev">
        <section className="ev_hero">
          {/* A poster used as the banner is blurred into a backdrop so its own text
              doesn't clash with the title; the sharp poster sits in the body. */}
          <Image
            src={event.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className={`ev_hero_img ${event.image === event.flyer ? "ev_hero_img--poster" : ""}`}
          />
          <div className="hero_shade" aria-hidden="true" />
          <div className="wrap ev_hero_inner">
            <Link href="/#events" className="link-arrow">← All nights</Link>
            <p className="ev_collab">{event.collab ? `PM2AM x ${event.collab}` : "PM2AM presents"}</p>
            <h1 className="ev_title">
              <Tagline text={event.styledName ?? event.name} />
            </h1>
            {event.tagline && <p><Tagline text={event.tagline} className="ev_tag" /></p>}
            <dl className="ev_meta">
              <div><dt>Date</dt><dd>{event.dayLabel}</dd></div>
              <div><dt>Time</dt><dd>{event.timeLabel}</dd></div>
              <div><dt>Venue</dt><dd>{event.venue}, {event.city}</dd></div>
            </dl>
            <div className="hero_ctas">
              <a href={event.ticketLink} target="_blank" rel="noopener noreferrer" className="btn btn--solid btn--lg">Buy Tickets</a>
              <a href={links.tables} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--lg">Book a Table</a>
            </div>
          </div>
        </section>

        <section className="wrap ev_body">
          <div className="ev_copy">
            <p className="ev_intro display">{event.intro}</p>
            {event.body.map((p, i) => <p key={i}>{p}</p>)}
            {event.highlights && (
              <ul className="ev_highlights">
                {event.highlights.map((h) => <li key={h}>{h}</li>)}
              </ul>
            )}
            {event.signoff && <p className="ev_signoff display">{event.signoff}</p>}
          </div>

          <aside className="ev_flyer">
            {event.flyer ? (
              <div className="ev_flyer_img">
                <Image src={event.flyer} alt={`${eventTitle(event)} flyer`} fill sizes="(max-width: 900px) 100vw, 35vw" />
              </div>
            ) : (
              <div className="ev_flyer_soon">
                <span>{event.dateLabel}</span>
                <p className="display">Flyer drops soon</p>
                <span>{eventTitle(event)}</span>
              </div>
            )}
          </aside>
        </section>

        {others.length > 0 && (
          <section className="wrap ev_others">
            <p className="shead_time"><span className="shead_dot" />Other nights</p>
            <ul>
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/events/${o.slug}`} className="ocard">
                    <div className="ocard_img"><Image src={o.image} alt="" fill sizes="(max-width: 700px) 80vw, 30vw" /></div>
                    <span>{o.dateLabel} · {o.venue}</span>
                    <h3 className="display">{o.name}</h3>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <Footer />
      <StickyCta ticketHref={event.ticketLink} />
    </>
  );
}
