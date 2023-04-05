import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ar from "./strings-ar.json";
import fr from "./strings-fr.json";
import en from "./string-en.json";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: en,
    fr: fr,
    ar: ar,
  },
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
