import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ServiceOptions } from "./createUser.hook";
export type CreateUserFormData = {
  name: string;
  active?: boolean;
  email: string;
  password: string;
  passwordConfirmation: string;
  role?: string;
  ownerId?: string;
  myOwnerId?: string;
  serviceIds?: string[];
  serviceOptions?: ServiceOptions[];
};

export type SubmitCreateUserHandler = SubmitHandler<CreateUserFormData>;

export const createUserFormSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
  passwordConfirmation: yup
    .string()
    .required("Confirmação de senha é obrigatória")
    .oneOf([yup.ref("password"), null], "Senhas não conferem"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
});

export const useCreateUserLib = () => {
  const formProps = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });
  return { ...formProps };
};
