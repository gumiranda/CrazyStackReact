import { fonts } from "@/app/fonts";
import { config } from "@/application/config";
import { Box, Heading, Text } from "@/shared/ui";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
const MotionBox = motion(Box as any);
const MotionHeading = motion(Heading as any);
const MotionText = motion(Text as any);

export const HeadingSection = () => {
  const { t } = useTranslation(["LANDING"]);

  return (
    <MotionBox textAlign="center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <MotionHeading
        as="h1"
        size={{ base: "2xl", md: "3xl" }}
        fontWeight="extrabold"
        maxW="48rem"
        mx="auto"
        lineHeight="none"
        letterSpacing="tighter"
        fontFamily={fonts.inter.style.fontFamily}
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        {t("LANDING:SECOND_BLOCK.title", {
          defaultValue: "Chega de complicações, comece a usar agora",
        })}
      </MotionHeading>
      <MotionText
        as="p"
        mt={4}
        fontSize={{ base: "lg", md: "xl" }}
        maxW="xl"
        mx="auto"
        lineHeight="1.2"
        fontFamily={fonts.inter.style.fontFamily}
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        {t("LANDING:SECOND_BLOCK.subtitle", {
          defaultValue: `Com o ${config.systemName}, você pode criar e gerenciar seus agendamentos de forma simples e eficiente.`,
          systemName: config.systemName,
        })}
      </MotionText>
    </MotionBox>
  );
};
