import { Form } from "@/shared/ui";
import { useLogin } from "./login.hook";

export const LoginForm = ({ children }) => {
  const { formState, handleSubmit, register, handleLogin } = useLogin();

  const formProps = {
    formState,
    register,
    handleCustomSubmit: handleLogin,
    handleSubmit,
    formControls: [
      { type: "email", label: "E-mail de acesso", name: "email" },
      { type: "password", label: "Sua senha", name: "password" },
    ],
    buttonLabel: "Entrar",
    id: "login",
  } as any;

  return <Form {...formProps}>{children}</Form>;
};
