import { fonts } from "@/app/fonts";
import { handleWhatsappClick } from "@/slices/landing-page/utils/landingUtils";
import {
  Box,
  Button,
  Circle,
  Flex,
  Heading,
  keyframes,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useStyleConfig } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-30px); }
  60% { transform: translateY(-15px); }
`;
export const PricingSection = () => {
  const { t } = useTranslation(["LANDING"]);

  const pricingPlans = [
    {
      title: t("LANDING:BASIC_TITLE", { defaultValue: "Básico" }),
      price: "R$9,90",
      features: [
        t("LANDING:APPOINTMENT_BY_PROFESSIONAL", {
          defaultValue: "Agendamento por profissional",
        }),
        t("LANDING:UNLIMITED_SERVICES", { defaultValue: "Serviços ilimitados" }),
        t("LANDING:SERVICE_CATEGORIES", { defaultValue: "Categorias de serviços" }),
      ],
    },
    {
      title: t("LANDING:PROFESSIONAL_TITLE", { defaultValue: "Profissional" }),
      price: "R$29,90",
      features: [
        t("LANDING:APPOINTMENT_BY_PROFESSIONAL", {
          defaultValue: "Agendamento por profissional",
        }),
        t("LANDING:UNLIMITED_SERVICES", { defaultValue: "Serviços ilimitados" }),
        t("LANDING:SERVICE_CATEGORIES", { defaultValue: "Categorias de serviços" }),
        t("LANDING:UNLIMITED_APPOINTMENTS", { defaultValue: "Agendamentos ilimitados" }),
        t("LANDING:REVENUE_GRAPHS", { defaultValue: "Gráficos de faturamento" }),
      ],
      popular: true,
      buttonStyle: "bg-gradient-to-r from-pink-500 to-purple-500",
    },
    {
      title: t("LANDING:ENTERPRISE_TITLE", { defaultValue: "Empresarial" }),
      price: "R$99,90",
      features: [
        t("LANDING:APPOINTMENT_BY_PROFESSIONAL", {
          defaultValue: "Agendamento por profissional",
        }),
        t("LANDING:UNLIMITED_SERVICES", { defaultValue: "Serviços ilimitados" }),
        t("LANDING:SERVICE_CATEGORIES", { defaultValue: "Categorias de serviços" }),
        t("LANDING:UNLIMITED_APPOINTMENTS", { defaultValue: "Agendamentos ilimitados" }),
        t("LANDING:REVENUE_GRAPHS", { defaultValue: "Gráficos de faturamento" }),
        t("LANDING:COMMISSION_REPORTS", { defaultValue: "Relatórios de comissões" }),
      ],
    },
  ];

  return (
    <Box
      w="full"
      py={12}
      bgGradient={"linear(to-r,gray.50,gray.100)"}
      _dark={{ bgGradient: "linear(to-r,zinc.900,zinc.800)" }}
      display="flex"
      alignItems="center"
      justifyContent={"center"}
    >
      <VStack>
        <Heading
          as="h2"
          size="3xl"
          letterSpacing={"tighter"}
          textAlign="center"
          color="gray.700"
          fontFamily={fonts.inter.style.fontFamily}
          mb={6}
        >
          {t("LANDING:PRICING_PLANS", { defaultValue: "Planos e preços" })}
        </Heading>
        <Stack spacing={8} mt={8} direction={{ base: "column", md: "row" }}>
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </Stack>
      </VStack>
    </Box>
  );
};
export const PricingFeature = ({ children, ...props }: any) => {
  return (
    <Flex alignItems="center" w={"100%"} {...props}>
      <Circle size="24px" bg="green.500" color="white" mr={2} p={1}>
        <CheckIcon />
      </Circle>
      <Text color="gray.700" fontFamily={fonts.inter.style.fontFamily}>
        {children}
      </Text>
    </Flex>
  );
};

export const PricingCard = ({ title, price, features, popular }: any) => {
  const gradientButtonStyles = useStyleConfig("GradientButton");
  const { t } = useTranslation(["LANDING"]);
  return (
    <Box
      p={6}
      bg="white"
      shadow="lg"
      rounded="lg"
      borderWidth={"1px"}
      borderColor={popular ? "purple.500" : "gray.300"}
      position="relative"
      display="flex"
      flexDirection="column"
      justifyContent={"space-between"}
    >
      {popular && (
        <Box
          px={3}
          py={1}
          fontSize="sm"
          color="white"
          bgGradient={"linear(to-r,pink.500,purple.500)"}
          rounded="full"
          position="absolute"
          top={0}
          left="50%"
          transform="translate(-50%, -50%)"
        >
          {t("LANDING:POPULAR", { defaultValue: "Popular" })}
        </Box>
      )}
      <Box>
        <Heading
          color="gray.700"
          fontFamily={fonts.inter.style.fontFamily}
          size="lg"
          textAlign="center"
        >
          {title}
        </Heading>
        <Text
          mt={4}
          color="gray.700"
          fontFamily={fonts.inter.style.fontFamily}
          textAlign="center"
        >
          <Text as="span" fontSize="4xl" fontWeight="bold">
            {price}
          </Text>
          / {t("LANDING:PER_MONTH", { defaultValue: "mês" })}
        </Text>
        <PricingFeatureList features={features} />
      </Box>
      <Box mt={8}>
        <Button
          w="full"
          sx={
            popular
              ? gradientButtonStyles
              : { bg: "gray.800", color: "white", _hover: { bg: "gray.700" } }
          }
          onClick={() => handleWhatsappClick("Quero assinar o plano" + title)}
          animation={popular ? `${bounce} 1s infinite` : (null as any)}
          transition="background-color 3.3s ease"
        >
          {t("LANDING:SUBSCRIBE", { defaultValue: "Assinar" })}
        </Button>
      </Box>
    </Box>
  );
};
export const PricingFeatureList = ({ features }: any) => {
  return (
    <VStack spacing={2} mt={4}>
      {features.map((feature: any, index: number) => (
        <PricingFeature key={index}>{feature}</PricingFeature>
      ))}
    </VStack>
  );
};
function CheckIcon(props: any) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
