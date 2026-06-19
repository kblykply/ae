import type { Metadata } from "next";
import { ContentPage } from "../components/content-page";
import { createWebPageImageJsonLd } from "../data/image-seo";
import { jsonLdScriptProps } from "../seo";

const visionDescription =
  "Adem Eren Decoration vizyonu: Kuzey Kıbrıs ve KKTC projelerinde SPC parke, SPC duvar paneli ve iç mekan dekorasyon seçimlerini daha net, güvenilir ve projeye hazır hale getirmek.";
const visionVisualSeoImage = {
  alt: "Modern bir yüzey stüdyosunda SPC panel numunelerini inceleyen iç mimar",
  caption:
    "Kuzey Kıbrıs projelerinde SPC panel, zemin kaplama ve dekoratif yüzey seçimini daha net hale getirme vizyonu.",
  title: "Adem Eren Decoration vizyon görseli",
  url: "/images/ae-vision-hero.jpg",
};

export const metadata: Metadata = {
  title: "Vizyon | Kuzey Kıbrıs SPC Panel ve Dekorasyon",
  description: visionDescription,
  openGraph: {
    description:
      "Kuzey Kıbrıs projeleri için SPC panel, iç mekan dekorasyon ve numune seçim vizyonu.",
    images: [
      {
        alt: "Adem Eren Decoration vizyon sayfası iç mekan stüdyosu",
        height: 900,
        url: "/images/ae-vision-hero.jpg",
        width: 1680,
      },
    ],
    title: "Vizyon | Kuzey Kıbrıs SPC Panel ve Dekorasyon",
  },
};

const visionSections = [
  {
    title: {
      en: "Our Vision",
      tr: "Vizyonumuz",
    },
    body: {
      en: [
        "To become a trusted finish selection studio for modern interiors, helping homeowners, architects, and commercial project teams choose durable SPC floor and wall panels with confidence.",
        "We want every project to feel cleaner, calmer, and easier to plan by connecting material samples, technical details, quantity planning, and installation coordination in one practical process.",
      ],
      tr: [
        "Kuzey Kıbrıs modern iç mekanları için güvenilir bir SPC panel ve dekorasyon stüdyosu olmak; ev sahiplerinin, mimarların ve ticari proje ekiplerinin dayanıklı SPC zemin ve duvar panellerini güvenle seçmesine yardımcı olmak.",
        "Lefkoşa, Girne, Gazimağusa, İskele ve KKTC genelindeki projelerde numune, teknik detay, metraj planlama ve uygulama koordinasyonunu tek pratik süreçte buluşturmayı hedefliyoruz.",
      ],
    },
  },
  {
    title: {
      en: "What We Are Building",
      tr: "Ne İnşa Ediyoruz",
    },
    body: {
      en: [
        "Adem Eren Decoration focuses on surfaces that shape the feeling of a space: floors, walls, wet area panels, and textured decorative panels.",
      ],
      tr: [
        "Adem Eren Decoration, Kuzey Kıbrıs'ta bir mekanın hissini belirleyen yüzeylere odaklanır: SPC parkeler, SPC duvar panelleri, ıslak hacim panelleri ve dokulu dekoratif paneller.",
      ],
    },
    items: {
      en: [
        "A curated SPC panel selection for residential and commercial interiors.",
        "Clear sample guidance before project decisions.",
        "Reliable coordination between product choice, measurements, and installation needs.",
      ],
      tr: [
        "Konut ve ticari iç mekanlar için seçilmiş SPC panel koleksiyonu.",
        "Proje kararından önce net numune yönlendirmesi.",
        "Ürün seçimi, ölçü ve uygulama ihtiyaçları arasında güvenilir koordinasyon.",
      ],
    },
  },
  {
    title: {
      en: "Long-Term Direction",
      tr: "Uzun Vadeli Yönümüz",
    },
    body: {
      en: [
        "Our long-term goal is to make interior finish decisions more transparent and less stressful, with materials that are practical for daily use and refined enough for high-quality spaces.",
      ],
      tr: [
        "Uzun vadeli hedefimiz, günlük kullanıma uygun ve kaliteli mekanlara yakışacak kadar rafine malzemelerle iç mekan yüzey kararlarını daha şeffaf ve daha stressiz hale getirmektir.",
      ],
    },
  },
];

export default function VisionPage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={jsonLdScriptProps(
          createWebPageImageJsonLd({
            description: visionDescription,
            image: visionVisualSeoImage,
            name: "Vizyon | Kuzey Kıbrıs SPC Panel ve Dekorasyon",
            path: "/vision",
          }),
        )}
        type="application/ld+json"
      />
      <ContentPage
        description={{
          en: "Our vision is to make SPC floor and wall panel selection clearer, more reliable, and more project-ready for every interior.",
          tr: "Vizyonumuz, Kuzey Kıbrıs'ta SPC zemin ve duvar paneli seçimini her iç mekan için daha net, güvenilir ve projeye hazır hale getirmektir.",
        }}
        heroImage="/images/ae-vision-hero.jpg"
        heroImageAlt={{
          en: "Interior designer reviewing SPC panel samples in a modern finish studio",
          tr: "Modern bir yüzey stüdyosunda SPC panel numunelerini inceleyen iç mimar",
        }}
        sections={visionSections}
        title={{
          en: "Vision",
          tr: "Vizyon",
        }}
      />
    </>
  );
}
