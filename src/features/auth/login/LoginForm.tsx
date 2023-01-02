import { Form } from "shared/ui";
import { useLogin } from "./login.hook";
export const LoginForm = () => {
  const { formState, handleSubmit, register, handleLogin } = useLogin();
  const formProps = {
    formState,
    register,
    handleCustomSubmit: handleLogin,
    handleSubmit,
    formControls: [
      { type: "email", label: "Email", name: "email" },
      { type: "password", label: "Senha", name: "password" },
    ],
    buttonLabel: "Entrar",
  };
  return <Form {...formProps} />;
};
