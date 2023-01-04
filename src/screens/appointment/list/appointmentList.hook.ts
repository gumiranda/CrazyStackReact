import { GetAppointmentsResponse } from "entidades/appointment/appointment.api";
import { useState, useEffect } from "react";
import { useUi } from "shared/libs";
import { api, queryClientInstance } from "shared/api";
import { useMutation } from "@tanstack/react-query";
import { AppointmentProps } from "entidades/appointment";
import { useRouter } from "next/router";
type AppointmentListHook = {
  initialData: GetAppointmentsResponse;
  page: number;
};
export const useAppointmentList = (data: AppointmentListHook) => {
  const router = useRouter();
  const { showModal } = useUi();
  const [page, setPage] = useState(data.page);
  const [appointments, setAppointments] = useState(data?.initialData?.appointments ?? []);
  const handlePrefetchAppointment = async ({ _id: appointmentId }: any) => {
    await queryClientInstance.prefetchQuery(
      ["appointment", appointmentId],
      async () => {
        const { data = null } = (await api.get(`/appointment/load?_id=${ appointmentId}`)) || {};
        return data;
      },
      { staleTime: 1000 * 60 * 10 }
    );
  };
  const deleteAppointment = useMutation(
    async (appointmentsToDelete: any = []) => {
      try {
        if (appointmentsToDelete?.length > 0) {
          return Promise.all(
            appointmentsToDelete?.map?.((appointment: any) =>
              api.delete(`/appointment/delete?_id=${ appointment._id}`)
            )
          );
        }
        return null;
      } catch (error) {
        showModal({
          content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
          title: "Erro no servidor",
          type: "error",
        });
      }
    },
    {
      onSuccess: () => {
        queryClientInstance.invalidateQueries(["appointments", data.page]);
        queryClientInstance.refetchQueries(["appointments", data.page]);
        router.reload();
      },
      onError: () => {
        showModal({
          content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
          title: "Erro no servidor",
          type: "error",
        });
      },
      retry: 3,
    }
  );
  const deleteSelectedAction = async () => {
    deleteAppointment.mutateAsync(
      appointments.filter((appointment: AppointmentProps) => appointment.value)
    );
  };
  const changePage = (newpage: number) => {
    router.replace(`/appointments/${newpage}`);
  };
  useEffect(() => {
    setAppointments(data?.initialData?.appointments ?? []);
  }, [data?.initialData?.appointments]);
  return {
    appointments,
    setAppointments,
    handlePrefetchAppointment,
    deleteSelectedAction,
    page,
    setPage: changePage,
    total: data?.initialData?.totalCount,
  };
};
