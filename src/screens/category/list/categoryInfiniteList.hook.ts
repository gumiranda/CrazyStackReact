import { useMutation } from "@tanstack/react-query";
import { useUi } from "shared/libs";
import { api } from "shared/api";
import { queryClientInstance } from "shared/api";
import { useRouter } from "next/router";
import { useGetInfiniteCategorys } from "entidades/category/category.lib";

export const useCategoryInfiniteList = () => {
  const router = useRouter();
  const { showModal, loading } = useUi();
  const all = useGetInfiniteCategorys({
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
    deleteCategory.mutateAsync([item]);
  };
  const deleteCategory = useMutation(
    async (categorysToDelete: any = []) => {
      try {
        if (categorysToDelete?.length > 0) {
          return Promise.all(
            categorysToDelete?.map?.((category: any) =>
              api.delete(`/category/delete?_id=${category._id}`)
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
        queryClientInstance.invalidateQueries(["categorysInfinite", data?.pages ?? 1]);
        queryClientInstance.refetchQueries(["categorysInfinite", data?.pages]);
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
