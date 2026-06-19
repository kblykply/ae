import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CatalogHeader } from "../components/catalog-header";
import { SiteFooter } from "../components/site-footer";
import { getManagedBlogPosts } from "../data/blog-posts";
import {
  createWebPageImageJsonLd,
  getBlogVisualSeoImage,
  homeVisualSeoImages,
} from "../data/image-seo";
import {
  absoluteUrl,
  defaultOgImage,
  jsonLdScriptProps,
} from "../seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kuzey Kıbrıs Dekorasyon Blogu | SPC Panel ve İç Mekan Rehberi",
  description:
    "Kuzey Kıbrıs dekorasyon, SPC parke, SPC duvar paneli, marble sheet, akustik panel, alçıpan ve asma tavan hakkında pratik rehber yazıları.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    description:
      "Kuzey Kıbrıs dekorasyon, SPC parke, duvar paneli ve iç mekan uygulamaları hakkında uzman blog yazıları.",
    images: [
      {
        alt: "Adem Eren Decoration blog",
        height: 900,
        url: defaultOgImage,
        width: 1600,
      },
    ],
    title: "Kuzey Kıbrıs Dekorasyon Blogu",
    type: "website",
    url: "/blog",
  },
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("tr-CY", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));

export default async function BlogPage() {
  const posts = await getManagedBlogPosts();
  const featuredPost = posts[0];
  const visualSeoImage = featuredPost
    ? getBlogVisualSeoImage(featuredPost)
    : homeVisualSeoImages[0];
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      item: absoluteUrl(`/blog/${post.slug}`),
      name: post.title,
      position: index + 1,
    })),
    name: "Adem Eren Decoration Blog",
    numberOfItems: posts.length,
  };

  return (
    <main className="site-shell blog-shell">
      <script
        dangerouslySetInnerHTML={jsonLdScriptProps([
          itemListJsonLd,
          createWebPageImageJsonLd({
            description:
              "Kuzey Kıbrıs dekorasyon, SPC parke, SPC duvar paneli, marble sheet, akustik panel, alçıpan ve asma tavan blog rehberleri.",
            image: visualSeoImage,
            name: "Kuzey Kıbrıs Dekorasyon Blogu",
            path: "/blog",
          }),
        ])}
        type="application/ld+json"
      />
      <section className="blog-hero">
        <CatalogHeader language="tr" />
        <div className="blog-hero-content">
          <p className="eyebrow">İçerik stratejisi</p>
          <h1>Kuzey Kıbrıs dekorasyon ve SPC panel rehberi.</h1>
          <p>
            SPC parke, SPC duvar paneli, marble sheet, alçıpan, asma tavan,
            akustik panel ve dekoratif yüzey seçimleri hakkında pratik,
            müşteri odaklı yazılar.
          </p>
        </div>
      </section>

      {featuredPost ? (
        <section className="blog-featured">
          <Link className="blog-featured-image" href={`/blog/${featuredPost.slug}`}>
            <Image
              alt={featuredPost.coverImageAlt}
              fill
              sizes="(max-width: 980px) 100vw, 48vw"
              src={featuredPost.coverImage}
            />
          </Link>
          <article>
            <span>{featuredPost.category}</span>
            <h2>
              <Link href={`/blog/${featuredPost.slug}`}>
                {featuredPost.title}
              </Link>
            </h2>
            <p>{featuredPost.excerpt}</p>
            <div>
              <small>{formatDate(featuredPost.publishedAt)}</small>
              <small>{featuredPost.readingTime} dk okuma</small>
            </div>
            <Link href={`/blog/${featuredPost.slug}`}>Yazıyı oku</Link>
          </article>
        </section>
      ) : null}

      <section className="blog-grid-section">
        <div className="section-heading">
          <p className="eyebrow">Blog yazıları</p>
          <h2>Malzeme, uygulama ve şehir bazlı dekorasyon notları.</h2>
        </div>

        <div className="blog-card-grid">
          {posts.map((post) => (
            <article className="blog-card" key={post.slug}>
              <Link className="blog-card-image" href={`/blog/${post.slug}`}>
                <Image
                  alt={post.coverImageAlt}
                  fill
                  sizes="(max-width: 780px) 100vw, 33vw"
                  src={post.coverImage}
                />
              </Link>
              <div>
                <span>{post.category}</span>
                <h3>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p>{post.excerpt}</p>
                <small>
                  {formatDate(post.publishedAt)} · {post.readingTime} dk okuma
                </small>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 ? (
          <p className="blog-empty">
            Henüz yayında blog yazısı yok. Yeni içerikler yakında eklenecek.
          </p>
        ) : null}
      </section>

      <section className="blog-strategy-band">
        <div>
          <p className="eyebrow">Yerel SEO içerik planı</p>
          <h2>Her yazı gerçek müşteri sorusuna cevap verecek şekilde hazırlanır.</h2>
        </div>
        <p>
          Blog içerikleri; Lefkoşa, Girne, Gazimağusa, İskele, Güzelyurt ve
          Lefke aramalarında dekorasyon, SPC panel, zemin kaplama, marble sheet
          ve uygulama süreci arayan kişilere yardımcı olacak şekilde
          yapılandırılır.
        </p>
      </section>

      <SiteFooter language="tr" />
    </main>
  );
}
