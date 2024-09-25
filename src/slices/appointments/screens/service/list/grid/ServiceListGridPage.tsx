"use client";

import { InfiniteList, GenericGrid, Head } from "@/shared/ui";
import { useServiceInfiniteList } from "../serviceInfiniteList.hook";
import { useServiceUi } from "@/slices/appointments/entidades/service/service.ui";
import { useTranslation } from "react-i18next";

export const ServiceGridPage = () => {
  const { t } = useTranslation(["PAGES"]);
  const {
    isFetching,
    error,
    data: fetchData,
    fetchNextPage,
    hasNextPage,
    deleteSelectedAction,
    loading,
  } = useServiceInfiniteList();
  const serviceGridProps = {
    services:
      fetchData?.pages
        ?.map?.((page: any) => page?.services)
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
    serviceGridProps?.services?.map?.((item: any) => ({
      item,
      fields: serviceGridProps.fields,
      mainField: "name",
    })) ?? [];
  const { renderItem } = useServiceUi({ deleteSelectedAction });
  return (
    <>
      <InfiniteList
        hasNextPage={hasNextPage as any}
        fetchNextPage={fetchNextPage}
        entityName="serviços"
      >
        <GenericGrid
          items={items}
          renderItem={renderItem}
          route={"/services/list"}
          routeList={"/services/1"}
          routeCreate={"/services/create"}
          entityDisplayName={"Serviço"}
          title={t("PAGES:HOME_PAGE.services", {
            defaultValue: "Serviços",
          })}
          {...serviceGridProps}
        />
      </InfiniteList>
    </>
  );
};
