import { useUi } from "@/shared/libs";
import { EditAppointmentFormProps } from "./EditAppointmentForm";
import {
  EditAppointmentFormData,
  SubmitEditAppointmentHandler,
  useEditAppointmentLib,
} from "./editAppointment.lib";
import { useRouter } from "next/navigation";
import { api } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
export const useEditAppointment = (props: EditAppointmentFormProps) => {
  const { showModal } = useUi();
  const { appointment: currentAppointment, id, owners } = props;
  const router = useRouter();
  const editAppointment = useMutation({
    mutationFn: async (appointment: EditAppointmentFormData) => {
      try {
        const { data } = await api.patch(
          `/appointment/update?_id=${currentAppointment._id ?? id}`,
          {
            ...appointment,
            updatedAt: new Date(),
          }
        );
        if (!data) {
          showModal({
            content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
            title: "Erro no servidor",
            type: "error",
          });
          return;
        }
        showModal({
          content:
            "Agendamento editada com sucesso, você será redirecionado para a lista de agendamentos",
          title: "Sucesso",
          type: "success",
        });
        router.push("/appointments/1");
        return data;
      } catch (error) {
        showModal({
          content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
          title: "Erro no servidor",
          type: "error",
        });
      }
    },
  });
  const { register, handleSubmit, formState } = useEditAppointmentLib(props);
  const handleEditAppointment: SubmitEditAppointmentHandler = async (
    values: EditAppointmentFormData
  ) => {
    await editAppointment.mutateAsync(values);
  };
  return { formState, register, handleSubmit, handleEditAppointment };
};
