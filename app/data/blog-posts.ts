import { promises as fs } from "node:fs";
import path from "node:path";

export type BlogPostStatus = "draft" | "published";

export type BlogPost = {
  author: string;
  category: string;
  content: string;
  coverImage: string;
  coverImageAlt: string;
  excerpt: string;
  focusKeyword: string;
  publishedAt: string;
  readingTime: number;
  seoDescription: string;
  seoTitle: string;
  slug: string;
  status: BlogPostStatus;
  tags: string[];
  title: string;
  updatedAt: string;
};

type BlogPostStoreOptions = {
  includeDrafts?: boolean;
};

const blogPostsFilePath = path.join(process.cwd(), "data", "blog-posts.json");
const backendBaseUrl = (process.env.BACKEND_URL ?? "").replace(/\/$/, "");
const backendAdminToken =
  process.env.BACKEND_ADMIN_TOKEN ??
  process.env.ADMIN_PASSWORD ??
  "";

const getBackendEndpoint = (pathname: string) =>
  backendBaseUrl ? `${backendBaseUrl}${pathname}` : "";

export const createBlogSlug = (value: string) =>
  value
    .toLocaleLowerCase("tr")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const nowIso = () => new Date().toISOString();

export const defaultBlogPosts: BlogPost[] = [
  {
    author: "Adem Eren Decoration",
    category: "SPC Parke",
    content:
      "## SPC parke neden Kuzey Kıbrıs için güçlü bir seçenek?\n\nKuzey Kıbrıs'ta zemin seçimi yaparken nem, günlük kullanım, temizlik kolaylığı ve uygulama süresi birlikte düşünülmelidir. SPC parke, rijit mineral kompozit çekirdeği sayesinde ev, villa, ofis, mağaza ve kiralık konutlarda pratik bir zemin alternatifi sunar.\n\n## Seçim yaparken nelere bakılmalı?\n\nÜrünün kalınlığı, aşınma tabakası, kilit sistemi, şilte yapısı, renk tonu ve mevcut zeminin durumu aynı anda değerlendirilmelidir. Açık tonlar küçük mekanları daha ferah gösterebilir; koyu ceviz ve gri tonlar ise otel, ofis ve premium konutlarda daha güçlü bir etki oluşturabilir.\n\n## Uygulama öncesi kontrol listesi\n\n- Mevcut zeminin düzgünlüğü\n- Kapı altları ve geçiş profilleri\n- Süpürgelik rengi\n- Kullanım yoğunluğu\n- Numune üzerinde gün ışığı kontrolü\n\nDoğru ürün seçimi için yalnızca görsele bakmak yeterli değildir. Mekanın kullanım amacı, metrajı ve mevcut yüzey durumu netleştiğinde teklif ve uygulama planı daha sağlıklı çıkar.",
    coverImage: "/images/kermit-floor-application.jpg",
    coverImageAlt:
      "Kuzey Kıbrıs modern iç mekanda SPC parke uygulama örneği",
    excerpt:
      "Kuzey Kıbrıs'ta SPC parke seçerken kalınlık, aşınma tabakası, nem dayanımı, renk tonu ve uygulama hazırlığı nasıl değerlendirilir?",
    focusKeyword: "SPC parke Kıbrıs",
    publishedAt: "2026-01-08T09:00:00.000Z",
    readingTime: 3,
    seoDescription:
      "Kuzey Kıbrıs'ta SPC parke seçimi için kalınlık, aşınma tabakası, renk, nem dayanımı, zemin hazırlığı ve uygulama süreci hakkında pratik rehber.",
    seoTitle: "Kuzey Kıbrıs'ta SPC Parke Seçerken Nelere Bakılmalı?",
    slug: "kuzey-kibris-spc-parke-secimi",
    status: "published",
    tags: ["SPC parke", "SPC zemin kaplama", "Kuzey Kıbrıs dekorasyon"],
    title: "Kuzey Kıbrıs'ta SPC Parke Seçerken Nelere Bakılmalı?",
    updatedAt: "2026-01-08T09:00:00.000Z",
  },
  {
    author: "Adem Eren Decoration",
    category: "SPC Duvar Paneli",
    content:
      "## Banyo yenilemede SPC panel nasıl planlanır?\n\nSPC duvar paneli, banyo ve ıslak hacimlerde mermer, taş veya beton görünümünü daha temiz bir yenileme süreciyle elde etmek isteyen projelerde değerlendirilir. Uygulama öncesinde mevcut yüzeyin sağlamlığı, ölçüler, köşe detayları ve panel birleşimleri kontrol edilmelidir.\n\n## Doğru paneli seçmek\n\nBanyoda kullanılacak panelin rengi kadar desen yönü ve ölçüsü de önemlidir. Geniş ebatlı paneller daha az derz görünümü verir. Marble sheet veya SPC seramik görünümü isteyen projelerde panelin lavabo, duş alanı ve nişlerle ilişkisi önceden planlanmalıdır.\n\n## Süreci hızlandıran bilgiler\n\n- Banyonun fotoğrafları\n- Yaklaşık duvar ölçüleri\n- Mevcut seramik veya sıva durumu\n- İstenen mermer, taş veya sade panel görünümü\n- Duş alanı ve lavabo arkasındaki detaylar\n\nBu bilgilerle panel numunesi, metraj ve uygulama sırası daha doğru belirlenir.",
    coverImage: "/images/kermit-wall-application.jpg",
    coverImageAlt:
      "Kuzey Kıbrıs banyo yenileme için SPC duvar paneli uygulaması",
    excerpt:
      "SPC duvar paneli ile banyo yenilerken mevcut yüzey, ölçü, desen yönü, köşe bitişleri ve uygulama sırası nasıl planlanır?",
    focusKeyword: "SPC duvar paneli Kıbrıs",
    publishedAt: "2026-01-15T09:00:00.000Z",
    readingTime: 3,
    seoDescription:
      "Kuzey Kıbrıs'ta SPC duvar paneli ile banyo yenileme süreci: panel seçimi, ölçü, yüzey kontrolü, köşe detayları ve numune planlama.",
    seoTitle: "SPC Duvar Paneli ile Banyo Yenileme Süreci",
    slug: "spc-duvar-paneli-banyo-yenileme-sureci",
    status: "published",
    tags: ["SPC duvar paneli", "banyo paneli", "marble sheet"],
    title: "SPC Duvar Paneli ile Banyo Yenileme Süreci",
    updatedAt: "2026-01-15T09:00:00.000Z",
  },
  {
    author: "Adem Eren Decoration",
    category: "Dekorasyon Rehberi",
    content:
      "## Marble sheet hangi projelerde tercih edilir?\n\nMarble sheet, mermer etkisi istenen ama klasik seramik kırımı ve ağır uygulama süreci tercih edilmeyen iç mekanlarda öne çıkar. Lefkoşa ve Girne'deki banyo, mutfak, resepsiyon duvarı, TV arkası ve ticari mekan yenilemelerinde güçlü bir vurgu yüzeyi oluşturabilir.\n\n## Nerede dikkatli kullanmak gerekir?\n\nHer yüzey aynı uygulama koşuluna sahip değildir. Nem, mevcut duvar sağlamlığı, köşe dönüşleri, priz yerleri ve panel ölçüleri uygulama öncesi değerlendirilmelidir. Büyük desenli mermer görünümlerinde panel devamlılığı ve desen yönü tasarımın kalitesini belirler.\n\n## İç mekan bütünlüğü\n\nMarble sheet tek başına seçilmemelidir. SPC parke rengi, dekoratif çıta, aydınlatma ve mobilya tonu ile birlikte düşünülürse sonuç daha profesyonel görünür. Bu yüzden numune karşılaştırması gerçek mekan ışığında yapılmalıdır.",
    coverImage: "/images/kermit-wall-panel-613.jpg",
    coverImageAlt:
      "Lefkoşa ve Girne iç mekanlarında marble sheet duvar paneli örneği",
    excerpt:
      "Marble sheet; banyo, mutfak, resepsiyon duvarı ve TV arkası gibi alanlarda nasıl seçilir ve hangi detaylarla birlikte planlanır?",
    focusKeyword: "marble sheet Kıbrıs",
    publishedAt: "2026-01-22T09:00:00.000Z",
    readingTime: 3,
    seoDescription:
      "Lefkoşa ve Girne dekorasyon projelerinde marble sheet kullanımı, panel ölçüsü, desen yönü, nem kontrolü ve iç mekan bütünlüğü hakkında rehber.",
    seoTitle: "Lefkoşa ve Girne Dekorasyon Projelerinde Marble Sheet",
    slug: "lefkosa-girne-marble-sheet-kullanimi",
    status: "published",
    tags: ["marble sheet", "Lefkoşa dekorasyon", "Girne dekorasyon"],
    title: "Lefkoşa ve Girne Dekorasyon Projelerinde Marble Sheet Kullanımı",
    updatedAt: "2026-01-22T09:00:00.000Z",
  },
  {
    author: "Adem Eren Decoration",
    category: "SPC Zemin Kaplama",
    content:
      "## SPC zemin kaplama ile laminat parke nasıl ayrılır?\n\nKuzey Kıbrıs'ta zemin seçimi yaparken en çok karşılaştırılan iki seçenek SPC zemin kaplama ve laminat parkedir. Laminat parke ahşap bazlı yapısıyla sıcak bir görünüm verir; SPC zemin kaplama ise rijit mineral kompozit çekirdeğiyle nem, yoğun kullanım ve temizlenebilirlik açısından güçlü bir alternatif oluşturur.\n\n## Hangi projede hangisi düşünülmeli?\n\nEv, villa, ofis, mağaza ve kiralık konut gibi alanlarda günlük kullanım yoğunluğu değişir. Banyo yakınları, mutfak geçişleri, giriş alanları ve ticari mekanlarda suya dayanıklı yüzey ihtiyacı daha fazla olduğu için SPC zemin kaplama öne çıkar.\n\n## Karar vermeden önce kontrol edin\n\n- Mevcut zeminin düzgünlüğü\n- Kullanım yoğunluğu\n- Nem ve temizlik ihtiyacı\n- Süpürgelik ve kapı geçişleri\n- Numunenin gün ışığındaki rengi\n\nDoğru karar, yalnızca ürün görseline değil mekanın gerçek kullanım koşullarına göre verilmelidir.",
    coverImage: "/images/kermit-elite-p220.jpg",
    coverImageAlt:
      "Kuzey Kıbrıs SPC zemin kaplama ve laminat parke karşılaştırması",
    excerpt:
      "SPC zemin kaplama ve laminat parke arasındaki farkları Kuzey Kıbrıs ev, ofis, mağaza ve kiralık konut projeleri için değerlendirin.",
    focusKeyword: "SPC zemin kaplama Kıbrıs",
    publishedAt: "2026-01-29T09:00:00.000Z",
    readingTime: 3,
    seoDescription:
      "SPC zemin kaplama Kıbrıs projelerinde laminat parke ile nasıl karşılaştırılır? Nem, kullanım yoğunluğu, zemin hazırlığı ve numune seçimi.",
    seoTitle: "SPC Zemin Kaplama mı Laminat Parke mi?",
    slug: "spc-zemin-kaplama-laminat-parke-farki",
    status: "published",
    tags: ["SPC zemin kaplama", "laminat parke", "Kıbrıs zemin kaplama"],
    title: "SPC Zemin Kaplama mı Laminat Parke mi?",
    updatedAt: "2026-01-29T09:00:00.000Z",
  },
  {
    author: "Adem Eren Decoration",
    category: "SPC Seramik",
    content:
      "## SPC seramik ne anlama gelir?\n\nSPC seramik, seramik ya da taş görünümü isteyen ama daha pratik yüzey çözümlerini araştıran müşterilerin kullandığı önemli bir arama niyetidir. Bu kavram çoğu projede SPC panel, marble sheet veya seramik görünümlü zemin-duvar kaplamaları ile birlikte değerlendirilir.\n\n## Nerelerde kullanılabilir?\n\nBanyo, mutfak, lavabo arkası, TV ünitesi, resepsiyon duvarı ve ticari iç mekanlarda seramik ya da mermer etkisi istenebilir. Önemli olan yalnızca desen seçmek değil; panel ölçüsü, mevcut yüzey, köşe dönüşleri ve uygulama detaylarını birlikte planlamaktır.\n\n## Numune seçerken dikkat edin\n\n- Desenin büyük ya da küçük oluşu\n- Işık altında renk değişimi\n- Duvar ve zemin uyumu\n- Islak hacim koşulları\n- Kenar ve bitiş profilleri\n\nSPC seramik görünümü, doğru yüzeyde kullanıldığında klasik seramik hissini daha modern ve temiz bir dekorasyon diliyle birleştirebilir.",
    coverImage: "/images/kermit-wall-panel-613.jpg",
    coverImageAlt:
      "Kuzey Kıbrıs SPC seramik ve mermer görünümlü panel seçimi",
    excerpt:
      "SPC seramik görünümü banyo, mutfak ve ticari alanlarda nasıl değerlendirilir? Panel, marble sheet ve yüzey seçimi rehberi.",
    focusKeyword: "SPC seramik Kıbrıs",
    publishedAt: "2026-02-05T09:00:00.000Z",
    readingTime: 3,
    seoDescription:
      "SPC seramik Kıbrıs projelerinde banyo, mutfak ve ticari alanlar için panel ölçüsü, desen yönü, marble sheet ve yüzey seçimi rehberi.",
    seoTitle: "SPC Seramik Nedir ve Nerelerde Kullanılır?",
    slug: "spc-seramik-nedir-nerelerde-kullanilir",
    status: "published",
    tags: ["SPC seramik", "marble sheet", "banyo paneli"],
    title: "SPC Seramik Nedir ve Nerelerde Kullanılır?",
    updatedAt: "2026-02-05T09:00:00.000Z",
  },
  {
    author: "Adem Eren Decoration",
    category: "Akustik Panel",
    content:
      "## Duvar paneli ile akustik panel aynı şey değildir\n\nDuvar paneli daha çok görsel yenileme, yüzey kaplama ve dekoratif vurgu için tercih edilir. Akustik panel ise ses konforu ihtiyacı olan ofis, toplantı odası, stüdyo, restoran, kafe ve otel alanlarında ayrıca değerlendirilir.\n\n## Hangi alanlarda akustik panel düşünülür?\n\nKuzey Kıbrıs'taki ticari mekanlarda yankı, konuşma netliği ve müşteri konforu önemli olabilir. Akustik panel, doğru yüzeyde ve doğru yoğunlukta kullanıldığında mekanın sadece görünümüne değil kullanım deneyimine de katkı sağlar.\n\n## Seçim sürecinde sorulacak sorular\n\n- Mekanda yankı problemi var mı?\n- Panel dekoratif mi akustik mi olmalı?\n- TV arkası, toplantı odası veya restoran duvarı mı?\n- Renk ve çıta ritmi mobilyalarla uyumlu mu?\n- Temizlik ve bakım beklentisi nedir?\n\nEn iyi sonuç, dekoratif duvar paneli ve akustik panel ihtiyaçlarının ayrı ayrı değerlendirilmesiyle alınır.",
    coverImage: "/images/ae-mission-hero.jpg",
    coverImageAlt:
      "Kuzey Kıbrıs ofis ve ticari alan için akustik panel uygulaması",
    excerpt:
      "Duvar paneli ve akustik panel arasındaki farkları ofis, restoran, kafe, otel ve toplantı odası projeleri için öğrenin.",
    focusKeyword: "akustik panel Kıbrıs",
    publishedAt: "2026-02-12T09:00:00.000Z",
    readingTime: 3,
    seoDescription:
      "Akustik panel Kıbrıs projelerinde duvar panelinden nasıl ayrılır? Ofis, restoran, kafe ve toplantı odası için ses ve dekorasyon rehberi.",
    seoTitle: "Duvar Paneli ve Akustik Panel Arasındaki Farklar",
    slug: "duvar-paneli-akustik-panel-farki",
    status: "published",
    tags: ["akustik panel", "duvar paneli", "ofis dekorasyon"],
    title: "Duvar Paneli ve Akustik Panel Arasındaki Farklar",
    updatedAt: "2026-02-12T09:00:00.000Z",
  },
  {
    author: "Adem Eren Decoration",
    category: "Dekoratif Çıta",
    content:
      "## Dekoratif çıta duvara ne katar?\n\nDekoratif çıta, düz bir duvarı daha planlı ve tamamlanmış göstermek için kullanılan güçlü bir iç mekan detaydır. MDF çıta, poliüretan çıta, bodür çıta ve lambri etkisi; salon, yatak odası, koridor, ofis ve otel alanlarında farklı sonuçlar verir.\n\n## Çıta tasarımında ölçü neden önemlidir?\n\nDuvar yüksekliği, mobilya yerleşimi, kapı-pencere çizgileri ve aydınlatma planı ölçülmeden yapılan çıta uygulamaları mekanda karmaşa oluşturabilir. Çıta aralıkları, panel ritmi ve boya rengi birlikte düşünülmelidir.\n\n## Uygulama öncesi kararlar\n\n- Dikey ya da yatay ritim\n- MDF veya poliüretan çıta seçimi\n- Duvar rengi ve boya tipi\n- TV arkası ya da yatak başı odak alanı\n- Süpürgelik ve tavan geçişleri\n\nDekoratif çıta küçük bir detay gibi görünse de doğru ölçüyle uygulandığında mekanın algısını ciddi şekilde değiştirir.",
    coverImage: "/images/ae-vision-hero.jpg",
    coverImageAlt:
      "Kuzey Kıbrıs dekoratif çıta ve lambri duvar tasarımı",
    excerpt:
      "Dekoratif çıta, MDF çıta, poliüretan çıta, bodür çıta ve lambri uygulamalarında ölçü, ritim ve renk seçimi nasıl yapılır?",
    focusKeyword: "dekoratif çıta Kıbrıs",
    publishedAt: "2026-02-19T09:00:00.000Z",
    readingTime: 3,
    seoDescription:
      "Dekoratif çıta Kıbrıs projelerinde MDF çıta, poliüretan çıta, bodür çıta ve lambri için ölçü, ritim, boya ve duvar planlama rehberi.",
    seoTitle: "Dekoratif Çıta ile Duvar Tasarımı Nasıl Planlanır?",
    slug: "dekoratif-cita-duvar-tasarimi",
    status: "published",
    tags: ["dekoratif çıta", "MDF çıta", "poliüretan çıta", "lambri"],
    title: "Dekoratif Çıta ile Duvar Tasarımı Nasıl Planlanır?",
    updatedAt: "2026-02-19T09:00:00.000Z",
  },
  {
    author: "Adem Eren Decoration",
    category: "Alçıpan Uygulama",
    content:
      "## Alçıpan uygulama dekorasyonun altyapısını hazırlar\n\nAlçıpan uygulama; bölme duvar, niş, tavan detayı, gizli ışık ve yüzey düzeltme gibi birçok iç mekan kararını etkiler. SPC panel, boya, duvar kağıdı veya dekoratif çıta uygulanacaksa alçıpan detaylarının baştan doğru planlanması gerekir.\n\n## Uygulama öncesi neler netleşmeli?\n\nElektrik noktaları, aydınlatma yerleri, klima hattı, panel bitişleri ve mobilya ölçüleri uygulamadan önce konuşulmalıdır. Aksi halde bitmiş yüzeyde tekrar müdahale gerekebilir.\n\n## Kontrol listesi\n\n- Bölme duvar veya niş ölçüsü\n- Asma tavan yüksekliği\n- Gizli ışık ve spot yerleşimi\n- Panel ya da çıta gelecek yüzeyler\n- Boya ve son yüzey takvimi\n\nAlçıpan sadece yapı işi değil, dekorasyon sonucunu doğrudan belirleyen bir planlama aşamasıdır.",
    coverImage: "/images/ae-alcipan-uygulama.jpg",
    coverImageAlt:
      "Kuzey Kıbrıs alçıpan uygulama ve asma tavan hazırlığı",
    excerpt:
      "Alçıpan uygulama öncesinde bölme duvar, niş, gizli ışık, panel bitişleri ve elektrik detayları nasıl planlanmalı?",
    focusKeyword: "alçıpan uygulama Kıbrıs",
    publishedAt: "2026-02-26T09:00:00.000Z",
    readingTime: 3,
    seoDescription:
      "Alçıpan uygulama Kıbrıs projelerinde bölme duvar, niş, gizli ışık, asma tavan, elektrik ve panel bitişleri için planlama rehberi.",
    seoTitle: "Alçıpan Uygulama Öncesi Bilinmesi Gerekenler",
    slug: "alcipan-uygulama-oncesi-bilinmesi-gerekenler",
    status: "published",
    tags: ["alçıpan uygulama", "asma tavan", "gizli ışık"],
    title: "Alçıpan Uygulama Öncesi Bilinmesi Gerekenler",
    updatedAt: "2026-02-26T09:00:00.000Z",
  },
  {
    author: "Adem Eren Decoration",
    category: "Asma Tavan",
    content:
      "## Asma tavan yalnızca dekoratif bir detay değildir\n\nAsma tavan, mekanın ışık dağılımını, tavan yüksekliği algısını ve duvar-zemin ilişkisini etkiler. Kuzey Kıbrıs'ta ev, villa, ofis, mağaza ve otel projelerinde asma tavan planı yapılırken aydınlatma ve uygulama sırası birlikte düşünülmelidir.\n\n## Gizli ışık nerede kullanılmalı?\n\nGizli ışık salon, yatak odası, koridor, resepsiyon ve showroom alanlarında sıcak bir atmosfer oluşturabilir. Ancak her tavanda aynı detay doğru olmayabilir. Tavan yüksekliği, mobilya yerleşimi ve bakım ihtiyacı dikkate alınmalıdır.\n\n## Uygulama öncesi dikkat edilecekler\n\n- Tavan yüksekliği\n- Spot ve LED hatları\n- Klima, perde ve dolap ilişkisi\n- Alçıpan birleşimleri\n- Boya ve son yüzey sırası\n\nAsma tavan iyi planlandığında mekan daha düzenli, aydınlatma daha kontrollü ve dekorasyon dili daha bütünlüklü görünür.",
    coverImage: "/images/ae-alcipan-uygulama.jpg",
    coverImageAlt:
      "Kuzey Kıbrıs asma tavan ve gizli ışık dekorasyon uygulaması",
    excerpt:
      "Asma tavan, gizli ışık ve spot yerleşimi ev, ofis, mağaza ve otel projelerinde nasıl planlanmalı?",
    focusKeyword: "asma tavan Kıbrıs",
    publishedAt: "2026-03-04T09:00:00.000Z",
    readingTime: 3,
    seoDescription:
      "Asma tavan Kıbrıs projelerinde gizli ışık, spot, tavan yüksekliği, klima ve alçıpan detayları için dekorasyon planlama rehberi.",
    seoTitle: "Asma Tavan ve Gizli Işık Planlama Rehberi",
    slug: "asma-tavan-gizli-isik-planlama-rehberi",
    status: "published",
    tags: ["asma tavan", "gizli ışık", "alçıpan"],
    title: "Asma Tavan ve Gizli Işık Planlama Rehberi",
    updatedAt: "2026-03-04T09:00:00.000Z",
  },
  {
    author: "Adem Eren Decoration",
    category: "İskele Dekorasyon",
    content:
      "## İskele'de yeni konut dekorasyonu nasıl ele alınmalı?\n\nİskele bölgesinde yeni konut, villa ve sahil evi projelerinde malzeme seçimi teslim sonrası kullanım alışkanlıklarına göre yapılmalıdır. SPC parke, SPC duvar paneli, marble sheet ve dekoratif çıta kararları aynı anda düşünülürse mekan daha bütünlüklü olur.\n\n## Sahil koşulları neden önemli?\n\nNem, temizlik sıklığı, kiralık kullanım ve hızlı yenileme ihtiyacı yüzey seçimini etkiler. Bu nedenle banyo, mutfak, giriş alanı ve salon zeminleri ayrı ayrı değerlendirilmelidir.\n\n## Başlamadan önce hazırlayın\n\n- Daire veya villa planı\n- Banyo ve mutfak fotoğrafları\n- İstenen renk/doku örnekleri\n- Zemin ve duvar metrajı\n- Teslim ve taşınma takvimi\n\nİskele dekorasyon projelerinde doğru planlama, yeni konutu daha hızlı ve daha kullanışlı hale getirir.",
    coverImage: "/images/ae-vision-hero.jpg",
    coverImageAlt:
      "İskele yeni konut dekorasyonu için SPC panel ve zemin seçimi",
    excerpt:
      "İskele yeni konut, villa ve sahil evi projelerinde SPC parke, duvar paneli, marble sheet ve dekoratif çıta nasıl planlanır?",
    focusKeyword: "İskele dekorasyon",
    publishedAt: "2026-03-11T09:00:00.000Z",
    readingTime: 3,
    seoDescription:
      "İskele dekorasyon projelerinde yeni konut, villa ve sahil evi için SPC parke, duvar paneli, marble sheet ve çıta seçimi rehberi.",
    seoTitle: "İskele Yeni Konut Dekorasyonunda SPC Panel Seçimi",
    slug: "iskele-yeni-konut-dekorasyonu-spc-panel-secimi",
    status: "published",
    tags: ["İskele dekorasyon", "SPC panel", "villa dekorasyon"],
    title: "İskele Yeni Konut Dekorasyonunda SPC Panel Seçimi",
    updatedAt: "2026-03-11T09:00:00.000Z",
  },
  {
    author: "Adem Eren Decoration",
    category: "Gazimağusa Dekorasyon",
    content:
      "## Kiralık dairelerde dayanıklılık neden öne çıkar?\n\nGazimağusa'da kiralık daire, öğrenci evi ve apart projelerinde dekorasyon malzemeleri sık kullanıma dayanmalı, kolay temizlenmeli ve hızlı yenilenebilmelidir. SPC zemin kaplama, duvar paneli ve pratik tavan detayları bu nedenle sık değerlendirilir.\n\n## Hangi alanlar önce yenilenmeli?\n\nGiriş, salon zemini, mutfak duvarı, banyo paneli ve TV arkası gibi alanlar kiralık konutlarda ilk izlenimi belirler. Her alanı aynı anda değiştirmek şart değildir; doğru öncelik sıralaması bütçeyi daha verimli kullanır.\n\n## Malzeme seçimi için ipuçları\n\n- Açık renkler alanı ferah gösterir\n- Suya dayanıklı yüzeyler bakım yükünü azaltır\n- Duvar paneli hızlı görsel etki sağlar\n- SPC parke yoğun kullanıma uygundur\n- Kolay temizlenen yüzeyler tercih edilmelidir\n\nGazimağusa dekorasyon projelerinde hedef, dayanıklılık ve temiz görünümü aynı bütçe içinde dengelemektir.",
    coverImage: "/images/kermit-floor-application.jpg",
    coverImageAlt:
      "Gazimağusa kiralık daire dekorasyonu için SPC zemin kaplama",
    excerpt:
      "Gazimağusa kiralık daire, öğrenci evi ve apart projelerinde dayanıklı SPC zemin, duvar paneli ve pratik yüzey seçimi.",
    focusKeyword: "Gazimağusa dekorasyon",
    publishedAt: "2026-03-18T09:00:00.000Z",
    readingTime: 3,
    seoDescription:
      "Gazimağusa dekorasyon projelerinde kiralık daire ve öğrenci evleri için SPC zemin kaplama, duvar paneli ve dayanıklı malzeme rehberi.",
    seoTitle: "Gazimağusa Kiralık Daire Dekorasyonu İçin Malzemeler",
    slug: "gazimagusa-kiralik-daire-dekorasyonu",
    status: "published",
    tags: ["Gazimağusa dekorasyon", "kiralık daire", "SPC zemin kaplama"],
    title: "Gazimağusa Kiralık Daire Dekorasyonu İçin Dayanıklı Malzemeler",
    updatedAt: "2026-03-18T09:00:00.000Z",
  },
  {
    author: "Adem Eren Decoration",
    category: "Lefkoşa Dekorasyon",
    content:
      "## Ofis dekorasyonunda ilk karar yüzey planıdır\n\nLefkoşa ofis dekorasyonu yapılırken yalnızca mobilya değil zemin, duvar, tavan ve aydınlatma ilişkisi de planlanmalıdır. SPC parke, akustik panel, dekoratif çıta, alçıpan ve asma tavan kararları ofisin kullanım deneyimini doğrudan etkiler.\n\n## Ofislerde hangi yüzeyler önemlidir?\n\nToplantı odası, giriş alanı, çalışma bölümü ve yönetici odası farklı ihtiyaçlara sahiptir. Akustik konfor, kolay temizlik, marka rengi ve aydınlatma kalitesi birlikte değerlendirilmelidir.\n\n## Planlama adımları\n\n- Ofis kullanım senaryosu çıkarılır\n- Zemin ve duvar numuneleri karşılaştırılır\n- Akustik ihtiyaçlar belirlenir\n- Aydınlatma ve tavan detayları planlanır\n- Uygulama takvimi iş akışına göre yapılır\n\nLefkoşa ofis dekorasyonunda iyi sonuç, malzemeleri tek tek değil bir bütün olarak seçmekle elde edilir.",
    coverImage: "/images/ae-spc-is-sureci.jpg",
    coverImageAlt:
      "Lefkoşa ofis dekorasyonu için SPC panel ve akustik yüzey seçimi",
    excerpt:
      "Lefkoşa ofis dekorasyonunda SPC parke, akustik panel, dekoratif çıta, alçıpan ve asma tavan nasıl birlikte planlanır?",
    focusKeyword: "Lefkoşa ofis dekorasyon",
    publishedAt: "2026-03-25T09:00:00.000Z",
    readingTime: 3,
    seoDescription:
      "Lefkoşa ofis dekorasyon projelerinde SPC parke, akustik panel, dekoratif çıta, alçıpan, asma tavan ve aydınlatma planlama rehberi.",
    seoTitle: "Lefkoşa Ofis Dekorasyonunda Zemin, Duvar ve Tavan",
    slug: "lefkosa-ofis-dekorasyonu-zemin-duvar-tavan",
    status: "published",
    tags: ["Lefkoşa ofis dekorasyon", "akustik panel", "SPC parke"],
    title: "Lefkoşa Ofis Dekorasyonunda Zemin, Duvar ve Tavan Planı",
    updatedAt: "2026-03-25T09:00:00.000Z",
  },
  {
    author: "Adem Eren Decoration",
    category: "Girne Dekorasyon",
    content:
      "## Girne villa dekorasyonunda sahil etkisi düşünülmeli\n\nGirne'de villa ve sahil evi dekorasyonu yapılırken nem, ışık, manzara ve kullanım yoğunluğu malzeme seçimini etkiler. SPC parke, marble sheet, SPC duvar paneli ve dekoratif çıta gibi yüzeyler bu koşullara göre değerlendirilmelidir.\n\n## Hangi malzemeler öne çıkar?\n\nSalon ve yatak odalarında sıcak ahşap tonlu SPC parke, banyo ve mutfakta suya dayanıklı panel, giriş ve merdiven çevresinde dayanıklı yüzeyler düşünülebilir. Büyük pencereli alanlarda numune mutlaka gün ışığında incelenmelidir.\n\n## Villa projesinde karar sırası\n\n- Zemin tonu seçilir\n- Banyo ve mutfak paneli belirlenir\n- TV arkası veya vurgu duvarı planlanır\n- Çıta, lambri veya akustik detaylar eklenir\n- Tavan ve aydınlatma dili netleşir\n\nGirne villa dekorasyonunda amaç, sahil yaşamına uygun dayanıklı ama sıcak bir iç mekan oluşturmaktır.",
    coverImage: "/images/kermit-floor-application.jpg",
    coverImageAlt:
      "Girne villa dekorasyonu için SPC parke ve panel seçimi",
    excerpt:
      "Girne villa ve sahil evi dekorasyonunda nem, gün ışığı, SPC parke, marble sheet, duvar paneli ve çıta seçimi nasıl yapılır?",
    focusKeyword: "Girne villa dekorasyon",
    publishedAt: "2026-04-01T09:00:00.000Z",
    readingTime: 3,
    seoDescription:
      "Girne villa dekorasyon projelerinde sahil koşullarına uygun SPC parke, marble sheet, duvar paneli, dekoratif çıta ve tavan planlama rehberi.",
    seoTitle: "Girne Villa Dekorasyonunda Sahile Uygun Malzemeler",
    slug: "girne-villa-dekorasyonu-sahil-malzeme-secimi",
    status: "published",
    tags: ["Girne villa dekorasyon", "SPC parke", "marble sheet"],
    title: "Girne Villa Dekorasyonunda Sahile Uygun Malzeme Seçimi",
    updatedAt: "2026-04-01T09:00:00.000Z",
  },
  {
    author: "Adem Eren Decoration",
    category: "Tadilat Dekorasyon",
    content:
      "## Güzelyurt ve Lefke projelerinde pratik planlama önemlidir\n\nGüzelyurt ve Lefke'de ev tadilatı yapılırken çoğu zaman amaç tüm mekanı baştan yapmak değil, doğru yüzeyleri doğru sırayla yenilemektir. SPC parke, duvar paneli, alçıpan, asma tavan ve dekoratif çıta bu süreçte aşamalı şekilde planlanabilir.\n\n## Öncelik nasıl belirlenir?\n\nZemin çok yıpranmışsa önce SPC zemin kaplama düşünülür. Duvarlarda nem, kırık veya eski seramik varsa panel ya da alçıpan çözümü değerlendirilir. Tavan ve ışık sorunları varsa asma tavan planı proje kapsamına alınır.\n\n## Aşamalı tadilat avantajı\n\n- Bütçe daha kontrollü kullanılır\n- Öncelikli alanlar hızlı yenilenir\n- Malzeme seçimleri birlikte uyumlu kalır\n- Gereksiz kırma-dökme azaltılır\n- Sonraki etaplar daha net planlanır\n\nDoğru keşif ve numune seçimiyle küçük yenilemeler bile evin kullanım hissini ciddi şekilde değiştirebilir.",
    coverImage: "/images/ae-mission-hero.jpg",
    coverImageAlt:
      "Güzelyurt ve Lefke ev tadilatı için SPC panel ve dekorasyon planı",
    excerpt:
      "Güzelyurt ve Lefke ev tadilatı projelerinde SPC parke, duvar paneli, alçıpan, asma tavan ve çıta aşamalı nasıl planlanır?",
    focusKeyword: "Güzelyurt Lefke ev tadilatı",
    publishedAt: "2026-04-08T09:00:00.000Z",
    readingTime: 3,
    seoDescription:
      "Güzelyurt ve Lefke ev tadilatı için SPC parke, duvar paneli, alçıpan, asma tavan ve dekoratif çıta ile aşamalı dekorasyon rehberi.",
    seoTitle: "Güzelyurt ve Lefke Ev Tadilatı İçin Dekorasyon Rehberi",
    slug: "guzelyurt-lefke-ev-tadilati-dekorasyon-rehberi",
    status: "published",
    tags: ["Güzelyurt dekorasyon", "Lefke dekorasyon", "ev tadilatı"],
    title: "Güzelyurt ve Lefke Ev Tadilatı İçin Aşamalı Dekorasyon Rehberi",
    updatedAt: "2026-04-08T09:00:00.000Z",
  },
  {
    author: "Adem Eren Decoration",
    category: "Malzeme Seçimi",
    content:
      "## Panel seçimi yalnızca renk seçimi değildir\n\nSPC panel, marble sheet, akustik panel, lambri ve dekoratif çıta gibi malzemeler aynı projede kullanılabilir. Ancak her malzeme farklı bir göreve hizmet eder. Doğru seçim için mekanın kullanım amacı, nem durumu, ışık, mobilya ve bakım beklentisi birlikte değerlendirilmelidir.\n\n## Karşılaştırma nasıl yapılmalı?\n\nÖnce yüzeyin problemi tanımlanır: dekoratif görünüm mü, suya dayanıklılık mı, ses konforu mu, hızlı yenileme mi? Sonra bu ihtiyaca göre malzeme grubu seçilir. Banyo için SPC panel veya marble sheet öne çıkarken toplantı odasında akustik panel daha doğru olabilir.\n\n## Kısa karar rehberi\n\n- Islak hacim: SPC panel veya marble sheet\n- Zemin: SPC parke veya SPC zemin kaplama\n- Ses konforu: akustik panel\n- Klasik duvar etkisi: dekoratif çıta\n- Tavan ve niş: alçıpan ve asma tavan\n\nMalzemeleri doğru sırayla seçmek, hem maliyeti hem de uygulama süresini daha öngörülebilir hale getirir.",
    coverImage: "/images/ae-spc-is-sureci.jpg",
    coverImageAlt:
      "Kuzey Kıbrıs iç mekan için SPC panel marble sheet ve akustik panel seçimi",
    excerpt:
      "SPC panel, marble sheet, akustik panel, lambri ve dekoratif çıta hangi projelerde seçilmeli? Kısa malzeme karar rehberi.",
    focusKeyword: "Kuzey Kıbrıs dekorasyon malzemeleri",
    publishedAt: "2026-04-15T09:00:00.000Z",
    readingTime: 3,
    seoDescription:
      "Kuzey Kıbrıs dekorasyon malzemeleri için SPC panel, marble sheet, akustik panel, lambri, dekoratif çıta ve SPC parke seçim rehberi.",
    seoTitle: "SPC Panel, Marble Sheet ve Akustik Panel Nasıl Seçilir?",
    slug: "spc-panel-marble-sheet-akustik-panel-secimi",
    status: "published",
    tags: ["SPC panel", "marble sheet", "akustik panel", "dekoratif çıta"],
    title: "SPC Panel, Marble Sheet ve Akustik Panel Nasıl Seçilir?",
    updatedAt: "2026-04-15T09:00:00.000Z",
  },
];

