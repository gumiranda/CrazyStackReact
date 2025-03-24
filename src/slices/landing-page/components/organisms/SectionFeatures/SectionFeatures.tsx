import { fonts } from "@/app/fonts";
import { Box, Flex, Grid, Heading, Icon, Text } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import { FeatureItem } from "../../molecules/FeatureItem";
import { FaBriefcase, FaHandshake, FaUserTie } from "react-icons/fa6";
import { whitelabel } from "@/application/whitelabel";

export const SectionFeatures = ({ children = null, ...rest }) => {
  const { t } = useTranslation(["LANDING"]);

  return (
    <Container py={{ base: 12, md: 24, lg: 32 }} {...rest}>
      <Box>
        <Heading
          letterSpacing="tighter"
          lineHeight="none"
          as="h2"
          size={{ base: "4xl", md: "5xl" }}
          fontFamily={fonts.inter.style.fontFamily}
        >
          {t("LANDING:FEATURES_TITLE", { defaultValue: "Principais Funcionalidades" })}
        </Heading>
        <Text
          fontFamily={fonts.inter.style.fontFamily}
          fontSize={{ base: "md", md: "lg" }}
          mt={4}
        >
          {t("LANDING:FEATURES_DESCRIPTION", {
            defaultValue:
              "Descubra as poderosas funcionalidades que fazem da nossa plataforma a melhor escolha para suas necessidades de mudança.",
          })}
        </Text>
      </Box>

      <ContentGrid>
        <Box mt={{ base: 5, md: 10 }}>
          <FeatureItem
            color="gray.50"
            icon={<Icon as={FaHandshake} color="primary.500" />}
            title={t("LANDING:FEATURE_1_TITLE", {
              defaultValue: `Faça parte do ${whitelabel.systemName}`,
            })}
            description={t("LANDING:FEATURE_1_DESCRIPTION", {
              defaultValue:
                "Junte-se à nossa plataforma e comece a oferecer seus serviços com horário marcado para uma ampla base de clientes.",
            })}
          />
        </Box>

        <Box mt={{ base: 5, md: 10 }}>
          <FeatureItem
            color="gray.50"
            icon={<Icon as={FaUserTie} color="primary.500" />}
            title={t("LANDING:FEATURE_2_TITLE", { defaultValue: "Agende um Serviço" })}
            description={t("LANDING:FEATURE_2_DESCRIPTION", {
              defaultValue:
                "Agende serviços de beleza, bem-estar e saúde com profissionais qualificados e experientes.",
            })}
          />
        </Box>

        <Box mt={{ base: 5, md: 10 }}>
          <FeatureItem
            color="gray.50"
            icon={<Icon as={FaBriefcase} color="primary.500" />}
            title={t("LANDING:FEATURE_3_TITLE", {
              defaultValue: "Ganhe como profissional",
            })}
            description={t("LANDING:FEATURE_3_DESCRIPTION", {
              defaultValue: `Torne-se um profissional ${whitelabel.systemName} e ganhe renda extra oferecendo serviços de beleza.`,
            })}
          />
        </Box>
      </ContentGrid>
    </Container>
  );
};

export const ContentGrid = ({ children, ...props }) => {
  return (
    <Grid
      templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
      gap={{ base: 6, lg: 12 }}
      mt={8}
      {...props}
    >
      {children}
    </Grid>
  );
};

const Container = ({ children, ...props }) => {
  return (
    <Box as="section" px={{ base: 4, md: 6 }} {...props}>
      {children}
    </Box>
  );
};
