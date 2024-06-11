import { fonts } from "@/app/fonts";
import { Box, Heading, Text } from "@/shared/ui";
import { useTranslation } from "react-i18next";

export const HeroTop = () => {
  return (
    <>
      <HeroTitle />
      <HeroDescription />
      <HowToUseCard />
    </>
  );
};
function HeroTitle() {
  const { t } = useTranslation(["LANDING"]);
  return (
    <Heading
      as="h1"
      fontSize={{ base: "4xl", sm: "5xl", xl: "6xl" }}
      fontWeight="bold"
      letterSpacing="tighter"
      color="white"
      lineHeight="none"
      fontFamily={fonts.inter.style.fontFamily}
    >
      {t("LANDING:HERO_TITLE", {
        defaultValue: "Simplifique Sua Mudança com a Mudix",
      })}
    </Heading>
  );
}
function HeroDescription() {
  const { t } = useTranslation(["LANDING"]);

  return (
    <Text
      maxW="600px"
      color="gray.200"
      fontSize={{ md: "xl", lg: "base", xl: "xl" }}
      lineHeight="relaxed"
      fontFamily={fonts.inter.style.fontFamily}
    >
      {t("LANDING:HERO_DESCRIPTION", {
        defaultValue:
          "Organize e realize mudanças com facilidade usando nossa plataforma intuitiva. Sem complicações - basta planejar, agendar e transportar.",
      })}
    </Text>
  );
}
function HowToUseCard() {
  const { t } = useTranslation(["LANDING"]);
  return (
    <Box rounded="lg" bg="white" p="6" boxShadow="lg">
      <Heading
        as="h2"
        fontSize="2xl"
        fontWeight="bold"
        fontFamily={fonts.inter.style.fontFamily}
        color="black"
      >
        {t("LANDING:HOW_TO_USE_TITLE", { defaultValue: "Como Usar" })}
      </Heading>
    </Box>
  );
}
