import { promises as fs } from "node:fs";
import path from "node:path";
import type { Language, LocalizedText } from "./products";

export type HeroSlide = {
  background: string;
  code: string;
  description: LocalizedText;
  details: Record<Language, string[]>;
  kicker: LocalizedText;
  sample: string;
  surface: LocalizedText;
  title: LocalizedText;
};

export type SiteContent = {
  contactEmail: string;
  contactPhone: string;
  heroSlides: HeroSlide[];
  whatsappMessage: LocalizedText;
  whatsappNumber: string;
};

const siteContentFilePath = path.join(process.cwd(), "data", "site-content.json");
const backendBaseUrl = (process.env.BACKEND_URL ?? "").replace(/\/$/, "");
const backendAdminToken =
  process.env.BACKEND_ADMIN_TOKEN ??
  process.env.ADMIN_PASSWORD ??
  "ademeren-admin";

const getBackendEndpoint = (pathname: string) =>
  backendBaseUrl ? `${backendBaseUrl}${pathname}` : "";

export const defaultSiteContent: SiteContent = {
  contactEmail: "info@ademerendecoration.com",
  contactPhone: "+90 555 123 45 67",
  heroSlides: [
    {
      background: "/images/kermit-floor-application.jpg",
      code: "P-201",
      description: {
        en: "Bright oak SPC flooring for North Cyprus homes, showrooms, and office interiors with a clean whole-room finish.",
        tr: "Kuzey Kıbrıs ev, showroom ve ofis projeleri için ferah, bütünlüklü bir SPC parke etkisi.",
      },
      details: {
        en: ["5/7 mm thickness", "UniClic system", "Waterproof SPC core"],
        tr: ["5/7 mm kalınlık", "UniClic sistem", "Suya dayanıklı SPC çekirdek"],
      },
      kicker: {
        en: "Elit SPC Flooring",
        tr: "Elit SPC Parke",
      },
      sample: "/images/kermit-elite-p201.jpg",
      surface: {
        en: "Light matte oak",
        tr: "Açık mat meşe",
      },
      title: {
        en: "Bleached Oak",
        tr: "Bleached Oak",
      },
    },
    {
      background: "/images/kermit-wall-application.jpg",
      code: "613",
      description: {
        en: "Large-format SPC wall panel for North Cyprus bathrooms, wet areas, and feature walls without visual clutter.",
        tr: "Kıbrıs banyo, ıslak hacim ve vurgu duvarları için sade görünümlü geniş SPC panel.",
      },
      details: {
        en: ["Glue-down install", "Large wall format", "Fast renovation"],
        tr: ["Yapıştırma montaj", "Geniş duvar formatı", "Hızlı yenileme"],
      },
      kicker: {
        en: "SPC Wall Panel",
        tr: "SPC Duvar Paneli",
      },
      sample: "/images/kermit-wall-panel-613.jpg",
      surface: {
        en: "Stone wall panel",
        tr: "Taş görünümlü panel",
      },
      title: {
        en: "Waterproof wall finish",
        tr: "Suya dayanıklı SPC panel",
      },
    },
    {
      background: "/images/kermit-elite-p220.jpg",
      code: "P-220",
      description: {
        en: "A deep walnut floor tone for premium homes, offices, and hospitality projects.",
        tr: "Prestijli ev, ofis ve otel projeleri için koyu ceviz zemin tonu.",
      },
      details: {
        en: ["Matte surface", "Impact resistant", "Project finish"],
        tr: ["Mat panel dokusu", "Darbeye dayanıklı", "Proje tipi bitiş"],
      },
      kicker: {
        en: "Elit SPC Flooring",
        tr: "Elit SPC Parke",
      },
      sample: "/images/kermit-elite-p220.jpg",
      surface: {
        en: "Dark walnut oak",
        tr: "Koyu ceviz meşe",
      },
      title: {
        en: "Dark Walnut Oak",
        tr: "Dark Walnut Oak",
      },
    },
    {
      background: "/images/kermit-3d-model-a-205.jpg",
      code: "3D-205",
      description: {
        en: "Dimensional panel rhythm for walls, counters, entrances, and focal areas.",
        tr: "Duvar, banko, giriş ve odak alanları için boyutlu panel ritmi.",
      },
      details: {
        en: ["3D profile", "SPC material", "Decorative wall use"],
        tr: ["3D profil", "SPC malzeme", "Dekoratif duvar kullanımı"],
      },
      kicker: {
        en: "SPC 3D Panel",
        tr: "SPC 3D Panel",
      },
      sample: "/images/kermit-3d-model-a-205.jpg",
      surface: {
        en: "Textured panel",
        tr: "Dokulu panel",
      },
      title: {
        en: "Model A texture",
        tr: "Model A doku",
      },
    },
  ],
  whatsappMessage: {
    en: "Hello, I want information about SPC panels.",
    tr: "Merhaba, SPC paneller hakkında bilgi almak istiyorum.",
  },
  whatsappNumber: "905551234567",
};

const toText = (value: unknown, fallback = "") =>
  typeof value === "string" ? value.trim() : fallback;

const toTextList = (value: unknown) =>
  Array.isArray(value)
    ? value.map((item) => toText(item)).filter(Boolean)
    : [];

