import Router from "next/router";
import type { NextPage } from "next";
import { Head, Flex, Text } from "shared/ui";
import { useAuth } from "shared/libs";
import { useEffect } from "react";

export const Login: NextPage = () => {
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (isAuthenticated) {
      Router.push("/home");
    }
  }, [isAuthenticated]);
  return (
    <>
      <Head
        title="Belezix Admin | Login"
        description="Página de login do painel Admin do Belezix"
      />
      <Flex minW="100%" justifyContent="center">
        {!isAuthenticated && (
          <Flex mt="15%">
            <Text fontSize="6xl">CrazyStack ReactJs</Text>
          </Flex>
        )}
      </Flex>
    </>
  );
};
