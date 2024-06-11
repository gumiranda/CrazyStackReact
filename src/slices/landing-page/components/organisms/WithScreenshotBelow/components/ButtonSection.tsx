import { fonts } from "@/app/fonts";
import { Button, ChakraLink, LightMode, Stack } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import { keyframes } from "@chakra-ui/react";

const bounce = keyframes`
0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
40% { transform: translateY(-30px); }
60% { transform: translateY(-15px); }
`;

export const ButtonSection = () => {
  const { t } = useTranslation(["LANDING"]);

  return (
    <Stack
      justify="center"
      direction={{ base: "column", md: "row" }}
      mt={10}
      mb={20}
      spacing="4"
    >
      <LightMode>
        <ChakraLink href="/signup">
          <Button
            size="lg"
            bgColor="primary.700"
            color="white"
            px="8"
            _hover={{ bgColor: "primary.600" }}
            fontWeight={"bold"}
            fontSize="md"
            w={"100%"}
            fontFamily={fonts.inter.style.fontFamily}
            animation={`${bounce} 1.5s infinite`}
            transition="background-color 3.2s ease"
          >
            {t("LANDING:SECOND_BLOCK.button", {
              defaultValue: "Cadastrar meu negócio",
            })}
          </Button>
        </ChakraLink>
        <ChakraLink href="https://youtube.com/devdoido">
          <Button
            size="lg"
            bgColor="tertiary.500"
            color="white"
            px="8"
            _hover={{ bgColor: "tertiary.300" }}
            fontWeight={"bold"}
            fontSize="md"
            w={"100%"}
            fontFamily={fonts.inter.style.fontFamily}
          >
            {t("LANDING:SECOND_BLOCK.button2", {
              defaultValue: "Ver demonstração",
            })}
          </Button>
        </ChakraLink>
      </LightMode>
    </Stack>
  );
};
