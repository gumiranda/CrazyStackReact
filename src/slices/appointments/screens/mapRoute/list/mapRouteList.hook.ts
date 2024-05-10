"use client";
import { GetMapRoutesResponse } from "@/slices/appointments/entidades/mapRoute/mapRoute.api";
import { useState, useEffect } from "react";
import { useUi } from "@/shared/libs";
import { api, queryClientInstance } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { MapRouteProps } from "@/slices/appointments/entidades/mapRoute";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
type MapRouteListHook = {
  initialData: GetMapRoutesResponse;
  page: number;
};
export const useMapRouteList = (data: MapRouteListHook) => {
  const { t } = useTranslation(["PAGES"]);

  const router = useRouter();
  const { showModal } = useUi();
  const [page, setPage] = useState(data.page);
  const [mapRoutes, setMapRoutes] = useState(data?.initialData?.mapRoutes ?? []);
  const handlePrefetchMapRoute = async ({ _id: mapRouteId }: any) => {
    // await queryClientInstance.prefetchQuery(
    //   ["mapRoute", mapRouteId],
    //   async () => {
    //     const { data = null } =
    //       (await api.get(`/mapRoute/load?_id=${mapRouteId}`)) || {};
    //     return data;
    //   },
    //   { staleTime: 1000 * 60 * 10 },
    // );
  };
  const deleteMapRoute = useMutation({
    mutationFn: async (mapRoutesToDelete: any = []) => {
      try {
        if (mapRoutesToDelete?.length > 0) {
          return Promise.all(
            mapRoutesToDelete?.map?.((mapRoute: any) =>
              api.delete(`/mapRoute/delete?_id=${mapRoute._id}`)
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
      queryClientInstance.invalidateQueries(["mapRoutes", data.page] as any);
      queryClientInstance.refetchQueries(["mapRoutes", data.page] as any);
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
    deleteMapRoute.mutateAsync(
      mapRoutes.filter((mapRoute: MapRouteProps) => mapRoute.value) as any
    );
  };
  const changePage = (newpage: number) => {
    router.replace(`/mapRoutes/${newpage}`);
  };
  useEffect(() => {
    setMapRoutes(data?.initialData?.mapRoutes ?? []);
  }, [data?.initialData?.mapRoutes]);
  return {
    mapRoutes,
    setMapRoutes,
    handlePrefetchMapRoute,
    deleteSelectedAction,
    page,
    setPage: changePage,
    total: data?.initialData?.totalCount,
  };
};
