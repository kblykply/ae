import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CatalogHeader } from "../../components/catalog-header";
import { SiteFooter } from "../../components/site-footer";
import {
  getManagedProductBySlug,
  getManagedRelatedProducts,
} from "../../data/catalog-store";
import {
  getManagedSiteContent,
  getWhatsAppUrl,
} from "../../data/site-content";
import {
  createWebPageImageJsonLd,
  getProductGalleryImageAlt,
  getProductImageCaption,
  getProductPrimaryImageAlt,
} from "../../data/image-seo";
import {
  createBreadcrumbJsonLd,
  createProductJsonLd,
  jsonLdScriptProps,
} from "../../seo";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

const getProductSeoDescription = (product: Awaited<ReturnType<typeof getManagedProductBySlug>>) => {
  if (!product) {
    return "";
  }

  const productType =
    product.category === "spc-parke"
      ? "suya dayanıklı SPC parke"
      : "suya dayanıklı SPC duvar paneli ve banyo paneli";

  return `${product.code} ${product.name}, Kuzey Kıbrıs ve KKTC dekorasyon projeleri için ${productType} seçeneği. Lefkoşa, Girne, Gazimağusa ve İskele projeleri için numune, metraj ve uygulama desteği.`;
};

const getProductLocalNote = (category: string) =>
  category === "spc-parke"
    ? "Bu SPC parke seçeneği Lefkoşa, Girne, Gazimağusa, İskele ve diğer KKTC projelerinde ev, villa, ofis, otel ve ticari alan zeminleri için değerlendirilebilir."
    : "Bu SPC duvar paneli Lefkoşa, Girne, Gazimağusa, İskele ve diğer KKTC projelerinde banyo, mutfak, ıslak hacim, otel odası ve vurgu duvarı uygulamaları için değerlendirilebilir.";

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getManagedProductBySlug(slug);

  if (!product) {
    return {};
  }
  const description = getProductSeoDescription(product);

  return {
    title: `${product.code} ${product.name} SPC Panel Kıbrıs`,
    description,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      description,
      images: [
        {
          alt: `${product.code} ${product.name} ${product.categoryLabel.tr}`,
          url: product.applicationImage || product.image,
        },
      ],
      title: `${product.code} ${product.name} | Kuzey Kıbrıs SPC Panel`,
      type: "website",
      url: `/products/${product.slug}`,
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getManagedProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const [relatedProducts, siteContent] = await Promise.all([
    getManagedRelatedProducts(product),
    getManagedSiteContent(),
  ]);
  const galleryImages = Array.from(
    new Set([
      product.image,
      product.applicationImage,
      ...product.galleryImages,
    ].filter(Boolean)),
  );
  const mainImage = product.image || galleryImages[0];
  const heroImage = product.applicationImage || galleryImages[1] || mainImage;
  const productImageCaption = getProductImageCaption(product);
  const sampleRequestUrl = getWhatsAppUrl(
    siteContent,
    "tr",
    `Merhaba, ${product.code} ${product.name} ürünü için numune ve proje bilgisi almak istiyorum.`,
  );
  const primaryVisualSeoImage = {
    alt: getProductPrimaryImageAlt(product),
    caption: productImageCaption,
    title: `${product.code} ${product.name} ${product.categoryLabel.tr}`,
    url: heroImage,
  };
  const jsonLd = [
    createBreadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      {
        name: product.categoryLabel.tr,
        path: `/category/${product.category}`,
      },
      { name: `${product.code} ${product.name}`, path: `/products/${product.slug}` },
    ]),
    createWebPageImageJsonLd({
      description: getProductSeoDescription(product),
      image: primaryVisualSeoImage,
      name: `${product.code} ${product.name}`,
      path: `/products/${product.slug}`,
    }),
    createProductJsonLd(product),
  ];

  return (
    <main className="site-shell">
      <script
        dangerouslySetInnerHTML={jsonLdScriptProps(jsonLd)}
        type="application/ld+json"
      />
      <section className="product-detail-hero">
        <CatalogHeader />
        <div className="detail-hero-image">
          <Image
            alt={primaryVisualSeoImage.alt}
            fill
            preload
            sizes="100vw"
            src={heroImage}
          />
        </div>
        <div className="catalog-hero-overlay" />
        <div className="product-detail-title">
          <p className="eyebrow">{product.categoryLabel.tr}</p>
          <h1>{product.name}</h1>
          <span>{product.code}</span>
        </div>
      </section>

      <section className="product-detail-layout">
        <div className="detail-product-media">
          <figure className="detail-product-figure">
            <div className="detail-product-image">
              <Image
                alt={getProductGalleryImageAlt(product, 0)}
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
                src={mainImage}
              />
            </div>
            <figcaption className="product-image-caption">
              {productImageCaption}
            </figcaption>
          </figure>

          {galleryImages.length > 1 ? (
            <div className="product-image-gallery">
              {galleryImages.map((image, index) => (
                <figure key={`${image}-${index}`}>
                  <span>
                    <Image
                      alt={getProductGalleryImageAlt(product, index)}
                      fill
                      sizes="(max-width: 900px) 33vw, 12vw"
                      src={image}
                    />
                  </span>
                  <figcaption>
                    {index === 0
                      ? "Numune yüzeyi"
                      : index === 1
                        ? "Uygulama görünümü"
                        : `Detay görseli ${index + 1}`}
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : null}
        </div>

        <article className="detail-info">
          <p className="eyebrow">{product.collection.tr}</p>
          <h2>{product.code} | {product.name}</h2>
          <p>{product.description.tr}</p>

          <div className="detail-local-note">
            <strong>Kuzey Kıbrıs proje kullanımı</strong>
            <p>{getProductLocalNote(product.category)}</p>
          </div>

          <div className="detail-actions">
            <a
              aria-label={`${product.code} ${product.name} için WhatsApp üzerinden numune iste`}
              href={sampleRequestUrl}
              rel="noreferrer"
              target="_blank"
            >
              WhatsApp üzerinden numune iste
            </a>
          </div>

          <dl className="detail-specs">
            {product.technicalSpecs.map((spec) => (
              <div key={spec.label.tr}>
                <dt>{spec.label.tr}</dt>
                <dd>
                  {Array.isArray(spec.value)
                    ? spec.value.map((item) => <span key={item}>{item}</span>)
                    : spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </article>
      </section>

      <section className="related-products">
        <div className="section-heading">
          <p className="eyebrow">Benzer ürünler</p>
          <h2>{product.categoryLabel.tr}</h2>
        </div>

        <div className="directory-grid">
          {relatedProducts.map((related) => (
            <Link
              className="directory-card"
              href={`/products/${related.slug}`}
              key={related.code}
            >
              <span className="directory-card-image">
                <Image
                  alt={getProductGalleryImageAlt(related, 0)}
                  fill
                  sizes="(max-width: 900px) 50vw, 18vw"
                  src={related.image}
                />
              </span>
              <span className="directory-card-body">
                <small>{related.code}</small>
                <strong>{related.name}</strong>
                <span>{related.collection.tr}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
