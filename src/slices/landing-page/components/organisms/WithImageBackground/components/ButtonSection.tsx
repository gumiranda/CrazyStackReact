import { fonts } from "@/app/fonts";
import { Button, ChakraLink, HStack, Stack } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import NextLink from "next/link";
import { config } from "@/application/config";
import { getWhatsappLink } from "@/slices/landing-page/utils/landingUtils";
import { HiChevronRight } from "react-icons/hi";

export const ButtonSection = () => {
  const { t } = useTranslation(["LANDING"]);

  return (
    <Stack direction={{ base: "column", md: "row" }} mt={10} spacing="4">
      <FirstBlockButton />
      <KnownMoreButton />
    </Stack>
  );
};
export const KnownMoreButton = () => {
  const { t } = useTranslation(["LANDING"]);
  return (
    <ChakraLink
      as={NextLink}
      href={getWhatsappLink(`Quero saber mais sobre o sistema ${config.systemName}!`)}
    >
      <HStack
        transition="background 0.2s"
        justify={{ base: "center", md: "flex-start" }}
        color="white"
        rounded="full"
        fontFamily={fonts.inter.style.fontFamily}
        fontWeight="bold"
        px={6}
        py={3}
        _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
      >
        <span>
          {t("LANDING:FIRST_BLOCK.button2", {
            defaultValue: "Saiba mais",
          })}
        </span>
        <HiChevronRight />
      </HStack>
    </ChakraLink>
  );
};

export const FirstBlockButton = () => {
  const { t } = useTranslation(["LANDING"]);

  return (
    <>
      <ChakraLink href="/signup">
        <Button
          bgColor="primary.600"
          _hover={{ bg: "primary.700" }}
          color="white"
          px="8"
          w={"100%"}
          rounded="full"
          size="lg"
          fontSize="lg"
          fontWeight={"bold"}
          fontFamily={fonts.inter.style.fontFamily}
        >
          {t("LANDING:FIRST_BLOCK.button", {
            defaultValue: "Testar 30 dias grátis",
          })}
        </Button>
      </ChakraLink>
    </>
  );
};
