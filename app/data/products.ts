export type Language = "en" | "tr";

export type ProductCategorySlug = string;

export type LocalizedText = Record<Language, string>;

export type ProductSpec = {
  label: LocalizedText;
  value: string | string[];
};

export type Product = {
  slug: string;
  code: string;
  name: string;
  category: ProductCategorySlug;
  categoryLabel: LocalizedText;
  collection: LocalizedText;
  description: LocalizedText;
  image: string;
  applicationImage: string;
  galleryImages: string[];
  specs: Record<Language, string[]>;
  technicalSpecs: ProductSpec[];
  sourceUrl: string;
  accent: string;
};

export type ProductCategory = {
  description: LocalizedText;
  label: LocalizedText;
  shortLabel: LocalizedText;
  slug: ProductCategorySlug;
  sourceUrl: string;
};

const kermitImage = (path: string) => `https://kermitfloor.com${path}`;

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const accents = ["#ff5b3b", "#3553ff", "#12b86d", "#20242f"];

const floorSource = "https://kermitfloor.com/tr/spc-parke-elit-koleksiyonu";
const wallSource = "https://kermitfloor.com/tr/spc-duvar-panelleri";

const floorSpecs: ProductSpec[] = [
  { label: { en: "Thickness", tr: "Kalınlık" }, value: "5 mm / 6 mm / 7 mm" },
  { label: { en: "Wear layer", tr: "Aşınma tabakası" }, value: "0,30 mm / 0,50 mm" },
  { label: { en: "IXPE underlay", tr: "IXPE şilte" }, value: "1 mm / 1,5 mm included" },
  {
    label: { en: "Dimensions", tr: "Boyutlar" },
    value: ["177,8 x 1219,2 mm", "228,6 x 1219,2 mm"],
  },
  { label: { en: "Edge", tr: "Kenar" }, value: "Micro Bevel / V-Groove" },
  { label: { en: "Locking system", tr: "Kilit sistemi" }, value: "UniClic / I4F" },
  { label: { en: "Utility class", tr: "Kullanım sınıfı" }, value: "23 / 33" },
  { label: { en: "Material", tr: "Materyal" }, value: "SPC (Stone Polymer Composite)" },
];

const wallSpecs: ProductSpec[] = [
  { label: { en: "Thickness", tr: "Kalınlık" }, value: "4 mm" },
  { label: { en: "Wear layer", tr: "Aşınma tabakası" }, value: "0,30 mm" },
  {
    label: { en: "Dimensions", tr: "Boyutlar" },
    value: ["960 mm x 2800 mm", "960 mm x 1400 mm"],
  },
  { label: { en: "Edge", tr: "Kenar" }, value: "Mikro derzli" },
  { label: { en: "Installation", tr: "Montaj" }, value: "Yapıştırma" },
  { label: { en: "Utility class", tr: "Kullanım sınıfı" }, value: "23 / 31" },
  { label: { en: "Usage area", tr: "Kullanım alanı" }, value: "Interior wall panels" },
  { label: { en: "Material", tr: "Materyal" }, value: "SPC (Stone Polymer Composite)" },
];

const floorNames = [
  ["P-201", "Bleached Oak"],
  ["P-202", "Arctic Oak"],
  ["P-203", "Sunlit Oak"],
  ["P-204", "Light Natural Oak"],
  ["P-205", "Buttermilk Oak"],
  ["P-206", "Ivory Mist Oak"],
  ["P-207", "Natural Beige Oak"],
  ["P-208", "Sand Dune Oak"],
  ["P-209", "Light Grey Oak"],
  ["P-210", "Canyon Oak"],
  ["P-211", "Cognac Oak"],
  ["P-212", "Rustic Greige Oak"],
  ["P-213", "Light Beige Oak"],
  ["P-214", "Dove Grey Oak"],
  ["P-215", "Sahara Oak"],
  ["P-216", "Harvest Oak"],
  ["P-217", "Silver Mist Oak"],
  ["P-218", "Chestnut Oak"],
  ["P-219", "Ash Grey Oak (Dark)"],
  ["P-220", "Dark Walnut Oak"],
] as const;

const wallNames = [
  ["605", "Bardiglio Grey"],
  ["606", "Marble Anthracite"],
  ["609", "Calacatta Bianco"],
  ["610", "Marble Black"],
  ["616", "Tundra Grey"],
  ["613", "Fior di Bosco (Olive)"],
  ["604", "Anthracite Concrete"],
  ["602", "Microcement Silver"],
  ["603", "Concrete Light Grey"],
  ["601", "Concrete Grey"],
  ["611", "Statuario Bianco"],
  ["619", "Ceppo di Gre White"],
  ["614", "Ceppo di Gre Beige"],
  ["620", "Crema Marfil Beige"],
  ["608", "Travertine Grey"],
  ["607", "Travertine White Vein"],
  ["617", "Bianco Lasa"],
  ["612", "Calacatta Gold"],
  ["618", "Carrara White"],
  ["742", "Glacier Oak"],
  ["215", "Sahara Oak"],
  ["205", "Buttermilk Oak"],
  ["227", "Weathered Greige Oak"],
] as const;

