import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

export interface LoginFormData {
  email: string;
  password: string;
}
export type SubmitLoginHandler = SubmitHandler<LoginFormData>;

export const loginSchema = yup.object({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
});
export type YupSchema = yup.InferType<typeof loginSchema>;

export const useLoginLib = () => {
  const formProps = useForm<YupSchema>({ resolver: yupResolver(loginSchema) });
  return { ...formProps };
};
