"use client";
import { useMutation } from "@tanstack/react-query";
import { useUi } from "@/shared/libs";
import { api } from "@/shared/api";
import { queryClientInstance } from "@/shared/api";
import { useRouter } from "next/navigation";
import { useGetInfiniteUsers } from "@/slices/general/entidades/user/user.lib";
import { useTranslation } from "react-i18next";

export const useUserInfiniteList = () => {
  const { t } = useTranslation(["PAGES"]);
  const router = useRouter();
  const { showModal, loading } = useUi();
  const all = useGetInfiniteUsers({
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
  const total: any = (firstPage?.totalCount as any) || {};
  const deleteSelectedAction = async (item: any) => {
    deleteUser.mutateAsync([item] as any);
  };
  const deleteUser = useMutation({
    mutationFn: async (usersToDelete: any = []) => {
      try {
        if (usersToDelete?.length > 0) {
          return Promise.all(
            usersToDelete?.map?.((user: any) =>
              api.delete(`/user/delete?_id=${user._id}`)
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
      queryClientInstance.invalidateQueries(["usersInfinite", data?.pages ?? 1] as any);
      queryClientInstance.refetchQueries(["usersInfinite", data?.pages] as any);
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
