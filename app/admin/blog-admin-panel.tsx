"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { BlogPost, BlogPostStatus } from "../data/blog-posts";

type BlogAdminPanelProps = {
  initialPosts: BlogPost[];
};

type StatusState = {
  text: string;
  tone: "idle" | "success" | "error";
};

type UploadResponse = {
  message?: string;
  url?: string;
};

const emptyPost = (): BlogPost => {
  const publishedAt = new Date().toISOString();

  return {
    author: "Adem Eren Decoration",
    category: "Dekorasyon Rehberi",
    content:
      "## Başlık\n\nBu bölümde müşterinin gerçekten merak ettiği soruyu açık ve pratik şekilde cevaplayın.\n\n## Uygulama notları\n\n- Mekan fotoğrafı\n- Ölçü bilgisi\n- Malzeme seçimi\n- Uygulama sırası",
    coverImage: "/images/ae-spc-is-sureci.jpg",
    coverImageAlt: "Adem Eren Decoration blog kapak görseli",
    excerpt:
      "Bu yazının kısa açıklamasını yazın. Arama sonucunda ve blog kartlarında görünecek.",
    focusKeyword: "Kuzey Kıbrıs dekorasyon",
    publishedAt,
    readingTime: 2,
    seoDescription:
      "Kuzey Kıbrıs dekorasyon, SPC panel ve iç mekan yüzey seçimi hakkında pratik blog rehberi.",
    seoTitle: "Yeni Blog Yazısı",
    slug: `blog-yazisi-${Date.now().toString(36)}`,
    status: "draft",
    tags: ["Kuzey Kıbrıs dekorasyon", "SPC panel"],
    title: "Yeni Blog Yazısı",
    updatedAt: publishedAt,
  };
};

const createClientBlogSlug = (value: string) =>
  value
    .toLocaleLowerCase("tr")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const toDateTimeInputValue = (value: string) => {
  const date = Date.parse(value) ? new Date(value) : new Date();
  const timezoneOffsetMs = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - timezoneOffsetMs).toISOString().slice(0, 16);
};

const fromDateTimeInputValue = (value: string) =>
  value ? new Date(value).toISOString() : new Date().toISOString();

const getTagsText = (post: BlogPost) => post.tags.join(", ");

const parseTagsText = (value: string) =>
  Array.from(
    new Set(
      value
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    ),
  );

