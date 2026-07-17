import { promises as fs } from "node:fs";
import path from "node:path";
import {
  productCategories,
  products as seedProducts,
  type Language,
  type LocalizedText,
  type Product,
  type ProductCategorySlug,
  type ProductSpec,
} from "./products";

const catalogFilePath = path.join(process.cwd(), "data", "catalog-products.json");

const backendBaseUrl = (process.env.BACKEND_URL ?? "").replace(/\/$/, "");
const backendAdminToken =
  process.env.BACKEND_ADMIN_TOKEN ??
  process.env.ADMIN_PASSWORD ??
  "";

const getBackendEndpoint = (pathname: string) =>
  backendBaseUrl ? `${backendBaseUrl}${pathname}` : "";

export type CatalogConnectionStatus = {
  backendUrl: string | null;
  catalog?: {
    lastUpdated: string | null;
    productCount: number;
    source: string;
  };
  message: string;
  mode: "backend" | "local";
  ok: boolean;
};

export const createProductSlug = (value: string) =>
  value
    .toLocaleLowerCase("tr")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const toProductCategorySlug = (
  value: unknown,
  fallback: ProductCategorySlug,
): ProductCategorySlug => createProductSlug(toText(value)) || fallback;

const toCategoryFallbackLabel = (slug: string): LocalizedText => {
  const label = slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toLocaleUpperCase("tr") + part.slice(1))
    .join(" ");

  return {
    en: label || "New Category",
    tr: label || "Yeni Kategori",
  };
};

const toText = (value: unknown, fallback = "") =>
  typeof value === "string" ? value.trim() : fallback;

const toLocalizedText = (
  value: unknown,
  fallback: LocalizedText,
): LocalizedText => {
  const candidate = value as Partial<Record<Language, unknown>> | undefined;

  return {
    en: toText(candidate?.en, fallback.en),
    tr: toText(candidate?.tr, fallback.tr),
  };
};

const toTextList = (value: unknown) => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => toText(item))
    .filter(Boolean);
};

const toUniqueTextList = (items: string[]) => Array.from(new Set(items));

const toSpecValue = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.map((item) => toText(item)).filter(Boolean);
  }

  return toText(value);
};

const toTechnicalSpecs = (
  value: unknown,
  fallback: ProductSpec[],
): ProductSpec[] => {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const specs = value
    .map((item) => {
      const candidate = item as Partial<ProductSpec> | undefined;
      const fallbackLabel = { en: "Detail", tr: "Detay" };
      const label = toLocalizedText(candidate?.label, fallbackLabel);
      const specValue = toSpecValue(candidate?.value);

      if (!label.en && !label.tr) {
        return null;
      }

      return {
        label,
        value: Array.isArray(specValue) && specValue.length === 1
          ? specValue[0]
          : specValue,
      };
    })
    .filter(Boolean);

  return specs.length > 0 ? (specs as ProductSpec[]) : fallback;
};

const normalizeProduct = (
  value: unknown,
  index: number,
  usedSlugs: Map<string, number>,
): Product => {
  const candidate = value as Partial<Product> | undefined;
  const fallback = seedProducts[index] ?? seedProducts[0];
  const category = toProductCategorySlug(candidate?.category, fallback.category);
  const categoryInfo =
    productCategories.find((item) => item.slug === category);
  const categoryLabelFallback =
    categoryInfo?.label ?? toCategoryFallbackLabel(category);
  const code = toText(candidate?.code, fallback.code || `AE-${index + 1}`);
  const name = toText(candidate?.name, fallback.name || code);
  const baseSlug =
    createProductSlug(toText(candidate?.slug)) ||
    createProductSlug(`${code} ${name}`) ||
    `product-${index + 1}`;
  const slugUseCount = usedSlugs.get(baseSlug) ?? 0;
  const slug = slugUseCount === 0 ? baseSlug : `${baseSlug}-${slugUseCount + 1}`;

  usedSlugs.set(baseSlug, slugUseCount + 1);

  const image = toText(candidate?.image, fallback.image);
  const applicationImage = toText(
    candidate?.applicationImage,
    fallback.applicationImage,
  );
  const fallbackGalleryImages = fallback.galleryImages?.length
    ? fallback.galleryImages
    : [fallback.image, fallback.applicationImage].filter(Boolean);
  const galleryImages = toUniqueTextList([
    image,
    applicationImage,
    ...(toTextList(candidate?.galleryImages).length
      ? toTextList(candidate?.galleryImages)
      : fallbackGalleryImages),
  ].filter(Boolean));

  return {
    slug,
    code,
    name,
    category,
    categoryLabel: toLocalizedText(candidate?.categoryLabel, categoryLabelFallback),
    collection: toLocalizedText(
      candidate?.collection,
      categoryInfo?.label ?? fallback.collection,
    ),
    description: toLocalizedText(candidate?.description, fallback.description),
    image,
    applicationImage,
    galleryImages,
    specs: {
      en: toTextList(candidate?.specs?.en).length
        ? toTextList(candidate?.specs?.en)
        : fallback.specs.en,
      tr: toTextList(candidate?.specs?.tr).length
        ? toTextList(candidate?.specs?.tr)
        : fallback.specs.tr,
    },
    technicalSpecs: toTechnicalSpecs(
      candidate?.technicalSpecs,
      fallback.technicalSpecs,
    ),
    sourceUrl: toText(
      candidate?.sourceUrl,
      categoryInfo?.sourceUrl ?? fallback.sourceUrl,
    ),
    accent: toText(candidate?.accent, fallback.accent || "#20242f"),
  };
};

