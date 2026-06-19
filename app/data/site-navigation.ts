export type SiteLanguage = "en" | "tr";

export type SiteNavItem = {
  href: string;
  label: Record<SiteLanguage, string>;
};

export const navText = {
  en: {
    about: "About",
    areas: "Areas",
    blog: "Blog",
    contact: "Contact",
    home: "Home",
    projects: "Projects",
    services: "Services",
  },
  tr: {
    about: "Kurumsal",
    areas: "Bölgeler",
    blog: "Blog",
    contact: "İletişim",
    home: "Ana Sayfa",
    projects: "Projeler",
    services: "Hizmetler",
  },
} as const;

export const serviceNavItems: SiteNavItem[] = [
  {
    href: "/spc-parke-kibris",
    label: { en: "SPC Floors", tr: "SPC Parke" },
  },
  {
    href: "/spc-zemin-kaplama-kibris",
    label: { en: "SPC Floor Covering", tr: "SPC Zemin Kaplama" },
  },
  {
    href: "/spc-duvar-paneli-kibris",
    label: { en: "SPC Wall Panels", tr: "SPC Duvar Paneli" },
  },
  {
    href: "/spc-seramik-kibris",
    label: { en: "SPC Ceramic", tr: "SPC Seramik" },
  },
  {
    href: "/marble-sheet-kibris",
    label: { en: "Marble Sheet", tr: "Marble Sheet" },
  },
  {
    href: "/akustik-panel-kibris",
    label: { en: "Acoustic Panels", tr: "Akustik Panel" },
  },
  {
    href: "/dekoratif-cita-kibris",
    label: { en: "Decorative Trim", tr: "Dekoratif Çıta" },
  },
  {
    href: "/alcipan-uygulama-kibris",
    label: { en: "Drywall Application", tr: "Alçıpan Uygulama" },
  },
  {
    href: "/asma-tavan-kibris",
    label: { en: "Suspended Ceiling", tr: "Asma Tavan" },
  },
];

export const areaNavItems: SiteNavItem[] = [
  {
    href: "/lefkosa-dekorasyon",
    label: { en: "Nicosia Decoration", tr: "Lefkoşa Dekorasyon" },
  },
  {
    href: "/girne-dekorasyon",
    label: { en: "Kyrenia Decoration", tr: "Girne Dekorasyon" },
  },
  {
    href: "/gazimagusa-dekorasyon",
    label: { en: "Famagusta Decoration", tr: "Gazimağusa Dekorasyon" },
  },
  {
    href: "/iskele-dekorasyon",
    label: { en: "Iskele Decoration", tr: "İskele Dekorasyon" },
  },
  {
    href: "/guzelyurt-dekorasyon",
    label: { en: "Guzelyurt Decoration", tr: "Güzelyurt Dekorasyon" },
  },
  {
    href: "/lefke-dekorasyon",
    label: { en: "Lefke Decoration", tr: "Lefke Dekorasyon" },
  },
];

export const companyNavItems: SiteNavItem[] = [
  {
    href: "/about-us",
    label: { en: "About Us", tr: "Hakkımızda" },
  },
  {
    href: "/vision",
    label: { en: "Vision", tr: "Vizyon" },
  },
  {
    href: "/mission",
    label: { en: "Mission", tr: "Misyon" },
  },
];
