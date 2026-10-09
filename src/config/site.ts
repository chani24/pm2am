import media from "./media.json";

// Single source of truth for everything the homepage and event pages render.
// Photos come from public/media (built by `yarn media`); swap paths here, no component edits needed.
//
// Events drop off "Upcoming" automatically once `endsAt` has passed; move
// them into `pastEvents` with their photos when you have them.

export const links = {
  tables: "https://wa.link/2iibxc",
  shop: "https://pm2amstore.bumpa.shop",
  youtube: "https://www.youtube.com/@Pm2amgang",
  instagram: "https://www.instagram.com/pm.2am/",
  email: "PM2AMGANG@gmail.com",
};

export const socials = [
  { name: "instagram", link: "https://www.instagram.com/pm.2am/" },
  { name: "twitter", link: "https://x.com/pm2am_?s=21" },
  { name: "tiktok", link: "https://www.tiktok.com/@pm2am_?_t=ZM-8roQ7TLm78x&_r=1" },
  { name: "snapchat", link: "https://snapchat.com/t/h7hWHPuu" },
  { name: "youtube", link: "https://www.youtube.com/@Pm2amgang" },
  {
    name: "whatsapp",
    link: "https://chat.whatsapp.com/GzJaIv9HJUE5KHhuQKcnKf?s=cl&p=i&ilr=0&amv=2",
  },
];

export type PartyEvent = {
  slug: string;
  name: string;
  /** Collab partner shown as "PM2AM x ___". */
  collab?: string;
  /** Name as displayed; the *starred* word is set in the graffiti face. */
  styledName?: string;
  /** Optional theme line; the *starred* word is set in the graffiti face. */
  tagline?: string;
  startsAt: string;
  endsAt: string;
  dateLabel: string;
  dayLabel: string;
  timeLabel: string;
  venue: string;
  city: string;
  ticketLink: string;
  /** Mood photo used on the homepage row + event page banner. */
  image: string;
  /** Official flyer, when one exists. */
  flyer?: string;
  intro: string;
  body: string[];
  highlights?: string[];
  signoff?: string;
};

