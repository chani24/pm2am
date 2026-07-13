// Single source of truth for the currently-promoted event.
// Update this file when the event changes — every section (hero, nav,
// ticket modal, "next up") reads from here, so nothing else needs editing.

export const currentEvent = {
  name: "PM2AM WITH SMALLZTHEDJ",
  shortName: "WITH SMALLZTHEDJ",
  dateLabel: "01.AUG.26",
  fullDate: "SAT, AUG 1, 2026",
  venue: "CASA 45",
  location: "V.I LAGOS",
  link: "https://faaji.app/party/6a4dfdc5d305d1001528c504",
  poster: "/casa-45.png",
};

// Past events shown (as plain text, not links) in the nav's EVENTS dropdown.
export const pastEvents = ["FOR THE REAL PARTIERS", "THE ANNIVERSARY"];
