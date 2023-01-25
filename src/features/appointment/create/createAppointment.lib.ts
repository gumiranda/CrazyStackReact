import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
export type CreateAppointmentFormData = {
  name: string;
  active?: boolean;
};

export type SubmitCreateAppointmentHandler = SubmitHandler<CreateAppointmentFormData>;

export const createAppointmentFormSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
});

export const useCreateAppointmentLib = () => {
  const formProps = useForm<CreateAppointmentFormData>({
    resolver: yupResolver(createAppointmentFormSchema),
    defaultValues: {
      name: "",
    },
  });
  return { ...formProps };
};
