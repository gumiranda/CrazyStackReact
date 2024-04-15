/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useTranslation } from "react-i18next";
import { createContext, useState, useContext } from "react";

const I18NContext = createContext({} as any);

export const isBrowser = typeof window !== "undefined";

export const I18nProvider = ({ children }: any) => {
  const { i18n } = useTranslation() || {};
  const [currentLanguage, setCurrentLanguage] = useState(
    formatLanguageFromi18N(i18n?.language)
  );
  const changeLanguage = (language) => {
    setCurrentLanguage(language);
    i18n?.changeLanguage?.(formatLanguageFromSelect(language));
    localStorage.setItem("language", formatLanguageFromSelect(language));
  };
  return (
    <I18NContext.Provider value={{ changeLanguage, currentLanguage, setCurrentLanguage }}>
      {children}
    </I18NContext.Provider>
  );
};
export const useI18n = () => {
  if (!isBrowser) {
    return {
      currentLanguage: "pt-br",
      setCurrentLanguage: () => {},
      changeLanguage: () => {},
    };
  }
  return useContext(I18NContext);
};
const countryToLanguage = {
  BR: "pt-br",
  US: "en",
};
const languageToCountry = {
  "pt-br": "BR",
  en: "US",
};
export const formatLanguageFromi18N = (language) => languageToCountry[language];
export const formatLanguageFromSelect = (language) => countryToLanguage[language];
