import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

export interface LoginFormData {
  email: string;
  password: string;
}
export type SubmitLoginHandler = SubmitHandler<LoginFormData>;

export const loginSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
});

export const useLoginLib = () => {
  const formProps = useForm({ resolver: yupResolver(loginSchema) });
  return { ...formProps };
};
