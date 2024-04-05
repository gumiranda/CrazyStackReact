import { useAuth, useUi } from "@/shared/libs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetInfiniteRequests } from "./request.lib";
import { endOfDay, startOfDay } from "date-fns";
import { queryClientInstance, setupAPIClient } from "@/shared/api";

export const useRequestInfiniteList = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { logout = () => {} } = useAuth() || {};
  const { showModal, loading } = useUi();
  const [selectedDate, setSelectedDate] = useState<any>(new Date());
  const query = {
    initDate: startOfDay(new Date(selectedDate)),
    endDate: endOfDay(new Date(selectedDate)),
  };
  const all = useGetInfiniteRequests(
    {
      getNextPageParam: (lastPage: any) => lastPage.next,
      getPreviousPageParam: (lastPage: any) => lastPage.prev,
    } as any,
    query
  );
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["requestsInfinite", query] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching }: any =
    all || {};
  const firstPage = data?.pages?.[0];
  const total = firstPage?.total;
  useEffect(() => {
    if ([403, 401, 500].includes(error?.response?.status)) {
      logout?.();
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error?.response?.status]);
  const deleteRequest = useMutation({
    mutationFn: async (requestsToDelete: any) => {
      try {
        if (requestsToDelete?.length > 0) {
          return Promise.all(
            requestsToDelete?.map?.((request: any) =>
              setupAPIClient().delete(`/request/delete?_id=${request._id}`)
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
        "requestsInfinite",
        data?.pages ?? 1,
      ] as any);
      queryClientInstance.refetchQueries(["requestsInfinite", data?.pages] as any);
      router.push("/clients/1");
    },
    onError: () => {
      showModal({
        content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
        title: "Erro no servidor",
        type: "error",
      });
    },
    retry: 3,
  });
  const deleteSelectedAction = async (item: any) => {
    deleteRequest.mutateAsync([item] as any);
  };
  const requestList =
    data?.pages
      ?.map?.((page: any) => page?.requests)
      ?.reduce?.((a: any, b: any) => a.concat(b)) ??
    data ??
    [];
  return {
    deleteSelectedAction,
    isFetching,
    error,
    total,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    loading,
    selectedDate,
    setSelectedDate,
    requestList,
  };
};
