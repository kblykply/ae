import type { Metadata } from "next";
import { LegalDocument } from "../components/legal-document";

export const metadata: Metadata = {
  title: "Terms & Conditions | Adem Eren Decoration",
  description:
    "Terms and Conditions for using the Adem Eren Decoration website and requesting SPC floor and wall panel project information.",
};

const termsSections = [
  {
    title: "Website use",
    body: [
      "This website is provided by Adem Eren Decoration to present SPC floor panels, SPC wall panels, 3D panel finishes, project inspiration, sample requests, and contact options.",
      "By using the website, you agree to use it lawfully and only for personal, project, or business inquiry purposes related to interior finish selection and installation planning.",
    ],
  },
  {
    title: "No online sales checkout",
    body: [
      "The website is not an online furniture or product checkout store. Products shown on the website are presented for finish selection, sample requests, project discussion, and quotation planning.",
      "A quote, sample request, product reservation, installation date, or order is not confirmed until Adem Eren Decoration confirms it directly in writing or through agreed communication.",
    ],
  },
  {
    title: "Product information",
    body: [
      "Images, colors, product names, technical notes, and collection details are provided for general guidance. Screen colors, lighting, batch differences, and installation conditions can affect the final appearance.",
      "Availability, specifications, dimensions, collection names, and supplier information may change. Final project decisions should be based on current samples, measurements, technical sheets, and direct confirmation.",
    ],
  },
  {
    title: "Quotes, measurements, and installation",
    body: [
      "Project pricing depends on the selected product, quantity, site measurements, preparation needs, installation scope, location, timing, and other practical details.",
      "Any project agreement, payment schedule, delivery condition, warranty detail, or installation responsibility should be confirmed separately before work begins.",
    ],
  },
  {
    title: "Your responsibilities",
    body: [
      "When you contact us, you agree to provide accurate contact details and project information. You are responsible for reviewing samples, checking measurements, confirming site conditions, and making sure the selected finish is suitable for your project.",
    ],
    items: [
      "Do not misuse the website, forms, links, or contact options.",
      "Do not send unlawful, misleading, or harmful content.",
      "Do not copy website content, logos, images, or layouts without permission.",
    ],
  },
  {
    title: "Third-party links and materials",
    body: [
      "The website may link to supplier pages, product sources, messaging services, or other third-party websites. Adem Eren Decoration is not responsible for third-party websites, their content, their policies, or their service availability.",
    ],
  },
  {
    title: "Intellectual property",
    body: [
      "The Adem Eren Decoration name, AE Dekorasyon logo, website layout, text, and design elements are protected by their respective owners. Product photos, supplier names, and source materials remain the property of their respective owners.",
    ],
  },
  {
    title: "Limitation of liability",
    body: [
      "The website is provided for general information and project inquiry. We work to keep the content useful and current, but we do not guarantee that the website will always be uninterrupted, error-free, or complete.",
      "To the fullest extent allowed by applicable rules, Adem Eren Decoration is not responsible for indirect loss, project delay, color mismatch, product unavailability, or decisions made without reviewing current samples and direct project confirmation.",
    ],
  },
  {
    title: "Changes and contact",
    body: [
      "We may update these Terms and Conditions when the website, services, or business process changes. The updated version will be posted on this page.",
      "For questions about these terms, contact Adem Eren Decoration through the website contact section or the WhatsApp button.",
    ],
  },
];

export default function TermsAndConditionsPage() {
  return (
    <LegalDocument
      description="These Terms and Conditions explain how visitors may use this website and how sample requests, quotes, and project communication are handled."
      lastUpdated="June 5, 2026"
      sections={termsSections}
      title="Terms & Conditions"
    />
  );
}
