import type { Metadata } from "next";
import Image from "next/image";
import { AdminDashboard } from "./admin-dashboard";
import { loginAdmin } from "./actions";
import {
  isAdminAuthenticated,
  isUsingDefaultAdminPassword,
} from "./auth";
import {
  getCatalogConnectionStatus,
  getManagedProducts,
} from "../data/catalog-store";
import { getManagedBlogPosts } from "../data/blog-posts";
import { getManagedLeads } from "../data/leads-store";
import { getManagedSiteContent } from "../data/site-content";

type AdminPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export const metadata: Metadata = {
  title: "Yönetim Paneli | Adem Eren Decoration",
  robots: {
    follow: false,
    index: false,
  },
};

export const dynamic = "force-dynamic";

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams;
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return (
      <main className="admin-shell admin-login-shell">
        <section className="admin-login-card">
          <Image
            alt="AE Dekorasyon logosu"
            height={95}
            priority
            src="/aelogo.png?v=3"
            width={215}
          />
          <div>
            <p className="eyebrow">Yönetim paneli</p>
            <h1>Katalog yönetimi</h1>
            <p>
              SPC parke, duvar paneli ve web sitesi katalog içeriklerini
              düzenlemek için giriş yapın.
            </p>
          </div>

          {params.error === "invalid" ? (
            <p className="admin-alert">Şifre doğru değil.</p>
          ) : null}

          <form action={loginAdmin} className="admin-login-form">
            <label htmlFor="admin-password">Şifre</label>
            <input
              autoComplete="current-password"
              id="admin-password"
              name="password"
              placeholder="Admin şifresini girin"
              required
              type="password"
            />
            <button type="submit">Giriş yap</button>
          </form>

          {isUsingDefaultAdminPassword() ? (
            <p className="admin-note">
              Başlangıç şifresi <strong>ademeren-admin</strong>. Yönetim
              panelini yayınlamadan önce Vercel üzerinde ADMIN_PASSWORD
              değerini ayarlayın.
            </p>
          ) : null}
        </section>
      </main>
    );
  }

  const [catalogStatus, products, siteContent, leads, blogPosts] = await Promise.all([
    getCatalogConnectionStatus(),
    getManagedProducts(),
    getManagedSiteContent(),
    getManagedLeads(),
    getManagedBlogPosts({ includeDrafts: true }),
  ]);

  return (
    <AdminDashboard
      blogPosts={blogPosts}
      catalogStatus={catalogStatus}
      isUsingDefaultPassword={isUsingDefaultAdminPassword()}
      leads={leads}
      products={products}
      siteContent={siteContent}
    />
  );
}
