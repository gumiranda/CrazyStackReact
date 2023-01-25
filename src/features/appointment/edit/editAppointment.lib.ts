import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditAppointmentFormProps } from "./EditAppointmentForm";
export type EditAppointmentFormData = {
  name: string;
};

export type SubmitEditAppointmentHandler = SubmitHandler<EditAppointmentFormData>;

export const editAppointmentFormSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
});

export const useEditAppointmentLib = (props: EditAppointmentFormProps) => {
  const { appointment: currentAppointment } = props;
  const formProps = useForm<EditAppointmentFormData>({
    resolver: yupResolver(editAppointmentFormSchema),
    defaultValues: {
      name: currentAppointment?.name ?? "",
    },
  });
  return { ...formProps };
};
