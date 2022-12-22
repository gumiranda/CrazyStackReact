import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
export type CreateServiceFormData = {
  name: string;
  active?: boolean;
};

export type SubmitCreateServiceHandler = SubmitHandler<CreateServiceFormData>;

export const createServiceFormSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
});

export const useCreateServiceLib = () => {
  const formProps = useForm<CreateServiceFormData>({
    resolver: yupResolver(createServiceFormSchema),
    defaultValues: {
      name: "",
    },
  });
  return { ...formProps };
};
