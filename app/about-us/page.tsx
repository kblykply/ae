import type { Metadata } from "next";
import { AboutPageClient } from "./about-page-client";
import { createImageObjectJsonLd } from "../data/image-seo";
import { getManagedSiteContent } from "../data/site-content";
import {
  absoluteUrl,
  businessName,
  createBreadcrumbJsonLd,
  jsonLdScriptProps,
  localSeoKeywords,
  siteUrl,
} from "../seo";

const aboutDescription =
  "Adem Eren Decoration hakkında: Kuzey Kıbrıs'ta SPC parke, SPC zemin kaplama, SPC duvar paneli, marble sheet, akustik panel, pleksi, lambri, dekoratif çıta, alçıpan ve asma tavan projeleri için yüzey seçimi ve uygulama planlama desteği.";
const aboutVisualSeoImage = {
  alt: "Adem Eren Decoration Kuzey Kıbrıs dekorasyon ve SPC panel stüdyosu",
  caption:
    "Adem Eren Decoration; Kuzey Kıbrıs'ta SPC panel, zemin kaplama, marble sheet ve dekoratif yüzey projeleri için numune ve uygulama planlama desteği verir.",
  title: "Adem Eren Decoration hakkımızda görseli",
  url: "/images/ae-spc-is-sureci.jpg",
};

export const metadata: Metadata = {
  title:
    "Hakkımızda | Kuzey Kıbrıs SPC Panel, Zemin Kaplama ve Dekorasyon",
  description: aboutDescription,
  alternates: {
    canonical: "/about-us",
  },
  keywords: [
    ...localSeoKeywords,
    "Adem Eren Decoration hakkında",
    "Kuzey Kıbrıs dekorasyon firması hakkında",
    "KKTC SPC panel firması",
    "Kıbrıs iç mekan kaplama firması",
  ],
  openGraph: {
    description: aboutDescription,
    images: [
      {
        alt: "Adem Eren Decoration Kuzey Kıbrıs dekorasyon ve SPC panel stüdyosu",
        height: 900,
        url: "/images/ae-spc-is-sureci.jpg",
        width: 1680,
      },
    ],
    title:
      "Hakkımızda | Kuzey Kıbrıs SPC Panel, Marble Sheet ve Dekorasyon",
    type: "website",
    url: "/about-us",
  },
  twitter: {
    card: "summary_large_image",
    description: aboutDescription,
    images: ["/images/ae-spc-is-sureci.jpg"],
    title: "Adem Eren Decoration Hakkında",
  },
};

const aboutFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Adem Eren Decoration; SPC parke, SPC duvar paneli, marble sheet, akustik panel, pleksi, lambri ve dekoratif çıta uygulamaları için yüzey seçimi ve proje planlama desteği verir.",
      },
      name: "Adem Eren Decoration ne yapar?",
    },
    {
      "@type": "Question",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ev, villa, ofis, otel, mağaza ve yenileme projeleri için numune seçimi, metraj planlama ve uygulama koordinasyonu konusunda destek sağlanır.",
      },
      name: "Konut ve ticari projelere destek veriyor musunuz?",
    },
    {
      "@type": "Question",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ürün seçmeden önce mekan fotoğrafları, ölçüler ve istenen yüzey tarzı incelenerek doğru malzeme grubu daraltılabilir.",
      },
      name: "Ürün seçmeden önce yardım alabilir miyim?",
    },
  ],
};

export default async function AboutUsPage() {
  const siteContent = await getManagedSiteContent();
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@id": absoluteUrl("/about-us#about-page"),
      "@type": "AboutPage",
      about: {
        "@id": absoluteUrl("/#local-business"),
      },
      description: aboutDescription,
      image: createImageObjectJsonLd(aboutVisualSeoImage),
      inLanguage: "tr-CY",
      isPartOf: {
        "@id": absoluteUrl("/#website"),
      },
      mainEntity: {
        "@id": absoluteUrl("/#local-business"),
      },
      name:
        "Adem Eren Decoration Hakkında - Kuzey Kıbrıs Dekorasyon ve SPC Panel",
      primaryImageOfPage: createImageObjectJsonLd(aboutVisualSeoImage),
      publisher: {
        "@id": absoluteUrl("/#local-business"),
      },
      url: absoluteUrl("/about-us"),
    },
    {
      "@context": "https://schema.org",
      "@id": absoluteUrl("/about-us#service"),
      "@type": "Service",
      areaServed: [
        "Lefkoşa",
        "Girne",
        "Gazimağusa",
        "İskele",
        "Güzelyurt",
        "Lefke",
        "Kuzey Kıbrıs",
        "KKTC",
      ],
      description:
        "SPC parke, SPC zemin kaplama, SPC duvar paneli, marble sheet, akustik panel, pleksi, lambri, dekoratif çıta, alçıpan ve asma tavan projeleri için numune seçimi, metraj ve uygulama planlama hizmeti.",
      name:
        "Kuzey Kıbrıs SPC panel, zemin kaplama ve dekorasyon planlama hizmeti",
      provider: {
        "@id": absoluteUrl("/#local-business"),
        name: businessName,
        telephone: siteContent.contactPhone,
        email: siteContent.contactEmail,
      },
      serviceType:
        "SPC panel, SPC parke, marble sheet, akustik panel, pleksi, çıta ve iç mekan dekorasyon",
      url: `${siteUrl}/about-us`,
    },
    createBreadcrumbJsonLd([
      { name: "Ana Sayfa", path: "/" },
      { name: "Hakkımızda", path: "/about-us" },
    ]),
    aboutFaqJsonLd,
  ];

  return (
    <>
      <script
        dangerouslySetInnerHTML={jsonLdScriptProps(jsonLd)}
        type="application/ld+json"
      />
      <AboutPageClient
        contactEmail={siteContent.contactEmail}
        contactPhone={siteContent.contactPhone}
      />
    </>
  );
}
