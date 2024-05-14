import { fonts } from "@/app/fonts";
import { config } from "@/application/config";
import {
  Box,
  Button,
  Circle,
  Heading,
  Img,
  LightMode,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";

export const WithScreenshotBelow = () => {
  return (
    <Box>
      <Box as="section" bg="secondary.600" color="white" py="7.5rem">
        <Box maxW={{ base: "xl", md: "5xl" }} mx="auto" px={{ base: "6", md: "8" }}>
          <Box textAlign="center">
            <Heading
              as="h1"
              size={{ base: "2xl", md: "3xl" }}
              fontWeight="extrabold"
              maxW="48rem"
              mx="auto"
              lineHeight="1.2"
              letterSpacing="tight"
              fontFamily={fonts.inter.style.fontFamily}
            >
              Chega de complicações, comece a usar agora
            </Heading>
            <Text
              size={{ base: "xl", md: "2xl" }}
              mt="4"
              maxW="xl"
              mx="auto"
              fontFamily={fonts.inter.style.fontFamily}
            >
              Com o {config.systemName}, você pode criar e gerenciar seus agendamentos de
              forma simples e eficiente.
            </Text>
          </Box>

          <Stack
            justify="center"
            direction={{ base: "column", md: "row" }}
            mt="10"
            mb="20"
            spacing="4"
          >
            <LightMode>
              <Button
                size="lg"
                bgColor="primary.600"
                color="white"
                _hover={{ bgColor: "primary.700" }}
                px="8"
                fontWeight="bold"
                fontSize="md"
                fontFamily={fonts.inter.style.fontFamily}
              >
                Cadastrar meu negócio
              </Button>
              <Button
                size="lg"
                colorScheme="whiteAlpha"
                px="8"
                fontWeight="bold"
                fontSize="md"
                fontFamily={fonts.inter.style.fontFamily}
              >
                Ver demonstração
              </Button>
            </LightMode>
          </Stack>

          <Box
            className="group"
            cursor="pointer"
            position="relative"
            rounded="lg"
            overflow="hidden"
          >
            <Img
              alt="Screenshot of Envelope App"
              src="https://res.cloudinary.com/chakra-ui-pro/image/upload/v1621085270/pro-website/app-screenshot-light_kit2sp.png"
            />
            <Circle
              size="20"
              as="button"
              bg="white"
              shadow="lg"
              color="blue.600"
              position="absolute"
              top="50%"
              left="50%"
              transform="translate3d(-50%, -50%, 0)"
              fontSize="xl"
              transition="all 0.2s"
              _groupHover={{
                transform: "translate3d(-50%, -50%, 0) scale(1.05)",
              }}
            >
              <VisuallyHidden>Play demo video</VisuallyHidden>
              <FaPlay />
            </Circle>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
