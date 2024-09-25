import { fonts } from "@/app/fonts";
import { useUi } from "@/shared/libs";
import { Stack, Input, Button, Text, ChakraLink } from "@/shared/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const SignUpForm = () => {
  const { showModal } = useUi();
  const { t } = useTranslation(["LANDING"]);
  const [email, setEmail] = useState("");
  const router = useRouter();
  const handleSignUp = () => {
    if (email === "") {
      showModal({
        content: t("PAGES:MESSAGES.errorMessage", {
          defaultValue:
            "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
        }),
        title: t("PAGES:MESSAGES.internalServerError", {
          defaultValue: "Erro no servidor",
        }),
        type: "error",
      });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showModal({
        content: t("LANDING:MESSAGES.invalidEmail", {
          defaultValue: "Por favor, insira um e-mail válido",
        }),
        title: t("LANDING:MESSAGES.invalidEmailTitle", {
          defaultValue: "E-mail inválido",
        }),
        type: "error",
      });
      return;
    }
    router.push("/signup?email=" + email);
  };
  return (
    <Stack spacing="3">
      <Stack spacing="3" direction={{ base: "column", md: "row" }}>
        <Input
          placeholder={t("LANDING:THIRD_BLOCK.input", {
            defaultValue: "Digite seu e-mail",
          })}
          size={"lg"}
          colorScheme="tertiary"
          borderColor="primary.500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name={"email"}
        />
        <Button
          size="lg"
          w={"100%"}
          bgColor="primary.600"
          color="white"
          _hover={{ bgColor: "primary.700" }}
          px="14"
          fontSize="lg"
          fontFamily={fonts.inter.style.fontFamily}
          onClick={handleSignUp}
        >
          {t("LANDING:THIRD_BLOCK.button", {
            defaultValue: "Cadastrar",
          })}
        </Button>
      </Stack>
      <Text textStyle="xs" color="fg.subtle" fontFamily={fonts.inter.style.fontFamily}>
        {t("LANDING:THIRD_BLOCK.footerText", {
          defaultValue: "Ao cadastrar, você concorda com os nossos ",
        })}
        <ChakraLink
          href="/termos-de-uso"
          fontWeight={"bold"}
          fontFamily={fonts.inter.style.fontFamily}
        >
          {t("LANDING:THIRD_BLOCK.footerLink", {
            defaultValue: "Termos de Serviço e Política de Privacidade.",
          })}
        </ChakraLink>
      </Text>
    </Stack>
  );
};
