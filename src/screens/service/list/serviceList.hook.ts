import { GetServicesResponse } from "entidades/service/service.api";
import { useState, useEffect } from "react";
import { useUi } from "shared/libs";
import { api, queryClientInstance } from "shared/api";
import { useMutation } from "@tanstack/react-query";
import { ServiceProps } from "entidades/service";
import { useRouter } from "next/router";
type ServiceListHook = {
  initialData: GetServicesResponse;
  page: number;
};
export const useServiceList = (data: ServiceListHook) => {
  const router = useRouter();
  const { showModal } = useUi();
  const [page, setPage] = useState(data.page);
  const [services, setServices] = useState(data?.initialData?.services ?? []);
  const handlePrefetchService = async ({ _id: serviceId }: any) => {
    await queryClientInstance.prefetchQuery(
      ["service", serviceId],
      async () => {
        const { data = null } = (await api.get(`/service/load?_id=${serviceId}`)) || {};
        return data;
      },
      { staleTime: 1000 * 60 * 10 }
    );
  };
  const deleteService = useMutation(
    async (servicesToDelete: any = []) => {
      try {
        if (servicesToDelete?.length > 0) {
          return Promise.all(
            servicesToDelete?.map?.((service: any) =>
              api.delete(`/service/delete?_id=${service._id}`)
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
        queryClientInstance.invalidateQueries(["services", data.page]);
        queryClientInstance.refetchQueries(["services", data.page]);
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
    deleteService.mutateAsync(services.filter((service: ServiceProps) => service.value));
  };
  const changePage = (newpage: number) => {
    router.replace(`/services/${newpage}`);
  };
  useEffect(() => {
    setServices(data?.initialData?.services ?? []);
  }, [data?.initialData?.services]);
  return {
    services,
    setServices,
    handlePrefetchService,
    deleteSelectedAction,
    page,
    setPage: changePage,
    total: data?.initialData?.totalCount,
  };
};
