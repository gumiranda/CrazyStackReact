import { useMutation } from "@tanstack/react-query";
import { useUi } from "@/shared/libs";
import { api } from "@/shared/api";
import { queryClientInstance } from "@/shared/api";
import { useRouter } from "next/router";
import { useGetInfiniteAppointments } from "@/entidades/appointment/appointment.lib";

export const useAppointmentInfiniteList = () => {
  const router = useRouter();
  const { showModal, loading } = useUi();
  const all = useGetInfiniteAppointments({
    getNextPageParam: (lastPage: any, pages) => lastPage.next,
    getPreviousPageParam: (firstPage: any, pages) => firstPage.prev,
  });
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = all || {};
  const firstPage: any = data?.pages[0];
  const total: any = (firstPage?.total as any) || {};
  const deleteSelectedAction = async (item: any) => {
    deleteAppointment.mutateAsync([item]);
  };
  const deleteAppointment = useMutation(
    async (appointmentsToDelete: any = []) => {
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
          content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
          title: "Erro no servidor",
          type: "error",
        });
      }
    },
    {
      onSuccess: () => {
        queryClientInstance.invalidateQueries(["appointmentsInfinite", data?.pages ?? 1]);
        queryClientInstance.refetchQueries(["appointmentsInfinite", data?.pages]);
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
