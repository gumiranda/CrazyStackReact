"use client";
import { InfiniteList, GenericGrid, Head } from "@/shared/ui";
import { useRouteDriverInfiniteList } from "../routeDriverInfiniteList.hook";
import { useRouteDriverUi } from "@/slices/appointments/entidades/routeDriver/routeDriver.ui";
import { useTranslation } from "react-i18next";

export const RouteDriverGridPage = () => {
  const { t } = useTranslation(["PAGES"]);
  const {
    isFetching,
    error,
    data: fetchData,
    fetchNextPage,
    hasNextPage,
    deleteSelectedAction,
    loading,
  } = useRouteDriverInfiniteList();
  const routeDriverGridProps = {
    routeDrivers:
      fetchData?.pages
        ?.map?.((page: any) => page?.routeDrivers)
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
    routeDriverGridProps?.routeDrivers?.map?.((item: any) => ({
      item,
      fields: routeDriverGridProps.fields,
      mainField: "name",
    })) ?? [];
  const { renderItem } = useRouteDriverUi({ deleteSelectedAction });
  return (
    <>
      <InfiniteList
        hasNextPage={hasNextPage as any}
        fetchNextPage={fetchNextPage}
        entityName="corridas"
      >
        <GenericGrid
          items={items}
          renderItem={renderItem}
          route={"/routeDrivers/list"}
          routeList={"/routeDrivers/1"}
          routeCreate={"/routeDrivers/create"}
          entityDisplayName={"Corridas"}
          title={"Corridas"}
          {...routeDriverGridProps}
        />
      </InfiniteList>
    </>
  );
};
