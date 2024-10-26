import { ChakraLink, Logo } from "@/shared/ui";
import {
  Button,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
  Stack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const MobileDrawer = (props: any) => {
  const { t } = useTranslation(["LANDING"]);
  return (
    <DrawerRoot placement="left" {...props}>
      <DrawerBackdrop />
      <DrawerTrigger />
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
              <ChakraLink key={item.label} href={item.route}>
                <Button
                  bgColor={"secondary.500"}
                  color="white"
                  _hover={{ bgColor: "secondary.600" }}
                  size="lg"
                  colorPalette="gray"
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
    </DrawerRoot>
  );
};
