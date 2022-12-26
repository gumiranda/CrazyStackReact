import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
export type CreateUserFormData = {
  name: string;
  active?: boolean;
};

export type SubmitCreateUserHandler = SubmitHandler<CreateUserFormData>;

export const createUserFormSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
});

export const useCreateUserLib = () => {
  const formProps = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserFormSchema),
    defaultValues: {
      name: "",
    },
  });
  return { ...formProps };
};
