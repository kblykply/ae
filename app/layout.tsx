import type { Metadata } from "next";
import {
  getManagedSiteContent,
  getWhatsAppUrl,
} from "./data/site-content";
import {
  createLocalBusinessJsonLd,
  defaultOgImage,
  defaultSeoDescription,
  homeServiceJsonLd,
  jsonLdScriptProps,
  localSeoKeywords,
  websiteJsonLd,
} from "./seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://ademerendecoration.com",
  ),
  applicationName: "Adem Eren Decoration",
  category: "Decoration and construction materials",
  creator: "Adem Eren Decoration",
  title: {
    default: "Kuzey Kıbrıs SPC Panel ve Dekorasyon | Adem Eren Decoration",
    template: "%s | Adem Eren Decoration",
  },
  description: defaultSeoDescription,
  alternates: {
    canonical: "/",
  },
  keywords: localSeoKeywords,
  openGraph: {
    description: defaultSeoDescription,
    images: [
      {
        alt: "Kuzey Kıbrıs SPC panel ve dekorasyon uygulaması",
        height: 900,
        url: defaultOgImage,
        width: 1600,
      },
    ],
    locale: "tr_CY",
    siteName: "Adem Eren Decoration",
    title: "Kuzey Kıbrıs SPC Panel ve Dekorasyon",
    type: "website",
  },
  publisher: "Adem Eren Decoration",
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    index: true,
  },
  twitter: {
    card: "summary_large_image",
    description: defaultSeoDescription,
    images: [defaultOgImage],
    title: "Kuzey Kıbrıs SPC Panel ve Dekorasyon",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteContent = await getManagedSiteContent();
  const siteJsonLd = [
    createLocalBusinessJsonLd(siteContent),
    websiteJsonLd,
    homeServiceJsonLd,
  ];

  return (
    <html lang="tr" className="h-full antialiased">
      <body className="min-h-full">
        <script
          dangerouslySetInnerHTML={jsonLdScriptProps(siteJsonLd)}
          type="application/ld+json"
        />
        <a
          aria-label="WhatsApp ile iletişime geç"
          className="whatsapp-float"
          href={getWhatsAppUrl(siteContent, "tr")}
          rel="noreferrer"
          target="_blank"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.94L2 22l5.28-1.38a9.85 9.85 0 0 0 4.76 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm5.82 14.17c-.25.7-1.44 1.34-2.03 1.39-.52.05-1.18.07-1.91-.12-.44-.12-1-.33-1.72-.64-3.02-1.3-5-4.32-5.15-4.52-.15-.2-1.23-1.64-1.23-3.13s.78-2.22 1.06-2.52c.28-.3.61-.38.81-.38h.58c.18.01.44-.07.69.53.25.6.85 2.08.92 2.23.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.18-.32.4-.45.54-.15.15-.31.32-.13.62.18.3.79 1.3 1.69 2.1 1.16 1.04 2.14 1.36 2.45 1.51.31.15.49.13.67-.08.18-.2.77-.9.98-1.21.2-.31.41-.26.69-.15.28.1 1.78.84 2.09.99.31.15.51.23.59.36.07.13.07.75-.18 1.45Z" />
          </svg>
          <span>WhatsApp</span>
        </a>
        {children}
      </body>
    </html>
  );
}
