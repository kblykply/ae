import Image from "next/image";
import Link from "next/link";
import { CatalogHeader } from "./catalog-header";
import { SiteFooter } from "./site-footer";
import type { SeoLandingPage } from "../data/seo-landing-pages";

type SeoLandingPageViewProps = {
  page: SeoLandingPage;
};

export function SeoLandingPageView({ page }: SeoLandingPageViewProps) {
  return (
    <main className="site-shell service-landing-shell">
      <section className="service-landing-hero">
        <Image
          alt={page.heroImageAlt}
          className="service-landing-hero-image"
          fill
          preload
          sizes="100vw"
          src={page.heroImage}
        />
        <CatalogHeader language="tr" />
        <div className="service-landing-hero-content">
          <p className="eyebrow">Adem Eren Decoration</p>
          <h1>{page.title}</h1>
          <p>{page.description}</p>
          <p className="image-context-caption">{page.heroImageAlt}</p>
          <div className="service-landing-actions">
            <Link href="/#contact">Numune ve teklif iste</Link>
            <Link href="/about-us">Hakkımızda</Link>
          </div>
        </div>
      </section>

      <section className="service-landing-intro">
        <div>
          <p className="eyebrow">{page.primaryKeyword}</p>
          <h2>Kuzey Kıbrıs projeleri için doğru malzeme, doğru uygulama planı.</h2>
        </div>
        <div className="service-landing-copy">
          {page.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="service-landing-grid">
        <article>
          <h2>Avantajlar</h2>
          <ul>
            {page.benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </article>
        <article>
          <h2>Kullanım alanları</h2>
          <ul>
            {page.applications.map((application) => (
              <li key={application}>{application}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="service-landing-process">
        <div>
          <p className="eyebrow">Proje süreci</p>
          <h2>İlk görüşmeden uygulama planına kadar net bir akış.</h2>
        </div>
        <ol>
          {page.process.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section className="service-landing-faq">
        <div>
          <p className="eyebrow">Sık sorulanlar</p>
          <h2>{page.primaryKeyword} hakkında merak edilenler</h2>
        </div>
        <div className="service-landing-faq-list">
          {page.faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="service-landing-related">
        <div>
          <p className="eyebrow">İlgili hizmetler</p>
          <h2>Bu hizmetle birlikte değerlendirilen sayfalar.</h2>
        </div>
        <div>
          {page.related.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter language="tr" />
    </main>
  );
}
