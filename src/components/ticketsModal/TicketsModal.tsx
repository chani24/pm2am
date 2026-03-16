"use client";

import { useEffect, useRef } from "react";

type ModalFormProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultTag?: string; // e.g., "presale"
  title?: string;
  description?: string;
  rejoinUrl?: string; // URL to re-subscribe; replace '#' with real link
};

type Event = {
  name: string;
  url: string;
};

const events: Event[] = [
  {
    name: "PM2AM: THE ANNIVERSARY",
    url: "https://tix.africa/discover/pm2am-anniversary",
  },
];

export default function ModalForm({
  isOpen,
  onClose,
  description = "Be the first to know when tickets drop.",
}: ModalFormProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    // lock scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[5000] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      aria-modal
      role="dialog"
    >
      <div className="relative w-full max-w-md rounded-none border border-white bg-black text-white p-6 monument uppercase">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 h-8 w-8 grid place-items-center border border-white text-white hover:bg-white hover:text-black transition"
        >
          x
        </button>

        <div className="newsletter flex flex-col items-center justify-center mt-[36px] ">
          <p className="text-center mb-5 text-lg leading-tight">
            {description}
          </p>
          {events.length > 0 ? (
            events.map((event, index) => (
              <a
                key={index}
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mb-4"
              >
                <button
                  type="button"
                  className="w-full px-10 py-5 border border-white text-white hover:bg-white hover:text-black transition"
                >
                  {event.name}
                </button>
              </a>
            ))
          ) : (
            <button
              type="button"
              className="w-full px-10 py-5 border border-white text-white hover:bg-white hover:text-black transition mt-3"
              disabled
            >
              COMING SOON
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
