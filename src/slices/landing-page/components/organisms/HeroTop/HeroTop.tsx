import { fonts } from "@/app/fonts";
import { whitelabel } from "@/application/whitelabel";
import { Box, ChakraLink, Flex, Heading, Stack, Text } from "@/shared/ui";
import { getWhatsappLink } from "@/slices/landing-page/utils/landingUtils";
import { useTranslation } from "react-i18next";

export const HeroTop = () => {
  return (
    <Box
      as="section"
      w="full"
      bgGradient="to-r"
      gradientFrom="#6366F1"
      gradientTo="#8B5CF6"
      py={{ base: 12, md: 24, lg: 32 }}
    >
      <Box px={{ base: 4, md: 6 }}>
        <Flex direction={{ base: "column", lg: "row" }}>
          <HeroContent />
          <Stack gap="4">
            <HowToUseCard />
            <LearnMoreLink />
          </Stack>
        </Flex>
      </Box>
    </Box>
  );
};
function HeroTitle() {
  const { t } = useTranslation(["LANDING"]);
  return (
    <Heading
      size={{ base: "4xl", md: "5xl" }}
      fontWeight="bold"
      color="white"
      fontFamily={fonts.inter.style.fontFamily}
    >
      {t("LANDING:HERO_TITLE", {
        defaultValue: `Simplifique sua vida com o ${whitelabel.systemName}`,
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
    <Box rounded="lg" bg="white" p="6" boxShadow="lg" m={5}>
      <Heading
        as="h2"
        fontSize="2xl"
        fontWeight="bold"
        fontFamily={fonts.inter.style.fontFamily}
        color="black"
      >
        {t("LANDING:HOW_TO_USE_TITLE", { defaultValue: "Como Usar" })}
      </Heading>
      <Stack mt="4" gap="2">
        <Text color="black" fontFamily={fonts.inter.style.fontFamily}>
          {t("LANDING:HOW_TO_USE_STEP_1", {
            defaultValue:
              "Arraste e solte itens na área de planejamento para organizar sua mudança. Clique com o botão direito em um item para removê-lo.",
          })}
        </Text>
        <Text color="black" fontFamily={fonts.inter.style.fontFamily}>
          {t("LANDING:HOW_TO_USE_STEP_2", {
            defaultValue:
              "Use a barra de ferramentas para acessar recursos adicionais como agendamento de frete, acompanhamento e mais.",
          })}
        </Text>
      </Stack>
    </Box>
  );
}
function LearnMoreLink() {
  const { t } = useTranslation(["LANDING"]);
  return (
    <ChakraLink
      href={getWhatsappLink(`Quero saber mais sobre o sistema ${whitelabel.systemName}!`)}
      display="inline-flex"
      h="10"
      m={5}
      alignItems="center"
      justifyContent={"center"}
      px="8"
      rounded="md"
      bg="white"
      color="#6366F1"
      fontWeight={500}
      boxShadow="base"
      _hover={{ bg: "gray.100" }}
      transition="background-color 0.2s"
      _focusVisible={{
        outline: "none",
        ring: 1,
        ringColor: "gray.950",
      }}
      _disabled={{
        pointerEvents: "none",
        opacity: 0.5,
      }}
      fontFamily={fonts.inter.style.fontFamily}
    >
      {t("LANDING:LEARN_MORE_BUTTON", { defaultValue: "Saiba Mais" })}
    </ChakraLink>
  );
}
function HeroContent() {
  return (
    <Stack gap="4" mx={5}>
      <HeroTitle />
      <HeroDescription />
    </Stack>
  );
}
