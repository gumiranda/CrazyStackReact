import { fonts } from "@/app/fonts";
import { Heading } from "@/shared/ui";
import { useTranslation } from "react-i18next";

export const HeroTitle = () => {
  const { t } = useTranslation(["LANDING"]);

  return (
    <Heading
      letterSpacing="tighter"
      lineHeight="none"
      size={{ base: "2xl", md: "3xl" }}
      fontFamily={fonts.inter.style.fontFamily}
    >
      {t("LANDING:THIRD_BLOCK.title", {
        defaultValue: "Chega de passar raiva com plataformas ruins",
      })}
    </Heading>
  );
};
