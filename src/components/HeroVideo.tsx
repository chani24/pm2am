"use client";

export default function HeroVideo() {
  return (
    <video
      ref={(el) => { if (el) el.muted = true; }}
      autoPlay
      muted
      loop
      playsInline
      poster="/new-hero.png"
      className="absolute inset-0 w-full h-full object-cover object-center"
    >
      <source src="/hot-body-video.mp4" type="video/mp4" />
    </video>
  );
}
