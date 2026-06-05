"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SiteFooter } from "./components/site-footer";
import {
  getProductsByCategory,
  productCategories,
} from "./data/products";

type Language = "en" | "tr";

const flooringProducts = getProductsByCategory("spc-parke");
const wallProducts = getProductsByCategory("spc-duvar-panelleri");

const heroSlides = [
  {
    kicker: {
      en: "Elit SPC Flooring",
      tr: "Elit SPC Parke",
    },
    title: {
      en: "Bleached Oak",
      tr: "Bleached Oak",
    },
    code: "P-201",
    description: {
      en: "Bright oak plank for homes, showrooms, and office interiors with a clean whole-room finish.",
      tr: "Evler, showroomlar ve ofisler için ferah, bütünlüklü bir meşe parke etkisi.",
    },
    background: "/images/kermit-floor-application.jpg",
    sample: "/images/kermit-elite-p201.jpg",
    details: {
      en: ["5/7 mm thickness", "UniClic system", "Waterproof SPC core"],
      tr: ["5/7 mm kalınlık", "UniClic sistem", "Suya dayanıklı SPC çekirdek"],
    },
    surface: {
      en: "Light matte oak",
      tr: "Açık mat meşe",
    },
  },
  {
    kicker: {
      en: "SPC Wall Panel",
      tr: "SPC Duvar Paneli",
    },
    title: {
      en: "Waterproof wall finish",
      tr: "Suya dayanıklı SPC panel",
    },
    code: "613",
    description: {
      en: "Large-format panel surface for bathrooms, wet areas, and feature walls without visual clutter.",
      tr: "Banyo, ıslak hacim ve vurgu duvarları için sade görünümlü geniş SPC panel.",
    },
    background: "/images/kermit-wall-application.jpg",
    sample: "/images/kermit-wall-panel-613.jpg",
    details: {
      en: ["Glue-down install", "Large wall format", "Fast renovation"],
      tr: ["Yapıştırma montaj", "Geniş duvar formatı", "Hızlı yenileme"],
    },
    surface: {
      en: "Stone wall panel",
      tr: "Taş görünümlü panel",
    },
  },
  {
    kicker: {
      en: "Elit SPC Flooring",
      tr: "Elit SPC Parke",
    },
    title: {
      en: "Dark Walnut Oak",
      tr: "Dark Walnut Oak",
    },
    code: "P-220",
    description: {
      en: "A deep walnut floor tone for premium homes, offices, and hospitality projects.",
      tr: "Prestijli ev, ofis ve otel projeleri için koyu ceviz zemin tonu.",
    },
    background: "/images/kermit-elite-p220.jpg",
    sample: "/images/kermit-elite-p220.jpg",
    details: {
      en: ["Matte surface", "Impact resistant", "Project finish"],
      tr: ["Mat panel dokusu", "Darbeye dayanıklı", "Proje tipi bitiş"],
    },
    surface: {
      en: "Dark walnut oak",
      tr: "Koyu ceviz meşe",
    },
  },
  {
    kicker: {
      en: "SPC 3D Panel",
      tr: "SPC 3D Panel",
    },
    title: {
      en: "Model A texture",
      tr: "Model A doku",
    },
    code: "3D-205",
    description: {
      en: "Dimensional panel rhythm for walls, counters, entrances, and focal areas.",
      tr: "Duvar, banko, giriş ve odak alanları için boyutlu panel ritmi.",
    },
    background: "/images/kermit-3d-model-a-205.jpg",
    sample: "/images/kermit-3d-model-a-205.jpg",
    details: {
      en: ["3D profile", "SPC material", "Decorative wall use"],
      tr: ["3D profil", "SPC malzeme", "Dekoratif duvar kullanımı"],
    },
    surface: {
      en: "Textured panel",
      tr: "Dokulu panel",
    },
  },
];

