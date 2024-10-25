import { Box, Container, Grid, Heading, Text, VStack } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import { fonts } from "@/app/fonts";
import { CalendarIcon, CheckIcon, SearchIcon } from "@chakra-ui/icons";
import { FeatureItem } from "../../molecules/FeatureItem";

export const SectionHowItWorks = () => {
  const { t } = useTranslation(["LANDING"]);

  return (
    <Box as="section" py={10} bg="white">
      <Container maxW="container.lg">
        <VStack
          gap={4}
          textAlign="center"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Heading
            letterSpacing="tighter"
            lineHeight="none"
            color="gray.700"
            as="h2"
            size="2xl"
            fontFamily={fonts.inter.style.fontFamily}
          >
            {t("LANDING:HOW_IT_WORKS_TITLE", { defaultValue: "Como Funciona" })}
          </Heading>
          <Text color="gray.700" fontSize={22}>
            {t("LANDING:HOW_IT_WORKS_SUBTITLE", {
              defaultValue: "Veja como é fácil utilizar a plataforma Belezix.",
            })}
          </Text>
        </VStack>
        <Grid templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap={6} mt={8}>
          <FeatureItem
            icon={<SearchIcon boxSize={12} color="teal.500" />}
            title={t("LANDING:FIND_PROVIDER_TITLE", {
              defaultValue: "Encontre um Prestador",
            })}
            description={t("LANDING:FIND_PROVIDER_DESC", {
              defaultValue: "Procure por prestadores de serviços de beleza na sua área.",
            })}
          />
          <FeatureItem
            icon={<CalendarIcon boxSize={12} color="teal.500" />}
            title={t("LANDING:SCHEDULE_SERVICE_TITLE", {
              defaultValue: "Agende o Serviço",
            })}
            description={t("LANDING:SCHEDULE_SERVICE_DESC", {
              defaultValue:
                "Escolha a data e horário que melhor se adequam à sua necessidade.",
            })}
          />
          <FeatureItem
            icon={<CheckIcon boxSize={12} color="teal.500" />}
            title={t("LANDING:SERVICE_PERFORMED_TITLE", {
              defaultValue: "Serviço Realizado",
            })}
            description={t("LANDING:SERVICE_PERFORMED_DESC", {
              defaultValue:
                "Os prestadores de serviços realizam o serviço conforme agendado.",
            })}
          />
        </Grid>
      </Container>
    </Box>
  );
};
