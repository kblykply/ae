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
        <label className="language-select">
          <span className="sr-only">Dil seçimi</span>
          <select aria-label="Dil seçimi" defaultValue="tr">
            <option value="en">English</option>
            <option value="tr">Türkçe</option>
          </select>
        </label>
        <form className="search-pill">
          <label className="sr-only" htmlFor="catalog-search">
            Ürün ara
          </label>
          <span aria-hidden="true" className="search-icon" />
          <input
            id="catalog-search"
            placeholder="SPC panel ara"
            type="search"
          />
        </form>
        <Link className="header-contact" href="/#contact">
          İletişim
        </Link>
      </div>
    </header>
  );
}
