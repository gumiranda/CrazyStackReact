"use client";
import { ClientOnly, Skeleton } from "@chakra-ui/react";

import { Form, useBreakpointValue } from "@/shared/ui";
import { useSignup } from "./signup.hook";
import { useTranslation } from "react-i18next";

export const SignupForm = ({ children, defaultEmail }: any) => {
  const isDesktopVersion = useBreakpointValue({ base: false, lg: true });
  const { t } = useTranslation(["PAGES"]);

  const { formState, handleSubmit, register, handleSignup, cnpjActive, setValue } =
    useSignup({
      defaultEmail,
    });
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
        type: "text",
        name: "cpf",
        label: t("PAGES:AUTH_PAGE.cpf", {
          defaultValue: "CPF",
        }),
        mask: "___.___.___-__",
        hide: !!cnpjActive,
      },
      {
        type: "text",
        name: "cnpj",
        label: t("PAGES:AUTH_PAGE.cnpj", {
          defaultValue: "CNPJ",
        }),
        mask: "__.___.___/____-__",
        hide: !cnpjActive,
      },
      {
        type: "text",
        name: "cnpjActive",
        checkboxprops: {
          name: "cnpjActive",
          defaultChecked: false,
          checked: cnpjActive,
          value: cnpjActive,
          onCheckedChange: (e) => setValue("cnpjActive", !!e?.checked),
          colorPalette: "primary",
          label: t("PAGES:AUTH_PAGE.cnpjActive", {
            defaultValue: "Cadastrar como pessoa jurídica?",
          }),
        },
      },
      {
        type: "tel",
        label: t("PAGES:AUTH_PAGE.phone", {
          defaultValue: "Telefone",
        }),
        mask: "(__) _____-____",
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
      maxHeight: isDesktopVersion ? "15rem" : "100%",
      overflowY: isDesktopVersion ? "auto" : "hidden",
      paddingRight: isDesktopVersion ? 8 : 0,
    },
  } as any;

  return (
    <ClientOnly fallback={<Skeleton />}>
      <Form {...formProps}>{children}</Form>
    </ClientOnly>
  );
};
