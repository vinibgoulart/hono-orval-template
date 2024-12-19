import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import translationEn from "./locales/en.json";
import translationPt from "./locales/pt.json";
import { LANGUAGE_ENUM } from "./languageEnum";

const resources = {
  [LANGUAGE_ENUM.en]: { translation: translationEn },
  [LANGUAGE_ENUM.pt]: { translation: translationPt },
};

const initI18n = async () => {
  const savedLanguage =
    Localization.getLocales()[0].languageCode || LANGUAGE_ENUM.en;

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources,
    lng: savedLanguage,
    fallbackLng: LANGUAGE_ENUM.en,
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;
