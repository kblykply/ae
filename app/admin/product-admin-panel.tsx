"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { CatalogConnectionStatus } from "../data/catalog-store";
import {
  productCategories,
  type Language,
  type LocalizedText,
  type Product,
  type ProductCategorySlug,
  type ProductSpec,
} from "../data/products";

type ProductCategory = (typeof productCategories)[number];

type AdminPanelProps = {
  catalogStatus: CatalogConnectionStatus;
  categories: ProductCategory[];
  initialProducts: Product[];
};

type SaveStatus = {
  tone: "idle" | "success" | "error";
  text: string;
};

type ProductView = "listing" | "detail";

type UploadResponse = {
  message?: string;
  url?: string;
};

const splitLines = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

const copyLocalized = (value: LocalizedText): LocalizedText => ({
  en: value.en,
  tr: value.tr,
});

const specValueToLines = (value: ProductSpec["value"]) =>
  Array.isArray(value) ? value.join("\n") : value;

const linesToSpecValue = (value: string): ProductSpec["value"] => {
  const lines = splitLines(value);

  if (lines.length > 1) {
    return lines;
  }

  return lines[0] ?? "";
};

const createSlug = (value: string) =>
  value
    .toLocaleLowerCase("tr")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const cleanImageList = (images: string[]) =>
  Array.from(new Set(images.map((image) => image.trim()).filter(Boolean)));

const getProductImages = (product: Product) =>
  cleanImageList([
    product.image,
    product.applicationImage,
    ...(product.galleryImages ?? []),
  ]);

const getEditableGalleryImages = (product: Product) =>
  product.galleryImages?.length > 0
    ? product.galleryImages
    : getProductImages(product);

const getSourceLabel = (source: string) => {
  const sourceLabels: Record<string, string> = {
    file: "dosya",
    "frontend-local": "frontend yerel",
    seed: "başlangıç",
  };

  return sourceLabels[source] ?? source;
};

const createNewProduct = (category: ProductCategory): Product => {
  const stamp = Date.now().toString().slice(-5);
  const image = "/images/kermit-elite-p201.jpg";
  const applicationImage = "/images/kermit-floor-application.jpg";

  return {
    slug: `new-spc-product-${stamp}`,
    code: `AE-${stamp}`,
    name: "Yeni SPC Ürün",
    category: category.slug,
    categoryLabel: copyLocalized(category.label),
    collection: {
      en: category.label.en,
      tr: category.label.tr,
    },
    description: {
      en: "Editable SPC product description.",
      tr: "Düzenlenebilir SPC ürün açıklaması.",
    },
    image,
    applicationImage,
    galleryImages: [image, applicationImage],
    specs: {
      en: ["SPC", "Project finish"],
      tr: ["SPC", "Proje paneli"],
    },
    technicalSpecs: [
      {
        label: { en: "Material", tr: "Materyal" },
        value: "SPC (Stone Polymer Composite)",
      },
    ],
    sourceUrl: category.sourceUrl,
    accent: "#20242f",
  };
};

