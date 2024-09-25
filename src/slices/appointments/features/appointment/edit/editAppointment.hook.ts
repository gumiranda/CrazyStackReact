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
import { useTranslation } from "react-i18next";

export const useEditAppointment = (props: EditAppointmentFormProps) => {
  const { t } = useTranslation(["PAGES"]);
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
            content: t("PAGES:MESSAGES.errorMessage", {
              defaultValue:
                "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
            }),
            title: t("PAGES:MESSAGES.internalServerError", {
              defaultValue: "Erro no servidor",
            }),
            type: "error",
          });
          return;
        }
        showModal({
          content: t("PAGES:MESSAGES.successMessage", {
            domain: t("PAGES:HOME_PAGE.appointment", {
              defaultValue: "Agendamento",
            }),
            operation: t("PAGES:MESSAGES.edit", {
              defaultValue: "editada",
            }),
            defaultValue:
              "Agendamento editado com sucesso, você será redirecionado para a lista de agendamentos",
          }),
          title: t("PAGES:MESSAGES.success", {
            defaultValue: "Sucesso",
          }),
          type: "success",
        });
        router.push("/appointments/1");
        return data;
      } catch (error) {
        showModal({
          content: t("PAGES:MESSAGES.errorMessage", {
            defaultValue:
              "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
          }),
          title: t("PAGES:MESSAGES.internalServerError", {
            defaultValue: "Erro no servidor",
          }),
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