const translations = {
  en: {
    brandHome: "Adem Eren Decoration home",
    logoAlt: "AE Dekorasyon logo",
    navLabel: "Primary navigation",
    nav: [
      "SPC Floors",
      "Wall Panels",
      "Vision",
      "Mission",
      "Projects",
      "Contact",
    ],
    languageLabel: "Language",
    searchLabel: "Search products",
    searchPlaceholder: "Search SPC finishes",
    clearSearch: "Clear search",
    headerContact: "Contact us",
    heroEyebrow: "Adem Eren Decoration",
    heroTitleTop: "FIND YOUR",
    heroTitleBottom: "SPC FINISH",
    heroBody:
      "Explore Elit SPC flooring, waterproof wall panels, and 3D panel finishes for modern residential and commercial projects.",
    viewProducts: "View products",
    requestSamples: "Request samples",
    interiorBackground: "interior background",
    materialSample: "material sample",
    code: "Code",
    surface: "Surface",
    sliderControls: "Slider controls",
    previousSlide: "Previous slide",
    nextSlide: "Next slide",
    showSlide: "Show",
    productImageFrom: "from",
    sample: "Sample",
    details: "Details",
    viewAll: "View all",
    catalogEyebrow: "Product catalog",
    catalogTitle: "SPC Parke and SPC Wall Panel collections.",
    promoKicker: "SPC SYSTEM",
    promoTitle: "Floors, walls and panels for one clean finish",
    promoBody: "Waterproof. Fast installation. Project ready.",
    bluePromoTitle: "Samples before quote",
    bluePromoBody:
      "No online couch-style cart. We prepare project quantities.",
    openSampleRequest: "Open sample request",
    wallOfferTitle: "Wall panels for wet areas",
    wallOfferBody: "Large-format SPC panels for bathrooms and feature walls.",
    showcaseImageAlt: "Modern interior with SPC flooring application",
    workflowEyebrow: "Project workflow",
    workflowTitle: "SPC panels for floors and walls.",
    workflowBody:
      "Adem Eren Decoration uses these Floor collections as project finishes: SPC flooring, SPC wall panels, and textured 3D panels. The goal is sample selection, quantity planning, and installation coordination.",
    stats: [
      "Waterproof SPC system",
      "Floor + wall finish planning",
      "Samples before project quote",
    ],
    panelEyebrow: "Wall panel range",
    panelTitle: "SPC wall and 3D panel surfaces.",
    contactEyebrow: "Start a sample request",
    contactTitle: "Tell us which SPC finish you want to inspect.",
    process: [
      "Choose floor and wall finish",
      "Request samples and technical sheet",
      "Plan installation and quantities",
    ],
    formName: "Your name",
    formContact: "Phone or email",
    formCollection: "Interested collection",
  },
  tr: {
    brandHome: "Adem Eren Decoration ana sayfa",
    logoAlt: "AE Dekorasyon logosu",
    navLabel: "Ana navigasyon",
    nav: [
      "SPC Parkeler",
      "Duvar Panelleri",
      "Vizyon",
      "Misyon",
      "Projeler",
      "İletişim",
    ],
    languageLabel: "Dil seçimi",
    searchLabel: "Ürün ara",
    searchPlaceholder: "SPC panel ara",
    clearSearch: "Aramayı temizle",
    headerContact: "İletişim",
    heroEyebrow: "Adem Eren Decoration",
    heroTitleTop: "SPC PANEL",
    heroTitleBottom: "SEÇİMİ",
    heroBody:
      "Modern konut ve ticari projeler için Elit SPC parke panellerini, suya dayanıklı duvar panellerini ve 3D panelleri keşfedin.",
    viewProducts: "Ürünleri incele",
    requestSamples: "Numune iste",
    interiorBackground: "iç mekan arka planı",
    materialSample: "malzeme numunesi",
    code: "Kod",
    surface: "Panel",
    sliderControls: "Slider kontrolleri",
    previousSlide: "Önceki slayt",
    nextSlide: "Sonraki slayt",
    showSlide: "Göster",
    productImageFrom: "koleksiyon",
    sample: "Numune",
    details: "Detay",
    viewAll: "Tümünü gör",
    catalogEyebrow: "Ürün kataloğu",
    catalogTitle: "SPC Parke ve SPC Duvar Paneli koleksiyonları.",
    promoKicker: "SPC SİSTEM",
    promoTitle: "Zemin, duvar ve panelde tek temiz bitiş",
    promoBody: "Suya dayanıklı. Hızlı montaj. Projeye hazır.",
    bluePromoTitle: "Teklif öncesi numune",
    bluePromoBody:
      "Online mobilya sepeti yok. Projeye göre metraj ve adet hazırlıyoruz.",
    openSampleRequest: "Numune talebini aç",
    wallOfferTitle: "Islak alanlar için duvar panelleri",
    wallOfferBody: "Banyo ve vurgu duvarları için geniş ebatlı SPC paneller.",
    showcaseImageAlt: "SPC parke uygulanmış modern iç mekan",
    workflowEyebrow: "Proje akışı",
    workflowTitle: "Zemin ve duvar için SPC paneller.",
    workflowBody:
      "Adem Eren Decoration koleksiyonlarını proje panel sistemi olarak kullanır: SPC parke panelleri, SPC duvar panelleri ve dokulu 3D paneller. Amaç numune seçimi, metraj planlama ve uygulama koordinasyonudur.",
    stats: [
      "Suya dayanıklı SPC sistem",
      "Zemin + duvar panel planlama",
      "Teklif öncesi numune seçimi",
    ],
    panelEyebrow: "Duvar panel aralığı",
    panelTitle: "SPC duvar ve 3D panel seçenekleri.",
    contactEyebrow: "Numune talebi başlat",
    contactTitle: "İncelemek istediğiniz SPC paneli bize söyleyin.",
    process: [
      "Zemin ve duvar panelini seçin",
      "Numune ve teknik doküman talep edin",
      "Montaj ve metraj planlamasını yapalım",
    ],
    formName: "Adınız",
    formContact: "Telefon veya e-posta",
    formCollection: "İlgilendiğiniz koleksiyon",
  },
} as const;

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [language, setLanguage] = useState<Language>("en");
  const currentSlide = heroSlides[activeSlide];
  const copy = translations[language];

  const goToPreviousSlide = () => {
    setActiveSlide((current) =>
      current === 0 ? heroSlides.length - 1 : current - 1,
    );
  };

  const goToNextSlide = () => {
    setActiveSlide((current) =>
      current === heroSlides.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <main className="site-shell">
      <section className="hero-panel">
        <header className="site-header">
          <a aria-label={copy.brandHome} className="brand" href="#">
            <Image
              alt={copy.logoAlt}
              className="brand-logo"
              height={190}
              src="/aelogo.png?v=3"
              width={430}
            />
          </a>

          <nav className="desktop-nav" aria-label={copy.navLabel}>
            <Link href="/category/spc-parke">{copy.nav[0]}</Link>
            <Link href="/category/spc-duvar-panelleri">{copy.nav[1]}</Link>
            <Link href="/vision">{copy.nav[2]}</Link>
            <Link href="/mission">{copy.nav[3]}</Link>
            <a href="#projects">{copy.nav[4]}</a>
            <a href="#contact">{copy.nav[5]}</a>
          </nav>

          <div className="header-actions">
            <label className="language-select">
              <span className="sr-only">{copy.languageLabel}</span>
              <select
                aria-label={copy.languageLabel}
                onChange={(event) =>
                  setLanguage(event.target.value as Language)
                }
                value={language}
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
              <label className="sr-only" htmlFor="site-search">
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
                id="site-search"
                name="q"
                placeholder={copy.searchPlaceholder}
                type="search"
              />
            </form>
            <a
              className="header-contact"
              href="#contact"
              aria-label={copy.headerContact}
            >
              {copy.headerContact}
            </a>
          </div>
        </header>

        <div className="hero-backgrounds">
          {heroSlides.map((slide, index) => (
            <Image
              alt={`${slide.title[language]} ${copy.interiorBackground}`}
              className={index === activeSlide ? "is-active" : ""}
              fill
              key={slide.code}
              preload={index === 0}
              sizes="100vw"
              src={slide.background}
            />
          ))}
        </div>
        <div className="hero-readable-overlay" />

        <div className="hero-stage">
          <div className="hero-copy">
            <p className="eyebrow">{copy.heroEyebrow}</p>
            <h1>
              {copy.heroTitleTop}
              <span>{copy.heroTitleBottom}</span>
            </h1>
            <p>{copy.heroBody}</p>
            <div className="hero-actions">
              <a href="#catalog">{copy.viewProducts}</a>
              <a href="#contact">{copy.requestSamples}</a>
            </div>
          </div>

          <article className="material-detail-card" aria-live="polite">
            <div className="material-preview">
              <Image
                alt={`${currentSlide.title[language]} ${copy.materialSample}`}
                fill
                sizes="220px"
                src={currentSlide.sample}
              />
            </div>
            <div>
              <p>{currentSlide.kicker[language]}</p>
              <h2>{currentSlide.title[language]}</h2>
              <span>{currentSlide.description[language]}</span>
            </div>
            <dl>
              <div>
                <dt>{copy.code}</dt>
                <dd>{currentSlide.code}</dd>
              </div>
              <div>
                <dt>{copy.surface}</dt>
                <dd>{currentSlide.surface[language]}</dd>
              </div>
            </dl>
            <div className="material-tags">
              {currentSlide.details[language].map((detail) => (
                <span key={detail}>{detail}</span>
              ))}
            </div>
          </article>
        </div>

        <div className="hero-navigation" aria-label={copy.sliderControls}>
          <button
            className="hero-arrow"
            onClick={goToPreviousSlide}
            type="button"
            aria-label={copy.previousSlide}
          >
            &lt;
          </button>
          <div className="hero-thumbs">
            {heroSlides.map((slide, index) => (
              <button
                aria-label={`${copy.showSlide} ${slide.title[language]}`}
                aria-pressed={index === activeSlide}
                className={index === activeSlide ? "is-active" : ""}
                key={slide.code}
                onClick={() => setActiveSlide(index)}
                type="button"
              >
                <span>
                  <Image
                    alt=""
                    fill
                    sizes="72px"
                    src={slide.sample}
                  />
                </span>
                <strong>{slide.code}</strong>
              </button>
            ))}
          </div>
          <button
            className="hero-arrow"
            onClick={goToNextSlide}
            type="button"
            aria-label={copy.nextSlide}
          >
            &gt;
          </button>
        </div>
      </section>

      <section className="catalog-layout" id="products">
        <div className="product-grid">
          {flooringProducts.slice(0, 3).map((product) => (
            <article className="product-card" key={product.code}>
              <div className="product-image">
                <Image
                  alt={`${product.name} ${product.code} ${copy.productImageFrom} ${product.collection[language]}`}
                  fill
                  sizes="(max-width: 900px) 100vw, 25vw"
                  src={product.image}
                />
              </div>
              <div
                className="sample-strip"
                style={{ backgroundColor: product.accent }}
              >
                <span>{product.collection[language]}</span>
                <Link href={`/products/${product.slug}`}>+</Link>
              </div>
              <div className="product-body">
                <div>
                  <p className="product-code">{product.code}</p>
                  <h2>{product.name}</h2>
                  <p>{product.description[language]}</p>
                </div>
                <div className="spec-list">
                  {product.specs[language].map((spec) => (
                    <span key={spec}>{spec}</span>
                  ))}
                </div>
                <Link className="dark-action" href={`/products/${product.slug}`}>
                  {copy.details}
                </Link>
              </div>
            </article>
          ))}
        </div>

        <aside className="promo-stack" id="panels">
          <article className="orange-promo">
            <p>{copy.promoKicker}</p>
            <h2>{copy.promoTitle}</h2>
            <span>{copy.promoBody}</span>
          </article>

          <article className="blue-promo">
            <div className="promo-logo">AE</div>
            <h2>{copy.bluePromoTitle}</h2>
            <p>{copy.bluePromoBody}</p>
            <a aria-label={copy.openSampleRequest} href="#contact">
              -&gt;
            </a>
          </article>

          <article className="summer-offer">
            <a href="#contact">-&gt;</a>
            <div>
              <h2>{copy.wallOfferTitle}</h2>
              <p>{copy.wallOfferBody}</p>
            </div>
          </article>
        </aside>
      </section>

      <section className="product-directory" id="catalog">
        <div className="directory-heading">
          <div>
            <p className="eyebrow">{copy.catalogEyebrow}</p>
            <h2>{copy.catalogTitle}</h2>
          </div>
          <div className="category-pills">
            {productCategories.map((category) => (
              <Link href={`/category/${category.slug}`} key={category.slug}>
                {category.shortLabel[language]}
              </Link>
            ))}
          </div>
        </div>

        {productCategories.map((category) => {
          const categoryProducts = getProductsByCategory(category.slug).slice(0, 10);

          return (
            <div className="directory-block" key={category.slug}>
              <div className="directory-block-head">
                <div>
                  <p>{category.description[language]}</p>
                  <h3>{category.label[language]}</h3>
                </div>
                <Link href={`/category/${category.slug}`}>{copy.viewAll}</Link>
              </div>
              <div className="directory-grid">
                {categoryProducts.map((product) => (
                  <Link
                    className="directory-card"
                    href={`/products/${product.slug}`}
                    key={product.code}
                  >
                    <span className="directory-card-image">
                      <Image
                        alt={`${product.name} ${product.code}`}
                        fill
                        sizes="(max-width: 900px) 50vw, 18vw"
                        src={product.image}
                      />
                    </span>
                    <span className="directory-card-body">
                      <small>{product.code}</small>
                      <strong>{product.name}</strong>
                      <span>{product.collection[language]}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <section className="wide-showcase" id="projects">
        <div className="showcase-image">
          <Image
            alt={copy.showcaseImageAlt}
            fill
            sizes="(max-width: 1000px) 100vw, 55vw"
            src="/images/kermit-floor-application.jpg"
          />
        </div>
        <div className="showcase-content">
          <p className="eyebrow">{copy.workflowEyebrow}</p>
          <h2>{copy.workflowTitle}</h2>
          <p>{copy.workflowBody}</p>
          <div className="stats-row">
            {copy.stats.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="panel-section">
        <div className="section-heading">
          <p className="eyebrow">{copy.panelEyebrow}</p>
          <h2>{copy.panelTitle}</h2>
        </div>

        <div className="panel-grid">
          {wallProducts.slice(0, 3).map((product) => (
            <article className="panel-card" key={product.code}>
              <Image
                alt={`${product.name} ${product.code}`}
                fill
                sizes="(max-width: 900px) 100vw, 33vw"
                src={product.image}
              />
              <div>
                <p>{product.collection[language]}</p>
                <h3>{product.name}</h3>
                <span>{product.code}</span>
              </div>
              <Link
                aria-label={`${copy.details}: ${product.name}`}
                href={`/products/${product.slug}`}
              />
            </article>
          ))}
        </div>
      </section>

      <section className="contact-band" id="contact">
        <div>
          <p className="eyebrow">{copy.contactEyebrow}</p>
          <h2>{copy.contactTitle}</h2>
          <ul>
            {copy.process.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <form className="request-card">
          <input placeholder={copy.formName} />
          <input placeholder={copy.formContact} />
          <select defaultValue="">
            <option disabled value="">
              {copy.formCollection}
            </option>
            <option>Elit SPC Parke Koleksiyonu</option>
            <option>SPC Duvar Panelleri</option>
            <option>SPC 3D Paneller</option>
          </select>
          <button type="button">{copy.requestSamples}</button>
        </form>
      </section>

      <SiteFooter />
    </main>
  );
}