export function AdminPanel({
  catalogStatus,
  categories,
  initialProducts,
}: AdminPanelProps) {
  const [products, setProducts] = useState(initialProducts);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [busy, setBusy] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<ProductCategorySlug | "">(
    "",
  );
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [listQuery, setListQuery] = useState("");
  const [productView, setProductView] = useState<ProductView>("listing");
  const [uploadingImageKey, setUploadingImageKey] = useState("");
  const [status, setStatus] = useState<SaveStatus>({
    tone: "idle",
    text: "Düzenlemeye hazır",
  });
  const selectedProduct = products[selectedIndex] ?? products[0];
  const selectedCategory = selectedProduct
    ? categories.find((category) => category.slug === selectedProduct.category)
    : undefined;
  const editableGalleryImages = selectedProduct
    ? getEditableGalleryImages(selectedProduct)
    : [];
  const selectedGalleryImages = selectedProduct
    ? getProductImages(selectedProduct)
    : [];
  const selectedMainImage =
    selectedProduct?.image ||
    selectedGalleryImages[0] ||
    "/images/kermit-elite-p201.jpg";
  const selectedHeroImage =
    selectedProduct?.applicationImage ||
    selectedGalleryImages[1] ||
    selectedMainImage;
  const selectedFeatureRows = selectedProduct
    ? Array.from({
        length: Math.max(
          selectedProduct.specs.en.length,
          selectedProduct.specs.tr.length,
          1,
        ),
      }).map((_, index) => ({
        en: selectedProduct.specs.en[index] ?? "",
        tr: selectedProduct.specs.tr[index] ?? "",
      }))
    : [];

  const catalogStats = useMemo(
    () =>
      categories.map((category) => ({
        label: category.label.tr,
        total: products.filter((product) => product.category === category.slug)
          .length,
      })),
    [categories, products],
  );
  const visibleProducts = useMemo(() => {
    const normalizedQuery = listQuery.trim().toLocaleLowerCase("tr");

    return products
      .map((product, index) => ({ index, product }))
      .filter(({ product }) =>
        categoryFilter ? product.category === categoryFilter : true,
      )
      .filter(({ product }) => {
        if (!normalizedQuery) {
          return true;
        }

        return [
          product.code,
          product.name,
          product.collection.en,
          product.collection.tr,
          product.categoryLabel.en,
          product.categoryLabel.tr,
        ]
          .join(" ")
          .toLocaleLowerCase("tr")
          .includes(normalizedQuery);
      });
  }, [categoryFilter, listQuery, products]);
  const hasListFilters = Boolean(categoryFilter || listQuery.trim());

  const clearListFilters = () => {
    setCategoryFilter("");
    setListQuery("");
  };

  const openProductDetail = (index: number) => {
    setSelectedIndex(index);
    setProductView("detail");
  };

  const updateCategoryFilter = (categorySlug: ProductCategorySlug | "") => {
    setCategoryFilter(categorySlug);

    const nextSelectedIndex = products.findIndex((product) =>
      categorySlug ? product.category === categorySlug : true,
    );

    if (nextSelectedIndex >= 0) {
      setSelectedIndex(nextSelectedIndex);
    }
  };

  const updateSelectedProduct = (updater: (product: Product) => Product) => {
    setProducts((currentProducts) =>
      currentProducts.map((product, index) =>
        index === selectedIndex ? updater(product) : product,
      ),
    );
    setHasUnsavedChanges(true);
  };

  const updateField = <Key extends keyof Product>(
    field: Key,
    value: Product[Key],
  ) => {
    updateSelectedProduct((product) => ({
      ...product,
      [field]: value,
    }));
  };

  const updateImageField = (
    field: "image" | "applicationImage",
    value: string,
  ) => {
    updateSelectedProduct((product) => {
      const galleryImages = [...getEditableGalleryImages(product)];
      const galleryIndex = field === "image" ? 0 : 1;

      galleryImages[galleryIndex] = value;

      return {
        ...product,
        [field]: value,
        galleryImages,
      };
    });
  };

  const updateGalleryImage = (imageIndex: number, value: string) => {
    updateSelectedProduct((product) => {
      const galleryImages = [...getEditableGalleryImages(product)];

      galleryImages[imageIndex] = value;

      return {
        ...product,
        image: imageIndex === 0 ? value : product.image,
        applicationImage: imageIndex === 1 ? value : product.applicationImage,
        galleryImages,
      };
    });
  };

  const appendGalleryImage = (value: string) => {
    updateSelectedProduct((product) => ({
      ...product,
      galleryImages: [...getEditableGalleryImages(product), value],
    }));
  };

  const uploadProductImage = async (
    file: File | null,
    applyUploadedUrl: (url: string) => void,
    imageKey: string,
  ) => {
    if (!file) {
      return;
    }

    setUploadingImageKey(imageKey);
    setStatus({ tone: "idle", text: "Görsel yükleniyor..." });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/uploads", {
        body: formData,
        method: "POST",
      });
      const body = (await response.json()) as UploadResponse;

      if (!response.ok || !body.url) {
        throw new Error(body.message || "Görsel yüklenemedi.");
      }

      applyUploadedUrl(body.url);
      setStatus({ tone: "success", text: "Görsel yüklendi" });
    } catch (error) {
      const uploadError = error as Error;
      setStatus({
        tone: "error",
        text: uploadError.message || "Görsel yüklenemedi.",
      });
    } finally {
      setUploadingImageKey("");
    }
  };

  const removeGalleryImage = (imageIndex: number) => {
    updateSelectedProduct((product) => {
      const galleryImages = getEditableGalleryImages(product).filter(
        (_, index) => index !== imageIndex,
      );
      const cleanGalleryImages = cleanImageList(galleryImages);

      return {
        ...product,
        image: imageIndex === 0
          ? cleanGalleryImages[0] ?? product.image
          : product.image,
        applicationImage: imageIndex <= 1
          ? cleanGalleryImages[1] ?? product.applicationImage
          : product.applicationImage,
        galleryImages,
      };
    });
  };

  const updateLocalizedField = (
    field: "collection" | "description" | "categoryLabel",
    language: Language,
    value: string,
  ) => {
    updateSelectedProduct((product) => ({
      ...product,
      [field]: {
        ...product[field],
        [language]: value,
      },
    }));
  };

  const updateFeature = (
    language: Language,
    featureIndex: number,
    value: string,
  ) => {
    updateSelectedProduct((product) => {
      const nextFeatures = [...product.specs[language]];

      nextFeatures[featureIndex] = value;

      return {
        ...product,
        specs: {
          ...product.specs,
          [language]: nextFeatures,
        },
      };
    });
  };

  const addFeatureRow = () => {
    updateSelectedProduct((product) => ({
      ...product,
      specs: {
        en: [...product.specs.en, ""],
        tr: [...product.specs.tr, ""],
      },
    }));
  };

  const removeFeatureRow = (featureIndex: number) => {
    updateSelectedProduct((product) => ({
      ...product,
      specs: {
        en: product.specs.en.filter((_, index) => index !== featureIndex),
        tr: product.specs.tr.filter((_, index) => index !== featureIndex),
      },
    }));
  };

  const updateTechnicalSpecLabel = (
    specIndex: number,
    language: Language,
    value: string,
  ) => {
    updateSelectedProduct((product) => ({
      ...product,
      technicalSpecs: product.technicalSpecs.map((spec, index) =>
        index === specIndex
          ? {
              ...spec,
              label: {
                ...spec.label,
                [language]: value,
              },
            }
          : spec,
      ),
    }));
  };

  const updateTechnicalSpecValue = (specIndex: number, value: string) => {
    updateSelectedProduct((product) => ({
      ...product,
      technicalSpecs: product.technicalSpecs.map((spec, index) =>
        index === specIndex
          ? {
              ...spec,
              value: linesToSpecValue(value),
            }
          : spec,
      ),
    }));
  };

  const addTechnicalSpec = () => {
    updateSelectedProduct((product) => ({
      ...product,
      technicalSpecs: [
        ...product.technicalSpecs,
        {
          label: { en: "Detail", tr: "Detay" },
          value: "",
        },
      ],
    }));
  };

  const removeTechnicalSpec = (specIndex: number) => {
    updateSelectedProduct((product) => ({
      ...product,
      technicalSpecs: product.technicalSpecs.filter(
        (_, index) => index !== specIndex,
      ),
    }));
  };

  const updateCategory = (categorySlug: ProductCategorySlug) => {
    const nextCategory =
      categories.find((category) => category.slug === categorySlug) ??
      categories[0];

    updateSelectedProduct((product) => ({
      ...product,
      category: nextCategory.slug,
      categoryLabel: copyLocalized(nextCategory.label),
      collection: copyLocalized(nextCategory.label),
      sourceUrl: nextCategory.sourceUrl,
    }));
  };

  const addProduct = () => {
    setProducts((currentProducts) => [
      createNewProduct(categories[0]),
      ...currentProducts,
    ]);
    setSelectedIndex(0);
    setProductView("detail");
    setHasUnsavedChanges(true);
    setStatus({ tone: "idle", text: "Yeni ürün taslağı eklendi" });
  };

  const duplicateProduct = () => {
    if (!selectedProduct) {
      return;
    }

    const duplicate = {
      ...selectedProduct,
      code: `${selectedProduct.code}-COPY`,
      name: `${selectedProduct.name} Kopya`,
      slug: createSlug(`${selectedProduct.slug} copy`),
    };

    setProducts((currentProducts) => [
      ...currentProducts.slice(0, selectedIndex + 1),
      duplicate,
      ...currentProducts.slice(selectedIndex + 1),
    ]);
    setSelectedIndex(selectedIndex + 1);
    setProductView("detail");
    setHasUnsavedChanges(true);
    setStatus({ tone: "idle", text: "Ürün kopyalandı" });
  };

  const deleteProduct = () => {
    if (!selectedProduct) {
      return;
    }

    const confirmed = window.confirm(`${selectedProduct.code} silinsin mi?`);

    if (!confirmed) {
      return;
    }

    setProducts((currentProducts) =>
      currentProducts.filter((_, index) => index !== selectedIndex),
    );
    setSelectedIndex(Math.max(0, selectedIndex - 1));
    setProductView("listing");
    setHasUnsavedChanges(true);
    setStatus({ tone: "idle", text: "Ürün taslaktan kaldırıldı" });
  };

  const exportProducts = () => {
    const blob = new Blob([`${JSON.stringify(products, null, 2)}\n`], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "adem-eren-catalog-products.json";
    link.click();
    URL.revokeObjectURL(url);
    setStatus({ tone: "success", text: "Katalog dışa aktarıldı" });
  };

  const importProducts = async (file: File | null) => {
    if (!file) {
      return;
    }

    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as unknown;
      const importedProducts = Array.isArray(parsed)
        ? parsed
        : (parsed as { products?: unknown }).products;

      if (!Array.isArray(importedProducts)) {
        throw new Error("İçe aktarım dosyası ürün listesi içermeli.");
      }

      setProducts(importedProducts as Product[]);
      setSelectedIndex(0);
      setProductView("listing");
      setHasUnsavedChanges(true);
      setStatus({
        tone: "success",
        text: "Katalog içe aktarıldı. Kontrol edip kaydedin.",
      });
    } catch (error) {
      const importError = error as Error;
      setStatus({
        tone: "error",
        text: importError.message || "Katalog içe aktarılamadı.",
      });
    }
  };

  const saveProducts = async () => {
    setBusy(true);
    setStatus({ tone: "idle", text: "Katalog kaydediliyor..." });

    try {
      const response = await fetch("/api/admin/catalog", {
        body: JSON.stringify({ products }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      });
      const body = (await response.json()) as {
        message?: string;
        products?: Product[];
      };

      if (!response.ok || !body.products) {
        throw new Error(body.message || "Katalog kaydedilemedi.");
      }

      setProducts(body.products);
      setSelectedIndex(Math.min(selectedIndex, body.products.length - 1));
      setHasUnsavedChanges(false);
      setStatus({ tone: "success", text: "Katalog kaydedildi" });
    } catch (error) {
      const saveError = error as Error;
      setStatus({
        tone: "error",
        text: saveError.message || "Katalog kaydedilemedi.",
      });
    } finally {
      setBusy(false);
    }
  };

  const resetProducts = async () => {
    const confirmed = window.confirm("Katalog başlangıç listesine sıfırlansın mı?");

    if (!confirmed) {
      return;
    }

    setBusy(true);
    setStatus({ tone: "idle", text: "Katalog sıfırlanıyor..." });

    try {
      const response = await fetch("/api/admin/catalog", {
        body: JSON.stringify({ action: "reset" }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const body = (await response.json()) as {
        message?: string;
        products?: Product[];
      };

      if (!response.ok || !body.products) {
        throw new Error(body.message || "Katalog sıfırlanamadı.");
      }

      setProducts(body.products);
      setSelectedIndex(0);
      setProductView("listing");
      setHasUnsavedChanges(false);
      setStatus({ tone: "success", text: "Katalog sıfırlandı" });
    } catch (error) {
      const resetError = error as Error;
      setStatus({
        tone: "error",
        text: resetError.message || "Katalog sıfırlanamadı.",
      });
    } finally {
      setBusy(false);
    }
  };

  if (!selectedProduct) {
    return (
      <section className="admin-empty-state">
        <h2>Henüz ürün yok</h2>
        <button onClick={addProduct} type="button">
          İlk ürünü ekle
        </button>
      </section>
    );
  }

  return (
    <section className="admin-panel admin-catalog-panel">
      <div className="admin-catalog-shell">
        <div className={`admin-status admin-catalog-status is-${status.tone}`}>
          <span>{status.text}</span>
          <strong>
            {hasUnsavedChanges ? "Kaydedilmemiş değişiklikler" : "Kaydedildi"} ·{" "}
            {products.length} ürün
          </strong>
        </div>

        <section className="admin-catalog-controls">
        <div className="admin-stat-grid">
          <article className={catalogStatus.ok ? "is-online" : "is-offline"}>
            <span>{catalogStatus.mode === "backend" ? "API" : "Yerel"}</span>
            <p>{catalogStatus.ok ? "Katalog aktif" : "Kontrol gerekli"}</p>
          </article>
          <article>
            <span>{products.length}</span>
            <p>Toplam ürün</p>
          </article>
          {catalogStats.map((item) => (
            <article key={item.label}>
              <span>{item.total}</span>
              <p>{item.label}</p>
            </article>
          ))}
        </div>

        <div className="admin-connection-card">
          <strong>{catalogStatus.message}</strong>
          <span>
            {catalogStatus.backendUrl ?? "BACKEND_URL ayarlanmadı"}
          </span>
          {catalogStatus.catalog ? (
            <small>
              {catalogStatus.catalog.productCount} ürün ·{" "}
              {getSourceLabel(catalogStatus.catalog.source)}
            </small>
          ) : null}
        </div>

        <div className="admin-toolbar">
          <button onClick={addProduct} type="button">
            Ekle
          </button>
          <button onClick={duplicateProduct} type="button">
            Kopyala
          </button>
          <button onClick={deleteProduct} type="button">
            Sil
          </button>
          <button onClick={exportProducts} type="button">
            JSON dışa aktar
          </button>
          <label className="admin-import-button">
            JSON içe aktar
            <input
              accept="application/json"
              onChange={(event) => {
                void importProducts(event.target.files?.[0] ?? null);
                event.target.value = "";
              }}
              type="file"
            />
          </label>
          <button disabled={busy} onClick={saveProducts} type="button">
            {busy ? "Kaydediliyor..." : "Kataloğu kaydet"}
          </button>
          <button disabled={busy} onClick={resetProducts} type="button">
            Sıfırla
          </button>
        </div>

        <div className="admin-list-filters">
          <label>
            Ürün ara
            <input
              onChange={(event) => setListQuery(event.target.value)}
              placeholder="Kod, isim, koleksiyon..."
              value={listQuery}
            />
          </label>
          <label>
            Kategori
            <select
              onChange={(event) =>
                updateCategoryFilter(event.target.value as ProductCategorySlug | "")
              }
              value={categoryFilter}
            >
              <option value="">Tüm kategoriler</option>
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.label.tr}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="admin-list-meta">
          <div>
            <strong>Ürün listesi</strong>
            <span>
              {visibleProducts.length} ürün gösteriliyor · toplam {products.length}
            </span>
          </div>
          {hasListFilters ? (
            <button onClick={clearListFilters} type="button">
              Filtreleri temizle
            </button>
          ) : null}
        </div>

        </section>

        {productView === "listing" ? (
          <section
            className="admin-product-catalog-view"
            aria-label="Düzenlenebilir ürün kataloğu"
          >
            {visibleProducts.length > 0 ? (
              visibleProducts.map(({ product, index }) => {
                const productImages = getProductImages(product);
                const cardImage =
                  product.image ||
                  productImages[0] ||
                  "/images/kermit-elite-p201.jpg";

                return (
                  <button
                    className="category-product-card admin-catalog-card"
                    key={`${product.slug}-${index}`}
                    onClick={() => openProductDetail(index)}
                    type="button"
                  >
                    <span className="category-product-image">
                      <Image
                        alt={`${product.name} ${product.code}`}
                        fill
                        sizes="(max-width: 900px) 50vw, 22vw"
                        src={cardImage}
                      />
                    </span>
                    <span className="category-product-body">
                      <small>{product.code}</small>
                      <strong>{product.name}</strong>
                      <span>{product.description.tr}</span>
                      <span className="admin-card-action">Detayı düzenle</span>
                    </span>
                  </button>
                );
              })
            ) : (
              <p className="admin-list-empty">Bu filtreyle eşleşen ürün yok.</p>
            )}
          </section>
        ) : (
          <section className="admin-product-edit-page">
            <header className="admin-detail-topbar">
              <button
                className="admin-detail-back-button"
                onClick={() => setProductView("listing")}
                type="button"
              >
                Ürün listesine dön
              </button>
              <div>
                <span>Düzenlenen ürün</span>
                <strong>
                  {selectedProduct.code} · {selectedProduct.name}
                </strong>
              </div>
              <div className="admin-detail-actions">
                <a
                  href={`/products/${selectedProduct.slug}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  Canlı önizleme
                </a>
                <button
                  className="admin-detail-save-button"
                  disabled={busy || !hasUnsavedChanges}
                  onClick={saveProducts}
                  type="button"
                >
                  {busy
                    ? "Kaydediliyor..."
                    : hasUnsavedChanges
                      ? "Değişiklikleri kaydet"
                      : "Kaydedildi"}
                </button>
              </div>
            </header>

            <section className="admin-live-product-editor">
              <div className="admin-live-media">
                <div className="admin-live-hero-image">
                  <Image
                    alt={`${selectedProduct.name} uygulama görseli`}
                    fill
                    priority
                    sizes="(max-width: 900px) 100vw, 46vw"
                    src={selectedHeroImage}
                  />
                  <div className="catalog-hero-overlay" />
                  <div>
                    <p className="eyebrow">
                      {selectedCategory?.label.tr ?? selectedProduct.categoryLabel.tr}
                    </p>
                    <h1>{selectedProduct.name}</h1>
                    <span>{selectedProduct.code}</span>
                  </div>
                </div>

                <div className="admin-upload-module">
                  <span>Hero görsel</span>
                  <label className="admin-upload-button">
                    {uploadingImageKey === "hero"
                      ? "Yükleniyor..."
                      : "Bilgisayardan seç"}
                    <input
                      accept="image/*"
                      onChange={(event) => {
                        void uploadProductImage(
                          event.target.files?.[0] ?? null,
                          (url) => updateImageField("applicationImage", url),
                          "hero",
                        );
                        event.target.value = "";
                      }}
                      type="file"
                    />
                  </label>
                  <small>{selectedProduct.applicationImage}</small>
                </div>

                <div className="admin-live-main-image">
                  <Image
                    alt={`${selectedProduct.name} ${selectedProduct.code}`}
                    fill
                    sizes="(max-width: 900px) 100vw, 28vw"
                    src={selectedMainImage}
                  />
                </div>

                <div className="admin-upload-module">
                  <span>Ürün görseli</span>
                  <label className="admin-upload-button">
                    {uploadingImageKey === "main"
                      ? "Yükleniyor..."
                      : "Bilgisayardan seç"}
                    <input
                      accept="image/*"
                      onChange={(event) => {
                        void uploadProductImage(
                          event.target.files?.[0] ?? null,
                          (url) => updateImageField("image", url),
                          "main",
                        );
                        event.target.value = "";
                      }}
                      type="file"
                    />
                  </label>
                  <small>{selectedProduct.image}</small>
                </div>

                <div
                  className="admin-live-gallery"
                  aria-label="Ürün görsel galerisi"
                >
                  {selectedGalleryImages.map((image, imageIndex) => (
                    <span key={`${image}-${imageIndex}`}>
                      <Image
                        alt={`${selectedProduct.name} galeri ${imageIndex + 1}`}
                        fill
                        sizes="(max-width: 900px) 33vw, 9vw"
                        src={image}
                      />
                    </span>
                  ))}
                  <label className="admin-gallery-upload-card">
                    {uploadingImageKey === "gallery-new"
                      ? "Yükleniyor..."
                      : "Görsel yükle"}
                    <input
                      accept="image/*"
                      onChange={(event) => {
                        void uploadProductImage(
                          event.target.files?.[0] ?? null,
                          appendGalleryImage,
                          "gallery-new",
                        );
                        event.target.value = "";
                      }}
                      type="file"
                    />
                  </label>
                </div>
              </div>

              <article className="admin-live-fields">
                <label className="admin-product-picker admin-inline-picker">
                  <span>Düzenlenecek ürün</span>
                  <select
                    onChange={(event) => setSelectedIndex(Number(event.target.value))}
                    value={selectedIndex}
                  >
                    {products.map((product, index) => (
                      <option key={`${product.slug}-${index}`} value={index}>
                        {product.code} · {product.name} · {product.categoryLabel.tr}
                      </option>
                    ))}
                  </select>
                  <small>
                    {selectedIndex + 1}. ürün seçili · toplam {products.length} ürün
                  </small>
                </label>

                <div className="admin-editor-links">
                  <a
                    href={`/products/${selectedProduct.slug}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Canlı önizleme
                  </a>
                  <a
                    href={`/category/${selectedProduct.category}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Kategori önizleme
                  </a>
                </div>

                <div className="admin-inline-field-grid">
                  <label>
                    Ürün kodu
                    <input
                      onChange={(event) => updateField("code", event.target.value)}
                      value={selectedProduct.code}
                    />
                  </label>
                  <label>
                    Ürün adı
                    <input
                      onChange={(event) => {
                        updateField("name", event.target.value);
                        updateField(
                          "slug",
                          createSlug(`${selectedProduct.code} ${event.target.value}`),
                        );
                      }}
                      value={selectedProduct.name}
                    />
                  </label>
                  <label>
                    Kategori
                    <select
                      onChange={(event) =>
                        updateCategory(event.target.value as ProductCategorySlug)
                      }
                      value={selectedProduct.category}
                    >
                      {categories.map((category) => (
                        <option key={category.slug} value={category.slug}>
                          {category.label.tr}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Vurgu rengi
                    <input
                      onChange={(event) => updateField("accent", event.target.value)}
                      type="color"
                      value={
                        selectedProduct.accent.startsWith("#")
                          ? selectedProduct.accent
                          : "#20242f"
                      }
                    />
                  </label>
                </div>

                <label className="admin-live-wide-field">
                  URL bağlantısı
                  <input
                    onChange={(event) =>
                      updateField("slug", createSlug(event.target.value))
                    }
                    value={selectedProduct.slug}
                  />
                </label>

                <label className="admin-live-wide-field">
                  Koleksiyon
                  <input
                    onChange={(event) =>
                      updateLocalizedField("collection", "tr", event.target.value)
                    }
                    value={selectedProduct.collection.tr}
                  />
                </label>

                <label className="admin-live-wide-field">
                  Açıklama
                  <textarea
                    onChange={(event) =>
                      updateLocalizedField("description", "tr", event.target.value)
                    }
                    rows={4}
                    value={selectedProduct.description.tr}
                  />
                </label>

                <label className="admin-live-wide-field">
                  Kaynak URL
                  <input
                    onChange={(event) => updateField("sourceUrl", event.target.value)}
                    value={selectedProduct.sourceUrl}
                  />
                </label>

                <details className="admin-language-details">
                  <summary>İngilizce alanlar</summary>
                  <div>
                    <label>
                      Koleksiyon EN
                      <input
                        onChange={(event) =>
                          updateLocalizedField("collection", "en", event.target.value)
                        }
                        value={selectedProduct.collection.en}
                      />
                    </label>
                    <label>
                      Açıklama EN
                      <textarea
                        onChange={(event) =>
                          updateLocalizedField("description", "en", event.target.value)
                        }
                        rows={3}
                        value={selectedProduct.description.en}
                      />
                    </label>
                  </div>
                </details>
              </article>
            </section>

            <section className="admin-edit-support-grid">
              <section className="admin-image-editor">
                <div className="admin-section-title compact">
                  <h2>Ürün görselleri</h2>
                  <p>Galeri görselleri</p>
                </div>

                <div className="admin-image-list">
                  {editableGalleryImages.map((image, imageIndex) => (
                    <article className="admin-image-row" key={imageIndex}>
                      <span>
                        {image.trim() ? (
                          <Image
                            alt={`${selectedProduct.name} görsel ${imageIndex + 1}`}
                            fill
                            sizes="7rem"
                            src={image.trim()}
                          />
                        ) : null}
                      </span>
                      <div className="admin-image-row-body">
                        <strong>Görsel {imageIndex + 1}</strong>
                        <small>{image || "Görsel seçilmedi"}</small>
                        <div className="admin-image-row-actions">
                          <label className="admin-upload-button">
                            {uploadingImageKey === `gallery-${imageIndex}`
                              ? "Yükleniyor..."
                              : "Dosya seç"}
                            <input
                              accept="image/*"
                              onChange={(event) => {
                                void uploadProductImage(
                                  event.target.files?.[0] ?? null,
                                  (url) => updateGalleryImage(imageIndex, url),
                                  `gallery-${imageIndex}`,
                                );
                                event.target.value = "";
                              }}
                              type="file"
                            />
                          </label>
                          <button
                            disabled={editableGalleryImages.length <= 1}
                            onClick={() => removeGalleryImage(imageIndex)}
                            type="button"
                          >
                            Sil
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <label className="admin-add-image-button admin-upload-wide">
                  {uploadingImageKey === "gallery-extra"
                    ? "Yükleniyor..."
                    : "Yeni görsel yükle"}
                  <input
                    accept="image/*"
                    onChange={(event) => {
                      void uploadProductImage(
                        event.target.files?.[0] ?? null,
                        appendGalleryImage,
                        "gallery-extra",
                      );
                      event.target.value = "";
                    }}
                    type="file"
                  />
                </label>
              </section>

              <section className="admin-feature-editor">
                <div className="admin-section-title compact">
                  <h2>Kısa özellikler</h2>
                  <p>Ürün kartı etiketleri</p>
                </div>

                <div className="admin-feature-rows">
                  {selectedFeatureRows.map((feature, featureIndex) => (
                    <article className="admin-feature-row" key={featureIndex}>
                      <label>
                        Özellik TR
                        <input
                          onChange={(event) =>
                            updateFeature("tr", featureIndex, event.target.value)
                          }
                          value={feature.tr}
                        />
                      </label>
                      <label>
                        Özellik EN
                        <input
                          onChange={(event) =>
                            updateFeature("en", featureIndex, event.target.value)
                          }
                          value={feature.en}
                        />
                      </label>
                      <button
                        disabled={selectedFeatureRows.length <= 1}
                        onClick={() => removeFeatureRow(featureIndex)}
                        type="button"
                      >
                        Sil
                      </button>
                    </article>
                  ))}
                </div>

                <button
                  className="admin-add-image-button"
                  onClick={addFeatureRow}
                  type="button"
                >
                  Özellik ekle
                </button>
              </section>
            </section>

            <section className="admin-spec-editor">
              <div className="admin-section-title compact">
                <h2>Teknik özellikler</h2>
                <p>Detay sayfası özellikleri</p>
              </div>

              <div className="admin-spec-rows">
                {selectedProduct.technicalSpecs.map((spec, specIndex) => (
                  <article className="admin-spec-row" key={specIndex}>
                    <label>
                      Başlık TR
                      <input
                        onChange={(event) =>
                          updateTechnicalSpecLabel(
                            specIndex,
                            "tr",
                            event.target.value,
                          )
                        }
                        value={spec.label.tr}
                      />
                    </label>
                    <label>
                      Başlık EN
                      <input
                        onChange={(event) =>
                          updateTechnicalSpecLabel(
                            specIndex,
                            "en",
                            event.target.value,
                          )
                        }
                        value={spec.label.en}
                      />
                    </label>
                    <label className="admin-spec-value-field">
                      Değerler
                      <textarea
                        onChange={(event) =>
                          updateTechnicalSpecValue(specIndex, event.target.value)
                        }
                        rows={Array.isArray(spec.value) ? Math.max(2, spec.value.length) : 2}
                        value={specValueToLines(spec.value)}
                      />
                    </label>
                    <button
                      disabled={selectedProduct.technicalSpecs.length <= 1}
                      onClick={() => removeTechnicalSpec(specIndex)}
                      type="button"
                    >
                      Sil
                    </button>
                  </article>
                ))}
              </div>

              <button
                className="admin-add-image-button"
                onClick={addTechnicalSpec}
                type="button"
              >
                Teknik özellik ekle
              </button>
            </section>
          </section>
        )}
      </div>
    </section>
  );
}
