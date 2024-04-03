"use client";
import { useRouter } from "next/navigation";
import { Flex, Text, Box, AuthLayout, Logo } from "@/shared/ui";
import { useAuth } from "@/shared/libs";
import { useEffect } from "react";
import { config } from "@/application/config";
import { SignupForm } from "@/features/auth/signup";

export function SignUpPage() {
  const { isAuthenticated = false } = useAuth() || {};
  const router = useRouter();
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
            <SignupForm />
          </Flex>
        </Flex>
      </Box>
    </AuthLayout>
  );
}