const toText = (value: unknown, fallback = "") =>
  typeof value === "string" ? value.trim() : fallback;

const toTextList = (value: unknown) =>
  Array.isArray(value)
    ? value.map((item) => toText(item)).filter(Boolean)
    : [];

const toValidIsoDate = (value: unknown, fallback = nowIso()) => {
  const text = toText(value);
  return Date.parse(text) ? new Date(text).toISOString() : fallback;
};

const getReadingTime = (content: string) => {
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 180));
};

const normalizeBlogPost = (
  value: unknown,
  index: number,
  usedSlugs: Map<string, number>,
): BlogPost => {
  const candidate = value as Partial<BlogPost> | undefined;
  const fallback = defaultBlogPosts[index] ?? defaultBlogPosts[0];
  const title = toText(candidate?.title, fallback.title);
  const baseSlug =
    createBlogSlug(toText(candidate?.slug)) ||
    createBlogSlug(title) ||
    `blog-yazisi-${index + 1}`;
  const slugUseCount = usedSlugs.get(baseSlug) ?? 0;
  const slug = slugUseCount === 0 ? baseSlug : `${baseSlug}-${slugUseCount + 1}`;
  const content = toText(candidate?.content, fallback.content);
  const publishedAt = toValidIsoDate(candidate?.publishedAt, fallback.publishedAt);
  const updatedAt = toValidIsoDate(candidate?.updatedAt, publishedAt);
  const status: BlogPostStatus =
    candidate?.status === "draft" ? "draft" : "published";

  usedSlugs.set(baseSlug, slugUseCount + 1);

  return {
    author: toText(candidate?.author, fallback.author),
    category: toText(candidate?.category, fallback.category),
    content,
    coverImage: toText(candidate?.coverImage, fallback.coverImage),
    coverImageAlt: toText(candidate?.coverImageAlt, fallback.coverImageAlt),
    excerpt: toText(candidate?.excerpt, fallback.excerpt).slice(0, 360),
    focusKeyword: toText(candidate?.focusKeyword, fallback.focusKeyword),
    publishedAt,
    readingTime: Number.isFinite(candidate?.readingTime)
      ? Math.max(1, Number(candidate?.readingTime))
      : getReadingTime(content),
    seoDescription: toText(
      candidate?.seoDescription,
      fallback.seoDescription,
    ).slice(0, 180),
    seoTitle: toText(candidate?.seoTitle, fallback.seoTitle || title).slice(
      0,
      90,
    ),
    slug,
    status,
    tags: toTextList(candidate?.tags).length
      ? Array.from(new Set(toTextList(candidate?.tags))).slice(0, 12)
      : fallback.tags,
    title,
    updatedAt,
  };
};

