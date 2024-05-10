"use client";
import { InfiniteList, GenericGrid, Head } from "@/shared/ui";
import { useClientInfiniteList } from "../clientInfiniteList.hook";
import { useClientUi } from "@/slices/appointments/entidades/client/client.ui";
import { useTranslation } from "react-i18next";

export const ClientGridPage = () => {
  const { t } = useTranslation(["PAGES"]);
  const {
    isFetching,
    error,
    data: fetchData,
    fetchNextPage,
    hasNextPage,
    deleteSelectedAction,
    loading,
  } = useClientInfiniteList();
  const clientGridProps = {
    clients:
      fetchData?.pages
        ?.map?.((page: any) => page?.clients)
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
    clientGridProps?.clients?.map?.((item: any) => ({
      item,
      fields: clientGridProps.fields,
      mainField: "name",
    })) ?? [];
  const { renderItem } = useClientUi({ deleteSelectedAction });
  return (
    <>
      <InfiniteList
        hasNextPage={hasNextPage as any}
        fetchNextPage={fetchNextPage}
        entityName="clientes"
      >
        <GenericGrid
          items={items}
          renderItem={renderItem}
          route={"/clients/list"}
          routeList={"/clients/1"}
          routeCreate={"/clients/create"}
          entityDisplayName={t("PAGES:HOME_PAGE.client", {
            defaultValue: "Cliente",
          })}
          title={t("PAGES:HOME_PAGE.clients", {
            defaultValue: "Clientes",
          })}
          {...clientGridProps}
        />
      </InfiniteList>
    </>
  );
};