export const events: PartyEvent[] = [
  {
    slug: "after-dark",
    name: "After Dark",
    styledName: "After *Dark*",
    startsAt: "2026-10-31T21:00:00+01:00",
    endsAt: "2026-11-01T05:00:00+01:00",
    dateLabel: "31.10",
    dayLabel: "Sat 31 Oct",
    timeLabel: "9PM – 5AM",
    venue: "Casa 45",
    city: "Lagos",
    ticketLink: "https://tix.africa/discover/pm2amhalloween",
    image: "/halloween-flyer.png",
    flyer: "/halloween-flyer.png",
    intro:
      "This Halloween, PM2AM takes over Casa 45 for a night where mystery, music and nightlife collide.",
    body: [
      "On October 31st, step into PM2AM: Halloween Edition — a darker, more seductive side of the PM2AM experience. Expect electrifying sets, haunting energy, unforgettable costumes and a room filled with Lagos’ finest party crowd.",
      "There are no rules to the look — come masked, mysterious, glamorous, wicked or simply as your best after-dark self.",
    ],
    signoff: "When the lights go down, PM2AM comes alive. Welcome to After Dark.",
  },
  {
    slug: "tropicana",
    name: "Tropicana",
    collab: "AfroFête",
    tagline: "*Homecoming*",
    startsAt: "2026-12-19T19:00:00+01:00",
    endsAt: "2026-12-20T06:00:00+01:00",
    dateLabel: "19.12",
    dayLabel: "Sat 19 Dec",
    timeLabel: "7PM – 6AM",
    venue: "Voda Beach Club",
    city: "Lagos",
    ticketLink: "https://tix.africa/discover/pm2am-x-afrofete-tropicana",
    image: "/media/gallery/hot-body-summer/hot-body-poolside-friends.jpg",
    intro:
      "This December, AfroFête and PM2AM come together for TROPICANA: HOMECOMING — a one-night celebration of music, culture and the energy of Lagos.",
    body: [
      "Taking over Voda Beach Club on 19 December, expect an all-night journey from sunset into sunrise, bringing together some of our favourite international DJs alongside Lagos’ homegrown selectors.",
      "From Afrobeats and Amapiano to Afro House and everything in between, TROPICANA is where the diaspora meets home.",
    ],
    highlights: [
      "Beach club experience",
      "International x homegrown DJs",
      "Afrobeats · Amapiano · Afro House",
      "Poolside & cabana tables",
      "General admission & stage access",
      "Food & drinks available",
      "Content & experiences all night",
      "Party until sunrise",
    ],
    signoff: "International sounds. Lagos energy. One homecoming.",
  },
  {
    slug: "sweet-n-reckless",
    name: "Sweet N Reckless",
    collab: "AfroVerified",
    tagline: "Toronto meets *Lagos*",
    startsAt: "2026-12-23T20:00:00+01:00",
    endsAt: "2026-12-24T05:00:00+01:00",
    dateLabel: "23.12",
    dayLabel: "Wed 23 Dec",
    timeLabel: "8PM – 5AM",
    venue: "Casa 45",
    city: "Lagos",
    ticketLink: "https://tix.africa/discover/pm2am-x-afroverified-sweet-n-reckless",
    image: "/media/gallery/all-white-with-dj-rosco/all-white-crowd-green-light.jpg",
    intro: "Two cities. Two cultures. One reckless night.",
    body: [
      "This December, PM2AM links up with Toronto-based AfroVerified for SWEET N RECKLESS — an international nightlife collaboration bringing the energy of the diaspora straight into the heart of Lagos.",
      "From Toronto to Lagos, we’re bringing communities together through music, culture, fashion and nightlife, with a soundtrack of Afrobeats, Amapiano, Hip-Hop and everything in between.",
      "Expect big DJs, beautiful people, international energy and the kind of night you’ll still be talking about long after December ends.",
    ],
  },
  {
    slug: "the-finale",
    name: "The Finale",
    tagline: "One last *dance*",
    startsAt: "2026-12-27T20:00:00+01:00",
    endsAt: "2026-12-28T05:00:00+01:00",
    dateLabel: "27.12",
    dayLabel: "Sun 27 Dec",
    timeLabel: "8PM – 5AM",
    venue: "Casa 45",
    city: "Lagos",
    ticketLink: "https://tix.africa/discover/pm2am-the-finale",
    image: "/media/hero/02-purple-crowd-screens.jpg",
    intro: "One last dance. One final shutdown.",
    body: [
      "December has been a movie. Now it’s time for the final scene.",
      "This December 27th, PM2AM presents THE FINALE at Casa 45 — one last night to bring the energy, the people and the madness of Detty December together.",
      "Expect a packed house, some of your favourite DJs, nonstop energy and a SURPRISE HEADLINER taking over the night. Who? We’re not telling you yet.",
    ],
    signoff: "Just know you’ll want to be there when the lights go down.",
  },
];

export function eventTitle(e: PartyEvent) {
  return e.collab ? `PM2AM x ${e.collab}: ${e.name}` : `PM2AM: ${e.name}`;
}

export function upcomingEvents(now = Date.now()) {
  return events
    .filter((e) => new Date(e.endsAt).getTime() > now)
    .sort((a, b) => +new Date(a.startsAt) - +new Date(b.startsAt));
}

export const about = {
  copy:
    "PM2AM is more than a party. It’s a culture, a community, a lifestyle — a space where music, freedom and individuality collide. We bring people together through unforgettable nights, real connections and a shared love for living in the moment. You don’t just attend PM2AM. You belong to it.",
  photos: [
    "/media/gallery/beach-carnival/beach-carnival-two-friends.jpg",
    "/media/gallery/vice-city/vice-city-certified-real-partiers.jpg",
    "/media/gallery/beach-carnival/beach-carnival-three-friends.jpg",
    "/media/gallery/all-white-with-dj-rosco/all-white-dancefloor.jpg",
  ],
};

// Partners from the latest flyer (Halloween), shown in the About ticker.
export const sponsors = [
  "Casa 45",
  "Bullet",
  "Bigi",
  "Smirnoff",
  "Gordon’s",
  "Chowder",
  "Chowdeck",
  "Johnnie Walker",
];

export type Product = { name: string; price: string; image: string; link: string };

