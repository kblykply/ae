import Image from "next/image";
import Link from "next/link";

export function CatalogHeader() {
  return (
    <header className="site-header catalog-page-header">
      <Link aria-label="AE Dekorasyon home" className="brand" href="/">
        <Image
          alt="AE Dekorasyon logosu"
          className="brand-logo"
          height={190}
          src="/aelogo.png?v=3"
          width={430}
        />
      </Link>

      <nav className="desktop-nav" aria-label="Catalog navigation">
        <Link href="/category/spc-parke">SPC Parke</Link>
        <Link href="/category/spc-duvar-panelleri">Duvar Panelleri</Link>
        <Link href="/vision">Vizyon</Link>
        <Link href="/mission">Misyon</Link>
        <Link href="/#projects">Projeler</Link>
        <Link href="/#contact">İletişim</Link>
      </nav>

      <div className="header-actions">
        <Link className="header-contact" href="/#contact">
          İletişim
        </Link>
      </div>
    </header>
  );
}