const toLocalizedText = (
  value: unknown,
  fallback: LocalizedText,
): LocalizedText => {
  const candidate = value as Partial<Record<Language, unknown>> | undefined;

  return {
    en: toText(candidate?.en, fallback.en),
    tr: toText(candidate?.tr, fallback.tr),
  };
};

const normalizeHeroSlide = (value: unknown, index: number): HeroSlide => {
  const candidate = value as Partial<HeroSlide> | undefined;
  const fallback = defaultSiteContent.heroSlides[index] ??
    defaultSiteContent.heroSlides[0];

  return {
    background: toText(candidate?.background, fallback.background),
    code: toText(candidate?.code, fallback.code || `SLIDE-${index + 1}`),
    description: toLocalizedText(candidate?.description, fallback.description),
    details: {
      en: toTextList(candidate?.details?.en).length
        ? toTextList(candidate?.details?.en)
        : fallback.details.en,
      tr: toTextList(candidate?.details?.tr).length
        ? toTextList(candidate?.details?.tr)
        : fallback.details.tr,
    },
    kicker: toLocalizedText(candidate?.kicker, fallback.kicker),
    sample: toText(candidate?.sample, fallback.sample),
    surface: toLocalizedText(candidate?.surface, fallback.surface),
    title: toLocalizedText(candidate?.title, fallback.title),
  };
};

export function normalizeSiteContent(value: unknown): SiteContent {
  const candidate = value as Partial<SiteContent> | undefined;
  const rawSlides =
    Array.isArray(candidate?.heroSlides) && candidate.heroSlides.length > 0
      ? candidate.heroSlides
      : defaultSiteContent.heroSlides;

  return {
    contactEmail: toText(candidate?.contactEmail, defaultSiteContent.contactEmail),
    contactPhone: toText(candidate?.contactPhone, defaultSiteContent.contactPhone),
    heroSlides: rawSlides.map((slide, index) =>
      normalizeHeroSlide(slide, index),
    ),
    whatsappMessage: toLocalizedText(
      candidate?.whatsappMessage,
      defaultSiteContent.whatsappMessage,
    ),
    whatsappNumber: toText(
      candidate?.whatsappNumber,
      defaultSiteContent.whatsappNumber,
    ),
  };
}

export function getWhatsAppUrl(siteContent: SiteContent, language: Language) {
  const phone = siteContent.whatsappNumber.replace(/\D/g, "");
  const message = encodeURIComponent(siteContent.whatsappMessage[language]);

  return `https://wa.me/${phone}?text=${message}`;
}

async function getBackendSiteContent() {
  const endpoint = getBackendEndpoint("/api/site-content");

  if (!endpoint) {
    return null;
  }

  try {
    const response = await fetch(endpoint, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Sunucu ${response.status} döndürdü`);
    }

    const payload = (await response.json()) as { siteContent?: unknown };

    return normalizeSiteContent(payload.siteContent);
  } catch (error) {
    const backendError = error as Error;
    console.warn("Yerel site içeriğine geçiliyor:", backendError.message);

    return null;
  }
}

export async function getManagedSiteContent() {
  const backendSiteContent = await getBackendSiteContent();

  if (backendSiteContent) {
    return backendSiteContent;
  }

  try {
    const file = await fs.readFile(siteContentFilePath, "utf8");
    return normalizeSiteContent(JSON.parse(file));
  } catch (error) {
    const fileError = error as NodeJS.ErrnoException;

    if (fileError.code !== "ENOENT") {
      console.warn("Başlangıç site içeriğine geçiliyor:", fileError.message);
    }

    return defaultSiteContent;
  }
}

export async function saveManagedSiteContent(siteContent: unknown) {
  const normalizedSiteContent = normalizeSiteContent(siteContent);
  const endpoint = getBackendEndpoint("/api/site-content");

  if (endpoint) {
    const response = await fetch(endpoint, {
      body: JSON.stringify({ siteContent: normalizedSiteContent }),
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": backendAdminToken,
      },
      method: "PUT",
    });
    const payload = (await response.json()) as {
      message?: string;
      siteContent?: unknown;
    };

    if (!response.ok) {
      throw new Error(payload.message || `Sunucu ${response.status} döndürdü`);
    }

    return normalizeSiteContent(payload.siteContent);
  }

  await fs.mkdir(path.dirname(siteContentFilePath), { recursive: true });
  await fs.writeFile(
    siteContentFilePath,
    `${JSON.stringify(normalizedSiteContent, null, 2)}\n`,
    "utf8",
  );

  return normalizedSiteContent;
}

export async function resetManagedSiteContent() {
  const endpoint = getBackendEndpoint("/api/site-content/reset");

  if (endpoint) {
    const response = await fetch(endpoint, {
      body: JSON.stringify({ action: "reset" }),
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": backendAdminToken,
      },
      method: "POST",
    });
    const payload = (await response.json()) as {
      message?: string;
      siteContent?: unknown;
    };

    if (!response.ok) {
      throw new Error(payload.message || `Sunucu ${response.status} döndürdü`);
    }

    return normalizeSiteContent(payload.siteContent);
  }

  await fs.mkdir(path.dirname(siteContentFilePath), { recursive: true });
  await fs.writeFile(
    siteContentFilePath,
    `${JSON.stringify(defaultSiteContent, null, 2)}\n`,
    "utf8",
  );

  return defaultSiteContent;
}
