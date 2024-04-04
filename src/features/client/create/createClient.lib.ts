import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
export type CreateClientFormData = {
  name: string;
  active?: boolean;
  userId?: string;
};

export type SubmitCreateClientHandler = SubmitHandler<CreateClientFormData>;

export const createClientFormSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
});
export type YupSchema = yup.InferType<typeof createClientFormSchema>;

export const useCreateClientLib = () => {
  const formProps = useForm<YupSchema>({
    resolver: yupResolver(createClientFormSchema),
    defaultValues: {
      name: "",
    },
  });
  return { ...formProps };
};
