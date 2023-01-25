import { GetClientsResponse } from "entidades/client/client.api";
import { useState, useEffect } from "react";
import { useUi } from "shared/libs";
import { api, queryClientInstance } from "shared/api";
import { useMutation } from "@tanstack/react-query";
import { ClientProps } from "entidades/client";
import { useRouter } from "next/router";
type ClientListHook = {
  initialData: GetClientsResponse;
  page: number;
};
export const useClientList = (data: ClientListHook) => {
  const router = useRouter();
  const { showModal } = useUi();
  const [page, setPage] = useState(data.page);
  const [clients, setClients] = useState(data?.initialData?.clients ?? []);
  const handlePrefetchClient = async ({ _id: clientId }: any) => {
    await queryClientInstance.prefetchQuery(
      ["client", clientId],
      async () => {
        const { data = null } = (await api.get(`/client/load?_id=${ clientId}`)) || {};
        return data;
      },
      { staleTime: 1000 * 60 * 10 }
    );
  };
  const deleteClient = useMutation(
    async (clientsToDelete: any = []) => {
      try {
        if (clientsToDelete?.length > 0) {
          return Promise.all(
            clientsToDelete?.map?.((client: any) =>
              api.delete(`/client/delete?_id=${ client._id}`)
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
        queryClientInstance.invalidateQueries(["clients", data.page]);
        queryClientInstance.refetchQueries(["clients", data.page]);
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
  const deleteSelectedAction = async () => {
    deleteClient.mutateAsync(
      clients.filter((client: ClientProps) => client.value)
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
