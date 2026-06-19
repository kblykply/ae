import type { Metadata } from "next";
import { LegalDocument } from "../components/legal-document";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | Adem Eren Decoration",
  description:
    "Adem Eren Decoration numune talepleri, proje başvuruları ve web sitesi iletişimi için gizlilik politikası.",
};

const privacySections = [
  {
    title: "Topladığımız bilgiler",
    body: [
      "Numune talebi oluşturduğunuzda, proje teklifi istediğinizde, WhatsApp üzerinden yazdığınızda veya web sitesi iletişim formunu kullandığınızda bize ilettiğiniz bilgileri toplarız.",
      "Bu bilgiler adınız, telefon numaranız, e-posta adresiniz, proje konumu, ilgilendiğiniz SPC parke veya duvar paneli koleksiyonu, proje notları ve mesaj geçmişini içerebilir.",
    ],
    items: [
      "İletişim için paylaştığınız bilgiler.",
      "Numune, metraj, uygulama planı ve teklif hazırlığı için gerekli proje detayları.",
      "Hosting veya güvenlik sağlayıcıları tarafından oluşan tarayıcı türü, sayfa ziyaretleri, IP adresi ve güvenlik kayıtları gibi temel teknik bilgiler.",
    ],
  },
  {
    title: "Bilgileri nasıl kullanırız",
    body: [
      "Bilgileri talebinize dönüş yapmak, numune sürecini hazırlamak, proje miktarlarını planlamak, uygulama görüşmelerini koordine etmek, web sitesini iyileştirmek ve kötüye kullanımı önlemek için kullanırız.",
      "Web sitesini online satış sepeti olarak kullanmıyoruz. Fiyat, numune, ölçü, ödeme ve uygulama takvimi gibi konular doğrudan iletişimle netleştirilir.",
    ],
  },
  {
    title: "Bilgi paylaşımı",
    body: [
      "Kişisel bilgileri satmayız. Bilgileri yalnızca talebinizi yanıtlamak, hizmet sağlamak, web sitesini işletmek veya yasal bir gerekliliği karşılamak için gerektiğinde paylaşabiliriz.",
    ],
    items: [
      "Projeniz için gerekirse uygulama ekipleri, tedarikçiler, lojistik sağlayıcılar veya proje paydaşları.",
      "Web sitesi barındırma, güvenlik, analiz, mesajlaşma veya form hizmeti sağlayıcıları.",
      "Yasal gereklilikler veya haklarımızı koruma ihtiyacı olduğunda yetkili kurumlar ve profesyonel danışmanlar.",
    ],
  },
  {
    title: "Çerezler ve dış bağlantılar",
    body: [
      "Web sitesi, etkinleştirildiğinde çalışma, güvenlik, performans ve ziyaret ölçümü için temel teknik çerezler, sunucu kayıtları veya benzer teknolojiler kullanabilir.",
      "Web sitesi WhatsApp gibi üçüncü taraf iletişim hizmetlerine bağlantı verebilir. Bu hizmetlerin kendi gizlilik uygulamaları vardır.",
    ],
  },
  {
    title: "Saklama ve haklarınız",
    body: [
      "Talep ve proje bilgilerini iletişim, proje planlama, ticari kayıtlar veya yasal gereklilikler için gerekli olduğu sürece saklarız.",
      "Bilgilerinize erişim, düzeltme, silme veya doğrudan proje iletişimini durdurma talepleri için bizimle iletişime geçebilirsiniz.",
    ],
  },
  {
    title: "İletişim",
    body: [
      "Gizlilik soruları veya talepleri için web sitesindeki iletişim bölümünden ya da WhatsApp butonundan Adem Eren Decoration ile iletişime geçebilirsiniz.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      description="Bu Gizlilik Politikası, web sitesi ziyaretçileri, numune talepleri, proje başvuruları ve doğrudan iletişim kapsamında bilgileri nasıl işlediğimizi açıklar."
      lastUpdated="5 Haziran 2026"
      sections={privacySections}
      title="Gizlilik Politikası"
    />
  );
}
