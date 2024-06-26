"use client";
import { useMutation } from "@tanstack/react-query";
import { useUi } from "@/shared/libs";
import { api } from "@/shared/api";
import { queryClientInstance } from "@/shared/api";
import { useRouter } from "next/navigation";
import { useGetInfiniteOwners } from "@/entidades/owner/owner.lib";

export const useOwnerInfiniteList = () => {
  const router = useRouter();
  const { showModal, loading } = useUi();
  const all = useGetInfiniteOwners({
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
    deleteOwner.mutateAsync([item] as any);
  };
  const deleteOwner = useMutation({
    mutationFn: async (ownersToDelete: any = []) => {
      try {
        if (ownersToDelete?.length > 0) {
          return Promise.all(
            ownersToDelete?.map?.((owner: any) =>
              api.delete(`/owner/delete?_id=${owner._id}`)
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
      queryClientInstance.invalidateQueries(["ownersInfinite", data?.pages ?? 1] as any);
      queryClientInstance.refetchQueries(["ownersInfinite", data?.pages] as any);
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