export const normalizeBlogPosts = (value: unknown): BlogPost[] => {
  const usedSlugs = new Map<string, number>();
  const sourcePosts = Array.isArray(value) && value.length > 0
    ? value
    : defaultBlogPosts;

  return sourcePosts
    .map((post, index) => normalizeBlogPost(post, index, usedSlugs))
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
};

const filterVisiblePosts = (
  posts: BlogPost[],
  options: BlogPostStoreOptions = {},
) => options.includeDrafts ? posts : posts.filter((post) => post.status === "published");

async function getBackendBlogPosts(options: BlogPostStoreOptions = {}) {
  const endpoint = getBackendEndpoint(
    `/api/blog-posts${options.includeDrafts ? "?includeDrafts=1" : ""}`,
  );

  if (!endpoint) {
    return null;
  }

  try {
    const response = await fetch(endpoint, {
      cache: "no-store",
      headers: options.includeDrafts
        ? { "x-admin-token": backendAdminToken }
        : undefined,
    });

    if (!response.ok) {
      throw new Error(`Sunucu ${response.status} döndürdü`);
    }

    const payload = (await response.json()) as { posts?: unknown };

    return filterVisiblePosts(normalizeBlogPosts(payload.posts), options);
  } catch (error) {
    const backendError = error as Error;
    console.warn("Yerel blog içeriklerine geçiliyor:", backendError.message);

    return null;
  }
}

