"use client";

import { useRouter } from "next/navigation";
import type { NextPage } from "next";
import { Text, Flex, AuthLayout, Logo, Box } from "@/shared/ui";
import { useAuth } from "@/shared/libs";
import { useEffect } from "react";
import { LoginForm } from "@/features/auth/login";
import { config } from "@/application/config";
import Link from "next/link";
import { useBreakpointValue } from "@chakra-ui/react";
export const Login: NextPage = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const isMobile = useBreakpointValue({ base: true, md: false });
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home");
    }
  }, [isAuthenticated, router]);
  return (
    <AuthLayout>
      <Logo marginBottom={4} mt={5} haveLink={false} />
      <Box>
        <Text textAlign={"center"} fontWeight={"bold"} fontSize={"2xl"} color="white">
          Olá, seja bem-vindo 👋
        </Text>
        <Text textAlign={"center"}>Insira seu e-mail e senha para acessar sua conta</Text>
        <Flex minW="100%" justifyContent="center" mb={5}>
          <Flex width="90%">
            {!isAuthenticated && (
              <LoginForm>
                <Flex
                  flexDir={isMobile ? "column" : "row"}
                  justifyContent={"center"}
                  mt={5}
                >
                  <Text textAlign={"center"}>Não possui uma conta?&nbsp;</Text>
                  <Link href="/signup">
                    <Text
                      textAlign={"center"}
                      textDecoration={"underline"}
                      _hover={{ color: "primary.500" }}
                    >
                      Cadastre-se
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
