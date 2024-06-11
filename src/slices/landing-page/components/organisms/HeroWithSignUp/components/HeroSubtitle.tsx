import { Text } from "@/shared/ui";
import { fonts } from "@/app/fonts";
import { config } from "@/application/config";
import { useTranslation } from "react-i18next";
export const HeroSubtitle = () => {
  const { t } = useTranslation(["LANDING"]);

  return (
    <Text
      size={{ base: "2xl", md: "3xl" }}
      color="fg.muted"
      fontFamily={fonts.inter.style.fontFamily}
    >
      {t("LANDING:THIRD_BLOCK.subtitle", {
        defaultValue: `Com o ${config.systemName}, você pode cadastrar e já sair usando! Sem ter que conversar com uma equipe chata de vendas.`,
        systemName: config.systemName,
      })}
    </Text>
  );
};
