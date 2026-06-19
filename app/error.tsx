"use client";

import Link from "next/link";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="site-shell status-page">
      <section className="status-panel">
        <p className="eyebrow">Catalog error</p>
        <h1>Something went wrong</h1>
        <p>{error.message || "The page could not be loaded right now."}</p>
        <div className="status-actions">
          <button onClick={reset} type="button">
            Try again
          </button>
          <Link href="/">Homepage</Link>
        </div>
      </section>
    </main>
  );
}
