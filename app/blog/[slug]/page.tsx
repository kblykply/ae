import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CatalogHeader } from "../../components/catalog-header";
import { SiteFooter } from "../../components/site-footer";
import {
  getManagedBlogPostBySlug,
  getManagedBlogPosts,
  type BlogPost,
} from "../../data/blog-posts";
import {
  createImageObjectJsonLd,
  createWebPageImageJsonLd,
  getBlogVisualSeoImage,
} from "../../data/image-seo";
import {
  absoluteUrl,
  businessName,
  jsonLdScriptProps,
  shortBusinessName,
} from "../../seo";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("tr-CY", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));

const getContentBlocks = (content: string) =>
  content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

function BlogContent({ content }: { content: string }) {
  return (
    <div className="blog-article-body">
      {getContentBlocks(content).map((block) => {
        if (block.startsWith("## ")) {
          return <h2 key={block}>{block.replace(/^##\s+/, "")}</h2>;
        }

        const lines = block.split(/\n/).map((line) => line.trim());
        const isList = lines.every((line) => line.startsWith("- "));

        if (isList) {
          return (
            <ul key={block}>
              {lines.map((line) => (
                <li key={line}>{line.replace(/^-\s+/, "")}</li>
              ))}
            </ul>
          );
        }

        return <p key={block}>{block.replace(/\n/g, " ")}</p>;
      })}
    </div>
  );
}

const createArticleJsonLd = (post: BlogPost) => {
  const visualSeoImage = getBlogVisualSeoImage(post);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    author: {
      "@type": "Organization",
      name: post.author || businessName,
    },
    dateModified: post.updatedAt,
    datePublished: post.publishedAt,
    description: post.seoDescription || post.excerpt,
    headline: post.seoTitle || post.title,
    image: createImageObjectJsonLd(visualSeoImage),
    inLanguage: "tr-CY",
    keywords: post.tags,
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    publisher: {
      "@type": "Organization",
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/aelogo.png?v=3"),
      },
      name: businessName,
    },
  };
};

export async function generateStaticParams() {
  const posts = await getManagedBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getManagedBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog yazısı bulunamadı | Adem Eren Decoration",
    };
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    keywords: [post.focusKeyword, ...post.tags],
    openGraph: {
      description: post.seoDescription || post.excerpt,
      images: [
        {
          alt: post.coverImageAlt,
          height: 900,
          url: post.coverImage,
          width: 1600,
        },
      ],
      publishedTime: post.publishedAt,
      title: post.seoTitle || post.title,
      type: "article",
      url: `/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      description: post.seoDescription || post.excerpt,
      images: [post.coverImage],
      title: post.seoTitle || post.title,
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getManagedBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = (await getManagedBlogPosts())
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);
  const visualSeoImage = getBlogVisualSeoImage(post);
  const jsonLd = [
    createArticleJsonLd(post),
    createWebPageImageJsonLd({
      description: post.seoDescription || post.excerpt,
      image: visualSeoImage,
      name: post.seoTitle || post.title,
      path: `/blog/${post.slug}`,
    }),
  ];

  return (
    <main className="site-shell blog-shell">
      <script
        dangerouslySetInnerHTML={jsonLdScriptProps(jsonLd)}
        type="application/ld+json"
      />
      <article className="blog-detail-hero">
        <CatalogHeader language="tr" />
        <Image
          alt={post.coverImageAlt}
          className="blog-detail-hero-image"
          fill
          preload
          sizes="100vw"
          src={post.coverImage}
        />
        <div className="blog-detail-overlay" />
        <div className="blog-detail-hero-content">
          <Link href="/blog">Blog</Link>
          <span>{post.category}</span>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          <div>
            <small>{shortBusinessName}</small>
            <small>{formatDate(post.publishedAt)}</small>
            <small>{post.readingTime} dk okuma</small>
          </div>
          <p className="image-context-caption">{post.coverImageAlt}</p>
        </div>
      </article>

      <section className="blog-article-layout">
        <aside className="blog-article-meta">
          <span>Odak konu</span>
          <strong>{post.focusKeyword}</strong>
          <div>
            {post.tags.map((tag) => (
              <Link href={`/search?q=${encodeURIComponent(tag)}`} key={tag}>
                {tag}
              </Link>
            ))}
          </div>
        </aside>
        <BlogContent content={post.content} />
      </section>

      {relatedPosts.length ? (
        <section className="blog-related-section">
          <div className="section-heading">
            <p className="eyebrow">Devam et</p>
            <h2>Benzer dekorasyon rehberleri.</h2>
          </div>
          <div className="blog-card-grid">
            {relatedPosts.map((relatedPost) => (
              <article className="blog-card" key={relatedPost.slug}>
                <Link
                  className="blog-card-image"
                  href={`/blog/${relatedPost.slug}`}
                >
                  <Image
                    alt={relatedPost.coverImageAlt}
                    fill
                    sizes="(max-width: 780px) 100vw, 33vw"
                    src={relatedPost.coverImage}
                  />
                </Link>
                <div>
                  <span>{relatedPost.category}</span>
                  <h3>
                    <Link href={`/blog/${relatedPost.slug}`}>
                      {relatedPost.title}
                    </Link>
                  </h3>
                  <p>{relatedPost.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <SiteFooter language="tr" />
    </main>
  );
}
