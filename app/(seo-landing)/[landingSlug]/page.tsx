import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoLandingPageView } from "../../components/seo-landing-page";
import {
  getSeoLandingPage,
  seoLandingPages,
} from "../../data/seo-landing-pages";
import {
  createImageObjectJsonLd,
  createWebPageImageJsonLd,
  getLandingVisualSeoImage,
} from "../../data/image-seo";
import {
  absoluteUrl,
  businessName,
  createBreadcrumbJsonLd,
  jsonLdScriptProps,
  localSeoKeywords,
} from "../../seo";

type SeoLandingRouteProps = {
  params: Promise<{
    landingSlug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return seoLandingPages.map((page) => ({
    landingSlug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: SeoLandingRouteProps): Promise<Metadata> {
  const { landingSlug } = await params;
  const page = getSeoLandingPage(landingSlug);

  if (!page) {
    notFound();
  }

  return {
    title: `${page.title} | ${page.primaryKeyword}`,
    description: page.description,
    alternates: {
      canonical: `/${page.slug}`,
    },
    keywords: [...localSeoKeywords, ...page.keywords],
    openGraph: {
      description: page.description,
      images: [
        {
          alt: page.heroImageAlt,
          height: 900,
          url: page.heroImage,
          width: 1680,
        },
      ],
      title: `${page.title} | Adem Eren Decoration`,
      type: "website",
      url: `/${page.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      description: page.description,
      images: [page.heroImage],
      title: page.title,
    },
  };
}

export default async function SeoLandingRoute({
  params,
}: SeoLandingRouteProps) {
  const { landingSlug } = await params;
  const page = getSeoLandingPage(landingSlug);

  if (!page) {
    notFound();
  }

  const visualSeoImage = getLandingVisualSeoImage(page);
  const jsonLd = [
    createWebPageImageJsonLd({
      description: page.description,
      image: visualSeoImage,
      name: page.title,
      path: `/${page.slug}`,
    }),
    {
      "@context": "https://schema.org",
      "@id": absoluteUrl(`/${page.slug}#service`),
      "@type": "Service",
      areaServed: [
        "Lefkoşa",
        "Girne",
        "Gazimağusa",
        "İskele",
        "Güzelyurt",
        "Lefke",
        "Kuzey Kıbrıs",
        "KKTC",
      ],
      description: page.description,
      image: createImageObjectJsonLd(visualSeoImage),
      name: page.title,
      provider: {
        "@id": absoluteUrl("/#local-business"),
        name: businessName,
      },
      serviceType: page.serviceType,
      url: absoluteUrl(`/${page.slug}`),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((faq) => ({
        "@type": "Question",
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
        name: faq.question,
      })),
    },
    createBreadcrumbJsonLd([
      { name: "Ana Sayfa", path: "/" },
      { name: page.title, path: `/${page.slug}` },
    ]),
  ];

  return (
    <>
      <script
        dangerouslySetInnerHTML={jsonLdScriptProps(jsonLd)}
        type="application/ld+json"
      />
      <SeoLandingPageView page={page} />
    </>
  );
}
