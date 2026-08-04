// Single source of truth for the currently-promoted event.
// Update this file when the event changes — every section (hero, nav,
// ticket modal, "next up") reads from here, so nothing else needs editing.

export const currentEvent = {
  name: "PM2AM WITH SMALLZTHEDJ",
  shortName: "WITH SMALLZTHEDJ",
  dateLabel: "15.AUG.26",
  fullDate: "SAT, AUG 15, 2026",
  venue: "EGG",
  location: "LONDON",
  link: "https://www.eventbrite.com/e/pm2am-with-smallzthedj-tickets-1987649198258?aff=pm2am",
  poster: "/pm2amsmalls.jpeg",
};

// Past events shown (as plain text, not links) in the nav's EVENTS dropdown.
export const pastEvents = ["FOR THE REAL PARTIERS", "THE ANNIVERSARY"];
