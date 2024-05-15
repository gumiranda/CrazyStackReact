"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Flex, Text, Box, AuthLayout, Logo } from "@/shared/ui";
import { useAuth } from "@/shared/libs";
import { useEffect } from "react";
import { config } from "@/application/config";
import { SignupForm } from "@/slices/general/features/auth/signup";
import Link from "next/link";
import { useBreakpointValue } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export function SignUpPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const { t } = useTranslation(["PAGES"]);
  const { isAuthenticated = false } = useAuth() || {};
  const router = useRouter();
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home");
    }
  }, [isAuthenticated]);
  return (
    <AuthLayout>
      <Logo marginBottom={4} mt={5} haveLink={false} />
      <Box>
        <Text textAlign={"center"} fontWeight={"bold"} fontSize={"2xl"} color="white">
          {t("PAGES:AUTH_PAGE.titleCreateAccount", {
            defaultValue: `Faça parte do ${config.systemName} 🚀`,
            systemName: config.systemName,
          })}
        </Text>
        <Text textAlign={"center"}>
          {t("PAGES:AUTH_PAGE.descriptionCreateAccount", {
            defaultValue: "Insira os dados abaixo para cadastrar seu negócio:",
          })}
        </Text>
        <Flex minW="100%" justifyContent={"center"} mb={5}>
          <Flex width={"90%"}>
            <SignupForm defaultEmail={email}>
              <Flex
                flexDir={isMobile ? "column" : "row"}
                justifyContent={"center"}
                mt={5}
              >
                <Text textAlign={"center"}>
                  {t("PAGES:AUTH_PAGE.haveAccount", {
                    defaultValue: "Já possui uma conta? ",
                  })}
                </Text>
                <Link href="/login">
                  <Text
                    textAlign={"center"}
                    textDecoration={"underline"}
                    _hover={{ color: "primary.500" }}
                  >
                    {t("PAGES:AUTH_PAGE.enterAccount", {
                      defaultValue: "Entre aqui",
                    })}
                  </Text>
                </Link>
              </Flex>
            </SignupForm>
          </Flex>
        </Flex>
      </Box>
    </AuthLayout>
  );
}
