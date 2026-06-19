"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { SiteFooter } from "./site-footer";
import {
  HeaderDesktopNavigation,
  HeaderMobileNavigation,
} from "./header-navigation";
import type { SiteContent } from "../data/site-content";
import {
  productCategories,
  type Product,
} from "../data/products";

type Language = "en" | "tr";
type ProductCategory = (typeof productCategories)[number];

type HomePageClientProps = {
  categories: ProductCategory[];
  products: Product[];
  siteContent: SiteContent;
};

type RequestForm = {
  collection: string;
  contact: string;
  message: string;
  name: string;
};

type RequestStatus = {
  tone: "idle" | "success" | "error";
  text: string;
};

const translations = {
  en: {
    brandHome: "Adem Eren Decoration home",
    logoAlt: "AE Dekorasyon logo",
    navLabel: "Primary navigation",
    nav: [
      "SPC Floors",
      "Wall Panels",
      "About",
      "Vision",
      "Mission",
      "Projects",
      "Contact",
    ],
    languageLabel: "Language",
    closeMenuLabel: "Close menu",
    menuLabel: "Open menu",
    searchLabel: "Search products",
    searchPlaceholder: "Search SPC panels in Cyprus",
    clearSearch: "Clear search",
    headerContact: "Contact us",
    heroEyebrow: "Adem Eren Decoration",
    heroTitleTop: "NORTH CYPRUS",
    heroTitleBottom: "SPC PANELS",
    heroBody:
      "Explore SPC wall panels, SPC flooring, bathroom panels, and interior decoration support for homes and commercial projects across North Cyprus.",
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
    catalogTitle: "SPC flooring and SPC wall panel collections for Cyprus projects.",
    promoKicker: "SPC SYSTEM",
    promoTitle: "Floors, walls and panels for one clean finish",
    promoBody: "Waterproof panels for North Cyprus homes and commercial spaces.",
    bluePromoTitle: "Samples before quote",
    bluePromoBody:
      "No online couch-style cart. We prepare project quantities.",
    openSampleRequest: "Open sample request",
    wallOfferTitle: "Wall panels for bathrooms and wet areas",
    wallOfferBody: "Large-format SPC panels for fast renovation in Cyprus.",
    showcaseImageAlt: "Modern interior with SPC flooring application",
    workflowEyebrow: "Project workflow",
    workflowTitle: "SPC panels for floors and walls in North Cyprus.",
    workflowBody:
      "Adem Eren Decoration prepares SPC flooring, SPC wall panels, and textured 3D panels for villas, apartments, offices, hotels, cafes, and shops. The goal is sample selection, quantity planning, and installation coordination.",
    stats: [
      "Waterproof SPC system",
      "Floor + wall finish planning",
      "Samples before project quote",
    ],
    serviceScopeEyebrow: "Decoration services",
    serviceScopeTitle: "Drywall, SPC panels and ceiling applications.",
    serviceScopeBody:
      "Alongside SPC flooring and wall panels, we support interior preparation details such as drywall partitions, suspended ceilings, light coves, wet-area panel planning, and final finish coordination.",
    serviceCards: [
      {
        alt: "Drywall ceiling and wall application in a modern North Cyprus interior",
        body: "Suspended ceilings, partition walls, niches, hidden light coves, and clean surface preparation before paint or panel finishes.",
        href: "/alcipan-uygulama-kibris",
        image: "/images/ae-alcipan-uygulama.jpg",
        title: "Drywall application",
      },
      {
        alt: "SPC panel samples selected with a customer in a decoration studio",
        body: "Material samples, room use, color direction, wet-area needs, measurements, and technical details are reviewed before the quote.",
        href: "/spc-duvar-paneli-kibris",
        image: "/images/ae-spc-is-sureci.jpg",
        title: "SPC panel work process",
      },
      {
        alt: "SPC panel installation measurement and project coordination",
        body: "From sample choice to site check, we organize flooring, wall panels, ceilings, quantities, and application timing together.",
        href: "/ic-mekan-dekorasyon-kibris",
        image: "/images/ae-mission-hero.jpg",
        title: "Project coordination",
      },
    ],
    processEyebrow: "SPC panel work process",
    processTitle: "From first photo to installation plan.",
    processBody:
      "Send the room photos, dimensions, and the surface you want to change. We narrow down suitable SPC wall panel or SPC flooring options and prepare the next project step.",
    processSteps: [
      "Room photos and usage needs",
      "SPC sample and color selection",
      "Measurement, quantity and detail control",
      "Application date and site coordination",
    ],
    materialRangeEyebrow: "Finish materials",
    materialRangeTitle:
      "SPC floors, wall panels, marble sheets and decorative trims for complete interiors.",
    materialRangeBody:
      "We help choose practical surface materials together: SPC flooring, SPC ceramic looks, marble sheet walls, plexiglass details, acoustic panels, lambri profiles and decorative trim systems.",
    materialGroups: [
      {
        body: "Waterproof rigid-core floor solutions for villas, offices, hotels, shops and rental properties across North Cyprus.",
        href: "/spc-parke-kibris",
        title: "SPC parquet and SPC floor covering",
      },
      {
        body: "Marble-look wall and floor alternatives for bathrooms, kitchens, wet areas, reception walls and fast renovation projects.",
        href: "/spc-seramik-kibris",
        title: "SPC ceramic and marble sheet",
      },
      {
        body: "Feature walls, TV units, office surfaces and sound-focused interiors with decorative and acoustic panel options.",
        href: "/duvar-paneli-kibris",
        title: "Wall panel and acoustic panel",
      },
      {
        body: "Clean decorative plexiglass applications for counters, display areas, office details and commercial interior accents.",
        href: "/ic-mekan-dekorasyon-kibris",
        title: "Plexiglass details",
      },
      {
        body: "Modern wall framing with decorative trim, border trim, MDF trim and polyurethane trim alternatives.",
        href: "/dekoratif-cita-kibris",
        title: "Decorative trim systems",
      },
      {
        body: "Warm wood-effect lambri, vertical profiles and classic wall details for homes, hotels and hospitality spaces.",
        href: "/dekoratif-cita-kibris",
        title: "Lambri and profile details",
      },
    ],
    faqEyebrow: "Common project questions",
    faqTitle: "What people search before choosing SPC panels and trims.",
    faqs: [
      {
        answer:
          "SPC parquet and SPC floor covering are preferred for homes, offices, shops, hotels and rental properties because the rigid core is practical, waterproof and suitable for heavy daily use.",
        question:
          "Where can SPC parquet and SPC floor covering be used in North Cyprus?",
      },
      {
        answer:
          "SPC ceramic-look panels and marble sheets are used when the project needs a marble or ceramic effect with faster application, lighter renovation work and fewer wet-area complications.",
        question: "What is the difference between SPC ceramic and marble sheet?",
      },
      {
        answer:
          "Wall panels are chosen mainly for visual finish and practical surface renewal. Acoustic panels add a sound-control benefit and are common in offices, studios, meeting rooms and hospitality spaces.",
        question: "Should I choose wall panel or acoustic panel?",
      },
      {
        answer:
          "Decorative trim, border trim, MDF trim and polyurethane trim create framed walls, classic panel effects, ceiling transitions and more finished interior details.",
        question:
          "What are decorative trim, MDF trim and polyurethane trim used for?",
      },
    ],
    panelEyebrow: "Wall panel range",
    panelTitle: "SPC wall and 3D panel surfaces for modern interiors.",
    localSeoEyebrow: "North Cyprus decoration service",
    localSeoTitle:
      "SPC wall panels, SPC flooring and interior decoration support across North Cyprus.",
    localSeoBody:
      "We help homeowners, contractors and businesses choose waterproof SPC panels for bathrooms, feature walls, living spaces and commercial interiors. Adem Eren Decoration supports projects in Nicosia, Kyrenia, Famagusta, Iskele, Guzelyurt and nearby areas.",
    localSeoCards: [
      {
        body: "Large-format marble, stone, concrete and wood-look panels for bathrooms, kitchens, wet areas and statement walls.",
        title: "SPC wall panels Cyprus",
      },
      {
        body: "Rigid-core waterproof flooring options for homes, offices, showrooms, hotels and rental properties.",
        title: "SPC flooring Cyprus",
      },
      {
        body: "Sample selection, measurements, quantity planning and application coordination before the project starts.",
        title: "Decoration and installation planning",
      },
    ],
    serviceAreaTitle: "Service areas",
    serviceAreas: [
      { href: "/lefkosa-dekorasyon", label: "Nicosia" },
      { href: "/girne-dekorasyon", label: "Kyrenia" },
      { href: "/gazimagusa-dekorasyon", label: "Famagusta" },
      { href: "/iskele-dekorasyon", label: "Iskele" },
      { href: "/guzelyurt-dekorasyon", label: "Guzelyurt" },
      { href: "/lefke-dekorasyon", label: "Lefke" },
      { href: "/ic-mekan-dekorasyon-kibris", label: "North Cyprus" },
    ],
    contactEyebrow: "Start a sample request",
    contactTitle: "Request SPC panel samples for your Cyprus decoration project.",
    process: [
      "Choose floor and wall finish",
      "Request samples and technical sheet",
      "Plan installation and quantities",
    ],
    formName: "Your name",
    formContact: "Phone or email",
    formCollection: "Interested collection",
    formMessage: "Message",
    formSuccess: "Request received. We will contact you soon.",
    formError: "Request could not be sent. Please try WhatsApp.",
    sending: "Sending...",
  },
  tr: {
    brandHome: "Adem Eren Decoration ana sayfa",
    logoAlt: "AE Dekorasyon logosu",
    navLabel: "Ana navigasyon",
    nav: [
      "SPC Parkeler",
      "Duvar Panelleri",
      "Hakkımızda",
      "Vizyon",
      "Misyon",
      "Projeler",
      "İletişim",
    ],
    languageLabel: "Dil seçimi",
    closeMenuLabel: "Menüyü kapat",
    menuLabel: "Menüyü aç",
    searchLabel: "Ürün ara",
    searchPlaceholder: "SPC panel, parke, Kıbrıs dekorasyon ara",
    clearSearch: "Aramayı temizle",
    headerContact: "İletişim",
    heroEyebrow: "Adem Eren Decoration",
    heroTitleTop: "KUZEY KIBRIS",
    heroTitleBottom: "SPC PANEL",
    heroBody:
      "Lefkoşa, Girne, Gazimağusa, İskele ve tüm KKTC'de SPC duvar paneli, SPC parke, banyo paneli ve iç mekan dekorasyon projeleri için numune, metraj ve uygulama desteği.",
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
    catalogTitle:
      "Kuzey Kıbrıs projeleri için SPC parke ve SPC duvar paneli koleksiyonları.",
    promoKicker: "SPC SİSTEM",
    promoTitle: "Zemin, duvar ve panelde tek temiz bitiş",
    promoBody:
      "Kıbrıs evleri, villaları, otelleri ve ticari alanları için suya dayanıklı panel sistemi.",
    bluePromoTitle: "Teklif öncesi numune",
    bluePromoBody:
      "Online mobilya sepeti yok. Projeye göre metraj ve adet hazırlıyoruz.",
    openSampleRequest: "Numune talebini aç",
    wallOfferTitle: "Banyo ve ıslak hacimler için duvar panelleri",
    wallOfferBody:
      "Lefkoşa, Girne ve tüm KKTC projeleri için geniş ebatlı SPC panel seçenekleri.",
    showcaseImageAlt: "SPC parke uygulanmış modern iç mekan",
    workflowEyebrow: "Proje akışı",
    workflowTitle: "Kuzey Kıbrıs'ta zemin ve duvar için SPC paneller.",
    workflowBody:
      "Adem Eren Decoration; villa, apartman, ofis, otel, kafe ve mağaza projeleri için SPC parke panelleri, SPC duvar panelleri ve dokulu 3D panelleri proje bazlı planlar. Amaç numune seçimi, metraj planlama ve uygulama koordinasyonudur.",
    stats: [
      "Suya dayanıklı SPC sistem",
      "Zemin + duvar panel planlama",
      "Teklif öncesi numune seçimi",
    ],
    serviceScopeEyebrow: "Dekorasyon hizmetleri",
    serviceScopeTitle: "Alçıpan, SPC panel ve tavan uygulamaları.",
    serviceScopeBody:
      "SPC parke ve duvar panellerinin yanında alçıpan bölme duvar, asma tavan, ışık bandı, ıslak hacim panel planlaması ve son yüzey koordinasyonu gibi dekorasyon işlerinde de proje bazlı destek veriyoruz.",
    serviceCards: [
      {
        alt: "Kuzey Kıbrıs modern iç mekanda alçıpan tavan ve duvar uygulaması",
        body: "Asma tavan, bölme duvar, niş, gizli ışık bandı ve boya ya da panel öncesi düzgün yüzey hazırlığı.",
        href: "/alcipan-uygulama-kibris",
        image: "/images/ae-alcipan-uygulama.jpg",
        title: "Alçıpan uygulama",
      },
      {
        alt: "Dekorasyon stüdyosunda müşteriyle SPC panel numunesi seçimi",
        body: "Tekliften önce numune, kullanım alanı, renk yönü, ıslak hacim ihtiyacı, ölçü ve teknik detay birlikte netleştirilir.",
        href: "/spc-duvar-paneli-kibris",
        image: "/images/ae-spc-is-sureci.jpg",
        title: "SPC panel iş süreci",
      },
      {
        alt: "SPC panel uygulaması için ölçü ve proje koordinasyonu",
        body: "Numune seçiminden saha kontrolüne kadar zemin, duvar paneli, tavan, metraj ve uygulama takvimi birlikte planlanır.",
        href: "/ic-mekan-dekorasyon-kibris",
        image: "/images/ae-mission-hero.jpg",
        title: "Proje koordinasyonu",
      },
    ],
    processEyebrow: "SPC panel iş süreci",
    processTitle: "İlk fotoğraftan uygulama planına kadar.",
    processBody:
      "Mekan fotoğraflarını, ölçüleri ve değiştirmek istediğiniz yüzeyi paylaşın. Uygun SPC duvar paneli veya SPC parke seçeneklerini daraltıp projenin sonraki adımını hazırlayalım.",
    processSteps: [
      "Mekan fotoğrafı ve kullanım ihtiyacı",
      "SPC numune ve renk seçimi",
      "Ölçü, metraj ve detay kontrolü",
      "Uygulama tarihi ve saha koordinasyonu",
    ],
    materialRangeEyebrow: "Yüzey ve kaplama malzemeleri",
    materialRangeTitle:
      "SPC parke, duvar paneli, marble sheet ve dekoratif çıta çözümleri.",
    materialRangeBody:
      "Kuzey Kıbrıs projelerinde SPC zemin kaplama, SPC seramik görünümü, marble sheet, pleksi, akustik panel, lambri ve dekoratif çıta gruplarını aynı tasarım dili içinde planlıyoruz.",
    materialGroups: [
      {
        body: "Villa, ev, ofis, mağaza, otel ve kiralık dairelerde suya dayanıklı rijit çekirdekli zemin çözümü.",
        href: "/spc-parke-kibris",
        title: "SPC parke ve SPC zemin kaplama",
      },
      {
        body: "Banyo, mutfak, ıslak hacim, resepsiyon duvarı ve hızlı yenileme projeleri için mermer görünümlü yüzey alternatifi.",
        href: "/spc-seramik-kibris",
        title: "SPC seramik ve marble sheet",
      },
      {
        body: "TV arkası, ofis, salon, otel odası ve ticari alanlarda dekoratif görünüm veya ses konforu için panel seçenekleri.",
        href: "/duvar-paneli-kibris",
        title: "Duvar paneli ve akustik panel",
      },
      {
        body: "Banko, vitrin, ofis detayı, tabela arkası ve ticari iç mekanlarda temiz ve modern pleksi uygulama fikirleri.",
        href: "/ic-mekan-dekorasyon-kibris",
        title: "Pleksi detaylar",
      },
      {
        body: "Duvar bölümlendirme, klasik panel etkisi, tavan geçişi ve modern dekorasyon için çıta, dekoratif çıta ve bodür/bordür çıta seçenekleri.",
        href: "/dekoratif-cita-kibris",
        title: "Çıta ve dekoratif çıta sistemleri",
      },
      {
        body: "MDF çıta, poliüretan çıta ve lambri ile sıcak, düzenli ve daha tamamlanmış iç mekan yüzeyleri.",
        href: "/dekoratif-cita-kibris",
        title: "MDF çıta, poliüretan çıta ve lambri",
      },
    ],
    faqEyebrow: "Sık aranan proje soruları",
    faqTitle: "SPC panel, zemin kaplama ve çıta seçmeden önce merak edilenler.",
    faqs: [
      {
        answer:
          "SPC parke ve SPC zemin kaplama; ev, villa, ofis, mağaza, otel ve kiralık konutlarda pratik, suya dayanıklı ve yoğun kullanıma uygun bir zemin çözümü olarak tercih edilir.",
        question:
          "Kuzey Kıbrıs'ta SPC parke ve SPC zemin kaplama nerelerde kullanılır?",
      },
      {
        answer:
          "SPC seramik görünümü ve marble sheet, mermer ya da seramik hissi istenen banyo, mutfak ve duvar yüzeylerinde daha hızlı uygulama ve daha temiz tadilat süreci için değerlendirilir.",
        question: "SPC seramik ile marble sheet arasında nasıl seçim yapılır?",
      },
      {
        answer:
          "Duvar paneli daha çok dekoratif yüzey yenileme için kullanılır. Akustik panel ise ofis, toplantı odası, stüdyo, kafe ve otel gibi alanlarda ses konforuna da katkı sağlar.",
        question: "Duvar paneli mi akustik panel mi seçmeliyim?",
      },
      {
        answer:
          "Dekoratif çıta, bodür/bordür çıta, MDF çıta ve poliüretan çıta; duvar çerçevesi, klasik panel etkisi, tavan geçişi ve daha tamamlanmış bir dekorasyon görünümü için kullanılır.",
        question:
          "Dekoratif çıta, MDF çıta ve poliüretan çıta ne işe yarar?",
      },
    ],
    panelEyebrow: "Duvar panel aralığı",
    panelTitle: "Modern iç mekanlar için SPC duvar ve 3D panel seçenekleri.",
    localSeoEyebrow: "KKTC dekorasyon ve panel uygulama",
    localSeoTitle:
      "Kuzey Kıbrıs'ta SPC duvar paneli, SPC parke ve iç mekan dekorasyon desteği.",
    localSeoBody:
      "Ev sahipleri, müteahhitler ve işletmeler için banyo, mutfak, salon, mağaza, ofis ve otel projelerinde suya dayanıklı SPC panel seçimi yapıyoruz. Adem Eren Decoration; Lefkoşa, Girne, Gazimağusa, İskele, Güzelyurt, Lefke ve çevresinde numune, metraj ve uygulama planlamasıyla destek verir.",
    localSeoCards: [
      {
        body: "Mermer, taş, beton ve ahşap görünümlü geniş ebatlı paneller; banyo, mutfak, ıslak hacim ve vurgu duvarları için uygundur.",
        title: "SPC duvar paneli Kıbrıs",
      },
      {
        body: "Rijit çekirdekli, suya dayanıklı SPC parke seçenekleri; ev, ofis, showroom, otel ve kiralık konut projelerinde tercih edilir.",
        title: "SPC parke Kıbrıs",
      },
      {
        body: "Numune seçimi, ölçü alma, metraj hesaplama ve uygulama koordinasyonu ile dekorasyon projesi başlamadan net bir plan oluşturulur.",
        title: "Dekorasyon ve uygulama planlama",
      },
    ],
    serviceAreaTitle: "Hizmet verdiğimiz bölgeler",
    serviceAreas: [
      { href: "/lefkosa-dekorasyon", label: "Lefkoşa" },
      { href: "/girne-dekorasyon", label: "Girne" },
      { href: "/gazimagusa-dekorasyon", label: "Gazimağusa" },
      { href: "/iskele-dekorasyon", label: "İskele" },
      { href: "/guzelyurt-dekorasyon", label: "Güzelyurt" },
      { href: "/lefke-dekorasyon", label: "Lefke" },
      { href: "/ic-mekan-dekorasyon-kibris", label: "Kuzey Kıbrıs" },
    ],
    contactEyebrow: "Numune talebi başlat",
    contactTitle:
      "Kıbrıs dekorasyon projeniz için incelemek istediğiniz SPC paneli bize söyleyin.",
    process: [
      "Zemin ve duvar panelini seçin",
      "Numune ve teknik doküman talep edin",
      "Montaj ve metraj planlamasını yapalım",
    ],
    formName: "Adınız",
    formContact: "Telefon veya e-posta",
    formCollection: "İlgilendiğiniz koleksiyon",
    formMessage: "Mesajınız",
    formSuccess: "Talebiniz alındı. En kısa sürede iletişime geçeceğiz.",
    formError: "Talep gönderilemedi. Lütfen WhatsApp üzerinden deneyin.",
    sending: "Gönderiliyor...",
  },
} as const;

