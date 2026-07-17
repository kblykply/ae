import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CatalogHeader } from "../../components/catalog-header";
import { SiteFooter } from "../../components/site-footer";
import { getManagedProducts } from "../../data/catalog-store";
import {
  createWebPageImageJsonLd,
  getCategoryVisualSeoImage,
  getProductGalleryImageAlt,
} from "../../data/image-seo";
import {
  getCategoryBySlug,
  type ProductCategory,
} from "../../data/products";
import {
  createBreadcrumbJsonLd,
  createCollectionPageJsonLd,
  defaultOgImage,
  jsonLdScriptProps,
} from "../../seo";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export const dynamic = "force-dynamic";

type CategorySeoContent = {
  body: string;
  description: string;
  tags: string[];
  title: string;
};

const categorySeoContent: Partial<Record<string, CategorySeoContent>> = {
  "spc-duvar-panelleri": {
    body: "Banyo, mutfak, ıslak hacim, otel odası, mağaza ve konut projeleri için mermer, taş, beton ve ahşap görünümlü SPC duvar panelleri seçebilirsiniz. Lefkoşa, Girne, Gazimağusa, İskele ve tüm KKTC projelerinde numune ve metraj planlaması yapılır.",
    description:
      "Kuzey Kıbrıs ve KKTC genelinde banyo, mutfak, ıslak hacim ve vurgu duvarları için SPC duvar paneli seçenekleri. Lefkoşa, Girne, Gazimağusa ve İskele projeleri için numune ve uygulama desteği.",
    tags: [
      "SPC duvar paneli Kıbrıs",
      "Banyo duvar paneli",
      "Suya dayanıklı panel",
      "Mermer görünümlü panel",
    ],
    title: "Kuzey Kıbrıs'ta SPC duvar paneli ve banyo paneli seçenekleri.",
  },
  "spc-parke": {
    body: "Ev, villa, ofis, showroom, otel ve ticari alanlarda suya dayanıklı rijit çekirdekli SPC parke koleksiyonları kullanılır. Kuzey Kıbrıs projelerinde ahşap görünümlü zemin seçimi, numune kontrolü, metraj ve uygulama planlaması yapılır.",
    description:
      "Kuzey Kıbrıs ve KKTC genelinde ev, villa, ofis, otel ve ticari projeler için suya dayanıklı SPC parke seçenekleri. Lefkoşa, Girne, Gazimağusa ve İskele için numune, metraj ve uygulama desteği.",
    tags: [
      "SPC parke Kıbrıs",
      "Suya dayanıklı parke",
      "Villa zemin kaplama",
      "Ofis SPC zemin",
    ],
    title: "Kuzey Kıbrıs'ta SPC parke ve zemin paneli seçenekleri.",
  },
};

const getCategorySeoContent = (
  categoryInfo: ProductCategory,
): CategorySeoContent =>
  categorySeoContent[categoryInfo.slug] ?? {
    body: `${categoryInfo.label.tr} kategorisindeki ürünler Kuzey Kıbrıs ev, villa, ofis, mağaza, otel ve ticari dekorasyon projeleri için incelenebilir. Ürünleri kod, renk, malzeme ve uygulama ihtiyacına göre karşılaştırıp numune talebi oluşturabilirsiniz.`,
    description: `${categoryInfo.label.tr} ürünleri için Kuzey Kıbrıs ve KKTC genelinde numune, metraj ve dekorasyon uygulama desteği.`,
    tags: [
      `${categoryInfo.label.tr} Kıbrıs`,
      `${categoryInfo.label.tr} KKTC`,
      "Dekorasyon malzemeleri",
      "Numune ve uygulama desteği",
    ],
    title: `${categoryInfo.label.tr} ürünleri ve dekorasyon seçenekleri.`,
  };

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const products = await getManagedProducts();
  const categoryInfo = getCategoryBySlug(category, products);

  if (!categoryInfo) {
    return {};
  }
  const categorySeo = getCategorySeoContent(categoryInfo);

  return {
    title: `${categoryInfo.label.tr} Kıbrıs | SPC Panel ve Dekorasyon`,
    description: categorySeo.description,
    alternates: {
      canonical: `/category/${categoryInfo.slug}`,
    },
    openGraph: {
      description: categorySeo.description,
      images: [
        {
          alt: `${categoryInfo.label.tr} Kuzey Kıbrıs`,
          height: 900,
          url: defaultOgImage,
          width: 1600,
        },
      ],
      title: `${categoryInfo.label.tr} Kıbrıs`,
      type: "website",
      url: `/category/${categoryInfo.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const allProducts = await getManagedProducts();
  const categoryInfo = getCategoryBySlug(category, allProducts);

  if (!categoryInfo) {
    notFound();
  }

  const products = allProducts.filter(
    (product) => product.category === categoryInfo.slug,
  );
  const heroProduct = products[0];
  const heroImage =
    heroProduct?.applicationImage ?? "/images/kermit-floor-application.jpg";
  const categorySeo = getCategorySeoContent(categoryInfo);
  const visualSeoImage = getCategoryVisualSeoImage(categoryInfo, heroImage);
  const jsonLd = [
    createBreadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: categoryInfo.label.tr, path: `/category/${categoryInfo.slug}` },
    ]),
    createCollectionPageJsonLd(categoryInfo, products),
    createWebPageImageJsonLd({
      description: categorySeo.description,
      image: visualSeoImage,
      name: `${categoryInfo.label.tr} Kuzey Kıbrıs`,
      path: `/category/${categoryInfo.slug}`,
    }),
  ];

  return (
    <main className="site-shell">
      <script
        dangerouslySetInnerHTML={jsonLdScriptProps(jsonLd)}
        type="application/ld+json"
      />
      <section className="catalog-hero">
        <CatalogHeader />
        <Image
          alt={visualSeoImage.alt}
          fill
          preload
          sizes="100vw"
          src={heroImage}
        />
        <div className="catalog-hero-overlay" />
        <div className="catalog-hero-content">
          <p className="eyebrow">AE Dekorasyon</p>
          <h1>{categoryInfo.label.tr}</h1>
          <p>{categoryInfo.description.tr}</p>
          <p className="image-context-caption">{visualSeoImage.alt}</p>
        </div>
      </section>

      <section className="category-seo-intro">
        <div>
          <p className="eyebrow">Kuzey Kıbrıs dekorasyon</p>
          <h2>{categorySeo.title}</h2>
          <p>{categorySeo.body}</p>
        </div>
        <div className="category-service-tags">
          {categorySeo.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
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
                alt={getProductGalleryImageAlt(product, 0)}
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

      <SiteFooter />
    </main>
  );
}
