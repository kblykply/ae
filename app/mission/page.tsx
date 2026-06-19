import type { Metadata } from "next";
import { ContentPage } from "../components/content-page";
import { createWebPageImageJsonLd } from "../data/image-seo";
import { jsonLdScriptProps } from "../seo";

const missionDescription =
  "Adem Eren Decoration misyonu: Kuzey Kıbrıs ve KKTC projelerinde SPC parke, SPC duvar paneli, banyo paneli, numune desteği ve uygulama planlamasıyla doğru malzeme seçimine rehberlik etmek.";
const missionVisualSeoImage = {
  alt: "SPC panel uygulaması için ölçü ve planlama yapan iki profesyonel",
  caption:
    "Kuzey Kıbrıs projelerinde SPC panel, zemin kaplama, banyo paneli ve uygulama koordinasyonu misyonu.",
  title: "Adem Eren Decoration misyon görseli",
  url: "/images/ae-mission-hero.jpg",
};

export const metadata: Metadata = {
  title: "Misyon | Kuzey Kıbrıs Dekorasyon ve SPC Panel",
  description: missionDescription,
  openGraph: {
    description:
      "Kuzey Kıbrıs projelerinde ölçü, numune, SPC panel uygulama ve dekorasyon koordinasyonu.",
    images: [
      {
        alt: "Adem Eren Decoration misyon sayfası SPC panel uygulama planlama",
        height: 900,
        url: "/images/ae-mission-hero.jpg",
        width: 1680,
      },
    ],
    title: "Misyon | Kuzey Kıbrıs Dekorasyon ve SPC Panel",
  },
};

const missionSections = [
  {
    title: {
      en: "Our Mission",
      tr: "Misyonumuz",
    },
    body: {
      en: [
        "Our mission is to help clients choose the right SPC floor and wall panel finishes for their space through clear product information, sample support, and project-based planning.",
        "We do not treat decoration as a simple online cart. We listen to the project, understand the space, recommend suitable material options, and support the path from selection to application.",
      ],
      tr: [
        "Misyonumuz, Kuzey Kıbrıs'taki ev, villa, ofis, otel ve ticari mekan projeleri için net ürün bilgisi, numune desteği ve proje odaklı planlama ile doğru SPC zemin ve duvar paneli bitişlerini seçmeye yardımcı olmaktır.",
        "Dekorasyonu basit bir online sepet gibi görmüyoruz. Projeyi dinliyor, mekanı anlıyor, Lefkoşa, Girne, Gazimağusa, İskele ve KKTC genelindeki uygulama koşullarına uygun malzeme seçeneklerini öneriyoruz.",
      ],
    },
  },
  {
    title: {
      en: "How We Work",
      tr: "Nasıl Çalışıyoruz",
    },
    body: {
      en: [
        "Every project starts with the same priority: choosing a finish that fits the design goal, usage needs, and installation conditions.",
      ],
      tr: [
        "Her Kıbrıs dekorasyon projesi aynı öncelikle başlar: tasarım hedefi, kullanım ihtiyacı ve uygulama koşullarına uygun bir SPC panel veya zemin seçmek.",
      ],
    },
    items: {
      en: [
        "Share clear SPC flooring, wall panel, and 3D panel options.",
        "Support sample requests before final decisions.",
        "Plan quantities, technical details, and installation coordination with care.",
      ],
      tr: [
        "SPC parke, duvar paneli ve 3D panel seçeneklerini net şekilde sunmak.",
        "Final karardan önce numune taleplerini desteklemek.",
        "Metraj, teknik detay ve uygulama koordinasyonunu dikkatle planlamak.",
      ],
    },
  },
  {
    title: {
      en: "Our Promise",
      tr: "Sözümüz",
    },
    body: {
      en: [
        "We aim to keep the process direct, honest, and useful, from first inquiry to project delivery. The goal is not to show more products than necessary, but to guide each client toward the right material choice.",
      ],
      tr: [
        "İlk talepten proje teslimine kadar süreci doğrudan, dürüst ve faydalı tutmayı hedefliyoruz. Amaç gereğinden fazla ürün göstermek değil, her müşteriyi doğru malzeme seçimine yönlendirmektir.",
      ],
    },
  },
];

export default function MissionPage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={jsonLdScriptProps(
          createWebPageImageJsonLd({
            description: missionDescription,
            image: missionVisualSeoImage,
            name: "Misyon | Kuzey Kıbrıs Dekorasyon ve SPC Panel",
            path: "/mission",
          }),
        )}
        type="application/ld+json"
      />
      <ContentPage
        description={{
          en: "Our mission is to guide clients through SPC material selection, sample review, project planning, and installation coordination.",
          tr: "Misyonumuz, Kuzey Kıbrıs'taki müşterilere SPC malzeme seçimi, numune inceleme, proje planlama ve uygulama koordinasyonu boyunca rehberlik etmektir.",
        }}
        heroImage="/images/ae-mission-hero.jpg"
        heroImageAlt={{
          en: "Two professionals measuring and planning an SPC panel installation",
          tr: "SPC panel uygulaması için ölçü ve planlama yapan iki profesyonel",
        }}
        sections={missionSections}
        title={{
          en: "Mission",
          tr: "Misyon",
        }}
      />
    </>
  );
}
