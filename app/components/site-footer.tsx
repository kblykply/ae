import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Link href="/">Adem Eren Decoration</Link>
        <p>
          SPC floor panels, wall panels, sample selection, and project
          application planning.
        </p>
      </div>

      <nav className="footer-nav" aria-label="Footer navigation">
        <div>
          <h2>Collections</h2>
          <Link href="/category/spc-parke">SPC Parke</Link>
          <Link href="/category/spc-duvar-panelleri">Duvar Panelleri</Link>
          <a
            href="https://kermitfloor.com/tr/spc-parke-elit-koleksiyonu"
            rel="noreferrer"
            target="_blank"
          >
            Kermit SPC Parke
          </a>
        </div>
        <div>
          <h2>Company</h2>
          <Link href="/vision">Vision</Link>
          <Link href="/mission">Mission</Link>
          <Link href="/#projects">Projects</Link>
          <Link href="/#contact">Contact</Link>
        </div>
        <div>
          <h2>Legal</h2>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-and-conditions">Terms & Conditions</Link>
          <a
            href="https://kermitfloor.com/tr/spc-duvar-panelleri"
            rel="noreferrer"
            target="_blank"
          >
            Kermit Wall Panels
          </a>
        </div>
      </nav>
    </footer>
  );
}
