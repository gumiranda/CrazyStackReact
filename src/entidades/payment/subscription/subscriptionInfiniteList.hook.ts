/* eslint-disable react-hooks/rules-of-hooks */
import { useAuth, useUi } from "@/shared/libs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetInfiniteSubscriptions } from "./subscription.lib";
import { queryClientInstance, setupAPIClient } from "@/shared/api";
import { useTranslation } from "react-i18next";

export const useSubscriptionInfiniteList = () => {
  const { t } = useTranslation(["PAGES"]);

  const router = useRouter();
  const queryClient = useQueryClient();
  const { logout = () => {}, isAuthenticated } = useAuth() || {};
  const { showModal, loading } = useUi();
  const [selectedDate, setSelectedDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState<any>(new Date());

  const all = isAuthenticated
    ? useGetInfiniteSubscriptions({
        getNextPageParam: (lastPage: any) => lastPage.next,
        getPreviousPageParam: (lastPage: any) => lastPage.prev,
      } as any)
    : {};
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["subscriptionsInfinite"] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, endDate]);
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching }: any =
    all || {};
  const firstPage = data?.pages?.[0];
  const total = firstPage?.totalCount ?? 0;
  useEffect(() => {
    if ([403, 401, 500].includes(error?.response?.status)) {
      logout?.();
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error?.response?.status]);
  const deleteSubscription = useMutation({
    mutationFn: async (subscriptionsToDelete: any) => {
      try {
        if (subscriptionsToDelete?.length > 0) {
          return Promise.all(
            subscriptionsToDelete?.map?.((subscription: any) =>
              setupAPIClient().delete(`/subscription/delete?_id=${subscription._id}`)
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
        "subscriptionsInfinite",
        data?.pages ?? 1,
      ] as any);
      queryClientInstance.refetchQueries(["subscriptionsInfinite", data?.pages] as any);
      router.push("/clients/1");
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
  });
  const deleteSelectedAction = async (item: any) => {
    deleteSubscription.mutateAsync([item] as any);
  };
  const subscriptionList =
    data?.pages
      ?.map?.((page: any) => page?.subscriptions)
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
    subscriptionList,
    endDate,
    setEndDate,
  };
};
