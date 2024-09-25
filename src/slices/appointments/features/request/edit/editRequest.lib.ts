import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditRequestFormProps } from "./EditRequestForm";
export type EditRequestFormData = {
  message?: string;
  status?: number;
  clientId?: string;
  professionalId?: string;
  serviceId?: string;
  ownerId?: string;
  createdForId?: string;
  initDate?: string;
  endDate?: string;
  date?: string;
  haveRecurrence?: boolean;
  haveRide?: boolean;
  haveFidelity?: boolean;
  haveDelivery?: boolean;
};

export type SubmitEditRequestHandler = SubmitHandler<EditRequestFormData>;

export const editRequestFormSchema = yup.object({
  message: yup.string(),
});
export type YupSchema = yup.InferType<typeof editRequestFormSchema>;

export const useEditRequestLib = (props: EditRequestFormProps) => {
  const { request: currentRequest } = props;
  const formProps = useForm<YupSchema>({
    resolver: yupResolver(editRequestFormSchema),
    defaultValues: {
      message: currentRequest?.message ?? "",
    },
  });
  return { ...formProps };
};
