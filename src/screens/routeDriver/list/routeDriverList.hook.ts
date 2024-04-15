"use client";
import { GetRouteDriversResponse } from "@/entidades/routeDriver/routeDriver.api";
import { useState, useEffect } from "react";
import { useUi } from "@/shared/libs";
import { api, queryClientInstance } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { RouteDriverProps } from "@/entidades/routeDriver";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
type RouteDriverListHook = {
  initialData: GetRouteDriversResponse;
  page: number;
};
export const useRouteDriverList = (data: RouteDriverListHook) => {
  const { t } = useTranslation(["PAGES"]);
  const router = useRouter();
  const { showModal } = useUi();
  const [page, setPage] = useState(data.page);
  const [routeDrivers, setRouteDrivers] = useState(data?.initialData?.routeDrivers ?? []);
  const handlePrefetchRouteDriver = async ({ _id: routeDriverId }: any) => {
    // await queryClientInstance.prefetchQuery(
    //   ["routeDriver", routeDriverId],
    //   async () => {
    //     const { data = null } =
    //       (await api.get(`/routeDriver/load?_id=${routeDriverId}`)) || {};
    //     return data;
    //   },
    //   { staleTime: 1000 * 60 * 10 },
    // );
  };
  const deleteRouteDriver = useMutation({
    mutationFn: async (routeDriversToDelete: any = []) => {
      try {
        if (routeDriversToDelete?.length > 0) {
          return Promise.all(
            routeDriversToDelete?.map?.((routeDriver: any) =>
              api.delete(`/routeDriver/delete?_id=${routeDriver._id}`)
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
      queryClientInstance.invalidateQueries(["routeDrivers", data.page] as any);
      queryClientInstance.refetchQueries(["routeDrivers", data.page] as any);
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
    deleteRouteDriver.mutateAsync(
      routeDrivers.filter((routeDriver: RouteDriverProps) => routeDriver.value) as any
    );
  };
  const changePage = (newpage: number) => {
    router.replace(`/routeDrivers/${newpage}`);
  };
  useEffect(() => {
    setRouteDrivers(data?.initialData?.routeDrivers ?? []);
  }, [data?.initialData?.routeDrivers]);
  return {
    routeDrivers,
    setRouteDrivers,
    handlePrefetchRouteDriver,
    deleteSelectedAction,
    page,
    setPage: changePage,
    total: data?.initialData?.totalCount,
  };
};
