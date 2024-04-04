"use client";
import { useRouter } from "next/navigation";
import { Flex, Text, Box, AuthLayout, Logo } from "@/shared/ui";
import { useAuth } from "@/shared/libs";
import { useEffect } from "react";
import { config } from "@/application/config";
import { SignupForm } from "@/features/auth/signup";
import Link from "next/link";
import { useBreakpointValue } from "@chakra-ui/react";

export function SignUpPage() {
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
          Faça parte do {config.systemName} 🚀
        </Text>
        <Text textAlign={"center"}>
          Insira os dados abaixo para cadastrar seu negócio:
        </Text>
        <Flex minW="100%" justifyContent={"center"} mb={5}>
          <Flex width={"90%"}>
            <SignupForm>
              <Flex
                flexDir={isMobile ? "column" : "row"}
                justifyContent={"center"}
                mt={5}
              >
                <Text textAlign={"center"}>Já possui uma conta?&nbsp;</Text>
                <Link href="/login">
                  <Text
                    textAlign={"center"}
                    textDecoration={"underline"}
                    _hover={{ color: "primary.500" }}
                  >
                    Entre aqui
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
