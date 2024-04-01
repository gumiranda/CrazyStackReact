"use client";
import { useMutation } from "@tanstack/react-query";
import { useUi } from "@/shared/libs";
import { api } from "@/shared/api";
import { queryClientInstance } from "@/shared/api";
import { useRouter } from "next/navigation";
import { useGetInfiniteRouteDrivers } from "@/entidades/routeDriver/routeDriver.lib";

export const useRouteDriverInfiniteList = () => {
  const router = useRouter();
  const { showModal, loading } = useUi();
  const all = useGetInfiniteRouteDrivers({
    getNextPageParam: (lastPage: any, pages) => lastPage.next,
    getPreviousPageParam: (firstPage: any, pages) => firstPage.prev,
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
  const total: any = (firstPage?.total as any) || {};
  const deleteSelectedAction = async (item: any) => {
    deleteRouteDriver.mutateAsync([item] as any);
  };
  const deleteRouteDriver = useMutation({
    mutationFn: async (routeDriversToDelete: any = []) => {
      try {
        if (routeDriversToDelete?.length > 0) {
          return Promise.all(
            routeDriversToDelete?.map?.((routeDriver: any) =>
              api.delete(`/routeDriver/delete?_id=${routeDriver._id}`)
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
    onSuccess: () => {
      queryClientInstance.invalidateQueries([
        "routeDriversInfinite",
        data?.pages ?? 1,
      ] as any);
      queryClientInstance.refetchQueries(["routeDriversInfinite", data?.pages] as any);
      router.refresh();
    },
    onError: () => {
      showModal({
        content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
        title: "Erro no servidor",
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
