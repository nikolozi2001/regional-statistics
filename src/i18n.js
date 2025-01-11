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
  },
};

const i18n = createI18n({
  legacy: false, // Use Composition API mode
  locale: "ka", // set locale
  fallbackLocale: "en", // set fallback locale
  messages, // set locale messages
});

export default i18n;
