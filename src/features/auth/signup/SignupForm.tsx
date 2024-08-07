import { Form } from "@/shared/ui";
import { useSignup } from "./signup.hook";
import { useBreakpointValue } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const SignupForm = ({ children }: any) => {
  const isDesktopVersion = useBreakpointValue({ base: false, md: true });
  const { t } = useTranslation(["PAGES"]);

  const { formState, handleSubmit, register, handleSignup } = useSignup();

  const formProps = {
    formState,
    register,
    handleCustomSubmit: handleSignup,
    handleSubmit,
    formControls: [
      {
        type: "text",
        label: t("PAGES:AUTH_PAGE.ownerName", {
          defaultValue: "Nome do estabelecimento",
        }),
        name: "name",
      },
      {
        type: "tel",
        label: t("PAGES:AUTH_PAGE.phone", {
          defaultValue: "Telefone",
        }),
        mask: "(99) 99999-9999",
        name: "phone",
      },
      {
        type: "email",
        label: t("PAGES:AUTH_PAGE.email", {
          defaultValue: "Email de acesso",
        }),
        name: "email",
      },
      {
        type: "password",
        label: t("PAGES:AUTH_PAGE.password", {
          defaultValue: "Senha",
        }),
        name: "password",
      },
    ],
    buttonLabel: t("PAGES:AUTH_PAGE.buttonSignUp", {
      defaultValue: "Cadastrar negócio",
    }),
    id: "signup",
    formControlContainerProps: {
      maxHeigth: isDesktopVersion ? "15rem" : "100%",
      overflowY: isDesktopVersion ? "auto" : "hidden",
      paddingRight: isDesktopVersion ? 8 : 0,
    },
  } as any;

  return <Form {...formProps}>{children}</Form>;
};
