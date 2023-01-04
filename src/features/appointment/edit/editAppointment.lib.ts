import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditAppointmentFormProps } from "./EditAppointmentForm";
export type EditAppointmentFormData = {
  message: string;
};

export type SubmitEditAppointmentHandler = SubmitHandler<EditAppointmentFormData>;

export const editAppointmentFormSchema = yup.object().shape({
  message: yup.string().required("Nome é obrigatório"),
});

export const useEditAppointmentLib = (props: EditAppointmentFormProps) => {
  const { appointment: currentAppointment } = props;
  const formProps = useForm<EditAppointmentFormData>({
    resolver: yupResolver(editAppointmentFormSchema),
    defaultValues: {
      message: currentAppointment?.message ?? "",
    },
  });
  return { ...formProps };
};
