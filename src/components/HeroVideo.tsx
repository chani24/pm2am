"use client";

export default function HeroVideo() {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      poster="/new-hero.png"
      className="absolute inset-0 w-full h-full object-cover object-center"
    >
      <source src="/hero-bg.mp4" type="video/mp4" />
    </video>
  );
}
