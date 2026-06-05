import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CatalogHeader } from "../components/catalog-header";
import { SiteFooter } from "../components/site-footer";
import {
  productCategories,
  products,
  type Product,
  type ProductCategorySlug,
} from "../data/products";

type SearchPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const metadata: Metadata = {
  title: "Search Catalog | Adem Eren Decoration",
  description:
    "Search SPC flooring, wall panels, and decorative panel finishes from Adem Eren Decoration.",
};

const getSingleParam = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] ?? "" : value ?? "";

const normalize = (value: string) =>
  value
    .toLocaleLowerCase("tr")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "");

const toParam = (value: string) =>
  normalize(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const getProductSearchText = (product: Product) =>
  normalize(
    [
      product.code,
      product.name,
      product.categoryLabel.en,
      product.categoryLabel.tr,
      product.collection.en,
      product.collection.tr,
      product.description.en,
      product.description.tr,
      ...product.specs.en,
      ...product.specs.tr,
      ...product.technicalSpecs.flatMap((spec) => [
        spec.label.en,
        spec.label.tr,
        ...(Array.isArray(spec.value) ? spec.value : [spec.value]),
      ]),
    ].join(" "),
  );

const scoreProduct = (product: Product, query: string) => {
  if (!query) {
    return 0;
  }

  const normalizedQuery = normalize(query);
  const normalizedName = normalize(product.name);
  const normalizedCode = normalize(product.code);
  const searchText = getProductSearchText(product);

  let score = 0;

  if (normalizedCode === normalizedQuery) {
    score += 80;
  }

  if (normalizedCode.startsWith(normalizedQuery)) {
    score += 50;
  }

  if (normalizedName.includes(normalizedQuery)) {
    score += 35;
  }

  for (const term of normalizedQuery.split(/\s+/).filter(Boolean)) {
    if (searchText.includes(term)) {
      score += 8;
    }
  }

  return score;
};

const collectionOptions = Array.from(
  new Map(
    products.map((product) => [
      toParam(product.collection.tr),
      {
        label: product.collection.tr,
        value: toParam(product.collection.tr),
      },
    ]),
  ).values(),
);

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = getSingleParam(params.q).trim();
  const category = getSingleParam(params.category) as ProductCategorySlug | "";
  const collection = getSingleParam(params.collection);
  const sort = getSingleParam(params.sort) || "relevance";

  const activeCategory = productCategories.some(
    (item) => item.slug === category,
  )
    ? category
    : "";
  const activeCollection = collectionOptions.some(
    (item) => item.value === collection,
  )
    ? collection
    : "";

  const queryTerms = normalize(query).split(/\s+/).filter(Boolean);
  const filteredProducts = products
    .filter((product) =>
      activeCategory ? product.category === activeCategory : true,
    )
    .filter((product) =>
      activeCollection
        ? toParam(product.collection.tr) === activeCollection
        : true,
    )
    .filter((product) => {
      if (queryTerms.length === 0) {
        return true;
      }

      const searchText = getProductSearchText(product);
      return queryTerms.every((term) => searchText.includes(term));
    })
    .sort((firstProduct, secondProduct) => {
      if (sort === "name") {
        return firstProduct.name.localeCompare(secondProduct.name);
      }

      if (sort === "code") {
        return firstProduct.code.localeCompare(secondProduct.code);
      }

      return (
        scoreProduct(secondProduct, query) - scoreProduct(firstProduct, query)
      );
    });

  const summary =
    filteredProducts.length === 1
      ? "1 result"
      : `${filteredProducts.length} results`;

  return (
    <main className="site-shell search-page">
      <section className="catalog-hero search-hero">
        <CatalogHeader />
        <div className="catalog-hero-overlay" />
        <div className="catalog-hero-content search-hero-content">
          <p className="eyebrow">Product search</p>
          <h1>Search SPC finishes</h1>
          <p>
            Find SPC flooring, wall panels, and decorative panel surfaces by
            code, collection, color name, material, or application detail.
          </p>
        </div>
      </section>

      <section className="catalog-search">
        <form action="/search" className="catalog-search-panel" method="get">
          <div className="catalog-search-field catalog-search-field-wide">
            <label htmlFor="search-query">Search term</label>
            <input
              defaultValue={query}
              id="search-query"
              name="q"
              placeholder="Oak, marble, P-201, 613..."
              type="search"
            />
          </div>

          <div className="catalog-search-field">
            <label htmlFor="search-category">Category</label>
            <select
              defaultValue={activeCategory}
              id="search-category"
              name="category"
            >
              <option value="">All categories</option>
              {productCategories.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.label.tr}
                </option>
              ))}
            </select>
          </div>

          <div className="catalog-search-field">
            <label htmlFor="search-collection">Collection</label>
            <select
              defaultValue={activeCollection}
              id="search-collection"
              name="collection"
            >
              <option value="">All collections</option>
              {collectionOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="catalog-search-field">
            <label htmlFor="search-sort">Sort</label>
            <select defaultValue={sort} id="search-sort" name="sort">
              <option value="relevance">Relevance</option>
              <option value="name">Name</option>
              <option value="code">Code</option>
            </select>
          </div>

          <div className="catalog-search-actions">
            <button type="submit">Search</button>
            <Link href="/search">Clear</Link>
          </div>
        </form>

        <div className="catalog-search-results">
          <div className="catalog-search-summary">
            <div>
              <p className="eyebrow">Catalog results</p>
              <h2>{summary}</h2>
            </div>
            {query ? <span>Keyword: {query}</span> : <span>All products</span>}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="catalog-search-grid">
              {filteredProducts.map((product) => (
                <Link
                  className="catalog-search-card"
                  href={`/products/${product.slug}`}
                  key={product.code}
                >
                  <span className="catalog-search-card-image">
                    <Image
                      alt={`${product.name} ${product.code}`}
                      fill
                      sizes="(max-width: 900px) 50vw, 18vw"
                      src={product.image}
                    />
                  </span>
                  <span className="catalog-search-card-body">
                    <small>{product.code}</small>
                    <strong>{product.name}</strong>
                    <span>{product.collection.tr}</span>
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty-search">
              <h2>No matching products</h2>
              <p>
                Try a product code, collection name, material look, or a broader
                category filter.
              </p>
              <Link href="/search">View all products</Link>
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
