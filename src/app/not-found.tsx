import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not_found monument">
      <div className="not_found_media" aria-hidden="true">
        <Image
          src="/new-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div className="not_found_overlay" aria-hidden="true" />

      <nav className="not_found_nav">
        <Link href="/" aria-label="Go to PM2AM home">
          <Image
            src="/logo-new.svg"
            alt="PM2AM"
            width={132}
            height={40}
            priority
          />
        </Link>
      </nav>

      <section className="not_found_content">
        <p className="not_found_kicker inter">Page not found</p>
        <h1 className="not_found_code rubik">404</h1>
        <h2 className="not_found_title">This page is not on the list.</h2>
        <p className="not_found_copy inter">
          The link may have moved or expired. Head back home for PM2AM events,
          merch, and recaps.
        </p>
        <Link href="/" className="not_found_btn inter">
          Back Home
        </Link>
      </section>
    </main>
  );
}
