// Single source of truth for the currently-promoted event(s).
// `currentEvents` is a list — add/remove entries here when events change,
// every section (marquee, hero, "also live" strip, nav, ticket modal) reads
// from it, so nothing else needs editing.
//
// Order matters: the FIRST entry is the primary/hero event shown big on the
// homepage. Any entries after it render in a slim "ALSO LIVE" strip below
// the hero. All entries show up in the nav dropdown and the tickets modal.
// Once an event is over, delete its entry here and add its `shortName` to
// `pastEvents` below.

export type PromotedEvent = {
  name: string;
  shortName: string;
  dateLabel: string;
  fullDate: string;
  /** ISO datetime (with offset) the countdown counts down to. */
  isoDate: string;
  venue: string;
  location: string;
  link: string;
  poster: string;
  /** Short blurb shown under the hero title (primary event only). */
  description: string;
};

export const currentEvents: PromotedEvent[] = [
  {
    name: "ALL WHITE WITH DJ ROSCO",
    shortName: "DJ ROSCO",
    dateLabel: "03.OCT.26",
    fullDate: "SAT, OCT 3, 2026",
    isoDate: "2026-10-03T00:00:00+01:00",
    venue: "CASA 45",
    location: "LAGOS",
    link: "https://tix.africa/discover/pm2am-with-rosco-all-white-affair",
    poster: "/rosco.png",
    description:
      "PM2AM with DJ Rosco at Casa 45, Adeola Odeku, Victoria Island. Tickets and event details are available on Tix Africa.",
  },
];

// Back-compat alias — most of the site only cares about "the" (primary/hero)
// current event.
export const currentEvent = currentEvents[0];

// Past events shown (as plain text, not links) in the nav's EVENTS dropdown.
export const pastEvents = [
  "PM2AM VICE CITY",
  "FOR THE REAL PARTIERS",
  "THE ANNIVERSARY",
];
