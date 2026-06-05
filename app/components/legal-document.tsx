import { CatalogHeader } from "./catalog-header";
import { SiteFooter } from "./site-footer";

type LegalSection = {
  body: string[];
  items?: string[];
  title: string;
};

type LegalDocumentProps = {
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
  title: string;
};

export function LegalDocument({
  description,
  lastUpdated,
  sections,
  title,
}: LegalDocumentProps) {
  return (
    <main className="site-shell legal-shell">
      <section className="legal-hero">
        <CatalogHeader />
        <div className="legal-hero-content">
          <p className="eyebrow">Adem Eren Decoration</p>
          <h1>{title}</h1>
          <p>{description}</p>
          <span>Last updated: {lastUpdated}</span>
        </div>
      </section>

      <section className="legal-document">
        {sections.map((section) => (
          <article className="legal-section" key={section.title}>
            <h2>{section.title}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.items ? (
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </section>

      <SiteFooter />
    </main>
  );
}
