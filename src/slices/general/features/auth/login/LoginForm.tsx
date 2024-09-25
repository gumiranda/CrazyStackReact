import { Form } from "@/shared/ui";
import { useLogin } from "./login.hook";
import { useTranslation } from "react-i18next";

export const LoginForm = ({ children }) => {
  const { formState, handleSubmit, register, handleLogin } = useLogin();
  const { t } = useTranslation(["PAGES"]);

  const formProps = {
    formState,
    register,
    handleCustomSubmit: handleLogin,
    handleSubmit,
    formControls: [
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
    buttonLabel: t("PAGES:AUTH_PAGE.signIn", {
      defaultValue: "Entrar",
    }),
    id: "login",
  } as any;

  return <Form {...formProps}>{children}</Form>;
};
