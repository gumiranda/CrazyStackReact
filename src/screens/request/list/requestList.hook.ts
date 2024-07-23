"use client";
import { GetRequestsResponse } from "@/entidades/request/request.api";
import { useState, useEffect } from "react";
import { useUi } from "@/shared/libs";
import { api, queryClientInstance } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { RequestProps } from "@/entidades/request";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
type RequestListHook = {
  initialData: GetRequestsResponse;
  page: number;
};
export const useRequestList = (data: RequestListHook) => {
  const { t } = useTranslation(["PAGES"]);

  const router = useRouter();
  const { showModal } = useUi();
  const [page, setPage] = useState(data.page);
  const [requests, setRequests] = useState(data?.initialData?.requests ?? []);
  const handlePrefetchRequest = async ({ _id: requestId }: any) => {
    // await queryClientInstance.prefetchQuery(
    //   ["request", requestId],
    //   async () => {
    //     const { data = null } =
    //       (await api.get(`/request/load?_id=${requestId}`)) || {};
    //     return data;
    //   },
    //   { staleTime: 1000 * 60 * 10 },
    // );
  };
  const deleteRequest = useMutation({
    mutationFn: async (requestsToDelete: any = []) => {
      try {
        if (requestsToDelete?.length > 0) {
          return Promise.all(
            requestsToDelete?.map?.((request: any) =>
              api.delete(`/request/delete?_id=${request._id}`)
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
      queryClientInstance.invalidateQueries(["requests", data.page] as any);
      queryClientInstance.refetchQueries(["requests", data.page] as any);
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
    deleteRequest.mutateAsync(
      requests.filter((request: RequestProps) => request.value) as any
    );
  };
  const changePage = (newpage: number) => {
    router.replace(`/requests/${newpage}`);
  };
  useEffect(() => {
    setRequests(data?.initialData?.requests ?? []);
  }, [data?.initialData?.requests]);
  return {
    requests,
    setRequests,
    handlePrefetchRequest,
    deleteSelectedAction,
    page,
    setPage: changePage,
    total: data?.initialData?.totalCount,
  };
};
