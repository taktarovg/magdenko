export const siteConfig = {
  name: "Ольга Магденко",
  title: "Ольга Магденко - Психолог",
  description: "Профессиональная психологическая помощь. Индивидуальное, семейное, перинатальное консультирование. Стаж более 20 лет.",
  url: process.env.SITE_URL || "http://localhost:3000",
  ogImage: "/og-image.jpg",
  links: {
    telegram: "https://t.me/magdenko_psy",
    email: "olga_mag@academ.org",
    phone: "+7 913 913 2448",
  },
  keywords: [
    "психолог Новосибирск",
    "семейный психолог",
    "перинатальный психолог", 
    "детский психолог",
    "психологическое консультирование",
    "Магденко Ольга Владиславовна",
    "психотерапия",
    "семейная терапия",
  ],
}

export type SiteConfig = typeof siteConfig
