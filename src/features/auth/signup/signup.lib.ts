import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

export interface SignupFormData {
  email: string;
  password: string;
}
export type SubmitSignupHandler = SubmitHandler<SignupFormData>;

export const signupSchema = yup.object({
  name: yup.string().required("Nome do estabelecimento é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
  phone: yup
    .string()
    .required("Telefone é obrigatório")
    .min(14, "Telefone inválido")
    .max(15, "Telefone inválido"),
});
export type YupSchema = yup.InferType<typeof signupSchema>;
export const useSignupLib = () => {
  const formProps = useForm<YupSchema>({ resolver: yupResolver(signupSchema) });
  return { ...formProps };
};
