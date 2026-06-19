import type { Metadata } from "next";
import { HomePageClient } from "./components/home-page-client";
import { getManagedProducts } from "./data/catalog-store";
import {
  createWebPageImageJsonLd,
  homeVisualSeoImages,
} from "./data/image-seo";
import { getManagedSiteContent } from "./data/site-content";
import { productCategories } from "./data/products";
import {
  defaultOgImage,
  defaultSeoDescription,
  homeFaqJsonLd,
  jsonLdScriptProps,
} from "./seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title:
    "Kuzey Kıbrıs SPC Parke, Duvar Paneli, Marble Sheet ve Dekoratif Çıta",
  description: defaultSeoDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    description: defaultSeoDescription,
    images: [
      {
        alt: "Kuzey Kıbrıs SPC panel ve dekorasyon projesi",
        height: 900,
        url: defaultOgImage,
        width: 1600,
      },
    ],
    title:
      "Kuzey Kıbrıs SPC Parke, Marble Sheet, Duvar Paneli ve Dekorasyon",
  },
};

export default async function Home() {
  const [products, siteContent] = await Promise.all([
    getManagedProducts(),
    getManagedSiteContent(),
  ]);

  return (
    <>
      <script
        dangerouslySetInnerHTML={jsonLdScriptProps([
          homeFaqJsonLd,
          createWebPageImageJsonLd({
            description: defaultSeoDescription,
            image: homeVisualSeoImages[0],
            name:
              "Kuzey Kıbrıs SPC Parke, Duvar Paneli ve Dekorasyon",
            path: "/",
          }),
        ])}
        type="application/ld+json"
      />
      <HomePageClient
        categories={[...productCategories]}
        products={products}
        siteContent={siteContent}
      />
    </>
  );
}
