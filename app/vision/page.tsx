import type { Metadata } from "next";
import { ContentPage } from "../components/content-page";

export const metadata: Metadata = {
  title: "Vision | Adem Eren Decoration",
  description:
    "Adem Eren Decoration vision for SPC floor panels, wall panels, and project-focused interior finish selection.",
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
        "Modern iç mekanlar için güvenilir bir yüzey seçim stüdyosu olmak; ev sahiplerinin, mimarların ve ticari proje ekiplerinin dayanıklı SPC zemin ve duvar panellerini güvenle seçmesine yardımcı olmak.",
        "Numune, teknik detay, metraj planlama ve uygulama koordinasyonunu tek pratik süreçte buluşturarak her projenin daha temiz, daha sakin ve daha kolay planlanmasını hedefliyoruz.",
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
        "Adem Eren Decoration, bir mekanın hissini belirleyen yüzeylere odaklanır: zeminler, duvarlar, ıslak hacim panelleri ve dokulu dekoratif paneller.",
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
    <ContentPage
      description={{
        en: "Our vision is to make SPC floor and wall panel selection clearer, more reliable, and more project-ready for every interior.",
        tr: "Vizyonumuz, SPC zemin ve duvar paneli seçimini her iç mekan için daha net, güvenilir ve projeye hazır hale getirmektir.",
      }}
      sections={visionSections}
      title={{
        en: "Vision",
        tr: "Vizyon",
      }}
    />
  );
}
