import Router from "next/router";
import type { NextPage } from "next";

import { Head, Flex, Text } from "shared/ui";
export const Login: NextPage = () => {
  return (
    <>
      <Head
        title="Belezix Admin | Login"
        description="Página de login do painel Admin do Belezix"
      />
      <Flex minW="100%" justifyContent="center">
        <Flex mt="15%">
          <Text fontSize="6xl">CrazyStack ReactJs</Text>
        </Flex>
      </Flex>
    </>
  );
};
