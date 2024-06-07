import { ChakraLink } from "@/shared/ui";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerProps,
  Stack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const MobileDrawer = (props: Omit<DrawerProps, "children">) => {
  const { t } = useTranslation(["LANDING"]);
  return (
    <Drawer placement="left" {...props}>
      <DrawerContent bgColor={"secondary.500"}>
        <DrawerBody my="16">
          <Stack spacing="6" align="stretch">
            {[
              {
                label: t("PAGES:AUTH_PAGE.signIn", {
                  defaultValue: "Entrar",
                }),
                route: "/login",
              },
            ].map((item) => (
              <ChakraLink key={item.label} href={item.route}>
                <Button
                  bgColor={"secondary.500"}
                  color="white"
                  _hover={{ bgColor: "secondary.600" }}
                  size="lg"
                  colorScheme="gray"
                >
                  {item.label}
                </Button>
              </ChakraLink>
            ))}
            <ChakraLink href={"/signup"}>
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
    </Drawer>
  );
};
