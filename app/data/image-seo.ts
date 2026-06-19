import type { BlogPost } from "./blog-posts";
import type { Product } from "./products";
import type { SeoLandingPage } from "./seo-landing-pages";
import { absoluteUrl } from "../seo";

export type VisualSeoImage = {
  alt: string;
  caption: string;
  title: string;
  url: string;
};

export const homeVisualSeoImages: VisualSeoImage[] = [
  {
    alt: "Kuzey Kıbrıs modern iç mekanda SPC parke uygulaması",
    caption:
      "Lefkoşa, Girne, Gazimağusa ve İskele projeleri için SPC parke ve zemin kaplama uygulama örneği.",
    title: "Kuzey Kıbrıs SPC parke uygulaması",
    url: "/images/kermit-floor-application.jpg",
  },
  {
    alt: "Kuzey Kıbrıs banyo ve ıslak hacim için SPC duvar paneli uygulaması",
    caption:
      "Banyo, mutfak ve ıslak hacimlerde kullanılan suya dayanıklı SPC duvar paneli görünümü.",
    title: "SPC duvar paneli uygulaması",
    url: "/images/kermit-wall-application.jpg",
  },
  {
    alt: "Dekorasyon stüdyosunda müşteriyle SPC panel numunesi seçimi",
    caption:
      "Adem Eren Decoration numune, metraj ve uygulama planlama süreci için SPC panel seçimi.",
    title: "SPC panel numune seçimi",
    url: "/images/ae-spc-is-sureci.jpg",
  },
  {
    alt: "Kuzey Kıbrıs alçıpan ve asma tavan uygulama hazırlığı",
    caption:
      "Alçıpan uygulama, asma tavan, gizli ışık ve panel öncesi yüzey hazırlığı.",
    title: "Alçıpan ve asma tavan uygulaması",
    url: "/images/ae-alcipan-uygulama.jpg",
  },
  {
    alt: "Kuzey Kıbrıs dekoratif çıta ve iç mekan yüzey seçimi",
    caption:
      "Dekoratif çıta, lambri, akustik panel ve SPC yüzeylerin birlikte planlandığı iç mekan dekorasyon süreci.",
    title: "Dekoratif çıta ve iç mekan dekorasyon",
    url: "/images/ae-vision-hero.jpg",
  },
  {
    alt: "Kuzey Kıbrıs SPC panel ölçü ve proje koordinasyonu",
    caption:
      "SPC panel, marble sheet, zemin kaplama ve dekoratif yüzey uygulamalarında ölçü ve saha koordinasyonu.",
    title: "SPC panel proje koordinasyonu",
    url: "/images/ae-mission-hero.jpg",
  },
];

const getProductMaterialPhrase = (product: Product) =>
  product.category === "spc-parke"
    ? "SPC parke ve SPC zemin kaplama"
    : "SPC duvar paneli, banyo paneli ve marble sheet yüzey";

export const getProductPrimaryImageAlt = (product: Product) =>
  `${product.code} ${product.name} ${getProductMaterialPhrase(
    product,
  )} için Kuzey Kıbrıs ürün ve uygulama görseli`;

export const getProductGalleryImageAlt = (product: Product, index: number) => {
  if (index === 0) {
    return `${product.code} ${product.name} ${product.categoryLabel.tr} numune yüzeyi`;
  }

  if (index === 1) {
    return `${product.code} ${product.name} ${product.categoryLabel.tr} uygulama görseli`;
  }

  return `${product.code} ${product.name} ${product.categoryLabel.tr} galeri detayı ${index + 1}`;
};

export const getProductImageCaption = (product: Product) =>
  `${product.code} ${product.name}; Lefkoşa, Girne, Gazimağusa, İskele ve KKTC projeleri için ${getProductMaterialPhrase(
    product,
  )} seçimi.`;

export const getProductVisualSeoImages = (product: Product): VisualSeoImage[] =>
  Array.from(
    new Set([
      product.image,
      product.applicationImage,
      ...product.galleryImages,
    ].filter(Boolean)),
  ).map((url, index) => ({
    alt: getProductGalleryImageAlt(product, index),
    caption: getProductImageCaption(product),
    title:
      index === 0
        ? `${product.code} ${product.name} ürün numunesi`
        : `${product.code} ${product.name} uygulama görseli`,
    url,
  }));

export const getLandingVisualSeoImage = (
  page: SeoLandingPage,
): VisualSeoImage => ({
  alt: page.heroImageAlt,
  caption: `${page.heroImageAlt}. ${page.primaryKeyword} arayan Kuzey Kıbrıs projeleri için malzeme seçimi ve uygulama planı.`,
  title: `${page.primaryKeyword} görseli`,
  url: page.heroImage,
});

export const getBlogVisualSeoImage = (post: BlogPost): VisualSeoImage => ({
  alt: post.coverImageAlt,
  caption: `${post.coverImageAlt}. Odak konu: ${post.focusKeyword}.`,
  title: post.seoTitle || post.title,
  url: post.coverImage,
});

export const getCategoryVisualSeoImage = (
  category: {
    description: { tr: string };
    label: { tr: string };
    slug: string;
  },
  imageUrl: string,
): VisualSeoImage => ({
  alt: `${category.label.tr} Kuzey Kıbrıs ürün ve uygulama görseli`,
  caption: `${category.label.tr} koleksiyonu; ${category.description.tr}`,
  title: `${category.label.tr} Kuzey Kıbrıs`,
  url: imageUrl,
});

export const createImageObjectJsonLd = (image: VisualSeoImage) => ({
  "@type": "ImageObject",
  caption: image.caption,
  name: image.title,
  representativeOfPage: true,
  url: absoluteUrl(image.url),
});

export const createWebPageImageJsonLd = ({
  description,
  image,
  name,
  path,
}: {
  description: string;
  image: VisualSeoImage;
  name: string;
  path: string;
}) => ({
  "@context": "https://schema.org",
  "@id": absoluteUrl(`${path}#webpage`),
  "@type": "WebPage",
  description,
  image: createImageObjectJsonLd(image),
  inLanguage: "tr-CY",
  name,
  primaryImageOfPage: createImageObjectJsonLd(image),
  url: absoluteUrl(path),
});

