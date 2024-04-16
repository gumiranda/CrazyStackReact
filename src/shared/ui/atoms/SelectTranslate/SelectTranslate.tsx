"use client";

import { useEffect, useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { theme } from "@/application/theme";
import { formatLanguageFromi18N, useI18n } from "@/application/providers/i18nProvider";
import { useTranslation } from "react-i18next";

export const SelectTranslate = () => {
  const { i18n } = useTranslation() || {};
  const { changeLanguage, setCurrentLanguage } = useI18n();
  const [country, setCountry] = useState(formatLanguageFromi18N(i18n?.language));
  const Dropdown = CountryDropdown as any;
  useEffect(() => {
    const language = localStorage.getItem("language");
    console.log({ language });
    if (language && i18n?.changeLanguage) {
      setCountry(formatLanguageFromi18N(language));
      setCurrentLanguage(formatLanguageFromi18N(language));
      i18n?.changeLanguage?.(language);
    }
  }, []);
  return (
    <Dropdown
      value={country}
      onChange={(val) => {
        setCountry(val);
        changeLanguage(val);
      }}
      labelType="short"
      valueType="short"
      showDefaultOption
      defaultOptionLabel="Selecione um idioma"
      style={{
        backgroundColor: theme.colors.secondary[400],
        padding: 10,
        width: 60,
        marginRight: 15,
        borderRadius: 8,
      }}
      whitelist={["US", "BR"]}
    />
  );
};