export const normalizeProducts = (value: unknown): Product[] => {
  const usedSlugs = new Map<string, number>();
  const sourceProducts = Array.isArray(value) && value.length > 0
    ? value
    : seedProducts;

  return sourceProducts.map((product, index) =>
    normalizeProduct(product, index, usedSlugs),
  );
};

async function getBackendProducts() {
  const endpoint = getBackendEndpoint("/api/products");

  if (!endpoint) {
    return null;
  }

  try {
    const response = await fetch(endpoint, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Sunucu ${response.status} döndürdü`);
    }

    const payload = (await response.json()) as { products?: unknown };

    return normalizeProducts(payload.products);
  } catch (error) {
    const backendError = error as Error;
    console.warn("Yerel kataloğa geçiliyor:", backendError.message);

    return null;
  }
}

export async function getManagedProducts() {
  const backendProducts = await getBackendProducts();

  if (backendProducts) {
    return backendProducts;
  }

  try {
    const catalog = await fs.readFile(catalogFilePath, "utf8");
    const parsed = JSON.parse(catalog) as unknown;

    return normalizeProducts(parsed);
  } catch (error) {
    const fileError = error as NodeJS.ErrnoException;

    if (fileError.code !== "ENOENT") {
      console.warn("Başlangıç kataloğuna geçiliyor:", fileError.message);
    }

    return seedProducts;
  }
}

export async function getCatalogConnectionStatus(): Promise<CatalogConnectionStatus> {
  const statusEndpoint = getBackendEndpoint("/api/status");

  if (statusEndpoint) {
    try {
      const response = await fetch(statusEndpoint, {
        cache: "no-store",
      });
      const payload = (await response.json()) as {
        catalog?: CatalogConnectionStatus["catalog"];
        message?: string;
        ok?: boolean;
      };

      return {
        backendUrl: backendBaseUrl,
        catalog: payload.catalog,
        message: response.ok
          ? "Sunucu katalog API bağlantısı aktif"
          : payload.message || `Sunucu ${response.status} döndürdü`,
        mode: "backend",
        ok: response.ok && payload.ok !== false,
      };
    } catch (error) {
      const statusError = error as Error;

      return {
        backendUrl: backendBaseUrl,
        message: statusError.message || "Sunucu erişilebilir değil",
        mode: "backend",
        ok: false,
      };
    }
  }

  const products = await getManagedProducts();

  return {
    backendUrl: null,
    catalog: {
      lastUpdated: null,
      productCount: products.length,
      source: "frontend-local",
    },
    message: "Frontend yerel katalog yedeği kullanılıyor",
    mode: "local",
    ok: true,
  };
}

export async function saveManagedProducts(products: Product[]) {
  const normalizedProducts = normalizeProducts(products);
  const endpoint = getBackendEndpoint("/api/products");

  if (endpoint) {
    const response = await fetch(endpoint, {
      body: JSON.stringify({ products: normalizedProducts }),
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": backendAdminToken,
      },
      method: "PUT",
    });
    const payload = (await response.json()) as {
      message?: string;
      products?: unknown;
    };

    if (!response.ok) {
      throw new Error(payload.message || `Sunucu ${response.status} döndürdü`);
    }

    return normalizeProducts(payload.products);
  }

  await fs.mkdir(path.dirname(catalogFilePath), { recursive: true });
  await fs.writeFile(
    catalogFilePath,
    `${JSON.stringify(normalizedProducts, null, 2)}\n`,
    "utf8",
  );

  return normalizedProducts;
}

export async function resetManagedProducts() {
  const endpoint = getBackendEndpoint("/api/products/reset");

  if (endpoint) {
    const response = await fetch(endpoint, {
      body: JSON.stringify({ action: "reset" }),
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": backendAdminToken,
      },
      method: "POST",
    });
    const payload = (await response.json()) as {
      message?: string;
      products?: unknown;
    };

    if (!response.ok) {
      throw new Error(payload.message || `Sunucu ${response.status} döndürdü`);
    }

    return normalizeProducts(payload.products);
  }

  await fs.mkdir(path.dirname(catalogFilePath), { recursive: true });
  await fs.writeFile(
    catalogFilePath,
    `${JSON.stringify(seedProducts, null, 2)}\n`,
    "utf8",
  );

  return seedProducts;
}

export async function getManagedProductsByCategory(
  category: ProductCategorySlug,
) {
  const products = await getManagedProducts();

  return products.filter((product) => product.category === category);
}

export async function getManagedProductBySlug(slug: string) {
  const products = await getManagedProducts();

  return products.find((product) => product.slug === slug);
}

export async function getManagedRelatedProducts(product: Product) {
  const products = await getManagedProductsByCategory(product.category);

  return products
    .filter((item) => item.slug !== product.slug)
    .slice(0, 4);
}
