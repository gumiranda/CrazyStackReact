"use client";

import { Box, Button, Flex, FlexScreen, Text } from "@/shared/ui";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const PixCopyCode = ({ code }) => {
  const { t } = useTranslation(["PAGES"]);
  const [textButtonCopy, setTextButtonCopy] = useState("COPIAR CÓDIGO");
  const copyCodePixToClipboard = (value) => {
    setTextButtonCopy(
      t("PAGES:PIX_PAY_PAGE.copying", {
        defaultValue: "COPIANDO...",
      })
    );
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setTextButtonCopy(
        t("PAGES:PIX_PAY_PAGE.copyDone", {
          defaultValue: "COPIADO!",
        })
      );
      setTimeout(() => {
        setTextButtonCopy(
          t("PAGES:PIX_PAY_PAGE.copyPixCode", {
            defaultValue: "COPIAR CÓDIGO PIX",
          })
        );
      }, 2000);
    }, 500);
  };
  if (!code) {
    return null;
  }
  return (
    <Box>
      <Flex
        flexDir="column"
        alignItems={"center"}
        bgColor="secondary.400"
        p={4}
        mt={10}
        w="100%"
      >
        <Text
          lineClamp={2}
          wordBreak={"break-all"}
          onClick={() => copyCodePixToClipboard(code)}
          cursor={"pointer"}
        >
          {code}
        </Text>
      </Flex>
      <Button
        colorPalette={"green"}
        w="100%"
        mt={10}
        onClick={() => {
          copyCodePixToClipboard(code);
        }}
      >
        {textButtonCopy}
      </Button>
    </Box>
  );
};
