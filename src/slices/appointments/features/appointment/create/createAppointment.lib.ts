import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
export type CreateAppointmentFormData = {
  name: string;
  active?: boolean;
};

export type SubmitCreateAppointmentHandler = SubmitHandler<CreateAppointmentFormData>;

export const createAppointmentFormSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
});
export type YupSchema = yup.InferType<typeof createAppointmentFormSchema>;

export const useCreateAppointmentLib = () => {
  const formProps = useForm<YupSchema>({
    resolver: yupResolver(createAppointmentFormSchema),
    defaultValues: {
      name: "",
    },
  });
  return { ...formProps };
};
