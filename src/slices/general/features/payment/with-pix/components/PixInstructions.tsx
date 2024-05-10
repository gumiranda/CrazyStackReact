"use client";

import { Text } from "@/shared/ui";
import { Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const PixInstructions = () => {
  const { t } = useTranslation(["PAGES"]);

  return (
    <>
      <Heading
        fontSize="2xl"
        alignSelf={"flex-start"}
        color="tertiary.300"
        fontWeight={"600"}
      >
        {t("PAGES:PIX_PAY_PAGE.titleBox", {
          defaultValue: "Escaneie este QR Code para pagar",
        })}
      </Heading>
      <Instructions>
        {t("PAGES:PIX_PAY_PAGE.subtitleBox1", {
          defaultValue: "1. Acesse o seu banco ou aplicativo de pagamentos.",
        })}
      </Instructions>
      <Instructions>
        {t("PAGES:PIX_PAY_PAGE.subtitleBox2", {
          defaultValue: "2. Escolha pagar via PIX.",
        })}
      </Instructions>
      <Instructions>
        {t("PAGES:PIX_PAY_PAGE.subtitleBox3", {
          defaultValue: "3. Escaneie o QR Code ou copie o código destacado.",
        })}
      </Instructions>
    </>
  );
};
const Instructions = ({ children }) => {
  return (
    <Text fontSize="xl" alignSelf={"flex-start"}>
      {children}
    </Text>
  );
};