// Mirrors pm2amstore.bumpa.shop (checked 2026-10-09). Images are served from
// Bumpa's CDN; prices are the per-size prices shown on each product page.
const bumpaImg = "https://dodptt9f4zk9h.cloudfront.net/stores/240450/products/";
const bumpaProduct = "https://pm2amstore.bumpa.shop/products/";

export const products: Product[] = [
  { name: "Black PM2AM x Clappedmob Tee", price: "₦25,000", image: `${bumpaImg}3d0fcb79454de8abb93abf54f4d2ce448f183560.jpeg`, link: `${bumpaProduct}black-pm2am-x-clappedmob-tee/2715516` },
  { name: "White PM2AM x Clappedmob Tee", price: "₦25,000", image: `${bumpaImg}f2fb96e13266201a8e4f6b3acc2d8eb58573b4c6.jpeg`, link: `${bumpaProduct}white-pm2am-x-clappedmob-tee/2715518` },
  { name: "Red PM2AM x Clappedmob Tee", price: "₦25,000", image: `${bumpaImg}c56ab35959ba9264ea8a26740b129904fde557c2.jpeg`, link: `${bumpaProduct}red-pm2am-x-clappedmob-tee/2647387` },
  { name: "Hot Body Tee — White", price: "₦20,000", image: `${bumpaImg}5a1abc2e53c764653a65ab76be29bdbb5cca06f6.jpeg`, link: `${bumpaProduct}pm2am-x-wicked-sexy-hot-body-tee-in-white/4991022` },
  { name: "Hot Body Tee — Black", price: "₦20,000", image: `${bumpaImg}7036ec3766337a3f92afee3bf0f46f2c2e2ccc8b.jpeg`, link: `${bumpaProduct}pm2am-x-wicked-sexy-hot-body-tee-in-black/4991031` },
  { name: "Hot Body Tank Top", price: "₦23,000", image: `${bumpaImg}7bd6f068e0a1c9ce2f98a5c01666099fc40ee8e8.jpeg`, link: `${bumpaProduct}hot-body-tank-top/5000617` },
];

// Recap gallery: built from media-src/gallery by `yarn media`; subfolder = caption.
export type GalleryShot = { src: string; event: string };


export type DjSet = { id: string; dj: string; title: string };

export const sets: DjSet[] = [
  { id: "cjml6_VoFhc", dj: "DJ Bonamax", title: "PM2AM x DJ Bonamax" },
  { id: "tdC8RBsLWHg", dj: "DJ Yanfssss", title: "Anniversary Set" },
  { id: "WIqWhVy2DYY", dj: "DJ Tobi Peter", title: "Anniversary — Live" },
  { id: "BKDqN_nvTQU", dj: "DJ Farati", title: "No Love in Lagos — Full Set" },
  { id: "sF4UpVqnO5E", dj: "DJ Rola", title: "PM2AM x DJ Rola" },
];


// Real media, written by `yarn media` (scripts/optimize-media.mjs).
export type HeroVideo = { src: string; small: string; poster: string; width: number; height: number };
export const heroVideos: HeroVideo[] = media.heroVideos;
export const heroSlides: string[] = media.heroImages.map((i) => i.src);
// Recap order: shots of people dancing first, then everything else; within
// each group, the most recent night first. Folders not listed here go last.
const recapEventsNewestFirst = [
  "All White with DJ Rosco",
  "Vice City",
  "PM2AM with SmallztheDJ",
  "Hot Body Summer",
  "Beach Carnival",
];
const dancingShots = [
  "all-white-dancefloor",
  "all-white-crowd-green-light",
  "vice-city-dj-hands-up",
  "smalls-dancing-arm-up",
  "smalls-crowd-purple-lights",
  "hot-body-guy-with-hands-up",
  "hot-body-dancing-crowd",
  "hot-body-dancers",
];

export const gallery: GalleryShot[] = media.gallery
  .map((g) => ({ src: g.src, event: g.event || "PM2AM" }))
  .map((g) => {
    const file = g.src.split("/").pop()!.replace(/\.jpg$/, "");
    const dancing = dancingShots.indexOf(file);
    const recency = recapEventsNewestFirst.indexOf(g.event);
    return { g, dancing: dancing === -1 ? Infinity : dancing, recency: recency === -1 ? Infinity : recency };
  })
  .sort((a, b) => a.dancing - b.dancing || a.recency - b.recency)
  .map(({ g }) => g);
