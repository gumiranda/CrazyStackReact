"use client";
import { GetServicesResponse } from "@/slices/appointments/entidades/service/service.api";
import { useState, useEffect } from "react";
import { useUi } from "@/shared/libs";
import { api, queryClientInstance } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { ServiceProps } from "@/slices/appointments/entidades/service";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
type ServiceListHook = {
  initialData: GetServicesResponse;
  page: number;
};
export const useServiceList = (data: ServiceListHook) => {
  const { t } = useTranslation(["PAGES"]);
  const router = useRouter();
  const { showModal } = useUi();
  const [page, setPage] = useState(data.page);
  const [services, setServices] = useState(data?.initialData?.services ?? []);
  const handlePrefetchService = async ({ _id: serviceId }: any) => {
    // await queryClientInstance.prefetchQuery(
    //   ["service", serviceId],
    //   async () => {
    //     const { data = null } =
    //       (await api.get(`/service/load?_id=${serviceId}`)) || {};
    //     return data;
    //   },
    //   { staleTime: 1000 * 60 * 10 },
    // );
  };
  const deleteService = useMutation({
    mutationFn: async (servicesToDelete: any = []) => {
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
      queryClientInstance.invalidateQueries(["services", data.page] as any);
      queryClientInstance.refetchQueries(["services", data.page] as any);
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
    deleteService.mutateAsync(
      services.filter((service: ServiceProps) => service.value) as any
    );
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
