import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
export type CreateRouteDriverFormData = {
  name: string;
  active?: boolean;
};

export type SubmitCreateRouteDriverHandler = SubmitHandler<CreateRouteDriverFormData>;

export const createRouteDriverFormSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
});

export const useCreateRouteDriverLib = () => {
  const formProps = useForm<CreateRouteDriverFormData>({
    resolver: yupResolver(createRouteDriverFormSchema),
    defaultValues: {
      name: "",
    },
  });
  return { ...formProps };
};
