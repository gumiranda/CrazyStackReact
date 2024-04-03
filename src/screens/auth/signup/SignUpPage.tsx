"use client";
import { useRouter } from "next/navigation";
import { Flex, Text, Box, AuthLayout } from "@/shared/ui";
import { useAuth } from "@/shared/libs";
import { useEffect } from "react";

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
      <Box></Box>
    </AuthLayout>
  );
}