export function BlogAdminPanel({ initialPosts }: BlogAdminPanelProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | BlogPostStatus>(
    "all",
  );
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<StatusState>({
    text: "Blog yazıları düzenlenmeye hazır.",
    tone: "idle",
  });
  const selectedPost = posts[selectedIndex] ?? posts[0];
  const visiblePosts = useMemo(() => {
    const normalizedQuery = query.toLocaleLowerCase("tr");

    return posts.filter((post) => {
      const matchesStatus =
        statusFilter === "all" ? true : post.status === statusFilter;
      const searchText = [
        post.title,
        post.slug,
        post.category,
        post.focusKeyword,
        post.excerpt,
        post.tags.join(" "),
      ]
        .join(" ")
        .toLocaleLowerCase("tr");

      return matchesStatus && searchText.includes(normalizedQuery);
    });
  }, [posts, query, statusFilter]);
  const publishedCount = posts.filter((post) => post.status === "published")
    .length;

  const updateSelectedPost = (updater: (post: BlogPost) => BlogPost) => {
    setPosts((currentPosts) =>
      currentPosts.map((post, index) =>
        index === selectedIndex
          ? {
              ...updater(post),
              updatedAt: new Date().toISOString(),
            }
          : post,
      ),
    );
  };

  const addPost = () => {
    setPosts((currentPosts) => {
      const nextPosts = [emptyPost(), ...currentPosts];
      setSelectedIndex(0);
      return nextPosts;
    });
  };

  const duplicatePost = () => {
    if (!selectedPost) {
      return;
    }

    const nextPost: BlogPost = {
      ...selectedPost,
      publishedAt: new Date().toISOString(),
      slug: `${selectedPost.slug}-kopya-${Date.now().toString(36)}`,
      status: "draft",
      title: `${selectedPost.title} Kopya`,
      updatedAt: new Date().toISOString(),
    };

    setPosts((currentPosts) => {
      setSelectedIndex(0);
      return [nextPost, ...currentPosts];
    });
  };

  const deletePost = () => {
    if (!selectedPost || posts.length <= 1) {
      setStatus({
        text: "En az bir blog yazısı kalmalı.",
        tone: "error",
      });
      return;
    }

    setPosts((currentPosts) => {
      const nextPosts = currentPosts.filter((_, index) => index !== selectedIndex);
      setSelectedIndex(Math.max(0, selectedIndex - 1));
      return nextPosts;
    });
  };

  const savePosts = async () => {
    setBusy(true);
    setStatus({ text: "Blog yazıları kaydediliyor...", tone: "idle" });

    try {
      const response = await fetch("/api/admin/blog", {
        body: JSON.stringify({ posts }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      });
      const body = (await response.json()) as {
        message?: string;
        posts?: BlogPost[];
      };

      if (!response.ok || !body.posts) {
        throw new Error(body.message || "Blog yazıları kaydedilemedi.");
      }

      setPosts(body.posts);
      setSelectedIndex(Math.min(selectedIndex, body.posts.length - 1));
      setStatus({
        text: body.message || "Blog yazıları kaydedildi.",
        tone: "success",
      });
    } catch (error) {
      const saveError = error as Error;
      setStatus({
        text: saveError.message || "Blog yazıları kaydedilemedi.",
        tone: "error",
      });
    } finally {
      setBusy(false);
    }
  };

  const resetPosts = async () => {
    setBusy(true);
    setStatus({ text: "Başlangıç blog içerikleri yükleniyor...", tone: "idle" });

    try {
      const response = await fetch("/api/admin/blog", {
        body: JSON.stringify({ action: "reset" }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const body = (await response.json()) as {
        message?: string;
        posts?: BlogPost[];
      };

      if (!response.ok || !body.posts) {
        throw new Error(body.message || "Blog içerikleri sıfırlanamadı.");
      }

      setPosts(body.posts);
      setSelectedIndex(0);
      setStatus({
        text: body.message || "Blog içerikleri sıfırlandı.",
        tone: "success",
      });
    } catch (error) {
      const resetError = error as Error;
      setStatus({
        text: resetError.message || "Blog içerikleri sıfırlanamadı.",
        tone: "error",
      });
    } finally {
      setBusy(false);
    }
  };

  const uploadCoverImage = async (file: File | null) => {
    if (!file) {
      return;
    }

    setUploading(true);
    setStatus({ text: "Kapak görseli yükleniyor...", tone: "idle" });

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "blog");

      const response = await fetch("/api/admin/uploads", {
        body: formData,
        method: "POST",
      });
      const body = (await response.json()) as UploadResponse;

      if (!response.ok || !body.url) {
        throw new Error(body.message || "Görsel yüklenemedi.");
      }

      updateSelectedPost((post) => ({
        ...post,
        coverImage: body.url ?? post.coverImage,
      }));
      setStatus({ text: "Kapak görseli yüklendi.", tone: "success" });
    } catch (error) {
      const uploadError = error as Error;
      setStatus({
        text: uploadError.message || "Görsel yüklenemedi.",
        tone: "error",
      });
    } finally {
      setUploading(false);
    }
  };

  if (!selectedPost) {
    return (
      <section className="admin-empty-state">
        <h2>Blog yazısı yok</h2>
        <button onClick={addPost} type="button">
          İlk yazıyı oluştur
        </button>
      </section>
    );
  }

  return (
    <section className="admin-panel admin-blog-panel">
      <aside className="admin-sidebar admin-blog-sidebar">
        <div className="admin-section-title compact">
          <p className="eyebrow">İçerik stratejisi</p>
          <h2>Blog yazıları</h2>
        </div>

        <div className="admin-stat-grid">
          <article>
            <span>{posts.length}</span>
            <p>Toplam yazı</p>
          </article>
          <article>
            <span>{publishedCount}</span>
            <p>Yayında</p>
          </article>
        </div>

        <div className="admin-toolbar admin-toolbar-compact">
          <button
            className="admin-primary-action"
            disabled={busy}
            onClick={savePosts}
            type="button"
          >
            {busy ? "Kaydediliyor..." : "Kaydet"}
          </button>
          <button disabled={busy} onClick={addPost} type="button">
            Yeni yazı
          </button>
          <button disabled={busy} onClick={duplicatePost} type="button">
            Kopyala
          </button>
          <button
            className="admin-reset-action"
            disabled={busy}
            onClick={resetPosts}
            type="button"
          >
            Sıfırla
          </button>
        </div>

        <div className="admin-list-filters">
          <input
            aria-label="Blog yazısı ara"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Başlık, kategori, etiket ara"
            type="search"
            value={query}
          />
          <select
            aria-label="Yayın durumu filtresi"
            onChange={(event) =>
              setStatusFilter(event.target.value as "all" | BlogPostStatus)
            }
            value={statusFilter}
          >
            <option value="all">Tüm durumlar</option>
            <option value="published">Yayında</option>
            <option value="draft">Taslak</option>
          </select>
        </div>

        <div className="admin-product-list admin-blog-list">
          {visiblePosts.map((post) => {
            const postIndex = posts.findIndex((item) => item.slug === post.slug);

            return (
              <button
                className={postIndex === selectedIndex ? "is-selected" : ""}
                key={post.slug}
                onClick={() => setSelectedIndex(Math.max(0, postIndex))}
                type="button"
              >
                <span>{post.title}</span>
                <small>
                  {post.status === "published" ? "Yayında" : "Taslak"} ·{" "}
                  {post.category}
                </small>
              </button>
            );
          })}
          {visiblePosts.length === 0 ? (
            <p className="admin-list-empty">Bu filtreyle eşleşen yazı yok.</p>
          ) : null}
        </div>
      </aside>

      <div className="admin-editor admin-blog-editor">
        <div className={`admin-status is-${status.tone}`}>
          {status.text}
        </div>

        <section className="admin-blog-cover">
          <Image
            alt={selectedPost.coverImageAlt || selectedPost.title}
            fill
            sizes="(max-width: 980px) 100vw, 48vw"
            src={selectedPost.coverImage}
          />
          <div>
            <span>{selectedPost.category}</span>
            <h2>{selectedPost.title}</h2>
          </div>
        </section>

        <div className="admin-editor-links">
          <Link href={`/blog/${selectedPost.slug}`} target="_blank">
            Yazıyı görüntüle
          </Link>
          <button disabled={posts.length <= 1} onClick={deletePost} type="button">
            Yazıyı sil
          </button>
        </div>

        <div className="admin-form-grid two-column">
          <label>
            Başlık
            <input
              onChange={(event) => {
                const title = event.target.value;
                updateSelectedPost((post) => ({
                  ...post,
                  seoTitle: post.seoTitle === post.title ? title : post.seoTitle,
                  slug:
                    post.slug.startsWith("blog-yazisi-") ||
                    createClientBlogSlug(post.title) === post.slug
                      ? createClientBlogSlug(title)
                      : post.slug,
                  title,
                }));
              }}
              value={selectedPost.title}
            />
          </label>
          <label>
            URL slug
            <input
              onChange={(event) =>
                updateSelectedPost((post) => ({
                  ...post,
                  slug: createClientBlogSlug(event.target.value),
                }))
              }
              value={selectedPost.slug}
            />
          </label>
          <label>
            Durum
            <select
              onChange={(event) =>
                updateSelectedPost((post) => ({
                  ...post,
                  status: event.target.value as BlogPostStatus,
                }))
              }
              value={selectedPost.status}
            >
              <option value="published">Yayında</option>
              <option value="draft">Taslak</option>
            </select>
          </label>
          <label>
            Yayın tarihi
            <input
              onChange={(event) =>
                updateSelectedPost((post) => ({
                  ...post,
                  publishedAt: fromDateTimeInputValue(event.target.value),
                }))
              }
              type="datetime-local"
              value={toDateTimeInputValue(selectedPost.publishedAt)}
            />
          </label>
          <label>
            Kategori
            <input
              onChange={(event) =>
                updateSelectedPost((post) => ({
                  ...post,
                  category: event.target.value,
                }))
              }
              value={selectedPost.category}
            />
          </label>
          <label>
            Yazar
            <input
              onChange={(event) =>
                updateSelectedPost((post) => ({
                  ...post,
                  author: event.target.value,
                }))
              }
              value={selectedPost.author}
            />
          </label>
        </div>

        <div className="admin-form-grid">
          <label>
            Kısa özet
            <textarea
              onChange={(event) =>
                updateSelectedPost((post) => ({
                  ...post,
                  excerpt: event.target.value,
                }))
              }
              value={selectedPost.excerpt}
            />
          </label>
          <label>
            Yazı içeriği
            <textarea
              className="admin-blog-content-textarea"
              onChange={(event) =>
                updateSelectedPost((post) => ({
                  ...post,
                  content: event.target.value,
                  readingTime: Math.max(
                    1,
                    Math.ceil(
                      event.target.value.split(/\s+/).filter(Boolean).length / 180,
                    ),
                  ),
                }))
              }
              value={selectedPost.content}
            />
          </label>
        </div>

        <section className="admin-blog-media-tools">
          <div className="admin-section-title compact">
            <p className="eyebrow">Kapak görseli</p>
            <h2>Blog görseli</h2>
          </div>
          <div className="admin-form-grid two-column">
            <label>
              Görsel URL
              <input
                onChange={(event) =>
                  updateSelectedPost((post) => ({
                    ...post,
                    coverImage: event.target.value,
                  }))
                }
                value={selectedPost.coverImage}
              />
            </label>
            <label>
              Görsel alt metni
              <input
                onChange={(event) =>
                  updateSelectedPost((post) => ({
                    ...post,
                    coverImageAlt: event.target.value,
                  }))
                }
                value={selectedPost.coverImageAlt}
              />
            </label>
          </div>
          <label className="admin-upload-button admin-blog-upload">
            {uploading ? "Yükleniyor..." : "Bilgisayardan görsel yükle"}
            <input
              accept="image/*"
              disabled={uploading}
              onChange={(event) => uploadCoverImage(event.target.files?.[0] ?? null)}
              type="file"
            />
          </label>
        </section>

        <section className="admin-blog-seo-tools">
          <div className="admin-section-title compact">
            <p className="eyebrow">SEO</p>
            <h2>Arama görünümü</h2>
          </div>
          <div className="admin-form-grid two-column">
            <label>
              SEO başlığı
              <input
                onChange={(event) =>
                  updateSelectedPost((post) => ({
                    ...post,
                    seoTitle: event.target.value,
                  }))
                }
                value={selectedPost.seoTitle}
              />
            </label>
            <label>
              Odak kelime
              <input
                onChange={(event) =>
                  updateSelectedPost((post) => ({
                    ...post,
                    focusKeyword: event.target.value,
                  }))
                }
                value={selectedPost.focusKeyword}
              />
            </label>
            <label>
              Etiketler
              <input
                onChange={(event) =>
                  updateSelectedPost((post) => ({
                    ...post,
                    tags: parseTagsText(event.target.value),
                  }))
                }
                value={getTagsText(selectedPost)}
              />
            </label>
            <label>
              Okuma süresi
              <input readOnly value={`${selectedPost.readingTime} dk`} />
            </label>
          </div>
          <label className="admin-wide-field">
            SEO açıklaması
            <textarea
              onChange={(event) =>
                updateSelectedPost((post) => ({
                  ...post,
                  seoDescription: event.target.value,
                }))
              }
              value={selectedPost.seoDescription}
            />
          </label>
        </section>
      </div>
    </section>
  );
}
