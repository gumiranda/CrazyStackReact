import { fonts } from "@/app/fonts";
import { Box, Flex, Grid, Heading, Icon, Text } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import { FeatureItem } from "../../molecules/FeatureItem";
import { FaBriefcase, FaHandshake, FaUserTie } from "react-icons/fa6";

export const SectionFeatures = ({ children, ...rest }) => {
  const { t } = useTranslation(["LANDING"]);

  return (
    <Container py={{ base: 12, md: 24, lg: 32 }} {...rest}>
      <ContentGrid>
        <TextContent>
          <Heading as="h2" size="3xl" fontFamily={fonts.inter.style.fontFamily}>
            {t("LANDING:FEATURES_TITLE", { defaultValue: "Principais Funcionalidades" })}
          </Heading>
          <Text fontFamily={fonts.inter.style.fontFamily} fontSize={18}>
            {t("LANDING:FEATURES_DESCRIPTION", {
              defaultValue:
                "Descubra as poderosas funcionalidades que fazem da nossa plataforma a melhor escolha para suas necessidades de mudança.",
            })}
          </Text>
        </TextContent>
        <Flex gap={8} flexDirection={{ base: "column", lg: "row" }} w={"100%"} my={4}>
          <FeatureItem
            color="gray.50"
            icon={<Icon as={FaHandshake} boxSize="12" color="primary.500" />}
            title={t("LANDING:FEATURE_1_TITLE", {
              defaultValue: "Seja um Transportador",
            })}
            description={t("LANDING:FEATURE_1_DESCRIPTION", {
              defaultValue:
                "Junte-se à nossa plataforma e comece a oferecer seus serviços de mudança para uma ampla base de clientes.",
            })}
          />

          <FeatureItem
            color="gray.50"
            icon={<Icon as={FaUserTie} boxSize="12" color="primary.500" />}
            title={t("LANDING:FEATURE_2_TITLE", { defaultValue: "Contrate um Frete" })}
            description={t("LANDING:FEATURE_2_DESCRIPTION", {
              defaultValue:
                "Contrate fretes com facilidade através do nosso aplicativo amigável e obtenha serviço de porta a porta.",
            })}
          />
          <FeatureItem
            color="gray.50"
            icon={<Icon as={FaBriefcase} boxSize="12" color="primary.500" />}
            title={t("LANDING:FEATURE_3_TITLE", { defaultValue: "Ganhe como Motorista" })}
            description={t("LANDING:FEATURE_3_DESCRIPTION", {
              defaultValue:
                "Torne-se um motorista e ganhe renda extra oferecendo serviços de mudança.",
            })}
          />
        </Flex>
      </ContentGrid>
    </Container>
  );
};

export const ContentGrid = ({ children, ...props }) => {
  return (
    <Grid
      templateColumns={{ lg: "1fr 500px", xl: "1fr 550px" }}
      gap={{ base: 6, lg: 12 }}
      mt={8}
      {...props}
    >
      {children}
    </Grid>
  );
};
export const TextContent = ({ children, ...props }) => {
  return (
    <Flex flexDirection="column" justifyContent="center" {...props}>
      <Box>{children}</Box>
    </Flex>
  );
};
const Container = ({ children, ...props }) => {
  return (
    <Box as="section" px={{ base: 4, md: 6 }} {...props}>
      {children}
    </Box>
  );
};
