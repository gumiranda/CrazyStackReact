"use client";
import { ChakraLink, Icon, Logo } from "@/shared/ui";

import {
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useTranslation } from "react-i18next";
import { RiMenuLine } from "react-icons/ri";
import { IconButton, Stack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";

export const MobileDrawer = (props: any) => {
  const { t } = useTranslation(["LANDING"]);
  return (
    <DrawerRoot placement="start">
      <DrawerTrigger asChild>
        <IconButton
          aria-label="Open sidebar"
          fontSize="24"
          children={<Icon as={RiMenuLine} />}
          variant="ghost"
          color={"white"}
          mr="1"
          mt={2}
          onClick={props?.onToggle}
        />
      </DrawerTrigger>
      <DrawerContent bgColor={"secondary.500"}>
        <DrawerHeader>
          <Logo haveLink={false} marginBottom={0} />
        </DrawerHeader>
        <DrawerBody>
          <Stack gap="6" align="stretch">
            {[
              {
                label: t("PAGES:AUTH_PAGE.signIn", {
                  defaultValue: "Entrar",
                }),
                route: "/login",
              },
            ].map((item) => (
              <ChakraLink key={item.label} href={item.route} asChild>
                <Button
                  bgColor={"secondary.400"}
                  color="white"
                  _hover={{ bgColor: "secondary.600" }}
                >
                  {item.label}
                </Button>
              </ChakraLink>
            ))}
            <ChakraLink href={"/signup"} asChild>
              <Button
                bgColor="primary.600"
                color="white"
                _hover={{ bgColor: "primary.700" }}
              >
                {t("PAGES:AUTH_PAGE.buttonSignUp", {
                  defaultValue: "Cadastrar negócio",
                })}
              </Button>
            </ChakraLink>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </DrawerRoot>
  );
};
