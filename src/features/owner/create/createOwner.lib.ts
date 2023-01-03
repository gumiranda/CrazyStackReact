import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
export type CreateOwnerFormData = {
  name: string;
  active?: boolean;
};

export type SubmitCreateOwnerHandler = SubmitHandler<CreateOwnerFormData>;

export const createOwnerFormSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
});

export const useCreateOwnerLib = () => {
  const formProps = useForm<CreateOwnerFormData>({
    resolver: yupResolver(createOwnerFormSchema),
    defaultValues: {
      name: "",
    },
  });
  return { ...formProps };
};
