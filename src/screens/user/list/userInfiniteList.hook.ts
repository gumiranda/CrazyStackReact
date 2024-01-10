import { useMutation } from "@tanstack/react-query";
import { useUi } from "shared/libs";
import { api } from "shared/api";
import { queryClientInstance } from "shared/api";
import { useRouter } from "next/router";
import { useGetInfiniteUsers } from "entidades/user/user.lib";

export const useUserInfiniteList = () => {
  const router = useRouter();
  const { showModal, loading } = useUi();
  const all = useGetInfiniteUsers({
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
    deleteUser.mutateAsync([item]);
  };
  const deleteUser = useMutation(
    async (usersToDelete: any = []) => {
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
          content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
          title: "Erro no servidor",
          type: "error",
        });
      }
    },
    {
      onSuccess: () => {
        queryClientInstance.invalidateQueries(["usersInfinite", data?.pages ?? 1]);
        queryClientInstance.refetchQueries(["usersInfinite", data?.pages]);
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
