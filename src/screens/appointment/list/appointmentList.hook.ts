"use client";
import { GetAppointmentsResponse } from "@/entidades/appointment/appointment.api";
import { useState, useEffect } from "react";
import { useUi } from "@/shared/libs";
import { api, queryClientInstance } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { AppointmentProps } from "@/entidades/appointment";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
type AppointmentListHook = {
  initialData: GetAppointmentsResponse;
  page: number;
};
export const useAppointmentList = (data: AppointmentListHook) => {
  const { t } = useTranslation(["PAGES"]);

  const router = useRouter();
  const { showModal } = useUi();
  const [page] = useState(data.page);
  const [appointments, setAppointments] = useState(data?.initialData?.appointments ?? []);
  const handlePrefetchAppointment = async ({ _id: appointmentId }: any) => {
    await queryClientInstance.prefetchQuery({
      queryKey: ["appointment", appointmentId],
      queryFn: (async () => {
        const { data = null } =
          (await api.get(`/appointment/load?_id=${appointmentId}`)) || {};
        return data;
      }) as any,
      staleTime: 1000 * 60 * 10,
    });
  };
  const deleteAppointment = useMutation({
    mutationFn: async (appointmentsToDelete: any = []) => {
      try {
        if (appointmentsToDelete?.length > 0) {
          return Promise.all(
            appointmentsToDelete?.map?.((appointment: any) =>
              api.delete(`/appointment/delete?_id=${appointment._id}`)
            )
          );
        }
        return null;
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
    onSuccess: () => {
      // queryClientInstance.invalidateQueries(["appointments", data.page]);
      // queryClientInstance.refetchQueries(["appointments", data.page]);
      router.refresh();
    },
    onError: () => {
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
    },
    retry: 3,
  } as any);
  const deleteSelectedAction = async () => {
    deleteAppointment.mutateAsync(
      appointments.filter(
        (appointment: AppointmentProps) => appointment.value as any
      ) as any
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
