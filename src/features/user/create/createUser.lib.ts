import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ServiceOptions } from "features/user/serviceListMultiple";

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
  serviceOptions: yup
    .array()
    .required("É necessário selecionar pelo menos um serviço")
    .min(1, "É necessário selecionar pelo menos um serviço")
    .of(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
    ),
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
