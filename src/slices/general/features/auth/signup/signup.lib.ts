import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { cpf, cnpj } from "cpf-cnpj-validator";
export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation?: string;
  role?: string;
  phone: string;
  coord?: any;
  cnpjActive: boolean;
}
export type SubmitSignupHandler = SubmitHandler<SignupFormData>;

export const signupSchema = yup.object({
  cnpjActive: yup.boolean(),
  name: yup.string().required("Nome do estabelecimento é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
  cpf: yup.string().when("cnpjActive", {
    is: false,
    then: (schema) =>
      schema
        .required("CPF é obrigatório")
        .test("isValidCpf", "CPF Inválido", (value) => cpf.isValid(replaceDigit(value))),
  }),
  cnpj: yup.string().when("cnpjActive", {
    is: true,
    then: (schema) =>
      schema
        .required("CNPJ é obrigatório")
        .test("isValidCNPJ", "CNPJ Inválido", (value) =>
          cnpj.isValid(replaceDigit(value))
        ),
  }),
  phone: yup
    .string()
    .required("Telefone é obrigatório")
    .test("phone", "Telefone inválido", (value) => {
      const cleanedPhone = replaceDigit(value);
      return cleanedPhone?.length === 11;
    }),
});
export type YupSchema = yup.InferType<typeof signupSchema>;
export const useSignupLib = ({ defaultEmail }) => {
  const formProps = useForm<YupSchema>({
    resolver: yupResolver(signupSchema),
    defaultValues: { email: defaultEmail },
  });
  return { ...formProps };
};
export const replaceDigit = (value: string) => {
  return value.replace(/\D/g, "");
};
