import Link from "next/link";

type Language = "en" | "tr";

type SiteFooterProps = {
  language?: Language;
};

const footerCopy = {
  en: {
    brandText:
      "SPC floor panels, wall panels, sample selection, and project application planning.",
    collections: "Collections",
    company: "Company",
    legal: "Legal",
    links: {
      contact: "Contact",
      kermitFloor: "Kermit SPC Floors",
      kermitWall: "Kermit Wall Panels",
      mission: "Mission",
      privacy: "Privacy Policy",
      projects: "Projects",
      terms: "Terms & Conditions",
      vision: "Vision",
      wallPanels: "Wall Panels",
    },
  },
  tr: {
    brandText:
      "SPC parke panelleri, duvar panelleri, numune seçimi ve proje uygulama planlaması.",
    collections: "Koleksiyonlar",
    company: "Kurumsal",
    legal: "Yasal",
    links: {
      contact: "İletişim",
      kermitFloor: "Kermit SPC Parke",
      kermitWall: "Kermit Duvar Panelleri",
      mission: "Misyon",
      privacy: "Gizlilik Politikası",
      projects: "Projeler",
      terms: "Şartlar ve Koşullar",
      vision: "Vizyon",
      wallPanels: "Duvar Panelleri",
    },
  },
} as const;

export function SiteFooter({ language = "en" }: SiteFooterProps) {
  const copy = footerCopy[language];

  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Link href="/">Adem Eren Decoration</Link>
        <p>{copy.brandText}</p>
      </div>

      <nav className="footer-nav" aria-label="Footer navigation">
        <div>
          <h2>{copy.collections}</h2>
          <Link href="/category/spc-parke">SPC Parke</Link>
          <Link href="/category/spc-duvar-panelleri">
            {copy.links.wallPanels}
          </Link>
          <a
            href="https://kermitfloor.com/tr/spc-parke-elit-koleksiyonu"
            rel="noreferrer"
            target="_blank"
          >
            {copy.links.kermitFloor}
          </a>
        </div>
        <div>
          <h2>{copy.company}</h2>
          <Link href="/vision">{copy.links.vision}</Link>
          <Link href="/mission">{copy.links.mission}</Link>
          <Link href="/#projects">{copy.links.projects}</Link>
          <Link href="/#contact">{copy.links.contact}</Link>
        </div>
        <div>
          <h2>{copy.legal}</h2>
          <Link href="/privacy-policy">{copy.links.privacy}</Link>
          <Link href="/terms-and-conditions">{copy.links.terms}</Link>
          <a
            href="https://kermitfloor.com/tr/spc-duvar-panelleri"
            rel="noreferrer"
            target="_blank"
          >
            {copy.links.kermitWall}
          </a>
        </div>
      </nav>
    </footer>
  );
}
