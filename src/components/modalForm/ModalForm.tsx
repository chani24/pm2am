"use client";

import { useEffect, useRef, useState } from "react";

type ModalFormProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultTag?: string; // e.g., "presale"
  title?: string;
  description?: string;
  rejoinUrl?: string; // URL to re-subscribe; replace '#' with real link
};

export default function ModalForm({
  isOpen,
  onClose,
  defaultTag = "presale",
  description = "Be the first to know when tickets drop.",
  rejoinUrl = "http://eepurl.com/iSIglM",
}: ModalFormProps) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [optedOut, setOptedOut] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const isDisabled = loading || !email || !firstName;

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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    setOptedOut(false);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email, tag: defaultTag }),
      });
      const data = await res.json();
      if (!res.ok) {
        // Try to parse nested Mailchimp error for opted-out case
        const maybeText = data?.error?.response?.text;
        let title: string | undefined;
        if (typeof maybeText === "string") {
          try {
            const parsed = JSON.parse(maybeText);
            title = parsed?.title;
          } catch (e) {
            if (e instanceof Error) {
              title = "Invalid email address";
            }
          }
        } else if (
          maybeText &&
          typeof maybeText === "object" &&
          "title" in maybeText
        ) {
          title = (maybeText as { title?: string }).title;
        }

        if (title === "Forgotten Email Not Subscribed") {
          setOptedOut(true);
          // Do not set generic error; we will show a single opt-out message
          return;
        }
        throw new Error(data?.message || "Subscription failed");
      }
      setSuccess("You're on the list!");
      setFirstName("");
      setEmail("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
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
          <form
            onSubmit={onSubmit}
            className="flex flex-col items-center gap-5 w-full max-w-[400px]"
          >
            <input
              type="text"
              name="firstName"
              placeholder="FIRST NAME"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border-none px-5 py-4 text-black bg-white placeholder-black/60 text-base"
              autoComplete="given-name"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="EMAIL ADDRESS"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-none px-5 py-4 text-black bg-white placeholder-black/60 text-base"
              autoComplete="email"
              required
            />
            {/* Hidden tag input mirrors route contract */}
            <input type="hidden" name="tag" value={defaultTag} readOnly />

            <button
              type="submit"
              disabled={isDisabled}
              aria-disabled={isDisabled}
              aria-busy={loading}
              className="w-full px-10 py-5 border border-white text-white disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "SUBMITTING..." : "SIGN UP"}
            </button>
          </form>
          {optedOut ? (
            <p className="mt-4 text-yellow-300 text-sm">
              YOU PREVIOUSLY OPTED OUT OF THE GANG. REJOIN
              <a
                href={rejoinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline ml-2"
              >
                HERE
              </a>{" "}
            </p>
          ) : error ? (
            <p className="mt-4 text-red-400 text-sm">{error}</p>
          ) : null}
          {success ? (
            <p className="mt-4 text-green-400 text-sm">{success}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
