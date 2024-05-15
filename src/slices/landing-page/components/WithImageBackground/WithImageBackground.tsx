import { fonts } from "@/app/fonts";
import { config } from "@/application/config";
import { Box, Button, Flex, Heading, HStack, Img, Stack, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { HiChevronRight } from "react-icons/hi";
import { Link } from "@chakra-ui/next-js";
import NextLink from "next/link";

export const WithImageBackground = () => {
  const { t } = useTranslation(["LANDING"]);

  return (
    <Box bg="gray.800" as="section" minH="140px" position="relative">
      <Box py="32" position="relative" zIndex={1}>
        <Box
          maxW={{ base: "xl", md: "7xl" }}
          mx="auto"
          px={{ base: "6", md: "8" }}
          color="white"
        >
          <Box maxW="xl">
            <Heading
              as="h1"
              size={{ base: "2xl", md: "3xl" }}
              fontWeight="extrabold"
              fontFamily={fonts.inter.style.fontFamily}
            >
              {t("LANDING:FIRST_BLOCK.title", {
                defaultValue: "Agendamentos online para o seu negócio",
              })}
            </Heading>
            <Text
              size={{ base: "xl", md: "2xl" }}
              mt="4"
              maxW="lg"
              shadow={{ md: "lg" }}
              fontWeight="extrabold"
              fontFamily={fonts.inter.style.fontFamily}
            >
              {t("LANDING:FIRST_BLOCK.subtitle", {
                defaultValue: `Economize tempo, ganhe mais clientes e simplifique a gestão do seu negócio
                com o ${config.systemName}!`,
                systemName: config.systemName,
              })}
            </Text>
            <Stack direction={{ base: "column", md: "row" }} mt="10" spacing="4">
              {/* <Link as={NextLink} href="/signup"> */}
              <Button
                bgColor="primary.600"
                _hover={{ bg: "primary.700" }}
                color="white"
                px="8"
                href="/signup"
                as={NextLink}
                rounded="full"
                size="lg"
                fontSize="md"
                fontWeight="bold"
                fontFamily={fonts.inter.style.fontFamily}
              >
                {t("LANDING:FIRST_BLOCK.button", {
                  defaultValue: "Testar 30 dias grátis",
                })}
              </Button>
              {/* </Link> */}
              <Link as={NextLink} href="/knownMore">
                <HStack
                  transition="background 0.2s"
                  justify={{ base: "center", md: "flex-start" }}
                  color="white"
                  fontFamily={fonts.inter.style.fontFamily}
                  rounded="full"
                  fontWeight="bold"
                  px="6"
                  py="3"
                  _hover={{ bg: "whiteAlpha.300" }}
                >
                  <span>
                    {t("LANDING:FIRST_BLOCK.button2", {
                      defaultValue: "Saiba mais",
                    })}
                  </span>
                  <HiChevronRight />
                </HStack>
              </Link>
            </Stack>
          </Box>
        </Box>
      </Box>
      <Flex
        id="image-wrapper"
        position="absolute"
        insetX="0"
        insetY="0"
        w="full"
        h="full"
        overflow="hidden"
        align="center"
      >
        <Box position="relative" w="full" h="full">
          <Img
            src="https://images.unsplash.com/photo-1590650153855-d9e808231d41?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2250&q=80"
            alt="Main Image"
            w="full"
            h="full"
            objectFit="cover"
            objectPosition="top bottom"
            position="absolute"
          />
          <Box position="absolute" w="full" h="full" bg="blackAlpha.600" />
        </Box>
      </Flex>
    </Box>
  );
};