const createFloorProduct = (
  [code, name]: (typeof floorNames)[number],
  index: number,
): Product => ({
  slug: `${slugify(code)}-${slugify(name)}`,
  code,
  name,
  category: "spc-parke",
  categoryLabel: { en: "SPC Flooring", tr: "SPC Parke" },
  collection: { en: "Elit SPC Flooring Collection", tr: "Elit SPC Parke Koleksiyonu" },
  description: {
    en: `${name} rigid-core SPC flooring panel for North Cyprus homes, offices, showrooms, and commercial interiors.`,
    tr: `${name}, Kuzey Kıbrıs ev, villa, ofis, showroom ve ticari projeleri için rijit çekirdekli SPC parke paneli.`,
  },
  image: kermitImage(`/images/spc-flooring-elite-collection/${code}/product.jpg`),
  applicationImage: kermitImage(`/images/spc-flooring-elite-collection/${code}/application.jpg`),
  galleryImages: [
    kermitImage(`/images/spc-flooring-elite-collection/${code}/product.jpg`),
    kermitImage(`/images/spc-flooring-elite-collection/${code}/application.jpg`),
  ],
  specs: {
    en: ["5/6/7 mm", "23/33", "UniClic / I4F"],
    tr: ["5/6/7 mm", "23/33", "UniClic / I4F"],
  },
  technicalSpecs: floorSpecs,
  sourceUrl: floorSource,
  accent: accents[index % accents.length],
});

const createWallProduct = (
  [code, name]: (typeof wallNames)[number],
  index: number,
): Product => ({
  slug: `${slugify(code)}-${slugify(name)}`,
  code,
  name,
  category: "spc-duvar-panelleri",
  categoryLabel: { en: "SPC Wall Panels", tr: "SPC Duvar Panelleri" },
  collection: { en: "SPC Wall Panel Collection", tr: "SPC Duvar Paneli Koleksiyonu" },
  description: {
    en: `${name} large-format waterproof SPC wall panel for North Cyprus bathrooms, wet areas, and feature walls.`,
    tr: `${name}, Kıbrıs banyo, mutfak, ıslak hacim ve vurgu duvarları için geniş ebatlı suya dayanıklı SPC duvar paneli.`,
  },
  image: kermitImage(`/images/spc-wall-panels/${code}/product.jpg`),
  applicationImage: kermitImage(`/images/spc-wall-panels/${code}/application.jpg`),
  galleryImages: [
    kermitImage(`/images/spc-wall-panels/${code}/product.jpg`),
    kermitImage(`/images/spc-wall-panels/${code}/application.jpg`),
  ],
  specs: {
    en: ["4 mm", "960 x 2800 mm", "Glue-down"],
    tr: ["4 mm", "960 x 2800 mm", "Yapıştırma"],
  },
  technicalSpecs: wallSpecs,
  sourceUrl: wallSource,
  accent: accents[(index + 1) % accents.length],
});

export const products: Product[] = [
  ...floorNames.map(createFloorProduct),
  ...wallNames.map(createWallProduct),
];

export const productCategories: ProductCategory[] = [
  {
    slug: "spc-parke",
    label: { en: "SPC Flooring", tr: "SPC Parke" },
    shortLabel: { en: "SPC Floors", tr: "SPC Parke" },
    description: {
      en: "Elit collection SPC flooring panels with wood looks, waterproof rigid core, and project-ready specifications for North Cyprus interiors.",
      tr: "Kuzey Kıbrıs ev, villa, ofis ve ticari projeleri için ahşap görünümlü, suya dayanıklı rijit çekirdekli Elit SPC parke panelleri.",
    },
    sourceUrl: floorSource,
  },
  {
    slug: "spc-duvar-panelleri",
    label: { en: "SPC Wall Panels", tr: "SPC Duvar Panelleri" },
    shortLabel: { en: "Wall Panels", tr: "Duvar Panelleri" },
    description: {
      en: "Large-format SPC wall panels in marble, stone, concrete, and wood looks for fast renovation in North Cyprus.",
      tr: "Kuzey Kıbrıs banyo, mutfak, ıslak hacim ve vurgu duvarları için mermer, taş, beton ve ahşap görünümlü geniş ebatlı SPC duvar panelleri.",
    },
    sourceUrl: wallSource,
  },
] satisfies ProductCategory[];

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

export const getProductCategories = (
  sourceProducts: Product[] = products,
): ProductCategory[] => {
  const categoryMap = new Map<string, ProductCategory>();

  productCategories.forEach((category) => {
    categoryMap.set(category.slug, category);
  });

  sourceProducts.forEach((product) => {
    const slug = product.category.trim();

    if (!slug || categoryMap.has(slug)) {
      return;
    }

    const fallbackLabel = toCategoryFallbackLabel(slug);
    const label = {
      en: product.categoryLabel.en || product.collection.en || fallbackLabel.en,
      tr: product.categoryLabel.tr || product.collection.tr || fallbackLabel.tr,
    };

    categoryMap.set(slug, {
      description: {
        en:
          product.description.en ||
          `${label.en} products for North Cyprus decoration projects.`,
        tr:
          product.description.tr ||
          `${label.tr} ürünleri Kuzey Kıbrıs dekorasyon projeleri için listelenir.`,
      },
      label,
      shortLabel: label,
      slug,
      sourceUrl: product.sourceUrl,
    });
  });

  return Array.from(categoryMap.values()).filter((category) =>
    productCategories.some((item) => item.slug === category.slug) ||
    sourceProducts.some((product) => product.category === category.slug),
  );
};

export const getProductsByCategory = (category: ProductCategorySlug) =>
  products.filter((product) => product.category === category);

export const getProductBySlug = (slug: string) =>
  products.find((product) => product.slug === slug);

export const getCategoryBySlug = (
  slug: string,
  sourceProducts: Product[] = products,
) =>
  getProductCategories(sourceProducts).find(
    (category) => category.slug === slug,
  );

export const getRelatedProducts = (product: Product) =>
  getProductsByCategory(product.category)
    .filter((item) => item.slug !== product.slug)
    .slice(0, 4);
