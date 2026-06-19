"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CatalogHeader } from "../components/catalog-header";
import { SiteFooter } from "../components/site-footer";

type Language = "en" | "tr";

type AboutPageClientProps = {
  contactEmail: string;
  contactPhone: string;
};

const aboutCopy = {
  en: {
    eyebrow: "About Adem Eren Decoration",
    title: "A finish selection and decoration studio for North Cyprus projects.",
    intro:
      "Adem Eren Decoration helps homeowners, architects, contractors and commercial project teams choose practical, durable and visually clean interior finishes for North Cyprus spaces.",
    heroAlt:
      "Designer and customer reviewing SPC panel and marble sheet samples in a North Cyprus decoration studio",
    primaryCta: "View SPC collections",
    secondaryCta: "Request project support",
    proof: [
      "SPC flooring and wall panel selection",
      "Marble sheet, acoustic panel and trim planning",
      "Service across Nicosia, Kyrenia, Famagusta and North Cyprus",
    ],
    sections: [
      {
        body:
          "We do not work like a simple product shelf. Every material choice is reviewed with the room use, humidity level, color direction, wall or floor condition, quantity needs and application timing in mind.",
        title: "Who we are",
      },
      {
        body:
          "Our focus is on SPC parquet, SPC floor covering, SPC ceramic-look surfaces, SPC wall panels, marble sheet, plexiglass details, acoustic panels, lambri and decorative trim systems including MDF trim and polyurethane trim.",
        title: "What we focus on",
      },
      {
        body:
          "The goal is to reduce uncertainty before installation. We help compare samples, plan measurements, organize technical details and guide the next step before the project begins on site.",
        title: "How we help",
      },
    ],
    materialTitle: "Material families we plan together",
    materialBody:
      "A strong decoration result usually comes from coordinating several surfaces at once. We help connect floors, walls, ceilings and details into one practical project plan.",
    materials: [
      "SPC parquet and SPC floor covering",
      "SPC ceramic and waterproof wall panels",
      "Marble sheet for wet areas and feature walls",
      "Plexiglass details for commercial interiors",
      "Acoustic panels for offices and hospitality spaces",
      "Decorative trim, border trim, MDF trim, polyurethane trim and lambri",
    ],
    workflowTitle: "Our project approach",
    workflow: [
      {
        body:
          "We start by understanding the room photos, dimensions, moisture exposure, usage intensity and style direction.",
        title: "1. Understand the space",
      },
      {
        body:
          "We narrow down suitable SPC panels, floors, marble sheet surfaces, trims or acoustic panel options.",
        title: "2. Select samples",
      },
      {
        body:
          "We review quantity, technical details, wall or floor preparation and installation sequence before the quote.",
        title: "3. Plan the application",
      },
    ],
    localTitle: "Local decoration support in North Cyprus",
    localBody:
      "We support projects in Nicosia, Kyrenia, Famagusta, Iskele, Guzelyurt, Lefke and nearby areas. The content on this page is written for customers comparing decoration companies, SPC panel suppliers and finish materials in North Cyprus.",
    areas: [
      "Nicosia",
      "Kyrenia",
      "Famagusta",
      "Iskele",
      "Guzelyurt",
      "Lefke",
      "North Cyprus",
    ],
    faqTitle: "About our service",
    faqs: [
      {
        answer:
          "We help with finish selection and project planning for SPC flooring, SPC wall panels, marble sheet, acoustic panel, plexiglass, lambri and decorative trim applications.",
        question: "What does Adem Eren Decoration do?",
      },
      {
        answer:
          "Yes. We support sample selection, measurement planning and application coordination for homes, villas, offices, hotels, shops and renovation projects.",
        question: "Do you support both residential and commercial projects?",
      },
      {
        answer:
          "Yes. We can review room photos, dimensions and the desired surface direction before preparing the next project step.",
        question: "Can I request help before choosing a product?",
      },
    ],
    contactTitle: "Talk to us about your project",
    contactBody:
      "Share photos, dimensions and the finish style you want. We can help narrow the right material group before sample or quote stage.",
    emailLabel: "Email",
    phoneLabel: "Phone",
  },
  tr: {
    eyebrow: "Adem Eren Decoration Hakkında",
    title:
      "Kuzey Kıbrıs projeleri için yüzey seçimi ve dekorasyon stüdyosu.",
    intro:
      "Adem Eren Decoration; ev sahipleri, mimarlar, müteahhitler ve ticari proje ekipleri için Kuzey Kıbrıs'ta dayanıklı, uygulanabilir ve şık iç mekan yüzeyleri seçmeye yardımcı olur.",
    heroAlt:
      "Kuzey Kıbrıs dekorasyon stüdyosunda SPC panel ve marble sheet numunesi inceleyen tasarımcı ve müşteri",
    primaryCta: "SPC koleksiyonları",
    secondaryCta: "Proje desteği iste",
    proof: [
      "SPC parke ve duvar paneli seçimi",
      "Marble sheet, akustik panel ve çıta planlama",
      "Lefkoşa, Girne, Gazimağusa ve tüm Kuzey Kıbrıs'ta hizmet",
    ],
    sections: [
      {
        body:
          "Biz dekorasyonu basit bir ürün rafı gibi görmüyoruz. Her malzeme kararını kullanım alanı, nem durumu, renk yönü, mevcut zemin veya duvar yapısı, metraj ihtiyacı ve uygulama takvimiyle birlikte değerlendiriyoruz.",
        title: "Biz kimiz?",
      },
      {
        body:
          "Odak alanımız SPC parke, SPC zemin kaplama, SPC seramik görünüm, SPC duvar paneli, marble sheet, pleksi detaylar, akustik panel, lambri ve MDF çıta ile poliüretan çıta dahil dekoratif çıta sistemleridir.",
        title: "Neye odaklanıyoruz?",
      },
      {
        body:
          "Amacımız uygulama öncesi belirsizliği azaltmak. Numune karşılaştırması, ölçü planlama, teknik detay ve saha uygulama adımlarını proje başlamadan daha net hale getiriyoruz.",
        title: "Nasıl yardımcı oluyoruz?",
      },
    ],
    materialTitle: "Birlikte planladığımız malzeme grupları",
    materialBody:
      "Güçlü bir dekorasyon sonucu genellikle birden fazla yüzeyin doğru eşleşmesiyle oluşur. Zemin, duvar, tavan ve detayları tek uygulanabilir proje planında birleştirmeye yardımcı oluruz.",
    materials: [
      "SPC parke ve SPC zemin kaplama",
      "SPC seramik ve suya dayanıklı duvar paneli",
      "Islak hacim ve vurgu duvarları için marble sheet",
      "Ticari iç mekanlar için pleksi detaylar",
      "Ofis ve otel projeleri için akustik panel",
      "Dekoratif çıta, bodür/bordür çıta, MDF çıta, poliüretan çıta ve lambri",
    ],
    workflowTitle: "Proje yaklaşımımız",
    workflow: [
      {
        body:
          "Önce mekan fotoğraflarını, ölçüleri, nem durumunu, kullanım yoğunluğunu ve istenen dekorasyon yönünü anlarız.",
        title: "1. Mekanı anlıyoruz",
      },
      {
        body:
          "Uygun SPC panel, zemin kaplama, marble sheet, çıta veya akustik panel seçeneklerini birlikte daraltırız.",
        title: "2. Numune seçiyoruz",
      },
      {
        body:
          "Tekliften önce metraj, teknik detay, duvar veya zemin hazırlığı ve uygulama sırasını kontrol ederiz.",
        title: "3. Uygulamayı planlıyoruz",
      },
    ],
    localTitle: "Kuzey Kıbrıs'ta yerel dekorasyon desteği",
    localBody:
      "Lefkoşa, Girne, Gazimağusa, İskele, Güzelyurt, Lefke ve çevresindeki projelere destek veriyoruz. Bu sayfa, Kuzey Kıbrıs'ta dekorasyon firması, SPC panel tedarikçisi ve iç mekan kaplama malzemeleri arayan müşteriler için hazırlanmıştır.",
    areas: [
      "Lefkoşa",
      "Girne",
      "Gazimağusa",
      "İskele",
      "Güzelyurt",
      "Lefke",
      "Kuzey Kıbrıs",
    ],
    faqTitle: "Hizmetimiz hakkında",
    faqs: [
      {
        answer:
          "SPC parke, SPC duvar paneli, marble sheet, akustik panel, pleksi, lambri ve dekoratif çıta uygulamaları için yüzey seçimi ve proje planlama desteği veriyoruz.",
        question: "Adem Eren Decoration ne yapar?",
      },
      {
        answer:
          "Evet. Ev, villa, ofis, otel, mağaza ve yenileme projeleri için numune seçimi, metraj planlama ve uygulama koordinasyonu konusunda destek sağlarız.",
        question: "Konut ve ticari projelere destek veriyor musunuz?",
      },
      {
        answer:
          "Evet. Ürün seçmeden önce mekan fotoğraflarını, ölçüleri ve istediğiniz yüzey yönünü inceleyerek doğru malzeme grubunu daraltabiliriz.",
        question: "Ürün seçmeden önce yardım alabilir miyim?",
      },
    ],
    contactTitle: "Projeniz hakkında konuşalım",
    contactBody:
      "Mekan fotoğraflarını, ölçüleri ve istediğiniz yüzey tarzını paylaşın. Numune veya teklif aşamasından önce doğru malzeme grubunu birlikte netleştirelim.",
    emailLabel: "E-posta",
    phoneLabel: "Telefon",
  },
} as const;

