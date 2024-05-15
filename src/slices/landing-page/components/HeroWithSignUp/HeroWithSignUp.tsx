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
import { useTranslation } from "react-i18next";

export const HeroWithSignUp = () => {
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
              Chega de passar raiva com plataformas ruins
            </Heading>
            <Text
              size={{ base: "xl", md: "2xl" }}
              color="fg.muted"
              fontFamily={fonts.inter.style.fontFamily}
            >
              Com o {config.systemName}, você pode cadastrar e já sair usando! Sem ter que
              conversar com uma equipe chata de vendas.
            </Text>
          </Stack>
          <Stack spacing="3">
            <Stack direction={{ base: "column", md: "row" }} spacing="3">
              <Input placeholder="Enter your email" size={"lg"} colorScheme="tertiary" />
              <Button>Sign Up</Button>
            </Stack>
            <Text textStyle="xs" color="fg.subtle">
              By signing up, you accept our <Link href="#">Terms and Conditions.</Link>
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
