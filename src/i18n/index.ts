import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import hi from "./hi.json";
import bn from "./bn.json";
import te from "./te.json";
import mr from "./mr.json";

const savedLanguage =
  typeof window !== "undefined" ? localStorage.getItem("language") : null;

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
    bn: { translation: bn },
    te: { translation: te },
    mr: { translation: mr }
  },
  lng: savedLanguage || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
