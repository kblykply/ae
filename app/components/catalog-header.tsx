"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  HeaderDesktopNavigation,
  HeaderMobileNavigation,
} from "./header-navigation";
import { navText } from "../data/site-navigation";

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
    closeMenuLabel: "Close menu",
    menuLabel: "Open menu",
    nav: [
      "SPC Floors",
      "Wall Panels",
      "About",
      "Vision",
      "Mission",
      "Projects",
      "Contact",
    ],
    searchLabel: "Search products",
    searchPlaceholder: "Search SPC panels in Cyprus",
  },
  tr: {
    ariaHome: "AE Dekorasyon ana sayfa",
    ariaNav: "Katalog navigasyonu",
    languageLabel: "Dil seçimi",
    closeMenuLabel: "Menüyü kapat",
    menuLabel: "Menüyü aç",
    nav: [
      "SPC Parke",
      "Duvar Panelleri",
      "Hakkımızda",
      "Vizyon",
      "Misyon",
      "Projeler",
      "İletişim",
    ],
    searchLabel: "Ürün ara",
    searchPlaceholder: "SPC panel, parke, Kıbrıs ara",
  },
} as const;

export function CatalogHeader({
  language = "tr",
  onLanguageChange,
}: CatalogHeaderProps) {
  const copy = headerCopy[language];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

      <button
        aria-controls="catalog-mobile-menu"
        aria-expanded={mobileMenuOpen}
        aria-label={mobileMenuOpen ? copy.closeMenuLabel : copy.menuLabel}
        className="mobile-menu-toggle"
        onClick={() => setMobileMenuOpen((current) => !current)}
        type="button"
      >
        <span />
        <span />
        <span />
      </button>

      <HeaderDesktopNavigation
        ariaLabel={copy.ariaNav}
        contactHref="/#contact"
        language={language}
        projectsHref="/#projects"
      />

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
            <option value="en">İngilizce</option>
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
          {navText[language].contact}
        </Link>
      </div>

      <div
        className={`mobile-menu-panel${mobileMenuOpen ? " is-open" : ""}`}
        id="catalog-mobile-menu"
      >
        <HeaderMobileNavigation
          ariaLabel={copy.ariaNav}
          contactHref="/#contact"
          language={language}
          onNavigate={() => setMobileMenuOpen(false)}
          projectsHref="/#projects"
        />

        <div className="mobile-menu-actions">
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
              <option value="en">İngilizce</option>
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
            <label className="sr-only" htmlFor="catalog-mobile-search">
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
              id="catalog-mobile-search"
              name="q"
              placeholder={copy.searchPlaceholder}
              type="search"
            />
          </form>
          <Link
            className="header-contact"
            href="/#contact"
            onClick={() => setMobileMenuOpen(false)}
          >
            {navText[language].contact}
          </Link>
        </div>
      </div>
    </header>
  );
}
