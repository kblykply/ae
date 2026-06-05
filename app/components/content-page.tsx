"use client";

import { useState } from "react";
import { CatalogHeader } from "./catalog-header";
import { SiteFooter } from "./site-footer";

type Language = "en" | "tr";

type ContentSection = {
  body: Record<Language, string[]>;
  items?: Record<Language, string[]>;
  title: Record<Language, string>;
};

type ContentPageProps = {
  defaultLanguage?: Language;
  description: Record<Language, string>;
  eyebrow?: string;
  sections: ContentSection[];
  title: Record<Language, string>;
};

export function ContentPage({
  defaultLanguage = "tr",
  description,
  eyebrow = "Adem Eren Decoration",
  sections,
  title,
}: ContentPageProps) {
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  return (
    <main className="site-shell legal-shell">
      <section className="legal-hero">
        <CatalogHeader
          language={language}
          onLanguageChange={setLanguage}
        />
        <div className="legal-hero-content">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title[language]}</h1>
          <p>{description[language]}</p>
        </div>
      </section>

      <section className="legal-document">
        {sections.map((section) => (
          <article className="legal-section" key={section.title.en}>
            <h2>{section.title[language]}</h2>
            {section.body[language].map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.items ? (
              <ul>
                {section.items[language].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </section>

      <SiteFooter language={language} />
    </main>
  );
}
