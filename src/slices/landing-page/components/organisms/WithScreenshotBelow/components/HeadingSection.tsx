import { fonts } from "@/app/fonts";
import { whitelabel } from "@/application/whitelabel";
import { Box, Heading, Text } from "@/shared/ui";
import { useTranslation } from "react-i18next";

export const HeadingSection = () => {
  const { t } = useTranslation(["LANDING"]);

  return (
    <Box textAlign="center">
      <Heading
        as="h1"
        size={{ base: "4xl", md: "5xl" }}
        fontWeight="extrabold"
        maxW="48rem"
        mx="auto"
        lineHeight="none"
        letterSpacing="tighter"
        fontFamily={fonts.inter.style.fontFamily}
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        {t("LANDING:SECOND_BLOCK.title", {
          defaultValue: "Chega de complicações, comece a usar agora",
        })}
      </Heading>
      <Text
        as="p"
        mt={4}
        fontSize={{ base: "lg", md: "xl" }}
        maxW="xl"
        mx="auto"
        lineHeight="1.2"
        fontFamily={fonts.inter.style.fontFamily}
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        {t("LANDING:SECOND_BLOCK.subtitle", {
          defaultValue: `Com o ${whitelabel.systemName}, você pode criar e gerenciar seus agendamentos de forma simples e eficiente.`,
          systemName: whitelabel.systemName,
        })}
      </Text>
    </Box>
  );
};
