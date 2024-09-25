"use client";
import { InfiniteList, GenericGrid, Head } from "@/shared/ui";
import { useMapRouteInfiniteList } from "../mapRouteInfiniteList.hook";
import { useMapRouteUi } from "@/slices/appointments/entidades/mapRoute/mapRoute.ui";
import { useTranslation } from "react-i18next";

export const MapRouteGridPage = () => {
  const { t } = useTranslation(["PAGES"]);
  const {
    isFetching,
    error,
    data: fetchData,
    fetchNextPage,
    hasNextPage,
    deleteSelectedAction,
    loading,
  } = useMapRouteInfiniteList();
  const mapRouteGridProps = {
    mapRoutes:
      fetchData?.pages
        ?.map?.((page: any) => page?.mapRoutes)
        ?.reduce?.((a: any, b: any) => a.concat(b)) ??
      fetchData ??
      [],
    isLoading: loading,
    error,
    isFetching,
    deleteSelectedAction,
    fields: [
      {
        id: "name",
        label: t("PAGES:FIELDS.name", {
          defaultValue: "Nome",
        }),
        displayKeyText: true,
      },
      {
        id: "createdAt",
        label: t("PAGES:FIELDS.createdAt", {
          defaultValue: "Data de criação",
        }),
        displayKeyText: true,
      },
    ],
  };
  const items =
    mapRouteGridProps?.mapRoutes?.map?.((item: any) => ({
      item,
      fields: mapRouteGridProps.fields,
      mainField: "name",
    })) ?? [];
  const { renderItem } = useMapRouteUi({ deleteSelectedAction });
  return (
    <InfiniteList
      hasNextPage={hasNextPage as any}
      fetchNextPage={fetchNextPage}
      entityName="rotas"
    >
      <GenericGrid
        items={items}
        renderItem={renderItem}
        route={"/mapRoutes/list"}
        routeList={"/mapRoutes/1"}
        routeCreate={"/mapRoutes/create"}
        entityDisplayName={"Rotas"}
        title={t("PAGES:HOME_PAGE.routes", {
          defaultValue: "Rotas",
        })}
        {...mapRouteGridProps}
      />
    </InfiniteList>
  );
};
