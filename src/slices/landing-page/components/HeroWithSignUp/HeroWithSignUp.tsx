import { fonts } from "@/app/fonts";
import { config } from "@/application/config";
import { Flex } from "@/shared/ui";
import {
  AspectRatio,
  Box,
  Button,
  Container,
  Heading,
  Image,
  Input,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const HeroWithSignUp = () => {
  const [email, setEmail] = useState("");
  const { t } = useTranslation(["LANDING"]);
  return (
    <Box m={10}>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={16}>
        <Stack spacing={{ base: "8", md: "12" }} justifyContent="center">
          <Stack spacing={{ base: "4", md: "6" }}>
            <Heading
              size={{ base: "2xl", md: "3xl" }}
              fontFamily={fonts.inter.style.fontFamily}
            >
              {t("LANDING:THIRD_BLOCK.title", {
                defaultValue: "Chega de passar raiva com plataformas ruins",
              })}
            </Heading>
            <Text
              size={{ base: "xl", md: "2xl" }}
              color="fg.muted"
              fontFamily={fonts.inter.style.fontFamily}
            >
              {t("LANDING:THIRD_BLOCK.subtitle", {
                defaultValue: `Com o ${config.systemName}, você pode cadastrar e já sair usando! Sem ter que
                conversar com uma equipe chata de vendas.`,
                systemName: config.systemName,
              })}
            </Text>
          </Stack>
          <Stack spacing="3">
            <Stack direction={{ base: "column", md: "row" }} spacing="3">
              <Input
                placeholder={t("LANDING:THIRD_BLOCK.input", {
                  defaultValue: "Digite seu e-mail",
                })}
                size={"lg"}
                colorScheme="tertiary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                size="lg"
                bgColor="primary.600"
                color="white"
                _hover={{ bgColor: "primary.700" }}
                px="12"
                fontWeight="bold"
                fontSize="md"
                fontFamily={fonts.inter.style.fontFamily}
                onClick={() => console.log(email)}
              >
                {t("LANDING:THIRD_BLOCK.button", {
                  defaultValue: "Cadastrar",
                })}
              </Button>
            </Stack>
            <Text textStyle="xs" color="fg.subtle">
              {t("LANDING:THIRD_BLOCK.footerText", {
                defaultValue: "Ao cadastrar, você concorda com os nossos ",
              })}
              <Link href="#">
                {t("LANDING:THIRD_BLOCK.footerLink", {
                  defaultValue: "Termos de Serviço e Política de Privacidade.",
                })}
              </Link>
            </Text>
          </Stack>
        </Stack>
        <AspectRatio ratio={1}>
          <Image
            objectFit="cover"
            src="https://tinyurl.com/yeyjvptc"
            alt="Lady at work"
          />
        </AspectRatio>
      </SimpleGrid>
    </Box>
  );
};
