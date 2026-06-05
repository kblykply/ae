import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>Adem Eren Decoration</p>
      <div>
        <a
          href="https://kermitfloor.com/tr/spc-parke-elit-koleksiyonu"
          rel="noreferrer"
          target="_blank"
        >
          Elit SPC Parke
        </a>
        <a
          href="https://kermitfloor.com/tr/spc-duvar-panelleri"
          rel="noreferrer"
          target="_blank"
        >
          SPC Duvar Panelleri
        </a>
        <Link href="/privacy-policy">Privacy Policy</Link>
        <Link href="/terms-and-conditions">Terms & Conditions</Link>
      </div>
    </footer>
  );
}
