import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
export type ExternalProps = {
  serviceId?: string;
  professionalId?: string;
  ownerId?: string;
  clientId?: string;
  clientUserId?: string;
  createdForId?: string;
  initDate?: string;
  endDate?: string;
  haveDelivery?: boolean;
  haveRecurrence?: boolean;
  haveFidelity?: boolean;
  haveRide?: boolean;
  type?: string;
  status?: number;
};
export type CreateRequestFormData = ExternalProps & {
  message: string;
  userId?: string;
  active?: boolean;
};

export type SubmitCreateRequestHandler = SubmitHandler<CreateRequestFormData>;

export const createRequestFormSchema = yup.object().shape({
  message: yup.string().required("Nome é obrigatório"),
});

export const useCreateRequestLib = (props: ExternalProps) => {
  const formProps = useForm<CreateRequestFormData>({
    resolver: yupResolver(createRequestFormSchema),
    defaultValues: {
      message: "",
      ...props,
    },
  });
  return { ...formProps };
};
