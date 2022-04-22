import i18n, { Resource, TOptions } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import config from "./config.json";
import en from "./translations/en.json";
import jp from "./translations/jp.json";

const languageCodes = config.languageCodes;
const languageCodeStorageKey = "i18nextLng";

const languageResource = {
  en: en,
  jp: jp,
};

enum LANGUAGE_CODES {
  en = "en",
  jp = "jp",
}

const getLocalStorageLanguage = () => {
  let localStorageLanguage = localStorage.getItem(languageCodeStorageKey);
  if (!localStorageLanguage || !languageCodes.includes(localStorageLanguage)) {
    localStorageLanguage = config.defaultLanguage;
  }
  return localStorageLanguage;
};

const getTranslationResource = (): Resource => {
  return languageCodes.reduce((resources: Resource, langCode: string): Resource => {
    resources[langCode] = {
      // @ts-ignore
      translation: languageResource[langCode],
    };
    return resources;
  }, {});
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: getLocalStorageLanguage(),
    fallbackLng: config.fallbackLanguage,
    preload: languageCodes,
    resources: getTranslationResource(),
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on("languageChanged", () => {
  localStorage.setItem(languageCodeStorageKey, i18n.language);
  window.location.reload();
});

const t = (key: string, options?: TOptions) => i18n.t(key, options);

const currentLanguage = i18n.language;

export { i18n, t, languageCodes, getLocalStorageLanguage, currentLanguage, LANGUAGE_CODES };
