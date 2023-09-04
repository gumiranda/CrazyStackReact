import { GetRouteDriversResponse } from "entidades/routeDriver/routeDriver.api";
import { useState, useEffect } from "react";
import { useUi } from "shared/libs";
import { api, queryClientInstance } from "shared/api";
import { useMutation } from "@tanstack/react-query";
import { RouteDriverProps } from "entidades/routeDriver";
import { useRouter } from "next/router";
type RouteDriverListHook = {
  initialData: GetRouteDriversResponse;
  page: number;
};
export const useRouteDriverList = (data: RouteDriverListHook) => {
  const router = useRouter();
  const { showModal } = useUi();
  const [page, setPage] = useState(data.page);
  const [routeDrivers, setRouteDrivers] = useState(data?.initialData?.routeDrivers ?? []);
  const handlePrefetchRouteDriver = async ({ _id: routeDriverId }: any) => {
    await queryClientInstance.prefetchQuery(
      ["routeDriver", routeDriverId],
      async () => {
        const { data = null } =
          (await api.get(`/routeDriver/load?_id=${routeDriverId}`)) || {};
        return data;
      },
      { staleTime: 1000 * 60 * 10 }
    );
  };
  const deleteRouteDriver = useMutation(
    async (routeDriversToDelete: any = []) => {
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
          content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
          title: "Erro no servidor",
          type: "error",
        });
      }
    },
    {
      onSuccess: () => {
        queryClientInstance.invalidateQueries(["routeDrivers", data.page]);
        queryClientInstance.refetchQueries(["routeDrivers", data.page]);
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
    deleteRouteDriver.mutateAsync(
      routeDrivers.filter((routeDriver: RouteDriverProps) => routeDriver.value)
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