import { Form } from "@/shared/ui";
import { useSignup } from "./signup.hook";
import { useBreakpointValue } from "@chakra-ui/react";

export const SignupForm = ({ children }: any) => {
  const isDesktopVersion = useBreakpointValue({ base: false, md: true });

  const { formState, handleSubmit, register, handleSignup } = useSignup();

  const formProps = {
    formState,
    register,
    handleCustomSubmit: handleSignup,
    handleSubmit,
    formControls: [
      { type: "text", label: "Nome do estabelecimento", name: "name" },
      { type: "tel", label: "Telefone", mask: "(99) 99999-9999", name: "phone" },
      { type: "email", label: "E-mail de acesso", name: "email" },
      { type: "password", label: "Sua senha", name: "password" },
    ],
    buttonLabel: "Cadastrar negócio",
    id: "signup",
    formControlContainerProps: {
      maxHeigth: isDesktopVersion ? "15rem" : "100%",
      overflowY: isDesktopVersion ? "auto" : "hidden",
      paddingRight: isDesktopVersion ? 8 : 0,
    },
  } as any;

  return <Form {...formProps}>{children}</Form>;
};
