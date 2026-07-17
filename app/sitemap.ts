import type { MetadataRoute } from "next";
import { getManagedBlogPosts } from "./data/blog-posts";
import { getManagedProducts } from "./data/catalog-store";
import {
  getBlogVisualSeoImage,
  getLandingVisualSeoImage,
  getProductVisualSeoImages,
  homeVisualSeoImages,
} from "./data/image-seo";
import { getProductCategories } from "./data/products";
import { seoLandingPages } from "./data/seo-landing-pages";
import { absoluteUrl, defaultOgImage, siteUrl } from "./seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, blogPosts] = await Promise.all([
    getManagedProducts(),
    getManagedBlogPosts(),
  ]);
  const now = new Date();
  const productCategories = getProductCategories(products);
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      changeFrequency: "weekly",
      images: homeVisualSeoImages.map((image) => absoluteUrl(image.url)),
      lastModified: now,
      priority: 1,
      url: siteUrl,
    },
    {
      changeFrequency: "monthly",
      images: [absoluteUrl("/images/ae-spc-is-sureci.jpg")],
      lastModified: now,
      priority: 0.75,
      url: `${siteUrl}/about-us`,
    },
    {
      changeFrequency: "monthly",
      images: [absoluteUrl("/images/ae-vision-hero.jpg")],
      lastModified: now,
      priority: 0.75,
      url: `${siteUrl}/vision`,
    },
    {
      changeFrequency: "monthly",
      images: [absoluteUrl("/images/ae-mission-hero.jpg")],
      lastModified: now,
      priority: 0.75,
      url: `${siteUrl}/mission`,
    },
    {
      changeFrequency: "weekly",
      lastModified: now,
      priority: 0.7,
      url: `${siteUrl}/search`,
    },
    {
      changeFrequency: "weekly",
      images: [absoluteUrl(defaultOgImage)],
      lastModified: now,
      priority: 0.72,
      url: `${siteUrl}/blog`,
    },
    {
      changeFrequency: "yearly",
      lastModified: now,
      priority: 0.25,
      url: `${siteUrl}/privacy-policy`,
    },
    {
      changeFrequency: "yearly",
      lastModified: now,
      priority: 0.25,
      url: `${siteUrl}/terms-and-conditions`,
    },
  ];
  const categoryRoutes: MetadataRoute.Sitemap = productCategories.map(
    (category) => ({
      changeFrequency: "weekly",
      lastModified: now,
      priority: 0.85,
      url: `${siteUrl}/category/${category.slug}`,
    }),
  );
  const landingRoutes: MetadataRoute.Sitemap = seoLandingPages.map((page) => ({
    changeFrequency: "monthly",
    images: [absoluteUrl(getLandingVisualSeoImage(page).url)],
    lastModified: now,
    priority: 0.82,
    url: `${siteUrl}/${page.slug}`,
  }));
  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    changeFrequency: "weekly",
    images: getProductVisualSeoImages(product).map((image) =>
      absoluteUrl(image.url),
    ),
    lastModified: now,
    priority: 0.65,
    url: `${siteUrl}/products/${product.slug}`,
  }));
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    changeFrequency: "monthly",
    images: [absoluteUrl(getBlogVisualSeoImage(post).url)],
    lastModified: new Date(post.updatedAt),
    priority: 0.7,
    url: `${siteUrl}/blog/${post.slug}`,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...landingRoutes,
    ...productRoutes,
    ...blogRoutes,
  ];
}
