import Image from "next/image";

export default function HeroVideo() {
  return (
    <div className="hero_video" aria-hidden="true">
      <Image
        src="/new-hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hero_video_poster"
      />
    </div>
  );
}
