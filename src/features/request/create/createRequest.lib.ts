import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
export type CreateRequestFormData = {
  message: string;
  serviceId?: string;
  professionalId?: string;
  ownerId?: string;
  clientId?: string;
  userId?: string;
  active?: boolean;
};

export type SubmitCreateRequestHandler = SubmitHandler<CreateRequestFormData>;

export const createRequestFormSchema = yup.object().shape({
  message: yup.string(),
});

export const useCreateRequestLib = () => {
  const formProps = useForm<CreateRequestFormData>({
    resolver: yupResolver(createRequestFormSchema),
    defaultValues: {
      message: "",
    },
  });
  return { ...formProps };
};