const initialRequestForm: RequestForm = {
  collection: "",
  contact: "",
  message: "",
  name: "",
};

export function HomePageClient({
  categories,
  products,
  siteContent,
}: HomePageClientProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [language, setLanguage] = useState<Language>("tr");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [requestForm, setRequestForm] = useState(initialRequestForm);
  const [requestBusy, setRequestBusy] = useState(false);
  const [requestStatus, setRequestStatus] = useState<RequestStatus>({
    tone: "idle",
    text: "",
  });
  const heroSlides = siteContent.heroSlides;
  const currentSlide = heroSlides[activeSlide] ?? heroSlides[0];
  const copy = translations[language];
  const flooringProducts = products.filter(
    (product) => product.category === "spc-parke",
  );
  const wallProducts = products.filter(
    (product) => product.category === "spc-duvar-panelleri",
  );

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

  const updateRequestField = <Key extends keyof RequestForm>(
    field: Key,
    value: RequestForm[Key],
  ) => {
    setRequestForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  };

  const submitSampleRequest = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setRequestBusy(true);
    setRequestStatus({ tone: "idle", text: "" });

    try {
      const response = await fetch("/api/leads", {
        body: JSON.stringify({
          ...requestForm,
          language,
          sourcePath: window.location.pathname,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const body = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(body.message || copy.formError);
      }

      setRequestForm(initialRequestForm);
      setRequestStatus({
        tone: "success",
        text: copy.formSuccess,
      });
    } catch (error) {
      const requestError = error as Error;
      setRequestStatus({
        tone: "error",
        text: requestError.message || copy.formError,
      });
    } finally {
      setRequestBusy(false);
    }
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

          <button
            aria-controls="home-mobile-menu"
            aria-expanded={mobileMenuOpen}
            aria-label={
              mobileMenuOpen ? copy.closeMenuLabel : copy.menuLabel
            }
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen((current) => !current)}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>

          <HeaderDesktopNavigation
            ariaLabel={copy.navLabel}
            contactHref="#contact"
            language={language}
            projectsHref="#projects"
          />

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

          <div
            className={`mobile-menu-panel${mobileMenuOpen ? " is-open" : ""}`}
            id="home-mobile-menu"
          >
            <HeaderMobileNavigation
              ariaLabel={copy.navLabel}
              contactHref="#contact"
              language={language}
              onNavigate={() => setMobileMenuOpen(false)}
              projectsHref="#projects"
            />

            <div className="mobile-menu-actions">
              <label className="language-select">
                <span className="sr-only">{copy.languageLabel}</span>
                <select
                  aria-label={copy.languageLabel}
                  onChange={(event) =>
                    setLanguage(event.target.value as Language)
                  }
                  value={language}
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
                <label className="sr-only" htmlFor="site-mobile-search">
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
                  id="site-mobile-search"
                  name="q"
                  placeholder={copy.searchPlaceholder}
                  type="search"
                />
              </form>
              <a
                className="header-contact"
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
              >
                {copy.headerContact}
              </a>
            </div>
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
            {categories.map((category) => (
              <Link href={`/category/${category.slug}`} key={category.slug}>
                {category.shortLabel[language]}
              </Link>
            ))}
          </div>
        </div>

        {categories.map((category) => {
          const categoryProducts = products
            .filter((product) => product.category === category.slug)
            .slice(0, 10);

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

      <section className="service-scope-section">
        <div className="service-scope-heading">
          <p className="eyebrow">{copy.serviceScopeEyebrow}</p>
          <h2>{copy.serviceScopeTitle}</h2>
          <p>{copy.serviceScopeBody}</p>
        </div>

        <div className="service-card-grid">
          {copy.serviceCards.map((card) => (
            <Link className="service-card" href={card.href} key={card.title}>
              <span
                className="service-card-image"
                style={{ position: "relative" }}
              >
                <Image
                  alt={card.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 33vw"
                  src={card.image}
                />
              </span>
              <span className="service-card-body">
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="spc-process-section">
        <div className="spc-process-image" style={{ position: "relative" }}>
          <Image
            alt={copy.serviceCards[1].alt}
            fill
            sizes="(max-width: 1000px) 100vw, 48vw"
            src="/images/ae-spc-is-sureci.jpg"
          />
        </div>
        <div className="spc-process-content">
          <p className="eyebrow">{copy.processEyebrow}</p>
          <h2>{copy.processTitle}</h2>
          <p>{copy.processBody}</p>
          <ol>
            {copy.processSteps.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="material-keyword-section">
        <div className="material-keyword-heading">
          <p className="eyebrow">{copy.materialRangeEyebrow}</p>
          <h2>{copy.materialRangeTitle}</h2>
          <p>{copy.materialRangeBody}</p>
        </div>

        <div className="material-keyword-grid">
          {copy.materialGroups.map((group) => (
            <Link
              className="material-keyword-card"
              href={group.href}
              key={group.title}
            >
              <h3>{group.title}</h3>
              <p>{group.body}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="seo-faq-section">
        <div className="seo-faq-heading">
          <p className="eyebrow">{copy.faqEyebrow}</p>
          <h2>{copy.faqTitle}</h2>
        </div>

        <div className="seo-faq-list">
          {copy.faqs.map((faq) => (
            <details className="seo-faq-item" key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="local-seo-section" aria-labelledby="local-seo-title">
        <div className="local-seo-copy">
          <p className="eyebrow">{copy.localSeoEyebrow}</p>
          <h2 id="local-seo-title">{copy.localSeoTitle}</h2>
          <p>{copy.localSeoBody}</p>
        </div>

        <div className="local-seo-grid">
          {copy.localSeoCards.map((card) => (
            <article className="local-seo-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>

        <div className="service-area-strip">
          <strong>{copy.serviceAreaTitle}</strong>
          <div>
            {copy.serviceAreas.map((area) => (
              <Link href={area.href} key={area.href}>
                {area.label}
              </Link>
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
          <div className="contact-details">
            <a href={`tel:${siteContent.contactPhone.replace(/\s/g, "")}`}>
              {siteContent.contactPhone}
            </a>
            <a href={`mailto:${siteContent.contactEmail}`}>
              {siteContent.contactEmail}
            </a>
          </div>
        </div>

        <form className="request-card" onSubmit={submitSampleRequest}>
          <label className="sr-only" htmlFor="sample-request-name">
            {copy.formName}
          </label>
          <input
            id="sample-request-name"
            onChange={(event) => updateRequestField("name", event.target.value)}
            placeholder={copy.formName}
            required
            value={requestForm.name}
          />
          <label className="sr-only" htmlFor="sample-request-contact">
            {copy.formContact}
          </label>
          <input
            id="sample-request-contact"
            onChange={(event) =>
              updateRequestField("contact", event.target.value)
            }
            placeholder={copy.formContact}
            required
            value={requestForm.contact}
          />
          <label className="sr-only" htmlFor="sample-request-collection">
            {copy.formCollection}
          </label>
          <select
            id="sample-request-collection"
            onChange={(event) =>
              updateRequestField("collection", event.target.value)
            }
            required
            value={requestForm.collection}
          >
            <option disabled value="">
              {copy.formCollection}
            </option>
            {categories.map((category) => (
              <option key={category.slug} value={category.label.tr}>
                {category.label[language]}
              </option>
            ))}
            <option value="SPC 3D Paneller">SPC 3D Paneller</option>
          </select>
          <label className="sr-only" htmlFor="sample-request-message">
            {copy.formMessage}
          </label>
          <textarea
            id="sample-request-message"
            onChange={(event) =>
              updateRequestField("message", event.target.value)
            }
            placeholder={copy.formMessage}
            rows={4}
            value={requestForm.message}
          />
          {requestStatus.text ? (
            <p
              className={`form-feedback is-${requestStatus.tone}`}
              role="status"
            >
              {requestStatus.text}
            </p>
          ) : null}
          <button disabled={requestBusy} type="submit">
            {requestBusy ? copy.sending : copy.requestSamples}
          </button>
        </form>
      </section>

      <SiteFooter language={language} />
    </main>
  );
}
