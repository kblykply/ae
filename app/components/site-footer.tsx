import Link from "next/link";

type Language = "en" | "tr";

type SiteFooterProps = {
  language?: Language;
};

const footerCopy = {
  en: {
    brandText:
      "North Cyprus SPC flooring, wall panels, bathroom panels, sample selection, and project application planning.",
    collections: "Collections",
    company: "Company",
    legal: "Legal",
    links: {
      about: "About",
      contact: "Contact",
      blog: "Blog",
      acousticPanel: "Acoustic Panel",
      drywall: "Drywall Application",
      decorativeTrim: "Decorative Trim",
      marbleSheet: "Marble Sheet",
      mission: "Mission",
      privacy: "Privacy Policy",
      projects: "Projects",
      spcFlooring: "SPC Flooring Cyprus",
      spcCeramic: "SPC Ceramic",
      spcWallPanel: "SPC Wall Panels Cyprus",
      suspendedCeiling: "Suspended Ceiling",
      terms: "Terms & Conditions",
      vision: "Vision",
      wallPanels: "Wall Panels",
    },
  },
  tr: {
    brandText:
      "Kuzey Kıbrıs SPC parke, SPC duvar paneli, banyo paneli, numune seçimi ve proje uygulama planlaması.",
    collections: "Koleksiyonlar",
    company: "Kurumsal",
    legal: "Yasal",
    links: {
      about: "Hakkımızda",
      contact: "İletişim",
      blog: "Blog",
      acousticPanel: "Akustik Panel",
      drywall: "Alçıpan Uygulama",
      decorativeTrim: "Dekoratif Çıta",
      marbleSheet: "Marble Sheet",
      mission: "Misyon",
      privacy: "Gizlilik Politikası",
      projects: "Projeler",
      spcFlooring: "SPC Zemin Kaplama",
      spcCeramic: "SPC Seramik",
      spcWallPanel: "SPC Duvar Paneli",
      suspendedCeiling: "Asma Tavan",
      terms: "Şartlar ve Koşullar",
      vision: "Vizyon",
      wallPanels: "Duvar Panelleri",
    },
  },
} as const;

export function SiteFooter({ language = "tr" }: SiteFooterProps) {
  const copy = footerCopy[language];

  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Link href="/">Adem Eren Decoration</Link>
        <p>{copy.brandText}</p>
      </div>

      <nav
        className="footer-nav"
        aria-label={
          language === "tr" ? "Alt bilgi navigasyonu" : "Footer navigation"
        }
      >
        <div>
          <h2>{copy.collections}</h2>
          <Link href="/category/spc-parke">SPC Parke</Link>
          <Link href="/category/spc-duvar-panelleri">
            {copy.links.wallPanels}
          </Link>
          <Link href="/spc-zemin-kaplama-kibris">
            {copy.links.spcFlooring}
          </Link>
          <Link href="/spc-seramik-kibris">{copy.links.spcCeramic}</Link>
          <Link href="/spc-duvar-paneli-kibris">
            {copy.links.spcWallPanel}
          </Link>
          <Link href="/marble-sheet-kibris">{copy.links.marbleSheet}</Link>
          <Link href="/akustik-panel-kibris">
            {copy.links.acousticPanel}
          </Link>
          <Link href="/dekoratif-cita-kibris">
            {copy.links.decorativeTrim}
          </Link>
          <Link href="/alcipan-uygulama-kibris">{copy.links.drywall}</Link>
          <Link href="/asma-tavan-kibris">
            {copy.links.suspendedCeiling}
          </Link>
        </div>
        <div>
          <h2>{copy.company}</h2>
          <Link href="/about-us">{copy.links.about}</Link>
          <Link href="/blog">{copy.links.blog}</Link>
          <Link href="/vision">{copy.links.vision}</Link>
          <Link href="/mission">{copy.links.mission}</Link>
          <Link href="/#projects">{copy.links.projects}</Link>
          <Link href="/#contact">{copy.links.contact}</Link>
        </div>
        <div>
          <h2>{copy.legal}</h2>
          <Link href="/privacy-policy">{copy.links.privacy}</Link>
          <Link href="/terms-and-conditions">{copy.links.terms}</Link>
        </div>
      </nav>
    </footer>
  );
}
