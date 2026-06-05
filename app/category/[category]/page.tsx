import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CatalogHeader } from "../../components/catalog-header";
import {
  getCategoryBySlug,
  getProductsByCategory,
  productCategories,
  type ProductCategorySlug,
} from "../../data/products";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return productCategories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryInfo = getCategoryBySlug(category);

  if (!categoryInfo) {
    return {};
  }

  return {
    title: `${categoryInfo.label.tr} | AE Dekorasyon`,
    description: categoryInfo.description.tr,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryInfo = getCategoryBySlug(category);

  if (!categoryInfo) {
    notFound();
  }

  const products = getProductsByCategory(category as ProductCategorySlug);
  const heroProduct = products[0];

  return (
    <main className="site-shell">
      <section className="catalog-hero">
        <CatalogHeader />
        <Image
          alt={`${categoryInfo.label.tr} hero`}
          fill
          preload
          sizes="100vw"
          src={heroProduct.applicationImage}
        />
        <div className="catalog-hero-overlay" />
        <div className="catalog-hero-content">
          <p className="eyebrow">AE Dekorasyon</p>
          <h1>{categoryInfo.label.tr}</h1>
          <p>{categoryInfo.description.tr}</p>
          <a href={categoryInfo.sourceUrl} rel="noreferrer" target="_blank">
            Kermit kaynak koleksiyonu
          </a>
        </div>
      </section>

      <section className="category-page-grid">
        {products.map((product) => (
          <Link
            className="category-product-card"
            href={`/products/${product.slug}`}
            key={product.code}
          >
            <span className="category-product-image">
              <Image
                alt={`${product.name} ${product.code}`}
                fill
                sizes="(max-width: 900px) 50vw, 20vw"
                src={product.image}
              />
            </span>
            <span className="category-product-body">
              <small>{product.code}</small>
              <strong>{product.name}</strong>
              <span>{product.description.tr}</span>
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}
