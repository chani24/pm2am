// Thin line icons for overlays (photo viewer, video player).
const base = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const CloseIcon = () => (
  <svg {...base}>
    <path d="M5 5l14 14M19 5L5 19" />
  </svg>
);

export const PrevIcon = () => (
  <svg {...base}>
    <path d="M15 4l-8 8 8 8" />
  </svg>
);

export const NextIcon = () => (
  <svg {...base}>
    <path d="M9 4l8 8-8 8" />
  </svg>
);
