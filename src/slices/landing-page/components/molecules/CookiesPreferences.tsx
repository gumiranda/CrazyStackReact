import { fonts } from "@/app/fonts";
import { useUi } from "@/shared/libs";
import {
  Box,
  useBreakpointValue,
  Text,
  Flex,
  ChakraLink,
  Button,
  Heading,
  Label,
  Switch,
} from "@/shared/ui";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const CookieFooter = () => {
  const { setModalBody, onOpen, setModalFooter } = useUi();
  const { t } = useTranslation(["LANDING"]);
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [cookiesRejected, setCookiesRejected] = useState(false);
  useEffect(() => {
    const accepted = sessionStorage.getItem("cookiesAccepted");
    if (accepted) {
      setCookiesAccepted(true);
    }
    const rejected = sessionStorage.getItem("cookiesRejected");
    if (rejected) {
      setCookiesRejected(true);
    }
  }, []);
  if (cookiesAccepted || cookiesRejected) {
    return null;
  }
  const handleOpenCookieModal = () => {
    setModalBody(<CookiesPreferencesBox />);
    if (!isDesktop) {
      setModalFooter(
        <ButtonCookies
          setCookiesAccepted={setCookiesAccepted}
          setCookiesRejected={setCookiesRejected}
        />
      );
    }
    onOpen();
  };
  return (
    <Box
      as="footer"
      position="fixed"
      bottom="0"
      width={"100%"}
      bg="gray.700"
      py={4}
      px={8}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      zIndex="1000"
      flexDirection={{ base: "column", md: "row" }}
      borderTop="1px solid"
      borderColor="gray.600"
      boxShadow={"0 -2px 5px rgba(0,0,0,0.2)"}
      animation="slideIn 0.5s ease-in-out"
    >
      <Box>
        <Text fontSize={{ base: "sm", md: "md" }} textAlign="center">
          {t("LANDING:COOKIE_NOTICE", {
            defaultValue:
              "Utilizamos cookies para melhorar sua experiência de navegação. Ao continuar, você concorda com a nossa Política de Privacidade.",
          })}
        </Text>

        <Flex>
          <ChakraLink
            color="white"
            fontSize={{ base: "sm", md: "md" }}
            onClick={handleOpenCookieModal}
            href={"#"}
          >
            {t("LANDING:COOKIE_SETTINGS", {
              defaultValue: "Configurações de Cookies",
            })}
          </ChakraLink>
          <ChakraLink
            color="white"
            fontSize={{ base: "sm", md: "md" }}
            href="/politica-de-privacidade"
            target="_blank"
            rel="noreferrer"
            ml={4}
          >
            {t("LANDING:PRIVACY_POLICY", {
              defaultValue: "Política de Privacidade",
            })}
          </ChakraLink>
        </Flex>
      </Box>

      <Flex>
        {isDesktop && (
          <ButtonCookies
            setCookiesAccepted={setCookiesAccepted}
            setCookiesRejected={setCookiesRejected}
          />
        )}
      </Flex>
    </Box>
  );
};
export const ButtonCookies = ({ setCookiesAccepted, setCookiesRejected }) => {
  const { t } = useTranslation(["LANDING"]);
  const { onClose } = useUi();
  const handleAcceptCookies = () => {
    sessionStorage.setItem("cookiesAccepted", "true");
    setCookiesAccepted(true);
    onClose();
  };
  const handleRejectCookies = () => {
    sessionStorage.setItem("cookiesRejected", "true");
    setCookiesRejected(true);
    onClose();
  };
  return (
    <Flex alignItems="center" justifyContent={"center"}>
      <Button
        w="100%"
        my={{ base: 4, md: 0 }}
        mx={{ base: 2, md: 2 }}
        colorScheme="teal"
        _hover={{ bg: "teal.600", transform: "scale(1.05)" }}
        transition="all 0.3s"
        borderRadius="full"
        boxShadow={"md"}
        onClick={handleAcceptCookies}
      >
        {t("LANDING:ACCEPT", {
          defaultValue: "Aceitar",
        })}
      </Button>
      <Button
        w="100%"
        my={{ base: 4, md: 0 }}
        mx={{ base: 2, md: 2 }}
        colorScheme="red"
        _hover={{ bg: "red.600", transform: "scale(1.05)" }}
        transition="all 0.3s"
        borderRadius="full"
        boxShadow={"md"}
        onClick={handleRejectCookies}
      >
        {t("LANDING:REJECT", {
          defaultValue: "Rejeitar",
        })}
      </Button>
    </Flex>
  );
};
export const CookiesPreferencesBox = () => {
  const { t } = useTranslation(["LANDING"]);

  return (
    <Box
      border="1px solid"
      borderColor="gray.300"
      borderRadius="md"
      w="full"
      maxW="lg"
      p={4}
      bg="white"
      boxShadow={"lg"}
    >
      <Box>
        <Flex align="center">
          <CookieIcon mr={2} color="black" />
          <Heading
            as="h3"
            color="gray.600"
            ml={4}
            fontSize={22}
            fontFamily={fonts.inter.style.fontFamily}
          >
            {t("LANDING:COOKIE_PREFERENCES_TITLE", {
              defaultValue: "Preferências de Cookies",
            })}
          </Heading>
        </Flex>
        <Text mt={2} color="gray.600" fontFamily={fonts.inter.style.fontFamily}>
          {t("LANDING:COOKIE_PREFERENCES_DESCRIPTION", {
            defaultValue:
              "Gerencie suas configurações de cookies. Você pode habilitar ou desabilitar diferentes tipos de cookies abaixo.",
          })}
        </Text>
      </Box>
      <Box>
        <CookiePreferenceMolecule
          id="essentials"
          label={t("LANDING:ESSENTIAL_COOKIES_TITLE", {
            defaultValue: "Cookies Essenciais",
          })}
          value={t("LANDING:ESSENTIAL_COOKIES_DESCRIPTION", {
            defaultValue:
              "Estes cookies são necessários para o funcionamento do site e não podem ser desativados.",
          })}
        />
        <CookiePreferenceMolecule
          id="analytics"
          label={t("LANDING:ANALYTICS_COOKIES_TITLE", {
            defaultValue: "Cookies de Análise",
          })}
          value={t("LANDING:ANALYTICS_COOKIES_DESCRIPTION", {
            defaultValue:
              "Estes cookies nos permitem contar visitas e fontes de tráfego para medir e melhorar o desempenho do nosso site.",
          })}
        />
        <CookiePreferenceMolecule
          id="marketing"
          label={t("LANDING:MARKETING_COOKIES_TITLE", {
            defaultValue: "Cookies de Marketing",
          })}
          value={t("LANDING:MARKETING_COOKIES_DESCRIPTION", {
            defaultValue:
              "Estes cookies nos ajudam a mostrar anúncios relevantes para você.",
          })}
        />
      </Box>
    </Box>
  );
};
const CookiePreferenceMolecule = ({ id, label, value }) => {
  const [isChecked, setIsChecked] = useState(true);
  return (
    <Flex justify="space-between" align="start" my={4}>
      <Box>
        <Label textAlign="left">{label}</Label>
        <Text color="gray.500" fontSize="sm">
          {value}
        </Text>
      </Box>
      <Switch
        colorScheme="teal"
        id={id}
        ml="auto"
        isChecked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
    </Flex>
  );
};
function CookieIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
      <path d="M8.5 8.5v.01" />
      <path d="M16 15.5v.01" />
      <path d="M12 12v.01" />
      <path d="M11 17v.01" />
      <path d="M7 14v.01" />
    </svg>
  );
}
