import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CatalogHeader } from "../../components/catalog-header";
import {
  getProductBySlug,
  getRelatedProducts,
  products,
} from "../../data/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {};
  }

  return {
    title: `${product.code} ${product.name} | AE Dekorasyon`,
    description: product.description.tr,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product);

  return (
    <main className="site-shell">
      <section className="product-detail-hero">
        <CatalogHeader />
        <div className="detail-hero-image">
          <Image
            alt={`${product.name} application`}
            fill
            preload
            sizes="100vw"
            src={product.applicationImage}
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
        <div className="detail-product-image">
          <Image
            alt={`${product.name} ${product.code}`}
            fill
            sizes="(max-width: 900px) 100vw, 45vw"
            src={product.image}
          />
        </div>

        <article className="detail-info">
          <p className="eyebrow">{product.collection.tr}</p>
          <h2>{product.code} | {product.name}</h2>
          <p>{product.description.tr}</p>

          <div className="detail-actions">
            <Link href="/#contact">Numune iste</Link>
            <a href={product.sourceUrl} rel="noreferrer" target="_blank">
              Kermit ürün kaynağı
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
                  alt={`${related.name} ${related.code}`}
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
    </main>
  );
}
