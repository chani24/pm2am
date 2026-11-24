import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import Events from "@/components/site/Events";
import Shop from "@/components/site/Shop";
import PastEvents from "@/components/site/PastEvents";
import Sounds from "@/components/site/Sounds";
import Footer from "@/components/site/Footer";
import StickyCta from "@/components/site/StickyCta";
import { roadMap, upcomingEvents } from "@/config/site";

// Re-render hourly so finished events drop off "Upcoming" on their own.
export const revalidate = 3600;

export default function Home() {
  const upcoming = upcomingEvents();
  const showRoadMap = Date.parse(roadMap.showUntil) > Date.now();
  return (
    <>
      <Nav />
      <main>
        <Hero upcoming={upcoming} />
        <About />
        <Events events={upcoming} roadMap={showRoadMap ? roadMap : undefined} />
        <Shop />
        <PastEvents />
        <Sounds />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
