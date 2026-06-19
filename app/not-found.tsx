import Link from "next/link";

export default function NotFound() {
  return (
    <main className="site-shell status-page">
      <section className="status-panel">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p>
          This page may have moved, or the catalog item may no longer be
          available.
        </p>
        <div className="status-actions">
          <Link href="/">Homepage</Link>
          <Link href="/search">Search catalog</Link>
        </div>
      </section>
    </main>
  );
}
