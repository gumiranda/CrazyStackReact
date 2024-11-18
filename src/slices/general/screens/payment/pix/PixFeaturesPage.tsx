"use client";

import { whitelabel } from "@/application/whitelabel";
import { Button, Features, Flex, Text, Heading, Image } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import pixPicture from "../../../../../../public/modal-complete-register.png";
import Link from "next/link";
export const PixFeaturesPage = () => {
  const { t } = useTranslation(["PAGES"]);
  const features = [
    t("PAGES:PIX_PAGE.exclusiveSingleUserLicense", {
      defaultValue: "Cadastro de profissionais ilimitados",
    }),
    t("PAGES:PIX_PAGE.accessToAllProComponents", {
      defaultValue: "Serviços e categorias ilimitadas",
    }),
    t("PAGES:PIX_PAGE.limitlessProjectImplementation", {
      defaultValue: "Agendamento rápido, fácil e prático",
    }),
    t("PAGES:PIX_PAGE.dedicatedCustomerSupport", {
      defaultValue: "24/7 Suporte ao cliente",
    }),
  ];
  return (
    <>
      <Flex p="8" mt={2} flex="1" flexDir="column" borderRadius={8} bg="secondary.500">
        <Heading>
          {t("PAGES:PIX_PAGE.title", {
            defaultValue: `Assinatura ${whitelabel.systemName}`,
            systemName: whitelabel.systemName,
          })}
        </Heading>
        <Text>
          {t("PAGES:PIX_PAGE.subtitle", {
            defaultValue: `Aproveite todos os benefícios do plano mensal ${whitelabel.systemName} e tenha acesso a todos os recursos exclusivos.`,
            systemName: whitelabel.systemName,
          })}
        </Text>
        <Flex
          p="8"
          mt={2}
          flex="1"
          flexDir={{ base: "column", md: "row" }}
          borderRadius={8}
          bg="secondary.500"
          alignItems={{ base: "center", md: "flex-start" }}
          justifyContent="space-between"
        >
          <Image
            src={pixPicture.src}
            width={{ base: "100%", md: "40%" }}
            backgroundRepeat={"no-repeat"}
            backgroundSize={"cover"}
          />
          <Features features={features}>
            <Button colorPalette={"green"} w="100%" onClick={() => {}} asChild>
              <Link href="/payment/pix/pay">
                {t("PAGES:PIX_PAGE.buyNow", {
                  defaultValue: "Buy Now",
                })}
              </Link>
            </Button>
          </Features>
        </Flex>
      </Flex>
    </>
  );
};
