import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
export type CreateClientFormData = {
  name: string;
  active?: boolean;
  userId?: string;
  phone: string;
  _id?: string;
  myOwnerId?: string;
  ownerId?: string;
};

export type SubmitCreateClientHandler = SubmitHandler<CreateClientFormData>;

export const createClientFormSchema = yup.object({
  _id: yup.string(),
  name: yup.string().required("Nome é obrigatório"),
  phone: yup
    .string()
    .required("Telefone é obrigatório")
    .test("phone", "Telefone inválido", (value) => {
      const cleanedPhone = value?.replace?.(/\D/g, "");
      return cleanedPhone?.length === 11;
    }),
});
export type YupSchema = yup.InferType<typeof createClientFormSchema>;

export const useCreateClientLib = () => {
  const formProps = useForm<YupSchema>({
    resolver: yupResolver(createClientFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      _id: "",
    },
  });
  return { ...formProps };
};