export async function getManagedBlogPosts(
  options: BlogPostStoreOptions = {},
) {
  const backendPosts = await getBackendBlogPosts(options);

  if (backendPosts) {
    return backendPosts;
  }

  try {
    const file = await fs.readFile(blogPostsFilePath, "utf8");
    return filterVisiblePosts(normalizeBlogPosts(JSON.parse(file)), options);
  } catch (error) {
    const fileError = error as NodeJS.ErrnoException;

    if (fileError.code !== "ENOENT") {
      console.warn("Başlangıç blog içeriklerine geçiliyor:", fileError.message);
    }

    return filterVisiblePosts(defaultBlogPosts, options);
  }
}

export async function getManagedBlogPostBySlug(
  slug: string,
  options: BlogPostStoreOptions = {},
) {
  const posts = await getManagedBlogPosts(options);
  return posts.find((post) => post.slug === slug);
}

export async function saveManagedBlogPosts(posts: BlogPost[]) {
  const normalizedPosts = normalizeBlogPosts(posts);
  const endpoint = getBackendEndpoint("/api/blog-posts");

  if (endpoint) {
    const response = await fetch(endpoint, {
      body: JSON.stringify({ posts: normalizedPosts }),
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": backendAdminToken,
      },
      method: "PUT",
    });
    const payload = (await response.json()) as {
      message?: string;
      posts?: unknown;
    };

    if (!response.ok) {
      throw new Error(payload.message || `Sunucu ${response.status} döndürdü`);
    }

    return normalizeBlogPosts(payload.posts);
  }

  await fs.mkdir(path.dirname(blogPostsFilePath), { recursive: true });
  await fs.writeFile(
    blogPostsFilePath,
    `${JSON.stringify(normalizedPosts, null, 2)}\n`,
    "utf8",
  );

  return normalizedPosts;
}

export async function resetManagedBlogPosts() {
  const endpoint = getBackendEndpoint("/api/blog-posts/reset");

  if (endpoint) {
    const response = await fetch(endpoint, {
      body: JSON.stringify({ action: "reset" }),
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": backendAdminToken,
      },
      method: "POST",
    });
    const payload = (await response.json()) as {
      message?: string;
      posts?: unknown;
    };

    if (!response.ok) {
      throw new Error(payload.message || `Sunucu ${response.status} döndürdü`);
    }

    return normalizeBlogPosts(payload.posts);
  }

  await fs.mkdir(path.dirname(blogPostsFilePath), { recursive: true });
  await fs.writeFile(
    blogPostsFilePath,
    `${JSON.stringify(defaultBlogPosts, null, 2)}\n`,
    "utf8",
  );

  return defaultBlogPosts;
}
