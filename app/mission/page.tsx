import type { Metadata } from "next";
import { ContentPage } from "../components/content-page";

export const metadata: Metadata = {
  title: "Mission | Adem Eren Decoration",
  description:
    "Adem Eren Decoration mission for sample requests, project planning, and SPC floor and wall panel applications.",
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
        "Misyonumuz, net ürün bilgisi, numune desteği ve proje odaklı planlama ile müşterilerin mekanları için doğru SPC zemin ve duvar paneli bitişlerini seçmesine yardımcı olmaktır.",
        "Dekorasyonu basit bir online sepet gibi görmüyoruz. Projeyi dinliyor, mekanı anlıyor, uygun malzeme seçeneklerini öneriyor ve seçimden uygulamaya kadar süreci destekliyoruz.",
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
        "Her proje aynı öncelikle başlar: tasarım hedefi, kullanım ihtiyacı ve uygulama koşullarına uygun bir yüzey seçmek.",
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
    <ContentPage
      description={{
        en: "Our mission is to guide clients through SPC material selection, sample review, project planning, and installation coordination.",
        tr: "Misyonumuz, müşterilere SPC malzeme seçimi, numune inceleme, proje planlama ve uygulama koordinasyonu boyunca rehberlik etmektir.",
      }}
      sections={missionSections}
      title={{
        en: "Mission",
        tr: "Misyon",
      }}
    />
  );
}
