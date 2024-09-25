"use client";

import type { NextPage } from "next";
import { Text, Flex, AuthLayout, Logo, Box, useBreakpointValue } from "@/shared/ui";
import { useAuth } from "@/shared/libs";
import { LoginForm } from "@/slices/general/features/auth/login";
import Link from "next/link";
import { useTranslation } from "react-i18next";
export const Login: NextPage = () => {
  const { t } = useTranslation(["PAGES"]);
  const { isAuthenticated } = useAuth();
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <AuthLayout>
      <Logo marginBottom={4} mt={5} haveLink={false} />
      <Box>
        <Text textAlign={"center"} fontWeight={"bold"} fontSize={"2xl"} color="white">
          {t("PAGES:AUTH_PAGE.title", {
            defaultValue: "Olá, seja bem-vindo",
          })}
        </Text>
        <Text textAlign={"center"}>
          {t("PAGES:AUTH_PAGE.description", {
            defaultValue: "Insira seu e-mail e senha para acessar sua conta",
          })}
        </Text>
        <Flex minW="100%" justifyContent="center" mb={5}>
          <Flex width="90%">
            {!isAuthenticated && (
              <LoginForm>
                <Flex
                  flexDir={isMobile ? "column" : "row"}
                  justifyContent={"center"}
                  mt={5}
                >
                  <Text textAlign={"center"}>
                    {t("PAGES:AUTH_PAGE.haventAccount", {
                      defaultValue: "Não possui uma conta? ",
                    })}
                  </Text>
                  <Link href="/signup">
                    <Text
                      textAlign={"center"}
                      textDecoration={"underline"}
                      _hover={{ color: "primary.500" }}
                    >
                      {t("PAGES:AUTH_PAGE.createAccount", {
                        defaultValue: "Cadastre-se",
                      })}
                    </Text>
                  </Link>
                </Flex>
              </LoginForm>
            )}
          </Flex>
        </Flex>
      </Box>
    </AuthLayout>
  );
};
