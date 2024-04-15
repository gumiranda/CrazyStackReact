import i18next from "i18next";
import ChainedBackend from "i18next-chained-backend";
import HttpBackend from "i18next-http-backend";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";
import { defaultTexts } from "./defaultTexts";

i18next
  .use(ChainedBackend)
  .use(initReactI18next)
  .init({
    lng: "pt-br",
    fallbackLng: "pt-br",
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: "v3",
    react: {
      //wait: true,//usar no react native
      useSuspense: false,
    },
    backend: {
      backends: [HttpBackend, resourcesToBackend(defaultTexts)],
      backendOptions: [
        {
          loadPath: `${process.env.NEXT_PUBLIC_URL}/{{lng}}/{{ns}}.json`,
        },
      ],
    },
  });