export function AboutPageClient({
  contactEmail,
  contactPhone,
}: AboutPageClientProps) {
  const [language, setLanguage] = useState<Language>("tr");
  const copy = aboutCopy[language];

  return (
    <main className="site-shell about-shell">
      <section className="about-hero">
        <Image
          alt={copy.heroAlt}
          className="about-hero-image"
          fill
          preload
          sizes="100vw"
          src="/images/ae-spc-is-sureci.jpg"
        />
        <CatalogHeader language={language} onLanguageChange={setLanguage} />
        <div className="about-hero-content">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p>{copy.intro}</p>
          <p className="image-context-caption">{copy.heroAlt}</p>
          <div className="about-hero-actions">
            <Link href="/category/spc-parke">{copy.primaryCta}</Link>
            <Link href="/#contact">{copy.secondaryCta}</Link>
          </div>
        </div>
      </section>

      <section className="about-proof-strip" aria-label={copy.eyebrow}>
        {copy.proof.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </section>

      <section className="about-intro-grid">
        {copy.sections.map((section) => (
          <article className="about-info-card" key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </article>
        ))}
      </section>

      <section className="about-material-section">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2>{copy.materialTitle}</h2>
          <p>{copy.materialBody}</p>
        </div>
        <ul>
          {copy.materials.map((material) => (
            <li key={material}>{material}</li>
          ))}
        </ul>
      </section>

      <section className="about-workflow-section">
        <div className="about-workflow-image">
          <Image
            alt={
              language === "tr"
                ? "SPC panel ve dekoratif yüzey uygulaması için ölçü alan ekip"
                : "Team measuring for SPC panel and decorative surface installation"
            }
            fill
            sizes="(max-width: 900px) 100vw, 44vw"
            src="/images/ae-mission-hero.jpg"
          />
        </div>
        <div className="about-workflow-content">
          <h2>{copy.workflowTitle}</h2>
          <div>
            {copy.workflow.map((step) => (
              <article key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-local-section">
        <div>
          <h2>{copy.localTitle}</h2>
          <p>{copy.localBody}</p>
        </div>
        <div className="about-area-list">
          {copy.areas.map((area) => (
            <span key={area}>{area}</span>
          ))}
        </div>
      </section>

      <section className="about-faq-section">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2>{copy.faqTitle}</h2>
        </div>
        <div className="about-faq-list">
          {copy.faqs.map((faq) => (
            <details className="about-faq-item" key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="about-contact-band">
        <div>
          <h2>{copy.contactTitle}</h2>
          <p>{copy.contactBody}</p>
        </div>
        <address>
          <a href={`tel:${contactPhone.replace(/\s/g, "")}`}>
            <span>{copy.phoneLabel}</span>
            {contactPhone}
          </a>
          <a href={`mailto:${contactEmail}`}>
            <span>{copy.emailLabel}</span>
            {contactEmail}
          </a>
        </address>
      </section>

      <SiteFooter language={language} />
    </main>
  );
}
