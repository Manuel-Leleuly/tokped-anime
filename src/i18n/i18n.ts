import i18n, { Resource, TOptions } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import config from "./config.json";
import enUS from "./translations/en-US.json";
import jpJP from "./translations/jp-JP.json";

const languageCodes = config.languageCodes;
const languageCodeStorageKey = "i18nextLng";

const languageResource = {
  "en-US": enUS,
  "jp-JP": jpJP,
};

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

i18n.on("languageChanged", () => localStorage.setItem(languageCodeStorageKey, i18n.language));

const t = (key: string, options?: TOptions) => i18n.t(key, options);

export { i18n, t, languageCodes, getLocalStorageLanguage };
