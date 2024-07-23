"use client";
import { GetClientsResponse } from "@/entidades/client/client.api";
import { useState, useEffect } from "react";
import { useUi } from "@/shared/libs";
import { api, queryClientInstance } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { ClientProps } from "@/entidades/client";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
type ClientListHook = {
  initialData: GetClientsResponse;
  page: number;
};
export const useClientList = (data: ClientListHook) => {
  const { t } = useTranslation(["PAGES"]);

  const router = useRouter();
  const { showModal } = useUi();
  const [page, setPage] = useState(data.page);
  const [clients, setClients] = useState(data?.initialData?.clients ?? []);
  const handlePrefetchClient = async ({ _id: clientId }: any) => {
    // await queryClientInstance.prefetchQuery(
    //   ["client", clientId],
    //   async () => {
    //     const { data = null } =
    //       (await api.get(`/client/load?_id=${clientId}`)) || {};
    //     return data;
    //   },
    //   { staleTime: 1000 * 60 * 10 },
    // );
  };
  const deleteClient = useMutation({
    mutationFn: async (clientsToDelete: any = []) => {
      try {
        if (clientsToDelete?.length > 0) {
          return Promise.all(
            clientsToDelete?.map?.((client: any) =>
              api.delete(`/client/delete?_id=${client._id}`)
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
      queryClientInstance.invalidateQueries(["clients", data.page] as any);
      queryClientInstance.refetchQueries(["clients", data.page] as any);
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
    deleteClient.mutateAsync(
      clients.filter((client: ClientProps) => client.value) as any
    );
  };
  const changePage = (newpage: number) => {
    router.replace(`/clients/${newpage}`);
  };
  useEffect(() => {
    setClients(data?.initialData?.clients ?? []);
  }, [data?.initialData?.clients]);
  return {
    clients,
    setClients,
    handlePrefetchClient,
    deleteSelectedAction,
    page,
    setPage: changePage,
    total: data?.initialData?.totalCount,
  };
};
