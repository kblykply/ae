"use client";

import { useState } from "react";
import type { HeroSlide, SiteContent } from "../data/site-content";
import type { Language, LocalizedText } from "../data/products";

type SaveStatus = {
  tone: "idle" | "success" | "error";
  text: string;
};

type SiteContentAdminPanelProps = {
  initialSiteContent: SiteContent;
};

const splitLines = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

const copyLocalized = (value: LocalizedText): LocalizedText => ({
  en: value.en,
  tr: value.tr,
});

const createSlide = (): HeroSlide => ({
  background: "/images/kermit-floor-application.jpg",
  code: `SLIDE-${Date.now().toString().slice(-4)}`,
  description: {
    en: "Editable hero slide description.",
    tr: "Düzenlenebilir slider açıklaması.",
  },
  details: {
    en: ["SPC material", "Project finish", "Sample selection"],
    tr: ["SPC malzeme", "Proje bitişi", "Numune seçimi"],
  },
  kicker: {
    en: "SPC Finish",
    tr: "SPC Panel",
  },
  sample: "/images/kermit-elite-p201.jpg",
  surface: {
    en: "Editable surface",
    tr: "Düzenlenebilir panel",
  },
  title: {
    en: "New hero slide",
    tr: "Yeni slider",
  },
});

export function SiteContentAdminPanel({
  initialSiteContent,
}: SiteContentAdminPanelProps) {
  const [siteContent, setSiteContent] = useState(initialSiteContent);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);
  const [busy, setBusy] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [status, setStatus] = useState<SaveStatus>({
    tone: "idle",
    text: "Site içeriği hazır",
  });
  const selectedSlide =
    siteContent.heroSlides[selectedSlideIndex] ?? siteContent.heroSlides[0];

  const updateSiteContent = (updater: (content: SiteContent) => SiteContent) => {
    setSiteContent((currentContent) => updater(currentContent));
    setHasUnsavedChanges(true);
  };

  const updateContentField = <Key extends keyof SiteContent>(
    field: Key,
    value: SiteContent[Key],
  ) => {
    updateSiteContent((content) => ({
      ...content,
      [field]: value,
    }));
  };

  const updateWhatsAppMessage = (language: Language, value: string) => {
    updateSiteContent((content) => ({
      ...content,
      whatsappMessage: {
        ...content.whatsappMessage,
        [language]: value,
      },
    }));
  };

  const updateSlide = (updater: (slide: HeroSlide) => HeroSlide) => {
    updateSiteContent((content) => ({
      ...content,
      heroSlides: content.heroSlides.map((slide, index) =>
        index === selectedSlideIndex ? updater(slide) : slide,
      ),
    }));
  };

  const updateSlideField = <Key extends keyof HeroSlide>(
    field: Key,
    value: HeroSlide[Key],
  ) => {
    updateSlide((slide) => ({
      ...slide,
      [field]: value,
    }));
  };

  const updateSlideLocalizedField = (
    field: "description" | "kicker" | "surface" | "title",
    language: Language,
    value: string,
  ) => {
    updateSlide((slide) => ({
      ...slide,
      [field]: {
        ...slide[field],
        [language]: value,
      },
    }));
  };

  const addSlide = () => {
    updateSiteContent((content) => ({
      ...content,
      heroSlides: [createSlide(), ...content.heroSlides],
    }));
    setSelectedSlideIndex(0);
    setStatus({ tone: "idle", text: "Yeni slider eklendi" });
  };

  const duplicateSlide = () => {
    if (!selectedSlide) {
      return;
    }

    const duplicate = {
      ...selectedSlide,
      code: `${selectedSlide.code}-COPY`,
      description: copyLocalized(selectedSlide.description),
      details: {
        en: [...selectedSlide.details.en],
        tr: [...selectedSlide.details.tr],
      },
      kicker: copyLocalized(selectedSlide.kicker),
      surface: copyLocalized(selectedSlide.surface),
      title: {
        en: `${selectedSlide.title.en} Copy`,
        tr: `${selectedSlide.title.tr} Kopya`,
      },
    };

    updateSiteContent((content) => ({
      ...content,
      heroSlides: [
        ...content.heroSlides.slice(0, selectedSlideIndex + 1),
        duplicate,
        ...content.heroSlides.slice(selectedSlideIndex + 1),
      ],
    }));
    setSelectedSlideIndex(selectedSlideIndex + 1);
    setStatus({ tone: "idle", text: "Slider kopyalandı" });
  };

  const deleteSlide = () => {
    if (siteContent.heroSlides.length <= 1) {
      setStatus({
        tone: "error",
        text: "En az bir slider gerekli.",
      });
      return;
    }

    const confirmed = window.confirm(`${selectedSlide.code} silinsin mi?`);

    if (!confirmed) {
      return;
    }

    updateSiteContent((content) => ({
      ...content,
      heroSlides: content.heroSlides.filter(
        (_, index) => index !== selectedSlideIndex,
      ),
    }));
    setSelectedSlideIndex(Math.max(0, selectedSlideIndex - 1));
    setStatus({ tone: "idle", text: "Slider taslaktan kaldırıldı" });
  };

  const exportSiteContent = () => {
    const blob = new Blob([`${JSON.stringify(siteContent, null, 2)}\n`], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "adem-eren-site-content.json";
    link.click();
    URL.revokeObjectURL(url);
    setStatus({ tone: "success", text: "Site içeriği dışa aktarıldı" });
  };

  const importSiteContent = async (file: File | null) => {
    if (!file) {
      return;
    }

    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as unknown;
      const nextSiteContent =
        (parsed as { siteContent?: unknown }).siteContent ?? parsed;

      if (
        !nextSiteContent ||
        !Array.isArray((nextSiteContent as SiteContent).heroSlides)
      ) {
        throw new Error("İçe aktarım dosyası slider içerikleri barındırmalı.");
      }

      setSiteContent(nextSiteContent as SiteContent);
      setSelectedSlideIndex(0);
      setHasUnsavedChanges(true);
      setStatus({
        tone: "success",
        text: "Site içeriği içe aktarıldı. Kontrol edip kaydedin.",
      });
    } catch (error) {
      const importError = error as Error;
      setStatus({
        tone: "error",
        text: importError.message || "Site içeriği içe aktarılamadı.",
      });
    }
  };

  const saveSiteContent = async () => {
    setBusy(true);
    setStatus({ tone: "idle", text: "Site içeriği kaydediliyor..." });

    try {
      const response = await fetch("/api/admin/site-content", {
        body: JSON.stringify({ siteContent }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      });
      const body = (await response.json()) as {
        message?: string;
        siteContent?: SiteContent;
      };

      if (!response.ok || !body.siteContent) {
        throw new Error(body.message || "Site içeriği kaydedilemedi.");
      }

      setSiteContent(body.siteContent);
      setSelectedSlideIndex(Math.min(selectedSlideIndex, body.siteContent.heroSlides.length - 1));
      setHasUnsavedChanges(false);
      setStatus({ tone: "success", text: "Site içeriği kaydedildi" });
    } catch (error) {
      const saveError = error as Error;
      setStatus({
        tone: "error",
        text: saveError.message || "Site içeriği kaydedilemedi.",
      });
    } finally {
      setBusy(false);
    }
  };

  const resetSiteContent = async () => {
    const confirmed = window.confirm("Ana sayfa içeriği başlangıç değerlerine sıfırlansın mı?");

    if (!confirmed) {
      return;
    }

    setBusy(true);
    setStatus({ tone: "idle", text: "Site içeriği sıfırlanıyor..." });

    try {
      const response = await fetch("/api/admin/site-content", {
        body: JSON.stringify({ action: "reset" }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const body = (await response.json()) as {
        message?: string;
        siteContent?: SiteContent;
      };

      if (!response.ok || !body.siteContent) {
        throw new Error(body.message || "Site içeriği sıfırlanamadı.");
      }

      setSiteContent(body.siteContent);
      setSelectedSlideIndex(0);
      setHasUnsavedChanges(false);
      setStatus({ tone: "success", text: "Site içeriği sıfırlandı" });
    } catch (error) {
      const resetError = error as Error;
      setStatus({
        tone: "error",
        text: resetError.message || "Site içeriği sıfırlanamadı.",
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="admin-panel admin-content-panel">
      <aside className="admin-sidebar">
        <div className="admin-section-title">
          <p className="eyebrow">Ana sayfa CMS</p>
          <h2>Site içeriği</h2>
        </div>

        <div className="admin-toolbar">
          <button onClick={addSlide} type="button">
            Slider ekle
          </button>
          <button onClick={duplicateSlide} type="button">
            Kopyala
          </button>
          <button onClick={deleteSlide} type="button">
            Sil
          </button>
          <button onClick={exportSiteContent} type="button">
            JSON dışa aktar
          </button>
          <label className="admin-import-button">
            JSON içe aktar
            <input
              accept="application/json"
              onChange={(event) => {
                void importSiteContent(event.target.files?.[0] ?? null);
                event.target.value = "";
              }}
              type="file"
            />
          </label>
          <button disabled={busy} onClick={saveSiteContent} type="button">
            {busy ? "Kaydediliyor..." : "İçeriği kaydet"}
          </button>
          <button disabled={busy} onClick={resetSiteContent} type="button">
            Sıfırla
          </button>
        </div>

        <div className="admin-product-list">
          {siteContent.heroSlides.map((slide, index) => (
            <button
              className={index === selectedSlideIndex ? "is-active" : ""}
              key={`${slide.code}-${index}`}
              onClick={() => setSelectedSlideIndex(index)}
              type="button"
            >
              <span>{slide.code}</span>
              <strong>{slide.title.tr}</strong>
              <small>{slide.kicker.tr}</small>
            </button>
          ))}
        </div>
      </aside>

      <div className="admin-editor">
        <div className={`admin-status is-${status.tone}`}>
          <span>{status.text}</span>
          <strong>
            {hasUnsavedChanges ? "Kaydedilmemiş değişiklikler" : "Kaydedildi"} · Ana sayfa
          </strong>
        </div>

        <div className="admin-form-grid">
          <label>
            WhatsApp numarası
            <input
              onChange={(event) =>
                updateContentField("whatsappNumber", event.target.value)
              }
              value={siteContent.whatsappNumber}
            />
          </label>
          <label>
            İletişim telefonu
            <input
              onChange={(event) =>
                updateContentField("contactPhone", event.target.value)
              }
              value={siteContent.contactPhone}
            />
          </label>
          <label>
            İletişim e-postası
            <input
              onChange={(event) =>
                updateContentField("contactEmail", event.target.value)
              }
              value={siteContent.contactEmail}
            />
          </label>
        </div>

        <div className="admin-form-grid two-column">
          <label>
            WhatsApp mesajı EN
            <textarea
              onChange={(event) =>
                updateWhatsAppMessage("en", event.target.value)
              }
              rows={3}
              value={siteContent.whatsappMessage.en}
            />
          </label>
          <label>
            WhatsApp mesajı TR
            <textarea
              onChange={(event) =>
                updateWhatsAppMessage("tr", event.target.value)
              }
              rows={3}
              value={siteContent.whatsappMessage.tr}
            />
          </label>
        </div>

        <div className="admin-section-title compact">
          <p className="eyebrow">Ana slider</p>
          <h2>{selectedSlide.title.tr}</h2>
        </div>

        <div className="admin-form-grid">
          <label>
            Slider kodu
            <input
              onChange={(event) => updateSlideField("code", event.target.value)}
              value={selectedSlide.code}
            />
          </label>
          <label>
            Arka plan görseli
            <input
              onChange={(event) =>
                updateSlideField("background", event.target.value)
              }
              value={selectedSlide.background}
            />
          </label>
          <label>
            Numune görseli
            <input
              onChange={(event) =>
                updateSlideField("sample", event.target.value)
              }
              value={selectedSlide.sample}
            />
          </label>
        </div>

        <div className="admin-form-grid two-column">
          <label>
            Üst başlık EN
            <input
              onChange={(event) =>
                updateSlideLocalizedField("kicker", "en", event.target.value)
              }
              value={selectedSlide.kicker.en}
            />
          </label>
          <label>
            Üst başlık TR
            <input
              onChange={(event) =>
                updateSlideLocalizedField("kicker", "tr", event.target.value)
              }
              value={selectedSlide.kicker.tr}
            />
          </label>
          <label>
            Başlık EN
            <input
              onChange={(event) =>
                updateSlideLocalizedField("title", "en", event.target.value)
              }
              value={selectedSlide.title.en}
            />
          </label>
          <label>
            Başlık TR
            <input
              onChange={(event) =>
                updateSlideLocalizedField("title", "tr", event.target.value)
              }
              value={selectedSlide.title.tr}
            />
          </label>
          <label>
            Panel/Yüzey EN
            <input
              onChange={(event) =>
                updateSlideLocalizedField("surface", "en", event.target.value)
              }
              value={selectedSlide.surface.en}
            />
          </label>
          <label>
            Panel/Yüzey TR
            <input
              onChange={(event) =>
                updateSlideLocalizedField("surface", "tr", event.target.value)
              }
              value={selectedSlide.surface.tr}
            />
          </label>
          <label>
            Açıklama EN
            <textarea
              onChange={(event) =>
                updateSlideLocalizedField(
                  "description",
                  "en",
                  event.target.value,
                )
              }
              rows={4}
              value={selectedSlide.description.en}
            />
          </label>
          <label>
            Açıklama TR
            <textarea
              onChange={(event) =>
                updateSlideLocalizedField(
                  "description",
                  "tr",
                  event.target.value,
                )
              }
              rows={4}
              value={selectedSlide.description.tr}
            />
          </label>
          <label>
            Detay etiketleri EN
            <textarea
              onChange={(event) =>
                updateSlideField("details", {
                  ...selectedSlide.details,
                  en: splitLines(event.target.value),
                })
              }
              rows={4}
              value={selectedSlide.details.en.join("\n")}
            />
          </label>
          <label>
            Detay etiketleri TR
            <textarea
              onChange={(event) =>
                updateSlideField("details", {
                  ...selectedSlide.details,
                  tr: splitLines(event.target.value),
                })
              }
              rows={4}
              value={selectedSlide.details.tr.join("\n")}
            />
          </label>
        </div>
      </div>
    </section>
  );
}
