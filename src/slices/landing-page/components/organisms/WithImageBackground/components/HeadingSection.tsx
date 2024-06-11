import { fonts } from "@/app/fonts";
import { config } from "@/application/config";
import { Heading, Text } from "@/shared/ui";
import { useTranslation } from "react-i18next";

export const HeadingSection = () => {
  const { t } = useTranslation(["LANDING"]);

  return (
    <>
      <Heading
        as="h1"
        size={{ base: "2xl", md: "3xl" }}
        fontWeight="extrabold"
        fontFamily={fonts.inter.style.fontFamily}
        letterSpacing="tighter"
        lineHeight="none"
      >
        {t("LANDING:FIRST_BLOCK.title", {
          defaultValue: "Agendamentos online para o seu negócio",
        })}
      </Heading>
      <Text
        size={{ base: "2xl", md: "3xl" }}
        mt="4"
        maxW="lg"
        shadow={{ md: "lg" }}
        fontFamily={fonts.inter.style.fontFamily}
      >
        {t("LANDING:FIRST_BLOCK.subtitle", {
          defaultValue: `Economize tempo, ganhe mais clientes e simplifique a gestão do seu negócio
      com o ${config.systemName}!`,
          systemName: config.systemName,
        })}
      </Text>
    </>
  );
};
