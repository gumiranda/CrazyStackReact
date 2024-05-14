import { Container, Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const PageHeaderWithCTA = () => {
  const { t } = useTranslation(["LANDING"]);

  return (
    <Box as="section" p={{ base: "8", md: "24" }}>
      <Stack spacing={{ base: "8", md: "10" }}>
        <Stack spacing={{ base: "4", md: "6" }}>
          <Stack spacing="3">
            <Text
              fontSize={{ base: "sm", md: "md" }}
              fontWeight="medium"
              color="tertiary.300"
            >
              {t("LANDING:PAGE_HEADER_CTA.badge", {
                defaultValue: "Para Estabelecimentos",
              })}
            </Text>
            <Heading
              size={{ base: "2xl", md: "3xl" }}
              letterSpacing={"tight"}
              lineHeight={"3.75rem"}
              fontWeight="semibold"
            >
              {t("LANDING:PAGE_HEADER_CTA.title", {
                defaultValue: " Simplifique seus agendamentos",
              })}
            </Heading>
          </Stack>
          <Text color="gray.300" size={{ base: "xl", md: "2xl" }} maxW="3xl">
            {t("LANDING:PAGE_HEADER_CTA.subtitle", {
              defaultValue:
                "Assine nossa plataforma e facilite o agendamento de seus serviços.",
            })}
          </Text>
        </Stack>
        <Stack direction={{ base: "column-reverse", md: "row" }} gap={"1rem"}>
          <Button
            display="inline-flex"
            alignItems={"center"}
            justifyContent={"center"}
            position="relative"
            variant={"outline"}
            color="white"
            height={"12"}
            minW="12"
            _hover={{ bgColor: "transparent" }}
          >
            {t("LANDING:PAGE_HEADER_CTA.button2", {
              defaultValue: "Saiba mais",
            })}
          </Button>
          <Button
            display="inline-flex"
            alignItems={"center"}
            justifyContent={"center"}
            position="relative"
            bgColor={"primary.600"}
            color="white"
            height={"12"}
            minW="12"
            _hover={{ bgColor: "primary.700" }}
          >
            {t("LANDING:PAGE_HEADER_CTA.button", {
              defaultValue: "Assinar agora",
            })}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
