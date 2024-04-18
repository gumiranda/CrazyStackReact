"use client";
import { useMutation } from "@tanstack/react-query";
import { useUi } from "@/shared/libs";
import { api } from "@/shared/api";
import { queryClientInstance } from "@/shared/api";
import { useRouter } from "next/navigation";
import { useGetInfiniteAppointments } from "@/entidades/appointment/appointment.lib";
import { useTranslation } from "react-i18next";

export const useAppointmentInfiniteList = () => {
  const { t } = useTranslation(["PAGES"]);

  const router = useRouter();
  const { showModal, loading } = useUi();
  const all = useGetInfiniteAppointments({
    getNextPageParam: (lastPage: any) => lastPage.next,
    getPreviousPageParam: (firstPage: any) => firstPage.prev,
  } as any);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  }: any = all || {};
  const firstPage: any = data?.pages[0];
  const total: any = (firstPage?.totalCount as any) || {};
  const deleteSelectedAction = async (item: any) => {
    deleteAppointment.mutateAsync([item] as any);
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
      queryClientInstance.invalidateQueries([
        "appointmentsInfinite",
        data?.pages ?? 1,
      ] as any);
      queryClientInstance.refetchQueries(["appointmentsInfinite", data?.pages] as any);
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
  return {
    deleteSelectedAction,
    isFetching,
    error,
    total,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    loading,
  };
};
