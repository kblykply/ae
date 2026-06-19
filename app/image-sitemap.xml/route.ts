import { getManagedBlogPosts } from "../data/blog-posts";
import { getManagedProducts } from "../data/catalog-store";
import {
  getBlogVisualSeoImage,
  getLandingVisualSeoImage,
  getProductVisualSeoImages,
  homeVisualSeoImages,
} from "../data/image-seo";
import { productCategories } from "../data/products";
import { seoLandingPages } from "../data/seo-landing-pages";
import { absoluteUrl, defaultOgImage } from "../seo";

export const dynamic = "force-dynamic";

type ImageSitemapUrl = {
  images: string[];
  loc: string;
};

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const uniqueImages = (images: string[]) =>
  Array.from(new Set(images.filter(Boolean).map(absoluteUrl)));

const createEntry = (path: string, images: string[]): ImageSitemapUrl => ({
  images: uniqueImages(images),
  loc: absoluteUrl(path),
});

const renderEntry = (entry: ImageSitemapUrl) => {
  if (!entry.images.length) {
    return "";
  }

  return [
    "  <url>",
    `    <loc>${escapeXml(entry.loc)}</loc>`,
    ...entry.images.map(
      (image) =>
        `    <image:image><image:loc>${escapeXml(image)}</image:loc></image:image>`,
    ),
    "  </url>",
  ].join("\n");
};

export async function GET() {
  const [products, blogPosts] = await Promise.all([
    getManagedProducts(),
    getManagedBlogPosts(),
  ]);

  const categoryEntries = productCategories.map((category) => {
    const heroProduct = products.find(
      (product) => product.category === category.slug,
    );

    return createEntry(`/category/${category.slug}`, [
      heroProduct?.applicationImage ?? defaultOgImage,
      heroProduct?.image ?? "",
    ]);
  });

  const entries: ImageSitemapUrl[] = [
    createEntry("/", homeVisualSeoImages.map((image) => image.url)),
    createEntry("/about-us", [
      "/images/ae-spc-is-sureci.jpg",
      "/images/ae-mission-hero.jpg",
    ]),
    createEntry("/vision", ["/images/ae-vision-hero.jpg"]),
    createEntry("/mission", ["/images/ae-mission-hero.jpg"]),
    createEntry("/blog", [
      blogPosts[0]?.coverImage ?? defaultOgImage,
      defaultOgImage,
    ]),
    ...categoryEntries,
    ...seoLandingPages.map((page) =>
      createEntry(`/${page.slug}`, [getLandingVisualSeoImage(page).url]),
    ),
    ...products.map((product) =>
      createEntry(
        `/products/${product.slug}`,
        getProductVisualSeoImages(product).map((image) => image.url),
      ),
    ),
    ...blogPosts.map((post) =>
      createEntry(`/blog/${post.slug}`, [getBlogVisualSeoImage(post).url]),
    ),
  ];

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    entries.map(renderEntry).filter(Boolean).join("\n"),
    "</urlset>",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
