type Props = {
  items: string[];
  reverse?: boolean;
  variant?: "accent" | "light";
  tilt?: number;
};

// Pure-CSS ticker: the item list is rendered twice and the track slides by
// exactly one copy, so the loop is seamless at any width.
export default function Marquee({ items, reverse, variant = "accent", tilt = 0 }: Props) {
  const row = (
    <div className="marquee_row" aria-hidden="true">
      {items.map((t, i) => (
        <span key={i}>
          {t}
          <i>✦</i>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`marquee marquee--${variant}`} style={{ rotate: `${tilt}deg` }}>
      <div className={`marquee_track ${reverse ? "marquee_track--rev" : ""}`}>
        {row}
        {row}
      </div>
    </div>
  );
}
