import { useUi } from "@/shared/libs";
import {
  CreateAppointmentFormData,
  SubmitCreateAppointmentHandler,
  useCreateAppointmentLib,
} from "./createAppointment.lib";
import { useRouter } from "next/navigation";
import { api } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
export const useCreateAppointment = () => {
  const { showModal } = useUi();
  const router = useRouter();
  const [active, setActive] = useState(false);
  const createFunction = async (appointment: CreateAppointmentFormData) => {
    try {
      const { data } = await api.post("/appointment/add", {
        ...appointment,
      });
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
          "Agendamento criada com sucesso, você será redirecionado para a lista de agendamentos",
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
  };
  const createAppointment = useMutation({
    mutationFn: createFunction,
    onError: (error: any) => {
      console.error(error);
    },
  } as any) as any;
  const { register, handleSubmit, formState } = useCreateAppointmentLib();
  const handleCreateAppointment: SubmitCreateAppointmentHandler = async (
    values: CreateAppointmentFormData
  ) => {
    await createAppointment.mutateAsync({ ...values, active });
  };
  return {
    formState,
    register,
    handleSubmit,
    handleCreateAppointment,
    active,
    setActive,
  };
};
