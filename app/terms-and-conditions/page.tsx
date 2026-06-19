import type { Metadata } from "next";
import { LegalDocument } from "../components/legal-document";

export const metadata: Metadata = {
  title: "Şartlar ve Koşullar | Adem Eren Decoration",
  description:
    "Adem Eren Decoration web sitesi kullanımı, numune talepleri ve SPC parke/duvar paneli proje bilgilendirmeleri için şartlar ve koşullar.",
};

const termsSections = [
  {
    title: "Web sitesi kullanımı",
    body: [
      "Bu web sitesi, Adem Eren Decoration tarafından SPC parke panelleri, SPC duvar panelleri, 3D panel seçenekleri, proje ilhamları, numune talepleri ve iletişim seçeneklerini sunmak amacıyla hazırlanmıştır.",
      "Web sitesini kullanarak iç mekan yüzey seçimi ve uygulama planlamasıyla ilgili kişisel, proje veya ticari bilgi talepleri için yasal ve doğru şekilde kullanmayı kabul edersiniz.",
    ],
  },
  {
    title: "Online satış yapılmaz",
    body: [
      "Web sitesi online mobilya veya ürün satış sepeti değildir. Ürünler yüzey seçimi, numune talebi, proje görüşmesi ve teklif planlaması amacıyla gösterilir.",
      "Teklif, numune talebi, ürün rezervasyonu, uygulama tarihi veya sipariş; Adem Eren Decoration tarafından yazılı veya mutabık kalınan iletişim yöntemiyle onaylanmadan kesinleşmiş sayılmaz.",
    ],
  },
  {
    title: "Ürün bilgileri",
    body: [
      "Görseller, renkler, ürün adları, teknik notlar ve koleksiyon detayları genel yönlendirme için sunulur. Ekran renkleri, ışık, parti farkları ve uygulama koşulları nihai görünümü etkileyebilir.",
      "Stok, teknik özellik, ölçü, koleksiyon adı ve tedarikçi bilgileri değişebilir. Nihai proje kararları güncel numune, ölçü, teknik föy ve doğrudan teyit üzerinden verilmelidir.",
    ],
  },
  {
    title: "Teklif, ölçü ve uygulama",
    body: [
      "Proje fiyatı seçilen ürün, miktar, saha ölçüsü, hazırlık ihtiyacı, uygulama kapsamı, lokasyon, zamanlama ve diğer pratik detaylara göre belirlenir.",
      "Proje anlaşması, ödeme planı, teslim koşulu, garanti detayı veya uygulama sorumluluğu işe başlanmadan önce ayrıca teyit edilmelidir.",
    ],
  },
  {
    title: "Sorumluluklarınız",
    body: [
      "Bizimle iletişime geçtiğinizde doğru iletişim ve proje bilgileri paylaşmayı kabul edersiniz. Numuneleri incelemek, ölçüleri kontrol etmek, saha koşullarını teyit etmek ve seçilen panelin projeye uygunluğunu değerlendirmek sizin sorumluluğunuzdadır.",
    ],
    items: [
      "Web sitesini, formları, bağlantıları veya iletişim seçeneklerini kötüye kullanmayın.",
      "Yasa dışı, yanıltıcı veya zararlı içerik göndermeyin.",
      "Web sitesi içeriklerini, logoları, görselleri veya tasarım unsurlarını izinsiz kopyalamayın.",
    ],
  },
  {
    title: "Üçüncü taraf bağlantılar",
    body: [
      "Web sitesi tedarikçi sayfalarına, ürün kaynaklarına, mesajlaşma servislerine veya diğer üçüncü taraf web sitelerine bağlantı verebilir. Adem Eren Decoration bu sitelerin içeriklerinden, politikalarından veya erişilebilirliğinden sorumlu değildir.",
    ],
  },
  {
    title: "Fikri mülkiyet",
    body: [
      "Adem Eren Decoration adı, AE Dekorasyon logosu, web sitesi düzeni, metinler ve tasarım unsurları ilgili hak sahipleri tarafından korunur. Ürün fotoğrafları, tedarikçi adları ve kaynak materyaller kendi sahiplerine aittir.",
    ],
  },
  {
    title: "Sorumluluğun sınırlandırılması",
    body: [
      "Web sitesi genel bilgilendirme ve proje talebi amacıyla sunulur. İçeriği faydalı ve güncel tutmaya çalışırız ancak web sitesinin her zaman kesintisiz, hatasız veya eksiksiz olacağını garanti etmeyiz.",
      "Uygulanabilir kuralların izin verdiği ölçüde, güncel numune ve doğrudan proje teyidi olmadan verilen kararlardan, dolaylı kayıplardan, proje gecikmesinden, renk uyumsuzluğundan veya ürün bulunamamasından Adem Eren Decoration sorumlu değildir.",
    ],
  },
  {
    title: "Değişiklikler ve iletişim",
    body: [
      "Web sitesi, hizmetler veya iş süreci değiştiğinde bu Şartlar ve Koşullar güncellenebilir. Güncel sürüm bu sayfada yayınlanır.",
      "Bu şartlarla ilgili sorular için web sitesindeki iletişim bölümünden veya WhatsApp butonundan Adem Eren Decoration ile iletişime geçebilirsiniz.",
    ],
  },
];

export default function TermsAndConditionsPage() {
  return (
    <LegalDocument
      description="Bu Şartlar ve Koşullar, ziyaretçilerin web sitesini nasıl kullanabileceğini ve numune talepleri, teklifler ve proje iletişiminin nasıl ele alındığını açıklar."
      lastUpdated="5 Haziran 2026"
      sections={termsSections}
      title="Şartlar ve Koşullar"
    />
  );
}
