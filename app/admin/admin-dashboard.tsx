"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { logoutAdmin } from "./actions";
import { BlogAdminPanel } from "./blog-admin-panel";
import { LeadInboxPanel } from "./lead-inbox-panel";
import { AdminPanel } from "./product-admin-panel";
import { SiteContentAdminPanel } from "./site-content-admin-panel";
import type { BlogPost } from "../data/blog-posts";
import type { CatalogConnectionStatus } from "../data/catalog-store";
import type { Lead } from "../data/leads-store";
import type { SiteContent } from "../data/site-content";
import {
  productCategories,
  type Product,
} from "../data/products";

type DashboardSection =
  | "overview"
  | "products"
  | "homepage"
  | "blog"
  | "requests";

type AdminDashboardProps = {
  blogPosts: BlogPost[];
  catalogStatus: CatalogConnectionStatus;
  leads: Lead[];
  products: Product[];
  siteContent: SiteContent;
};

const sectionLabels: Record<DashboardSection, string> = {
  blog: "Blog",
  homepage: "Ana Sayfa",
  overview: "Genel Bakış",
  products: "Ürünler",
  requests: "Talepler",
};

const sectionDescriptions: Record<DashboardSection, string> = {
  blog: "SEO blog yazılarını oluşturun, düzenleyin ve yayınlayın.",
  homepage: "Slider, WhatsApp, telefon ve e-posta bilgilerini düzenleyin.",
  overview: "Web sitesi kontrol panelinin hızlı durum özeti.",
  products: "SPC parke ve duvar paneli katalog ürünlerini yönetin.",
  requests: "Web sitesinden gelen numune taleplerini inceleyin.",
};

export function AdminDashboard({
  blogPosts,
  catalogStatus,
  leads,
  products,
  siteContent,
}: AdminDashboardProps) {
  const [activeSection, setActiveSection] =
    useState<DashboardSection>("overview");
  const productStats = useMemo(
    () =>
      productCategories.map((category) => ({
        label: category.label.tr,
        total: products.filter((product) => product.category === category.slug)
          .length,
      })),
    [products],
  );
  const leadStats = useMemo(
    () => ({
      contacted: leads.filter((lead) => lead.status === "contacted").length,
      new: leads.filter((lead) => lead.status === "new").length,
      total: leads.length,
    }),
    [leads],
  );
  const sections: DashboardSection[] = [
    "overview",
    "products",
    "homepage",
    "blog",
    "requests",
  ];

  return (
    <main className="admin-dashboard">
      <aside className="dashboard-sidebar" aria-label="Admin navigasyonu">
        <Link className="dashboard-brand" href="/">
          <Image
            alt="AE Dekorasyon logosu"
            height={95}
            priority
            src="/aelogo.png?v=3"
            width={215}
          />
          <span>AE Dekorasyon</span>
        </Link>

        <nav className="dashboard-nav">
          {sections.map((section) => (
            <button
              aria-current={activeSection === section ? "page" : undefined}
              className={activeSection === section ? "is-active" : ""}
              key={section}
              onClick={() => setActiveSection(section)}
              type="button"
            >
              <span>{sectionLabels[section]}</span>
              <small>{sectionDescriptions[section]}</small>
            </button>
          ))}
        </nav>

        <div className="dashboard-sidebar-card">
          <span>{catalogStatus.mode === "backend" ? "Sunucu" : "Yerel"}</span>
          <strong>{catalogStatus.ok ? "Bağlı" : "Kontrol gerekli"}</strong>
          <small>{catalogStatus.backendUrl ?? "Yerel JSON depolama"}</small>
        </div>
      </aside>

      <section className="dashboard-main">
        <header className="dashboard-topbar">
          <div>
            <p className="eyebrow">Web sitesi kontrol paneli</p>
            <h1>{sectionLabels[activeSection]}</h1>
            <span>{sectionDescriptions[activeSection]}</span>
          </div>

          <div className="dashboard-actions">
            <Link href="/" target="_blank">
              Siteyi görüntüle
            </Link>
            <form action={logoutAdmin}>
              <button type="submit">Çıkış yap</button>
            </form>
          </div>
        </header>

        <section
          className="dashboard-section dashboard-overview"
          hidden={activeSection !== "overview"}
        >
          <div className="dashboard-card-grid">
            <article>
              <span>{products.length}</span>
              <h2>Toplam ürün</h2>
              <p>Web sitesinde görünen SPC katalog ürünleri.</p>
            </article>
            <article>
              <span>{siteContent.heroSlides.length}</span>
              <h2>Slider görselleri</h2>
              <p>Panelden yönetilen ana sayfa slider içerikleri.</p>
            </article>
            <article>
              <span>{blogPosts.length}</span>
              <h2>Blog yazıları</h2>
              <p>
                {blogPosts.filter((post) => post.status === "published").length}{" "}
                yazı yayında.
              </p>
            </article>
            <article>
              <span>{leadStats.total}</span>
              <h2>Numune talepleri</h2>
              <p>
                {leadStats.new} yeni, {leadStats.contacted} iletişime geçildi.
              </p>
            </article>
            <article className={catalogStatus.ok ? "is-good" : "is-warning"}>
              <span>{catalogStatus.ok ? "Aktif" : "!"}</span>
              <h2>Veri kaynağı</h2>
              <p>{catalogStatus.message}</p>
            </article>
          </div>

          <div className="dashboard-management-grid">
            <section>
              <div className="admin-section-title">
                <p className="eyebrow">Katalog</p>
                <h2>Ürün kategorileri</h2>
              </div>
              <div className="dashboard-mini-list">
                {productStats.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setActiveSection("products")}
                    type="button"
                  >
                    <span>{item.label}</span>
                    <strong>{item.total}</strong>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <div className="admin-section-title">
                <p className="eyebrow">Hızlı işlemler</p>
                <h2>Web sitesini yönetin</h2>
              </div>
              <div className="dashboard-quick-actions">
                <button
                  onClick={() => setActiveSection("products")}
                  type="button"
                >
                  Ürünleri düzenle
                </button>
                <button
                  onClick={() => setActiveSection("homepage")}
                  type="button"
                >
                  Ana sayfayı düzenle
                </button>
                <button
                  onClick={() => setActiveSection("blog")}
                  type="button"
                >
                  Blog yazısı ekle
                </button>
                <button
                  onClick={() => setActiveSection("requests")}
                  type="button"
                >
                  Talepleri görüntüle
                </button>
              </div>
            </section>
          </div>
        </section>

        <section
          className="dashboard-section"
          hidden={activeSection !== "products"}
        >
          <AdminPanel
            catalogStatus={catalogStatus}
            categories={[...productCategories]}
            initialProducts={products}
          />
        </section>

        <section
          className="dashboard-section"
          hidden={activeSection !== "homepage"}
        >
          <SiteContentAdminPanel initialSiteContent={siteContent} />
        </section>

        <section
          className="dashboard-section"
          hidden={activeSection !== "blog"}
        >
          <BlogAdminPanel initialPosts={blogPosts} />
        </section>

        <section
          className="dashboard-section"
          hidden={activeSection !== "requests"}
        >
          <LeadInboxPanel initialLeads={leads} />
        </section>
      </section>
    </main>
  );
}
