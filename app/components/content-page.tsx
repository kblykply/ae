import { CatalogHeader } from "./catalog-header";
import { SiteFooter } from "./site-footer";

type ContentSection = {
  body: string[];
  items?: string[];
  title: string;
};

type ContentPageProps = {
  description: string;
  eyebrow?: string;
  sections: ContentSection[];
  title: string;
};

export function ContentPage({
  description,
  eyebrow = "Adem Eren Decoration",
  sections,
  title,
}: ContentPageProps) {
  return (
    <main className="site-shell legal-shell">
      <section className="legal-hero">
        <CatalogHeader />
        <div className="legal-hero-content">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{description}</p>
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
