"use client";

import Image from "next/image";
import Link from "next/link";

type Language = "en" | "tr";

type CatalogHeaderProps = {
  language?: Language;
  onLanguageChange?: (language: Language) => void;
};

const headerCopy = {
  en: {
    ariaHome: "AE Decoration home",
    ariaNav: "Catalog navigation",
    languageLabel: "Language",
    nav: ["SPC Floors", "Wall Panels", "Vision", "Mission", "Projects", "Contact"],
    searchLabel: "Search products",
    searchPlaceholder: "Search SPC finishes",
  },
  tr: {
    ariaHome: "AE Dekorasyon ana sayfa",
    ariaNav: "Katalog navigasyonu",
    languageLabel: "Dil seçimi",
    nav: ["SPC Parke", "Duvar Panelleri", "Vizyon", "Misyon", "Projeler", "İletişim"],
    searchLabel: "Ürün ara",
    searchPlaceholder: "SPC panel ara",
  },
} as const;

export function CatalogHeader({
  language = "tr",
  onLanguageChange,
}: CatalogHeaderProps) {
  const copy = headerCopy[language];

  return (
    <header className="site-header catalog-page-header">
      <Link aria-label={copy.ariaHome} className="brand" href="/">
        <Image
          alt="AE Dekorasyon logosu"
          className="brand-logo"
          height={190}
          src="/aelogo.png?v=3"
          width={430}
        />
      </Link>

      <nav className="desktop-nav" aria-label={copy.ariaNav}>
        <Link href="/category/spc-parke">{copy.nav[0]}</Link>
        <Link href="/category/spc-duvar-panelleri">{copy.nav[1]}</Link>
        <Link href="/vision">{copy.nav[2]}</Link>
        <Link href="/mission">{copy.nav[3]}</Link>
        <Link href="/#projects">{copy.nav[4]}</Link>
        <Link href="/#contact">{copy.nav[5]}</Link>
      </nav>

      <div className="header-actions">
        <label className="language-select">
          <span className="sr-only">{copy.languageLabel}</span>
          <select
            aria-label={copy.languageLabel}
            defaultValue={onLanguageChange ? undefined : language}
            onChange={(event) =>
              onLanguageChange?.(event.target.value as Language)
            }
            value={onLanguageChange ? language : undefined}
          >
            <option value="en">English</option>
            <option value="tr">Türkçe</option>
          </select>
        </label>
        <form
          action="/search"
          aria-label={copy.searchLabel}
          className="search-pill"
          method="get"
          role="search"
        >
          <label className="sr-only" htmlFor="catalog-search">
            {copy.searchLabel}
          </label>
          <button
            aria-label={copy.searchLabel}
            className="search-submit"
            type="submit"
          >
            <span aria-hidden="true" className="search-icon" />
          </button>
          <input
            id="catalog-search"
            name="q"
            placeholder={copy.searchPlaceholder}
            type="search"
          />
        </form>
        <Link className="header-contact" href="/#contact">
          {copy.nav[5]}
        </Link>
      </div>
    </header>
  );
}
