import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
export type CreateRequestFormData = {
  name: string;
  active?: boolean;
};

export type SubmitCreateRequestHandler = SubmitHandler<CreateRequestFormData>;

export const createRequestFormSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
});

export const useCreateRequestLib = () => {
  const formProps = useForm<CreateRequestFormData>({
    resolver: yupResolver(createRequestFormSchema),
    defaultValues: {
      name: "",
    },
  });
  return { ...formProps };
};
