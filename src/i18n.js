import { createI18n } from "vue-i18n";

const messages = {
  en: {
    title: "Statistical Information by Regions and Municipalities of Georgia",
    back: "Back",
    comparison_regions: "Comparison of regions",
    comparison_municipalities: "Comparison of municipalities",
    gender_statistics: "Gender statistics",

    AREAMSR: "Area:",
    POPULMSR: "Population:",
    GDPMSR: "GDP Real Growth Rate:",
    CURMSR: "GDP Per Capita:",
    INFMSR: "Inflation Rate:",
    UNEMPMSR: "Unemployment Rate:",
    BUSMSR: "The Number of Registered Business Entities (unit):",

    areasqkm: "km²",
    thousand: "thousand",
    dollar: "USD",

    empty: "",

    copyright1:
      "This website has been produced with the assistance of the European Union, Denmark and the United Nations Development Programme (UNDP).",
    copyright2:
      "Its contents are the sole responsibility of the GEOSTAT and do not necessarily reflect the views of the European Union, Denmark and UNDP.",
    copyright3: "Terms of Use",

    pageNotFound: "Page Not Found",
    route: "Route",
    notFound: "Not Found",
    pageNotExist:
      "The page you are looking for does not exist or has been moved.",
    goToHome: "Go to Home",
  },
  ka: {
    title:
      "სტატისტიკური ინფორმაცია საქართველოს რეგიონებისა და მუნიციპალიტეტების მიხედვით",
    back: "უკან",
    comparison_regions: "რეგიონების შედარება",
    comparison_municipalities: "მუნიციპალიტეტების შედარება",
    gender_statistics: "გენდერული სტატისტიკა",

    AREAMSR: "ფართობი:",
    POPULMSR: "მოსახლეობა:",
    GDPMSR: "მშპ-ს რეალური ზრდა:",
    CURMSR: "მშპ ერთ სულ მოსახლეზე:",
    INFMSR: "ინფლაცია:",
    UNEMPMSR: "უმუშევრობის დონე:",
    BUSMSR: "რეგისტრირებული ეკონომიკური სუბიექტები:",

    areasqkm: "კმ²",
    thousand: "ათასი",
    dollar: "აშშ დოლარი",

    empty: "",

    copyright1:
      "ვებგვერდი შექმნილია ევროკავშირის, დანიისა და გაეროს განვითარების პროგრამის მხარდაჭერით. მის შინაარსზე სრულად პასუხისმგებელია საქართველოს სტატისტიკის ეროვნული სამსახური.",
    copyright2:
      "ვებგვერდის შინაარსი შესაძლოა არ გამოხატავდეს ევროკავშირის, დანიისა და გაეროს განვითარების პროგრამის შეხედულებებს.",
    copyright3: "მონაცემთა გამოყენების პირობები",

    pageNotFound: "გვერდი ვერ მოიძებნა",
    route: "მარშრუტი",
    notFound: "ვერ მოიძებნა",
    pageNotExist: "თქვენ მიერ მოთხოვნილი გვერდი არ არსებობს ან გადატანილია.",
    goToHome: "მთავარ გვერდზე დაბრუნება",
  },
};

const i18n = createI18n({
  legacy: false, // Use Composition API mode
  locale: "ka", // set locale
  fallbackLocale: "en", // set fallback locale
  messages, // set locale messages
});

export default i18n;
