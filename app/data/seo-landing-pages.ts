export type SeoLandingFaq = {
  answer: string;
  question: string;
};

export type SeoLandingPage = {
  applications: string[];
  benefits: string[];
  description: string;
  faqs: SeoLandingFaq[];
  heroImage: string;
  heroImageAlt: string;
  intro: string[];
  keywords: string[];
  primaryKeyword: string;
  process: string[];
  related: Array<{
    href: string;
    label: string;
  }>;
  serviceType: string;
  slug: string;
  title: string;
};

export const seoLandingPages: SeoLandingPage[] = [
  {
    applications: [
      "Villa, apartman ve kiralık konut zeminleri",
      "Ofis, showroom ve mağaza alanları",
      "Otel odaları ve ortak kullanım alanları",
      "Mevcut zemini kırmadan yenileme gereken projeler",
    ],
    benefits: [
      "Suya dayanıklı rijit çekirdekli yapı",
      "Ahşap görünümlü sıcak ve modern yüzey etkisi",
      "Yoğun kullanıma uygun pratik temizlik",
      "Numune, metraj ve uygulama planlamasıyla net süreç",
    ],
    description:
      "Kuzey Kıbrıs'ta SPC parke arayan ev, villa, ofis, otel ve mağaza projeleri için suya dayanıklı parke seçimi, numune, metraj ve uygulama planlama desteği.",
    faqs: [
      {
        answer:
          "SPC parke; ev, villa, ofis, mağaza, otel ve kiralık konut projelerinde suya dayanıklı ve pratik zemin çözümü olarak tercih edilir.",
        question: "SPC parke Kuzey Kıbrıs'ta nerelerde kullanılır?",
      },
      {
        answer:
          "Laminat parke ahşap bazlıdır; SPC parke ise rijit mineral kompozit çekirdeğiyle suya ve neme karşı daha dayanıklı bir alternatiftir.",
        question: "SPC parke ile laminat parke farkı nedir?",
      },
      {
        answer:
          "Fiyat; seçilen seri, metraj, zemin hazırlığı ve uygulama detayına göre değişir. Net teklif için mekan ölçüsü ve numune seçimi gerekir.",
        question: "SPC parke fiyatı nasıl hesaplanır?",
      },
    ],
    heroImage: "/images/kermit-floor-application.jpg",
    heroImageAlt: "Kuzey Kıbrıs modern iç mekanda SPC parke uygulaması",
    intro: [
      "SPC parke, Kuzey Kıbrıs'ta nem, yoğun kullanım ve hızlı yenileme ihtiyacı olan projeler için güçlü bir zemin kaplama seçeneğidir.",
      "Adem Eren Decoration; Lefkoşa, Girne, Gazimağusa, İskele ve çevresindeki projelerde doğru renk, doku, metraj ve uygulama sürecini birlikte planlar.",
    ],
    keywords: [
      "SPC parke Kıbrıs",
      "SPC parke Kuzey Kıbrıs",
      "SPC parke fiyatları Kıbrıs",
      "Lefkoşa SPC parke",
      "Girne SPC parke",
    ],
    primaryKeyword: "SPC parke Kıbrıs",
    process: [
      "Mekan fotoğrafı, kullanım yoğunluğu ve mevcut zemin durumu incelenir.",
      "Ahşap tonu, açık/koyu renk ve yüzey hissi için numune seçenekleri belirlenir.",
      "Metraj, süpürgelik, geçiş profili ve zemin hazırlığı kontrol edilir.",
      "Uygulama takvimi ve proje koordinasyonu netleştirilir.",
    ],
    related: [
      { href: "/spc-zemin-kaplama-kibris", label: "SPC zemin kaplama" },
      { href: "/spc-duvar-paneli-kibris", label: "SPC duvar paneli" },
      { href: "/ic-mekan-dekorasyon-kibris", label: "İç mekan dekorasyon" },
    ],
    serviceType: "SPC parke seçimi ve uygulama planlama",
    slug: "spc-parke-kibris",
    title: "Kuzey Kıbrıs SPC Parke",
  },
  {
    applications: [
      "Ev ve villa zemin yenileme",
      "Ticari mağaza ve showroom zeminleri",
      "Ofis ve çalışma alanları",
      "Otel, kafe ve yoğun kullanılan iç mekanlar",
    ],
    benefits: [
      "Suya dayanıklı zemin kaplama alternatifi",
      "Seri uygulama ve düşük bakım ihtiyacı",
      "Ahşap, taş ve modern yüzey seçenekleri",
      "Proje öncesi metraj ve detay kontrolü",
    ],
    description:
      "Kuzey Kıbrıs'ta SPC zemin kaplama için ev, ofis, mağaza, otel ve villa projelerine uygun numune seçimi, metraj planlama ve uygulama desteği.",
    faqs: [
      {
        answer:
          "SPC zemin kaplama, yoğun kullanıma ve neme daha dayanıklı bir zemin isteyen konut ve ticari projelerde kullanılır.",
        question: "SPC zemin kaplama hangi projeler için uygundur?",
      },
      {
        answer:
          "Seçilen ürüne ve mevcut zemine göre değişir. Bu nedenle uygulamadan önce zemin düzgünlüğü, kapı geçişleri ve metraj kontrol edilir.",
        question: "SPC zemin kaplama mevcut zeminin üstüne yapılabilir mi?",
      },
      {
        answer:
          "SPC zemin kaplama kolay temizlenir; düzenli süpürme ve nemli temizlik genellikle yeterlidir.",
        question: "SPC zemin kaplama bakımı zor mu?",
      },
    ],
    heroImage: "/images/kermit-elite-p220.jpg",
    heroImageAlt: "Kuzey Kıbrıs koyu tonlu SPC zemin kaplama örneği",
    intro: [
      "SPC zemin kaplama, Kuzey Kıbrıs'ta hem modern görünüm hem de pratik kullanım isteyen projeler için güçlü bir alternatiftir.",
      "Mekan kullanımını, renk hedefini ve mevcut zemin koşullarını birlikte değerlendirerek doğru SPC zemin çözümünü seçmeye yardımcı oluruz.",
    ],
    keywords: [
      "SPC zemin kaplama Kıbrıs",
      "SPC zemin kaplama Kuzey Kıbrıs",
      "Kıbrıs zemin kaplama",
      "Lefkoşa zemin kaplama",
      "Girne zemin kaplama",
    ],
    primaryKeyword: "SPC zemin kaplama Kıbrıs",
    process: [
      "Zemin fotoğrafları ve kullanım amacı değerlendirilir.",
      "Uygun SPC kalınlığı, renk ve yüzey seçenekleri belirlenir.",
      "Metraj, fire payı ve kenar detayları planlanır.",
      "Uygulama günü için saha hazırlığı netleştirilir.",
    ],
    related: [
      { href: "/spc-parke-kibris", label: "SPC parke" },
      { href: "/spc-seramik-kibris", label: "SPC seramik" },
      { href: "/ic-mekan-dekorasyon-kibris", label: "İç mekan dekorasyon" },
    ],
    serviceType: "SPC zemin kaplama seçimi ve uygulama planlama",
    slug: "spc-zemin-kaplama-kibris",
    title: "Kuzey Kıbrıs SPC Zemin Kaplama",
  },
  {
    applications: [
      "Banyo ve mutfak zemin-duvar yenilemeleri",
      "Seramik görünümü istenen hızlı renovasyon projeleri",
      "Otel, villa ve ticari ıslak hacim alanları",
      "Mermer, taş veya modern yüzey etkisi gereken iç mekanlar",
    ],
    benefits: [
      "Seramik görünümünü daha pratik yüzey planlamasıyla sunar",
      "SPC panel ve marble sheet seçenekleriyle birlikte değerlendirilebilir",
      "Banyo ve mutfak gibi alanlarda güçlü görsel etki oluşturur",
      "Numune seçimiyle desen, renk ve ölçü kararı netleşir",
    ],
    description:
      "Kuzey Kıbrıs'ta SPC seramik görünümü arayan banyo, mutfak, villa, otel ve ticari renovasyon projeleri için yüzey seçimi ve uygulama planlama desteği.",
    faqs: [
      {
        answer:
          "SPC seramik görünümü, seramik veya taş etkisi istenen banyo, mutfak ve iç mekan yüzeylerinde alternatif olarak değerlendirilir.",
        question: "SPC seramik nerelerde kullanılır?",
      },
      {
        answer:
          "SPC seramik görünümü, klasik seramik etkisini daha hızlı planlanabilen panel veya zemin kaplama çözümleriyle elde etmeye yardımcı olur.",
        question: "SPC seramik klasik seramikten farklı mı?",
      },
      {
        answer:
          "Banyo ve mutfak gibi alanlarda yüzeyin sağlamlığı, nem koşulları, ölçü ve bitiş detayları uygulama öncesinde kontrol edilmelidir.",
        question: "SPC seramik uygulamasında nelere dikkat edilir?",
      },
    ],
    heroImage: "/images/kermit-wall-panel-613.jpg",
    heroImageAlt: "Kuzey Kıbrıs SPC seramik ve mermer görünümlü panel yüzeyi",
    intro: [
      "SPC seramik, Kuzey Kıbrıs'ta seramik veya taş görünümü isteyen ama daha pratik bir yüzey planı arayan projelerde öne çıkan bir arama niyetidir.",
      "Banyo, mutfak, villa ve ticari alanlarda SPC panel, marble sheet ve SPC zemin kaplama seçeneklerini birlikte değerlendirerek doğru yüzey kararını oluştururuz.",
    ],
    keywords: [
      "SPC seramik Kıbrıs",
      "SPC seramik Kuzey Kıbrıs",
      "seramik görünümlü SPC panel",
      "banyo SPC seramik",
      "Kıbrıs seramik alternatifi",
    ],
    primaryKeyword: "SPC seramik Kıbrıs",
    process: [
      "Seramik görünümü istenen yüzey ve kullanım alanı belirlenir.",
      "SPC panel, marble sheet veya zemin kaplama alternatifi karşılaştırılır.",
      "Desen yönü, ölçü, köşe ve bitiş detayları planlanır.",
      "Uygulama sırası ve numune seçimi netleştirilir.",
    ],
    related: [
      { href: "/spc-zemin-kaplama-kibris", label: "SPC zemin kaplama" },
      { href: "/spc-duvar-paneli-kibris", label: "SPC duvar paneli" },
      { href: "/marble-sheet-kibris", label: "Marble sheet" },
    ],
    serviceType: "SPC seramik görünümlü yüzey seçimi ve planlama",
    slug: "spc-seramik-kibris",
    title: "Kuzey Kıbrıs SPC Seramik",
  },
  {
    applications: [
      "Banyo ve ıslak hacim duvarları",
      "Mutfak arası ve tezgah arkası yüzeyler",
      "TV arkası ve vurgu duvarları",
      "Otel, ofis ve ticari iç mekan duvarları",
    ],
    benefits: [
      "Suya dayanıklı duvar paneli çözümü",
      "Mermer, taş, beton ve ahşap görünüm seçenekleri",
      "Seramik kırımı olmadan hızlı yenileme imkanı",
      "Geniş ebatlı yüzeylerle daha az derz görünümü",
    ],
    description:
      "Kuzey Kıbrıs'ta SPC duvar paneli arayan banyo, mutfak, TV arkası, ofis, otel ve ticari projeler için suya dayanıklı panel seçimi ve uygulama planlaması.",
    faqs: [
      {
        answer:
          "SPC duvar paneli banyo, mutfak, ıslak hacim, TV arkası ve ticari vurgu duvarlarında kullanılabilir.",
        question: "SPC duvar paneli nerelerde kullanılır?",
      },
      {
        answer:
          "Uygun yüzey hazırlığı yapıldığında hızlı renovasyon için değerlendirilebilir. Mevcut yüzeyin sağlamlığı mutlaka kontrol edilmelidir.",
        question: "SPC duvar paneli seramik üzerine uygulanır mı?",
      },
      {
        answer:
          "Seçilen panel modeli, metraj, yüzey hazırlığı ve uygulama detayına göre fiyat değişir.",
        question: "SPC duvar paneli fiyatı neye göre değişir?",
      },
    ],
    heroImage: "/images/kermit-wall-application.jpg",
    heroImageAlt: "Kuzey Kıbrıs banyo için SPC duvar paneli uygulaması",
    intro: [
      "SPC duvar paneli, Kuzey Kıbrıs'ta banyo, mutfak ve modern iç mekan duvarlarını daha hızlı ve temiz şekilde yenilemek için tercih edilir.",
      "Adem Eren Decoration, panel seçimi, renk uyumu, ölçü ve uygulama planını proje başlamadan netleştirir.",
    ],
    keywords: [
      "SPC duvar paneli Kıbrıs",
      "SPC panel Kıbrıs",
      "banyo duvar paneli Kıbrıs",
      "suya dayanıklı duvar paneli",
      "Lefkoşa SPC panel",
    ],
    primaryKeyword: "SPC duvar paneli Kıbrıs",
    process: [
      "Duvar fotoğrafı, ölçü ve kullanım alanı incelenir.",
      "Mermer, taş, beton veya ahşap görünüm alternatifi seçilir.",
      "Yüzey hazırlığı, bitiş profili ve panel yönü planlanır.",
      "Uygulama tarihi ve saha koordinasyonu belirlenir.",
    ],
    related: [
      { href: "/duvar-paneli-kibris", label: "Duvar paneli" },
      { href: "/marble-sheet-kibris", label: "Marble sheet" },
      { href: "/akustik-panel-kibris", label: "Akustik panel" },
    ],
    serviceType: "SPC duvar paneli seçimi ve uygulama planlama",
    slug: "spc-duvar-paneli-kibris",
    title: "Kuzey Kıbrıs SPC Duvar Paneli",
  },
  {
    applications: [
      "Salon ve TV arkası duvar tasarımları",
      "Banyo ve mutfak yüzey yenilemeleri",
      "Ofis, klinik, mağaza ve resepsiyon alanları",
      "Otel odası ve kafe iç mekan dekorasyonu",
    ],
    benefits: [
      "Dekoratif yüzey etkisiyle hızlı dönüşüm",
      "SPC, akustik, lambri ve çıta ile kombinasyon imkanı",
      "Modern, klasik veya doğal yüzey seçenekleri",
      "Proje bazlı ölçü ve malzeme yönlendirmesi",
    ],
    description:
      "Kuzey Kıbrıs'ta duvar paneli arayan ev, ofis, mağaza, otel ve banyo projeleri için dekoratif panel seçimi, numune, ölçü ve uygulama planlama hizmeti.",
    faqs: [
      {
        answer:
          "Duvar paneli salon, TV arkası, banyo, ofis, mağaza, otel ve ticari alanlarda dekoratif yüzey yenileme için kullanılır.",
        question: "Duvar paneli hangi alanlarda kullanılır?",
      },
      {
        answer:
          "SPC panel suya dayanıklı alanlarda, akustik panel ses konforu gereken yerlerde, lambri ve çıta ise dekoratif görünüm için tercih edilir.",
        question: "Hangi duvar paneli türünü seçmeliyim?",
      },
      {
        answer:
          "Uygulama öncesi duvar düzgünlüğü, nem durumu, panel yönü ve bitiş detayları kontrol edilmelidir.",
        question: "Duvar paneli uygulamasında nelere dikkat edilir?",
      },
    ],
    heroImage: "/images/ae-mission-hero.jpg",
    heroImageAlt: "Kuzey Kıbrıs iç mekanda duvar paneli ölçü ve uygulama planlaması",
    intro: [
      "Duvar paneli, Kuzey Kıbrıs dekorasyon projelerinde mekanı hızlı şekilde değiştiren en etkili yüzey çözümlerinden biridir.",
      "SPC panel, marble sheet, akustik panel, lambri ve dekoratif çıta seçeneklerini mekan ihtiyacına göre birlikte değerlendiriyoruz.",
    ],
    keywords: [
      "duvar paneli Kıbrıs",
      "duvar paneli Kuzey Kıbrıs",
      "dekoratif duvar paneli",
      "TV arkası duvar paneli Kıbrıs",
      "banyo duvar paneli",
    ],
    primaryKeyword: "duvar paneli Kıbrıs",
    process: [
      "Mekan tarzı ve kullanılacak duvar belirlenir.",
      "SPC, akustik, lambri, marble sheet veya çıta alternatifi seçilir.",
      "Ölçü, köşe, bitiş ve varsa elektrik detayları kontrol edilir.",
      "Uygulama süreci ve malzeme listesi netleştirilir.",
    ],
    related: [
      { href: "/spc-duvar-paneli-kibris", label: "SPC duvar paneli" },
      { href: "/dekoratif-cita-kibris", label: "Dekoratif çıta" },
      { href: "/marble-sheet-kibris", label: "Marble sheet" },
    ],
    serviceType: "Duvar paneli seçimi ve uygulama planlama",
    slug: "duvar-paneli-kibris",
    title: "Kuzey Kıbrıs Duvar Paneli",
  },
  {
    applications: [
      "Banyo ve duş alanı duvarları",
      "Mutfak ve tezgah arkası yüzeyler",
      "Resepsiyon, TV arkası ve lobi duvarları",
      "Mermer görünümü istenen hızlı renovasyon projeleri",
    ],
    benefits: [
      "Mermer görünümünü daha pratik uygulama süreciyle sunar",
      "Geniş yüzeylerde daha temiz ve bütünlüklü görünüm sağlar",
      "Islak hacim projelerinde güçlü görsel etki oluşturur",
      "SPC panel ve dekoratif çıta ile birlikte planlanabilir",
    ],
    description:
      "Kuzey Kıbrıs'ta marble sheet arayan banyo, mutfak, lobi, resepsiyon ve TV arkası projeleri için mermer görünümlü panel seçimi ve uygulama planlaması.",
    faqs: [
      {
        answer:
          "Marble sheet, mermer görünümü istenen banyo, mutfak, lobi, TV arkası ve ticari iç mekan duvarlarında kullanılır.",
        question: "Marble sheet nerelerde kullanılır?",
      },
      {
        answer:
          "Marble sheet, gerçek mermer etkisini daha hafif ve hızlı uygulanabilir panel mantığıyla sunan dekoratif bir yüzey alternatifidir.",
        question: "Marble sheet gerçek mermer yerine kullanılır mı?",
      },
      {
        answer:
          "Yüzeyin sağlamlığı, ölçü, köşe detayları, panel yönü ve ıslak hacim şartları uygulama öncesi kontrol edilmelidir.",
        question: "Marble sheet uygulamasında nelere dikkat edilir?",
      },
    ],
    heroImage: "/images/kermit-wall-panel-613.jpg",
    heroImageAlt: "Kuzey Kıbrıs mermer görünümlü marble sheet duvar paneli",
    intro: [
      "Marble sheet, mermer görünümünü daha hızlı ve pratik bir uygulama süreciyle isteyen Kuzey Kıbrıs projeleri için güçlü bir dekoratif yüzey çözümüdür.",
      "Banyo, mutfak, resepsiyon ve vurgu duvarlarında doğru desen, ölçü ve uygulama detayını birlikte planlarız.",
    ],
    keywords: [
      "marble sheet Kıbrıs",
      "marble sheet Kuzey Kıbrıs",
      "mermer görünümlü duvar paneli",
      "banyo marble sheet",
      "Kıbrıs marble sheet fiyatları",
    ],
    primaryKeyword: "marble sheet Kıbrıs",
    process: [
      "Kullanılacak yüzey ve mermer deseni hedefi belirlenir.",
      "Panel ölçüsü, desen yönü ve birleşim noktaları planlanır.",
      "Mevcut yüzey ve ıslak hacim koşulları incelenir.",
      "Uygulama ve bitiş detayları netleştirilir.",
    ],
    related: [
      { href: "/spc-duvar-paneli-kibris", label: "SPC duvar paneli" },
      { href: "/duvar-paneli-kibris", label: "Duvar paneli" },
      { href: "/ic-mekan-dekorasyon-kibris", label: "İç mekan dekorasyon" },
    ],
    serviceType: "Marble sheet seçimi ve uygulama planlama",
    slug: "marble-sheet-kibris",
    title: "Kuzey Kıbrıs Marble Sheet",
  },
  {
    applications: [
      "Ofis ve toplantı odaları",
      "Kafe, restoran ve otel alanları",
      "Stüdyo, çalışma odası ve eğitim alanları",
      "Dekoratif TV arkası veya vurgu duvarları",
    ],
    benefits: [
      "Dekoratif görünümle ses konforunu birleştirir",
      "Ofis ve ticari alanlarda daha kontrollü ortam sağlar",
      "Lambri, çıta ve duvar paneliyle birlikte tasarlanabilir",
      "Mekan tarzına göre renk ve profil seçimi yapılabilir",
    ],
    description:
      "Kuzey Kıbrıs'ta akustik panel arayan ofis, toplantı odası, kafe, otel, stüdyo ve dekoratif duvar projeleri için panel seçimi ve uygulama planlaması.",
    faqs: [
      {
        answer:
          "Akustik panel ofis, toplantı odası, stüdyo, kafe, otel ve ses konforu istenen sosyal alanlarda kullanılır.",
        question: "Akustik panel nerelerde kullanılır?",
      },
      {
        answer:
          "Duvar paneli çoğunlukla dekoratif yüzey etkisi sunar; akustik panel ise dekoratif görünüm yanında ses konforuna katkı sağlar.",
        question: "Akustik panel ile duvar paneli farkı nedir?",
      },
      {
        answer:
          "Alan ölçüsü, panel türü, kaplanacak yüzey ve uygulama detayı fiyatı belirler.",
        question: "Akustik panel fiyatı nasıl belirlenir?",
      },
    ],
    heroImage: "/images/ae-spc-is-sureci.jpg",
    heroImageAlt: "Kuzey Kıbrıs ofis ve ticari alan için akustik panel seçimi",
    intro: [
      "Akustik panel, Kuzey Kıbrıs'ta ofis, kafe, otel ve çalışma alanlarında hem dekoratif görünüm hem de ses konforu isteyen projeler için öne çıkar.",
      "Panel rengi, ölçüsü, uygulanacak duvar ve diğer dekoratif malzemelerle uyumu proje öncesinde birlikte planlanır.",
    ],
    keywords: [
      "akustik panel Kıbrıs",
      "akustik panel Kuzey Kıbrıs",
      "ofis akustik panel",
      "dekoratif akustik panel",
      "Kıbrıs akustik panel fiyatları",
    ],
    primaryKeyword: "akustik panel Kıbrıs",
    process: [
      "Mekanın kullanım amacı ve ses konforu ihtiyacı değerlendirilir.",
      "Renk, ölçü, dikey/yatay panel yönü ve duvar seçimi yapılır.",
      "Çıta, lambri veya diğer panel gruplarıyla uyumu kontrol edilir.",
      "Metraj ve uygulama takvimi planlanır.",
    ],
    related: [
      { href: "/duvar-paneli-kibris", label: "Duvar paneli" },
      { href: "/dekoratif-cita-kibris", label: "Dekoratif çıta" },
      { href: "/ic-mekan-dekorasyon-kibris", label: "İç mekan dekorasyon" },
    ],
    serviceType: "Akustik panel seçimi ve uygulama planlama",
    slug: "akustik-panel-kibris",
    title: "Kuzey Kıbrıs Akustik Panel",
  },
  {
    applications: [
      "Salon ve TV arkası duvar çerçeveleri",
      "Yatak odası başlık duvarları",
      "Koridor, merdiven ve giriş alanları",
      "Otel, villa ve klasik-modern iç mekan duvarları",
    ],
    benefits: [
      "Duvara düzenli ve bitmiş bir dekorasyon dili kazandırır",
      "MDF çıta ve poliüretan çıta seçenekleriyle farklı etkiler sunar",
      "Bodür/bordür çıta ile geçiş ve çerçeve detayları oluşturur",
      "Boya, lambri ve panel uygulamalarıyla kombinlenebilir",
    ],
    description:
      "Kuzey Kıbrıs'ta dekoratif çıta, MDF çıta, poliüretan çıta, bodür çıta ve lambri detaylarıyla duvar tasarımı ve uygulama planlama hizmeti.",
    faqs: [
      {
        answer:
          "Dekoratif çıta, duvarda çerçeve, geçiş, klasik panel etkisi veya modern çizgisel tasarım oluşturmak için kullanılır.",
        question: "Dekoratif çıta ne işe yarar?",
      },
      {
        answer:
          "MDF çıta ve poliüretan çıta; kullanım alanı, istenen görünüm, dayanıklılık beklentisi ve uygulama detayına göre seçilir.",
        question: "MDF çıta mı poliüretan çıta mı seçmeliyim?",
      },
      {
        answer:
          "Evet. Çıta; boya, duvar paneli, lambri ve akustik panel uygulamalarıyla birlikte planlanabilir.",
        question: "Dekoratif çıta duvar paneliyle birlikte kullanılır mı?",
      },
    ],
    heroImage: "/images/ae-mission-hero.jpg",
    heroImageAlt: "Kuzey Kıbrıs dekoratif çıta ve duvar paneli uygulama ölçüsü",
    intro: [
      "Dekoratif çıta, Kuzey Kıbrıs iç mekanlarında sade duvarları daha düzenli, klasik veya modern bir tasarım diline taşır.",
      "MDF çıta, poliüretan çıta, bodür/bordür çıta ve lambri detaylarını mekanın tarzına göre birlikte değerlendiriyoruz.",
    ],
    keywords: [
      "dekoratif çıta Kıbrıs",
      "MDF çıta Kıbrıs",
      "poliüretan çıta Kıbrıs",
      "bodür çıta Kıbrıs",
      "lambri Kıbrıs",
    ],
    primaryKeyword: "dekoratif çıta Kıbrıs",
    process: [
      "Duvar ölçüsü, tavan yüksekliği ve istenen tasarım dili belirlenir.",
      "Çıta türü, kalınlık, aralık ve çerçeve düzeni planlanır.",
      "Boya, panel veya lambri ile uyum kontrol edilir.",
      "Uygulama çizgileri ve detaylar sahada netleştirilir.",
    ],
    related: [
      { href: "/duvar-paneli-kibris", label: "Duvar paneli" },
      { href: "/akustik-panel-kibris", label: "Akustik panel" },
      { href: "/asma-tavan-kibris", label: "Asma tavan" },
    ],
    serviceType: "Dekoratif çıta ve lambri planlama",
    slug: "dekoratif-cita-kibris",
    title: "Kuzey Kıbrıs Dekoratif Çıta",
  },
  {
    applications: [
      "Bölme duvar ve oda düzenleme",
      "Asma tavan öncesi yüzey hazırlığı",
      "Niş, ışık bandı ve dekoratif duvar detayları",
      "Tadilat ve iç mekan yenileme projeleri",
    ],
    benefits: [
      "Mekan planını daha esnek hale getirir",
      "Panel, boya ve tavan uygulamaları için düzgün altyapı oluşturur",
      "Gizli ışık, niş ve dekoratif detaylara imkan verir",
      "Proje başlamadan ölçü ve uygulama sırası netleşir",
    ],
    description:
      "Kuzey Kıbrıs'ta alçıpan uygulama arayan ev, ofis, mağaza ve tadilat projeleri için bölme duvar, niş, ışık bandı ve yüzey hazırlığı planlama desteği.",
    faqs: [
      {
        answer:
          "Alçıpan uygulama; bölme duvar, asma tavan, niş, ışık bandı ve dekoratif yüzey hazırlığı gibi iç mekan işlerinde kullanılır.",
        question: "Alçıpan uygulama nerelerde kullanılır?",
      },
      {
        answer:
          "Uygulama süresi metraj, detay sayısı, tavan yüksekliği ve mekan hazırlığına göre değişir.",
        question: "Alçıpan uygulama ne kadar sürer?",
      },
      {
        answer:
          "Metraj, kullanılacak sistem, detay yoğunluğu ve son yüzey işlemleri fiyatı belirler.",
        question: "Alçıpan uygulama fiyatı nasıl hesaplanır?",
      },
    ],
    heroImage: "/images/ae-alcipan-uygulama.jpg",
    heroImageAlt: "Kuzey Kıbrıs alçıpan tavan ve duvar uygulaması",
    intro: [
      "Alçıpan uygulama, Kuzey Kıbrıs iç mekan projelerinde tavan, duvar, niş ve ışık detaylarını daha planlı hale getiren temel dekorasyon işlerindendir.",
      "SPC panel, boya, dekoratif çıta ve asma tavan gibi son yüzey işleriyle uyumlu bir uygulama sırası oluştururuz.",
    ],
    keywords: [
      "alçıpan uygulama Kıbrıs",
      "alçıpan Kuzey Kıbrıs",
      "Lefkoşa alçıpan",
      "Girne alçıpan",
      "alçıpan fiyatları Kıbrıs",
    ],
    primaryKeyword: "alçıpan uygulama Kıbrıs",
    process: [
      "Mekan ölçüsü ve yapılacak alçıpan detayları belirlenir.",
      "Bölme duvar, tavan, niş veya ışık bandı ihtiyaçları ayrıştırılır.",
      "Elektrik, aydınlatma ve son yüzey ilişkisi kontrol edilir.",
      "Uygulama takvimi ve malzeme planı oluşturulur.",
    ],
    related: [
      { href: "/asma-tavan-kibris", label: "Asma tavan" },
      { href: "/dekoratif-cita-kibris", label: "Dekoratif çıta" },
      { href: "/ic-mekan-dekorasyon-kibris", label: "İç mekan dekorasyon" },
    ],
    serviceType: "Alçıpan uygulama ve yüzey hazırlığı",
    slug: "alcipan-uygulama-kibris",
    title: "Kuzey Kıbrıs Alçıpan Uygulama",
  },
  {
    applications: [
      "Salon, ofis ve otel tavan tasarımları",
      "Gizli ışık bandı ve spot aydınlatma alanları",
      "Mağaza, klinik ve ticari iç mekanlar",
      "Alçıpan ve dekoratif çıta ile birlikte tavan detayları",
    ],
    benefits: [
      "Aydınlatma, tesisat ve dekoratif tavan detaylarını düzenler",
      "Mekana daha tamamlanmış ve modern bir görünüm verir",
      "Gizli ışık, spot ve kademeli tavan tasarımına imkan sağlar",
      "Duvar paneli ve zemin kaplama ile birlikte planlanabilir",
    ],
    description:
      "Kuzey Kıbrıs'ta asma tavan arayan ev, ofis, otel, mağaza ve iç mekan dekorasyon projeleri için alçıpan tavan, gizli ışık ve uygulama planlama desteği.",
    faqs: [
      {
        answer:
          "Asma tavan; aydınlatma, tesisat gizleme, dekoratif tavan etkisi ve daha düzenli iç mekan görünümü için kullanılır.",
        question: "Asma tavan ne işe yarar?",
      },
      {
        answer:
          "Evet. Spot, lineer aydınlatma ve gizli ışık bandı uygulamaları asma tavan planında birlikte değerlendirilebilir.",
        question: "Asma tavan gizli ışıkla yapılabilir mi?",
      },
      {
        answer:
          "Metraj, tavan tipi, kademe sayısı, ışık bandı ve detay yoğunluğu fiyatı etkiler.",
        question: "Asma tavan fiyatı neye göre değişir?",
      },
    ],
    heroImage: "/images/ae-alcipan-uygulama.jpg",
    heroImageAlt: "Kuzey Kıbrıs asma tavan ve gizli ışık uygulaması",
    intro: [
      "Asma tavan, Kuzey Kıbrıs iç mekanlarında aydınlatma, tesisat ve dekoratif tavan görünümünü düzenleyen önemli bir uygulamadır.",
      "Alçıpan, gizli ışık, spot aydınlatma ve duvar paneli gibi detayları aynı proje akışı içinde planlıyoruz.",
    ],
    keywords: [
      "asma tavan Kıbrıs",
      "asma tavan Kuzey Kıbrıs",
      "Lefkoşa asma tavan",
      "Girne asma tavan",
      "asma tavan fiyatları Kıbrıs",
    ],
    primaryKeyword: "asma tavan Kıbrıs",
    process: [
      "Tavan ölçüsü, yükseklik ve aydınlatma ihtiyacı belirlenir.",
      "Düz, kademeli veya gizli ışıklı tavan detayı seçilir.",
      "Elektrik ve ışık yerleşimi uygulama öncesi planlanır.",
      "Alçıpan, boya ve son yüzey takvimi koordine edilir.",
    ],
    related: [
      { href: "/alcipan-uygulama-kibris", label: "Alçıpan uygulama" },
      { href: "/dekoratif-cita-kibris", label: "Dekoratif çıta" },
      { href: "/ic-mekan-dekorasyon-kibris", label: "İç mekan dekorasyon" },
    ],
    serviceType: "Asma tavan ve aydınlatma detayı planlama",
    slug: "asma-tavan-kibris",
    title: "Kuzey Kıbrıs Asma Tavan",
  },
  {
    applications: [
      "Ev, villa ve apartman dekorasyonu",
      "Ofis, mağaza, kafe ve otel iç mekanları",
      "Zemin, duvar, tavan ve panel kombinasyonları",
      "Tadilat ve yenileme projeleri",
    ],
    benefits: [
      "Tüm yüzeyleri tek tasarım dili içinde toplar",
      "SPC parke, duvar paneli, marble sheet ve çıta birlikte planlanır",
      "Numune seçimi ve metraj süreci daha net ilerler",
      "Kuzey Kıbrıs proje koşullarına uygun malzeme yönlendirmesi yapılır",
    ],
    description:
      "Kuzey Kıbrıs'ta iç mekan dekorasyon hizmeti arayan ev, villa, ofis, otel, mağaza ve tadilat projeleri için SPC panel, zemin kaplama, marble sheet, çıta, alçıpan ve asma tavan planlama desteği.",
    faqs: [
      {
        answer:
          "İç mekan dekorasyon; zemin, duvar, tavan, panel, çıta, aydınlatma ve malzeme seçimi gibi mekanı tamamlayan kararları kapsar.",
        question: "İç mekan dekorasyon hizmeti neleri kapsar?",
      },
      {
        answer:
          "Evet. Ev, villa, ofis, otel, mağaza, kafe ve tadilat projeleri için farklı malzeme gruplarını birlikte planlıyoruz.",
        question: "Konut ve ticari dekorasyon yapıyor musunuz?",
      },
      {
        answer:
          "Mekan fotoğrafı, ölçü, hedef stil ve ihtiyaç listesi paylaşıldığında numune ve uygulama planı daha hızlı netleşir.",
        question: "Dekorasyon projesine başlamak için ne gerekir?",
      },
    ],
    heroImage: "/images/ae-vision-hero.jpg",
    heroImageAlt: "Kuzey Kıbrıs iç mekan dekorasyon ve yüzey seçimi stüdyosu",
    intro: [
      "İç mekan dekorasyon, Kuzey Kıbrıs'ta ev, villa, ofis ve ticari alanların zemin, duvar, tavan ve detay kararlarını tek bir plan içinde toplamayı gerektirir.",
      "Adem Eren Decoration; SPC parke, duvar paneli, marble sheet, akustik panel, dekoratif çıta, alçıpan ve asma tavan süreçlerini birlikte değerlendirir.",
    ],
    keywords: [
      "iç mekan dekorasyon Kıbrıs",
      "Kuzey Kıbrıs dekorasyon",
      "Kıbrıs dekorasyon firması",
      "villa dekorasyon Kıbrıs",
      "ofis dekorasyon Kıbrıs",
    ],
    primaryKeyword: "iç mekan dekorasyon Kıbrıs",
    process: [
      "Mekan hedefi, kullanım ihtiyacı ve mevcut durum değerlendirilir.",
      "Zemin, duvar, tavan ve dekoratif detay malzemeleri seçilir.",
      "Numune, metraj ve uygulama sırası planlanır.",
      "Proje takvimi ve saha koordinasyonu hazırlanır.",
    ],
    related: [
      { href: "/spc-parke-kibris", label: "SPC parke" },
      { href: "/duvar-paneli-kibris", label: "Duvar paneli" },
      { href: "/alcipan-uygulama-kibris", label: "Alçıpan uygulama" },
    ],
    serviceType: "İç mekan dekorasyon ve yüzey seçimi",
    slug: "ic-mekan-dekorasyon-kibris",
    title: "Kuzey Kıbrıs İç Mekan Dekorasyon",
  },
  {
    applications: [
      "Lefkoşa apartman ve villa tadilatları",
      "Ofis, klinik, showroom ve mağaza iç mekanları",
      "Banyo, mutfak ve yoğun kullanılan duvar yüzeyleri",
      "SPC parke, panel, alçıpan ve asma tavan kombinasyonları",
    ],
    benefits: [
      "Yoğun şehir kullanımı için dayanıklı yüzey seçimi yapılır",
      "Ofis ve ticari alanlarda renk, ışık ve bakım kolaylığı birlikte planlanır",
      "SPC parke, duvar paneli ve marble sheet numuneleri aynı proje içinde değerlendirilir",
      "Metraj, uygulama sırası ve saha hazırlığı netleştirilerek süreç hızlanır",
    ],
    description:
      "Lefkoşa'da ev, apartman, ofis, klinik, showroom ve ticari alanlar için SPC parke, SPC duvar paneli, marble sheet, akustik panel, dekoratif çıta, alçıpan ve asma tavan planlama desteği.",
    faqs: [
      {
        answer:
          "Lefkoşa'da apartman dairesi, villa, ofis, klinik, mağaza, showroom ve kafe gibi konut ve ticari projeler için dekorasyon malzemesi ve uygulama planı hazırlıyoruz.",
        question: "Lefkoşa'da hangi dekorasyon projelerine destek veriyorsunuz?",
      },
      {
        answer:
          "Evet. Lefkoşa ofis, klinik ve mağaza projelerinde SPC parke, duvar paneli, akustik panel, dekoratif çıta, alçıpan ve asma tavan seçeneklerini birlikte planlayabiliriz.",
        question: "Lefkoşa ofis dekorasyonu için SPC panel kullanılır mı?",
      },
      {
        answer:
          "Mekan fotoğrafı, yaklaşık ölçü, kullanım amacı ve beğenilen renk/doku örnekleri paylaşıldığında numune ve metraj planı daha hızlı çıkar.",
        question: "Lefkoşa dekorasyon teklifi için hangi bilgiler gerekir?",
      },
    ],
    heroImage: "/images/ae-spc-is-sureci.jpg",
    heroImageAlt: "Lefkoşa iç mekan dekorasyon ve SPC panel planlama",
    intro: [
      "Lefkoşa dekorasyon projelerinde apartman yaşamı, ofis kullanımı, yoğun trafik ve hızlı uygulama ihtiyacı aynı anda düşünülmelidir.",
      "Adem Eren Decoration; SPC parke, duvar paneli, marble sheet, alçıpan, asma tavan ve dekoratif çıta kararlarını Lefkoşa'daki konut ve ticari alanlar için tek plan altında toplar.",
    ],
    keywords: [
      "Lefkoşa dekorasyon",
      "Lefkoşa SPC parke",
      "Lefkoşa duvar paneli",
      "Lefkoşa alçıpan",
      "Lefkoşa asma tavan",
    ],
    primaryKeyword: "Lefkoşa dekorasyon",
    process: [
      "Mekan fotoğrafları, kullanım amacı ve mevcut yüzey durumu incelenir.",
      "SPC parke, duvar paneli, marble sheet, akustik panel veya çıta seçenekleri kısa listeye alınır.",
      "Metraj, zemin-duvar birleşimleri, tavan detayı ve uygulama sırası planlanır.",
      "Lefkoşa içi proje takvimi, numune seçimi ve teklif kapsamı netleştirilir.",
    ],
    related: [
      { href: "/spc-parke-kibris", label: "SPC parke Kıbrıs" },
      { href: "/spc-duvar-paneli-kibris", label: "SPC duvar paneli" },
      { href: "/ic-mekan-dekorasyon-kibris", label: "İç mekan dekorasyon" },
    ],
    serviceType: "Lefkoşa dekorasyon ve yüzey planlama",
    slug: "lefkosa-dekorasyon",
    title: "Lefkoşa Dekorasyon ve SPC Panel",
  },
  {
    applications: [
      "Girne villa ve sahil evi dekorasyonu",
      "Otel, kiralık konut ve apart projeleri",
      "Banyo, mutfak ve neme açık iç mekan yüzeyleri",
      "Mağaza, ofis, restoran ve kafe yenilemeleri",
    ],
    benefits: [
      "Sahil iklimi ve nem koşulları için uygun yüzey alternatifleri seçilir",
      "Villa ve otel projelerinde bütünlüklü zemin-duvar-tavan dili kurulur",
      "SPC parke ve SPC duvar paneli numuneleri gerçek kullanım alanına göre karşılaştırılır",
      "Kiralık konutlarda temizlenebilir ve uzun ömürlü yüzey planı oluşturulur",
    ],
    description:
      "Girne'de villa, otel, kiralık konut, ofis ve ticari alanlar için neme dayanıklı SPC parke, duvar paneli, marble sheet, akustik panel, dekoratif çıta ve iç mekan dekorasyon planlama.",
    faqs: [
      {
        answer:
          "Girne'de sahil evleri ve villalar için neme dayanıklı SPC parke, SPC duvar paneli, marble sheet, dekoratif çıta ve alçıpan detayları birlikte değerlendirilebilir.",
        question: "Girne villa dekorasyonunda hangi malzemeler öne çıkar?",
      },
      {
        answer:
          "Evet. Girne otel, apart ve kiralık konut projelerinde kolay temizlenen, yoğun kullanıma dayanıklı ve görsel etkisi güçlü yüzey seçenekleri planlıyoruz.",
        question: "Girne otel ve kiralık konut projelerine destek veriyor musunuz?",
      },
      {
        answer:
          "Mevcut yüzey, nem durumu, metraj, desen seçimi ve uygulama detayları fiyatı etkiler. Net teklif için alan fotoğrafı ve ölçü bilgisi gerekir.",
        question: "Girne SPC panel fiyatı nasıl belirlenir?",
      },
    ],
    heroImage: "/images/kermit-floor-application.jpg",
    heroImageAlt: "Girne villa ve sahil evi için SPC parke dekorasyon",
    intro: [
      "Girne dekorasyon projelerinde sahil iklimi, villa yaşamı, otel kullanımı ve kiralık konut dayanıklılığı önemli karar noktalarıdır.",
      "Adem Eren Decoration; Girne'deki projelerde SPC parke, duvar paneli, marble sheet, akustik panel ve dekoratif çıta seçeneklerini mekanın kullanımına göre planlar.",
    ],
    keywords: [
      "Girne dekorasyon",
      "Girne SPC parke",
      "Girne duvar paneli",
      "Girne villa dekorasyon",
      "Girne tadilat dekorasyon",
    ],
    primaryKeyword: "Girne dekorasyon",
    process: [
      "Villa, otel, apart veya ticari alanın kullanım yoğunluğu belirlenir.",
      "Nem, temizlik ve bakım ihtiyacına uygun panel ve zemin seçenekleri seçilir.",
      "Marble sheet, dekoratif çıta, alçıpan ve asma tavan detayları projeye eklenir.",
      "Numune, metraj ve Girne saha uygulama takvimi birlikte planlanır.",
    ],
    related: [
      { href: "/spc-zemin-kaplama-kibris", label: "SPC zemin kaplama" },
      { href: "/marble-sheet-kibris", label: "Marble sheet" },
      { href: "/duvar-paneli-kibris", label: "Duvar paneli" },
    ],
    serviceType: "Girne dekorasyon ve SPC yüzey planlama",
    slug: "girne-dekorasyon",
    title: "Girne Dekorasyon ve SPC Panel",
  },
  {
    applications: [
      "Gazimağusa ev ve öğrenci/kiralık daire yenilemeleri",
      "Mağaza, kafe, ofis ve ticari alan dekorasyonu",
      "Otel, apart ve konaklama alanlarında yüzey seçimi",
      "SPC parke, duvar paneli, alçıpan ve asma tavan işleri",
    ],
    benefits: [
      "Kiralık ve yoğun kullanılan alanlar için pratik bakım avantajı sağlar",
      "Ticari mekanlarda hızlı yenileme ve güçlü ilk izlenim hedeflenir",
      "SPC parke, duvar paneli ve marble sheet seçenekleri bütçe ve kullanım amacına göre ayrıştırılır",
      "Uygulama öncesi metraj ve iş sırası netleştiği için proje daha kontrollü ilerler",
    ],
    description:
      "Gazimağusa'da ev, öğrenci/kiralık daire, ofis, mağaza, kafe ve otel projeleri için SPC parke, duvar paneli, marble sheet, alçıpan ve asma tavan dekorasyon desteği.",
    faqs: [
      {
        answer:
          "Gazimağusa'da kiralık daire, öğrenci evi, apart, mağaza, kafe, ofis ve otel projelerinde SPC parke ve panel çözümleri kullanılabilir.",
        question: "Gazimağusa'da SPC parke hangi alanlar için uygundur?",
      },
      {
        answer:
          "Evet. Kafe, mağaza ve ofislerde TV arkası, servis alanı, banko arkası, duvar vurgusu ve zemin yenileme gibi dekorasyon kalemlerini planlıyoruz.",
        question: "Gazimağusa ticari dekorasyon işleri yapıyor musunuz?",
      },
      {
        answer:
          "Seçilen ürün grubu, alan ölçüsü, zemin veya duvar hazırlığı, köşe-bitim detayları ve uygulama süresi teklifin ana kalemleridir.",
        question: "Gazimağusa dekorasyon fiyatını neler etkiler?",
      },
    ],
    heroImage: "/images/kermit-wall-application.jpg",
    heroImageAlt: "Gazimağusa ticari mekan ve ev için duvar paneli uygulaması",
    intro: [
      "Gazimağusa dekorasyon ihtiyaçları; konut, öğrenci/kiralık daire, kafe, mağaza ve otel gibi farklı kullanım tiplerinde değişir.",
      "Adem Eren Decoration; dayanıklı SPC parke, dekoratif duvar paneli, marble sheet, alçıpan ve asma tavan seçeneklerini Gazimağusa projelerine göre yapılandırır.",
    ],
    keywords: [
      "Gazimağusa dekorasyon",
      "Gazimağusa SPC parke",
      "Gazimağusa duvar paneli",
      "Gazimağusa tadilat",
      "Gazimağusa asma tavan",
    ],
    primaryKeyword: "Gazimağusa dekorasyon",
    process: [
      "Alan tipi, hedef bütçe ve kullanım yoğunluğu belirlenir.",
      "Kiralık konut, ticari alan veya otel ihtiyacına göre malzeme grubu seçilir.",
      "Zemin, duvar ve tavan işleri aynı proje akışına alınır.",
      "Gazimağusa için numune, metraj ve uygulama hazırlığı netleştirilir.",
    ],
    related: [
      { href: "/spc-parke-kibris", label: "SPC parke" },
      { href: "/akustik-panel-kibris", label: "Akustik panel" },
      { href: "/asma-tavan-kibris", label: "Asma tavan" },
    ],
    serviceType: "Gazimağusa dekorasyon ve uygulama planlama",
    slug: "gazimagusa-dekorasyon",
    title: "Gazimağusa Dekorasyon ve SPC Panel",
  },
  {
    applications: [
      "İskele yeni konut ve villa projeleri",
      "Sahil evi, yazlık ve site içi daire dekorasyonu",
      "Banyo, mutfak ve ıslak hacim panel planlaması",
      "SPC zemin kaplama, marble sheet ve dekoratif çıta işleri",
    ],
    benefits: [
      "Yeni projelerde malzeme seçimleri teslim sonrası kullanıma göre planlanır",
      "Sahil ve nem koşullarına uygun SPC panel ve zemin alternatifleri değerlendirilir",
      "Marble sheet ve SPC seramik görünümüyle banyo-mutfak yüzeyleri güçlendirilir",
      "Villa ve site dairelerinde bütünlüklü renk/doku kararı oluşturulur",
    ],
    description:
      "İskele'de yeni konut, villa, sahil evi ve ticari projeler için SPC zemin kaplama, SPC duvar paneli, marble sheet, dekoratif çıta ve iç mekan yüzey planlama hizmeti.",
    faqs: [
      {
        answer:
          "İskele'de yeni konut, villa, sahil evi, site dairesi, ofis ve küçük ticari alanlarda SPC zemin kaplama ve duvar paneli tercih edilebilir.",
        question: "İskele'de hangi alanlara SPC panel uygulanır?",
      },
      {
        answer:
          "Evet. Yeni teslim konutlarda zemin, duvar, banyo, mutfak, TV arkası, çıta ve tavan detaylarını birlikte planlayarak daha bütünlüklü bir iç mekan oluşturabiliriz.",
        question: "İskele yeni konut dekorasyonu için destek veriyor musunuz?",
      },
      {
        answer:
          "Islak hacimde mevcut yüzeyin sağlamlığı, nem durumu, panel ölçüsü, köşe bitişleri ve silikon/profil detayları uygulama öncesi kontrol edilir.",
        question: "İskele banyo panel uygulamasında nelere bakılır?",
      },
    ],
    heroImage: "/images/ae-vision-hero.jpg",
    heroImageAlt: "İskele yeni konut için SPC panel ve iç mekan dekorasyon",
    intro: [
      "İskele dekorasyon projelerinde yeni konut teslimleri, sahil yaşamı ve villa kullanımı malzeme seçimlerini doğrudan etkiler.",
      "Adem Eren Decoration; İskele'deki konut ve ticari projelerde SPC parke, SPC duvar paneli, marble sheet, dekoratif çıta ve iç mekan yüzeylerini beraber planlar.",
    ],
    keywords: [
      "İskele dekorasyon",
      "İskele SPC parke",
      "İskele duvar paneli",
      "İskele villa dekorasyon",
      "İskele marble sheet",
    ],
    primaryKeyword: "İskele dekorasyon",
    process: [
      "Yeni konut, villa veya ticari alanın teslim durumu ve ölçüleri incelenir.",
      "Sahil koşullarına uygun SPC zemin, duvar paneli ve marble sheet seçenekleri seçilir.",
      "Banyo, mutfak, TV arkası ve dekoratif çıta alanları ayrı ayrı planlanır.",
      "İskele proje takvimi için numune, metraj ve uygulama sırası hazırlanır.",
    ],
    related: [
      { href: "/spc-zemin-kaplama-kibris", label: "SPC zemin kaplama" },
      { href: "/spc-seramik-kibris", label: "SPC seramik" },
      { href: "/marble-sheet-kibris", label: "Marble sheet" },
    ],
    serviceType: "İskele dekorasyon ve yeni konut yüzey planlama",
    slug: "iskele-dekorasyon",
    title: "İskele Dekorasyon ve SPC Panel",
  },
  {
    applications: [
      "Güzelyurt ev, apartman ve villa yenilemeleri",
      "Ofis, mağaza ve küçük ticari alan dekorasyonu",
      "Alçıpan, asma tavan ve duvar yüzeyi düzenlemeleri",
      "SPC parke, lambri, çıta ve panel kombinasyonları",
    ],
    benefits: [
      "Günlük kullanıma uygun, pratik ve bakımı kolay yüzeyler seçilir",
      "Tadilat projelerinde zemin, duvar ve tavan işlerinin sırası netleştirilir",
      "SPC parke, duvar paneli, alçıpan ve asma tavan tek kapsamda düşünülür",
      "Mekanın ışığına ve mobilya planına göre renk/doku kararı yapılır",
    ],
    description:
      "Güzelyurt'ta ev, ofis, mağaza ve tadilat projeleri için SPC parke, duvar paneli, alçıpan, asma tavan, dekoratif çıta ve iç mekan dekorasyon desteği.",
    faqs: [
      {
        answer:
          "Güzelyurt'ta ev, villa, apartman, ofis, mağaza ve küçük ticari alanlarda SPC parke, duvar paneli, alçıpan ve dekoratif çıta çözümleri planlanabilir.",
        question: "Güzelyurt'ta hangi dekorasyon işleri yapılır?",
      },
      {
        answer:
          "Evet. Güzelyurt tadilat projelerinde mevcut duvar, tavan ve zemin durumunu inceleyerek alçıpan, asma tavan, panel ve zemin kaplama seçeneklerini sıralarız.",
        question: "Güzelyurt tadilat projelerinde planlama yapıyor musunuz?",
      },
      {
        answer:
          "Alan ölçüsü, ürün serisi, hazırlık ihtiyacı, bitiş profilleri ve uygulama takvimi fiyatı belirleyen ana detaylardır.",
        question: "Güzelyurt SPC parke fiyatı neye göre değişir?",
      },
    ],
    heroImage: "/images/ae-alcipan-uygulama.jpg",
    heroImageAlt: "Güzelyurt alçıpan ve SPC panel dekorasyon planlama",
    intro: [
      "Güzelyurt dekorasyon projelerinde pratik kullanım, temiz uygulama ve uzun ömürlü yüzey seçimi öne çıkar.",
      "Adem Eren Decoration; Güzelyurt'taki ev, ofis ve mağaza projelerinde SPC parke, duvar paneli, alçıpan, asma tavan, lambri ve dekoratif çıta kararlarını birlikte planlar.",
    ],
    keywords: [
      "Güzelyurt dekorasyon",
      "Güzelyurt SPC parke",
      "Güzelyurt duvar paneli",
      "Güzelyurt alçıpan",
      "Güzelyurt asma tavan",
    ],
    primaryKeyword: "Güzelyurt dekorasyon",
    process: [
      "Tadilat yapılacak alanın fotoğrafı, ölçüsü ve ihtiyaç listesi alınır.",
      "SPC parke, panel, alçıpan, asma tavan ve çıta seçenekleri proje kapsamına göre ayrılır.",
      "Renk, doku, metraj ve fire payı birlikte hesaplanır.",
      "Güzelyurt uygulama takvimi ve saha hazırlıkları planlanır.",
    ],
    related: [
      { href: "/alcipan-uygulama-kibris", label: "Alçıpan uygulama" },
      { href: "/asma-tavan-kibris", label: "Asma tavan" },
      { href: "/dekoratif-cita-kibris", label: "Dekoratif çıta" },
    ],
    serviceType: "Güzelyurt dekorasyon ve tadilat yüzey planlama",
    slug: "guzelyurt-dekorasyon",
    title: "Güzelyurt Dekorasyon ve SPC Panel",
  },
  {
    applications: [
      "Lefke ev, apartman ve butik mekan yenilemeleri",
      "Küçük ticari alan, ofis ve konaklama projeleri",
      "SPC parke, duvar paneli ve marble sheet yüzeyleri",
      "Akustik panel, dekoratif çıta, alçıpan ve tavan detayları",
    ],
    benefits: [
      "Küçük ve orta ölçekli mekanlarda doğru malzeme önceliği belirlenir",
      "Dayanıklı zemin ve duvar yüzeyleriyle bakım yükü azaltılır",
      "Marble sheet, akustik panel ve çıta gibi vurgu detayları ölçülü şekilde planlanır",
      "Tadilat bütçesine göre uygulanacak alanlar aşamalara ayrılabilir",
    ],
    description:
      "Lefke'de ev, butik ticari alan, yenileme ve iç mekan projeleri için SPC parke, SPC duvar paneli, marble sheet, akustik panel, çıta ve alçıpan planlama desteği.",
    faqs: [
      {
        answer:
          "Lefke'de ev, apartman, butik konaklama, ofis, küçük mağaza ve yenileme projelerinde SPC parke, duvar paneli, marble sheet, çıta ve alçıpan çözümleri planlanabilir.",
        question: "Lefke'de hangi alanlar için dekorasyon desteği veriyorsunuz?",
      },
      {
        answer:
          "Evet. Küçük mekanlarda zemin, vurgu duvarı, TV arkası, banko arkası veya giriş alanı gibi yüksek etki sağlayan noktalar önceliklendirilebilir.",
        question: "Lefke küçük mekan dekorasyonu için aşamalı plan yapılır mı?",
      },
      {
        answer:
          "Önce kullanım amacı, mevcut yüzey, metraj ve hedef stil belirlenir. Sonrasında uygun SPC panel, parke, marble sheet veya çıta seçenekleri çıkarılır.",
        question: "Lefke dekorasyon süreci nasıl başlar?",
      },
    ],
    heroImage: "/images/ae-mission-hero.jpg",
    heroImageAlt: "Lefke butik iç mekan için SPC panel ve dekoratif yüzey seçimi",
    intro: [
      "Lefke dekorasyon projelerinde doğru alanı doğru malzemeyle yenilemek, bütçeyi ve uygulama süresini daha kontrollü hale getirir.",
      "Adem Eren Decoration; Lefke'deki konut, butik işletme ve küçük ticari alanlar için SPC parke, duvar paneli, marble sheet, akustik panel ve dekoratif çıta seçeneklerini planlar.",
    ],
    keywords: [
      "Lefke dekorasyon",
      "Lefke SPC parke",
      "Lefke duvar paneli",
      "Lefke iç mekan dekorasyon",
      "Lefke tadilat",
    ],
    primaryKeyword: "Lefke dekorasyon",
    process: [
      "Mekan kullanım amacı ve yenilenmesi gereken öncelikli alanlar belirlenir.",
      "SPC parke, panel, marble sheet, akustik panel ve çıta seçenekleri hedef stile göre seçilir.",
      "Metraj, bitiş detayları ve uygulama aşamaları çıkarılır.",
      "Lefke proje planı numune, teklif ve takvimle netleştirilir.",
    ],
    related: [
      { href: "/spc-parke-kibris", label: "SPC parke" },
      { href: "/akustik-panel-kibris", label: "Akustik panel" },
      { href: "/ic-mekan-dekorasyon-kibris", label: "İç mekan dekorasyon" },
    ],
    serviceType: "Lefke dekorasyon ve butik yüzey planlama",
    slug: "lefke-dekorasyon",
    title: "Lefke Dekorasyon ve SPC Panel",
  },
];

export const seoLandingSlugs = seoLandingPages.map((page) => page.slug);

export const getSeoLandingPage = (slug: string) =>
  seoLandingPages.find((page) => page.slug === slug);
