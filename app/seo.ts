import type { SiteContent } from "./data/site-content";
import type { Product } from "./data/products";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ademerendecoration.com"
).replace(/\/$/, "");

export const businessName = "Adem Eren Decoration";
export const shortBusinessName = "AE Dekorasyon";
export const defaultOgImage = "/images/kermit-floor-application.jpg";

export const northCyprusServiceAreas = [
  "Lefkoşa",
  "Girne",
  "Gazimağusa",
  "İskele",
  "Güzelyurt",
  "Lefke",
  "Kuzey Kıbrıs",
  "KKTC",
];

export const localSeoKeywords = [
  "Kuzey Kıbrıs dekorasyon",
  "KKTC dekorasyon",
  "Kıbrıs dekorasyon firması",
  "Lefkoşa dekorasyon",
  "Girne dekorasyon",
  "Gazimağusa dekorasyon",
  "İskele dekorasyon",
  "SPC panel Kıbrıs",
  "SPC duvar paneli Kıbrıs",
  "SPC parke Kıbrıs",
  "SPC parke",
  "SPC zemin kaplama",
  "SPC zemin kaplama Kıbrıs",
  "SPC seramik Kıbrıs",
  "marble sheet",
  "marble sheet Kıbrıs",
  "suya dayanıklı duvar paneli",
  "banyo duvar paneli",
  "duvar paneli Kıbrıs",
  "akustik panel Kıbrıs",
  "pleksi dekorasyon Kıbrıs",
  "çıta Kıbrıs",
  "dekoratif çıta Kıbrıs",
  "bodür çıta Kıbrıs",
  "bordür çıta Kıbrıs",
  "MDF çıta Kıbrıs",
  "lambri Kıbrıs",
  "poliüretan çıta Kıbrıs",
  "iç mekan tasarımı Kıbrıs",
  "duvar paneli uygulama",
  "SPC panel uygulama",
  "alçıpan uygulama Kıbrıs",
  "asma tavan Kıbrıs",
  "Kıbrıs tadilat dekorasyon",
];

export const defaultSeoDescription =
  "Adem Eren Decoration, Kuzey Kıbrıs'ta SPC parke, SPC zemin kaplama, duvar paneli, marble sheet, akustik panel, pleksi, lambri, dekoratif çıta, alçıpan ve asma tavan projeleri için numune, metraj ve uygulama desteği sunar.";

export const absoluteUrl = (path: string) => {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
};

export const jsonLdScriptProps = (payload: unknown) => ({
  __html: JSON.stringify(payload).replace(/</g, "\\u003c"),
});

const serviceAreaJsonLd = northCyprusServiceAreas.map((area) => ({
  "@type": area === "Kuzey Kıbrıs" || area === "KKTC" ? "AdministrativeArea" : "City",
  name: area,
}));

export const createLocalBusinessJsonLd = (siteContent: SiteContent) => ({
  "@context": "https://schema.org",
  "@id": absoluteUrl("/#local-business"),
  "@type": "HomeAndConstructionBusiness",
  address: {
    "@type": "PostalAddress",
    addressCountry: "CY",
    addressLocality: "Lefkoşa",
    addressRegion: "Kuzey Kıbrıs",
  },
  alternateName: [shortBusinessName, "Adem Eren Dekorasyon"],
  areaServed: serviceAreaJsonLd,
  description: defaultSeoDescription,
  email: siteContent.contactEmail,
  image: absoluteUrl(defaultOgImage),
  knowsAbout: localSeoKeywords,
  logo: absoluteUrl("/aelogo.png?v=3"),
  name: businessName,
  priceRange: "$$",
  telephone: siteContent.contactPhone,
  url: siteUrl,
});

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@id": absoluteUrl("/#website"),
  "@type": "WebSite",
  inLanguage: "tr-CY",
  name: businessName,
  potentialAction: {
    "@type": "SearchAction",
    "query-input": "required name=search_term_string",
    target: `${siteUrl}/search?q={search_term_string}`,
  },
  url: siteUrl,
};

export const homeServiceJsonLd = {
  "@context": "https://schema.org",
  "@id": absoluteUrl("/#spc-panel-service"),
  "@type": "Service",
  areaServed: serviceAreaJsonLd,
  description:
    "Kuzey Kıbrıs'ta SPC parke, SPC zemin kaplama, SPC seramik, SPC duvar paneli, marble sheet, akustik panel, pleksi, lambri, dekoratif çıta, MDF çıta, poliüretan çıta, alçıpan ve asma tavan projeleri için ürün seçimi, numune ve uygulama planlama hizmeti.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SPC duvar paneli uygulama",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SPC parke uygulama",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SPC zemin kaplama ve SPC seramik planlama",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Marble sheet ve pleksi dekorasyon uygulamaları",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Akustik panel ve duvar paneli seçimi",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Dekoratif çıta, bodür çıta, MDF çıta, poliüretan çıta ve lambri",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "İç mekan dekorasyon ve panel seçimi",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Alçıpan uygulama ve asma tavan planlama",
        },
      },
    ],
    name: "SPC panel, zemin kaplama, marble sheet, çıta ve dekorasyon hizmetleri",
  },
  name: "Kuzey Kıbrıs SPC Panel, Zemin Kaplama, Marble Sheet ve Dekorasyon Hizmeti",
  provider: {
    "@id": absoluteUrl("/#local-business"),
  },
  serviceType:
    "SPC panel, SPC parke, SPC zemin kaplama, marble sheet, pleksi, akustik panel, çıta, lambri, alçıpan ve dekorasyon uygulama",
};

export const homeFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SPC parke ve SPC zemin kaplama; ev, villa, ofis, mağaza, otel ve kiralık konutlarda pratik, suya dayanıklı ve yoğun kullanıma uygun bir zemin çözümü olarak tercih edilir.",
      },
      name: "Kuzey Kıbrıs'ta SPC parke ve SPC zemin kaplama nerelerde kullanılır?",
    },
    {
      "@type": "Question",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SPC seramik görünümü ve marble sheet, mermer ya da seramik hissi istenen banyo, mutfak ve duvar yüzeylerinde daha hızlı uygulama ve daha temiz tadilat süreci için değerlendirilir.",
      },
      name: "SPC seramik ile marble sheet arasında nasıl seçim yapılır?",
    },
    {
      "@type": "Question",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Duvar paneli daha çok dekoratif yüzey yenileme için kullanılır. Akustik panel ise ofis, toplantı odası, stüdyo, kafe ve otel gibi alanlarda ses konforuna da katkı sağlar.",
      },
      name: "Duvar paneli mi akustik panel mi seçmeliyim?",
    },
    {
      "@type": "Question",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dekoratif çıta, bodür veya bordür çıta, MDF çıta ve poliüretan çıta; duvar çerçevesi, klasik panel etkisi, tavan geçişi ve daha tamamlanmış bir dekorasyon görünümü için kullanılır.",
      },
      name: "Dekoratif çıta, MDF çıta ve poliüretan çıta ne işe yarar?",
    },
  ],
};

export const createBreadcrumbJsonLd = (
  items: Array<{ name: string; path: string }>,
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    item: absoluteUrl(item.path),
    name: item.name,
    position: index + 1,
  })),
});

export const createProductJsonLd = (product: Product) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  additionalProperty: product.technicalSpecs.map((spec) => ({
    "@type": "PropertyValue",
    name: spec.label.tr,
    value: Array.isArray(spec.value) ? spec.value.join(", ") : spec.value,
  })),
  brand: {
    "@type": "Brand",
    name: businessName,
  },
  category: product.categoryLabel.tr,
  description: product.description.tr,
  image: Array.from(
    new Set([product.image, product.applicationImage, ...product.galleryImages]),
  )
    .filter(Boolean)
    .map(absoluteUrl),
  material: "SPC (Stone Polymer Composite)",
  name: `${product.code} ${product.name}`,
  sku: product.code,
  url: absoluteUrl(`/products/${product.slug}`),
});

export const createCollectionPageJsonLd = (
  category: {
    description: { tr: string };
    label: { tr: string };
    slug: string;
  },
  products: Product[],
) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  description: category.description.tr,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: products.slice(0, 24).map((product, index) => ({
      "@type": "ListItem",
      item: absoluteUrl(`/products/${product.slug}`),
      name: `${product.code} ${product.name}`,
      position: index + 1,
    })),
    numberOfItems: products.length,
  },
  name: `${category.label.tr} Kuzey Kıbrıs`,
  url: absoluteUrl(`/category/${category.slug}`),
});
